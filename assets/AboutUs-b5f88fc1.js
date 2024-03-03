import{I as g,R as e,S as b,s as k}from"./index-b1d6c337.js";import{m as p,a as u,b as v,u as h}from"./images-9b9ce44d.js";const x=(a,t,r)=>[{groupTitle:"Front-end",groupMembers:[{memberImage:a,imageDescription:"Greg Terekhov",memberName:"Greg Terekhov",memberRole:"Team leader, scrum, developer",memberCV:"https://drive.google.com/file/d/1UK9RnTddIt39_VsQnd70jJe0ii3AhZFL/view?usp=sharing",githubLink:"https://github.com/GregTerekhov",linkedinLink:"https://www.linkedin.com/in/greg-terekhov/",emailLink:"mailto:gregterekhov@gmail.com",telegramLink:"http://t.me/GregTerekhov"},{memberImage:t,imageDescription:"Max Mordovtsev",memberName:"Max Mordovtsev",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/19lChIbPB0JDQeeP2y7EpqPYfrK9ZyKXc/view?usp=sharing",githubLink:"https://github.com/Max3281",linkedinLink:"https://www.linkedin.com/in/maxim-mordovtsev/",emailLink:"mailto:9.crover@gmail.com",telegramLink:"http://t.me/ZCrover"}]},{groupTitle:"Back-end",groupMembers:[{memberImage:r,imageDescription:"Dmytro Pavlenko",memberName:"Dmytro Pavlenko",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/15pBheHpJaq_u8UyXg0W31FrZEey5Z3vC/view?usp=sharing",githubLink:"https://github.com/PavlenkoDm",linkedinLink:"https://www.linkedin.com/in/pavlenko-dmitry/",emailLink:"mailto:dmpavlenko07@gmail.com",telegramLink:"http://t.me/Pavlenko_Dm"}]}],w=(a,t,r,m)=>[{link:a,icon:"icon-github",iconSize:g.mdIcon28},{link:t,icon:"icon-linkedin",iconSize:g.mdIcon28},{link:r,icon:"icon-gmail",iconSize:g.lgIcon30},{link:m,icon:"icon-telegram",iconSize:g.mdIcon28}],f=({githubLink:a,linkedinLink:t,emailLink:r,telegramLink:m})=>{const l="w-14 h-14 lg:w-12 lg:h-12 hg:w-16 hg:h-16 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors ring-whiteBase dark:ring-darkBase ring-2",o="fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase",n=w(a,t,r,m);return e.createElement("ul",{className:"flex items-center justify-around hg:justify-between"},Array.isArray(n)&&n.map(({link:i,icon:c,iconSize:d})=>e.createElement("li",{key:i},e.createElement("a",{href:i,className:l},e.createElement(b,{svgName:c,size:d,className:o})))))},E=({groupMembers:a,commonTextMemberClass:t})=>e.createElement("ul",{className:"mb-12 max-lg:space-y-10 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10"},a.map(({memberName:r,memberImage:m,imageDescription:l,memberRole:o,memberCV:n,githubLink:i,linkedinLink:c,emailLink:d,telegramLink:s})=>e.createElement("li",{key:r,className:"max-md:space-y-4 md:flex md:gap-x-12"},e.createElement("div",{className:"overflow-hidden rounded-xl shadow-card dark:shadow-darkCard md:w-96 lg:w-72 hg:w-80"},e.createElement("img",{src:m,alt:l,className:"max-md:max-w-full"})),e.createElement("div",{className:"max-md:space-y-4 md:flex md:grow md:flex-col md:justify-around"},e.createElement("div",{className:"space-y-4"},e.createElement("h3",{className:`${t} text-2xl md:text-4xl hg:text-5xl`},r),e.createElement("p",{className:`${t} md:text-xl lg:text-medium hg:text-xl`},e.createElement("span",{className:"font-bold"},"Role:")," ",o),e.createElement("p",{className:`${t} md:text-xl lg:text-medium hg:text-xl`},e.createElement("span",{className:"font-bold"},"Resume: "),e.createElement("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"font-medium text-accentBase transition-colors dark:text-accentBase dark:underline dark:hover:text-whiteBase"},r," CV"))),e.createElement(f,{githubLink:i,linkedinLink:c,emailLink:d,telegramLink:s}))))),N=()=>{var i,c,d;const a=window.devicePixelRatio||1,t=[p,u,v].map(s=>k(s,a,window.innerWidth)),r=h(((i=t[0])==null?void 0:i.src)||""),m=h(((c=t[1])==null?void 0:c.src)||""),l=h(((d=t[2])==null?void 0:d.src)||""),o=x(r,m,l),n="text-darkBase dark:text-whiteBase transition-colors";return e.createElement(e.Fragment,null,e.createElement("h1",{className:`${n} mb-10 text-giant font-bold`},"About Us"),o&&o.map(s=>e.createElement("div",{key:s.groupTitle},e.createElement("h2",{className:`${n} mb-2 text-3.5xl after:mt-2 after:block after:h-px after:w-full after:bg-greyAlt after:content-[""] md:mb-6`},s.groupTitle),e.createElement(E,{groupMembers:s.groupMembers,commonTextMemberClass:n}))))};export{N as default};