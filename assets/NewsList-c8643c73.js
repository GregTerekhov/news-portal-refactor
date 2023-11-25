import{R as t,r as b,c as V,g as j,i as v,j as R,S as g,d as _,e as q,P as W,k as P,l as O,m as K,u as H,$ as X,n as A,o as U,p as L,q as G,L as J}from"./index-a4a562f8.js";const M=e=>e.weather.isLoading,N=e=>e.weather.data,Q=e=>e.weather.weatherByHour,Y=e=>e.weather.hasError,Z="/assets/mobilePlug-fba6a2dc.png",F="/assets/mobilePlug-d4fb5cac.webp",ee="/assets/mobilePlug@2x-cf36d459.png",te="/assets/mobilePlug@2x-865b582f.webp",ae="/assets/mobilePlug@3x-acc1bf3c.png",se="/assets/mobilePlug@3x-9817c7b1.webp",oe="/assets/tabletPlug-1abddfe5.png",ne="/assets/tabletPlug-9a07b486.webp",le="/assets/tabletPlug@2x-12326959.png",ie="/assets/tabletPlug@2x-7eb8e9bf.webp",re="/assets/tabletPlug@3x-0c454321.png",ce="/assets/tabletPlug@3x-51efd4db.webp",me="/assets/desktopPlug-6b16b526.png",de="/assets/desktopPlug-38294070.webp",pe="/assets/desktopPlug@2x-ac7b7041.png",ge="/assets/desktopPlug@2x-e04dbc0a.webp",ue="/assets/desktopPlug@3x-30aace79.png",xe="/assets/desktopPlug@3x-1eba67aa.webp",he=[{src:xe,type:"image/webp",dpi:3,screenSize:1280},{src:ue,type:"image/png",dpi:3,screenSize:1280},{src:ge,type:"image/webp",dpi:2,screenSize:768},{src:pe,type:"image/png",dpi:2,screenSize:768},{src:de,type:"image/webp",dpi:1,screenSize:320},{src:me,type:"image/png",dpi:1,screenSize:320},{src:ce,type:"image/webp",dpi:3,screenSize:1280},{src:re,type:"image/png",dpi:3,screenSize:1280},{src:ie,type:"image/webp",dpi:2,screenSize:768},{src:le,type:"image/png",dpi:2,screenSize:768},{src:ne,type:"image/webp",dpi:1,screenSize:320},{src:oe,type:"image/png",dpi:1,screenSize:320},{src:se,type:"image/webp",dpi:3,screenSize:1280},{src:ae,type:"image/png",dpi:3,screenSize:1280},{src:te,type:"image/webp",dpi:2,screenSize:768},{src:ee,type:"image/png",dpi:2,screenSize:768},{src:F,type:"image/webp",dpi:1,screenSize:320},{src:Z,type:"image/png",dpi:1,screenSize:320}];function fe(e,a,n,s){const c=e.filter(l=>l.screenSize<=s).sort((l,r)=>r.dpi!==l.dpi?r.dpi-l.dpi:l.type===n?-1:r.type===n?1:0);for(const l of c)if(a>=l.dpi)return l;return c[c.length-1]}const be=({variant:e})=>{const a=window.devicePixelRatio||1,n=fe(he,a,"image/webp",window.innerWidth);return t.createElement(t.Fragment,null,e==="page"?t.createElement("div",{className:"flex flex-col items-center justify-center"},t.createElement("p",{className:"text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px] transition-colors duration-500"},"We haven’t found news from this category"),t.createElement("img",{src:n==null?void 0:n.src,alt:"No found news"})):t.createElement("img",{src:n==null?void 0:n.src,alt:"No found news"}))},ye=({liveNews:e})=>{const[a,n]=b.useState(!1),{savedNews:s,updateSavedNews:i,addVotedNews:c}=V(),[l,r]=b.useState(()=>B()),[o,h]=b.useState(()=>p()),{isAuthenticated:w}=j(),z=v();b.useEffect(()=>{if(w&&s&&(e==null?void 0:e.newsUrl)!==void 0)if((s==null?void 0:s.length)!==0){const m=s.find(x=>x.newsUrl===(e==null?void 0:e.newsUrl)),u=m==null?void 0:m.isFavourite,d=m==null?void 0:m.hasRead;u===!0&&d===!0&&(r(!0),h(!0)),u===!0&&d===!1&&r(!0),d===!0&&u===!1&&h(!0)}else return},[s,w,e]),b.useEffect(()=>{a&&s&&(c(s),n(!1))},[a,c]);const S=()=>{n(!0)};function B(){const m=s==null?void 0:s.find(u=>u.newsUrl===(e==null?void 0:e.newsUrl));return(m==null?void 0:m.isFavourite)??!1}function p(){const m=s==null?void 0:s.find(u=>u.newsUrl===(e==null?void 0:e.newsUrl));return(m==null?void 0:m.hasRead)??!1}return{isFavourite:l,hasRead:o,handleChangeFavourites:async m=>{if(m.stopPropagation(),m.preventDefault(),S(),s&&e&&(e==null?void 0:e.newsUrl)!==void 0){const d=new Date().getTime();if(s.length===0){r(!0);const x={...e,isFavourite:!0,hasRead:!1,additionDate:d};await i(x)}else{const x=s==null?void 0:s.find(E=>E.newsUrl===e.newsUrl),C=x==null?void 0:x.isFavourite,f=x==null?void 0:x.hasRead;if(console.log("existingNews",x),x){if(C===!1&&f===!0){r(!0);const E={...e,isFavourite:!0};await i(E)}else if(C===!0&&f===!1){r(!1);const E={...e,isFavourite:!1,hasRead:f,additionDate:null};await i(E),await z(R({newsUrl:(e==null?void 0:e.newsUrl)||""}))}else if(C===!0&&f===!0){r(!1);const E={...e,isFavourite:!1,hasRead:f};await i(E),await z(R({newsUrl:(e==null?void 0:e.newsUrl)||""}))}}else{r(!0);const E={...e,isFavourite:!0,hasRead:!1,additionDate:d};await i(E)}}}},handleReadNews:async()=>{if(s&&e&&(e==null?void 0:e.newsUrl)!==void 0){const u=new Date().getTime();if(s.length===0){h(!0),S();const d={...e,hasRead:!0,isFavourite:!1,additionDate:u};await i(d)}else{const d=s==null?void 0:s.find(f=>f.newsUrl===e.newsUrl),x=d==null?void 0:d.isFavourite,C=d==null?void 0:d.hasRead;if(d){if(C===!1&&x===!0){h(!0),S();const f={...e,hasRead:!0};await i(f)}else if(C===!0)return}else{h(!0),S();const f={...e,hasRead:!0,additionDate:u};await i(f)}}}},handleDeleteNews:m=>{m.stopPropagation(),m.preventDefault(),console.log("Delete news")}}},Ee=({onHandleClick:e,isFavourite:a,buttonData:n})=>{const s=a?"fill-accentBase stroke-accentBase":"stroke-accentBase fill-none";return t.createElement("button",{id:n==null?void 0:n.id,type:"button",className:`absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite ${s} hover:stroke-whiteBase hover:bg-accentBase hover:text-whiteBase text-small text-darkBase font-medium transition-colors duration-250`,onClick:e},a?"Remove from favorite":"Add to favorite",t.createElement(g,{svgName:"icon-heart",size:16,className:"stroke-inherit fill-inherit"}))},we=({liveNews:e={}})=>{const{isFavourite:a,hasRead:n,handleChangeFavourites:s,handleReadNews:i,handleDeleteNews:c}=ye({liveNews:e}),{isAuthenticated:l}=j(),r=_(),o=q(r);return t.createElement(t.Fragment,null,e&&(e==null?void 0:e.newsUrl)&&t.createElement("a",{className:"block group transition-colors duration-500",href:e==null?void 0:e.newsUrl,target:"_blank",onClick:l?i:void 0},t.createElement("div",{className:`${l&&n&&o.isHomeActive||o.isArchiveActive?"absolute z-20 w-full h-full bg-whiteBase/[.4]":"hidden"}`}),o.isArchiveActive?t.createElement("div",null,t.createElement(W,{onHandleClick:c,variant:"Small",dataTooltipTarget:`tooltip-delete-${e.newsUrl} news`,dataTooltipPlacement:"left",tooltipText:"Delete news from archive",hasIcon:!0,svgName:"icon-close",svgSize:24,classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"})):null,t.createElement("p",{className:"absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),l&&n&&t.createElement("p",{className:"absolute z-10 top-3.5 right-14 md:top-5 text-base font-bold text-readBase flex items-center gap-1"},"Already read",t.createElement(g,{svgName:"icon-check",size:18,className:"fill-readBase"})),t.createElement("div",{className:"relative h-[395px] flex justify-center items-center overflow-hidden rounded-[10px]"},e&&(e!=null&&e.imgLink)?t.createElement("img",{className:"rounded-xl max-w-none h-full absolute object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):t.createElement(be,{variant:"card"}),l&&t.createElement(Ee,{onHandleClick:s,isFavourite:a,buttonData:{id:`Add ${e==null?void 0:e.newsUrl} to favourites or remove from them`}})),t.createElement("div",{className:"px-4 mt-4"},t.createElement("p",{className:"text-small lg:text-base leading-tight text-darkBase dark:text-whiteBase mb-2 text-end line-clamp-1"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),t.createElement("h2",{className:"h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3 dark:text-whiteBase"},e==null?void 0:e.title),t.createElement("p",{className:"h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4"},e==null?void 0:e.description),t.createElement("div",{className:"flex justify-between"},t.createElement("p",{className:"text-base md:text-medium text-greyAlt"},e==null?void 0:e.publishDate),t.createElement("div",{className:"flex pr-2 items-center gap-2 bg-accentAlt dark:bg-transparent duration-500 transition-all translate-x-full rounded-2xl group-hover:translate-x-0 group-hover:bg-accentAlt"},t.createElement(g,{svgName:"icon-arrow-direction-left",size:16,className:"fill-whiteBase"}),t.createElement("p",{className:"text-base md:text-medium text-whiteBase transition-colors duration-500"},"Click for read more..."))))))},D=()=>{const e=P(M),a=P(N),n=P(Q),s=P(Y),i=v(),c=b.useCallback(r=>i(O(r)),[i]),l=b.useCallback(r=>i(K(r)),[i]);return{isWeatherLoading:e,currentWeather:a,hourlyWeather:n,weatherError:s,getCurrentWeather:c,getHourlyWeather:l}},Se=()=>{const[e,a]=b.useState(!0),[n,s]=b.useState(!1),[i,c]=b.useState(!1),{getCurrentWeather:l,getHourlyWeather:r}=D(),o="geolocation"in navigator;return b.useEffect(()=>{o&&localStorage.getItem("geolocationPermission")&&c(!0)},[]),{isCelsius:e,hasGeolocationPermission:i,flippingCard:n?"rotate-y-180":"rotate-y-0",requestGeolocationPermission:()=>{o&&navigator.permissions.query({name:"geolocation"}).then(B=>{B.state==="granted"?(c(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(p=>{const y={latitude:p.coords.latitude,longitude:p.coords.longitude};l(y),r(y)})):B.state==="prompt"?navigator.geolocation.getCurrentPosition(p=>{c(!0),localStorage.setItem("geolocationPermission","granted");const y={latitude:p.coords.latitude,longitude:p.coords.longitude};l(y),r(y)},p=>{switch(c(!1),p.code){case p.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case p.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case p.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}}):c(!1)})},toggleTemperatureScale:()=>{a(!e)},flipWeatherDetails:()=>{s(!n)}}};function T(e){const a=new Date(e*1e3),n=a.getHours(),s=a.getMinutes(),i=String(n).padStart(2,"0"),c=String(s).padStart(2,"0");return`${i}:${c}`}function Be(e){return{"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"}[e]}function k(e){const a=e*.75006;return Math.floor(a)}function ze(e){return e/1e3}function Ce(e){let a;const n=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}];return e&&(a=n.find(s=>e>=s.min&&e<=s.max)),a?a==null?void 0:a.scale:""}function Pe(){const e=new Date,a=e.getHours(),n=e.getMinutes(),s=l=>l<10?`0${l}`:l.toString(),i=s(a),c=s(n);return`${i}:${c}`}function De(){const e=new Date,a=Pe(),n=e.toDateString().slice(0,3),s=e.toDateString().slice(4).slice(0,4),i=e.toDateString().slice(8).slice(0,2),c=e.toDateString().slice(11),l=`${a} | ${i} ${s} ${c}`;return{days:n,dateNow:l}}const Ie=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},Math.ceil((a=e==null?void 0:e.main)==null?void 0:a.temp),"°C")},$e=e=>{var a,n,s,i;return t.createElement("td",{className:"h-[35px]"},t.createElement("img",{className:"cover",src:`https://openweathermap.org/img/wn/${(n=(a=e==null?void 0:e.weather)==null?void 0:a[0])==null?void 0:n.icon}@2x.png`,alt:(i=(s=e==null?void 0:e.weather)==null?void 0:s[0])==null?void 0:i.description}))},Te=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(a=e==null?void 0:e.main)==null?void 0:a.humidity)},He=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},k((a=e==null?void 0:e.main)==null?void 0:a.pressure))},Re=e=>{var a;return t.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(a=e==null?void 0:e.wind)==null?void 0:a.speed)},Ae=()=>{const{hourlyWeather:e}=D(),{breakpointsForMarkup:a}=H()??{breakpointsForMarkup:null},n=[{label:"Temperature in °C",icon:"icon-thermometer",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:Ie},{label:"Precipitation and weather",icon:"icon-sun",iconSize:24,iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:$e},{label:"Humidity (%)",icon:"icon-humidity",iconSize:28,iconColorStyles:"fill-whiteBase",renderCell:Te},{label:"Pressure (mm.Hg)",icon:"icon-pressure",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:He},{label:"Wind speed (m/s)",icon:"icon-weather-wind",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:Re}];return t.createElement("div",{className:"w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]"},t.createElement(X,null,t.createElement("table",{className:"bg-accentBase min-w-full h-full border border-separate border-transparent"},t.createElement("thead",{className:"h-10"},t.createElement(A,null,t.createElement(U,{asChild:!0},t.createElement("tr",null,t.createElement("th",{className:"w-10 pr-2"},t.createElement(g,{svgName:"icon-time",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:24,className:"fill-whiteBase"})),e&&Array.isArray(e)&&(e==null?void 0:e.map(s=>{const i=T(s==null?void 0:s.dt);return t.createElement("th",{key:s==null?void 0:s.dt,scope:"col",className:"whitespace-nowrap text-small md:text-base text-whiteBase text-center -rotate-90"},i)})))),t.createElement(L,null,t.createElement(G,{className:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},"Time")))),t.createElement("tbody",null,n.map(({label:s,icon:i,iconColorStyles:c,iconSize:l,renderCell:r})=>t.createElement(A,{key:i},t.createElement(U,{asChild:!0},t.createElement("tr",null,t.createElement("th",{scope:"row",className:"w-10 pr-2"},t.createElement(g,{svgName:i,size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:l,className:c})),e&&Array.isArray(e)&&e.map(o=>t.createElement(t.Fragment,{key:o==null?void 0:o.dt},r(o))))),t.createElement(L,null,t.createElement(G,{className:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},s))))))))},Ue=()=>{var i,c,l,r,o,h,w;const{currentWeather:e}=D(),{breakpointsForMarkup:a}=H()??{breakpointsForMarkup:null},{days:n,dateNow:s}=De();return t.createElement("div",{className:"w-full h-full backface-hidden col-[1/1] rows-[1/1] flex flex-col gap-3 justify-between"},t.createElement("div",{className:"text-center mb-3"},t.createElement("p",{className:"font-weather text-3.5xl md:text-4.5xl text-contrastWhite"},n),t.createElement("p",{className:"font-weather text-2.5xl md:text-3.5xl text-contrastWhite"},s)),t.createElement("div",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-timezone","data-tooltip-placement":"right"},t.createElement(g,{svgName:"icon-earth",size:a!=null&&a.isNothing||a!=null&&a.isMobile?16:24,className:"fill-whiteBase"}),Be(e==null?void 0:e.timezone)," UTC"),t.createElement("div",{id:"tooltip-timezone",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Timezone",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-humidity","data-tooltip-placement":"left"},(i=e==null?void 0:e.main)==null?void 0:i.humidity," %",t.createElement(g,{svgName:"icon-humidity",size:a!=null&&a.isNothing||a!=null&&a.isMobile?18:30,className:"fill-whiteBase"})),t.createElement("div",{id:"tooltip-humidity",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Humidity",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-pressure-mmHg","data-tooltip-placement":"right"},t.createElement(g,{svgName:"icon-pressure",size:a!=null&&a.isNothing||a!=null&&a.isMobile?18:30,className:"fill-whiteBase"}),k((c=e==null?void 0:e.main)==null?void 0:c.pressure)," mm.Hg"),t.createElement("div",{id:"tooltip-pressure-mmHg",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Pressure",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-pressure-hpa","data-tooltip-placement":"left"},(l=e==null?void 0:e.main)==null?void 0:l.pressure," ㍱",t.createElement(g,{svgName:"icon-pressure",size:a!=null&&a.isNothing||a!=null&&a.isMobile?18:30,className:"fill-whiteBase"})),t.createElement("div",{id:"tooltip-pressure-hpa",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Pressure",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-sunrise","data-tooltip-placement":"right"},t.createElement(g,{svgName:"icon-sunrise",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:30,className:"fill-whiteBase"}),T((r=e==null?void 0:e.sys)==null?void 0:r.sunrise)," AM"),t.createElement("div",{id:"tooltip-sunrise",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Sunrise",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-sunset","data-tooltip-placement":"left"},T((o=e==null?void 0:e.sys)==null?void 0:o.sunset)," PM",t.createElement(g,{svgName:"icon-sunset",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:30,className:"fill-whiteBase"})),t.createElement("div",{id:"tooltip-sunset",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Sunset",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-visibility","data-tooltip-placement":"right"},t.createElement(g,{svgName:"icon-eye-opened",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:30,className:"fill-whiteBase"}),ze(e==null?void 0:e.visibility)," km"),t.createElement("div",{id:"tooltip-visibility",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Visibility",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement("div",{className:"flex gap-3 items-center justify-end"},t.createElement("p",{className:"text-contrastWhite flex flex-col text-base lg:text-medium text-end","data-tooltip-target":"tooltip-windSpeed","data-tooltip-placement":"left"},(h=e==null?void 0:e.wind)==null?void 0:h.speed," m/s"," ",t.createElement("span",{className:"text-[8px]"},"(",Ce((w=e==null?void 0:e.wind)==null?void 0:w.speed)," on the Beaufort scale)")),t.createElement("div",{id:"tooltip-windSpeed",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Wind speed",t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),t.createElement(g,{svgName:"icon-weather-wind",size:a!=null&&a.isNothing||a!=null&&a.isMobile?20:30,className:"fill-whiteBase"}))))},Le=()=>{var z,S,B,p,y,I,$,m,u,d;const{hasGeolocationPermission:e,isCelsius:a,flippingCard:n,requestGeolocationPermission:s,toggleTemperatureScale:i,flipWeatherDetails:c}=Se(),{breakpointsForMarkup:l}=H()??{breakpointsForMarkup:null},{isWeatherLoading:r,currentWeather:o}=D(),h=o&&Object.keys(o).length===0,w=r&&e;return t.createElement("div",{className:`${!r&&h?"flex flex-col items-center justify-between text-center py-10 px-6 md:px-10":"py-8 px-5 md:pt-10 md:px-8 lg:px-[53px"}  bg-accentBase w-full hg:w-[442px] h-full`},!r&&h?t.createElement(t.Fragment,null,t.createElement("h2",{className:"text-whiteBase text-medium md:text-2xl lg:text-4xl"},"What a pity, this could be your weather"),t.createElement("span",{className:"mt-20 mb-28"},t.createElement(g,{svgName:"icon-moon",size:156,className:"fill-transparent stroke-greyBase"})),t.createElement(W,{id:"Geolocation permission button",variant:"Primary",onHandleClick:s,classNameButton:"border border-solid border-whiteBase"},e?"Get the weather for your region":"Give permission for your geolocation")):w?t.createElement(J,{variant:"element"}):!r&&!h&&e&&t.createElement(t.Fragment,null,t.createElement("div",{className:"flex justify-evenly gap-5 items-center mx-auto cursor-pointer",onClick:i},t.createElement("div",{className:'relative w-[83px] md:w-[96px] after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white text-center'},t.createElement("p",{className:"w-full font-weather text-monstrous md:text-[64px] text-contrastWhite"},(o==null?void 0:o.main)!==void 0&&(a?Math.round((z=o==null?void 0:o.main)==null?void 0:z.temp)+"°":Math.round(((S=o==null?void 0:o.main)==null?void 0:S.temp)*9/5+32)+"°"))),t.createElement("div",null,(o==null?void 0:o.weather)&&((B=o==null?void 0:o.weather[0])==null?void 0:B.main)&&t.createElement("p",{className:"font-weather text-3xl md:text-4.5xl text-contrastWhite"},(p=o==null?void 0:o.weather[0])==null?void 0:p.main),t.createElement("p",{className:"font-weather text-base md:text-2xl text-contrastWhite mb-2.5"},"Feels like"," ",a?Math.round((y=o==null?void 0:o.main)==null?void 0:y.feels_like)+"°C":Math.round(((I=o==null?void 0:o.main)==null?void 0:I.feels_like)*9/5+32)+"°F"),t.createElement("div",{className:"flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg"},t.createElement(g,{svgName:"icon-location",size:l!=null&&l.isNothing||l!=null&&l.isMobile?20:27,className:"fill-whiteBase"}),t.createElement("p",{className:"text-base md:text-2xl text-contrastWhite"},o==null?void 0:o.name)))),(o==null?void 0:o.weather)&&(o==null?void 0:o.weather[0].icon)&&t.createElement(t.Fragment,null,t.createElement("img",{className:"m-auto w-32 h-32 md:w-[165px] md:h-[165px]",src:`https://openweathermap.org/img/wn/${o==null?void 0:o.weather[0].icon}@2x.png`,alt:(m=($=o==null?void 0:o.weather)==null?void 0:$[0])==null?void 0:m.description,"data-tooltip-target":"tooltip-weather-img","data-tooltip-placement":"left"}),t.createElement("div",{id:"tooltip-weather-img",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},(d=(u=o==null?void 0:o.weather)==null?void 0:u[0])==null?void 0:d.description,t.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0}))),t.createElement("div",{className:"w-full h-56 perspective-10 cursor-pointer",onClick:c},t.createElement("div",{className:`w-full h-full transition-transform grid grid-cols-1 grid-rows-1 transform-style-3d ${n}`},t.createElement(Ue,null),t.createElement(Ae,null)))))},je=({currentItems:e,currentPage:a})=>t.createElement("ul",{className:"max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10 mb-10 md:mb-12 lg:mb-[60px]"},a&&a===1&&t.createElement("li",{className:"max-md:h-[515px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard  duration-500 md:col-start-2 lg:col-start-3"},t.createElement(Le,null)),e&&e.map((n,s)=>t.createElement("li",{key:n.newsUrl,className:`relative w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[655px] md:h-[700px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-colors duration-500 ${s===0&&"md:col-start-1 md:row-start-1 lg:col-start-1"} ${s===1&&"lg:col-start-2 lg:row-start-1"}`},t.createElement(we,{liveNews:n}))));export{je as N,be as P};
