import{i as m,j as p,R as e,S as l,c as g,d as u,r as x,L as y,A as h}from"./index-32c9909c.js";import{N as f,P as b}from"./NewsList-74287b93.js";import"./images-35aca745.js";const v=t=>{const a={};return t&&(t==null?void 0:t.length)>0&&t.forEach(r=>{const n=r==null?void 0:r.additionDate;if(n){const s=m(n,"LLLL/yyyy",{locale:p});a[s]||(a[s]=[]),a[s].push(r)}}),a},E=()=>e.createElement("div",{className:"flex flex-col mb-6"},e.createElement("div",{className:"-m-1.5 overflow-x-auto"},e.createElement("div",{className:"p-1.5 min-w-full inline-block align-middle"},e.createElement("div",{className:"border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700"},e.createElement("div",{className:"py-3 px-4"},e.createElement("div",{className:"relative max-w-xs"},e.createElement("label",{className:"sr-only"},"Search"),e.createElement("input",{type:"text",name:"hs-table-with-pagination-search",id:"hs-table-with-pagination-search",className:"py-2 px-3 ps-9 block w-full border-greyAlt shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",placeholder:"Search for news"}),e.createElement("div",{className:"absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3"},e.createElement(l,{svgName:"icon-search",size:20,className:"fill-accentBase dark:fill-whiteBase"})))),e.createElement("div",{className:"overflow-hidden"},e.createElement("table",{className:"min-w-full divide-y divide-gray-200 dark:divide-gray-700"},e.createElement("thead",{className:"bg-gray-50 dark:bg-gray-700"},e.createElement("tr",null,e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"},"Title"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"},"Category"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"},"Addition Date"),e.createElement("th",{scope:"col",className:"px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"},"Deletion Date"))),e.createElement("tbody",{className:"divide-y divide-gray-200 dark:divide-gray-700"},e.createElement("tr",null,e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"},"‘We Went Back to the Stone Age’"),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"},"World"),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"},"02/10/2023"),e.createElement("td",{className:"px-6 py-4 whitespace-nowrap text-end text-sm font-medium"},"23/11/2023"))))),e.createElement("div",{className:"py-1 px-4"},e.createElement("nav",{className:"flex items-center space-x-1"},e.createElement("button",{type:"button",className:"p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"},e.createElement("span",{"aria-hidden":"true"},e.createElement(l,{svgName:"icon-arrow-left",size:16,className:"stroke-accentBase dark:stroke-whiteBase"})),e.createElement("span",{className:"sr-only"},"Previous")),e.createElement("button",{type:"button",className:"min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10","aria-current":"page"},"1"),e.createElement("button",{type:"button",className:"min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"},"2"),e.createElement("button",{type:"button",className:"min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10"},"3"),e.createElement("button",{type:"button",className:"p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"},e.createElement("span",{className:"sr-only"},"Next"),e.createElement("span",{"aria-hidden":"true"},e.createElement(l,{svgName:"icon-arrow-right",size:16,className:"stroke-accentBase fill-transparent dark:stroke-whiteBase"}))))))))),B=()=>{const{isLoadingDBData:t,allArchive:a,getArchives:r}=g(),{isAuthenticated:n}=u();x.useEffect(()=>{r()},[r]);const s=v(a),c=t,i=!t&&a.length!==0;return n&&e.createElement(e.Fragment,null,c&&e.createElement(y,{variant:"page"}),i&&e.createElement(e.Fragment,null,e.createElement(E,null),Object.entries(s).map(([o,d])=>e.createElement(h,{key:o,dateSeparator:o,position:"archivePage"},e.createElement(f,{currentItems:d})))),!c&&!i&&e.createElement(b,{variant:"page"}))};export{B as default};
