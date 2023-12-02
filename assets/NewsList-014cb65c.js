import{k as H,l as $,r as y,m as W,n as q,R as a,S as f,P as L,u as P,H as T,L as v,c as K,d as G,o as I,f as j,g as O}from"./index-9fe28569.js";import{g as X,p as J,u as Q}from"./images-284dd491.js";const Y=e=>e.weather.isLoading,Z=e=>e.weather.data,F=e=>e.weather.weatherByHour,k=e=>e.weather.hasError,D=()=>{const e=H(Y),t=H(Z),r=H(F),n=H(k),o=$(),l=y.useCallback(s=>o(W(s)),[o]),c=y.useCallback(s=>o(q(s)),[o]);return{isWeatherLoading:e,currentWeather:t,hourlyWeather:r,weatherError:n,getCurrentWeather:l,getHourlyWeather:c}},_=()=>{const[e,t]=y.useState(!0),[r,n]=y.useState(!1),[o,l]=y.useState(!1),{getCurrentWeather:c,getHourlyWeather:s}=D(),u="geolocation"in navigator;return y.useEffect(()=>{u&&localStorage.getItem("geolocationPermission")&&l(!0)},[]),{isCelsius:e,hasGeolocationPermission:o,flippingCard:r?"rotate-y-180":"rotate-y-0",requestGeolocationPermission:()=>{u&&navigator.permissions.query({name:"geolocation"}).then(C=>{C.state==="granted"?(l(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(h=>{const x={latitude:h.coords.latitude,longitude:h.coords.longitude};c(x),s(x)})):C.state==="prompt"?navigator.geolocation.getCurrentPosition(h=>{l(!0),localStorage.setItem("geolocationPermission","granted");const x={latitude:h.coords.latitude,longitude:h.coords.longitude};c(x),s(x)},h=>{switch(l(!1),h.code){case h.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case h.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case h.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}}):l(!1)})},toggleTemperatureScale:()=>{t(!e)},flipWeatherDetails:()=>{n(!r)}}},M=()=>{const{hasGeolocationPermission:e,requestGeolocationPermission:t}=_();return a.createElement(a.Fragment,null,a.createElement("h2",{className:"text-whiteBase text-medium md:text-2xl lg:text-4xl"},"What a pity, this could be your weather"),a.createElement("span",{className:"mt-20 mb-28"},a.createElement(f,{svgName:"icon-moon",size:156,className:"fill-transparent stroke-greyBase"})),a.createElement(L,{id:"Geolocation permission button",variant:"Primary",onHandleClick:t,classNameButton:"border border-solid border-whiteBase"},e?"Get the weather for your region":"Give permission for your geolocation"))};function U(e){const t=new Date(e*1e3),r=t.getHours(),n=t.getMinutes(),o=String(r).padStart(2,"0"),l=String(n).padStart(2,"0");return`${o}:${l}`}function N(e){return{"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"}[e]}function V(e){const t=e*.75006;return Math.floor(t)}function ee(e){return e/1e3}function te(e){let t;const r=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}];return e&&(t=r.find(n=>e>=n.min&&e<=n.max)),t?t==null?void 0:t.scale:""}function ae(){const e=new Date,t=e.getHours(),r=e.getMinutes(),n=c=>c<10?`0${c}`:c.toString(),o=n(t),l=n(r);return`${o}:${l}`}function oe(){const e=new Date,t=ae(),r=e.toDateString().slice(0,3),n=e.toDateString().slice(4).slice(0,4),o=e.toDateString().slice(8).slice(0,2),l=e.toDateString().slice(11),c=`${t} | ${o} ${n} ${l}`;return{days:r,dateNow:c}}const se=e=>{var t;return a.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},Math.ceil((t=e==null?void 0:e.main)==null?void 0:t.temp),"°C")},ne=e=>{var t,r,n,o;return a.createElement("td",{className:"h-[35px]"},a.createElement("img",{className:"cover",src:`https://openweathermap.org/img/wn/${(r=(t=e==null?void 0:e.weather)==null?void 0:t[0])==null?void 0:r.icon}@2x.png`,alt:(o=(n=e==null?void 0:e.weather)==null?void 0:n[0])==null?void 0:o.description}))},le=e=>{var t;return a.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(t=e==null?void 0:e.main)==null?void 0:t.humidity)},re=e=>{var t;return a.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},V((t=e==null?void 0:e.main)==null?void 0:t.pressure))},ie=e=>{var t;return a.createElement("td",{className:"py-1.5 md:py-4 text-small md:text-base text-whiteBase text-center"},(t=e==null?void 0:e.wind)==null?void 0:t.speed)},ce=()=>{const{hourlyWeather:e}=D(),{breakpointsForMarkup:t}=P()??{breakpointsForMarkup:null},r=[{label:"Temperature in °C",icon:"icon-thermometer",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:se},{label:"Precipitation and weather",icon:"icon-sun",iconSize:24,iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:ne},{label:"Humidity (%)",icon:"icon-humidity",iconSize:28,iconColorStyles:"fill-whiteBase",renderCell:le},{label:"Pressure (mm.Hg)",icon:"icon-pressure",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:re},{label:"Wind speed (m/s)",icon:"icon-weather-wind",iconSize:24,iconColorStyles:"fill-whiteBase",renderCell:ie}];return a.createElement("div",{className:"w-full h-full backface-hidden flex bg-accentBase duration-500 ease-in rotate-y-180 col-[1/1] rows-[1/1]"},a.createElement("table",{className:"bg-accentBase min-w-full h-full border border-separate border-transparent"},a.createElement("thead",{className:"h-10"},a.createElement(T,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)",contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},a.createElement("tr",null,a.createElement("th",{className:"w-10 pr-2"},a.createElement(f,{svgName:"icon-time",size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:24,className:"fill-whiteBase"})),e&&Array.isArray(e)&&(e==null?void 0:e.map(n=>{const o=U(n==null?void 0:n.dt);return a.createElement("th",{key:n==null?void 0:n.dt,scope:"col",className:"whitespace-nowrap text-small md:text-base text-whiteBase text-center -rotate-90"},o)}))))),a.createElement("tbody",null,r.map(({label:n,icon:o,iconColorStyles:l,iconSize:c,renderCell:s})=>a.createElement(T,{key:o,label:n,side:"top",sideOffset:0,ariaLabel:`Info about ${n} by time interval`,contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},a.createElement("tr",null,a.createElement("th",{scope:"row",className:"w-10 pr-2"},a.createElement(f,{svgName:o,size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:c,className:l})),e&&Array.isArray(e)&&e.map(u=>a.createElement(a.Fragment,{key:u==null?void 0:u.dt},s(u)))))))))},me=()=>{var o,l,c,s,u,w,g;const{currentWeather:e}=D(),{breakpointsForMarkup:t}=P()??{breakpointsForMarkup:null},{days:r,dateNow:n}=oe();return a.createElement("div",{className:"w-full h-full backface-hidden col-[1/1] rows-[1/1] flex flex-col gap-3 justify-between"},a.createElement("div",{className:"text-center mb-3"},a.createElement("p",{className:"font-weather text-3.5xl md:text-4.5xl text-contrastWhite"},r),a.createElement("p",{className:"font-weather text-2.5xl md:text-3.5xl text-contrastWhite"},n)),a.createElement("div",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-timezone","data-tooltip-placement":"right"},a.createElement(f,{svgName:"icon-earth",size:t!=null&&t.isNothing||t!=null&&t.isMobile?16:24,className:"fill-whiteBase"}),N(e==null?void 0:e.timezone)," UTC"),a.createElement("div",{id:"tooltip-timezone",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Timezone",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-humidity","data-tooltip-placement":"left"},(o=e==null?void 0:e.main)==null?void 0:o.humidity," %",a.createElement(f,{svgName:"icon-humidity",size:t!=null&&t.isNothing||t!=null&&t.isMobile?18:30,className:"fill-whiteBase"})),a.createElement("div",{id:"tooltip-humidity",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Humidity",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-pressure-mmHg","data-tooltip-placement":"right"},a.createElement(f,{svgName:"icon-pressure",size:t!=null&&t.isNothing||t!=null&&t.isMobile?18:30,className:"fill-whiteBase"}),V((l=e==null?void 0:e.main)==null?void 0:l.pressure)," mm.Hg"),a.createElement("div",{id:"tooltip-pressure-mmHg",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Pressure",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-pressure-hpa","data-tooltip-placement":"left"},(c=e==null?void 0:e.main)==null?void 0:c.pressure," ㍱",a.createElement(f,{svgName:"icon-pressure",size:t!=null&&t.isNothing||t!=null&&t.isMobile?18:30,className:"fill-whiteBase"})),a.createElement("div",{id:"tooltip-pressure-hpa",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Pressure",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-sunrise","data-tooltip-placement":"right"},a.createElement(f,{svgName:"icon-sunrise",size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:30,className:"fill-whiteBase"}),U((s=e==null?void 0:e.sys)==null?void 0:s.sunrise)," AM"),a.createElement("div",{id:"tooltip-sunrise",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Sunrise",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center justify-end","data-tooltip-target":"tooltip-sunset","data-tooltip-placement":"left"},U((u=e==null?void 0:e.sys)==null?void 0:u.sunset)," PM",a.createElement(f,{svgName:"icon-sunset",size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:30,className:"fill-whiteBase"})),a.createElement("div",{id:"tooltip-sunset",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Sunset",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("p",{className:"text-contrastWhite text-base md:text-medium flex gap-3 items-center","data-tooltip-target":"tooltip-visibility","data-tooltip-placement":"right"},a.createElement(f,{svgName:"icon-eye-opened",size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:30,className:"fill-whiteBase"}),ee(e==null?void 0:e.visibility)," km"),a.createElement("div",{id:"tooltip-visibility",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Visibility",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement("div",{className:"flex gap-3 items-center justify-end"},a.createElement("p",{className:"text-contrastWhite flex flex-col text-base lg:text-medium text-end","data-tooltip-target":"tooltip-windSpeed","data-tooltip-placement":"left"},(w=e==null?void 0:e.wind)==null?void 0:w.speed," m/s"," ",a.createElement("span",{className:"text-[8px]"},"(",te((g=e==null?void 0:e.wind)==null?void 0:g.speed)," on the Beaufort scale)")),a.createElement("div",{id:"tooltip-windSpeed",role:"tooltip",className:"absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"},"Wind speed",a.createElement("div",{className:"tooltip-arrow","data-popper-arrow":!0})),a.createElement(f,{svgName:"icon-weather-wind",size:t!=null&&t.isNothing||t!=null&&t.isMobile?20:30,className:"fill-whiteBase"}))))},de=()=>{var g,A,E,C,h,x,z,R;const{hasGeolocationPermission:e,isCelsius:t,flippingCard:r,toggleTemperatureScale:n,flipWeatherDetails:o}=_(),{breakpointsForMarkup:l}=P()??{breakpointsForMarkup:null},{isWeatherLoading:c,currentWeather:s}=D(),u=s&&Object.keys(s).length===0,w=c&&e;return a.createElement("div",{className:`${!c&&u?"flex flex-col items-center justify-between text-center py-10 px-6 md:px-10":"py-8 px-5 md:pt-10 md:px-8"}  bg-accentBase w-full hg:w-[442px] h-full`},!c&&u?a.createElement(M,null):w?a.createElement(v,{variant:"element"}):!c&&!u&&e&&a.createElement(a.Fragment,null,a.createElement("div",{className:"flex justify-evenly gap-5 items-center mx-auto cursor-pointer",onClick:n},a.createElement("div",{className:'relative w-[83px] md:w-[96px] after:content-[""] after:h-full after:absolute after:w-px after:-right-2 after:top-0 after:bg-white text-center'},a.createElement("p",{className:"w-full font-weather text-monstrous md:text-[64px] text-contrastWhite"},(s==null?void 0:s.main)!==void 0&&(t?Math.round((g=s==null?void 0:s.main)==null?void 0:g.temp)+"°":Math.round(((A=s==null?void 0:s.main)==null?void 0:A.temp)*9/5+32)+"°"))),a.createElement("div",null,(s==null?void 0:s.weather)&&((E=s==null?void 0:s.weather[0])==null?void 0:E.main)&&a.createElement("p",{className:"font-weather text-3xl md:text-4.5xl text-contrastWhite"},(C=s==null?void 0:s.weather[0])==null?void 0:C.main),a.createElement("p",{className:"font-weather text-base md:text-2xl text-contrastWhite mb-2.5"},"Feels like"," ",t?Math.round((h=s==null?void 0:s.main)==null?void 0:h.feels_like)+"°C":Math.round(((x=s==null?void 0:s.main)==null?void 0:x.feels_like)*9/5+32)+"°F"),a.createElement("div",{className:"flex items-center gap-1 md:gap-2 text-contrastWhite bg-weatherForeground py-[9px] px-2 md:pt-[10px] md:pr-[17px] md:pb-[9px] md:pl-[7px] rounded-lg"},a.createElement(f,{svgName:"icon-location",size:l!=null&&l.isNothing||l!=null&&l.isMobile?20:27,className:"fill-whiteBase"}),a.createElement("p",{className:"text-base md:text-2xl text-contrastWhite"},s==null?void 0:s.name)))),(s==null?void 0:s.weather)&&(s==null?void 0:s.weather[0].icon)&&a.createElement("img",{className:"m-auto w-32 h-32 md:w-[165px] md:h-[165px]",src:`https://openweathermap.org/img/wn/${s==null?void 0:s.weather[0].icon}@2x.png`,alt:(R=(z=s==null?void 0:s.weather)==null?void 0:z[0])==null?void 0:R.description}),a.createElement("div",{className:"w-full h-56 perspective-10 cursor-pointer",onClick:o},a.createElement("div",{className:`w-full h-full transition-transform grid grid-cols-1 grid-rows-1 transform-style-3d ${r}`},a.createElement(me,null),a.createElement(ce,null)))))},ue=({variant:e})=>{const t=window.devicePixelRatio||1,r=X(J,t,"image/webp",window.innerWidth),n=Q((r==null?void 0:r.src)||"");return a.createElement(a.Fragment,null,e==="page"?a.createElement("div",{className:"flex flex-col items-center justify-center"},a.createElement("p",{className:"text-darkBase dark:text-whiteBase text-2xl font-bold tracking-smallTight mb-10 text-center md:text-5xl md:tracking-tighter md:w-[548px] transition-colors duration-500"},"We haven’t found news from this category"),a.createElement("img",{src:n,alt:"No found news"})):a.createElement("img",{src:n,alt:"No found news"}))},ge=({liveNews:e,activeLinks:t})=>{const[r,n]=y.useState(!1),{savedNews:o,allArchive:l,updateSavedNews:c,addVotedNews:s,removeNews:u}=K(),[w,g]=y.useState(()=>z()),[A,E]=y.useState(()=>R()),{isAuthenticated:C}=G(),h=$();y.useEffect(()=>{if(C){if(t.isArchiveActive){if(t.isArchiveActive&&l&&l.length!==0){const i=l.find(B=>B.isFavourite),m=l.find(B=>B.hasRead),d=i==null?void 0:i.isFavourite,p=m==null?void 0:m.hasRead;d===!0&&p===!0&&(g(!0),E(!0)),d===!0&&p===!1&&g(!0),p===!0&&d===!1&&E(!0)}}else if(o&&(e==null?void 0:e.newsUrl)!==void 0)if((o==null?void 0:o.length)!==0){const i=o.find(p=>p.newsUrl===(e==null?void 0:e.newsUrl)),m=i==null?void 0:i.isFavourite,d=i==null?void 0:i.hasRead;m===!0&&d===!0&&(g(!0),E(!0)),m===!0&&d===!1&&g(!0),d===!0&&m===!1&&E(!0)}else return}},[o,l,C,e]),y.useEffect(()=>{r&&o&&(s(o),n(!1))},[r,s]);const x=()=>{n(!0)};function z(){if(t.isArchiveActive){const i=l==null?void 0:l.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(i==null?void 0:i.isFavourite)??!1}else{const i=o==null?void 0:o.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(i==null?void 0:i.isFavourite)??!1}}function R(){if(t.isArchiveActive){const i=l==null?void 0:l.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(i==null?void 0:i.hasRead)??!1}else{const i=o==null?void 0:o.find(m=>m.newsUrl===(e==null?void 0:e.newsUrl));return(i==null?void 0:i.hasRead)??!1}}return{isFavourite:w,hasRead:A,handleChangeFavourites:async i=>{if(i.stopPropagation(),i.preventDefault(),t.isArchiveActive||x(),o&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!t.isArchiveActive){const d=new Date().getTime();if(o.length===0){g(!0);const p={...e,isFavourite:!0,hasRead:!1,additionDate:d};await c(p)}else{const p=o==null?void 0:o.find(S=>S.newsUrl===e.newsUrl),B=p==null?void 0:p.isFavourite,b=p==null?void 0:p.hasRead;if(console.log("existingNews",p),p){if(B===!1&&b===!0){g(!0);const S={...e,isFavourite:!0};await c(S)}else if(B===!0&&b===!1){g(!1);const S={...e,isFavourite:!1,hasRead:b,additionDate:null};await c(S),await h(I({newsUrl:(e==null?void 0:e.newsUrl)||""}))}else if(B===!0&&b===!0){g(!1);const S={...e,isFavourite:!1,hasRead:b};await c(S),await h(I({newsUrl:(e==null?void 0:e.newsUrl)||""}))}}else{g(!0);const S={...e,isFavourite:!0,hasRead:!1,additionDate:d};await c(S)}}}},handleReadNews:async()=>{if(o&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!t.isArchiveActive){const m=new Date().getTime();if(o.length===0){E(!0),x();const d={...e,hasRead:!0,isFavourite:!1,additionDate:m};await c(d)}else{const d=o==null?void 0:o.find(b=>b.newsUrl===e.newsUrl),p=d==null?void 0:d.isFavourite,B=d==null?void 0:d.hasRead;if(d){if(B===!1&&p===!0){E(!0),x();const b={...e,hasRead:!0};await c(b)}else if(B===!0)return}else{E(!0),x();const b={...e,hasRead:!0,additionDate:m};await c(b)}}}},handleDeleteNews:async(i,m)=>{i.stopPropagation(),i.preventDefault(),console.log("Delete news"),await u(m)}}},pe=({onHandleClick:e,isFavourite:t,buttonData:r})=>{const n=j(),o=O(n),l=t?"fill-accentBase stroke-accentBase":"stroke-accentBase fill-none";return a.createElement("button",{id:r==null?void 0:r.id,type:"button",className:`absolute z-20 bottom-3 right-2 flex items-center gap-1 rounded-3xl px-3 py-1.5 bg-contrastWhite ${l} ${o.isArchiveActive?"":"hover:stroke-whiteBase hover:bg-accentBase hover:text-whiteBase"} text-small text-darkBase font-medium transition-colors duration-250`,onClick:e},o.isArchiveActive?t?"In favourites":"":t?"Remove from favorite":"Add to favorite",a.createElement(f,{svgName:"icon-heart",size:16,className:"stroke-inherit fill-inherit"}))},he=({liveNews:e={}})=>{const{isAuthenticated:t}=G(),r=a.createRef(),n=j(),o=O(n),{isFavourite:l,hasRead:c,handleChangeFavourites:s,handleReadNews:u,handleDeleteNews:w}=ge({liveNews:e,activeLinks:o}),g=o.isHomeActive||o.isArchiveActive;return a.createElement(a.Fragment,null,e&&(e==null?void 0:e.newsUrl)&&a.createElement("a",{className:"block group transition-colors duration-500",href:e==null?void 0:e.newsUrl,target:"_blank",onClick:t?u:void 0},a.createElement("div",{className:`${t&&c&&g?"absolute z-20 w-full h-full bg-whiteBase/[.4]":"hidden"}`}),o.isArchiveActive?a.createElement(T,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Delete news from archive",contentClass:"border border-solid border-whiteBase rounded-xl text-small md:text-medium px-2 text-whiteBase bg-accentAlt/[.8]"},a.createElement("div",null,a.createElement(L,{ref:r,onHandleClick:A=>w(A,(e==null?void 0:e._id)||""),variant:"Small",hasIcon:!0,svgName:"icon-close",svgSize:24,classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))):null,a.createElement("p",{className:"absolute z-20 top-10 left-0 py-1 px-2 text-small font-medium text-contrastWhite bg-accentBase/[.7] rounded-r"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),t&&c&&a.createElement("p",{className:"absolute z-10 top-3.5 right-14 md:top-5 text-base font-bold text-readBase flex items-center gap-1"},"Already read",a.createElement(f,{svgName:"icon-check",size:18,className:"fill-readBase"})),a.createElement("div",{className:"relative h-[395px] flex justify-center items-center overflow-hidden rounded-[10px]"},e&&(e!=null&&e.imgLink)?a.createElement("img",{className:"rounded-xl max-w-none h-full absolute object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):a.createElement(ue,{variant:"card"}),t&&a.createElement(pe,{onHandleClick:s,isFavourite:l,buttonData:{id:`Add ${e==null?void 0:e.newsUrl} to favourites or remove from them`}})),a.createElement("div",{className:"px-4 mt-4"},a.createElement("p",{className:"text-small lg:text-base leading-tight text-darkBase dark:text-whiteBase mb-2 text-end line-clamp-1"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),a.createElement("h2",{className:"h-[100px] md:h-[132px] mb-4 text-3xl md:text-4xl font-bold leading-tight tracking-mediumTight md:tracking-tighter line-clamp-3 dark:text-whiteBase"},e==null?void 0:e.title),a.createElement("p",{className:"h-[57px] md:h-[66px] text-base md:text-medium leading-tight line-clamp-3 text-darkBase dark:text-whiteBase mb-4"},e==null?void 0:e.description),a.createElement("div",{className:"flex justify-between"},a.createElement("p",{className:"text-base md:text-medium text-greyAlt"},e==null?void 0:e.publishDate),a.createElement("div",{className:"flex pr-2 items-center gap-2 bg-accentAlt dark:bg-transparent duration-500 transition-all translate-x-full rounded-2xl group-hover:translate-x-0 group-hover:bg-accentAlt"},a.createElement(f,{svgName:"icon-arrow-direction-left",size:16,className:"fill-whiteBase"}),a.createElement("p",{className:"text-base md:text-medium text-whiteBase transition-colors duration-500"},"Click for read more..."))))))},Be=({currentItems:e,currentPage:t})=>{const{isWeatherLoading:r}=D();return a.createElement("ul",{className:"max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10 mb-10 md:mb-12 lg:mb-[60px]"},t&&t===1&&a.createElement("li",{className:"max-md:h-[515px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-colors duration-500 md:col-start-2 lg:col-start-3"},r?a.createElement(v,{variant:"element"}):a.createElement(de,null)),e&&e.map((n,o)=>a.createElement("li",{key:n.newsUrl,className:`relative w-72 md:w-[353px] lg:w-[395px] hg:w-[442px] h-[655px] md:h-[700px] shadow-card overflow-hidden rounded-[10px] dark:shadow-darkCard transition-colors duration-500 ${o===0&&"md:col-start-1 md:row-start-1 lg:col-start-1"} ${o===1&&"lg:col-start-2 lg:row-start-1"}`},a.createElement(he,{liveNews:n}))))};export{Be as N,ue as P};
