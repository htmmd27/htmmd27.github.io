import { map, lookup, environment, irradianceMap, chart, label, circle, marker, sphere, uv } from "./pbr-environment.js";

const tau = 2 * Math.PI;
const mint = "#92e4cd", amber = "#ffc878";
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const radians = degrees => degrees * Math.PI / 180;

function radicalInverse(index) {
  let fraction = 0, place = 0.5;
  while (index > 0) {
    fraction += (index % 2) * place;
    index = Math.floor(index / 2);
    place *= 0.5;
  }
  return fraction;
}

// GGX samples are half vectors in a local frame with N along +Z.
function halfVectors(roughness, count) {
  const alphaSquared = roughness ** 4;
  return Array.from({length: count}, (_, i) => {
    const v = radicalInverse(i), phi = tau * i / count;
    const z = Math.sqrt((1-v) / (1-v + alphaSquared*v));
    const radial = Math.sqrt(Math.max(0, 1-z*z));
    return [radial*Math.cos(phi), radial*Math.sin(phi), z];
  });
}

const layerCount = 5, layers = new Map();
function filteredLayer(index) {
  if (index === 0) return environment();
  if (layers.has(index)) return layers.get(index);
  const source = environment();
  const directions = halfVectors(index/(layerCount-1), 128)
    .map(([x,y,z]) => [2*z*x, 2*z*y, 2*z*z-1])
    .filter(([, , z]) => z > 0);
  const totalWeight = directions.reduce((total, direction) => total+direction[2], 0);
  const width = 64, height = 32;
  const layer = map(width, height, (column,row) => {
    const lon = ((column+.5)/width-.5)*tau, lat = (.5-(row+.5)/height)*Math.PI;
    const sl = Math.sin(lon), cl = Math.cos(lon), sy = Math.sin(lat), cy = Math.cos(lat);
    const sum = [0,0,0];
    for (const [x,y,z] of directions) {
      const wx = x*cl-y*sy*sl+z*cy*sl, wy = y*cy+z*sy, wz = -x*sl-y*sy*cl+z*cy*cl;
      const rgb = lookup(source, ...uv(Math.atan2(wx,wz), Math.asin(clamp(wy,-1,1))));
      for (let c=0;c<3;c++) sum[c] += z*rgb[c];
    }
    return sum.map(channel => channel/totalWeight);
  });
  layers.set(index, layer);
  return layer;
}

function reflectionSampler(roughness) {
  const level = roughness*(layerCount-1), lower = Math.floor(level), upper = Math.ceil(level);
  const a = filteredLayer(lower), b = filteredLayer(upper), mix = level-lower;
  function read(x,y,z) {
    const [u,v] = uv(Math.atan2(2*z*x,2*z*z-1),Math.asin(clamp(2*z*y,-1,1)));
    const first = lookup(a,u,v);
    if (a === b) return first;
    const second = lookup(b,u,v);
    return first.map((channel,i) => channel*(1-mix)+second[i]*mix);
  }
  return {read, a, b, lower, upper, mix};
}

// Under white radiance, separate the Schlick Fresnel into F0*A+B.
function integrateBRDF(nv, roughness, halves) {
  const vx = Math.sqrt(1-nv*nv), k = roughness*roughness/2;
  const gOverNv = 1/(nv*(1-k)+k);
  let A=0, B=0;
  for (const [hx,,hz] of halves) {
    const vh = vx*hx+nv*hz, nl = 2*vh*hz-nv;
    if (nl <= 0) continue;
    const gLight = nl/(nl*(1-k)+k);
    const visibility = gOverNv*gLight*vh/hz, fresnel = (1-clamp(vh,0,1))**5;
    A += (1-fresnel)*visibility;
    B += fresnel*visibility;
  }
  return [A/halves.length,B/halves.length,0];
}

