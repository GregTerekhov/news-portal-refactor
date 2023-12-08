import{j as $,k as O,r as y,l as _,m as q,R as t,S as T,P as U,u as P,H as z,L as j,c as W,d as M,e as L,f as G}from"./index-1c830450.js";import{g as K,p as X,u as J}from"./images-a41030a2.js";const Q=e=>e.weather.isLoading,Y=e=>e.weather.data,Z=e=>e.weather.weatherByHour,v=e=>e.weather.hasError,H=()=>{const e=$(Q),a=$(Y),l=$(Z),o=$(v),n=O(),r=y.useCallback(s=>n(_(s)),[n]),i=y.useCallback(s=>n(q(s)),[n]);return{isWeatherLoading:e,currentWeather:a,hourlyWeather:l,weatherError:o,getCurrentWeather:r,getHourlyWeather:i}},N=({variant:e})=>{const a=window.devicePixelRatio||1,l=K(X,a,"image/webp",window.innerWidth),o=J((l==null?void 0:l.src)||"");return t.createElement(t.Fragment,null,e==="page"?t.createElement("div",{className:"flex flex-col items-center justify-center"},t.createElement("p",{className:"text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px] transition-colors duration-500"},"We haven’t found news from this category"),t.createElement("img",{src:o,alt:"No found news"})):t.createElement("img",{src:o,alt:"No found news"}))},w=()=>{const[e,a]=y.useState(!0),[l,o]=y.useState(!1),[n,r]=y.useState(!1),{getCurrentWeather:i,getHourlyWeather:s}=H(),h="geolocation"in navigator;return y.useEffect(()=>{h&&localStorage.getItem("geolocationPermission")&&r(!0)},[]),{isCelsius:e,hasGeolocationPermission:n,flippingCard:l?"rotate-y-180":"rotate-y-0",requestGeolocationPermission:()=>{h&&navigator.permissions.query({name:"geolocation"}).then(p=>{p.state==="granted"?(r(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(f=>{const x={latitude:f.coords.latitude,longitude:f.coords.longitude};i(x),s(x)})):p.state==="prompt"?navigator.geolocation.getCurrentPosition(f=>{r(!0),localStorage.setItem("geolocationPermission","granted");const x={latitude:f.coords.latitude,longitude:f.coords.longitude};i(x),s(x)},f=>{switch(r(!1),f.code){case f.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case f.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case f.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}}):r(!1)})},toggleTemperatureScale:()=>{a(!e)},flipWeatherDetails:()=>{o(!l)}}},ee=()=>{const{hasGeolocationPermission:e,requestGeolocationPermission:a}=w();return t.createElement(t.Fragment,null,t.createElement("h2",{className:"text-whiteBase text-medium md:text-2xl lg:text-4xl"},"What a pity, this could be your weather"),t.createElement("span",{className:"mt-20 mb-28"},t.createElement(T,{svgName:"icon-moon",size:156,className:"fill-transparent stroke-greyBase"})),t.createElement(U,{id:"Geolocation permission button",variant:"Primary",onHandleClick:a,classNameButton:"border border-solid border-whiteBase"},e?"Get the weather for your region":"Give permission for your geolocation"))};function F(e){const a=new Date(e*1e3),l=a.getHours(),o=a.getMinutes(),n=String(l).padStart(2,"0"),r=String(o).padStart(2,"0");return`${n}:${r}`}function te(e){return{"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"}[e]}function V(e){const a=e*.75006;return Math.floor(a)}function ae(e){return e/1e3}function ne(e){let a;const l=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}];return e&&(a=l.find(o=>e>=o.min&&e<=o.max)),a?a==null?void 0:a.scale:""}function se(){const e=new Date,a=e.getHours(),l=e.getMinutes(),o=i=>i<10?`0${i}`:i.toString(),n=o(a),r=o(l);return`${n}:${r}`}function oe(){const e={Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"},a=new Date,l=e[a.toDateString().slice(0,3)],o=se(),n=a.toDateString().slice(4).slice(0,4),r=a.toDateString().slice(8).slice(0,2),i=a.toDateString().slice(11),s=`${o} | ${r} ${n} ${i}`;return{days:l,dateNow:s}}const re=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},Math.ceil((a=e==null?void 0:e.main)==null?void 0:a.temp),"°C")},le=e=>{var a,l,o,n;return t.createElement("td",{className:"h-[35px]"},t.createElement("img",{className:"cover",src:`https://openweathermap.org/img/wn/${(l=(a=e==null?void 0:e.weather)==null?void 0:a[0])==null?void 0:l.icon}@2x.png`,alt:(n=(o=e==null?void 0:e.weather)==null?void 0:o[0])==null?void 0:n.description}))},ce=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(a=e==null?void 0:e.main)==null?void 0:a.humidity)},ie=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},V((a=e==null?void 0:e.main)==null?void 0:a.pressure))},me=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(a=e==null?void 0:e.wind)==null?void 0:a.speed)},de=()=>{const{hourlyWeather:e}=H(),{breakpointsForMarkup:a}=P()??{breakpointsForMarkup:null},l=[{label:"Temperature in °C",icon:"icon-thermometer",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:re},{label:"Precipitation and weather",icon:"icon-sun",iconSize:24,iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:le},{label:"Humidity (%)",icon:"icon-humidity",iconSize:28,iconColorStyles:"fill-whiteBase",renderCell:ce},{label:"Pressure (mm.Hg)",icon:"icon-pressure",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:ie},{label:"Wind speed (m/s)",icon:"icon-weather-wind",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:me}];return t.createElement("div",{className:"w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]"},t.createElement("table",{className:"bg-accentBase min-w-full h-full border border-separate border-transparent"},t.createElement("thead",{className:"h-10"},t.createElement(z,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)",contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},t.createElement("tr",null,t.createElement("th",{className:"w-10 pr-2"},t.createElement(T,{svgName:"icon-time",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:24,className:"fill-whiteBase"})),e&&Array.isArray(e)&&(e==null?void 0:e.map(o=>{const n=F(o==null?void 0:o.dt);return t.createElement("th",{key:o==null?void 0:o.dt,scope:"col",className:"whitespace-nowrap text-small md:text-base text-whiteBase text-center -rotate-90"},n)}))))),t.createElement("tbody",null,l.map(({label:o,icon:n,iconColorStyles:r,iconSize:i,renderCell:s})=>t.createElement(z,{key:n,label:o,side:"top",sideOffset:0,ariaLabel:`Info about ${o} by time interval`,contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},t.createElement("tr",null,t.createElement("th",{scope:"row",className:"w-10 pr-2"},t.createElement(T,{svgName:n,size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:i,className:r})),e&&Array.isArray(e)&&e.map(h=>t.createElement(t.Fragment,{key:h==null?void 0:h.dt},s(h)))))))))},ue=()=>{var i,s,h,E,B,u,A;const{currentWeather:e}=H(),{breakpointsForMarkup:a}=P()??{breakpointsForMarkup:null},{days:l,dateNow:o}=oe(),n=(a==null?void 0:a.isNothing)||(a==null?void 0:a.isMobile),r=[{icon:"icon-earth",iconSize:n?16:24,value:`${te(e==null?void 0:e.timezone)}`,label:"Greenwich mean time",hint:"GMT time",justifyItemClass:"justify-start",subTextValue:"UTC"},{icon:"icon-humidity",iconSize:n?18:30,value:`${(i=e==null?void 0:e.main)==null?void 0:i.humidity}`,label:"Humidity in percent",hint:"Humidity (%)",justifyItemClass:"justify-end",subTextValue:"%"},{icon:"icon-pressure",iconSize:n?18:30,value:`${V((s=e==null?void 0:e.main)==null?void 0:s.pressure)}`,label:"Atmospheric pressure in mm Hg",hint:"Atmospheric pressure (mm.Hg)",justifyItemClass:"justify-start",subTextValue:"mm.Hg"},{icon:"icon-pressure",iconSize:n?18:30,value:`${(h=e==null?void 0:e.main)==null?void 0:h.pressure}`,label:"Atmospheric pressure in hPa",hint:"Atmospheric pressure (HPa)",justifyItemClass:"justify-end",subTextValue:"hPa"},{icon:"icon-sunrise",iconSize:n?20:30,value:`${F((E=e==null?void 0:e.sys)==null?void 0:E.sunrise)}`,label:"Sunrise time",hint:"Sunrise time",justifyItemClass:"justify-start",subTextValue:"AM"},{icon:"icon-sunset",iconSize:n?20:30,value:`${F((B=e==null?void 0:e.sys)==null?void 0:B.sunset)}`,label:"Sunset time",hint:"Sunset time",justifyItemClass:"justify-end",subTextValue:"PM"},{icon:"icon-eye-opened",iconSize:n?20:30,value:`${ae(e==null?void 0:e.visibility)}`,label:"Road visibility",hint:"Road visibility",justifyItemClass:"justify-start",subTextValue:"km"},{icon:"icon-weather-wind",iconSize:n?20:30,value:`${(u=e==null?void 0:e.wind)==null?void 0:u.speed}`,label:"Wind speed in metre per seconds",hint:`Wind speed (m/s). (${ne((A=e==null?void 0:e.wind)==null?void 0:A.speed)} on the Beaufort scale)`,justifyItemClass:"justify-end",subTextValue:"m/s"}];return t.createElement("div",{className:"w-full h-full backface-hidden col-[1/1] rows-[1/1] flex flex-col gap-3 justify-between"},t.createElement("div",{className:"text-center mb-3"},t.createElement("p",{className:"font-weather text-3.5xl md:text-4.5xl text-contrastWhite"},l),t.createElement("p",{className:"font-weather text-2.5xl md:text-3.5xl text-contrastWhite"},o)),t.createElement("ul",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},Array.isArray(r)&&r.map(({icon:p,iconSize:f,value:x,label:D,hint:R,justifyItemClass:k,subTextValue:I})=>t.createElement("li",{key:D},t.createElement(z,{label:R,side:"top",align:k==="justify-end"?"end":"start",sideOffset:4,ariaLabel:`Info about ${D} for current time`,contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},t.createElement("div",{className:` text-contrastWhite text-base md:text-medium flex gap-3 items-center ${k}`},t.createElement("div",{className:`${k==="justify-end"?"order-last":"order-1"}`},t.createElement(T,{svgName:p,size:f,className:"fill-whiteBase"})),t.createElement("p",{className:"even:order-1 flex items-baseline gap-x-1"},x,t.createElement("span",{className:"text-xs"},I))))))))},he=()=>{var B,u,A,p,f,x,D,R;const{hasGeolocationPermission:e,isCelsius:a,flippingCard:l,toggleTemperatureScale:o,flipWeatherDetails:n}=w(),{breakpointsForMarkup:r}=P()??{breakpointsForMarkup:null},{isWeatherLoading:i,currentWeather:s}=H(),h=s&&Object.keys(s).length===0,E=i&&e;return t.createElement("div",{className:`${!i&&h?"flex flex-col items-center justify-between text-center py-10 px-6 md:px-10":"py-8 px-5 md:pt-10 md:px-8"}  bg-accentBase w-full hg:w-[442px] h-full`},!i&&h?t.createElement(ee,null):E?t.createElement(j,{variant:"element"}):!i&&!h&&e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"flex justify-evenly gap-5 items-center mx-auto cursor-pointer",onClick:o},t.createElement("div",{className:'relative w-[83px] md:w-[96px] after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white text-center'},t.createElement("p",{className:"w-full font-weather text-monstrous md:text-[64px] text-contrastWhite"},(s==null?void 0:s.main)!==void 0&&(a?Math.round((B=s==null?void 0:s.main)==null?void 0:B.temp)+"°":Math.round(((u=s==null?void 0:s.main)==null?void 0:u.temp)*9/5+32)+"°"))),t.createElement("div",null,(s==null?void 0:s.weather)&&((A=s==null?void 0:s.weather[0])==null?void 0:A.main)&&t.createElement("p",{className:"font-weather text-3xl md:text-4.5xl text-contrastWhite"},(p=s==null?void 0:s.weather[0])==null?void 0:p.main),t.createElement("p",{className:"font-weather text-base md:text-2xl text-contrastWhite mb-2.5"},"Feels like"," ",a?Math.round((f=s==null?void 0:s.main)==null?void 0:f.feels_like)+"°C":Math.round(((x=s==null?void 0:s.main)==null?void 0:x.feels_like)*9/5+32)+"°F"),t.createElement("div",{className:"flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg"},t.createElement(T,{svgName:"icon-location",size:r!=null&&r.isNothing||r!=null&&r.isMobile?20:27,className:"fill-whiteBase"}),t.createElement("p",{className:"text-base md:text-2xl text-contrastWhite"},s==null?void 0:s.name)))),(s==null?void 0:s.weather)&&(s==null?void 0:s.weather[0].icon)&&t.createElement("img",{className:"m-auto w-32 h-32 md:w-[165px] md:h-[165px] hg:w-[180px] hg:h-[180px]",src:`https://openweathermap.org/img/wn/${s==null?void 0:s.weather[0].icon}@2x.png`,alt:(R=(D=s==null?void 0:s.weather)==null?void 0:D[0])==null?void 0:R.description}),t.createElement("div",{className:"w-full h-56 perspective-10 cursor-pointer",onClick:n},t.createElement("div",{className:`w-full h-full transition-transform grid grid-cols-1 grid-rows-1 transform-style-3d ${l}`},t.createElement(ue,null),t.createElement(de,null)))))},fe=({liveNews:e,activeLinks:a})=>{const[l,o]=y.useState(!1),{savedNews:n,allArchive:r,updateSavedNews:i,addVotedNews:s,removeNews:h,removeFavouriteNews:E}=W(),[B,u]=y.useState(()=>D()),[A,p]=y.useState(()=>R()),{isAuthenticated:f}=M();y.useEffect(()=>{if(f){if(a.isArchiveActive){if(a.isArchiveActive&&r&&r.length!==0){const c=r.find(C=>C.isFavourite===e.isFavourite),m=r.find(C=>C.hasRead===e.hasRead),d=c==null?void 0:c.isFavourite,g=m==null?void 0:m.hasRead;d&&g&&(u(!0),p(!0)),d&&!g&&(u(!0),p(!1)),g&&!d&&(p(!0),u(!1))}}else if(n&&(e==null?void 0:e.newsUrl)!==void 0)if((n==null?void 0:n.length)!==0){const c=n.find(g=>g.newsUrl===(e==null?void 0:e.newsUrl)),m=c==null?void 0:c.isFavourite,d=c==null?void 0:c.hasRead;m===!0&&d===!0&&(u(!0),p(!0)),m===!0&&d===!1&&u(!0),d===!0&&m===!1&&p(!0)}else return}},[n,r,f,e]),y.useEffect(()=>{l&&n&&(s(n),o(!1))},[l,s]);const x=()=>{o(!0)};function D(){if(a.isArchiveActive){const c=r==null?void 0:r.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(c==null?void 0:c.isFavourite)??!1}else{const c=n==null?void 0:n.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(c==null?void 0:c.isFavourite)??!1}}function R(){if(a.isArchiveActive){const c=r==null?void 0:r.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(c==null?void 0:c.hasRead)??!1}else{const c=n==null?void 0:n.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(c==null?void 0:c.hasRead)??!1}}return{isFavourite:B,hasRead:A,handleChangeFavourites:async c=>{if(c.stopPropagation(),c.preventDefault(),a.isArchiveActive||x(),n&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!a.isArchiveActive){const d=new Date().getTime();if(n.length===0){u(!0);const g={...e,isFavourite:!0,hasRead:!1,additionDate:d};await i(g)}else{const g=n==null?void 0:n.find(S=>S.newsUrl===e.newsUrl),C=g==null?void 0:g.isFavourite,b=g==null?void 0:g.hasRead;if(g){if(C===!1&&b===!0){u(!0);const S={...e,isFavourite:!0};await i(S)}else if(C===!0&&b===!1){u(!1);const S={...e,isFavourite:!1,hasRead:b,additionDate:null};await i(S),E((e==null?void 0:e.newsUrl)||"")}else if(C===!0&&b===!0){u(!1);const S={...e,isFavourite:!1,hasRead:b};await i(S),E((e==null?void 0:e.newsUrl)||"")}}else{u(!0);const S={...e,isFavourite:!0,hasRead:!1,additionDate:d};await i(S)}}}},handleReadNews:async()=>{if(n&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!a.isArchiveActive){const m=new Date().getTime();if(n.length===0){p(!0),x();const d={...e,hasRead:!0,isFavourite:!1,additionDate:m};await i(d)}else{const d=n==null?void 0:n.find(b=>b.newsUrl===e.newsUrl),g=d==null?void 0:d.isFavourite,C=d==null?void 0:d.hasRead;if(d){if(C===!1&&g===!0){p(!0),x();const b={...e,hasRead:!0};await i(b)}else if(C===!0)return}else{p(!0),x();const b={...e,hasRead:!0,additionDate:m};await i(b)}}}},handleDeleteNews:async(c,m)=>{c.stopPropagation(),c.preventDefault(),await h(m)}}},pe=({onHandleClick:e,isFavourite:a,buttonData:l})=>{const o=L(),n=G(o),r=a?"fill-accentBase stroke-accentBase":"stroke-accentBase fill-none";return t.createElement("button",{id:l==null?void 0:l.id,type:"button",className:`absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite ${r} ${n.isArchiveActive?"":"hover:stroke-whiteBase hover:bg-accentBase hover:text-whiteBase"} text-small text-darkBase font-medium transition-colors duration-250`,onClick:e},n.isArchiveActive?a?"Favourited":"Not in favourites":a?"Remove from favorite":"Add to favorite",t.createElement(T,{svgName:"icon-heart",size:16,className:"stroke-inherit fill-inherit"}))},ge=({liveNews:e={}})=>{const{isAuthenticated:a}=M(),l=t.createRef(),o=L(),n=G(o),{isFavourite:r,hasRead:i,handleChangeFavourites:s,handleReadNews:h,handleDeleteNews:E}=fe({liveNews:e,activeLinks:n}),B=n.isHomeActive||n.isArchiveActive;return t.createElement(t.Fragment,null,e&&(e==null?void 0:e.newsUrl)&&t.createElement("a",{rel:"noopener noreferrer",className:"block group transition-colors duration-500",href:e==null?void 0:e.newsUrl,target:"_blank",onClick:a?h:void 0},t.createElement("div",{className:`${a&&i&&B?"absolute z-20 w-full h-full bg-whiteBase/[.4]":"hidden"}`}),n.isArchiveActive?t.createElement(z,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Delete news from archive",contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},t.createElement("div",null,t.createElement(U,{ref:l,onHandleClick:u=>E(u,(e==null?void 0:e._id)||""),variant:"Small",hasIcon:!0,svgName:"icon-close",svgSize:24,classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))):null,t.createElement("p",{className:"absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),a&&i&&t.createElement("p",{className:"absolute z-10 top-3.5 right-14 md:top-5 text-base font-bold text-readBase flex items-center gap-1"},"Already read",t.createElement(T,{svgName:"icon-check",size:18,className:"fill-readBase"})),t.createElement("div",{className:"relative h-[395px] flex justify-center items-center overflow-hidden rounded-[10px]"},e&&(e!=null&&e.imgLink)?t.createElement("img",{className:"rounded-xl max-w-none h-full absolute object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):t.createElement(N,{variant:"card"}),a&&t.createElement(t.Fragment,null,t.createElement(pe,{onHandleClick:s,isFavourite:r,buttonData:{id:`Add ${e==null?void 0:e.newsUrl} to favourites or remove from them`}}))),t.createElement("div",{className:"px-4 mt-4"},t.createElement("p",{className:"text-small lg:text-base leading-tight text-darkBase dark:text-whiteBase mb-2 text-end line-clamp-1"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),t.createElement("h2",{className:"h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3 dark:text-whiteBase"},e==null?void 0:e.title),t.createElement("p",{className:"h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4"},e==null?void 0:e.description),t.createElement("div",{className:"flex justify-between"},t.createElement("p",{className:"text-base md:text-medium text-greyAlt"},e==null?void 0:e.publishDate),t.createElement("div",{className:"flex pr-2 items-center gap-2 bg-accentAlt dark:bg-transparent duration-500 transition-all translate-x-full rounded-2xl group-hover:translate-x-0 group-hover:bg-accentAlt"},t.createElement(T,{svgName:"icon-double-arrow",size:16,className:"fill-whiteBase"}),t.createElement("p",{className:"text-base md:text-medium text-whiteBase transition-colors duration-500"},"Click for read more..."))))))},Ee=({currentItems:e,currentPage:a})=>{const{isWeatherLoading:l}=H();return t.createElement("ul",{className:"max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10 mb-10 md:mb-12 lg:mb-[60px]"},a&&a===1&&t.createElement("li",{className:"max-md:h-[515px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-colors duration-500 md:col-start-2 lg:col-start-3"},l?t.createElement(j,{variant:"element"}):t.createElement(he,null)),e&&e.map((o,n)=>t.createElement("li",{key:o.newsUrl,className:`relative w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[655px] md:h-[700px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-colors duration-500 ${n===0&&"md:col-start-1 md:row-start-1 lg:col-start-1"} ${n===1&&"lg:col-start-2 lg:row-start-1"}`},t.createElement(ge,{liveNews:o}))))};export{Ee as N,N as P};
