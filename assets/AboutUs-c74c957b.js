import{I as o,c,K as k,as as u,at as b,au as p,R as e,m as x,H as v}from"./index-bbedbc49.js";const w=t=>[{groupTitle:"Front-end",groupMembers:[{memberImage:t[0],imageDescription:"Greg Terekhov",memberName:"Greg Terekhov",memberRole:"Team leader, scrum, developer",memberCV:"https://drive.google.com/file/d/1UK9RnTddIt39_VsQnd70jJe0ii3AhZFL/view?usp=sharing",githubLink:"https://github.com/GregTerekhov",linkedinLink:"https://www.linkedin.com/in/greg-terekhov/",emailLink:"mailto:gregterekhov@gmail.com",telegramLink:"http://t.me/GregTerekhov"},{memberImage:t[1],imageDescription:"Max Mordovtsev",memberName:"Max Mordovtsev",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/19lChIbPB0JDQeeP2y7EpqPYfrK9ZyKXc/view?usp=sharing",githubLink:"https://github.com/Max3281",linkedinLink:"https://www.linkedin.com/in/maxim-mordovtsev/",emailLink:"mailto:9.crover@gmail.com",telegramLink:"http://t.me/ZCrover"}]},{groupTitle:"Back-end",groupMembers:[{memberImage:t[2],imageDescription:"Dmytro Pavlenko",memberName:"Dmytro Pavlenko",memberRole:"Developer",memberCV:"https://drive.google.com/file/d/15pBheHpJaq_u8UyXg0W31FrZEey5Z3vC/view?usp=sharing",githubLink:"https://github.com/PavlenkoDm",linkedinLink:"https://www.linkedin.com/in/pavlenko-dmitry/",emailLink:"mailto:dmpavlenko07@gmail.com",telegramLink:"http://t.me/Pavlenko_Dm"}]}],f=(t,m,a,n)=>[{link:t,icon:o.Github,iconSize:c.mdIcon28},{link:m,icon:o.Linkedin,iconSize:c.mdIcon28},{link:a,icon:o.Gmail,iconSize:c.lgIcon30},{link:n,icon:o.Telegram,iconSize:c.mdIcon28}],y=()=>{const t=window.devicePixelRatio||1;return[u,b,p].map(a=>k(a,t,window.innerWidth))},E=({githubLink:t,linkedinLink:m,emailLink:a,telegramLink:n})=>{const s="w-14 h-14 lg:w-12 lg:h-12 hg:w-16 hg:h-16 rounded-xl border border-solid border-whiteBase dark:border-greyBase bg-accentBase dark:bg-transparent flex items-center justify-center group hocus:border-accentBase dark:hocus:border-whiteBase hocus:bg-whiteBase dark:hocus:bg-accentBase transition-colors ring-whiteBase dark:ring-darkBase ring-2",r="fill-whiteBase group-hover:fill-accentAlt dark:group-hover:fill-whiteBase group-focus:fill-accentAlt dark:group-focus:fill-whiteBase",i=f(t,m,a,n);return e.createElement("ul",{className:"flex items-center justify-around hg:justify-between"},Array.isArray(i)&&i.map(({link:l,icon:d,iconSize:g})=>e.createElement("li",{key:l},e.createElement("a",{href:l,className:s},e.createElement(x,{svgName:d,sizeKey:g,className:r})))))},B=({groupMembers:t,commonTextMemberClass:m})=>e.createElement("ul",{className:"mb-12 max-lg:space-y-10 md:mb-20 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-10"},Array.isArray(t)&&t.map(({memberName:a,memberImage:n,imageDescription:s,memberRole:r,memberCV:i,githubLink:l,linkedinLink:d,emailLink:g,telegramLink:h})=>e.createElement("li",{key:a,className:"max-md:space-y-4 md:flex md:gap-x-12"},e.createElement("div",{className:"overflow-hidden rounded-xl shadow-card dark:shadow-darkCard md:w-96 lg:w-72 hg:w-80"},e.createElement("img",{src:n,alt:s,className:"max-md:max-w-full"})),e.createElement("div",{className:"max-md:space-y-4 md:flex md:grow md:flex-col md:justify-around"},e.createElement("div",{className:"space-y-4"},e.createElement("h3",{className:`${m} text-2xl md:text-4xl hg:text-5xl`},a),e.createElement("p",{className:`${m} md:text-xl lg:text-medium hg:text-xl`},e.createElement("span",{className:"font-bold"},"Role:")," ",r),e.createElement("p",{className:`${m} md:text-xl lg:text-medium hg:text-xl`},e.createElement("span",{className:"font-bold"},"Resume: "),e.createElement("a",{href:i,target:"_blank",rel:"noopener noreferrer",className:"font-medium text-accentBase transition-colors dark:text-accentBase dark:underline dark:hocus:text-whiteBase"},a," CV"))),e.createElement(E,{githubLink:l,linkedinLink:d,emailLink:g,telegramLink:h}))))),I=()=>{const{cacheImage:t}=v(),a=y().map(r=>t((r==null?void 0:r.src)||"")),n=w(a),s="text-darkBase dark:text-whiteBase transition-colors";return e.createElement(e.Fragment,null,e.createElement("h1",{className:`${s} mb-10 text-giant font-bold`},"About Us"),Array.isArray(n)&&n.map(({groupTitle:r,groupMembers:i})=>e.createElement("div",{key:r},e.createElement("h2",{className:`${s} mb-2 text-3.5xl after:mt-2 after:block after:h-px after:w-full after:bg-greyAlt after:content-[""] md:mb-6`},r),e.createElement(B,{groupMembers:i,commonTextMemberClass:s}))))};export{I as default};
