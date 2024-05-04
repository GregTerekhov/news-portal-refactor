import{o as F,p as le,r as E,q as re,s as me,u as D,f as v,t as de,R as t,l as Z,v as ue,P as V,V as q,S as I,b as M,H as $,w as W,L as K,d as B,k as ee,x as ge,y as pe,z as he,e as z,B as fe,D as xe,m as ye,M as be,E as Ee,a as X,g as te}from"./index-187fad00.js";import{p as we,u as Se}from"./images-7c958bd7.js";import{T as ve}from"./Toast-02f521cf.js";const Ae=e=>e.weather.isLoading,Ce=e=>e.weather.data,Te=e=>e.weather.weatherByHour,Ie=e=>e.weather.hasError,R=()=>{const e=F(Ae),s=F(Ce),a=F(Te),c=F(Ie),n=le(),o=E.useCallback(i=>n(re(i)),[n]),l=E.useCallback(i=>n(me(i)),[n]);return{isWeatherLoading:e,currentWeather:s,hourlyWeather:a,weatherError:c,getCurrentWeather:o,getHourlyWeather:l}},ke="text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter",Be=(e,s)=>s&&e?"It seems you have been send too much requests then its needed":"We haven’t found news from this category",se=({variant:e})=>{const{errorAPI:s}=D(),{isHomeActive:a}=v(),c=s==null?void 0:s.toString().includes("429"),n=window.devicePixelRatio||1,o=de(we,n,window.innerWidth),l=Se((o==null?void 0:o.src)||"");return t.createElement(t.Fragment,null,e==="page"?t.createElement("div",{className:"flex flex-col items-center justify-center space-y-10"},t.createElement("p",{className:ke},Be(a,c)),t.createElement("img",{src:l,alt:`${c&&a?"Too much requests":"No found news"}`,width:o.width,height:o.height})):t.createElement("img",{src:l,alt:"No found an image for news",width:o.width,height:o.height}))},He=({handleClose:e,handleDelete:s,position:a,title:c,agreementText:n})=>{const{isOpenModal:o}=Z(),l=[{onClick:i=>e(i,!0),id:a==="deleteNews"?"Cancel deletion the news":"Cancel clearing log",label:"Cancel",icon:"reset"},{onClick:s,id:a==="deleteNews"?"Delete selected news":"Clear deleted news log",label:"Delete",icon:"trash"}];return t.createElement(ue,{enabled:o},t.createElement("div",null,t.createElement("h3",{className:"mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl"},c),t.createElement("p",{className:"mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl"},`Are you sure you want to ${n} news?`),t.createElement("ul",{className:"max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8"},Array.isArray(l)&&l.map(({onClick:i,id:r,label:m,icon:d})=>t.createElement("li",{key:m,className:"w-full"},t.createElement(V,{variant:q.Primary,onHandleClick:i,hasIcon:!0,id:r,svgName:d,svgSize:"smIcon18",classNameIcon:"fill-whiteBase",classNameButton:"md:text-xl border border-whiteBase"},m))))))},ae=()=>{const[e,s]=E.useState(!0),[a,c]=E.useState(!1),[n,o]=E.useState(null),[l,i]=E.useState(!1),{getCurrentWeather:r,getHourlyWeather:m}=R(),d="geolocation"in navigator;E.useEffect(()=>{localStorage.getItem("geolocationPermission")&&(i(!0),o("granted"))},[n]);const f=h=>{switch(i(!1),o("denied"),h.code){case h.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case h.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case h.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}};return{isCelsius:e,flippingCard:a?"rotate-y-180":"rotate-y-0",statePermission:n,hasGeolocationPermission:l,requestGeolocationPermission:()=>{d&&navigator.permissions.query({name:"geolocation"}).then(h=>{h.state==="granted"?(o("granted"),i(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(p=>{const w={lat:p.coords.latitude,lon:p.coords.longitude};r(w),m(w)})):h.state==="prompt"?(o("prompt"),navigator.geolocation.getCurrentPosition(p=>{i(!0),localStorage.setItem("geolocationPermission","granted");const w={lat:p.coords.latitude,lon:p.coords.longitude};r(w),m(w)},f)):(i(!1),o("denied"),localStorage.removeItem("geolocationPermission"))})},toggleTemperatureScale:()=>{s(!e)},flipWeatherDetails:()=>{c(!a)},showButtonText:()=>{switch(!0){case n==="prompt":return"Give permission for your geolocation";case l:return"Get the weather for your region";case n==="denied":return"Permission denied";default:return"Give permission for your geolocation"}}}},Pe=({showError:e})=>{const{requestGeolocationPermission:s,showButtonText:a}=ae(),c=e?"Server error. Please try again later when you reload the page":"What a pity, this could be your weather";return t.createElement(t.Fragment,null,t.createElement("h2",{className:"text-medium text-whiteBase md:text-2xl lg:text-4xl"},c),t.createElement("div",{className:`my-auto ${e?"flex justify-center":""}`},t.createElement(I,{svgName:"moon",sizeKey:"ultraIcon156",className:"fill-transparent stroke-greyBase"})),!e&&t.createElement(V,{id:"Geolocation permission button",variant:q.Primary,onHandleClick:s,classNameButton:"border border-solid border-whiteBase"},a()))},De={"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"},Re=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}],Le={Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"};function Fe(e){const s=String(e);return De[s]}function $e(e){return e/1e3}function Me(e){let s;return e&&(s=Re.find(a=>e>=a.min&&e<=a.max)),s?s==null?void 0:s.scale:""}const Q=e=>e<10?`0${e}`:e.toString();function ze(){const e=new Date,s=e.getHours(),a=e.getMinutes(),c=Q(s),n=Q(a);return`${c}:${n}`}function _(e){const s=new Date(e*1e3),a=s.getHours(),c=s.getMinutes(),n=String(a).padStart(2,"0"),o=String(c).padStart(2,"0");return`${n}:${o}`}function oe(e){const s=e*.75006;return Math.floor(s)}const P=(e,s)=>s&&e?Math.round(e)+"°":Math.round(e*9/5+32)+"°";function je(){const e=new Date,s=Le[e.toDateString().slice(0,3)],a=ze(),c=e.toDateString().slice(4).slice(0,4),n=e.toDateString().slice(8).slice(0,2),o=e.toDateString().slice(11),l=`${a} | ${n} ${c} ${o}`;return{days:s,dateNow:l}}function Y(e,s){var a,c,n,o,l,i,r,m,d,f,g,x,u,b,y,h,p;return{currentTemperature:s?P((a=e==null?void 0:e.main)==null?void 0:a.temp,!0):P((c=e==null?void 0:e.main)==null?void 0:c.temp,!1),feelsLike:s?P((n=e==null?void 0:e.main)==null?void 0:n.feels_like,!0)+"C":P((o=e==null?void 0:e.main)==null?void 0:o.feels_like,!1)+"F",prevailingWeather:((i=(l=e==null?void 0:e.weather)==null?void 0:l[0])==null?void 0:i.main)??"",location:(e==null?void 0:e.name)??"",timezone:Fe(e==null?void 0:e.timezone),iconWeather:(m=(r=e==null?void 0:e.weather)==null?void 0:r[0])==null?void 0:m.icon,iconAlt:(f=(d=e==null?void 0:e.weather)==null?void 0:d[0])==null?void 0:f.description,humidityPercent:(g=e==null?void 0:e.main)==null?void 0:g.humidity,pressureMmHg:oe((x=e==null?void 0:e.main)==null?void 0:x.pressure),pressureHpa:(u=e==null?void 0:e.main)==null?void 0:u.pressure,sunriseTime:_((b=e==null?void 0:e.sys)==null?void 0:b.sunrise),sunsetTime:_((y=e==null?void 0:e.sys)==null?void 0:y.sunset),visibility:$e(e==null?void 0:e.visibility),windSpeed:(h=e==null?void 0:e.wind)==null?void 0:h.speed,beaufortScale:Me((p=e==null?void 0:e.wind)==null?void 0:p.speed)}}function T(e,s){var a,c,n,o,l,i,r,m,d;return{timeScale:e==null?void 0:e.dt,convertedTimeScale:_(e==null?void 0:e.dt),mainTemperature:s?P((a=e==null?void 0:e.main)==null?void 0:a.temp,!0)+"C":P((c=e==null?void 0:e.main)==null?void 0:c.temp,!1)+"F",iconWeather:(o=(n=e==null?void 0:e.weather)==null?void 0:n[0])==null?void 0:o.icon,iconAlt:(i=(l=e==null?void 0:e.weather)==null?void 0:l[0])==null?void 0:i.description,humidityPercent:(r=e==null?void 0:e.main)==null?void 0:r.humidity,pressureMmHg:oe((m=e==null?void 0:e.main)==null?void 0:m.pressure),windSpeed:(d=e==null?void 0:e.wind)==null?void 0:d.speed}}const Ne=(e,s)=>{const{timezone:a,humidityPercent:c,pressureHpa:n,pressureMmHg:o,sunriseTime:l,sunsetTime:i,visibility:r,windSpeed:m,beaufortScale:d}=Y(s);return[{icon:"earth",iconSize:e?"xsIcon16":"mdIcon24",value:`${a}`,label:"Greenwich mean time",hint:"GMT time",justifyItemClass:"justify-start",subTextValue:"UTC"},{icon:"humidity",iconSize:e?"smIcon18":"lgIcon30",value:`${c}`,label:"Humidity in percent",hint:"Humidity (%)",justifyItemClass:"justify-end",subTextValue:"%"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${o}`,label:"Atmospheric pressure in mm Hg",hint:"Atmospheric pressure (mm.Hg)",justifyItemClass:"justify-start",subTextValue:"mm.Hg"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${n}`,label:"Atmospheric pressure in hPa",hint:"Atmospheric pressure (HPa)",justifyItemClass:"justify-end",subTextValue:"hPa"},{icon:"sunrise",iconSize:e?"smIcon20":"lgIcon30",value:`${l}`,label:"Sunrise time",hint:"Sunrise time",justifyItemClass:"justify-start",subTextValue:"AM"},{icon:"sunset",iconSize:e?"smIcon20":"lgIcon30",value:`${i}`,label:"Sunset time",hint:"Sunset time",justifyItemClass:"justify-end",subTextValue:"PM"},{icon:"eye-opened",iconSize:e?"smIcon20":"lgIcon30",value:`${r}`,label:"Road visibility",hint:"Road visibility",justifyItemClass:"justify-start",subTextValue:"km"},{icon:"weather-wind",iconSize:e?"smIcon20":"lgIcon30",value:`${m}`,label:"Wind speed in metre per seconds",hint:`Wind speed (m/s). (${d} on the Beaufort scale)`,justifyItemClass:"justify-end",subTextValue:"m/s"}]},Oe=e=>[{label:`Temperature in °${e?"C":"F"}`,icon:"thermometer",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Ve},{label:"Precipitation and weather",icon:"sun",iconSize:"mdIcon24",iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:qe},{label:"Humidity (%)",icon:"humidity",iconSize:"mdIcon28",iconColorStyles:"fill-whiteBase",renderCell:Ke},{label:"Pressure (mm.Hg)",icon:"pressure",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Xe},{label:"Wind speed (m/s)",icon:"weather-wind",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Ye}],Ue=({toggleTemperatureScale:e,currentWeather:s,isCelsius:a})=>{const{isMobile:c}=M(),{currentTemperature:n,prevailingWeather:o,feelsLike:l,location:i}=Y(s,a);return t.createElement("div",{className:"mx-auto flex cursor-pointer items-center justify-evenly gap-5",onClick:e},t.createElement("div",{className:'relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'},t.createElement("p",{className:"font-weather text-monstrous text-contrastWhite  md:text-[64px]"},n)),t.createElement("div",{className:"space-y-2.5"},t.createElement("div",null,t.createElement("p",{className:"font-weather text-3xl text-contrastWhite md:text-4.5xl"},o),t.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-2xl"},"Feels like ",l)),t.createElement("div",{className:"flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]"},t.createElement(I,{svgName:"location",sizeKey:c?"smIcon20":"mdIcon27",className:"fill-whiteBase"}),t.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-medium"},i))))},Ge=({isCelsius:e})=>{const{hourlyWeather:s}=R(),{isMobile:a}=M(),c=Oe(e);return t.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180"},t.createElement("table",{className:"h-full min-w-full border-separate border border-transparent bg-accentBase"},t.createElement("thead",{className:"h-10"},t.createElement($,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)"},t.createElement("tr",null,t.createElement("th",{className:"w-10 pr-2"},t.createElement(I,{svgName:"time",sizeKey:a?"smIcon20":"mdIcon24",className:"fill-whiteBase"})),Array.isArray(s)&&(s==null?void 0:s.map(n=>t.createElement("th",{key:T(n).timeScale,scope:"col",className:"-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl"},T(n).convertedTimeScale)))))),t.createElement("tbody",null,c.map(({label:n,icon:o,iconColorStyles:l,iconSize:i,renderCell:r})=>t.createElement($,{key:o,label:n,side:"top",sideOffset:0,ariaLabel:`Info about ${n} by time interval`},t.createElement("tr",null,t.createElement("th",{scope:"row",className:"w-10 pr-2"},t.createElement(I,{svgName:o,sizeKey:a?"smIcon20":i,className:l})),s&&Array.isArray(s)&&s.map(m=>t.createElement(t.Fragment,{key:T(m).timeScale},r(m,e)))))))))},_e=()=>{const{currentWeather:e}=R(),{isMobile:s}=M(),{days:a,dateNow:c}=je(),n=Ne(s,e);return t.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full flex-col justify-between gap-3 backface-hidden"},t.createElement("div",{className:"mb-3 text-center hg:mb-5"},t.createElement("span",{className:"font-weather text-3.5xl text-contrastWhite md:text-4.5xl hg:text-5xl"},a),t.createElement("p",{className:"text-2.5xl font-weather text-contrastWhite md:text-3.5xl"},c)),t.createElement("ul",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},Array.isArray(n)&&n.map(({icon:o,iconSize:l,value:i,label:r,hint:m,justifyItemClass:d,subTextValue:f})=>t.createElement("li",{key:r},t.createElement($,{label:m,side:"top",align:d==="justify-end"?"end":"start",sideOffset:4,ariaLabel:`Info about ${r} for current time`},t.createElement("div",{className:`flex items-center gap-3 text-base text-contrastWhite md:text-medium hg:text-2xl ${d}`},t.createElement("div",{className:`${d==="justify-end"?"order-last":"order-1"}`},t.createElement(I,{svgName:o,sizeKey:l,className:"fill-whiteBase"})),t.createElement("p",{className:"flex items-baseline gap-x-1 even:order-1"},i,t.createElement("span",{className:"text-xs hg:text-small"},f))))))))},j="py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium",Ve=(e,s)=>{const{mainTemperature:a}=T(e,s);return t.createElement("td",{className:j},a)},qe=e=>{const{iconWeather:s,iconAlt:a}=T(e);return t.createElement("td",{className:"h-35px"},t.createElement("img",{className:"cover",src:`${W.WEATHER_ICON_URL}/${s}@2x.png`,alt:a}))},Ke=e=>{const{humidityPercent:s}=T(e);return t.createElement("td",{className:j},s)},Xe=e=>{const{pressureMmHg:s}=T(e);return t.createElement("td",{className:j},s)},Ye=e=>{const{windSpeed:s}=T(e);return t.createElement("td",{className:j},s)},Je=()=>{const{hasGeolocationPermission:e,isCelsius:s,flippingCard:a,toggleTemperatureScale:c,flipWeatherDetails:n}=ae(),{isWeatherLoading:o,currentWeather:l,weatherError:i}=R(),r=l&&Object.keys(l).length===0,m=i&&i,d=!o&&r||!!m,f=o&&e,g=!o&&!r&&e,{iconWeather:x,iconAlt:u}=Y(l),y=`${(()=>{switch(!0){case(!o&&r&&!m):return"flex flex-col items-center justify-between px-6 py-10 text-center md:px-10";case!!m:return"px-6 py-10 text-center md:px-10";default:return"px-5 py-8 md:px-8 md:pt-10 hg:pt-8"}})()} h-[515px] md:h-700px flex flex-col justify-between w-full bg-accentBase hg:w-442px`;return t.createElement("div",{className:y},d&&t.createElement(Pe,{showError:m}),f&&t.createElement(K,{variant:"element"}),g&&t.createElement(t.Fragment,null,t.createElement(Ue,{toggleTemperatureScale:c,currentWeather:l,isCelsius:s}),x&&t.createElement("img",{className:"m-auto h-32 w-32 md:h-165px md:w-165px hg:h-180px hg:w-180px",src:`${W.WEATHER_ICON_URL}/${x}@2x.png`,alt:u}),t.createElement("div",{className:"h-56 w-full cursor-pointer perspective-10 md:h-[314px]",onClick:n},t.createElement("div",{className:`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${a}`},t.createElement(_e,null),t.createElement(Ge,{isCelsius:s})))))},Qe=({myButtonRef:e,handleOpenConfirm:s})=>t.createElement($,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Button for deleting news from archive"},t.createElement("div",null,t.createElement(V,{ref:e,onHandleClick:s,variant:q.Small,hasIcon:!0,svgName:"close",svgSize:"mdIcon24",classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))),Ze=({liveNews:e})=>{const{wideScreens:s}=M();return t.createElement("div",{className:"mt-4 px-4"},t.createElement("p",{className:"mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),t.createElement("h2",{className:"mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl"},e==null?void 0:e.title),t.createElement("p",{className:"mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl"},e==null?void 0:e.description),t.createElement("div",{className:"flex justify-between"},t.createElement("p",{className:"text-base text-greyAlt md:text-medium hg:text-xl"},e==null?void 0:e.publishDate),t.createElement("div",{className:"flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent"},t.createElement(I,{svgName:"triangle-double",sizeKey:s?"smIcon20":"xsIcon16",className:"fill-whiteBase"}),t.createElement("p",{className:"text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl"},"Click for read more..."))))},We=({liveNews:e,isFavourite:s,setIsFavourite:a,setHasRead:c,getNewsState:n})=>{const[o,l]=E.useState(!1),{savedNews:i,updateSavedNews:r,addVotedNews:m,removeNews:d,removeFavouriteNews:f}=B(),{showToast:g}=ee(),{setIsScrollDisabled:x}=ge(),{isArchiveActive:u,isFavoriteActive:b}=v();E.useEffect(()=>{(async()=>{o&&(await m(i),l(!1),b&&(e!=null&&e.newsUrl)&&f(e.newsUrl))})()},[o,m,b]);const y=e&&(e==null?void 0:e.newsUrl)!==void 0&&!u,{isFavourite:h,hasRead:p,additionDate:w}=n(),O=S=>{if(S.stopPropagation(),S.preventDefault(),y){a(!s),l(!0);const k=he(e,h,p,w);k&&r(k)}},L=E.useCallback(()=>{if(y&&!p){c(!0),l(!0);const S=pe(e,h,p,w);S&&r(S)}},[y,i,r]);return{handleChangeFavourites:O,handleReadNews:L,handleDeleteNews:async(S,k)=>{S.stopPropagation(),S.preventDefault();try{const H=await d(k);g(H.meta.requestStatus)}catch(H){console.error("Error during removeNews: ",H)}finally{x(!1)}}}},ne=({liveNews:e})=>{const{savedNews:s,allArchive:a}=B(),{isArchiveActive:c}=v(),[n,o]=E.useState(g().isFavourite??!1),[l,i]=E.useState(g().hasRead??!1),{isAuthenticated:r}=z();E.useEffect(()=>{r&&g()&&(o(g().isFavourite??!1),i(g().hasRead??!1))},[g,r,e]);const{handleChangeFavourites:m,handleReadNews:d,handleDeleteNews:f}=We({liveNews:e,isFavourite:n,setIsFavourite:o,setHasRead:i,getNewsState:g});function g(){const x=c?a:s,u=x==null?void 0:x.find(p=>p.newsUrl===(e==null?void 0:e.newsUrl)),b=u==null?void 0:u.isFavourite,y=u==null?void 0:u.hasRead,h=u==null?void 0:u.additionDate;return{isFavourite:b,hasRead:y,additionDate:h}}return{isFavourite:n,hasRead:l,handleChangeFavourites:m,handleReadNews:d,handleDeleteNews:f}},et=({liveNews:e,isFavourite:s,buttonData:a})=>{const[c,n]=E.useState(!1),{handleChangeFavourites:o}=ne({liveNews:e}),{isArchiveActive:l}=v(),i=`absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium ${l?"":"group hocus:bg-accentBase hocus:text-whiteBase"}`;return t.createElement("button",{id:a==null?void 0:a.id,type:"button",className:i,onClick:o,onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1)},fe(l,s),t.createElement(I,{svgName:"heart",sizeKey:"xsIcon16",className:xe(s,c,l)}))},tt=({liveNews:e={}})=>{const s=t.createRef(),{isAuthenticated:a}=z(),{isOpenModal:c,modalType:n}=Z(),{toggleModal:o,popUpRef:l,isOpenModalForItem:i}=ye(),{isHomeActive:r,isArchiveActive:m,isFavoriteActive:d}=v(),{isFavourite:f,hasRead:g,handleReadNews:x,handleDeleteNews:u}=ne({liveNews:e}),b=async(p,w)=>{w&&(o(),await u(p,w))},y=a&&g&&(r||m||d),h=c&&i&&a&&n==="deleteNews"&&(e==null?void 0:e._id);return t.createElement(t.Fragment,null,(e==null?void 0:e.newsUrl)&&t.createElement("a",{rel:"noopener noreferrer nofollow",className:"group block transition-all",href:e.newsUrl,target:"_blank",onClick:a?x:void 0,"aria-label":"Click to read current news"},t.createElement("div",{className:`${y?"absolute z-20 h-full w-full bg-whiteBase/[.4]":"hidden"}`}),m?t.createElement(Qe,{myButtonRef:s,handleOpenConfirm:p=>o(p,!0,"deleteNews")}):null,t.createElement("p",{className:"absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite hg:text-medium"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),y?t.createElement("p",{className:"absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5"},"Already read",t.createElement(I,{svgName:"check",sizeKey:"smIcon18",className:"fill-readBase"})):null,t.createElement("div",{className:"relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]"},t.createElement("p",{className:"absolute bottom-3 left-3 z-10 text-whiteBase opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100"},e==null?void 0:e.edition),e&&(e!=null&&e.imgLink)?t.createElement("img",{loading:"lazy",className:"absolute h-full max-w-none rounded-xl object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):t.createElement(se,{variant:"card"}),a&&t.createElement(et,{liveNews:e,isFavourite:f,buttonData:{id:`Add ${e==null?void 0:e.title} to favourites or remove from them`}})),t.createElement(Ze,{liveNews:e})),h&&t.createElement(be,{closeModal:o,modalRef:l},t.createElement(He,{handleClose:p=>o(p),handleDelete:p=>b(p,e._id),position:"deleteNews",title:"Delete news",agreementText:"delete this"})))},st=0,at=1,ut=({currentItems:e,currentPage:s})=>{const{isWeatherLoading:a}=R(),{isFavoriteActive:c}=v(),n="overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard",o=`${c?"mb-0":"mb-10 md:mb-12 lg:mb-[60px]"} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`,l=i=>{let r="";switch(i){case st:r="md:col-start-1 md:row-start-1 lg:col-start-1";break;case at:r="lg:col-start-2 lg:row-start-1";break}return`${n} ${r} relative h-655px w-72 md:h-700px md:w-353px lg:w-395px hg:w-442px`};return t.createElement("ul",{className:o},s&&s===1&&t.createElement("li",{className:`${n} max-md:h-515px md:col-start-2 lg:col-start-3`},a?t.createElement(K,{variant:"element"}):t.createElement(Je,null)),e==null?void 0:e.map((i,r)=>t.createElement("li",{key:i.newsUrl,className:l(r)},t.createElement(tt,{liveNews:i}))))};function G(e){return typeof e=="number"&&e>=500}const ot=()=>{const{errorDB:e}=B(),{authError:s}=z(),{errorAPI:a}=D(),c=Ee();E.useEffect(()=>{(e&&G(e)||a&&G(a)||s&&G(s))&&c("/server-error")},[e,a,s])},nt=()=>{const{headline:e}=D(),{isHomeActive:s,isFavoriteActive:a,isReadActive:c,isArchiveActive:n}=v();return{getHeadline:()=>{switch(!0){case(e&&s):return e;case a:return"Favourite news";case c:return"Read news";case n:return"Archive news";default:return""}}}},N=()=>{const{hasResults:e}=X(),{isLoadingAPIData:s}=D(),{isLoadingDBData:a}=B(),{isHomeActive:c,isFavoriteActive:n,isReadActive:o,isArchiveActive:l}=v(),i=a||e==="loading",r=s||i;return{commonDBLoader:i,isHomeLoader:r,shouldShowLoader:c&&r||(n||o)&&i||l&&a}},ie=()=>{const{hasResults:e}=X(),{errorAPI:s,hasRequestResults:a}=D(),{allArchive:c,archiveHistoryLog:n,isLoadingDBData:o}=B(),l=v(),{rebuiltNews:i}=te(l),{isHomeLoader:r}=N(),{isHomeActive:m,isFavoriteActive:d,isReadActive:f,isArchiveActive:g}=l,x=s==null?void 0:s.toString().includes("429"),u=(i==null?void 0:i.length)===0||a==="empty"||e==="empty",b=u||x,y=c.length===0&&n.length===0;return{isHomePlug:b,commonPlug:u,shouldShowPlug:m&&b&&!r||(d||f)&&u&&!o||g&&y&&!o}},it=()=>{const{allArchive:e,isLoadingDBData:s}=B(),a=v(),{isHomeLoader:c,commonDBLoader:n}=N(),{isHomePlug:o,commonPlug:l}=ie(),{isArchiveActive:i,isFavoriteActive:r,isHomeActive:m,isReadActive:d}=a,f=m&&!c&&!o,g=(r||d)&&!n&&!l,x=i&&!s&&(e==null?void 0:e.length)>0;return{shouldShowContent:f||g||x}},ct=()=>{const{filteredNews:e}=X(),{errorAPI:s,newsByKeyword:a,newsByCategory:c,newsByDate:n}=D(),{authError:o,statusMessage:l}=z(),{allFavourites:i,allReads:r,dbSuccessMessage:m}=B(),{setOpenToast:d}=ee(),f=v(),{rebuiltNews:g}=te(f),{isHomeLoader:x,commonDBLoader:u}=N(),{isArchiveActive:b,isFavoriteActive:y,isHomeActive:h,isReadActive:p}=f;E.useEffect(()=>{(y||p)&&(g==null?void 0:g.length)>0&&d(!0)},[]);const w=a&&a.length>0||c&&c.length>0||n&&n.length>0,L=["Email sent successfully","Password has successfully changed","User sign-in success","Your saved password has been successfully retrieved","Sign-out success"].includes(l),U=typeof o=="string"||typeof s=="number",S=!x&&w||(e==null?void 0:e.length)>0,k=y&&!u&&(i==null?void 0:i.length)>0,H=p&&!u&&(r==null?void 0:r.length)>0,J=b&&(m==="Remove news success"||m==="Your History Log news feed has been successfully cleared")&&!u,ce=h&&(U||L||S)||k||H||J;let A,C;switch(!0){case(h&&L):A="success",C="non-interactive";break;case(h&&U):A="error",C="interactive";break;case(h&&S):A="info",C="non-interactive";break;case k:A="info",C="non-interactive";break;case H:A="info",C="non-interactive";break;case J:A="success",C="interactive";break;default:A="info",C="non-interactive";break}return{shouldShowToast:ce,statusToast:A,toastType:C}},gt=({children:e})=>{const{shouldShowLoader:s}=N(),{shouldShowPlug:a}=ie(),{shouldShowContent:c}=it(),{shouldShowToast:n,statusToast:o,toastType:l}=ct(),{getHeadline:i}=nt();return ot(),t.createElement(t.Fragment,null,s&&t.createElement(K,{variant:"generalSection"}),n&&t.createElement(ve,{variant:l,status:o}),a&&t.createElement(se,{variant:"page"}),c&&t.createElement("h1",{className:"mb-6 text-giant font-bold dark:text-whiteBase"},i()),c&&e)};export{He as D,ut as N,gt as P};
