import{j as S,R as e,S as I,b as k,C as D,k as A,l as O,P as U,V as $,r as f,d as _,m as j,n as F,U as H,o as V,M as W,H as G,A as z}from"./index-8e6938f2.js";import{P as q,N as K}from"./PageTemplate-5cecf9fc.js";import"./images-0f820a8d.js";import"./Toast-91510aee.js";const v=[{label:"Title"},{label:"Category"},{label:"Addition Date"},{label:"Deletion Date"}],X=56,Y=87,J=a=>{const s={};return(a==null?void 0:a.length)>0&&a.forEach(t=>{const n=t==null?void 0:t.additionDate;if(n){const l=S(n).fullMonthYear;s[l]||(s[l]=[]),s[l].push(t)}}),s},Q=(a,s)=>{let t;switch(!0){case s:t=Y;break;default:t=X;break}return a.length>t?`${a.slice(0,t)}...`:a},L=({handlePageChange:a,currentPage:s,label:t,position:n,iconClass:l})=>{const c=n<s,o="group inline-flex items-center gap-x-2 rounded-full p-2.5 transition-colors duration-500 hocus:bg-accentBase disabled:pointer-events-none disabled:opacity-50 dark:hocus:bg-accentBase dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";return e.createElement("button",{type:"button",onClick:()=>a(c?s-1:s+1),disabled:s===n,className:o},e.createElement("span",{"aria-hidden":"true"},e.createElement(I,{svgName:"arrow",sizeKey:"xsIcon14",className:`${l} fill-accentBase group-hover:fill-whiteBase group-focus:fill-whiteBase dark:fill-whiteBase`})),e.createElement("span",{className:"sr-only"},t))},Z=4,P=5,B=2,N=3,u=1,ee=({currentPage:a,handlePageChange:s,totalPages:t})=>{const{isMobile:n}=k(),l=()=>{const o=[],d=(i,h)=>i===h?"bg-accentBase text-whiteBase":"bg-transparent text-darkBase dark:text-whiteBase",r=(i,h)=>{for(let E=i;E<=h;E+=u)o.push(e.createElement("button",{key:E,type:"button","aria-current":"page",className:`${c} ${d(a,E)}`,onClick:()=>s(E)},E))},m=i=>{o.push(e.createElement("span",{key:`dots${i}`,className:"flex w-10 items-center justify-center text-darkBase dark:text-whiteBase"},"..."))},p=()=>{o.push(e.createElement("button",{key:t,type:"button","aria-current":"page",className:`${c} ${d(a,t)}`,onClick:()=>s(t)},t))},g=a+B===t||a+u===t||a===t,b=a+N===t||a+B===t||a+u===t||a===t;return n?t<=Z?r(u,t):a===u?(r(u,B),m("next"),p()):g?(m("prev"),r(t-B,t)):a+B<t&&(m("prev"),r(a,a),m("next"),p()):t<=P?r(u,t):a===u?(r(u,N),m("next"),p()):b?(m("prev"),r(t-N,t)):a+N<t&&(m("prev"),r(a,a+u),m("next"),p()),o},c="flex w-10 h-10 items-center justify-center rounded-full py-2.5 text-small text-darkBase transition-colors duration-500 hocus:bg-accentBase hocus:text-whiteBase dark:text-whiteBase dark:hocus:bg-accentBase lg:text-medium";return e.createElement(e.Fragment,null,l())},te=({handlePageChange:a,currentPage:s,totalPages:t})=>e.createElement("nav",{className:"flex items-center space-x-1 py-2"},e.createElement(L,{handlePageChange:a,currentPage:s,label:"Previous",position:1,iconClass:"rotate-90"}),e.createElement(ee,{currentPage:s,totalPages:t,handlePageChange:a}),e.createElement(L,{handlePageChange:a,currentPage:s,label:"Next",position:t,iconClass:"-rotate-90"})),ae=({displayedRows:a})=>{const{wideScreens:s}=k(),t="whitespace-nowrap px-6 text-small font-medium text-darkBase dark:text-whiteBase lg:text-medium group-hover:text-whiteBase transition-colors duration-500";return e.createElement(D,{isOpen:!0,orientation:"horizontal"},e.createElement("table",{className:"mb-2.5 min-w-full divide-y divide-greyAlt/[.4] transition-colors duration-500 dark:divide-greyBase/[.4]"},e.createElement("thead",{className:"bg-accentBase/[.2] transition-colors duration-500 dark:bg-greyBase/[.4]"},e.createElement("tr",null,v==null?void 0:v.map(({label:n})=>e.createElement("th",{key:n,scope:"col",className:"px-6 py-3 text-start text-xs font-medium uppercase text-greyBase transition-colors duration-500 dark:text-whiteBase md:text-small lg:text-xl"},n)))),e.createElement("tbody",{className:"divide-y divide-whiteBase transition-colors duration-500 dark:divide-gray-700"},Array.isArray(a)&&a.map(({title:n,newsUrl:l,category:c,additionDate:o,deletionDate:d})=>e.createElement("tr",{key:l,className:"group transition-colors duration-500 even:bg-greyAlt/[.1] hover:bg-accentBase/65"},e.createElement("td",{className:`${t}`},e.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer nofollow",className:"block py-4 lg:text-medium"},Q(n,s))),e.createElement("td",{className:`${t}`},c),e.createElement("td",{className:`${t}`},S(o).dayMonthYear),e.createElement("td",{className:`${t}`},S(d).dayMonthYear))))))},T=({toggleModal:a})=>{const{isNotMobile:s}=k(),t="group flex items-center gap-x-4 text-accentBase transition-colors duration-500 hocus:text-accentAlt dark:text-whiteBase dark:hocus:text-accentBase max-md:absolute max-md:right-0 max-md:top-0 max-md:h-10 max-md:w-10 max-md:justify-center",n="fill-accentBase group-hover:fill-accentAlt group-focus:fill-accentAlt dark:fill-whiteBase dark:group-hover:fill-accentBase dark:group-focus:fill-accentBase";return e.createElement("button",{type:"button",className:t,onClick:a},s?"Clear log":null,e.createElement(I,{svgName:"trash",sizeKey:"smIcon18",className:n}))},se=({handleClearing:a,handleClose:s})=>{const{isOpenModal:t}=A(),n=[{onClick:l=>s(l,!0),id:"Cancel clearing log",label:"Cancel",icon:"reset"},{onClick:a,id:"Clear deleted news log",label:"Delete",icon:"trash"}];return e.createElement(O,{enabled:t},e.createElement("div",null,e.createElement("h3",{className:"mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl"},"Clear log"),e.createElement("p",{className:"mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl"},"Are you sure you want to clear the log of deleted news?"),e.createElement("ul",{className:"max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8"},Array.isArray(n)&&n.map(({onClick:l,id:c,label:o,icon:d})=>e.createElement("li",{key:o,className:"w-full"},e.createElement(U,{variant:$.Primary,onHandleClick:l,hasIcon:!0,id:c,svgName:d,svgSize:"smIcon18",classNameIcon:"fill-whiteBase",classNameButton:"md:text-xl border border-whiteBase"},o))))))},y=1,C=7,ne=a=>{const[s,t]=f.useState(""),[n,l]=f.useState(y),c=f.useMemo(()=>s?a.filter(i=>i.title.toLowerCase().includes(s.toLowerCase())):a,[a,s]),o=c.length,d=Math.ceil(o/C),r=(n-y)*C,m=r+C,p=c.slice(r,m),g=f.useCallback(i=>{const h=i.target.value;t(h),l(y)},[]),b=f.useCallback(i=>{i>=y&&i<=d&&l(i)},[d]);return{searchValue:s,currentPage:n,totalPages:d,displayedRows:p,handleSearchNews:g,handlePageChange:b}},le=({logData:a})=>{const{clearLog:s,getHistoryLog:t}=_(),{showToast:n}=j(),{isMobile:l,isNotMobile:c}=k(),{isOpenModal:o,modalType:d}=A(),{toggleModal:r,popUpRef:m}=F(),{searchValue:p,currentPage:g,totalPages:b,displayedRows:i,handlePageChange:h,handleSearchNews:E}=ne(a),R=async()=>{try{const x=await s();await t(),n(x.meta.requestStatus)}catch(x){console.error("Error during clearLog:",x)}r()},M=x=>x?e.createElement(G,{label:"Clear deleted news log",side:"bottom",ariaLabel:"Button for clearing deleted news` log",sideOffset:0},e.createElement("div",null,e.createElement(T,{toggleModal:w=>r(w,!0,"clearLog")}))):e.createElement(T,{toggleModal:w=>r(w,!0,"clearLog")});return e.createElement(e.Fragment,null,e.createElement("div",{className:"mb-10 flex flex-col overflow-hidden rounded-lg shadow-modal"},e.createElement("div",{className:"inline-block min-w-full align-middle"},e.createElement("div",{className:"divide-y divide-greyAlt/[.4] overflow-hidden rounded-lg border dark:divide-greyBase/[.4] dark:border-greyBase/[.4]"},e.createElement("div",{className:"px-4 py-3 lg:px-6 lg:py-5"},e.createElement("div",{className:"relative max-md:w-[254px] md:flex md:flex-row-reverse md:items-center md:justify-between"},l?M(l):null,e.createElement("h3",{className:"mb-4 text-2xl font-medium text-darkBase dark:text-whiteBase"},"Deleted news"),e.createElement("div",null,e.createElement(H,{inputData:{name:"Deleted news",type:"text",value:p,placeholder:"Title"},hasIcon:!0,svgName:"search",onChange:x=>E(x),variant:V.FilterServiceBlock})))),e.createElement(ae,{displayedRows:i}),e.createElement("div",{className:"flex justify-between px-4 lg:px-6"},e.createElement(te,{handlePageChange:h,currentPage:g,totalPages:b}),c?M(l):null)))),o&&d==="clearLog"&&e.createElement(W,{closeModal:r,modalRef:m},e.createElement(se,{handleClose:x=>r(x),handleClearing:R})))},de=()=>{const{allArchive:a,archiveHistoryLog:s,getHistoryLog:t,getArchives:n}=_();f.useEffect(()=>{n(),t()},[n,t]);const l=J(a);return e.createElement(q,null,(s==null?void 0:s.length)>0?e.createElement(le,{logData:s}):null,Object.entries(l).reverse().map(([c,o])=>e.createElement(z,{key:c,dateSeparator:c,position:"archivePage"},e.createElement(K,{currentItems:o}))))};export{de as default};
