import{u as P,R as a,P as C,S as N,a as I,b as L,r as w,c as H,d as R,e as W,f as z,g as $,L as j}from"./index-ab42c01b.js";import{P as K,N as Q}from"./NewsList-89da34e2.js";import"./images-74133ed9.js";const _=({pageNumbers:n,currentPage:e,setCurrentPage:c})=>{const{breakpointsForMarkup:s}=P()??{breakpointsForMarkup:null},h=n.length,u=window.innerHeight,x=s!=null&&s.isNothing||s!=null&&s.isMobile?3:6,t=[],r=1,m=h,g=e-1,o=e+1,l=i=>a.createElement("li",{key:i,className:`${i===e?"active":""}`,onClick:()=>{c(i),window.scrollTo({top:0+u,left:0})}},a.createElement(C,{"aria-label":i.toString(),classNameButton:`h-10 border-accentBase font-medium transition-colors duration-500 ${i===e?"bg-accentBase text-contrastWhite":"text-darkBase dark:text-whiteBase dark:border-whiteBase"}`,variant:"Small"},i)),f=i=>a.createElement("li",{key:i,className:"ellipsis"},a.createElement("span",{className:"text-darkBase dark:text-whiteBase"},"..."));if(h<=x)for(let i=r;i<=m;i+=1)t.push(l(i));else e===r?(t.push(l(e)),t.push(l(o)),t.push(f("next")),t.push(l(m))):e===m?(t.push(l(r)),t.push(f("prev")),t.push(l(g)),t.push(l(e))):e>r&&e<m&&(e===2&&(t.push(f("prev")),t.push(l(e)),t.push(l(o)),t.push(f("next")),t.push(l(m))),e-1>r&&e+1!==m&&(t.push(f("prev")),t.push(l(g)),t.push(l(e)),t.push(l(o)),t.push(f("next"))),e+1===m&&(t.push(f("prev")),t.push(l(g)),t.push(l(e)),t.push(l(m))));const B=()=>{e>1&&(c(e-1),window.scrollTo({top:0+u,left:0}))},E=()=>{e<n.length&&(c(e+1),window.scrollTo({top:0+u,left:0}))};return a.createElement("div",{className:"flex justify-center items-center gap-2"},a.createElement(C,{id:"Previous page button",variant:"OtherButton",onHandleClick:B,width:"w-32"},a.createElement(N,{svgName:"icon-arrow-left",size:24,className:"fill-whiteBase"}),s!=null&&s.isTablet||s!=null&&s.isDesktop?a.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Prev"):null),a.createElement("ul",{id:"page-numbers",className:"flex gap-2"},t),a.createElement(C,{id:"Next page button",variant:"OtherButton",onHandleClick:E,width:"w-32"},s!=null&&s.isTablet||s!=null&&s.isDesktop?a.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Next"):null,a.createElement(N,{svgName:"icon-arrow-left",size:24,className:"fill-whiteBase rotate-180"})))},q=(n,e,c)=>{const s=[e];let h=n-e;for(;h>0;)s.push(c),h-=c;return s},G=(n,e)=>{const c=n&&n.slice(0,-1).reduce((h,u)=>h+u,0);return e-c},J=(n,e,c)=>q(n,e,c),U=(n,e)=>{try{return G(n,e)}catch(c){return console.error(c.message)}},V=n=>{const{breakpointsForMarkup:e}=P()||{breakpointsForMarkup:null},{popularNews:c,newsByKeyword:s,newsByCategory:h,newsByDate:u}=I(),{filteredNews:x}=L(),[t,r]=w.useState(1),[m,g]=w.useState([]),o=n&&(n==null?void 0:n.length)||0,l=(e==null?void 0:e.isNothing)||(e==null?void 0:e.isMobile),f=A(),B=D(),E=J(o,f,B),i=E[t-1]||0,y=U(E,o);w.useEffect(()=>{if(n&&(n==null?void 0:n.length)>0){const p=t*i-1>=o;let d,v;t===1?(d=t*i,v=d-i):t>1&&p&&y?(d=o,v=o-y):(d=t*i-1,v=d-i);const T=n.slice(v,d);g(T)}},[c,s,h,u,x,t]);function A(){return e!=null&&e.isNothing||e!=null&&e.isMobile?4:e!=null&&e.isTablet?7:8}function D(){return l?5:e!=null&&e.isTablet?8:9}const S=Math.ceil(t!==1&&l?o/i+1:o/i),O=Array.from({length:S},(p,d)=>d+1);return{currentItems:m,pageNumbers:O,currentPage:t,setCurrentPage:r}},F=()=>{const{isLoadingAPIData:n,headline:e,fetchPopular:c}=I(),{isLoadingDBData:s,getSavedNews:h}=H(),{isAuthenticated:u}=R(),x=W(),t=z(x),{rebuildedNews:r}=$({activeLinks:t}),{hasResults:m}=L(),{currentItems:g,currentPage:o,pageNumbers:l,setCurrentPage:f}=V(r??[]);return w.useEffect(()=>{c("1"),u&&h()},[c,h,u]),a.createElement("div",null,n||s&&r&&(g==null?void 0:g.length)===0||m==="loading"?a.createElement(j,{variant:"generalSection"}):a.createElement(a.Fragment,null,r&&r.length===0||m==="empty"?a.createElement(K,{variant:"page"}):a.createElement(a.Fragment,null,e&&a.createElement("h2",{className:"dark:text-whiteBase text-giant font-bold mb-6"},e),a.createElement(Q,{currentItems:g,currentPage:o}),a.createElement(_,{pageNumbers:l,currentPage:o,setCurrentPage:f}))))};export{F as default};