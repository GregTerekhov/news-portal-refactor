import{r as t,R as a,b as N,f as g,g as C,d as v}from"./index-c914540b.js";import{P as L,N as h}from"./PageTemplate-d3c22dfd.js";import"./images-92ff7b35.js";import"./Toast-de510eda.js";const w=({onLoadMore:s})=>{const e=t.useRef(null);return t.useEffect(()=>{const o=new IntersectionObserver(r=>{r[0].isIntersecting&&s()},{threshold:1});return e.current&&o.observe(e.current),()=>{e.current&&o.unobserve(e.current)}},[s]),a.createElement("div",{ref:e})},u=5,l=6,I=()=>{const[s,e]=t.useState(0),[o,r]=t.useState(!1),{isSmallScreens:i}=N(),d=g(),{rebuiltNews:n}=C(d);t.useEffect(()=>{(n==null?void 0:n.length)>0&&e(n.length)},[n]);const f=t.useMemo(()=>i?u:l,[]),[c,E]=t.useState(f),m=t.useMemo(()=>s>c,[s,c]),S=()=>{!m||o||(r(!0),E(p=>p+(i?u:l)),r(!1))};return{displayedNews:n==null?void 0:n.slice(0,c),handleLoadMore:S}},P=()=>{const{getFavourites:s,getSavedNews:e}=v(),{displayedNews:o,handleLoadMore:r}=I();return t.useEffect(()=>{s(),e()},[s,e]),a.createElement(L,null,a.createElement(h,{currentItems:o}),a.createElement(w,{onLoadMore:r}))};export{P as default};
