import{d as n,f as m,h as p,g as u,i as R,r as d,R as a,A as f}from"./index-ad5dacaa.js";import{P as g,N as E}from"./PageTemplate-3f589f2d.js";import"./images-faea85c3.js";import"./Toast-e6d695e3.js";const k=()=>{const{getReads:i}=n(),c=m(),l=p(),{rebuildedNews:s}=u(c),{sortedDates:t}=R();d.useEffect(()=>{i()},[i]);const o=t&&(t==null?void 0:t.length)>0?t:l;return a.createElement(g,null,a.createElement("div",null,o==null?void 0:o.map(r=>a.createElement(f,{key:r,dateSeparator:r,position:"readPage"},a.createElement(E,{currentItems:s==null?void 0:s.filter(e=>(e==null?void 0:e.publishDate)!==void 0&&(e==null?void 0:e.publishDate)===r)})))))};export{k as default};