let brdfTable;
function table() {
  if (!brdfTable) {
    const width=48, height=32;
    const rows=Array.from({length:height}, (_,y)=>halfVectors(1-(y+.5)/height,128));
    brdfTable=map(width,height,(x,y)=>integrateBRDF((x+.5)/width,1-(y+.5)/height,rows[y]));
  }
  return brdfTable;
}
function coefficients(nv,roughness) {
  const lut=table(), margin=.5/lut.width;
  // The room wraps horizontally, but the angular BRDF axis has two distinct endpoints.
  return lookup(lut,clamp(nv,margin,1-margin),1-roughness);
}

function ray(ctx,x,y,angle,length,color,dash=[]) {
  const u=x+length*Math.sin(angle), v=y-length*Math.cos(angle), a=Math.atan2(v-y,u-x);
  ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=2; ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(u,v); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(u,v);
  for (const side of [.45,-.45]) ctx.lineTo(u-8*Math.cos(a+side),v-8*Math.sin(a+side));
  ctx.fill(); ctx.restore();
  return [u,v];
}
function reflection(ctx, ball, degrees) {
  const beta=radians(degrees), [u]=uv(2*beta,0);
  ctx.drawImage(chart(environment()),0,6,400,80);
  marker(ctx,400*u,46);
  // Seen from above: the eye sits below the ball, so V points down the canvas.
  const cx=200, cy=128, r=24, px=cx+r*Math.sin(beta), py=cy+r*Math.cos(beta);
  circle(ctx,cx,cy,r,"#415655",true); circle(ctx,cx,cy,r,"#7f9695");
  ray(ctx,px,py,Math.PI,62,"#9fb3b3",[4,4]);
  ray(ctx,px,py,Math.PI-beta,30,mint);
  const tip=ray(ctx,px,py,Math.PI-2*beta,56,amber);
  marker(ctx,px,py);
  label(ctx,"虚线 V · 指向眼睛",265,201,"#9fb3b3");
  label(ctx,"R",tip[0]+(degrees<0?-16:7),tip[1]+4,amber);
  label(ctx,`法线 N 偏 ${degrees}°`,12,124,mint);
  label(ctx,`反射 R 偏 ${2*degrees}°`,12,150,amber);
  label(ctx,"俯视截面",318,124,"#9fb3b3");
  sphere(ball,reflectionSampler(0).read);
  const w=ball.canvas.width;
  marker(ball.context,w*(.5+.48*Math.sin(beta)),w/2);
  return ["上：展开的房间，圆点是 R 读到的方向。下：俯视球的截面","理想镜面 · 圆点是所选表面点",
    `法线偏转 ${degrees}°，取光方向在水平面内转过 ${2*degrees}°。两个标记读取同一个环境颜色。`];
}

