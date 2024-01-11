import{u as R,R as t,P as O,V as S,S as L,a as D,b as W,r as v,c as q,d as K,e as V,f as _,g as $,h as b,L as z,N as Q}from"./index-d8eb0c97.js";import{P as U,N as Y}from"./NewsList-c5830f6a.js";import"./images-1a9099ce.js";const P="w-32",A=24,j=({pageNumbers:n,currentPage:e,setCurrentPage:l})=>{const{breakpointsForMarkup:c}=R()??{breakpointsForMarkup:null},m=(c==null?void 0:c.isTablet)||(c==null?void 0:c.isDesktop),g=n.length,w=window.innerHeight,h=m?6:3,s=[],p=1,i=g,r=e-1,f=e+1,a=o=>t.createElement("li",{key:o,className:`${o===e?"active":""}`,onClick:()=>{l(o),window.scrollTo({top:0+w,left:0})}},t.createElement(O,{"aria-label":o.toString(),classNameButton:`h-10 border-accentBase font-medium transition-colors duration-500 ${o===e?"bg-accentBase text-contrastWhite":"text-darkBase dark:text-whiteBase dark:border-whiteBase"}`,variant:S.Small},o)),d=o=>t.createElement("li",{key:o,className:"ellipsis"},t.createElement("span",{className:"text-darkBase dark:text-whiteBase"},"..."));if(g<=h)for(let o=p;o<=i;o+=1)s.push(a(o));else e===p?(s.push(a(e)),s.push(a(f)),s.push(d("next")),s.push(a(i))):e===i?(s.push(a(p)),s.push(d("prev")),s.push(a(r)),s.push(a(e))):e>p&&e<i&&(e===2&&(s.push(d("prev")),s.push(a(e)),s.push(a(f)),s.push(d("next")),s.push(a(i))),e-1>p&&e+1!==i&&(s.push(d("prev")),s.push(a(r)),s.push(a(e)),s.push(a(f)),s.push(d("next"))),e+1===i&&(s.push(d("prev")),s.push(a(r)),s.push(a(e)),s.push(a(i))));const x=()=>{e>1&&(l(e-1),window.scrollTo({top:0+w,left:0}))},u=()=>{e<n.length&&(l(e+1),window.scrollTo({top:0+w,left:0}))};return t.createElement("div",{className:"flex justify-center items-center gap-2"},t.createElement(O,{id:"Previous page button",variant:S.Other,onHandleClick:x,width:P,disabled:e-1===0},t.createElement(L,{svgName:"icon-arrow-left",size:A,className:"fill-whiteBase"}),m?t.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Prev"):null),t.createElement("ul",{id:"page-numbers",className:"flex gap-2"},s),t.createElement(O,{id:"Next page button",variant:S.Other,onHandleClick:u,width:P,disabled:e===i},m?t.createElement("span",{className:"text-base md:text-medium font-medium text-contrastWhite"},"Next"):null,t.createElement(L,{svgName:"icon-arrow-left",size:A,className:"fill-whiteBase rotate-180"})))},J=()=>t.createElement("div",null,t.createElement("h1",null,"429"),t.createElement("h2",null,"TOO MANY REQUESTS"),t.createElement("p",null,"It seems you have been send too much requests then its needed"),t.createElement("p",null,"Just wait a bit and refresh the page one more time"),t.createElement("p",null,"but only one time")),Z=(n,e,l)=>{const c=[e];let m=n-e;for(;m>0;)c.push(l),m-=l;return c},G=(n,e)=>{const l=n&&n.slice(0,-1).reduce((m,g)=>m+g,0);return e-l},X=(n,e,l)=>Z(n,e,l),F=(n,e)=>{try{return G(n,e)}catch(l){return console.error(l.message)}},M=n=>{const{breakpointsForMarkup:e}=R()||{breakpointsForMarkup:null},{popularNews:l,newsByKeyword:c,newsByCategory:m,newsByDate:g}=D(),{filteredNews:w}=W(),[h,s]=v.useState(1),[p,i]=v.useState([]),r=n&&(n==null?void 0:n.length)||0,f=(e==null?void 0:e.isNothing)||(e==null?void 0:e.isMobile),a=y(),d=B(),x=X(r,a,d),u=x[h-1]||0,o=F(x,r);v.useEffect(()=>{if(n&&(n==null?void 0:n.length)>0){const C=h*u-1>=r;let E,N;h===1?(E=h*u,N=E-u):h>1&&C&&o?(E=r,N=r-o):(E=h*u-1,N=E-u);const H=n.slice(N,E);i(H)}},[l,c,m,g,w,h]);function y(){return e!=null&&e.isNothing||e!=null&&e.isMobile?4:e!=null&&e.isTablet?7:8}function B(){return f?5:e!=null&&e.isTablet?8:9}const T=Math.ceil(h!==1&&f?r/u+1:r/u),I=Array.from({length:T},(C,E)=>E+1);return{currentItems:p,pageNumbers:I,currentPage:h,setCurrentPage:s}},se=()=>{const{isLoadingAPIData:n,headline:e,fetchPopular:l}=D(),{isLoadingDBData:c,getSavedNews:m}=q(),{isAuthenticated:g}=K(),{openToast:w,setOpenToast:h}=V(),s=_(),p=$(s),{rebuildedNews:i}=b({activeLinks:p}),{hasResults:r}=W(),{currentItems:f,currentPage:a,pageNumbers:d,setCurrentPage:x}=M(i??[]),{errorAPI:u,newsByDate:o,newsByKeyword:y,newsByCategory:B}=D(),T=u==null?void 0:u.toString().includes("429");return v.useEffect(()=>{l("1"),g&&m()},[l,m,g]),v.useEffect(()=>{const I=o.length>0,C=y.length>0,E=B.length>0;(I||C||E)&&console.log(`There are ${i.length} news has been found`)},[o,y,B]),t.createElement("div",null,n||c&&i&&(f==null?void 0:f.length)===0||r==="loading"?t.createElement(z,{variant:"generalSection"}):T?t.createElement(J,null):t.createElement(t.Fragment,null,i&&i.length===0||r==="empty"?t.createElement(U,{variant:"page"}):t.createElement(t.Fragment,null,e&&t.createElement("h2",{className:"dark:text-whiteBase text-giant font-bold mb-6"},e),t.createElement(Y,{currentItems:f,currentPage:a}),t.createElement(j,{pageNumbers:d,currentPage:a,setCurrentPage:x}))),g&&t.createElement(Q,{variant:"non-interactive",openToast:w,setOpenToast:h,title:"Welcome",description:"Welcome to New York Times News Viewer"}))};export{se as default};
