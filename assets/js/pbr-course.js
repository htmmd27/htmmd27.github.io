import { drawEnvironmentLesson } from "./pbr-environment.js";
// The diagrams are cross sections. Angles are measured from the surface normal.
const rad = degree => degree * Math.PI / 180;
const amber = "#ffca80", mint = "#8fe1ca", ink = "#e4edeb", faint = "#71878d";
const line = (x,y,u,v,color=faint,dash="") =>
  `<line x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="${color}" stroke-width="2" stroke-dasharray="${dash}"/>`;
const dot = (x,y,r,color) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const label = (x,y,text,color=ink,anchor="start") =>
  `<text x="${x}" y="${y}" fill="${color}" text-anchor="${anchor}">${text}</text>`;
function arrow(x,y,u,v,color) {
  const a = Math.atan2(v-y,u-x), tip = 8;
  const vertex = offset => [u-tip*Math.cos(a+offset),v-tip*Math.sin(a+offset)].join(",");
  return line(x,y,u,v,color) + `<polygon points="${u},${v} ${vertex(0.43)} ${vertex(-0.43)}" fill="${color}"/>`;
}
function endpoint(x,y,angle,length) {
  return [x + length*Math.sin(rad(angle)), y - length*Math.cos(rad(angle))];
}
function plane(x,y) {
  return `<path d="M25 ${y} H375 v13 H25Z" fill="#415453"/>` +
    line(25,y,375,y) + line(x,y,x,34,faint,"4 5") + label(x+8,31,"N · 法线");
}
const percent = x => (100*x).toFixed(1) + "%";
const colors = [0.8,0.32,0.10];

