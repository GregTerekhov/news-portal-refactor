import{r as n,c as S,b as L,f as R,g as A,h as P,i as b,R as e,L as y,N as C,A as T}from"./index-a14dc9e9.js";import{N as k,P as F}from"./NewsList-5299c486.js";import"./images-72a805b1.js";const O=()=>{const[l,u]=n.useState(!1),[i,d]=n.useState([]),{allReads:a,isLoadingDBData:f,getReads:g}=S(),{hasResults:h}=L(),E=R(),m=A(E),{rebuildedNews:s}=P({activeLinks:m}),{sortedDates:r}=b({activeLinks:m});n.useEffect(()=>{g()},[g]),n.useEffect(()=>{if(d(Array.from(D).sort().reverse()),r.length!==0){d(r);return}console.log("RTCON",i)},[r]),n.useEffect(()=>{a&&(u(!0),console.log("openToast",l))},[a]);const v=a==null?void 0:a.map(t=>t.publishDate).filter(t=>t!==void 0),D=new Set(v),c=f||h==="loading",p=s.length===0||h==="empty",N=!c&&!p;return e.createElement(e.Fragment,null,c&&e.createElement(y,{variant:"generalSection"}),!c&&s&&e.createElement(C,{variant:"non-interactive",openToast:l,setOpenToast:u,title:"Monthly statistics",description:`${s.length} news added to Reads`}),N&&i.length>0&&r.length>=0&&e.createElement("div",null,i.map(t=>e.createElement(T,{key:t,dateSeparator:t,position:"readPage"},e.createElement(k,{currentItems:s==null?void 0:s.filter(o=>(o==null?void 0:o.publishDate)!==void 0&&(o==null?void 0:o.publishDate)===t)})))),!c&&p&&e.createElement(F,{variant:"page"}))};export{O as default};
