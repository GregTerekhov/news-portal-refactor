import{u as x,a as O,b as v,c as L,r as C,R as l,P as S,V as w,d as G,e as H,f as D,g as M}from"./index-ad39b321.js";import{P as K,N as Q}from"./PageTemplate-0b22bb0e.js";import"./images-9b1e3f6a.js";import"./Toast-9ce97f19.js";const f={FIRST_MOBILE_PAGE_COUNT:4,FIRST_TABLET_PAGE_COUNT:7,FIRST_DESKTOP_PAGE_COUNT:8,OTHER_MOBILE_PAGE_COUNT:5,OTHER_TABLET_PAGE_COUNT:8,OTHER_DESKTOP_PAGE_COUNT:9},_=1,B={DESKTOP_BUTTONS_QUANTITY:3,MOBILE_BUTTONS_QUANTITY:6},Y=(t,o,s)=>{const e=[o];let a=t-o;for(;a>0;)e.push(s),a-=s;return e},W=(t,o)=>{const s=t&&t.slice(0,-1).reduce((a,c)=>a+c,0);return o-s},$=(t,o,s)=>Y(t,o,s),b=(t,o)=>{try{return W(t,o)}catch(s){return console.error(s.message)}},V=(t,o,s,e,a)=>{const c=o.length,i=t-1,h=t+1,E=s?B.MOBILE_BUTTONS_QUANTITY:B.DESKTOP_BUTTONS_QUANTITY,n=[];if(c<=E)for(let T=_;T<=c;T+=1)n.push(e(T));else t===_?(n.push(e(t)),n.push(e(h)),n.push(a("next")),n.push(e(c))):t===c?(n.push(e(_)),n.push(a("prev")),n.push(e(i)),n.push(e(t))):t>_&&t<c&&(t===2&&(n.push(a("prev")),n.push(e(t)),n.push(e(h)),n.push(a("next")),n.push(e(c))),t-1>_&&t+1!==c&&(n.push(a("prev")),n.push(e(i)),n.push(e(t)),n.push(e(h)),n.push(a("next"))),t+1===c&&(n.push(a("prev")),n.push(e(i)),n.push(e(t)),n.push(e(c))));return n},j=t=>{const{isMobile:o,isTablet:s}=x(),{currentPage:e}=O(),{popularNews:a,newsByKeyword:c,newsByCategory:i,newsByDate:h}=v(),{filteredNews:E}=L(),[n,T]=C.useState([]),r=t&&(t==null?void 0:t.length)||0,P=k(),U=R(),I=$(r,P,U),m=I[e-1]||0,A=b(I,r);C.useEffect(()=>{if(t&&(t==null?void 0:t.length)>0){const g=e*m-1>=r;let u,p;e===1?(u=e*m,p=u-m):e>1&&g&&A?(u=r,p=r-A):(u=e*m-1,p=u-m);const F=t.slice(p,u);T(F)}},[a,c,i,h,E,e]);function k(){return o?f.FIRST_MOBILE_PAGE_COUNT:s?f.FIRST_TABLET_PAGE_COUNT:f.FIRST_DESKTOP_PAGE_COUNT}function R(){return o?f.OTHER_MOBILE_PAGE_COUNT:s?f.OTHER_TABLET_PAGE_COUNT:f.OTHER_DESKTOP_PAGE_COUNT}const d=Math.ceil(e!==1&&o?r/m+1:r/m),y=Array.from({length:d},(g,u)=>u+1);return{currentItems:n,pageNumbers:y}},N=({direction:t,pageNumbers:o,handlePrevClick:s,handleNextClick:e})=>{const{isNotMobile:a}=x(),{currentPage:c}=O(),i=c-1===0,h=c===(o==null?void 0:o.length);return l.createElement(S,{id:`${t} page button`,variant:w.Other,onHandleClick:t==="Prev"?s:e,width:"w-32",disabled:t==="Prev"?i:h,hasIcon:!0,svgName:"arrow",svgSize:"xsIcon14",classNameIcon:`${t==="Prev"?"rotate-90":"-rotate-90"}  fill-whiteBase`,classNameButton:t==="Prev"?"flex-row-reverse":""},a?l.createElement("span",{className:"text-base font-medium text-contrastWhite md:text-medium hg:text-xl"},t):null)},z=({pageNumber:t,onClick:o})=>{const{currentPage:s}=O(),e=`h-10 border-accentBase font-medium transition-colors duration-500 ${t===s?"bg-accentBase text-contrastWhite":"text-darkBase dark:text-whiteBase dark:border-whiteBase"}`;return l.createElement("li",{key:t,onClick:()=>o(t)},l.createElement(S,{"aria-label":`Page ${t.toString()} button`,classNameButton:`${e}`,variant:w.Small},t))},q=({pageNumbers:t})=>{const{isNotMobile:o}=x(),{currentPage:s,setCurrentPage:e}=O(),a=r=>l.createElement("li",{key:r,className:"text-darkBase dark:text-whiteBase"},"..."),c=r=>{e(r),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"})},i=()=>{s>1&&(e(s-1),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"}))},h=()=>{s<t.length&&(e(s+1),window.scrollTo({top:0+window.innerHeight,left:0,behavior:"smooth"}))},T=V(s,t,o,r=>l.createElement(z,{pageNumber:r,onClick:c}),a).map((r,P)=>l.createElement(l.Fragment,{key:P},r));return l.createElement("div",{className:"flex items-center justify-center gap-2"},l.createElement(N,{direction:"Prev",handlePrevClick:i}),l.createElement("ul",{id:"page-numbers",className:"flex items-center gap-2"},T),l.createElement(N,{direction:"Next",pageNumbers:t,handleNextClick:h}))},J=1,st=()=>{const{headline:t,fetchPopular:o}=v(),{getSavedNews:s}=G(),{isAuthenticated:e}=H(),{currentPage:a}=O(),c=D(),{rebuildedNews:i}=M(c),{currentItems:h,pageNumbers:E}=j(i??[]);return C.useEffect(()=>{o({period:J}),e&&s()},[o,s,e]),l.createElement(K,null,t&&l.createElement("h2",{className:"mb-6 text-giant font-bold dark:text-whiteBase"},t),l.createElement(Q,{currentItems:h,currentPage:a}),l.createElement(q,{pageNumbers:E}))};export{st as default};