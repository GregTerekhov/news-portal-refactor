import{r,R as o,b as f,f as m,g as p,d as E}from"./index-94dc73fd.js";import{P as N,N as v}from"./PageTemplate-1d61cef0.js";import"./images-cbfb65dc.js";import"./Toast-d223537f.js";const L=({onLoadMore:t})=>{const e=r.useRef(null);return r.useEffect(()=>{const s=new IntersectionObserver(n=>{n[0].isIntersecting&&t()},{threshold:1});return e.current&&s.observe(e.current),()=>{e.current&&s.unobserve(e.current)}},[t]),o.createElement("div",{ref:e})},a=5,c=6,I=()=>{const{isMobile:t,isNotMobile:e}=f(),s=r.useMemo(()=>t?a:e?c:0,[]),[n,l]=r.useState(s),u=m(),{rebuildedNews:i}=p(u);return{displayedNews:i==null?void 0:i.slice(0,n),handleLoadMore:()=>{l(d=>d+(t?a:c))}}},D=()=>{const{getFavourites:t,getSavedNews:e}=E(),{displayedNews:s,handleLoadMore:n}=I();return r.useEffect(()=>{t(),e()},[t,e]),o.createElement(N,null,o.createElement(v,{currentItems:s}),o.createElement(L,{onLoadMore:n}))};export{D as default};
