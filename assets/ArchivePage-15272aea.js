import{j as y,k as g,R as a,S as v,b as x,C as L,r as p,d as w,H as $,U as S,l as D,A as T}from"./index-f7614949.js";import{P as A,N as I}from"./PageTemplate-c323b454.js";import"./images-1c675959.js";import"./Toast-4dcfa68a.js";const b=[{label:"Title"},{label:"Category"},{label:"Addition Date"},{label:"Deletion Date"}],M=56,R=87,_=t=>{const s={};return(t==null?void 0:t.length)>0&&t.forEach(e=>{const r=e==null?void 0:e.additionDate;if(r){const c=y(r,"LLLL yyyy",{locale:g});s[c]||(s[c]=[]),s[c].push(e)}}),s},B=t=>y(t,"dd/MM/yyyy"),j=(t,s)=>{let e;switch(!0){case s:e=R;break;default:e=M;break}return t.length>e?`${t.slice(0,e)}...`:t},k=({handlePageChange:t,currentPage:s,label:e,position:r,iconClass:c})=>{const i=r<s,o="group inline-flex items-center gap-x-2 rounded-full p-2.5 transition-colors duration-500 hocus:bg-accentBase disabled:pointer-events-none disabled:opacity-50 dark:hocus:bg-accentBase dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";return a.createElement("button",{type:"button",onClick:()=>t(i?s-1:s+1),disabled:s===r,className:`${o}`},a.createElement("span",{"aria-hidden":"true"},a.createElement(v,{svgName:"arrow",sizeKey:"xsIcon14",className:`${c} fill-accentBase group-hover:fill-whiteBase group-focus:fill-whiteBase dark:fill-whiteBase`})),a.createElement("span",{className:"sr-only"},e))},H=({currentPage:t,handlePageChange:s,totalPages:e})=>{const{isMobile:r}=x(),c=()=>{const o=[],n=(m,f)=>{for(let d=m;d<=f;d++)o.push(a.createElement("button",{key:d,type:"button","aria-current":"page",className:`${i} ${t===d?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(d)},d))},l=m=>{o.push(a.createElement("span",{key:`dots${m}`,className:"flex w-10 items-center justify-center text-darkBase dark:text-whiteBase"},"..."))};return r?e<=4?n(1,e):t===1?(n(1,2),l("next"),o.push(a.createElement("button",{key:e,type:"button","aria-current":"page",className:`${i} ${t===e?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(e)},e))):t+2===e?(l("prev"),n(t,e)):t+1===e||t===e?(l("prev"),n(e-2,e)):t+2<e&&(l("prev"),n(t,t),l("next"),o.push(a.createElement("button",{key:e,type:"button","aria-current":"page",className:`${i} ${t===e?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(e)},e))):e<=5?n(1,e):t===1?(n(1,3),l("next"),o.push(a.createElement("button",{key:e,type:"button","aria-current":"page",className:`${i} ${t===e?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(e)},e))):t+3===e||t+2===e||t+1===e||t===e?(l("prev"),n(e-3,e)):t+3<e&&(l("prev"),n(t,t+1),l("next"),o.push(a.createElement("button",{key:e,type:"button","aria-current":"page",className:`${i} ${t===e?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(e)},e))),o},i="flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium";return a.createElement(a.Fragment,null,c())},O=({handlePageChange:t,currentPage:s,totalPages:e})=>a.createElement("nav",{className:"flex items-center space-x-1 px-4 py-2"},a.createElement(k,{handlePageChange:t,currentPage:s,label:"Previous",position:1,iconClass:"rotate-90"}),a.createElement(H,{currentPage:s,totalPages:e,handlePageChange:t}),a.createElement(k,{handlePageChange:t,currentPage:s,label:"Next",position:e,iconClass:"-rotate-90"})),V=({displayedRows:t})=>{const{wideScreens:s}=x(),e="whitespace-nowrap px-6 text-small font-medium text-darkBase dark:text-whiteBase lg:text-medium";return a.createElement(L,{isOpen:!0,orientation:"horizontal"},a.createElement("table",{className:"mb-2.5 min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]"},a.createElement("thead",{className:"bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]"},a.createElement("tr",null,b==null?void 0:b.map(({label:r})=>a.createElement("th",{key:r,scope:"col",className:"px-6 py-3 text-start text-xs font-medium uppercase text-greyBase transition-colors duration-500 dark:text-whiteBase md:text-small lg:text-xl"},r)))),a.createElement("tbody",{className:"divide-y divide-whiteBase transition-colors duration-500 dark:divide-gray-700"},Array.isArray(t)&&t.map(({title:r,newsUrl:c,category:i,additionDate:o,deletionDate:n})=>a.createElement("tr",{key:c,className:"group even:bg-greyAlt/[.1]"},a.createElement("td",{className:`${e}`},a.createElement("a",{href:c,target:"_blank",rel:"noopener noreferrer nofollow",className:"block py-4 transition-colors duration-500 focus:text-accentBase group-hover:text-accentBase lg:text-medium"},j(r,s))),a.createElement("td",{className:`${e}`},i),a.createElement("td",{className:`${e}`},B(o)),a.createElement("td",{className:`${e}`},B(n)))))))},h=4,W=t=>{const[s,e]=p.useState(""),[r,c]=p.useState(1),i=p.useMemo(()=>s?t.filter(u=>u.title.toLowerCase().includes(s.toLowerCase())):t,[t,s]),o=i.length,n=Math.ceil(o/h),l=(r-1)*h,m=l+h,f=i.slice(l,m),d=p.useCallback(u=>{const C=u.target.value;e(C),c(1)},[]),N=p.useCallback(u=>{u>=1&&u<=n&&c(u)},[n]);return{searchValue:s,currentPage:r,totalPages:n,displayedRows:f,handleSearchNews:d,handlePageChange:N}},E=()=>{const{clearLog:t}=w(),{isNotMobile:s}=x();return a.createElement("button",{type:"submit",className:"group flex items-center gap-x-4 text-accentBase transition-colors duration-500 hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase max-md:absolute max-md:right-0 max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center",onClick:t},s?"Clear log":null,a.createElement(v,{svgName:"trash",sizeKey:"smIcon18",className:"fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase"}))},z=({logData:t})=>{const{isMobile:s,isNotMobile:e}=x(),{searchValue:r,currentPage:c,totalPages:i,displayedRows:o,handlePageChange:n,handleSearchNews:l}=W(t);return a.createElement("div",{className:"mb-6 flex flex-col overflow-hidden rounded-lg shadow-modal"},a.createElement("div",{className:"inline-block min-w-full align-middle"},a.createElement("div",{className:"divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]"},a.createElement("div",{className:"px-4 py-3 lg:px-6 lg:py-5"},a.createElement("div",{className:"relative max-md:w-[254px] md:flex  md:flex-row-reverse md:items-center md:justify-between"},s?a.createElement($,{label:"Clear deleted news log",side:"bottom",ariaLabel:"Button for clearing deleted news` log",sideOffset:0},a.createElement("div",null,a.createElement(E,null))):null,a.createElement("h3",{className:"mb-4 text-2xl font-medium text-darkBase dark:text-whiteBase"},"Deleted news"),a.createElement(S,{inputData:{name:"Deleted news",type:"text",value:r,placeholder:"Title"},hasIcon:!0,svgName:"search",onChange:m=>l(m),variant:D.FilterServiceBlock}))),a.createElement(V,{displayedRows:o}),a.createElement("div",{className:"flex max-w-xl justify-between"},a.createElement(O,{handlePageChange:n,currentPage:c,totalPages:i}),e?a.createElement(E,null):null))))},q=()=>{const{allArchive:t,archiveHistoryLog:s,getHistoryLog:e,getArchives:r}=w();p.useEffect(()=>{r(),e()},[r,e]);const c=_(t);return a.createElement(A,null,(s==null?void 0:s.length)>0?a.createElement(z,{logData:s}):null,Object.entries(c).reverse().map(([i,o])=>a.createElement(T,{key:i,dateSeparator:i,position:"archivePage"},a.createElement(I,{currentItems:o}))))};export{q as default};
