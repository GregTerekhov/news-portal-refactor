import{j as h,k as b,R as e,S as N,u as k,C as B,r as E,U as w,l as L,d as D,A as S}from"./index-ad39b321.js";import{P as A,N as C}from"./PageTemplate-0b22bb0e.js";import"./images-9b1e3f6a.js";import"./Toast-9ce97f19.js";const p=[{label:"Title"},{label:"Category"},{label:"Addition Date"},{label:"Deletion Date"}],T=s=>{const t={};return(s==null?void 0:s.length)>0&&s.forEach(o=>{const n=o==null?void 0:o.additionDate;if(n){const a=h(n,"LLLL yyyy",{locale:b});t[a]||(t[a]=[]),t[a].push(o)}}),t},v=({handlePageChange:s,currentPage:t,label:o,position:n,iconClass:a})=>{const r=n<t,c="group inline-flex items-center gap-x-2 rounded-full p-2.5 transition-colors duration-500 hover:bg-accentBase disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-accentBase dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";return e.createElement("button",{type:"button",onClick:()=>s(r?t-1:t+1),disabled:t===n,className:`${c}`},e.createElement("span",{"aria-hidden":"true"},e.createElement(N,{svgName:"arrow",sizeKey:"xsIcon14",className:`${a} fill-accentBase group-hover:fill-whiteBase dark:fill-whiteBase`})),e.createElement("span",{className:"sr-only"},o))},I=({handlePageChange:s,currentPage:t,totalPages:o})=>{const n="flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hover:bg-accentBase hover:text-whiteBase dark:text-whiteBase dark:hover:bg-accentBase lg:text-medium";return e.createElement("nav",{className:"flex items-center space-x-1 px-4 py-2"},e.createElement(v,{handlePageChange:s,currentPage:t,label:"Previous",position:1,iconClass:"rotate-90"}),Array.from({length:o},(a,r)=>e.createElement("button",{key:r,type:"button","aria-current":"page",className:`${n} ${t===r+1?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase"}`,onClick:()=>s(r+1)},r+1)),e.createElement(v,{handlePageChange:s,currentPage:t,label:"Next",position:o,iconClass:"-rotate-90"}))},_=60,$=87,R=({displayedRows:s})=>{const{wideScreens:t}=k(),o=a=>{let r;switch(!0){case t:r=$;break;default:r=_;break}return a.length>r?`${a.slice(0,r)}...`:a},n="whitespace-nowrap px-6 py-4 text-small font-medium text-darkBase dark:text-whiteBase lg:text-medium";return e.createElement(B,{isOpen:!0,orientation:"horizontal"},e.createElement("table",{className:"mb-2.5 min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]"},e.createElement("thead",{className:"bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]"},e.createElement("tr",null,p==null?void 0:p.map(({label:a})=>e.createElement("th",{key:a,scope:"col",className:"px-6 py-3 text-start text-xs font-medium uppercase text-greyBase transition-colors duration-500 dark:text-whiteBase md:text-small lg:text-xl"},a)))),e.createElement("tbody",{className:"divide-y divide-whiteBase transition-colors duration-500 dark:divide-gray-700"},Array.isArray(s)&&s.map(a=>{const{title:r,newsUrl:c,category:i,additionDate:d,deletionDate:m}=a,u=h(d,"dd/MM/yyyy"),g=h(m,"dd/MM/yyyy");return e.createElement("tr",{key:c,className:"group even:bg-greyAlt/[.1]"},e.createElement("td",{className:`${n}`},e.createElement("a",{href:c,target:"_blank",className:"transition-colors duration-500 group-hover:text-accentBase lg:text-medium"},o(r))),e.createElement("td",{className:`${n}`},i),e.createElement("td",{className:`${n}`},u),e.createElement("td",{className:`${n}`},g))}))))},y=7,M=({logData:s})=>{const[t,o]=E.useState(""),[n,a]=E.useState(1),r=t?s.filter(l=>l.title.toLowerCase().includes(t.toLowerCase())):s,c=r.length,i=Math.ceil(c/y),d=(n-1)*y,m=d+y,u=r.slice(d,m),g=l=>{const x=l.target.value;o(x),a(1)},f=l=>{l>=1&&l<=i&&a(l)};return e.createElement("div",{className:"mb-6 flex flex-col overflow-hidden rounded-lg shadow-modal"},e.createElement("div",{className:"inline-block min-w-full align-middle"},e.createElement("div",{className:"divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]"},e.createElement("div",{className:"px-4 py-3 lg:px-6 lg:py-5"},e.createElement("div",{className:"relative w-[254px] md:max-w-xs"},e.createElement(w,{inputData:{name:"Deleted news",type:"text",value:t,placeholder:"Search for deleted news"},hasIcon:!0,svgName:"search",onChange:l=>g(l),variant:L.FilterServiceBlock}))),e.createElement(R,{displayedRows:u}),e.createElement(I,{handlePageChange:f,currentPage:n,totalPages:i}))))},G=()=>{const{allArchive:s,archiveHistoryLog:t,getHistoryLog:o,getArchives:n}=D();E.useEffect(()=>{n(),o()},[n,o]);const a=T(s);return e.createElement(A,null,e.createElement(M,{logData:t}),Object.entries(a).reverse().map(([r,c])=>e.createElement(S,{key:r,dateSeparator:r,position:"archivePage"},e.createElement(C,{currentItems:c}))))};export{G as default};
