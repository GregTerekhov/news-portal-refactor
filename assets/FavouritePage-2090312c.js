import{r as t,R as a,b as L,f as M,g as v,d as C}from"./index-e7c48632.js";import{P as I,N as S}from"./PageTemplate-dac01210.js";import"./images-47112fa2.js";import"./Toast-266ab3d2.js";const h=({onLoadMore:s})=>{const e=t.useRef(null);return t.useEffect(()=>{const o=new IntersectionObserver(r=>{r[0].isIntersecting&&s()},{threshold:1});return e.current&&o.observe(e.current),()=>{e.current&&o.unobserve(e.current)}},[s]),a.createElement("div",{ref:e})},u=5,l=6,w=()=>{const[s,e]=t.useState(0),[o,r]=t.useState(!1),{isMobile:c,isNotMobile:f}=L(),d=M(),{rebuiltNews:n}=v(d);t.useEffect(()=>{n!=null&&n.length&&e(n.length)},[n]);const m=t.useMemo(()=>c?u:f?l:0,[]),[i,E]=t.useState(m),N=t.useMemo(()=>s>i,[s,i]),p=()=>{!N||o||(r(!0),E(g=>g+(c?u:l)),r(!1))};return{displayedNews:n==null?void 0:n.slice(0,i),handleLoadMore:p}},R=()=>{const{getFavourites:s,getSavedNews:e}=C(),{displayedNews:o,handleLoadMore:r}=w();return t.useEffect(()=>{s(),e()},[s,e]),a.createElement(I,null,a.createElement(S,{currentItems:o}),a.createElement(h,{onLoadMore:r}))};export{R as default};
