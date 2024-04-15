import{m as z,n as se,r as y,o as oe,p as ne,u as I,f as B,q as re,R as a,S as v,P as _,V as N,b as j,H as M,L as Y,d as T,s as J,t as ce,e as G,v as le,M as ie,w as me,a as X,g as Q}from"./index-e7c48632.js";import{p as de,u as ue}from"./images-47112fa2.js";import{T as he}from"./Toast-266ab3d2.js";const ge=e=>e.weather.isLoading,pe=e=>e.weather.data,fe=e=>e.weather.weatherByHour,xe=e=>e.weather.hasError,P=()=>{const e=z(ge),t=z(pe),s=z(fe),c=z(xe),r=se(),n=y.useCallback(l=>r(oe(l)),[r]),o=y.useCallback(l=>r(ne(l)),[r]);return{isWeatherLoading:e,currentWeather:t,hourlyWeather:s,weatherError:c,getCurrentWeather:n,getHourlyWeather:o}},Z=({variant:e})=>{const{errorAPI:t}=I(),{isHomeActive:s}=B(),c=t==null?void 0:t.toString().includes("429"),r=window.devicePixelRatio||1,n=re(de,r,window.innerWidth),o=ue((n==null?void 0:n.src)||""),l="text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter",i=()=>c&&s?"It seems you have been send too much requests then its needed":"We haven’t found news from this category";return a.createElement(a.Fragment,null,e==="page"?a.createElement("div",{className:"flex flex-col items-center justify-center space-y-10"},a.createElement("p",{className:`${l}`},i()),a.createElement("img",{src:o,alt:`${c&&s?"Too much requests":"No found news"}`,width:n.width,height:n.height})):a.createElement("img",{src:o,alt:"No found an image for news",width:n.width,height:n.height}))},W=()=>{const[e,t]=y.useState(!0),[s,c]=y.useState(!1),[r,n]=y.useState(null),[o,l]=y.useState(!1),{getCurrentWeather:i,getHourlyWeather:m}=P(),u="geolocation"in navigator,h=d=>{switch(l(!1),n("denied"),d.code){case d.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case d.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case d.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}};return y.useEffect(()=>{localStorage.getItem("geolocationPermission")&&(l(!0),n("granted"))},[r]),{isCelsius:e,hasGeolocationPermission:o,flippingCard:s?"rotate-y-180":"rotate-y-0",requestGeolocationPermission:()=>{u&&navigator.permissions.query({name:"geolocation"}).then(d=>{d.state==="granted"?(n("granted"),l(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(f=>{const b={lat:f.coords.latitude,lon:f.coords.longitude};i(b),m(b)})):d.state==="prompt"?(n("prompt"),navigator.geolocation.getCurrentPosition(f=>{l(!0),localStorage.setItem("geolocationPermission","granted");const b={lat:f.coords.latitude,lon:f.coords.longitude};i(b),m(b)},h)):(l(!1),n("denied"),localStorage.removeItem("geolocationPermission"))})},toggleTemperatureScale:()=>{t(!e)},flipWeatherDetails:()=>{c(!s)},showButtonText:()=>{let d="Give permission for your geolocation";if(r==="prompt")d="Give permission for your geolocation";else if(o)d="Get the weather for your region";else if(r==="denied")d="Permission denied";else return"Give permission for your geolocation";return d},statePermission:r}},ye=({showError:e})=>{const{requestGeolocationPermission:t,showButtonText:s}=W(),c=e?"Server error. Please try again later when you reload the page":"What a pity, this could be your weather";return a.createElement(a.Fragment,null,a.createElement("h2",{className:"text-medium text-whiteBase md:text-2xl lg:text-4xl"},c),a.createElement("div",{className:`my-auto ${e?"flex justify-center":""}`},a.createElement(v,{svgName:"moon",sizeKey:"ultraIcon156",className:"fill-transparent stroke-greyBase"})),!e&&a.createElement(_,{id:"Geolocation permission button",variant:N.Primary,onHandleClick:t,classNameButton:"border border-solid border-whiteBase"},s()))},be={"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"};function K(e){const t=new Date(e*1e3),s=t.getHours(),c=t.getMinutes(),r=String(s).padStart(2,"0"),n=String(c).padStart(2,"0");return`${r}:${n}`}function Ee(e){const t=String(e);return be[t]}function ee(e){const t=e*.75006;return Math.floor(t)}function we(e){return e/1e3}function Se(e){let t;const s=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}];return e&&(t=s.find(c=>e>=c.min&&e<=c.max)),t?t==null?void 0:t.scale:""}function Be(){const e=new Date,t=e.getHours(),s=e.getMinutes(),c=o=>o<10?`0${o}`:o.toString(),r=c(t),n=c(s);return`${r}:${n}`}function ke(){const e={Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"},t=new Date,s=e[t.toDateString().slice(0,3)],c=Be(),r=t.toDateString().slice(4).slice(0,4),n=t.toDateString().slice(8).slice(0,2),o=t.toDateString().slice(11),l=`${c} | ${n} ${r} ${o}`;return{days:s,dateNow:l}}const H=(e,t)=>t&&e?Math.round(e)+"°":Math.round(e*9/5+32)+"°",Ce=(e,t)=>{var c,r,n,o,l,i,m;return[{icon:"earth",iconSize:e?"xsIcon16":"mdIcon24",value:`${Ee(t==null?void 0:t.timezone)}`,label:"Greenwich mean time",hint:"GMT time",justifyItemClass:"justify-start",subTextValue:"UTC"},{icon:"humidity",iconSize:e?"smIcon18":"lgIcon30",value:`${(c=t==null?void 0:t.main)==null?void 0:c.humidity}`,label:"Humidity in percent",hint:"Humidity (%)",justifyItemClass:"justify-end",subTextValue:"%"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${ee((r=t==null?void 0:t.main)==null?void 0:r.pressure)}`,label:"Atmospheric pressure in mm Hg",hint:"Atmospheric pressure (mm.Hg)",justifyItemClass:"justify-start",subTextValue:"mm.Hg"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${(n=t==null?void 0:t.main)==null?void 0:n.pressure}`,label:"Atmospheric pressure in hPa",hint:"Atmospheric pressure (HPa)",justifyItemClass:"justify-end",subTextValue:"hPa"},{icon:"sunrise",iconSize:e?"smIcon20":"lgIcon30",value:`${K((o=t==null?void 0:t.sys)==null?void 0:o.sunrise)}`,label:"Sunrise time",hint:"Sunrise time",justifyItemClass:"justify-start",subTextValue:"AM"},{icon:"sunset",iconSize:e?"smIcon20":"lgIcon30",value:`${K((l=t==null?void 0:t.sys)==null?void 0:l.sunset)}`,label:"Sunset time",hint:"Sunset time",justifyItemClass:"justify-end",subTextValue:"PM"},{icon:"eye-opened",iconSize:e?"smIcon20":"lgIcon30",value:`${we(t==null?void 0:t.visibility)}`,label:"Road visibility",hint:"Road visibility",justifyItemClass:"justify-start",subTextValue:"km"},{icon:"weather-wind",iconSize:e?"smIcon20":"lgIcon30",value:`${(i=t==null?void 0:t.wind)==null?void 0:i.speed}`,label:"Wind speed in metre per seconds",hint:`Wind speed (m/s). (${Se((m=t==null?void 0:t.wind)==null?void 0:m.speed)} on the Beaufort scale)`,justifyItemClass:"justify-end",subTextValue:"m/s"}]},ve=e=>[{label:`Temperature in °${e?"C":"F"}`,icon:"thermometer",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:De},{label:"Precipitation and weather",icon:"sun",iconSize:"mdIcon24",iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:He},{label:"Humidity (%)",icon:"humidity",iconSize:"mdIcon28",iconColorStyles:"fill-whiteBase",renderCell:Pe},{label:"Pressure (mm.Hg)",icon:"pressure",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Le},{label:"Wind speed (m/s)",icon:"weather-wind",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Re}],Te=({toggleTemperatureScale:e,currentWeather:t,isCelsius:s})=>{var i,m,u,h;const{isMobile:c}=j(),r=((i=t.main)==null?void 0:i.temp)??0,n=((m=t.main)==null?void 0:m.feels_like)??0,o=((h=(u=t.weather)==null?void 0:u[0])==null?void 0:h.main)??"",l=t.name??"";return a.createElement("div",{className:"mx-auto flex cursor-pointer items-center justify-evenly gap-5",onClick:e},a.createElement("div",{className:'relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'},a.createElement("p",{className:"font-weather text-monstrous text-contrastWhite  md:text-[64px]"},H(r,s))),a.createElement("div",{className:"space-y-2.5"},a.createElement("div",null,a.createElement("p",{className:"font-weather text-3xl text-contrastWhite md:text-4.5xl"},o),a.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-2xl"},"Feels like"," ",s?H(n,!0)+"C":H(n,!1)+"F")),a.createElement("div",{className:"flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]"},a.createElement(v,{svgName:"location",sizeKey:c?"smIcon20":"mdIcon27",className:"fill-whiteBase"}),a.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-medium"},l))))},Ie=({isCelsius:e})=>{const{hourlyWeather:t}=P(),{isMobile:s}=j(),c=ve(e);return a.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180"},a.createElement("table",{className:"h-full min-w-full border-separate border border-transparent bg-accentBase"},a.createElement("thead",{className:"h-10"},a.createElement(M,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)"},a.createElement("tr",null,a.createElement("th",{className:"w-10 pr-2"},a.createElement(v,{svgName:"time",sizeKey:s?"smIcon20":"mdIcon24",className:"fill-whiteBase"})),t&&Array.isArray(t)&&(t==null?void 0:t.map(r=>{const n=K(r==null?void 0:r.dt);return a.createElement("th",{key:r==null?void 0:r.dt,scope:"col",className:"-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl"},n)}))))),a.createElement("tbody",null,c.map(({label:r,icon:n,iconColorStyles:o,iconSize:l,renderCell:i})=>a.createElement(M,{key:n,label:r,side:"top",sideOffset:0,ariaLabel:`Info about ${r} by time interval`},a.createElement("tr",null,a.createElement("th",{scope:"row",className:"w-10 pr-2"},a.createElement(v,{svgName:n,sizeKey:s?"smIcon20":l,className:o})),t&&Array.isArray(t)&&t.map(m=>a.createElement(a.Fragment,{key:m==null?void 0:m.dt},i(m,e)))))))))},Ae=()=>{const{currentWeather:e}=P(),{isMobile:t}=j(),{days:s,dateNow:c}=ke(),r=Ce(t,e);return a.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full flex-col justify-between gap-3 backface-hidden"},a.createElement("div",{className:"mb-3 text-center hg:mb-5"},a.createElement("span",{className:"font-weather text-3.5xl text-contrastWhite md:text-4.5xl hg:text-5xl"},s),a.createElement("p",{className:"text-2.5xl font-weather text-contrastWhite md:text-3.5xl"},c)),a.createElement("ul",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},Array.isArray(r)&&r.map(({icon:n,iconSize:o,value:l,label:i,hint:m,justifyItemClass:u,subTextValue:h})=>a.createElement("li",{key:i},a.createElement(M,{label:m,side:"top",align:u==="justify-end"?"end":"start",sideOffset:4,ariaLabel:`Info about ${i} for current time`},a.createElement("div",{className:`flex items-center gap-3 text-base text-contrastWhite md:text-medium hg:text-2xl ${u}`},a.createElement("div",{className:`${u==="justify-end"?"order-last":"order-1"}`},a.createElement(v,{svgName:n,sizeKey:o,className:"fill-whiteBase"})),a.createElement("p",{className:"flex items-baseline gap-x-1 even:order-1"},l,a.createElement("span",{className:"text-xs hg:text-small"},h))))))))},U="py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium",De=(e,t)=>{var s,c;return a.createElement("td",{className:`${U}`},t?H((s=e==null?void 0:e.main)==null?void 0:s.temp,!0)+"C":H((c=e==null?void 0:e.main)==null?void 0:c.temp,!1)+"F")},He=e=>{var t,s,c,r;return a.createElement("td",{className:"h-35px"},a.createElement("img",{className:"cover",src:`https://openweathermap.org/img/wn/${(s=(t=e==null?void 0:e.weather)==null?void 0:t[0])==null?void 0:s.icon}@2x.png`,alt:(r=(c=e==null?void 0:e.weather)==null?void 0:c[0])==null?void 0:r.description}))},Pe=e=>{var t;return a.createElement("td",{className:`${U}`},(t=e==null?void 0:e.main)==null?void 0:t.humidity)},Le=e=>{var t;return a.createElement("td",{className:`${U}`},ee((t=e==null?void 0:e.main)==null?void 0:t.pressure))},Re=e=>{var t;return a.createElement("td",{className:`${U}`},(t=e==null?void 0:e.wind)==null?void 0:t.speed)},$e=()=>{var w,S;const{hasGeolocationPermission:e,isCelsius:t,flippingCard:s,toggleTemperatureScale:c,flipWeatherDetails:r}=W(),{isWeatherLoading:n,currentWeather:o,weatherError:l}=P(),i=o&&Object.keys(o).length===0,m=l&&l,u=!n&&i||m,h=n&&e,x=!n&&!i&&e,p=`${(()=>{switch(!0){case(!n&&i&&!m):return"flex flex-col items-center justify-between px-6 py-10 text-center md:px-10";case!!m:return"px-6 py-10 text-center md:px-10";default:return"px-5 py-8 md:px-8 md:pt-10 hg:pt-8"}})()} h-[515px] md:h-700px flex flex-col justify-between w-full bg-accentBase hg:w-442px`;return a.createElement("div",{className:`${p}`},u&&a.createElement(ye,{showError:m}),h&&a.createElement(Y,{variant:"element"}),x&&a.createElement(a.Fragment,null,a.createElement(Te,{toggleTemperatureScale:c,currentWeather:o,isCelsius:t}),(o==null?void 0:o.weather)&&(o==null?void 0:o.weather[0].icon)&&a.createElement("img",{className:"m-auto h-32 w-32 md:h-165px md:w-165px hg:h-180px hg:w-180px",src:`https://openweathermap.org/img/wn/${o==null?void 0:o.weather[0].icon}@2x.png`,alt:(S=(w=o==null?void 0:o.weather)==null?void 0:w[0])==null?void 0:S.description}),a.createElement("div",{className:"h-56 w-full cursor-pointer perspective-10 md:h-[314px]",onClick:r},a.createElement("div",{className:`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${s}`},a.createElement(Ae,null),a.createElement(Ie,{isCelsius:t})))))},Fe=({myButtonRef:e,handleOpenConfirm:t})=>a.createElement(M,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Button for deleting news from archive"},a.createElement("div",null,a.createElement(_,{ref:e,onHandleClick:t,variant:N.Small,hasIcon:!0,svgName:"close",svgSize:"mdIcon24",classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))),ze=(e,t)=>[{onClick:c=>e(c,!1),id:"Cancel deletion the news",label:"Cancel",icon:"reset"},{onClick:t,id:"Delete selected news",label:"Delete",icon:"trash"}],Me=(e,t)=>{switch(!0){case(!e&&t):return"Remove from favorite";case(!e&&!t):return"Add to favorite";case(e&&t):return"Favourited";case(e&&!t):return"Not in favourites";default:return}},je=(e,t,s)=>{switch(!0){case(!s&&e&&t):return"group-hover:fill-whiteBase group-hover:stroke-whiteBase group-focus:stroke-whiteBase";case(!s&&e&&!t):return"fill-accentBase stroke-accentBase";case(!s&&!e&&t):return"group-hover:fill-accentBase group-hover:stroke-whiteBase group-focus:stroke-whiteBase";case(s&&!e):return"fill-none stroke-accentBase";case(s&&e):return"fill-accentBase stroke-accentBase";default:return"fill-none stroke-accentBase"}},Ge=({handleDeleteNews:e,handleClose:t,newsId:s})=>{const r=ze(t,async n=>{await e(n,s)});return a.createElement("div",null,a.createElement("h3",{className:"mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl"},"Delete news"),a.createElement("p",{className:"mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl"},"Are you sure you want to delete this news?"),a.createElement("ul",{className:"max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8"},r.map(({onClick:n,id:o,label:l,icon:i})=>a.createElement("li",{key:l,className:"w-full"},a.createElement(_,{variant:N.Primary,onHandleClick:n,hasIcon:!0,id:o,svgName:i,svgSize:"smIcon18",classNameIcon:"fill-whiteBase",classNameButton:"md:text-xl border border-whiteBase"},l)))))},Ue=({liveNews:e})=>{const{wideScreens:t}=j();return a.createElement("div",{className:"mt-4 px-4"},a.createElement("p",{className:"mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),a.createElement("h2",{className:"mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl"},e==null?void 0:e.title),a.createElement("p",{className:"mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl"},e==null?void 0:e.description),a.createElement("div",{className:"flex justify-between"},a.createElement("p",{className:"text-base text-greyAlt md:text-medium hg:text-xl"},e==null?void 0:e.publishDate),a.createElement("div",{className:"flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent"},a.createElement(v,{svgName:"triangle-double",sizeKey:t?"smIcon20":"xsIcon16",className:"fill-whiteBase"}),a.createElement("p",{className:"text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl"},"Click for read more..."))))},Ve=({liveNews:e,isFavourite:t,setIsFavourite:s,setHasRead:c})=>{const[r,n]=y.useState(!1),[o,l]=y.useState(!1),{savedNews:i,updateSavedNews:m,addVotedNews:u,removeNews:h,removeFavouriteNews:x}=T(),{showToast:E}=J(),{setIsScrollDisabled:p}=ce(),{isArchiveActive:w}=B(),S=!!(i!=null&&i.length)&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!w;y.useEffect(()=>{(async()=>{r&&i.length>0&&(console.log("changesHappened",r),await u(i),n(!1),console.log("savedNews",i))})()},[r,u]);const d=i==null?void 0:i.find(g=>g.newsUrl===e.newsUrl),f=d==null?void 0:d.isFavourite,b=d==null?void 0:d.hasRead,A=d==null?void 0:d.additionDate,D=new Date().getTime(),L=()=>{s(!t),n(!0);const g={...e,isFavourite:!f,additionDate:D};m(g)},R=()=>{if(s(!t),n(!0),console.log("changesHappened",r),!f&&b){const g={...e,isFavourite:!f,hasRead:b,additionDate:A};m(g)}else if(f&&!b){console.log("savedFavourite && !savedRead");const g={...e,isFavourite:!f,additionDate:null};m(g),x((e==null?void 0:e.newsUrl)||"")}else if(f&&b){const g={...e,isFavourite:!f,hasRead:b,additionDate:A};m(g),x((e==null?void 0:e.newsUrl)||"")}},$=g=>{g.stopPropagation(),g.preventDefault(),S&&(i.length===0||!d?L():R())},F=y.useCallback(()=>{if(S){if(i.length===0||!d){c(!0),n(!0);const g={...e,hasRead:!0,additionDate:D};m(g)}else if(!b&&f){c(!0),n(!0);const g={...e,isFavourite:f,hasRead:!0,additionDate:A};m(g)}else if(b===!0)return}},[w,i,m]);return{isDeleted:o,handleChangeFavourites:$,handleReadNews:F,handleDeleteNews:async(g,q)=>{g.stopPropagation(),g.preventDefault();const k=await h(q);E(k.meta.requestStatus),l(!0),p(!1)}}},te=({liveNews:e})=>{const{savedNews:t,allArchive:s}=T(),{isAuthenticated:c}=G(),{isArchiveActive:r}=B(),n=r?s:t,o=n==null?void 0:n.find(w=>w.newsUrl===(e==null?void 0:e.newsUrl)),[l,i]=y.useState((o==null?void 0:o.isFavourite)??!1),[m,u]=y.useState((o==null?void 0:o.hasRead)??!1);y.useEffect(()=>{c&&o&&(i(o.isFavourite??!1),u(o.hasRead??!1))},[o,c,e]);const{isDeleted:h,handleChangeFavourites:x,handleReadNews:E,handleDeleteNews:p}=Ve({liveNews:e,isFavourite:l,setIsFavourite:i,setHasRead:u});return{isFavourite:l,hasRead:m,isDeleted:h,handleChangeFavourites:x,handleReadNews:E,handleDeleteNews:p}},Oe=({liveNews:e,isFavourite:t,buttonData:s})=>{const[c,r]=y.useState(!1),{handleChangeFavourites:n}=te({liveNews:e}),{isArchiveActive:o}=B(),l=`absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium ${o?"":"group hocus:bg-accentBase hocus:text-whiteBase"}`;return a.createElement("button",{id:s==null?void 0:s.id,type:"button",className:`${l}`,onClick:n,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1)},Me(o,t),a.createElement(v,{svgName:"heart",sizeKey:"xsIcon16",className:je(t,c,o)}))},qe=({liveNews:e={}})=>{const t=a.createRef(),{isAuthenticated:s}=G(),{isOpenModal:c,toggleModal:r,popUpRef:n}=le(),{isHomeActive:o,isArchiveActive:l}=B(),{isFavourite:i,hasRead:m,handleReadNews:u,handleDeleteNews:h}=te({liveNews:e}),x=async p=>{e._id&&await h(p,e._id)},E=s&&m&&(o||l);return a.createElement(a.Fragment,null,(e==null?void 0:e.newsUrl)&&a.createElement("a",{rel:"noopener noreferrer nofollow",className:"group block transition-colors",href:e.newsUrl,target:"_blank",onClick:s?u:void 0},a.createElement("div",{className:`${E?"absolute z-20 h-full w-full bg-whiteBase/[.4]":"hidden"}`}),l?a.createElement(Fe,{myButtonRef:t,handleOpenConfirm:p=>r(p,!0)}):null,a.createElement("p",{className:"absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite hg:text-medium"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),E?a.createElement("p",{className:"absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5"},"Already read",a.createElement(v,{svgName:"check",sizeKey:"smIcon18",className:"fill-readBase"})):null,a.createElement("div",{className:"relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]"},a.createElement("p",{className:"absolute bottom-3 left-3 z-10 text-whiteBase opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100"},e==null?void 0:e.edition),e&&(e!=null&&e.imgLink)?a.createElement("img",{loading:"lazy",className:"absolute h-full max-w-none rounded-xl object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):a.createElement(Z,{variant:"card"}),s&&a.createElement(Oe,{liveNews:e,isFavourite:i,buttonData:{id:`Add ${e==null?void 0:e.title} to favourites or remove from them`}})),a.createElement(Ue,{liveNews:e})),c&&a.createElement(ie,{closeModal:r,modalRef:n},a.createElement(Ge,{handleDeleteNews:x,newsId:e._id,handleClose:p=>r(p)})))},Ze=({currentItems:e,currentPage:t})=>{const{isWeatherLoading:s}=P(),{isFavoriteActive:c}=B(),r=`${c?"mb-0":"mb-10 md:mb-12 lg:mb-[60px]"} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`,n=o=>`relative h-655px w-72 overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard md:h-700px md:w-353px lg:w-395px hg:w-442px ${o===0&&"md:col-start-1 md:row-start-1 lg:col-start-1"} ${o===1&&"lg:col-start-2 lg:row-start-1"}`;return a.createElement("ul",{className:`${r}`},t&&t===1&&a.createElement("li",{className:"overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard max-md:h-515px md:col-start-2 lg:col-start-3"},s?a.createElement(Y,{variant:"element"}):a.createElement($e,null)),e==null?void 0:e.map((o,l)=>a.createElement("li",{key:o.newsUrl,className:n(l)},a.createElement(qe,{liveNews:o}))))},Ke=()=>{const{errorDB:e}=T(),{authError:t}=G(),{errorAPI:s}=I(),c=me();y.useEffect(()=>{(e&&r(e)||s&&r(s)||t&&r(t))&&c("/server-error")},[e,s,t]);function r(n){return n&&typeof n=="number"&&n>=500}},_e=()=>{const{headline:e}=I(),{isHomeActive:t,isFavoriteActive:s,isReadActive:c,isArchiveActive:r}=B();return{getHeadline:()=>{switch(!0){case(e&&t):return e;case s:return"Favourite news";case c:return"Read news";case r:return"Archive news";default:return""}}}},V=()=>{const{hasResults:e}=X(),{isLoadingAPIData:t}=I(),{isLoadingDBData:s}=T(),{isHomeActive:c,isFavoriteActive:r,isReadActive:n,isArchiveActive:o}=B(),l=s||e==="loading",i=t||l;return{commonDBLoader:l,isHomeLoader:i,shouldShowLoader:c&&i||(r||n)&&l||o&&s}},ae=()=>{const{hasResults:e}=X(),{errorAPI:t}=I(),{allArchive:s,archiveHistoryLog:c,isLoadingDBData:r}=T(),n=B(),{rebuiltNews:o}=Q(n),{isHomeLoader:l,commonDBLoader:i}=V(),{isHomeActive:m,isFavoriteActive:u,isReadActive:h,isArchiveActive:x}=n,E=t==null?void 0:t.toString().includes("429"),p=(o==null?void 0:o.length)===0||e==="empty",w=p||E,S=s.length===0&&c.length===0;return{isHomePlug:w,commonPlug:p,shouldShowPlug:m&&w&&!l||(u||h)&&p&&!i||x&&S&&!r}},Ne=()=>{const{allArchive:e,isLoadingDBData:t}=T(),s=B(),{isHomeLoader:c,commonDBLoader:r}=V(),{isHomePlug:n,commonPlug:o}=ae(),{isArchiveActive:l,isFavoriteActive:i,isHomeActive:m,isReadActive:u}=s,h=m&&!c&&!n,x=(i||u)&&!r&&!o,E=l&&!t&&(e==null?void 0:e.length)>0;return{shouldShowContent:h||x||E}},Ye=()=>{const{filteredNews:e}=X(),{errorAPI:t,newsByKeyword:s,newsByCategory:c,newsByDate:r}=I(),{authError:n,statusMessage:o}=G(),{allFavourites:l,allReads:i,dbSuccessMessage:m}=T(),{setOpenToast:u}=J(),h=B(),{rebuiltNews:x}=Q(h),{isHomeLoader:E,commonDBLoader:p}=V(),{isArchiveActive:w,isFavoriteActive:S,isHomeActive:d,isReadActive:f}=h;y.useEffect(()=>{(S||f)&&(x==null?void 0:x.length)>0&&u(!0)},[]);const b=s&&s.length>0||c&&c.length>0||r&&r.length>0,D=["Email sent successfully","Password has successfully changed","User sign-in success","Your saved password has been successfully retrieved","Sign-out success"].includes(o),L=n&&typeof n=="string"||t&&typeof t=="number",R=!E&&b||(e==null?void 0:e.length)>0,$=S&&!p&&(l==null?void 0:l.length)>0,F=f&&!p&&(i==null?void 0:i.length)>0,O=w&&(m==="Remove news success"||m==="Your deleted news feed has been successfully cleared"),q=d&&(L||D||R)||$||F||O;let k,C;switch(!0){case(d&&D):k="success",C="non-interactive";break;case(d&&L):k="error",C="interactive";break;case(d&&R):k="info",C="non-interactive";break;case $:k="info",C="non-interactive";break;case F:k="info",C="non-interactive";break;case O:k="success",C="interactive";break;default:k="info",C="non-interactive";break}return{shouldShowToast:q,statusToast:k,toastType:C}},We=({children:e})=>{const{shouldShowLoader:t}=V(),{shouldShowPlug:s}=ae(),{shouldShowContent:c}=Ne(),{shouldShowToast:r,statusToast:n,toastType:o}=Ye(),{getHeadline:l}=_e();return Ke(),a.createElement(a.Fragment,null,t&&a.createElement(Y,{variant:"generalSection"}),r&&a.createElement(he,{variant:o,status:n}),s&&a.createElement(Z,{variant:"page"}),c&&a.createElement("h1",{className:"mb-6 text-giant font-bold dark:text-whiteBase"},l()),c&&e)};export{Ze as N,We as P};
