import{_ as p,b as k,g as r,r as v,P as h}from"./PageToggle-C04Onhnr.js";import{r as f,c as d,b as t,m as C,l as x,o as g}from"./index-D2aRb88q.js";const b={class:"controls"},y={class:"img-container"},R=["src"],U={__name:"index",setup(w){const a=f(""),c=f(null);let i=!1;const l=k(),_=async()=>{const e=await r({accept:".json"}),s=await v(e.file);l.setAreas(s),i=!0},m=async()=>{const e=await r({accept:"image/*"});console.log(e.file);const s=URL.createObjectURL(e.file);c.value.onload=()=>{const{width:n,height:o}=c.value.getBoundingClientRect();l.setSize(n,o)},a.value=s},u=e=>{i||alert("请先上传文件areas.json");const{offsetX:s,offsetY:n}=e,o=l.getClickArea(s,n);o?console.log("点中的区域信息为--->",o):console.log("未点中任何区域")};return(e,s)=>(g(),d("div",null,[t("div",b,[t("button",{onClick:m},"选择图片"),a.value?(g(),d("button",{key:0,onClick:_},"上传文件areas")):C("",!0)]),t("div",y,[t("img",{src:a.value,alt:"",ref_key:"imgElRef",ref:c,onClick:u},null,8,R)]),x(h)]))}},F=p(U,[["__scopeId","data-v-7e27c584"]]);export{F as default};