import { startCourse } from "./pbr-course.js";
(() => {
  "use strict";
  const root = document.getElementById("pbr-lab");
  const get = id => root.querySelector("#pbr-" + id);
  const presets = {
    copper: ["#f4c5aa", 0.32, 1],
    gold: ["#ffe5a0", 0.24, 1],
    ceramic: ["#408b86", 0.23, 0],
    rubber: ["#434750", 0.82, 0]
  };
  const lessons = {
    full: ["光怎样构成表面颜色？", "把中间球的粗糙度先调到 0.16，再调到 0.80。对照两侧参照球，比较高光占球面的比例。", "Lₒ = (漫反射 + 镜面反射) × 入射光 × max(N·L, 0)", "迎光面的亮度随入射角变化，背光面接收的直接光为零。完整材质和两种反射分量都经过色调映射和 sRGB 编码后显示。"],
    diffuse: ["金属的漫反射去了哪里？", "选青釉陶瓷，保持基础色不变，把金属度推向 1。纯金属的漫反射图会变黑，再切到镜面反射看颜色去了哪里。", "fᵈ = (1 − F) × (1 − 金属度) × 基础色 / π", "菲涅耳反射先分走一部分光，在这个模型中，只有非金属部分会把余下的能量分给漫反射。"],
    specular: ["高光什么时候会带上材质的颜色？", "选金，把金属度从 1 降到 0。比较高光的色相，再改变粗糙度，观察高光的宽度。", "fˢ = D × G × F / [4 × (N·L) × (N·V)]", "D 决定反射集中的方向，G 计入微表面遮挡，F 决定反射比例与颜色。这里显示它们共同产生的直接镜面光。"],
    D: ["多少微表面朝向半程向量？", "调低粗糙度，找到中间球上最亮的点。调高粗糙度，观察亮区如何摊开。移动方向光，看看亮区是否跟着移动。", "D = α² / {π × [(N·H)² × (α² − 1) + 1]²}，α = 粗糙度²", "这里仅显示方向光的 GGX 法线分布。D 是密度，峰值可以超过 1。预览用 D / (1 + D) 压缩亮度以保留细节。"],
    G: ["哪些微表面同时看得到光源和眼睛？", "把粗糙度调高，再把方向光移到侧面。比较迎光面和明暗交界附近的灰度。", "G = g(N·V) × g(N·L)，g(x) = x / [x(1 − k) + k]，k = (粗糙度 + 1)² / 8", "这是直接光照的 Schlick–GGX / Smith 近似。亮处受遮蔽较少。方向光照不到的区域显示为黑色。"],
    F: ["为什么掠射角的反射更强？", "先选青釉陶瓷，比较球心和轮廓，再切到金。拖动下方的入射角，查看正入射与掠射时的反射率。", "F = F₀ + (1 − F₀)(1 − cos θ)⁵，F₀ = mix(0.04, 基础色, 金属度)", "这里用镜面测试条件 H = N 扫描角度，球心对应正视，轮廓对应掠视。这个分量只随角度和材质改变。合成光照使用 cos θ = V·H。"]
  };
  const rough = get("r"), metal = get("m"), angle = get("a"), base = get("base");
  const preset = get("preset"), theta = get("theta");
  const modeButtons = Array.from(root.querySelectorAll("[data-mode]"));
  let mode = "full";
  let pending = false;

  function linearBase() {
    return [1, 3, 5].map(start => {
      const s = parseInt(base.value.slice(start, start + 2), 16) / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
  }
  function fresnel(f0, cosine) {
    return f0 + (1 - f0) * (1 - Math.min(1, Math.max(0, cosine))) ** 5;
  }
  const encode = Uint8ClampedArray.from({length: 4097}, (_, i) => {
    const x = i / 4096;
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  });
  const byte = x => encode[Math.round(Math.min(1, Math.max(0, x)) * 4096)];

  // Intersect orthographic camera rays with a unit sphere once per sample.
  function sampleBuffer(canvas) {
    const context = canvas.getContext("2d");
    if (!context) return null;
    const size = canvas.width, image = context.createImageData(size, size);
    const normals = new Float32Array(size * size * 3);
    const radius = size * 0.48;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x + 0.5 - size / 2) / radius;
        const ny = (size / 2 - y - 0.5) / radius;
        const rr = nx * nx + ny * ny, pixel = y * size + x;
        if (rr >= 1) continue;
        normals.set([nx, ny, Math.sqrt(1 - rr)], pixel * 3);
        image.data[pixel * 4 + 3] = 255 * Math.min(1, (1 - Math.sqrt(rr)) * radius);
      }
    }
    return {canvas, context, normals, image};
  }
  const samples = Array.from(root.querySelectorAll("canvas[data-sample]"), sampleBuffer).filter(Boolean);
  if (!samples.length) {
    get("view-label").textContent = "当前浏览器未能创建画布";
  }

  // One white directional light, with V fixed at (0,0,1).
  function light(x, y, z, intensity, f0) {
    const length = Math.hypot(x, y, z);
    x /= length; y /= length; z /= length;
    const h = Math.hypot(x, y, z + 1);
    return {x, y, z, hx:x / h, hy:y / h, hz:(z + 1) / h, intensity,
      F:f0.map(c => fresnel(c, (z + 1) / h))};
  }
  function render(sample, r, m, color, f0, lamp, view = mode, ambient = null, ao = 1) {
    const {context, image, normals} = sample;
    const a2 = r ** 4, k = (r + 1) ** 2 / 8;
    const pixels = image.data;
    const diagnostic = view === "D" || view === "G";
    for (let p = 0, n = 0; p < pixels.length; p += 4, n += 3) {
      if (!pixels[p + 3]) continue;
      const nx = normals[n], ny = normals[n + 1], nv = normals[n + 2];
      if (view === "F") {
        for (let c = 0; c < 3; c++) pixels[p + c] = byte(fresnel(f0[c], nv));
        continue;
      }
      const nl = nx * lamp.x + ny * lamp.y + nv * lamp.z;
      if (view === "cosine") {
        pixels[p] = pixels[p + 1] = pixels[p + 2] = byte(Math.max(0, nl));
        continue;
      }
      if (nl <= 0) {
        pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        if (ambient) for (let c = 0; c < 3; c++) {
          const indirect = ambient[n + c] * ao;
          pixels[p + c] = byte(indirect / (1 + indirect));
        }
        continue;
      }
      const nh = Math.min(1, Math.max(0, nx * lamp.hx + ny * lamp.hy + nv * lamp.hz));
      const denominator = (1 - nh * nh) + nh * nh * a2;
      const D = a2 / (Math.PI * denominator * denominator);
      const G = nv / (nv * (1 - k) + k) * nl / (nl * (1 - k) + k);
      if (diagnostic) {
        const gray = byte(view === "D" ? D / (1 + D) : G);
        pixels[p] = pixels[p + 1] = pixels[p + 2] = gray;
        continue;
      }
      const specScale = D * G / (4 * nv * nl);
      for (let c = 0; c < 3; c++) {
        const F = lamp.F[c];
        const diffuse = view === "specular" ? 0 : (1 - F) * (1 - m) * color[c] / Math.PI;
        const specular = view === "diffuse" ? 0 : specScale * F;
        const radiance = (diffuse + specular) * nl * lamp.intensity + (ambient ? ambient[n + c] * ao : 0);
        pixels[p + c] = byte(radiance / (1 + radiance));
      }
    }
    context.putImageData(image, 0, 0);
  }
  function updateProbe(f0) {
    const cosine = Math.cos(Number(theta.value) * Math.PI / 180);
    get("theta-value").value = theta.value + "°";
    get("reflectance").value = f0.map(c => fresnel(c, cosine).toFixed(3)).join(" / ");
  }
  function draw() {
    pending = false;
    const r = Number(rough.value), m = Number(metal.value);
    const color = linearBase(), f0 = color.map(c => 0.04 * (1 - m) + c * m);
    const a = Number(angle.value) * Math.PI / 180;
    const lamp = light(Math.sin(a), 0.62, Math.cos(a), 5, f0);
    const parts = mode === "full" && get("compare").value === "parts";
    get("compare").disabled = mode !== "full";
    get("left-caption").textContent = parts ? "漫反射" : "光滑参照 · r = 0.16";
    get("right-caption").textContent = parts ? "镜面反射" : "粗糙参照 · r = 0.80";
    if (parts) get("task").textContent = "左球只显示漫反射，右球只显示镜面反射。中间球在线性空间中相加，再转换为屏幕颜色。试着把金属度拉到 1，观察哪一项消失。";
    else if (mode === "full") get("task").textContent = lessons.full[1];
    for (const sample of samples) {
      const kind = sample.canvas.dataset.sample;
      const sampleR = parts || kind === "live" ? r : kind === "smooth" ? 0.16 : 0.8;
      const view = parts ? {smooth:"diffuse", live:"full", rough:"specular"}[kind] : mode;
      render(sample, sampleR, m, color, f0, lamp, view);
    }
    get("r-value").value = r.toFixed(2);
    get("m-value").value = m.toFixed(2);
    get("a-value").value = angle.value + "°";
    get("live-r").textContent = "r = " + r.toFixed(2);
    updateProbe(f0);
  }
  function redraw() {
    if (!pending) { pending = true; requestAnimationFrame(draw); }
  }
  function setMode(value) {
    mode = value;
    for (const button of modeButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
      if (button.dataset.mode === mode && samples.length) get("view-label").textContent = button.textContent;
    }
    const [title, task, equation, observe] = lessons[mode];
    get("lesson-title").textContent = title;
    get("task").textContent = task;
    get("equation").textContent = equation;
    get("observe").textContent = observe;
    get("angle-test").hidden = mode !== "F";
    redraw();
  }
  function applyPreset(name) {
    const [hex, r, m] = presets[name];
    base.value = hex; rough.value = r; metal.value = m;
    preset.value = name;
    redraw();
  }
  for (const input of [rough, metal, base]) {
    input.addEventListener("input", () => { preset.value = "custom"; redraw(); });
  }
  angle.addEventListener("input", redraw);
  get("compare").addEventListener("change", redraw);
  theta.addEventListener("input", () => {
    const m = Number(metal.value);
    updateProbe(linearBase().map(c => 0.04 * (1 - m) + c * m));
  });
  preset.addEventListener("change", () => applyPreset(preset.value));
  for (const button of modeButtons) button.addEventListener("click", () => setMode(button.dataset.mode));
  get("reset").addEventListener("click", () => {
    angle.value = -32; theta.value = 60; get("compare").value = "parts"; applyPreset("copper"); setMode("full");
  });
  setMode("full");
  const course = startCourse(root, {sampleBuffer, render, light, fresnel});

  // Specimen tray in the header: the same renderer, lit from the pointer.
  const tray = get("lightbox");
  const specimens = Array.from(root.querySelectorAll("[data-specimen]"), button => {
    const [hex, r, m] = presets[button.dataset.specimen];
    const color = [1, 3, 5].map(start => {
      const s = parseInt(hex.slice(start, start + 2), 16) / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    });
    const f0 = color.map(c => 0.04 * (1 - m) + c * m);
    button.addEventListener("click", () => {
      applyPreset(button.dataset.specimen);
      setMode("full");
      course.go(course.bench);
    });
    return {sample: sampleBuffer(button.querySelector("canvas")), r, m, color, f0};
  }).filter(s => s.sample);
  let lampX = -0.55, lampY = 0.5, trayQueued = false, touched = false;
  function lightTray() {
    trayQueued = false;
    for (const s of specimens) {
      render(s.sample, s.r, s.m, s.color, s.f0, light(lampX, lampY, 0.9, 5, s.f0), "full");
    }
  }
  function aim(x, y) {
    lampX = x; lampY = y;
    if (!trayQueued) { trayQueued = true; requestAnimationFrame(lightTray); }
  }
  if (tray && specimens.length) {
    tray.addEventListener("pointermove", event => {
      touched = true;
      const box = tray.getBoundingClientRect();
      aim(2.4 * ((event.clientX - box.left) / box.width - 0.5), 1.6 * (0.5 - (event.clientY - box.top) / box.height));
    });
    // One slow sweep on load shows that the light is movable.
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    lampX = still ? -0.55 : 1.1;
    lightTray();
    if (!still) {
      const start = performance.now(), length = 1600;
      const sweep = now => {
        const t = Math.min(1, (now - start) / length), ease = 1 - (1 - t) ** 3;
        if (touched) return;
        aim(1.1 - 1.65 * ease, 0.5);
        if (t < 1) requestAnimationFrame(sweep);
      };
      requestAnimationFrame(sweep);
    }
  }
})();
