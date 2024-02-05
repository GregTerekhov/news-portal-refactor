import{I as c,R as e,S as y}from"./index-6fd93497.js";import{g as h,m as N,a as B,b as I,u as k}from"./images-175067f1.js";const L=(t,r,a)=>[{groupTitle:"Front-end",groupMembers:[{memberImage:t,imageDescription:"Greg Terekhov",memberName:"Greg Terekhov",memberRole:"Team leader, scrum, developer",memberCV:"https://drive.google.com/file/d/1UK9RnTddIt39_VsQnd70jJe0ii3AhZFL/view?usp=sharing",githubLink:"https://github.com/GregTerekhov",linkedinLink:"https://www.linkedin.com/in/greg-terekhov/",emailLink:"mailto:gregterekhov@gmail.com",telegramLink:"http://t.me/GregTerekhov"},{memberImage:r,imageDescription:"Max Mordovtsev",memberName:"Max Mordovtsev",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/19lChIbPB0JDQeeP2y7EpqPYfrK9ZyKXc/view?usp=sharing",githubLink:"https://github.com/Max3281",linkedinLink:"https://www.linkedin.com/in/maxim-mordovtsev/",emailLink:"mailto:9.crover@gmail.com",telegramLink:"http://t.me/ZCrover"}]},{groupTitle:"Back-end",groupMembers:[{memberImage:a,imageDescription:"Dmytro Pavlenko",memberName:"Dmytro Pavlenko",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/15pBheHpJaq_u8UyXg0W31FrZEey5Z3vC/view?usp=sharing",githubLink:"https://github.com/PavlenkoDm",linkedinLink:"https://www.linkedin.com/in/pavlenko-dmitry/",emailLink:"mailto:dmpavlenko07@gmail.com",telegramLink:"http://t.me/Pavlenko_Dm"}]}],C=(t,r,a,n)=>[{link:t,icon:"icon-github",iconSize:c.mdIcon28},{link:r,icon:"icon-linkedin",iconSize:c.mdIcon28},{link:a,icon:"icon-gmail",iconSize:c.lgIcon30},{link:n,icon:"icon-telegram",iconSize:c.mdIcon28}],M=({githubLink:t,linkedinLink:r,emailLink:a,telegramLink:n})=>{const l="w-14 h-14 lg:w-12 lg:h-12 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hover:border-accentBase dark:hover:border-whiteBase hover:bg-whiteBase dark:hover:bg-accentBase transition-colors duration-500 ring-whiteBase dark:ring-darkBase ring-2",d="fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase transition-colors duration-500",s=C(t,r,a,n);return e.createElement("ul",{className:"flex items-center justify-around hg:justify-between"},Array.isArray(s)&&s.map(({link:i,icon:m,iconSize:o})=>e.createElement("li",{key:i},e.createElement("a",{href:i,className:l},e.createElement(y,{svgName:m,size:o,className:d})))))},R=()=>{const t=window.devicePixelRatio||1,r=h(N,t,window.innerWidth),a=h(B,t,window.innerWidth),n=h(I,t,window.innerWidth),l=k((r==null?void 0:r.src)||""),d=k((a==null?void 0:a.src)||""),s=k((n==null?void 0:n.src)||""),i=L(l,d,s),m="text-darkBase dark:text-whiteBase transition-colors duration-500";return e.createElement(e.Fragment,null,e.createElement("h1",{className:`${m} mb-10 text-giant font-bold`},"About Us"),i&&i.map(o=>e.createElement("div",{key:o.groupTitle},e.createElement("h2",{className:`${m} mb-2 text-3.5xl after:mt-2 after:block after:h-px after:w-full after:bg-greyAlt after:content-[""] md:mb-6`},o.groupTitle),e.createElement("ul",{className:"mb-12 max-lg:space-y-10 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10"},o.groupMembers.map(({memberName:g,memberImage:b,imageDescription:p,memberRole:u,memberCV:v,githubLink:x,linkedinLink:w,emailLink:f,telegramLink:E})=>e.createElement("li",{key:g,className:"max-md:space-y-4 md:flex md:gap-x-12"},e.createElement("div",{className:"overflow-hidden rounded-xl shadow-card duration-500 dark:shadow-darkCard md:w-96 lg:w-72 hg:w-[320px]"},e.createElement("img",{src:b,alt:p,className:"h-full max-md:max-w-full"})),e.createElement("div",{className:"max-md:space-y-4 md:flex md:grow md:flex-col md:justify-around"},e.createElement("div",{className:"space-y-4"},e.createElement("h3",{className:`${m} text-2xl md:text-4xl hg:text-5xl`},g),e.createElement("p",{className:`${m} md:text-xl lg:text-medium hg:text-lg`},e.createElement("span",{className:"font-bold"},"Role:")," ",u),e.createElement("p",{className:`${m} md:text-xl lg:text-medium hg:text-lg`},e.createElement("span",{className:"font-bold"},"Resume: "),e.createElement("a",{href:v,target:"_blank",rel:"noopener noreferrer",className:"font-medium text-accentBase transition-colors duration-500 dark:text-whiteBase dark:underline"},g," CV"))),e.createElement(M,{githubLink:x,linkedinLink:w,emailLink:f,telegramLink:E}))))))))};export{R as default};
