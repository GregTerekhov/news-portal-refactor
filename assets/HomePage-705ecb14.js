import{u as I,R as l,P as C,S as N,a as L,b as P,r as w,c as H,d as R,e as W,f as z,g as $,L as j}from"./index-6f1cd553.js";import{P as K,N as Q}from"./NewsList-cf6c225a.js";import"./images-58cc5825.js";const _=({pageNumbers:n,currentPage:e,setCurrentPage:c})=>{const{breakpointsForMarkup:s}=I()??{breakpointsForMarkup:null},h=n.length,u=window.innerHeight,x=s!=null&&s.isNothing||s!=null&&s.isMobile?3:6,t=[],f=1,o=h,d=e-1,m=e+1,a=i=>l.createElement("li",{key:i,className:`${i===e?"active":""}`,onClick:()=>{c(i),window.scrollTo({top:0+u,left:0})}},l.createElement(C,{"aria-label":i.toString(),classNameButton:`h-10 border-accentBase font-medium transition-colors duration-500 ${i===e?"bg-accentBase text-contrastWhite":"text-darkBase dark:text-whiteBase dark:border-whiteBase"}`,variant:"Small"},i)),r=i=>l.createElement("li",{key:i,className:"ellipsis"},l.createElement("span",{className:"text-darkBase dark:text-whiteBase"},"..."));if(h<=x)for(let i=f;i<=o;i+=1)t.push(a(i));else e===f?(t.push(a(e)),t.push(a(m)),t.push(r("next")),t.push(a(o))):e===o?(t.push(a(f)),t.push(r("prev")),t.push(a(d)),t.push(a(e))):e>f&&e<o&&(e===2&&(t.push(r("prev")),t.push(a(e)),t.push(a(m)),t.push(r("next")),t.push(a(o))),e-1>f&&e+1!==o&&(t.push(r("prev")),t.push(a(d)),t.push(a(e)),t.push(a(m)),t.push(r("next"))),e+1===o&&(t.push(r("prev")),t.push(a(d)),t.push(a(e)),t.push(a(o))));const B=()=>{e>1&&(c(e-1),window.scrollTo({top:0+u,left:0}))},E=()=>{e<n.length&&(c(e+1),window.scrollTo({top:0+u,left:0}))};return l.createElement("div",{className:"flex justify-center items-center gap-2"},l.createElement(C,{id:"Previous page button",variant:"OtherButton",onHandleClick:B,width:"w-32",disabled:e-1===0},l.createElement(N,{svgName:"icon-arrow-left",size:24,className:"fill-whiteBase"}),s!=null&&s.isTablet||s!=null&&s.isDesktop?l.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Prev"):null),l.createElement("ul",{id:"page-numbers",className:"flex gap-2"},t),l.createElement(C,{id:"Next page button",variant:"OtherButton",onHandleClick:E,width:"w-32",disabled:e===o},s!=null&&s.isTablet||s!=null&&s.isDesktop?l.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Next"):null,l.createElement(N,{svgName:"icon-arrow-left",size:24,className:"fill-whiteBase rotate-180"})))},q=(n,e,c)=>{const s=[e];let h=n-e;for(;h>0;)s.push(c),h-=c;return s},G=(n,e)=>{const c=n&&n.slice(0,-1).reduce((h,u)=>h+u,0);return e-c},J=(n,e,c)=>q(n,e,c),U=(n,e)=>{try{return G(n,e)}catch(c){return console.error(c.message)}},V=n=>{const{breakpointsForMarkup:e}=I()||{breakpointsForMarkup:null},{popularNews:c,newsByKeyword:s,newsByCategory:h,newsByDate:u}=L(),{filteredNews:x}=P(),[t,f]=w.useState(1),[o,d]=w.useState([]),m=n&&(n==null?void 0:n.length)||0,a=(e==null?void 0:e.isNothing)||(e==null?void 0:e.isMobile),r=A(),B=D(),E=J(m,r,B),i=E[t-1]||0,y=U(E,m);w.useEffect(()=>{if(n&&(n==null?void 0:n.length)>0){const p=t*i-1>=m;let g,v;t===1?(g=t*i,v=g-i):t>1&&p&&y?(g=m,v=m-y):(g=t*i-1,v=g-i);const T=n.slice(v,g);d(T)}},[c,s,h,u,x,t]);function A(){return e!=null&&e.isNothing||e!=null&&e.isMobile?4:e!=null&&e.isTablet?7:8}function D(){return a?5:e!=null&&e.isTablet?8:9}const S=Math.ceil(t!==1&&a?m/i+1:m/i),O=Array.from({length:S},(p,g)=>g+1);return{currentItems:o,pageNumbers:O,currentPage:t,setCurrentPage:f}},F=()=>{const{isLoadingAPIData:n,headline:e,fetchPopular:c}=L(),{isLoadingDBData:s,getSavedNews:h}=H(),{isAuthenticated:u}=R(),x=W(),t=z(x),{rebuildedNews:f}=$({activeLinks:t}),{hasResults:o}=P(),{currentItems:d,currentPage:m,pageNumbers:a,setCurrentPage:r}=V(f??[]);return w.useEffect(()=>{c("1"),u&&h()},[c,h,u]),l.createElement("div",null,n||s&&f&&(d==null?void 0:d.length)===0||o==="loading"?l.createElement(j,{variant:"generalSection"}):l.createElement(l.Fragment,null,f&&f.length===0||o==="empty"?l.createElement(K,{variant:"page"}):l.createElement(l.Fragment,null,e&&l.createElement("h2",{className:"dark:text-whiteBase text-giant font-bold mb-6"},e),l.createElement(Q,{currentItems:d,currentPage:m}),l.createElement(_,{pageNumbers:a,currentPage:m,setCurrentPage:r}))))};export{F as default};