function incidence(a) {
  const x=205, y=156, lamp=endpoint(x,y,-a,112);
  const cosine=Math.cos(rad(a));
  const w=13/cosine;
  const arcEnd=endpoint(x,y,-a,34);
  const arc=a>0 ? `<path d="M${x} ${y-34} A34 34 0 0 0 ${arcEnd.join(" ")}" fill="none" stroke="${amber}" stroke-width="1.5"/>` : "";
  const beam=`<polygon points="${x-w},${y} ${lamp[0]-w},${lamp[1]} ${lamp[0]+w},${lamp[1]} ${x+w},${y}" fill="#ffc877" opacity=".19"/>`;
  return {art:plane(x,y)+beam+line(x-w,y,x+w,y,amber)+arrow(...lamp,x,y,amber)+dot(...lamp,6,amber)+arc+
    label(x+9,y-40,a+"°",amber)+
    label(lamp[0]-8,lamp[1]-10,"入射光",amber,"end")+dot(x,y,4,mint)+
    label(x,y+37,"桌面中央",ink,"middle"),
    note:`桌面收到正照时的 ${percent(cosine)}。60° 时恰好是一半。`,
    caption:"球心对应图中的桌面中央", lightAngle:-a, view:"cosine"};
}
function directions(a) {
  const x=199, y=158, lamp=endpoint(x,y,-35,112), mirror=endpoint(x,y,35,104);
  const eye=endpoint(x,y,a,120);
  let fan="";
  for (const b of [-72,-50,-23,0,23,50,72]) fan+=arrow(x,y,...endpoint(x,y,b,48),faint);
  return {art:plane(x,y)+fan+arrow(...lamp,x,y,amber)+dot(...lamp,5,amber)+
    arrow(x,y,...mirror,amber)+line(x,y,...eye,mint,"4 3")+dot(...eye,6,mint)+label(eye[0]+8,eye[1]-5,"V",mint)+
    label(20,201,"灰色扇形：漫反射方向",ink)+label(219,201,"金色箭头：镜面方向",amber),
    note:`视线与理想镜面方向相差 ${Math.abs(35-a)}°。相差越小，这个点越接近高光中心。`,
    caption:"青色小圈追踪同一个表面点",lightAngle:-35-a,mark:-a,view:"full",r:0.24};
}
function facets(r) {
  const slopes=[-0.4,0.8,-0.85,0.3,-0.6,0.9,-0.35,0.2];
  const points=[[32,140]];
  for (const slope of slopes) {
    const [x,y]=points[points.length-1];
    points.push([x+42,y+40*slope*r]);
  }
  const path=points.map(([x,y])=>x+","+y).join(" ");
  let art=`<polygon points="${path} 368,177 32,177" fill="#405653"/><polyline points="${path}" fill="none" stroke="${ink}" stroke-width="2"/>`;
  slopes.forEach((s,i)=>{
    const [x,y]=points[i], dy=40*s*r, midX=x+21, midY=y+dy/2;
    art+=arrow(midX,midY,...endpoint(midX,midY,Math.atan2(dy,42)*180/Math.PI,48),mint);
  });
  return {art:art+label(32,44,"箭头表示每块小镜片的法线",mint)+label(32,200,"微表面放大剖面 · 示意"),
    note:`当前粗糙度 ${r.toFixed(2)}。较光滑时法线集中，高光窄；较粗糙时法线分散，高光变宽。`,
    caption:"GGX 分布 D 的球面视图",view:"D",r};
}
function masking(a) {
  const x=238, y=155, ridgeX=184, ridgeY=98, lamp=endpoint(x,y,-a,145);
  // Test the light ray at the ridge crest against the illustrated height field.
  const blocked=a>0 && y-(x-ridgeX)/Math.tan(rad(a)) > ridgeY;
  const t=rad(a), k=(0.65+1)**2/8, cosine=Math.cos(t);
  const g=cosine/(cosine*(1-k)+k);
  let art=line(x,y,x,29,mint,"4 4")+label(x+10,41,"眼睛",mint);
  art+=line(...lamp,x,y,amber,blocked?"5 4":"")+dot(...lamp,6,amber);
  art+='<path d="M25 164 L110 160 L153 151 L184 98 L215 151 L238 155 L293 156 L375 161 V184 H25Z" fill="#455b56" stroke="#9fbab0" stroke-width="2"/>';
  art+=dot(x,y,4,mint)+label(24,206,blocked?"凸起挡住了通向该点的光线":"光线越过凸起，抵达该点",amber);
  return {art,note:`剖面中的示例点${blocked?"被遮挡":"能收到光"}。球心的统计几何项 G = ${g.toFixed(2)}，它描述许多微表面的平均可见性。`,
    caption:"几何项 G · 球心正对眼睛",lightAngle:-a,view:"G",r:0.65};
}
function fresnelCurve(a,fresnel) {
  const X=t=>50+t*3.45, Y=f=>166-f*130;
  const F=t=>fresnel(0.04,Math.cos(rad(t)));
  let path="";
  for (let i=0;i<=90;i++) path+=(i?" L":"M")+X(i)+" "+Y(F(i));
  const value=F(a);
  const art=line(50,36,50,166)+line(50,166,X(90),166)+line(50,Y(.5),X(90),Y(.5),faint,"2 6")+
    label(12,42,"100%")+label(29,169,"0")+label(50,190,"0°")+label(X(90),190,"90°",ink,"end")+
    label(201,201,"微表面入射角",ink,"middle")+label(58,33,"反射率",mint)+
    `<path d="${path}" fill="none" stroke="${mint}" stroke-width="3"/>`+
    line(X(a),166,X(a),Y(value),amber,"3 4")+dot(X(a),Y(value),5,amber);
  return {art,note:`入射角 ${a}° 时，反射率为 ${percent(value)}。拖到 90°，这个近似的极限值是 100%。`,
    caption:"小圈对应曲线上的取样角度",view:"F",mark:a};
}
function metallic(m) {
  const rgb=colors.map(c=>0.04*(1-m)+c*m);
  let art=label(32,41,"正入射时的镜面反射率 F₀");
  rgb.forEach((value,i)=>{
    const y=62+i*38;
    art+=label(33,y+14,["R","G","B"][i])+ `<rect x="64" y="${y}" width="236" height="15" rx="3" fill="#405151"/><rect x="64" y="${y}" width="${236*value}" height="15" rx="3" fill="${["#f29b87","#9dd6b3","#92bce2"][i]}"/>`+
      label(312,y+14,percent(value));
  });
  return {art:art+label(32,193,"线性 RGB · 固定铜色基础色"),
    note:`红通道的漫反射权重 kᵈ = ${((1-rgb[0])*(1-m)).toFixed(2)}。金属度为 1 时，三个通道的漫反射权重都为零。`,
    caption:"单灯合成 · 粗糙度固定为 0.34",view:"full",color:colors,m,r:0.34};
}

