import{m as R,n as ee,r as b,o as te,p as ae,b as A,f as k,q as se,R as a,S as C,P as V,V as O,u as F,H as $,L as q,d as v,s as _,t as oe,e as z,v as ne,M as re,c as K,g as X,w as ce}from"./index-85bc09cb.js";import{p as le,u as ie}from"./images-c2995247.js";import{T as me}from"./Toast-47d44cab.js";const de=e=>e.weather.isLoading,ue=e=>e.weather.data,he=e=>e.weather.weatherByHour,ge=e=>e.weather.hasError,D=()=>{const e=R(de),t=R(ue),r=R(he),o=R(ge),c=ee(),n=b.useCallback(l=>c(te(l)),[c]),s=b.useCallback(l=>c(ae(l)),[c]);return{isWeatherLoading:e,currentWeather:t,hourlyWeather:r,weatherError:o,getCurrentWeather:n,getHourlyWeather:s}},J=({variant:e})=>{const{errorAPI:t}=A(),{isHomeActive:r}=k(),o=t==null?void 0:t.toString().includes("429"),c=window.devicePixelRatio||1,n=se(le,c,window.innerWidth),s=ie((n==null?void 0:n.src)||""),l="text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter";return a.createElement(a.Fragment,null,e==="page"?a.createElement("div",{className:"flex flex-col items-center justify-center space-y-10"},a.createElement("p",{className:`${l}`},`${o&&r?"It seems you have been send too much requests then its needed":"We haven’t found news from this category"}`),a.createElement("img",{src:s,alt:`${o&&r?"Too much requests":"No found news"}`,width:n.width,height:n.height})):a.createElement("img",{src:s,alt:"No found an image for news",width:n.width,height:n.height}))},Q=()=>{const[e,t]=b.useState(!0),[r,o]=b.useState(!1),[c,n]=b.useState(null),[s,l]=b.useState(!1),{getCurrentWeather:i,getHourlyWeather:m}=D(),d="geolocation"in navigator,h=g=>{switch(l(!1),n("denied"),g.code){case g.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case g.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case g.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}};return b.useEffect(()=>{localStorage.getItem("geolocationPermission")&&(l(!0),n("granted"))},[c]),{isCelsius:e,hasGeolocationPermission:s,flippingCard:r?"rotate-y-180":"rotate-y-0",requestGeolocationPermission:()=>{d&&navigator.permissions.query({name:"geolocation"}).then(g=>{g.state==="granted"?(n("granted"),l(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(x=>{const S={lat:x.coords.latitude,lon:x.coords.longitude};i(S),m(S)})):g.state==="prompt"?(n("prompt"),navigator.geolocation.getCurrentPosition(x=>{l(!0),localStorage.setItem("geolocationPermission","granted");const S={lat:x.coords.latitude,lon:x.coords.longitude};i(S),m(S)},h)):(l(!1),n("denied"),localStorage.removeItem("geolocationPermission"))})},toggleTemperatureScale:()=>{t(!e)},flipWeatherDetails:()=>{o(!r)},showButtonText:()=>{let g="Give permission for your geolocation";if(c==="prompt")g="Give permission for your geolocation";else if(s)g="Get the weather for your region";else if(c==="denied")g="Permission denied";else return"Give permission for your geolocation";return g},statePermission:c}},pe=({showError:e})=>{const{requestGeolocationPermission:t,showButtonText:r}=Q(),o=e?"Server error. Please try again later when you reload the page":"What a pity, this could be your weather";return a.createElement(a.Fragment,null,a.createElement("h2",{className:"text-medium text-whiteBase md:text-2xl lg:text-4xl"},o),a.createElement("div",{className:`my-auto ${e?"flex justify-center":""}`},a.createElement(C,{svgName:"moon",sizeKey:"ultraIcon156",className:"fill-transparent stroke-greyBase"})),!e&&a.createElement(V,{id:"Geolocation permission button",variant:O.Primary,onHandleClick:t,classNameButton:"border border-solid border-whiteBase"},r()))},fe={"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"};function U(e){const t=new Date(e*1e3),r=t.getHours(),o=t.getMinutes(),c=String(r).padStart(2,"0"),n=String(o).padStart(2,"0");return`${c}:${n}`}function xe(e){const t=String(e);return fe[t]}function Y(e){const t=e*.75006;return Math.floor(t)}function ye(e){return e/1e3}function be(e){let t;const r=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}];return e&&(t=r.find(o=>e>=o.min&&e<=o.max)),t?t==null?void 0:t.scale:""}function Ee(){const e=new Date,t=e.getHours(),r=e.getMinutes(),o=s=>s<10?`0${s}`:s.toString(),c=o(t),n=o(r);return`${c}:${n}`}function we(){const e={Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"},t=new Date,r=e[t.toDateString().slice(0,3)],o=Ee(),c=t.toDateString().slice(4).slice(0,4),n=t.toDateString().slice(8).slice(0,2),s=t.toDateString().slice(11),l=`${o} | ${n} ${c} ${s}`;return{days:r,dateNow:l}}const G=(e,t)=>t&&e?Math.round(e)+"°":Math.round(e*9/5+32)+"°",Se=(e,t)=>{var o,c,n,s,l,i,m;return[{icon:"earth",iconSize:e?"xsIcon16":"mdIcon24",value:`${xe(t==null?void 0:t.timezone)}`,label:"Greenwich mean time",hint:"GMT time",justifyItemClass:"justify-start",subTextValue:"UTC"},{icon:"humidity",iconSize:e?"smIcon18":"lgIcon30",value:`${(o=t==null?void 0:t.main)==null?void 0:o.humidity}`,label:"Humidity in percent",hint:"Humidity (%)",justifyItemClass:"justify-end",subTextValue:"%"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${Y((c=t==null?void 0:t.main)==null?void 0:c.pressure)}`,label:"Atmospheric pressure in mm Hg",hint:"Atmospheric pressure (mm.Hg)",justifyItemClass:"justify-start",subTextValue:"mm.Hg"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${(n=t==null?void 0:t.main)==null?void 0:n.pressure}`,label:"Atmospheric pressure in hPa",hint:"Atmospheric pressure (HPa)",justifyItemClass:"justify-end",subTextValue:"hPa"},{icon:"sunrise",iconSize:e?"smIcon20":"lgIcon30",value:`${U((s=t==null?void 0:t.sys)==null?void 0:s.sunrise)}`,label:"Sunrise time",hint:"Sunrise time",justifyItemClass:"justify-start",subTextValue:"AM"},{icon:"sunset",iconSize:e?"smIcon20":"lgIcon30",value:`${U((l=t==null?void 0:t.sys)==null?void 0:l.sunset)}`,label:"Sunset time",hint:"Sunset time",justifyItemClass:"justify-end",subTextValue:"PM"},{icon:"eye-opened",iconSize:e?"smIcon20":"lgIcon30",value:`${ye(t==null?void 0:t.visibility)}`,label:"Road visibility",hint:"Road visibility",justifyItemClass:"justify-start",subTextValue:"km"},{icon:"weather-wind",iconSize:e?"smIcon20":"lgIcon30",value:`${(i=t==null?void 0:t.wind)==null?void 0:i.speed}`,label:"Wind speed in metre per seconds",hint:`Wind speed (m/s). (${be((m=t==null?void 0:t.wind)==null?void 0:m.speed)} on the Beaufort scale)`,justifyItemClass:"justify-end",subTextValue:"m/s"}]},Be=()=>[{label:"Temperature in °C",icon:"thermometer",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Ie},{label:"Precipitation and weather",icon:"sun",iconSize:"mdIcon24",iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:Te},{label:"Humidity (%)",icon:"humidity",iconSize:"mdIcon28",iconColorStyles:"fill-whiteBase",renderCell:Ae},{label:"Pressure (mm.Hg)",icon:"pressure",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:De},{label:"Wind speed (m/s)",icon:"weather-wind",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:He}],ke=({toggleTemperatureScale:e,currentWeather:t,isCelsius:r})=>{var i,m,d,h;const{isMobile:o}=F(),c=((i=t.main)==null?void 0:i.temp)??0,n=((m=t.main)==null?void 0:m.feels_like)??0,s=((h=(d=t.weather)==null?void 0:d[0])==null?void 0:h.main)??"",l=t.name??"";return a.createElement("div",{className:"mx-auto flex cursor-pointer items-center justify-evenly gap-5",onClick:e},a.createElement("div",{className:'relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'},a.createElement("p",{className:"font-weather text-monstrous text-contrastWhite  md:text-[64px]"},G(c,r))),a.createElement("div",{className:"space-y-2.5"},a.createElement("div",null,a.createElement("p",{className:"font-weather text-3xl text-contrastWhite md:text-4.5xl"},s),a.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-2xl"},"Feels like"," ",r?G(n,!0)+"C":G(n,!1)+"F")),a.createElement("div",{className:"flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]"},a.createElement(C,{svgName:"location",sizeKey:o?"smIcon20":"mdIcon27",className:"fill-whiteBase"}),a.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-medium"},l))))},Ce=()=>{const{hourlyWeather:e}=D(),{isMobile:t}=F(),r=Be();return a.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180"},a.createElement("table",{className:"h-full min-w-full border-separate border border-transparent bg-accentBase"},a.createElement("thead",{className:"h-10"},a.createElement($,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)"},a.createElement("tr",null,a.createElement("th",{className:"w-10 pr-2"},a.createElement(C,{svgName:"time",sizeKey:t?"smIcon20":"mdIcon24",className:"fill-whiteBase"})),e&&Array.isArray(e)&&(e==null?void 0:e.map(o=>{const c=U(o==null?void 0:o.dt);return a.createElement("th",{key:o==null?void 0:o.dt,scope:"col",className:"-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl"},c)}))))),a.createElement("tbody",null,r.map(({label:o,icon:c,iconColorStyles:n,iconSize:s,renderCell:l})=>a.createElement($,{key:c,label:o,side:"top",sideOffset:0,ariaLabel:`Info about ${o} by time interval`},a.createElement("tr",null,a.createElement("th",{scope:"row",className:"w-10 pr-2"},a.createElement(C,{svgName:c,sizeKey:t?"smIcon20":s,className:n})),e&&Array.isArray(e)&&e.map(i=>a.createElement(a.Fragment,{key:i==null?void 0:i.dt},l(i)))))))))},ve=()=>{const{currentWeather:e}=D(),{isMobile:t}=F(),{days:r,dateNow:o}=we(),c=Se(t,e);return a.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full flex-col justify-between gap-3 backface-hidden"},a.createElement("div",{className:"mb-3 text-center hg:mb-5"},a.createElement("span",{className:"font-weather text-3.5xl text-contrastWhite md:text-4.5xl hg:text-5xl"},r),a.createElement("p",{className:"text-2.5xl font-weather text-contrastWhite md:text-3.5xl"},o)),a.createElement("ul",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},Array.isArray(c)&&c.map(({icon:n,iconSize:s,value:l,label:i,hint:m,justifyItemClass:d,subTextValue:h})=>a.createElement("li",{key:i},a.createElement($,{label:m,side:"top",align:d==="justify-end"?"end":"start",sideOffset:4,ariaLabel:`Info about ${i} for current time`},a.createElement("div",{className:`flex items-center gap-3 text-base text-contrastWhite md:text-medium hg:text-2xl ${d}`},a.createElement("div",{className:`${d==="justify-end"?"order-last":"order-1"}`},a.createElement(C,{svgName:n,sizeKey:s,className:"fill-whiteBase"})),a.createElement("p",{className:"flex items-baseline gap-x-1 even:order-1"},l,a.createElement("span",{className:"text-xs hg:text-small"},h))))))))},M="py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium",Ie=e=>{var t;return a.createElement("td",{className:`${M}`},Math.ceil((t=e==null?void 0:e.main)==null?void 0:t.temp),"°C")},Te=e=>{var t,r,o,c;return a.createElement("td",{className:"h-35px"},a.createElement("img",{className:"cover",src:`https://openweathermap.org/img/wn/${(r=(t=e==null?void 0:e.weather)==null?void 0:t[0])==null?void 0:r.icon}@2x.png`,alt:(c=(o=e==null?void 0:e.weather)==null?void 0:o[0])==null?void 0:c.description}))},Ae=e=>{var t;return a.createElement("td",{className:`${M}`},(t=e==null?void 0:e.main)==null?void 0:t.humidity)},De=e=>{var t;return a.createElement("td",{className:`${M}`},Y((t=e==null?void 0:e.main)==null?void 0:t.pressure))},He=e=>{var t;return a.createElement("td",{className:`${M}`},(t=e==null?void 0:e.wind)==null?void 0:t.speed)},Pe=()=>{var p,f;const{hasGeolocationPermission:e,isCelsius:t,flippingCard:r,toggleTemperatureScale:o,flipWeatherDetails:c}=Q(),{isWeatherLoading:n,currentWeather:s,weatherError:l}=D(),i=s&&Object.keys(s).length===0,m=n&&e,d=l&&l,h=`${!n&&i&&!d?"flex flex-col items-center justify-between px-6 py-10 text-center md:px-10":d?"px-6 py-10 text-center md:px-10":"px-5 py-8 md:px-8 md:pt-10 hg:pt-8"} h-[515px] md:h-700px flex flex-col justify-between w-full bg-accentBase hg:w-442px`;return a.createElement("div",{className:`${h}`},!n&&i||d?a.createElement(pe,{showError:d}):m?a.createElement(q,{variant:"element"}):!n&&!i&&e&&a.createElement(a.Fragment,null,a.createElement(ke,{toggleTemperatureScale:o,currentWeather:s,isCelsius:t}),(s==null?void 0:s.weather)&&(s==null?void 0:s.weather[0].icon)&&a.createElement("img",{className:"m-auto h-32 w-32 md:h-165px md:w-165px hg:h-180px hg:w-180px",src:`https://openweathermap.org/img/wn/${s==null?void 0:s.weather[0].icon}@2x.png`,alt:(f=(p=s==null?void 0:s.weather)==null?void 0:p[0])==null?void 0:f.description}),a.createElement("div",{className:"h-56 w-full cursor-pointer perspective-10 md:h-[314px]",onClick:c},a.createElement("div",{className:`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${r}`},a.createElement(ve,null),a.createElement(Ce,null)))))},Le=({myButtonRef:e,handleOpenConfirm:t})=>a.createElement($,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Delete news from archive"},a.createElement("div",null,a.createElement(V,{ref:e,onHandleClick:t,variant:O.Small,hasIcon:!0,svgName:"close",svgSize:"mdIcon24",classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))),Re=({handleDeleteNews:e,handleClose:t,newsId:r})=>{const c=[{onClick:n=>t(n,!1),id:"Cancel deletion the news",label:"Cancel",icon:"reset"},{onClick:async n=>{await e(n,r)},id:"Delete selected news",label:"Delete",icon:"trash"}];return a.createElement("div",null,a.createElement("h3",{className:"mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl"},"Delete news"),a.createElement("p",{className:"mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl"},"Are you sure you want to delete this news?"),a.createElement("ul",{className:"max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8"},c.map(({onClick:n,id:s,label:l,icon:i})=>a.createElement("li",{key:l,className:"w-full"},a.createElement(V,{variant:O.Primary,onHandleClick:n,hasIcon:!0,id:s,svgName:i,svgSize:"smIcon18",classNameIcon:"fill-whiteBase",classNameButton:"md:text-xl border border-whiteBase"},l)))))},$e=({liveNews:e})=>{const{wideScreens:t}=F();return a.createElement("div",{className:"mt-4 px-4"},a.createElement("p",{className:"mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),a.createElement("h2",{className:"mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl"},e==null?void 0:e.title),a.createElement("p",{className:"mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl"},e==null?void 0:e.description),a.createElement("div",{className:"flex justify-between"},a.createElement("p",{className:"text-base text-greyAlt md:text-medium hg:text-xl"},e==null?void 0:e.publishDate),a.createElement("div",{className:"flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent"},a.createElement(C,{svgName:"triangle-double",sizeKey:t?"smIcon20":"xsIcon16",className:"fill-whiteBase"}),a.createElement("p",{className:"text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl"},"Click for read more..."))))},Fe=({onHandleClick:e,isFavourite:t,buttonData:r})=>{const{isArchiveActive:o}=k(),n=`absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 ${t?"fill-accentBase stroke-accentBase":"stroke-accentBase fill-none"} ${o?"":"group hocus:bg-accentBase hocus:text-whiteBase"} text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium`,s=()=>{switch(!0){case(!o&&t):return"Remove from favorite";case(!o&&!t):return"Add to favorite";case(o&&t):return"Favourited";case(o&&!t):return"Not in favourites";default:return}};return a.createElement("button",{id:r==null?void 0:r.id,type:"button",className:`${n}`,onClick:e},s(),a.createElement(C,{svgName:"heart",sizeKey:"xsIcon16",className:`fill-inherit ${o?"":"group-hover:stroke-whiteBase group-focus:stroke-whiteBase"} `}))},ze=({isArchiveActive:e,isAuthenticated:t,liveNews:r,savedNews:o,allArchive:c})=>{const n=e?c:o,s=n==null?void 0:n.find(m=>m.newsUrl===(r==null?void 0:r.newsUrl)),[l,i]=b.useState({isFavourite:(s==null?void 0:s.isFavourite)??!1,hasRead:(s==null?void 0:s.hasRead)??!1});return b.useEffect(()=>{t&&s&&i({isFavourite:s.isFavourite??!1,hasRead:s.hasRead??!1})},[s,t,r]),{...l,setIsFavourite:m=>i({...l,isFavourite:m}),setHasRead:m=>i({...l,hasRead:m})}},Me=({isArchiveActive:e,liveNews:t,setIsFavourite:r,setHasRead:o})=>{const[c,n]=b.useState(!1),[s,l]=b.useState(!1),{savedNews:i,updateSavedNews:m,addVotedNews:d,removeNews:h,removeFavouriteNews:p}=v(),{showToast:f}=_(),{setIsScrollDisabled:w}=oe();b.useEffect(()=>{c&&i&&(d(i),n(!1))},[c,d]);const y=i&&t&&(t==null?void 0:t.newsUrl)!==void 0&&!e,E=i==null?void 0:i.find(u=>u.newsUrl===t.newsUrl),g=E==null?void 0:E.isFavourite,x=E==null?void 0:E.hasRead,S=new Date().getTime(),I=()=>{r(!0);const u={...t,isFavourite:!0,additionDate:S};m(u)},H=()=>{if(r(!g),!g&&x){const u={...t,isFavourite:!0};m(u)}else if(g&&!x){const u={...t,isFavourite:!1,hasRead:x,additionDate:null};m(u),p((t==null?void 0:t.newsUrl)||"")}else if(g&&x){const u={...t,isFavourite:!1,hasRead:x};m(u),p((t==null?void 0:t.newsUrl)||"")}},P=u=>{u.stopPropagation(),u.preventDefault(),y&&(T(),i.length===0||!E?I():H())},L=b.useCallback(()=>{if(y){if(i.length===0||!E){o(!0),T();const u={...t,hasRead:!0,additionDate:S};m(u)}else if(!x&&g){o(!0),T();const u={...t,hasRead:!0};m(u)}else if(x===!0)return}},[e,T,i,m]);function T(){n(!0)}return{isDeleted:s,handleChangeFavourites:P,handleReadNews:L,handleDeleteNews:async(u,B)=>{u.stopPropagation(),u.preventDefault();const W=await h(B);f(W.meta.requestStatus),l(!0),w(!1)}}},je=({liveNews:e,isArchiveActive:t})=>{const{savedNews:r,allArchive:o}=v(),{isAuthenticated:c}=z(),{isFavourite:n,hasRead:s,setIsFavourite:l,setHasRead:i}=ze({isArchiveActive:t,isAuthenticated:c,liveNews:e,savedNews:r,allArchive:o}),{isDeleted:m,handleChangeFavourites:d,handleReadNews:h,handleDeleteNews:p}=Me({isArchiveActive:t,isAuthenticated:c,liveNews:e,setIsFavourite:l,setHasRead:i});return{isFavourite:n,hasRead:s,isDeleted:m,handleChangeFavourites:d,handleReadNews:h,handleDeleteNews:p}},Ge=({liveNews:e={}})=>{const t=a.createRef(),{isAuthenticated:r}=z(),{isOpenModal:o,toggleModal:c,popUpRef:n}=ne(),{isHomeActive:s,isArchiveActive:l}=k(),{isFavourite:i,hasRead:m,handleChangeFavourites:d,handleReadNews:h,handleDeleteNews:p}=je({liveNews:e,isArchiveActive:l}),f=async y=>{e._id&&await p(y,e._id)},w=s||l;return a.createElement(a.Fragment,null,(e==null?void 0:e.newsUrl)&&a.createElement("a",{rel:"noopener noreferrer nofollow",className:"group block transition-colors",href:e.newsUrl,target:"_blank",onClick:r?h:void 0},a.createElement("div",{className:`${r&&m&&w?"absolute z-20 h-full w-full bg-whiteBase/[.4]":"hidden"}`}),l?a.createElement(Le,{myButtonRef:t,handleOpenConfirm:y=>c(y,!0)}):null,a.createElement("p",{className:"absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite hg:text-medium"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),r&&m&&a.createElement("p",{className:"absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5"},"Already read",a.createElement(C,{svgName:"check",sizeKey:"smIcon18",className:"fill-readBase"})),a.createElement("div",{className:"relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]"},a.createElement("p",{className:"absolute bottom-3 left-3 z-10 text-whiteBase opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100"},e==null?void 0:e.edition),e&&(e!=null&&e.imgLink)?a.createElement("img",{loading:"lazy",className:"absolute h-full max-w-none rounded-xl object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):a.createElement(J,{variant:"card"}),r&&a.createElement(Fe,{onHandleClick:d,isFavourite:i,buttonData:{id:`Add ${e==null?void 0:e.title} to favourites or remove from them`}})),a.createElement($e,{liveNews:e})),o&&a.createElement(re,{closeModal:c,modalRef:n},a.createElement(Re,{handleDeleteNews:f,newsId:e._id,handleClose:y=>c(y)})))},Ne=({currentItems:e,currentPage:t})=>{const{isWeatherLoading:r}=D(),{isFavoriteActive:o}=k(),c=`${o?"mb-0":"mb-10 md:mb-12 lg:mb-[60px]"} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`,n=s=>`relative h-655px w-72 overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard md:h-700px md:w-353px lg:w-395px hg:w-442px ${s===0&&"md:col-start-1 md:row-start-1 lg:col-start-1"} ${s===1&&"lg:col-start-2 lg:row-start-1"}`;return a.createElement("ul",{className:`${c}`},t&&t===1&&a.createElement("li",{className:"overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard max-md:h-515px md:col-start-2 lg:col-start-3"},r?a.createElement(q,{variant:"element"}):a.createElement(Pe,null)),e==null?void 0:e.map((s,l)=>a.createElement("li",{key:s.newsUrl,className:n(l)},a.createElement(Ge,{liveNews:s}))))},j=()=>{const{hasResults:e}=K(),{isLoadingAPIData:t}=A(),{isLoadingDBData:r}=v(),{isHomeActive:o,isFavoriteActive:c,isReadActive:n,isArchiveActive:s}=k(),l=r||e==="loading",i=t||l;return{commonDBLoader:l,isHomeLoader:i,shouldShowLoader:o&&i||(c||n)&&l||s&&r}},Z=()=>{const e=k(),{rebuildedNews:t}=X(e),{hasResults:r}=K(),{errorAPI:o}=A(),{allArchive:c,archiveHistoryLog:n,isLoadingDBData:s}=v(),{isHomeLoader:l,commonDBLoader:i}=j(),{isHomeActive:m,isFavoriteActive:d,isReadActive:h,isArchiveActive:p}=e,f=o==null?void 0:o.toString().includes("429"),w=(t==null?void 0:t.length)===0||r==="empty",y=w||f,E=c.length===0&&n.length===0;return{isHomePlug:y,commonPlug:w,shouldShowPlug:m&&y&&!l||(d||h)&&w&&!i||p&&E&&!s}},Ue=()=>{const e=k(),{isHomeLoader:t,commonDBLoader:r}=j(),{isHomePlug:o,commonPlug:c}=Z(),{allArchive:n,isLoadingDBData:s}=v(),{isArchiveActive:l,isFavoriteActive:i,isHomeActive:m,isReadActive:d}=e,h=m&&!t&&!o,p=(i||d)&&!r&&!c,f=l&&!s&&(n==null?void 0:n.length)>0;return{shouldShowContent:h||p||f}},Ve=()=>{const e=k(),{filteredNews:t}=K(),{isArchiveActive:r,isFavoriteActive:o,isHomeActive:c,isReadActive:n}=e,{errorAPI:s,newsByKeyword:l,newsByCategory:i,newsByDate:m}=A(),{authError:d,statusMessage:h}=z(),{allFavourites:p,allReads:f,dbSuccessMessage:w}=v(),{isHomeLoader:y,commonDBLoader:E}=j(),g=l&&l.length>0||i&&i.length>0||m&&m.length>0,x=h==="Email sent successfully"||h==="Password has successfully changed"||h==="User sign-in success"||h==="Sign-out success",S=d&&typeof d=="string"||s&&typeof s=="number",I=!y&&g||(t==null?void 0:t.length)>0,H=o&&!E&&(p==null?void 0:p.length)>0,P=n&&!E&&(f==null?void 0:f.length)>0,L=r&&w==="Remove news success",N=c&&(S||x||I)||H||P||L;let u,B;switch(!0){case(c&&x):u="success",B="non-interactive";break;case(c&&S):u="error",B="interactive";break;case(c&&I):u="info",B="non-interactive";break;case H:u="info",B="non-interactive";break;case P:u="info",B="non-interactive";break;case L:u="success",B="interactive";break;default:u="info",B="non-interactive";break}return{shouldShowToast:N,statusToast:u,toastType:B}},_e=({children:e})=>{const{errorDB:t}=v(),{authError:r}=z(),{errorAPI:o}=A(),{setOpenToast:c}=_(),n=k(),{rebuildedNews:s}=X(n),{shouldShowLoader:l}=j(),{shouldShowPlug:i}=Z(),{shouldShowContent:m}=Ue(),{shouldShowToast:d,statusToast:h,toastType:p}=Ve(),f=ce(),{isFavoriteActive:w,isReadActive:y}=n;return b.useEffect(()=>{(t&&typeof t=="number"&&t>=500||o&&o>=500||r&&typeof r=="number"&&r>=500)&&f("/server-error")},[t,o]),b.useEffect(()=>{(w||y)&&(s==null?void 0:s.length)>0&&c(!0)},[]),a.createElement(a.Fragment,null,l&&a.createElement(q,{variant:"generalSection"}),d&&a.createElement(me,{variant:p,status:h}),i&&a.createElement(J,{variant:"page"}),m&&e)};export{Ne as N,_e as P};
