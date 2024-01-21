import{l as y,m as w,r as f,R as e,U as B,n as b,S as v,c as L,d as S,e as C,L as D,A,N as P}from"./index-5af3dd8f.js";import{N as I,P as M}from"./NewsList-710a5215.js";import"./images-00cd3ef8.js";const R=a=>{const s={};return a&&(a==null?void 0:a.length)>0&&a.forEach(l=>{const r=l==null?void 0:l.additionDate;if(r){const n=y(r,"LLLL yyyy",{locale:w});s[n]||(s[n]=[]),s[n].push(l)}}),s},F=({logData:a})=>{const[s,l]=f.useState(""),[r,n]=f.useState(1),m=s?a.filter(t=>t.title.toLowerCase().includes(s.toLowerCase())):a,o=7,g=m.length,p=Math.ceil(g/o),i=(r-1)*o,u=i+o,d=m.slice(i,u),x=t=>{const c=t.target.value;l(c),n(1)},h=t=>{t>=1&&t<=p&&n(t)};return e.createElement("div",{className:"flex flex-col mb-6 rounded-lg shadow-modal overflow-hidden"},e.createElement("div",{className:"-m-1.5 overflow-x-auto"},e.createElement("div",{className:"p-1.5 min-w-full inline-block align-middle"},e.createElement("div",{className:"border rounded-lg divide-y divide-greyAlt/[.4] dark:border-greyBase/[.4] dark:divide-greyBase/[.4]"},e.createElement("div",{className:"py-3 px-4"},e.createElement("div",{className:"relative max-w-xs"},e.createElement(B,{inputData:{name:"Deleted news",type:"text",value:s,placeholder:"Search for deleted news"},hasIcon:!0,svgName:"icon-search",onChange:t=>x(t),variant:b.FilterServiceBlock}))),e.createElement("div",{className:"overflow-hidden"},e.createElement("table",{className:"min-w-full divide-y divide-greyAlt/[.4] dark:divide-greyBase/[.4]"},e.createElement("thead",{className:"bg-accentBase/[.2] dark:bg-greyBase/[.4]"},e.createElement("tr",null,e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase"},"Title"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase"},"Category"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs  md:text-small font-medium text-greyBase dark:text-whiteBase uppercase"},"Addition Date"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs md:text-small font-medium text-greyBase dark:text-whiteBase uppercase"},"Deletion Date"))),e.createElement("tbody",{className:"divide-y divide-gray-200 dark:divide-gray-700"},d&&d.map(({title:t,newsUrl:c,category:E,additionDate:N,deletionDate:k})=>e.createElement("tr",{key:c,className:"even:bg-greyAlt/[.1] group"},e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBase dark:text-whiteBase"},e.createElement("a",{href:c,target:"_blank",className:" group-hover:text-accentBase transition-colors duration-500"},t.length>60?`${t.slice(0,65)}...`:t)),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-darkBase dark:text-whiteBase"},E),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-darkBase dark:text-whiteBase"},y(N,"dd/MM/yyyy")),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-darkBase dark:text-whiteBase"},y(k,"dd/MM/yyyy"))))))),e.createElement("div",{className:"py-1 px-4"},e.createElement("nav",{className:"flex items-center space-x-1"},e.createElement("button",{type:"button",onClick:()=>h(r-1),className:"p-2.5 inline-flex items-center gap-x-2 rounded-full hover:bg-greyAlt/[.2] disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"},e.createElement("span",{"aria-hidden":"true"},e.createElement(v,{svgName:"icon-arrow-left",size:20,className:"fill-accentBase dark:fill-whiteBase"})),e.createElement("span",{className:"sr-only"},"Previous")),Array.from({length:p},(t,c)=>e.createElement("button",{key:c,type:"button","aria-current":"page",className:"min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-greyAlt/[.2] py-2.5 text-sm rounded-full dark:text-white dark:hover:bg-whiteBase/[.2]",onClick:()=>h(c+1)},c+1)),e.createElement("button",{type:"button",onClick:()=>h(r+1),className:"p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-greyAlt/[.2] disabled:opacity-50 disabled:pointer-events-none  dark:hover:bg-whiteBase/[.2] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"},e.createElement("span",{className:"sr-only"},"Next"),e.createElement("span",{"aria-hidden":"true"},e.createElement(v,{svgName:"icon-arrow-left",size:20,className:"fill-accentBase dark:fill-whiteBase rotate-180"})))))))))},j=()=>{const{isLoadingDBData:a,allArchive:s,archiveHistoryLog:l,getHistoryLog:r,getArchives:n}=L(),{isAuthenticated:m}=S(),{openToast:o,setOpenToast:g}=C();f.useEffect(()=>{n(),r()},[n,r]);const p=R(s),i=a,u=!a&&s.length!==0;return m&&e.createElement(e.Fragment,null,i&&e.createElement(D,{variant:"generalSection"}),u&&e.createElement(e.Fragment,null,e.createElement(F,{logData:l}),Object.entries(p).map(([d,x])=>e.createElement(A,{key:d,dateSeparator:d,position:"archivePage"},e.createElement(I,{currentItems:x})))),!i&&!u&&e.createElement(M,{variant:"page"}),o&&e.createElement(P,{variant:"non-interactive",openToast:o,setOpenToast:g,title:"Delete news",description:"News has been successfully deleted"}))};export{j as default};