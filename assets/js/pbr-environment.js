// Linear RGB throughout. The panorama uses longitude atan2(x,z) and latitude asin(y).
const pi = Math.PI, tau = 2*pi;
const radians = degrees => degrees*pi/180;
const clamp = (x,lo,hi) => Math.min(hi,Math.max(lo,x));
const lum = rgb => .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
const mint = "#92e4cd", gold = "#ffc878", foreground = "#e4edeb";
const byte = x => {
  const t=x/(1+x);
  return Math.round(255*(t<=.0031308 ? 12.92*t : 1.055*t**(1/2.4)-.055));
};
function map(width,height,create) {
  const data=new Float32Array(width*height*3);
  for (let y=0;y<height;y++) for (let x=0;x<width;x++) {
    data.set(create(x,y),3*(y*width+x));
  }
  return {width,height,data};
}
function room(lon,lat) {
  const windowX=(lon+.23)/.92, windowY=(lat+.04)/.66;
  if (windowX>0 && windowX<1 && windowY>0 && windowY<1) {
    if (Math.abs(windowX-.5)<.025 || Math.abs(windowY-.5)<.035) return [.24,.17,.10];
    return [8.2,4.4,1.65];
  }
  if (lat>.64) return [.48,.81,1.52];
  if (lat<-.18) return [.21,.13,.085];
  return lon<-.6 ? [.11,.29,.34] : [.35,.28,.22];
}
function lookup(texture,u,v) {
  const {width,height,data}=texture;
  const x=(u-Math.floor(u))*width-.5, y=clamp(v*height-.5,0,height-1);
  const ix=Math.floor(x), iy=Math.floor(y), fx=x-ix, fy=y-iy;
  const left=(ix+width)%width, right=(left+1)%width, bottom=Math.min(iy+1,height-1);
  const a=3*(iy*width+left), b=3*(iy*width+right);
  const c=3*(bottom*width+left), d=3*(bottom*width+right);
  return [0,1,2].map(k=>(1-fy)*((1-fx)*data[a+k]+fx*data[b+k])+fy*((1-fx)*data[c+k]+fx*data[d+k]));
}
const uv = (lon,lat) => [lon/tau+.5,.5-lat/pi];
let panorama, baked, reference;
const levels=[], charts=new WeakMap(), samples=new WeakMap();
function environment() {
  if (!panorama) {
    panorama=map(128,64,(x,y)=>room(((x+.5)/128-.5)*tau,(.5-(y+.5)/64)*pi));
    levels.push(panorama);
  }
  return panorama;
}
function mip(level) {
  environment();
  while (levels.length<=level) {
    const prev=levels[levels.length-1], w=prev.width/2, h=prev.height/2;
    levels.push(map(w,h,(x,y)=>{
      const i=3*(y*2*prev.width+x*2), stride=3*prev.width;
      return [0,1,2].map(c=>(prev.data[i+c]+prev.data[i+3+c]+prev.data[i+stride+c]+prev.data[i+stride+3+c])/4);
    }));
  }
  return levels[level];
}
// Rotate each local hemisphere into the normal's tangent frame. Integrate E, without albedo or 1/π.
function integrate(lon,lat,rings,visit) {
  const result=[0,0,0], slices=4*rings, dt=pi/(2*rings), dp=tau/slices;
  const sl=Math.sin(lon), cl=Math.cos(lon), sy=Math.sin(lat), cy=Math.cos(lat);
  const source=environment();
  for (let row=0;row<rings;row++) {
    const theta=(row+.5)*dt, s=Math.sin(theta), z=Math.cos(theta), weight=z*s*dt*dp;
    for (let col=0;col<slices;col++) {
      const p=(col+.5)*dp, x=s*Math.cos(p), y=s*Math.sin(p);
      const wx=x*cl-y*sy*sl+z*cy*sl, wy=y*cy+z*sy, wz=-x*sl-y*sy*cl+z*cy*cl;
      const rgb=lookup(source,Math.atan2(wx,wz)/tau+.5,.5-Math.asin(clamp(wy,-1,1))/pi);
      for (let c=0;c<3;c++) result[c]+=rgb[c]*weight;
      if (visit) visit(x,y,rgb);
    }
  }
  return result;
}
function irradianceMap() {
  if (!baked) baked=map(48,24,(x,y)=>integrate(((x+.5)/48-.5)*tau,(.5-(y+.5)/24)*pi,12).map(v=>v/pi));
  return baked;
}
function chart(texture) {
  if (charts.has(texture)) return charts.get(texture);
  const canvas=document.createElement("canvas");
  canvas.width=texture.width; canvas.height=texture.height;
  const ctx=canvas.getContext("2d"), pixels=ctx.createImageData(canvas.width,canvas.height);
  for (let i=0;i<texture.width*texture.height;i++) {
    for (let c=0;c<3;c++) pixels.data[4*i+c]=byte(texture.data[3*i+c]);
    pixels.data[4*i+3]=255;
  }
  ctx.putImageData(pixels,0,0); charts.set(texture,canvas);
  return canvas;
}
function label(ctx,text,x,y,color=foreground) {
  ctx.fillStyle=color; ctx.font="15px sans-serif"; ctx.fillText(text,x,y);
}
function circle(ctx,x,y,r,color,fill=false) {
  ctx.beginPath(); ctx.arc(x,y,r,0,tau);
  if (fill) {ctx.fillStyle=color; ctx.fill();}
  else {ctx.strokeStyle=color; ctx.lineWidth=2; ctx.stroke();}
}
function marker(ctx,x,y) {
  circle(ctx,x,y,6,"#142224"); circle(ctx,x,y,4,mint);
}
function sample(canvas,engine) {
  if (!samples.has(canvas)) samples.set(canvas,engine.sampleBuffer(canvas));
  return samples.get(canvas);
}
function sphere(buffer,shade) {
  const {context,image,normals}=buffer;
  for (let i=0;i<normals.length;i+=3) {
    const z=normals[i+2]; if (!z) continue;
    const rgb=shade(normals[i],normals[i+1],z), pixel=i/3*4;
    for (let c=0;c<3;c++) image.data[pixel+c]=byte(rgb[c]);
  }
  context.putImageData(image,0,0);
}
function normalSphere(buffer,texture) {
  sphere(buffer,(x,y,z)=>lookup(texture,...uv(Math.atan2(x,z),Math.asin(y))));
}
function panoramaView(ctx,ball,angle) {
  const shift=angle/360*400, env=environment(), picture=chart(env);
  for (let wrap=-1;wrap<=1;wrap++) ctx.drawImage(picture,shift+wrap*400,10,400,200);
  const u=.5-angle/360;
  marker(ctx,200,110);
  sphere(ball,(x,y,z)=>lookup(env,...uv(Math.atan2(2*x*z,2*z*z-1)-radians(angle),Math.asin(clamp(2*y*z,-1,1)))));
  marker(ball.context,ball.canvas.width/2,ball.canvas.height/2);
  return ["展开的环境 · 标记是正前方","理想镜面 · 标记是球心",
    `正前方读到的线性 RGB 为 ${lookup(env,u,.5).map(v=>v.toFixed(2)).join(" / ")}。窗户可超过 1，这些亮度差会参与后面的积分。`];
}
function weights(ctx,ball,degrees) {
  const a=radians(degrees), x=t=>30+340*t/(pi/2), y=t=>174-124*Math.sin(2*t);
  ctx.beginPath(); ctx.moveTo(30,35); ctx.lineTo(30,174); ctx.lineTo(370,174);
  ctx.strokeStyle="#87999c"; ctx.stroke(); ctx.beginPath();
  for (let d=0;d<=90;d++) {const t=radians(d); if (d) ctx.lineTo(x(t),y(t)); else ctx.moveTo(x(t),y(t));}
  ctx.strokeStyle=mint; ctx.lineWidth=3; ctx.stroke(); circle(ctx,x(a),y(a),5,gold,true);
  label(ctx,"天顶 0°",25,200); label(ctx,"45°",188,200); label(ctx,"地平线 90°",300,200);
  label(ctx,"等角宽环带的相对贡献",30,24);
  const c=ball.context, w=ball.canvas.width, r=.44*w;
  c.clearRect(0,0,w,w); circle(c,w/2,w/2,r,"#425754",true);
  for (let d=15;d<=90;d+=15) circle(c,w/2,w/2,r*Math.sin(radians(d)),"#708582");
  circle(c,w/2,w/2,Math.max(1,r*Math.sin(a)),gold);
  return ["均匀天空 · 峰值归一为 100%","从正上方看 · 金线是选中的环",
    String.raw`面积因子 \(\sin\theta = ${Math.sin(a).toFixed(2)}\)，投影因子 \(\cos\theta = ${Math.cos(a).toFixed(2)}\)。乘积在 45° 最大，当前为峰值的 ${(100*Math.sin(2*a)).toFixed(0)}%。`];
}
function sampling(ctx,ball,rings) {
  circle(ctx,200,110,97,"#435751",true);
  const E=integrate(0,0,rings,(x,y,rgb)=>circle(ctx,200+x*96,110-y*96,clamp(15/rings,1.8,8),"rgb("+rgb.map(byte).join(",")+")",true));
  if (!reference) reference=integrate(0,0,64);
  const c=ball.context,w=ball.canvas.width;
  c.clearRect(0,0,w,w);
  for (const [i,rgb] of [E,reference].entries()) {
    c.fillStyle="rgb("+rgb.map(v=>byte(v/pi)).join(",")+")";
    c.fillRect(8+i*w/2,45,w/2-14,72); label(c,i?"密集参考":"当前估计",10+i*w/2,143);
  }
  return ["沿法线看半球 · 点的颜色取自房间","白色漫反射表面 · 两种采样密度",
    String.raw`${rings} 环，每环 ${4*rings} 个方向，共 \(${rings}\times ${4*rings}=${4*rings*rings}\) 次采样。辐照度的线性亮度为 ${lum(E).toFixed(3)}，参考值为 ${lum(reference).toFixed(3)}（16,384 次采样）。`];
}
function maps(ctx,ball,value,compareMip) {
  const top=compareMip?mip(value):environment(), bottom=irradianceMap();
  label(ctx,compareMip?`普通 mip ${value} · ${top.width} × ${top.height}`:"原始环境 Lᵢ",10,18);
  ctx.drawImage(chart(top),0,25,400,78);
  label(ctx,"半球卷积 E/π · 48 × 24",10,130);
  ctx.drawImage(chart(bottom),0,138,400,78);
  normalSphere(ball,compareMip?top:bottom);
  if (compareMip) return ["相同经纬坐标 · 两种滤波","白球按法线读取上方普通 mip",
    `当前普通 mip 有 ${top.width*top.height} 个像素。下方烘焙图的每个像素汇集了其法线上方 576 个方向的光。`];
  const [u,v]=uv(radians(value),0);
  marker(ctx,u*400,64); marker(ctx,u*400,177);
  marker(ball.context,ball.canvas.width*(.5+.48*Math.sin(radians(value))),ball.canvas.height/2);
  return ["标记对应同一个法线方向","白色 Lambert 球 · 按法线查表",
    String.raw`这个方向的原图亮度为 ${lum(lookup(top,u,v)).toFixed(2)}。查烘焙图得到 \(E/\pi = ${lum(lookup(bottom,u,v)).toFixed(2)}\)（线性亮度）。`];
}
const compositions=new WeakMap();
function compose(ctx,ball,ao,engine) {
  const color=[.65,.56,.42], f0=[.04,.04,.04], rough=.4;
  let state=compositions.get(ball);
  if (!state) {
    const indirect=new Float32Array(ball.normals.length), env=irradianceMap();
    for (let i=0;i<indirect.length;i+=3) {
      const [x,y,z]=ball.normals.subarray(i,i+3); if (!z) continue;
      const rgb=lookup(env,...uv(Math.atan2(x,z),Math.asin(y)));
      const F=.04+(1-rough-.04)*(1-z)**5;
      for (let c=0;c<3;c++) indirect[i+c]=(1-F)*color[c]*rgb[c];
    }
    state={indirect,lit:engine.light(-.53,.62,.85,5,f0),off:engine.light(-.53,.62,.85,0,f0)};
    compositions.set(ball,state);
  }
  engine.render(ball,rough,0,color,f0,state.lit,"full");
  ctx.drawImage(ball.canvas,7,17,180,180);
  engine.render(ball,rough,0,color,f0,state.off,"full",state.indirect,ao);
  ctx.drawImage(ball.canvas,213,17,180,180);
  label(ctx,"单灯直接光",58,214); label(ctx,"环境漫反射",263,214);
  engine.render(ball,rough,0,color,f0,state.lit,"full",state.indirect,ao);
  return ["分开观察两个线性光照分量","合成 · 单灯直接光 + 环境漫反射",
    `环境分量保留 ${Math.round(100*ao)}%。${ao===0?"合成球现在与单灯球相同，背光面只剩黑色。":"观察背光面上的颜色，它来自窗户、天空和地面的间接光。"}`];
}
export { map, lookup, environment, irradianceMap, chart, label, circle, marker, sphere, uv };

