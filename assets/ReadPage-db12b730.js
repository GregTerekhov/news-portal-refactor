import{r,c as L,b as S,f as N,g as R,h as A,i as P,R as e,L as b,N as y,A as k}from"./index-7080b43e.js";import{N as C,P as F}from"./NewsList-474ecb16.js";import"./images-2d00613b.js";const I=()=>{const[c,i]=r.useState(!1),{allReads:s,isLoadingDBData:h,getReads:l}=L(),{hasResults:u}=S(),f=N(),d=R(f),{rebuildedNews:a}=A({activeLinks:d}),{sortedDates:m}=P({activeLinks:d});r.useEffect(()=>{l()},[l]),r.useEffect(()=>{s&&(i(!0),console.log("openToast",c))},[s]);const v=s==null?void 0:s.map(t=>t.publishDate).filter(t=>t!==void 0),E=new Set(v),p=m||Array.from(E).sort().reverse(),n=h||u==="loading",g=a.length===0||u==="empty",D=!n&&!g;return e.createElement(e.Fragment,null,n&&e.createElement(b,{variant:"generalSection"}),!n&&a&&e.createElement(y,{variant:"non-interactive",openToast:c,setOpenToast:i,title:"Monthly statistics",description:`${a.length} news added to Reads`}),D&&p.length>0&&e.createElement("div",null,p.map(t=>e.createElement(k,{key:t,dateSeparator:t,position:"readPage"},e.createElement(C,{currentItems:a==null?void 0:a.filter(o=>(o==null?void 0:o.publishDate)!==void 0&&(o==null?void 0:o.publishDate)===t)})))),!n&&g&&e.createElement(F,{variant:"page"}))};export{I as default};