function pointCloud(ctx, points, cx, cy, radius, color, rings=false) {
  circle(ctx,cx,cy,radius,"#405456",true);
  circle(ctx,cx,cy,radius,"#758b8b");
  if (rings) for (const degrees of [30,60]) {
    const rr=radius*Math.sin(radians(degrees));
    ctx.save(); ctx.setLineDash([3,4]); circle(ctx,cx,cy,rr,"#6f8786"); ctx.restore();
    ctx.fillStyle="#9fb3b3"; ctx.font="11px sans-serif"; ctx.fillText(degrees+"°",cx+rr*.71+2,cy-rr*.71-2);
  }
  for (const [x,y] of points) circle(ctx,cx+radius*x,cy-radius*y,2.4,color,true);
}
function sequence(ctx,ball,count) {
  let seed=181;
  function random() {seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296;}
  const sets=[Array.from({length:count},()=>[random(),random()]),
    Array.from({length:count},(_,i)=>[i/count,radicalInverse(i)])];
  const occupied=sets.map((points,index)=>{
    const left=12+index*200, top=16, side=170;
    ctx.fillStyle="#34484a"; ctx.fillRect(left,top,side,side);
    ctx.strokeStyle="#647979"; ctx.lineWidth=1;
    const cells=new Set();
    for (let i=0;i<=4;i++) {
      const d=i*side/4;
      ctx.beginPath(); ctx.moveTo(left+d,top); ctx.lineTo(left+d,top+side);
      ctx.moveTo(left,top+d); ctx.lineTo(left+side,top+d); ctx.stroke();
    }
    for (const [u,v] of points) cells.add(4*Math.floor(u*4)+Math.floor(v*4));
    ctx.fillStyle="#e0786a66";
    for (let cell=0;cell<16;cell++) if (!cells.has(cell)) {
      const cu=Math.floor(cell/4), cv=cell%4;
      ctx.fillRect(left+cu*side/4+1,top+(3-cv)*side/4+1,side/4-2,side/4-2);
    }
    for (const [u,v] of points) circle(ctx,left+u*side,top+(1-v)*side,2.5,index?mint:amber,true);
    label(ctx,index?"Hammersley":"伪随机",left+28,211);
    return cells.size;
  });
  const w=ball.canvas.width; ball.context.clearRect(0,0,w,w);
  pointCloud(ball.context,halfVectors(.65,count),w/2,w/2,.44*w,mint);
  return ["二维输入样本 · 红色格子里一个点也没有","Hammersley → GGX 半向量 · r = 0.65",
    `各取 ${count} 点。16 个格子中，伪随机覆盖 ${occupied[0]} 格，Hammersley 覆盖 ${occupied[1]} 格。格子覆盖率只是观察分布的一种尺度。`];
}
function importance(ctx,ball,roughness) {
  const halves=halfVectors(roughness,96);
  const lights=halves.map(([x,y,z])=>[2*z*x,2*z*y,2*z*z-1]).filter(([, , z])=>z>0);
  pointCloud(ctx,halves,96,97,80,mint,true); pointCloud(ctx,lights,303,97,80,amber,true);
  label(ctx,"微表面法线 H",48,205); label(ctx,"上半球取光方向 L",243,205);
  sphere(ball,reflectionSampler(roughness).read);
  return ["固定 V = N · 相同的 96 个输入点 · 虚线圈是离法线 30° 与 60°","预过滤环境颜色 · 对照倒影宽度",
    `粗糙度 ${roughness.toFixed(2)} 时，96 个半向量中有 ${lights.length} 个把视线反射到上半球。光滑端的方向集中在圆心附近。`];
}
function prefilter(ctx,ball,roughness) {
  const {a,b,lower,upper,mix,read}=reflectionSampler(roughness);
  for (const [row,texture,level] of [[0,a,lower],[1,b,upper]]) {
    label(ctx,`层 ${level} · 粗糙度 ${(level/(layerCount-1)).toFixed(2)}`,8,17+row*108);
    ctx.drawImage(chart(texture),0,22+row*108,400,78);
  }
  const x0=236, x1=388, y=12, step=(x1-x0)/(layerCount-1);
  ctx.strokeStyle="#6f8786"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(x0,y); ctx.lineTo(x1,y); ctx.stroke();
  for (let i=0;i<layerCount;i++) circle(ctx,x0+i*step,y,i===lower||i===upper?4.5:3,i===lower||i===upper?mint:"#6f8786",true);
  circle(ctx,x0+roughness*(x1-x0),y,5.5,amber);
  sphere(ball,read);
  return ["包围当前粗糙度的两层 GGX 预过滤图 · 右上角金圈是当前粗糙度","按反射方向查图并插值",
    `粗糙度 ${roughness.toFixed(2)}，层位置 ${(roughness*4).toFixed(2)}。层 ${lower} 与层 ${upper} 的插值因子为 ${mix.toFixed(2)}。`];
}