export function drawEnvironmentLesson(section,engine,specularLessons) {
  const canvases=section.querySelectorAll("canvas"), ctx=canvases[0].getContext("2d");
  const ball=sample(canvases[1],engine);
  if (!ctx || !ball) {section.querySelector(".pbr-finding").textContent="当前浏览器无法显示图解，可展开下方公式阅读。";return;}
  ctx.clearRect(0,0,400,220);
  const input=section.querySelector("input"), v=Number(input.value), kind=section.dataset.ibl;
  const experiments={panorama:panoramaView,weights,integral:sampling,bake:(c,b,n)=>maps(c,b,n,false),
    mip:(c,b,n)=>maps(c,b,n,true),compose,...specularLessons};
  const [diagram,preview,note]=experiments[kind](ctx,ball,v,engine,section);
  const captions=section.querySelectorAll("figcaption");
  captions[0].textContent=diagram; captions[1].textContent=preview;
  canvases[1].setAttribute("aria-label",preview);
  const finding=section.querySelector(".pbr-finding");
  finding.textContent=note;
  if (note.includes("\\(")) window.renderSiteMath(finding);
  section.querySelector("output").value=["panorama","weights","bake","reflection","brdf"].includes(kind)?v+"°":input.step==="0.01"?v.toFixed(2):String(v);
}
