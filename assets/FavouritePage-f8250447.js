import{d as f,c as w,b as E,f as p,g as L,h as N,r as i,R as e,L as S,T as C}from"./index-1d3f652f.js";import{N as F,P as D}from"./NewsList-dd545196.js";import"./images-2289e748.js";const B=()=>{const{isAuthenticated:l}=f(),{allFavourites:s,isLoadingDBData:u,errorDB:a,getFavourites:o,getSavedNews:r}=w(),{hasResults:n}=E(),g=p(),{rebuildedNews:d}=L({activeLinks:g}),h=N();i.useEffect(()=>{a&&a>=500&&h("/serverError")},[a]),i.useEffect(()=>{o(),r()},[o,r]);const t=u||n==="loading",c=s.length===0||n==="empty",m=!c&&!t,v=!t&&s&&s.length>0;return l&&e.createElement(e.Fragment,null,t&&e.createElement(S,{variant:"generalSection"}),v&&e.createElement(C,{variant:"non-interactive",status:"info"}),m&&e.createElement(F,{currentItems:d}),!t&&c&&e.createElement(D,{variant:"page"}))};export{B as default};