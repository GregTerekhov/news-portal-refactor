import{c as n,e as m,g as u,f as p,h as f,r as g,R as a,A as R}from"./index-e39a97d3.js";import{P as E,N as d}from"./PageTemplate-efbc8e8c.js";import"./images-3f795ca4.js";const N=()=>{const{getReads:i}=n(),s=m(),l=u(s),{rebuildedNews:o}=p(s),{sortedDates:t}=f(s);g.useEffect(()=>{i()},[i]);const r=t&&(t==null?void 0:t.length)>0?t:l;return a.createElement(E,null,a.createElement("div",null,r==null?void 0:r.map(c=>a.createElement(R,{key:c,dateSeparator:c,position:"readPage"},a.createElement(d,{currentItems:o==null?void 0:o.filter(e=>(e==null?void 0:e.publishDate)!==void 0&&(e==null?void 0:e.publishDate)===c)})))))};export{N as default};