let tableImage;
function brdf(ctx,ball,degrees) {
  const nv=Math.cos(radians(degrees)), roughness=.4;
  const lut=table(), [A,B]=coefficients(nv,roughness);
  if (!tableImage) {
    tableImage=document.createElement("canvas");
    tableImage.width=lut.width; tableImage.height=lut.height;
    const context=tableImage.getContext("2d");
    const pixels=context.createImageData(lut.width,lut.height);
    for (let i=0;i<lut.width*lut.height;i++) {
      pixels.data.set([255*lut.data[3*i],255*lut.data[3*i+1],0,255],4*i);
    }
    context.putImageData(pixels,0,0);
  }
  ctx.drawImage(tableImage,62,16,322,150);
  ctx.save(); ctx.strokeStyle="#ffffffaa"; ctx.lineWidth=1; ctx.setLineDash([3,4]);
  ctx.beginPath(); ctx.moveTo(62+322*nv,16); ctx.lineTo(62+322*nv,166);
  ctx.moveTo(62,16+150*(1-roughness)); ctx.lineTo(384,16+150*(1-roughness)); ctx.stroke(); ctx.restore();
  marker(ctx,62+322*nv,16+150*(1-roughness));
  label(ctx,"r = 1",10,30); label(ctx,"r = 0",10,165);
  label(ctx,"掠视 0",60,190); label(ctx,"N·V",206,190); label(ctx,"正视 1",335,190);
  sphere(ball,(_x,_y,z)=>{
    const [scale,bias]=coefficients(z,roughness), value=4*(.04*scale+bias);
    return [value,value,value];
  });
  const w=ball.canvas.width;
  marker(ball.context,w*(.5+.48*Math.sin(radians(degrees))),w/2);
  return ["红通道 A · 绿通道 B · 标记为当前查表位置","非金属镜面项 · 曝光 ×4",
    `视角余弦 ${nv.toFixed(3)}，A = ${A.toFixed(3)}，B = ${B.toFixed(3)}。取 F₀ = 0.04 时，镜面响应为 ${(.04*A+B).toFixed(3)}。`];
}

function finish(ctx,ball,roughness,engine,section) {
  const kind=section.querySelector("select").value;
  const metal=kind==="ceramic"?0:1;
  const color={copper:[.80,.32,.10],gold:[1,.78,.35],ceramic:[.65,.56,.42]}[kind];
  const f0=metal?color:[.04,.04,.04];
  const lamp=engine.light(-.53,.62,.85,5,f0);
  const diffuse=new Float32Array(ball.normals.length), specular=new Float32Array(diffuse.length);
  const filtered=reflectionSampler(roughness), baked=irradianceMap();
  for (let i=0;i<ball.normals.length;i+=3) {
    const x=ball.normals[i], y=ball.normals[i+1], z=ball.normals[i+2];
    if (!z) continue;
    const [A,B]=coefficients(z,roughness), reflection=filtered.read(x,y,z);
    const light=metal?null:lookup(baked,...uv(Math.atan2(x,z),Math.asin(y)));
    for (let c=0;c<3;c++) {
      specular[i+c]=reflection[c]*(f0[c]*A+B);
      if (light) {
        const F=f0[c]+(Math.max(1-roughness,f0[c])-f0[c])*(1-z)**5;
        diffuse[i+c]=(1-F)*color[c]*light[c];
      }
    }
  }
  engine.render(ball,roughness,metal,color,f0,lamp,"full",diffuse);
  ctx.drawImage(ball.canvas,7,17,180,180);
  engine.render(ball,roughness,metal,color,f0,engine.light(-.53,.62,.85,0,f0),"full",specular);
  ctx.drawImage(ball.canvas,213,17,180,180);
  label(ctx,"单灯 + 环境漫反射",30,213); label(ctx,"环境镜面反射",248,213);
  for (let i=0;i<diffuse.length;i++) diffuse[i]+=specular[i];
  engine.render(ball,roughness,metal,color,f0,lamp,"full",diffuse);
  return ["相同材质、相同曝光 · 单独观察两组光照","完整材质 · 三项在线性空间相加",
    `${{copper:"铜",gold:"金",ceramic:"陶瓷"}[kind]}：${metal?"环境漫反射权重为零，球上的房间全部来自镜面项，倒影染上金属的颜色。":"背光面有环境漫反射，白色倒影只在轮廓附近明显，叠加在底色上。"}粗糙度 ${roughness.toFixed(2)}，${roughness<.3?"窗框清晰可辨。":roughness<.6?"窗框开始化成一块暖色光斑。":"倒影只剩房间的大致明暗。"}`];
}

export const specularLessons={reflection,sequence,importance,prefilter,brdf,finish};
