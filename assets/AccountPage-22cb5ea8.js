import{e as i,b as d,R as e,S as u}from"./index-8e6938f2.js";const x=t=>{const{id:a,name:n,email:c}=t;return[{label:"Account ID: ",value:a},{label:"Your name: ",value:n},{label:"Your email: ",value:c}]},g=t=>[{iconName:"google",linked:t.google},{iconName:"facebook",linked:t.facebook},{iconName:"apple",linked:t.apple}].filter(n=>n.linked),b=()=>{const{user:t,haveAccounts:a}=i(),{isMobile:n}=d(),c=x(t),s=g(a),r=a.google||a.facebook||a.apple,o="text-darkBase dark:text-whiteBase text-end";return e.createElement("div",null,e.createElement("h2",{className:`${o} mb-14 text-3xl leading-tighter hg:text-5xl`},"Your account"),e.createElement("div",{className:"flex flex-col items-end"},e.createElement("ul",{className:"mb-6 w-52 space-y-6 md:mb-10 md:w-80 md:space-y-10 lg:w-600px"},Array.isArray(c)&&c.map(({label:l,value:m})=>e.createElement("li",{key:l},e.createElement("h3",{className:`${o} mb-2 md:text-2xl hg:text-3xl`},l),e.createElement("p",{className:"text-end text-accentBase dark:text-greyAlt md:text-medium hg:text-xl"},m)))),r&&e.createElement(e.Fragment,null,e.createElement("h3",{className:`${o} mb-4 md:text-2xl hg:text-3xl`},"Connected accounts"),e.createElement("ul",{className:"flex items-center justify-end gap-x-4 md:gap-x-6"},Array.isArray(s)&&s.map(({iconName:l})=>e.createElement("li",{key:l,className:"rounded-[10px] border border-solid bg-accentBase p-2 dark:border-whiteBase"},e.createElement(u,{svgName:l,sizeKey:n?"smIcon20":"mdIcon24",className:"fill-whiteBase"})))))))};export{b as default};