export function startCourse(root,engine) {
  const chapters=Array.from(root.querySelectorAll("[data-chapter]"));
  const buttons=Array.from(root.querySelectorAll("[data-step]"));
  const select=root.querySelector("#pbr-step-select");
  const prev=root.querySelector("#pbr-prev"), next=root.querySelector("#pbr-next");
  const meter=root.querySelector(".pbr-meter"), routeTitle=root.querySelector("#pbr-route-title");
  const examples=[incidence,directions,facets,masking,fresnelCurve,metallic];
  const buffers=new Map();
  const middle=chapters.findIndex(chapter=>chapter.dataset.ibl);
  const bench=chapters.findIndex(chapter=>chapter.hasAttribute("data-bench"));
  const stepName=i=>buttons[i].lastChild.textContent.trim();
  let current=0, queued=false;
  function draw() {
    queued=false;
    if (chapters[current].dataset.ibl) {
      drawEnvironmentLesson(chapters[current],engine);
      return;
    }
    if (!examples[current]) return;
    const section=chapters[current], input=section.querySelector("input"), value=Number(input.value);
    const result=examples[current](value,engine.fresnel);
    section.querySelector("svg").innerHTML=result.art;
    section.querySelector("output").value=input.step==="1"?value+"°":value.toFixed(2);
    section.querySelector(".pbr-finding").textContent=result.note;
    section.querySelector("figcaption").textContent=result.caption;
    const canvas=section.querySelector("canvas");
    if (!buffers.has(canvas)) buffers.set(canvas,engine.sampleBuffer(canvas));
    const sample=buffers.get(canvas);
    if (!sample) return;
    const m=result.m??0, color=result.color??[.16,.43,.36], f0=color.map(c=>.04*(1-m)+c*m);
    const t=rad(result.lightAngle??-34);
    engine.render(sample,result.r??.40,m,color,f0,engine.light(Math.sin(t),0,Math.cos(t),5,f0),result.view);
    if (result.mark!==undefined) {
      const ctx=sample.context, size=canvas.width;
      ctx.beginPath(); ctx.arc(size/2+size*.48*Math.sin(rad(result.mark)),size/2,4,0,2*Math.PI);
      ctx.strokeStyle=mint; ctx.lineWidth=2; ctx.stroke();
    }
  }
  function show(index,focus,record) {
    current=index;
    const ibl=index>=middle;
    chapters.forEach((chapter,i)=>{chapter.hidden=index!==i;});
    buttons.forEach((button,i)=>{
      button.parentElement.hidden=(i>=middle)!==ibl;
      button.toggleAttribute("data-done",i<index);
      if (i===index) button.setAttribute("aria-current","step");
      else button.removeAttribute("aria-current");
    });
    select.value=String(index);
    if (routeTitle) routeTitle.textContent=ibl?"中篇 · 环境漫反射":"上篇 · 单灯直接光";
    if (meter) {
      meter.setAttribute("aria-valuenow",String(index+1));
      meter.style.setProperty("--done",(index+1)/chapters.length);
    }
    const last=index===chapters.length-1;
    root.querySelector("#pbr-final").hidden=!chapters[index].hasAttribute("data-bench");
    for (const part of root.querySelectorAll(".pbr-parts a")) {
      if ((part.hash==="#ibl")===ibl) part.setAttribute("aria-current","true");
      else part.removeAttribute("aria-current");
    }
    prev.disabled=index===0;
    prev.querySelector("span").textContent=index?stepName(index-1):"已是第一步";
    next.querySelector("small").textContent=last?"读完了":index+1===middle?"进入中篇":"下一步";
    next.querySelector("span").textContent=last?"从头回顾":stepName(index+1);
    if (record) {
      const hash=index===0?"#direct":index===middle?"#ibl":"#step-"+(index+1);
      if (location.hash!==hash) history.pushState(null,"",hash);
    }
    draw();
    if (focus) {
      const title=chapters[index].querySelector("h2");
      title.focus({preventScroll:true});
      const top=root.querySelector("#pbr-course").getBoundingClientRect().top;
      if (top<-40 || top>window.innerHeight*.6) root.querySelector("#pbr-course").scrollIntoView({block:"start"});
    }
  }
  const go=index=>show(index,true,true);
  for (const button of buttons) button.addEventListener("click",()=>go(Number(button.dataset.step)));
  select.addEventListener("change",()=>go(Number(select.value)));
  prev.addEventListener("click",()=>go(Math.max(0,current-1)));
  next.addEventListener("click",()=>go((current+1)%chapters.length));
  chapters.forEach(chapter=>{
    const input=chapter.querySelector("input");
    if (!input) return;
    const undo=chapter.querySelector("[data-undo]"), initial=input.defaultValue;
    const sync=()=>{if (undo) undo.hidden=input.value===initial;};
    input.addEventListener("input",()=>{
      sync();
      if (!queued) {queued=true; requestAnimationFrame(draw);}
    });
    undo?.addEventListener("click",()=>{input.value=initial; sync(); draw(); input.focus();});
    sync();
  });
  // Arrow keys page through steps unless a control has keyboard focus.
  document.addEventListener("keydown",event=>{
    if (event.altKey||event.ctrlKey||event.metaKey||event.defaultPrevented) return;
    if (event.target.closest("input,select,textarea,[contenteditable]")) return;
    if (event.key==="ArrowRight" && current<chapters.length-1) {event.preventDefault(); go(current+1);}
    if (event.key==="ArrowLeft" && current>0) {event.preventDefault(); go(current-1);}
  });
  const fromHash=()=>{
    if (location.hash==="#ibl") return middle;
    const match=/^#step-(\d+)$/.exec(location.hash);
    return match?Math.min(chapters.length,Math.max(1,Number(match[1])))-1:0;
  };
  for (const link of root.querySelectorAll(".pbr-parts a")) {
    link.addEventListener("click",event=>{
      event.preventDefault();
      go(link.hash==="#ibl"?middle:0);
    });
  }
  window.addEventListener("popstate",()=>{
    if (/^(|#direct|#ibl|#step-\d+)$/.test(location.hash)) show(fromHash(),true,false);
  });
  // A shared #step-N link lands on the lesson itself rather than the page header.
  show(fromHash(),/^#step-\d+$/.test(location.hash),false);
  return {go,bench};
}
