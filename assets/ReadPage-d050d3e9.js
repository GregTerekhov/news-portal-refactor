import{d as l,h as m,f as p,i as u,g as R,r as d,R as a,A as f}from"./index-bd383d04.js";import{P as g,N as E}from"./PageTemplate-7c04653d.js";import"./images-09aaf641.js";import"./Toast-a6c48281.js";const P=()=>{const{getReads:i}=l(),{sortedDates:e}=m(),c=p(),n=u(),{rebuildedNews:o}=R(c);d.useEffect(()=>{i()},[i]);const s=e&&(e==null?void 0:e.length)>0?e:n;return a.createElement(g,null,a.createElement("div",null,s==null?void 0:s.map(r=>a.createElement(f,{key:r,dateSeparator:r,position:"readPage"},a.createElement(E,{currentItems:o==null?void 0:o.filter(t=>(t==null?void 0:t.publishDate)!==void 0&&(t==null?void 0:t.publishDate)===r)})))))};export{P as default};
