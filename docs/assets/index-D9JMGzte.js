import{r as _,a as A,w as D,o as P,c as M,b as p,d as f,e as T,f as k,g as B,h as F,i as L,j as $,k as C}from"./index-CTih8lVP.js";import{_ as N,g as R,a as j,c as z,d as U,r as V,P as X}from"./PageToggle-BdOIedoO.js";const t={img_url:null,img_el:null,img_md5:null,canvas_el:null,ctx:null,design:{dw:1920,dh:1080},writing:!1,fontSize:16,currentPoints:[],shapes:[],markPinterColor:"black"},v={getShapes(){const o=localStorage.getItem("img-shape-map")||"{}";return JSON.parse(o)[t.img_md5]||[]},getLastId(){const o=localStorage.getItem("img-shape-ids-map")||"{}",i=JSON.parse(o)[t.img_md5]||[];return i.length===0?1:i.sort((c,g)=>c-g).at(-1)*1+1},initShape(){localStorage.getItem("img-shape-map")||(localStorage.setItem("img-shape-map",JSON.stringify({})),localStorage.setItem("img-shape-ids-map",JSON.stringify({})))},saveShape(o){t.img_md5||alert("请先上传图片");const m=localStorage.getItem("img-shape-map"),i=localStorage.getItem("img-shape-ids-map"),l=JSON.parse(m)||{},c=JSON.parse(i)||{},g=l[t.img_md5]||[],d=c[t.img_md5]||[];let u=!1;if(d.includes(o.id))if(confirm("该点已存在,确认覆盖？"))u=!0;else return;if(u){const x=d.indexOf(o.id+"");debugger;g[x]=o}else g.push(o),d.push(o.id);l[t.img_md5]=g,c[t.img_md5]=d,localStorage.setItem("img-shape-map",JSON.stringify(l)),localStorage.setItem("img-shape-ids-map",JSON.stringify(c))},saveShapes(o){t.img_md5||alert("请先上传图片");const m=localStorage.getItem("img-shape-map"),i=localStorage.getItem("img-shape-ids-map"),l=JSON.parse(m)||{},c=JSON.parse(i)||{},g=o,d=o.map(u=>u.id);l[t.img_md5]=g,c[t.img_md5]=d,localStorage.setItem("img-shape-map",JSON.stringify(l)),localStorage.setItem("img-shape-ids-map",JSON.stringify(c))}},Y={class:"actions"},W={class:"settings"},q={__name:"Controls",setup(o){const m=_(null),i=_(null),l=_(null),c=_(null),g=async()=>{const a=(await R({accept:"image/*",multiple:!1})).file;t.img_name=a.name;const{md5:r}=await j(a);t.img_md5=r;const h=URL.createObjectURL(a);t.img_url=h,k.emit("update-img-url",{img_url:h}),console.log(t),d()},d=()=>{const n=i.value,a=l.value;n.removeAttribute("disabled"),a.setAttribute("disabled",!0),t.writing=!1,t.currentPoints.length=0,u(),k.emit("reset-control")};function u(){t.ctx.clearRect(0,0,t.canvas_el.width,t.canvas_el.height)}const x=n=>{if(!t.img_url)return alert("请先上传图片");const a=i.value,r=l.value,h=c.value;h.value=v.getLastId(),t.writing=!0,a.setAttribute("disabled",!0),r.removeAttribute("disabled"),alert("开始标记点"),t.currentPoints.length=0,k.emit("start-mark-point")},E=n=>{if(t.currentPoints.length<3)return alert("至少需要三个点才能画图");const a=i.value,r=l.value,h=c.value;t.writing=!1,a.removeAttribute("disabled"),r.setAttribute("disabled",!0),alert("结束标记点");const y={id:h.value,points:[...t.currentPoints]};t.shapes.push(y),v.saveShape(y),I()},I=()=>{if(!t.img_url)return alert("请先上传图片");u();const n=t.shapes=v.getShapes();k.emit("draw-all-shapes",{shapes:n})},b=n=>{t.markPinterColor=n.target.value},s=async()=>{const{cancel:n}=z(),a=v.getShapes(),r=t.img_name.replace(/\.[^/.]+$/,"")+"(区域标记).json";await U(a,r),n()},e=async()=>{const n=await R({accept:".json"}),a=await V(n.file);v.saveShapes(a),console.log({shapes:a})};return(n,a)=>{const r=A("scale-sync");return D((P(),M("div",{class:"controls",ref_key:"controlsElRef",ref:m},[p("div",Y,[p("button",{onClick:f(g,["stop"])},"上传图片"),p("button",{onClick:f(x,["stop"]),ref_key:"startElRef",ref:i},"开始",512),p("button",{onClick:f(E,["stop"]),ref_key:"stopElRef",ref:l,disabled:""},"完毕",512),p("button",{type:"number",onClick:f(I,["stop"])},"画出全部图形"),p("button",{onClick:f(s,["stop"])},"导出数据"),p("button",{onClick:f(e,["stop"])},"导入数据"),p("button",{onClick:d},"清空画板"),p("input",{type:"number",ref_key:"inputElRef",ref:c},null,512)]),p("div",W,[p("div",null,[T(" 标记点的颜色 "),p("input",{type:"color",onChange:b},null,32)])])])),[[r]])}}},G=N(q,[["__scopeId","data-v-3dcb24e2"]]),H={class:"catch-patch"},K={class:"img-wrap"},Q=["src"],Z={__name:"CatchPatch",props:{},setup(o){const m=_(null),i=_(null),l=_({img_url:""}),c={"update-img-url":s=>{const e=t.img_el;e.onload=n=>{const{width:a,height:r}=e.getBoundingClientRect();u(a,r)},l.value.img_url=s.img_url},"stop-mark-point":s=>{const e=s.shape;b(e)},"draw-all-shapes":s=>{s.shapes.forEach(n=>{b(n)})}};B(c);const g=()=>{const s=m.value,e=s.getContext("2d");e.font=`${t.fontSize}px Arial`,t.canvas_el=s,t.ctx=e,s.width=s.height=0},d=()=>{const s=i.value;t.img_el=s};function u(s,e){t.design.dw=s,t.design.dh=e,t.canvas_el.width=s,t.canvas_el.height=e,t.ctx.clearRect(0,0,s,e)}const x=()=>{v.initShape(),g(),d()},E=s=>{if(t.writing){const e={x:s.offsetX,y:s.offsetY,design:{...t.design},px:(s.offsetX*100/t.design.dw).toFixed(2)+"%",py:(s.offsetY*100/t.design.dh).toFixed(2)+"%"};console.log(e,new Date().toLocaleTimeString()),t.currentPoints.push(e),I(e)}else alert("Please start writing first")};function I(s){const e=t.ctx;e.beginPath(),e.arc(s.x,s.y,2,0,2*Math.PI),e.fillStyle=t.markPinterColor,e.fill()}function b(s){const e=t.ctx,{id:n=99,points:a}=s,r=a.length;let h=0,y=0;e.beginPath();for(let w=0;w<r;w++){const S=a[w];if(h+=S.x,y+=S.y,!w){e.moveTo(S.x,S.y);continue}e.lineTo(S.x,S.y)}e.closePath(),e.fillStyle="red",e.fill();const O=h/r,J=y/r;e.fillStyle="white",e.fillText(n,O,J)}return F(()=>{x()}),L(()=>{$(c)}),(s,e)=>(P(),M("div",H,[C(G),p("canvas",{ref_key:"canvasElRef",ref:m,onClick:f(E,["stop"])},null,512),p("div",K,[p("img",{src:l.value.img_url,alt:"",ref_key:"imgElRef",ref:i},null,8,Q)])]))}},tt=N(Z,[["__scopeId","data-v-2740eec4"]]),at={__name:"index",setup(o){return(m,i)=>(P(),M("div",null,[C(X),C(tt)]))}};export{at as default};
