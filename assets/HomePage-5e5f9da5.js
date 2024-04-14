import{r as P,u as B,a as k,b as x,c as p,R as r,P as v,V as N,d as L,e as y,f as F,g as G}from"./index-93ed3a0a.js";import{P as H,N as D}from"./PageTemplate-f79c3254.js";import"./images-55120594.js";import"./Toast-02fe6c6f.js";const _={FIRST_MOBILE_PAGE_COUNT:4,FIRST_TABLET_PAGE_COUNT:7,FIRST_DESKTOP_PAGE_COUNT:8,OTHER_MOBILE_PAGE_COUNT:5,OTHER_TABLET_PAGE_COUNT:8,OTHER_DESKTOP_PAGE_COUNT:9},T=1,I={DESKTOP_BUTTONS_QUANTITY:3,MOBILE_BUTTONS_QUANTITY:6},M=(t,s,n)=>{const e=[s];let a=t-s;for(;a>0;)e.push(n),a-=n;return e},K=(t,s)=>{const n=t&&t.slice(0,-1).reduce((a,c)=>a+c,0);return s-n},Q=(t,s,n)=>M(t,s,n);function Y(t,s){switch(!0){case t:return _.FIRST_MOBILE_PAGE_COUNT;case s:return _.FIRST_TABLET_PAGE_COUNT;default:return _.FIRST_DESKTOP_PAGE_COUNT}}function W(t,s){switch(!0){case t:return _.OTHER_MOBILE_PAGE_COUNT;case s:return _.OTHER_TABLET_PAGE_COUNT;default:return _.OTHER_DESKTOP_PAGE_COUNT}}const $=(t,s)=>K(t,s);function V(t,s,n){return Q(t,Y(s,n),W(s,n))}const b=(t,s,n,e,a)=>{const c=s.length,u=t-1,h=t+1,f=n?I.MOBILE_BUTTONS_QUANTITY:I.DESKTOP_BUTTONS_QUANTITY,o=[];if(c<=f)for(let l=T;l<=c;l+=1)o.push(e(l));else t===T?(o.push(e(t)),o.push(e(h)),o.push(a("next")),o.push(e(c))):t===c?(o.push(e(T)),o.push(a("prev")),o.push(e(u)),o.push(e(t))):t>T&&t<c&&(t===2&&(o.push(a("prev")),o.push(e(t)),o.push(e(h)),o.push(a("next")),o.push(e(c))),t-1>T&&t+1!==c&&(o.push(a("prev")),o.push(e(u)),o.push(e(t)),o.push(e(h)),o.push(a("next"))),t+1===c&&(o.push(a("prev")),o.push(e(u)),o.push(e(t)),o.push(e(c))));return o},j=t=>{const[s,n]=P.useState([]),{popularNews:e,newsByKeyword:a,newsByCategory:c,newsByDate:u}=B(),{filteredNews:h}=k(),{isMobile:f,isTablet:o}=x(),{currentPage:l}=p(),i=t&&(t==null?void 0:t.length)||0,O=V(i,f,o),m=O[l-1]||0,w=$(O,i);P.useEffect(()=>{if(t&&(t==null?void 0:t.length)>0){const A=l*m-T>=i,C=l>T&&A&&!!w;let E,d;l===T?(E=l*m,d=E-m):C?(E=l*m,d=E-m-T):(E=l*m-T,d=E-m);const R=t.slice(d,E);n(R)}},[e,a,c,u,h,l]);const S=Math.ceil(l!==1&&f?i/m+1:i/m),U=Array.from({length:S},(A,C)=>C+1);return{currentItems:s,pageNumbers:U}},g=({direction:t,pageNumbers:s,handlePrevClick:n,handleNextClick:e})=>{const{isNotMobile:a}=x(),{currentPage:c}=p(),u=c-1===0,h=c===(s==null?void 0:s.length);return r.createElement(v,{id:`${t} page button`,variant:N.Other,onHandleClick:t==="Prev"?n:e,width:"w-32",disabled:t==="Prev"?u:h,hasIcon:!0,svgName:"arrow",svgSize:"xsIcon14",classNameIcon:`${t==="Prev"?"rotate-90":"-rotate-90"}  fill-whiteBase`,classNameButton:t==="Prev"?"flex-row-reverse":""},a?r.createElement("span",{className:"text-base font-medium text-contrastWhite md:text-medium hg:text-xl"},t):null)},z=({pageNumber:t,onClick:s})=>{const{currentPage:n}=p(),e=`h-10 border-accentBase dark:border-whiteBase font-medium transition-colors duration-500 ${t===n?"bg-accentBase text-contrastWhite hocus:bg-accentAlt":"text-darkBase dark:text-whiteBase"}`;return r.createElement("li",{key:t,onClick:()=>s(t)},r.createElement(v,{"aria-label":`Page ${t.toString()} button`,classNameButton:`${e}`,variant:N.Small},t))},q=({pageNumbers:t})=>{const{isNotMobile:s}=x(),{currentPage:n,setCurrentPage:e}=p(),a=i=>r.createElement("li",{key:i,className:"text-darkBase dark:text-whiteBase"},"..."),c=i=>{e(i),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"})},u=()=>{n>1&&(e(n-1),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"}))},h=()=>{n<t.length&&(e(n+1),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"}))},l=b(n,t,s,i=>r.createElement(z,{pageNumber:i,onClick:c}),a).map((i,O)=>r.createElement(r.Fragment,{key:O},i));return r.createElement("div",{className:"flex items-center justify-center gap-2"},r.createElement(g,{direction:"Prev",handlePrevClick:u}),r.createElement("ul",{id:"page-numbers",className:"flex items-center gap-2"},l),r.createElement(g,{direction:"Next",pageNumbers:t,handleNextClick:h}))},J=1,st=()=>{const{fetchPopular:t}=B(),{getSavedNews:s}=L(),{isAuthenticated:n}=y(),{currentPage:e}=p(),a=F(),{rebuiltNews:c}=G(a),{currentItems:u,pageNumbers:h}=j(c??[]);return P.useEffect(()=>{t({period:J}),n&&s()},[t,s,n]),r.createElement(H,null,r.createElement(D,{currentItems:u,currentPage:e}),r.createElement(q,{pageNumbers:h}))};export{st as default};
