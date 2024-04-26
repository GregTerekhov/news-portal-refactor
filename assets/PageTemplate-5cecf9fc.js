import{p as $,q as le,r as w,s as re,t as me,u as P,f as v,v as de,R as t,S as B,P as V,V as q,b as z,H as M,w as Z,L as K,k as W,l as ue,d as H,m as ee,x as ge,y as he,z as pe,e as j,B as fe,D as xe,n as ye,M as be,E as Ee,a as X,g as te}from"./index-8e6938f2.js";import{p as we,u as Se}from"./images-0f820a8d.js";import{T as ve}from"./Toast-91510aee.js";const Ae=e=>e.weather.isLoading,Ce=e=>e.weather.data,Te=e=>e.weather.weatherByHour,Ie=e=>e.weather.hasError,R=()=>{const e=$(Ae),s=$(Ce),a=$(Te),c=$(Ie),o=le(),n=w.useCallback(i=>o(re(i)),[o]),l=w.useCallback(i=>o(me(i)),[o]);return{isWeatherLoading:e,currentWeather:s,hourlyWeather:a,weatherError:c,getCurrentWeather:n,getHourlyWeather:l}},se=({variant:e})=>{const{errorAPI:s}=P(),{isHomeActive:a}=v(),c=s==null?void 0:s.toString().includes("429"),o=window.devicePixelRatio||1,n=de(we,o,window.innerWidth),l=Se((n==null?void 0:n.src)||""),i="text-center text-2xl font-bold tracking-smallTight text-darkBase transition-colors dark:text-whiteBase md:w-548px md:text-5xl md:tracking-tighter",r=()=>c&&a?"It seems you have been send too much requests then its needed":"We haven’t found news from this category";return t.createElement(t.Fragment,null,e==="page"?t.createElement("div",{className:"flex flex-col items-center justify-center space-y-10"},t.createElement("p",{className:i},r()),t.createElement("img",{src:l,alt:`${c&&a?"Too much requests":"No found news"}`,width:n.width,height:n.height})):t.createElement("img",{src:l,alt:"No found an image for news",width:n.width,height:n.height}))},ae=()=>{const[e,s]=w.useState(!0),[a,c]=w.useState(!1),[o,n]=w.useState(null),[l,i]=w.useState(!1),{getCurrentWeather:r,getHourlyWeather:m}=R(),d="geolocation"in navigator;w.useEffect(()=>{localStorage.getItem("geolocationPermission")&&(i(!0),n("granted"))},[o]);const h=g=>{switch(i(!1),n("denied"),g.code){case g.PERMISSION_DENIED:console.error("User denied access to geolocation");break;case g.POSITION_UNAVAILABLE:console.error("Geolocation information is unavailable");break;case g.TIMEOUT:console.error("Geolocation access request timed out");break;default:console.error("An unknown error occurred while getting geolocation");break}};return{isCelsius:e,flippingCard:a?"rotate-y-180":"rotate-y-0",statePermission:o,hasGeolocationPermission:l,requestGeolocationPermission:()=>{d&&navigator.permissions.query({name:"geolocation"}).then(g=>{g.state==="granted"?(n("granted"),i(!0),localStorage.setItem("geolocationPermission","granted"),navigator.geolocation.getCurrentPosition(u=>{const S={lat:u.coords.latitude,lon:u.coords.longitude};r(S),m(S)})):g.state==="prompt"?(n("prompt"),navigator.geolocation.getCurrentPosition(u=>{i(!0),localStorage.setItem("geolocationPermission","granted");const S={lat:u.coords.latitude,lon:u.coords.longitude};r(S),m(S)},h)):(i(!1),n("denied"),localStorage.removeItem("geolocationPermission"))})},toggleTemperatureScale:()=>{s(!e)},flipWeatherDetails:()=>{c(!a)},showButtonText:()=>{switch(!0){case o==="prompt":return"Give permission for your geolocation";case l:return"Get the weather for your region";case o==="denied":return"Permission denied";default:return"Give permission for your geolocation"}}}},ke=({showError:e})=>{const{requestGeolocationPermission:s,showButtonText:a}=ae(),c=e?"Server error. Please try again later when you reload the page":"What a pity, this could be your weather";return t.createElement(t.Fragment,null,t.createElement("h2",{className:"text-medium text-whiteBase md:text-2xl lg:text-4xl"},c),t.createElement("div",{className:`my-auto ${e?"flex justify-center":""}`},t.createElement(B,{svgName:"moon",sizeKey:"ultraIcon156",className:"fill-transparent stroke-greyBase"})),!e&&t.createElement(V,{id:"Geolocation permission button",variant:q.Primary,onHandleClick:s,classNameButton:"border border-solid border-whiteBase"},a()))},Be={"-43200":"-12:00","-39600":"-11:00","-36000":"-10:00","-34200":"-09:30","-32400":"-09:00","-28800":"-08:00","-25200":"-07:00","-21600":"-06:00","-18000":"-05:00","-16200":"-04:30","-14400":"-04:00","-12600":"-03:30","-10800":"-03:00","-7200":"-02:00","-3600":"-01:00",0:"00:00",3600:"+01:00",7200:"+02:00",10800:"+03:00",12600:"+03:30",14400:"+04:00",16200:"+04:30",18e3:"+05:00",19800:"+05:30",20700:"+05:45",21600:"+06:00",23400:"+06:30",25200:"+07:00",28800:"+08:00",32400:"+09:00",34200:"+09:30",36e3:"+10:00",37800:"+10:30",39600:"+11:00",41400:"+11:30",43200:"+12:00",45900:"+12:45",46800:"+13:00",50400:"+14:00"},He=[{min:0,max:.2,scale:"0"},{min:.3,max:1.5,scale:"1"},{min:1.6,max:3.3,scale:"2"},{min:3.4,max:5.4,scale:"3"},{min:5.5,max:7.9,scale:"4"},{min:8,max:10.7,scale:"5"},{min:10.8,max:13.8,scale:"6"},{min:13.9,max:17.1,scale:"7"},{min:17.2,max:20.7,scale:"8"},{min:20.8,max:24.4,scale:"9"},{min:24.5,max:28.4,scale:"10"},{min:28.5,max:32.6,scale:"11"},{min:32.7,max:Number.MAX_SAFE_INTEGER,scale:"12"}],De={Sun:"Sunday",Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday"};function Pe(e){const s=String(e);return Be[s]}function Re(e){return e/1e3}function Fe(e){let s;return e&&(s=He.find(a=>e>=a.min&&e<=a.max)),s?s==null?void 0:s.scale:""}const Q=e=>e<10?`0${e}`:e.toString();function Le(){const e=new Date,s=e.getHours(),a=e.getMinutes(),c=Q(s),o=Q(a);return`${c}:${o}`}function _(e){const s=new Date(e*1e3),a=s.getHours(),c=s.getMinutes(),o=String(a).padStart(2,"0"),n=String(c).padStart(2,"0");return`${o}:${n}`}function oe(e){const s=e*.75006;return Math.floor(s)}const D=(e,s)=>s&&e?Math.round(e)+"°":Math.round(e*9/5+32)+"°";function $e(){const e=new Date,s=De[e.toDateString().slice(0,3)],a=Le(),c=e.toDateString().slice(4).slice(0,4),o=e.toDateString().slice(8).slice(0,2),n=e.toDateString().slice(11),l=`${a} | ${o} ${c} ${n}`;return{days:s,dateNow:l}}function Y(e,s){var a,c,o,n,l,i,r,m,d,h,b,p,f,x,E,g,u;return{currentTemperature:s?D((a=e==null?void 0:e.main)==null?void 0:a.temp,!0):D((c=e==null?void 0:e.main)==null?void 0:c.temp,!1),feelsLike:s?D((o=e==null?void 0:e.main)==null?void 0:o.feels_like,!0)+"C":D((n=e==null?void 0:e.main)==null?void 0:n.feels_like,!1)+"F",prevailingWeather:((i=(l=e==null?void 0:e.weather)==null?void 0:l[0])==null?void 0:i.main)??"",location:(e==null?void 0:e.name)??"",timezone:Pe(e==null?void 0:e.timezone),iconWeather:(m=(r=e==null?void 0:e.weather)==null?void 0:r[0])==null?void 0:m.icon,iconAlt:(h=(d=e==null?void 0:e.weather)==null?void 0:d[0])==null?void 0:h.description,humidityPercent:(b=e==null?void 0:e.main)==null?void 0:b.humidity,pressureMmHg:oe((p=e==null?void 0:e.main)==null?void 0:p.pressure),pressureHpa:(f=e==null?void 0:e.main)==null?void 0:f.pressure,sunriseTime:_((x=e==null?void 0:e.sys)==null?void 0:x.sunrise),sunsetTime:_((E=e==null?void 0:e.sys)==null?void 0:E.sunset),visibility:Re(e==null?void 0:e.visibility),windSpeed:(g=e==null?void 0:e.wind)==null?void 0:g.speed,beaufortScale:Fe((u=e==null?void 0:e.wind)==null?void 0:u.speed)}}function k(e,s){var a,c,o,n,l,i,r,m,d;return{timeScale:e==null?void 0:e.dt,convertedTimeScale:_(e==null?void 0:e.dt),mainTemperature:s?D((a=e==null?void 0:e.main)==null?void 0:a.temp,!0)+"C":D((c=e==null?void 0:e.main)==null?void 0:c.temp,!1)+"F",iconWeather:(n=(o=e==null?void 0:e.weather)==null?void 0:o[0])==null?void 0:n.icon,iconAlt:(i=(l=e==null?void 0:e.weather)==null?void 0:l[0])==null?void 0:i.description,humidityPercent:(r=e==null?void 0:e.main)==null?void 0:r.humidity,pressureMmHg:oe((m=e==null?void 0:e.main)==null?void 0:m.pressure),windSpeed:(d=e==null?void 0:e.wind)==null?void 0:d.speed}}const Me=(e,s)=>{const{timezone:a,humidityPercent:c,pressureHpa:o,pressureMmHg:n,sunriseTime:l,sunsetTime:i,visibility:r,windSpeed:m,beaufortScale:d}=Y(s);return[{icon:"earth",iconSize:e?"xsIcon16":"mdIcon24",value:`${a}`,label:"Greenwich mean time",hint:"GMT time",justifyItemClass:"justify-start",subTextValue:"UTC"},{icon:"humidity",iconSize:e?"smIcon18":"lgIcon30",value:`${c}`,label:"Humidity in percent",hint:"Humidity (%)",justifyItemClass:"justify-end",subTextValue:"%"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${n}`,label:"Atmospheric pressure in mm Hg",hint:"Atmospheric pressure (mm.Hg)",justifyItemClass:"justify-start",subTextValue:"mm.Hg"},{icon:"pressure",iconSize:e?"smIcon18":"lgIcon30",value:`${o}`,label:"Atmospheric pressure in hPa",hint:"Atmospheric pressure (HPa)",justifyItemClass:"justify-end",subTextValue:"hPa"},{icon:"sunrise",iconSize:e?"smIcon20":"lgIcon30",value:`${l}`,label:"Sunrise time",hint:"Sunrise time",justifyItemClass:"justify-start",subTextValue:"AM"},{icon:"sunset",iconSize:e?"smIcon20":"lgIcon30",value:`${i}`,label:"Sunset time",hint:"Sunset time",justifyItemClass:"justify-end",subTextValue:"PM"},{icon:"eye-opened",iconSize:e?"smIcon20":"lgIcon30",value:`${r}`,label:"Road visibility",hint:"Road visibility",justifyItemClass:"justify-start",subTextValue:"km"},{icon:"weather-wind",iconSize:e?"smIcon20":"lgIcon30",value:`${m}`,label:"Wind speed in metre per seconds",hint:`Wind speed (m/s). (${d} on the Beaufort scale)`,justifyItemClass:"justify-end",subTextValue:"m/s"}]},ze=e=>[{label:`Temperature in °${e?"C":"F"}`,icon:"thermometer",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Ne},{label:"Precipitation and weather",icon:"sun",iconSize:"mdIcon24",iconColorStyles:"stroke-whiteBase fill-transparent",renderCell:Ge},{label:"Humidity (%)",icon:"humidity",iconSize:"mdIcon28",iconColorStyles:"fill-whiteBase",renderCell:_e},{label:"Pressure (mm.Hg)",icon:"pressure",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:Ve},{label:"Wind speed (m/s)",icon:"weather-wind",iconSize:"mdIcon24",iconColorStyles:"fill-whiteBase",renderCell:qe}],je=({toggleTemperatureScale:e,currentWeather:s,isCelsius:a})=>{const{isMobile:c}=z(),{currentTemperature:o,prevailingWeather:n,feelsLike:l,location:i}=Y(s,a);return t.createElement("div",{className:"mx-auto flex cursor-pointer items-center justify-evenly gap-5",onClick:e},t.createElement("div",{className:'relative w-83px text-center after:absolute after:-right-2 after:top-0 after:h-full after:w-px after:bg-white after:content-[""] md:w-96px'},t.createElement("p",{className:"font-weather text-monstrous text-contrastWhite  md:text-[64px]"},o)),t.createElement("div",{className:"space-y-2.5"},t.createElement("div",null,t.createElement("p",{className:"font-weather text-3xl text-contrastWhite md:text-4.5xl"},n),t.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-2xl"},"Feels like ",l)),t.createElement("div",{className:"flex items-center gap-1 rounded-lg bg-weatherForeground px-2 py-[9px] text-contrastWhite md:gap-2 md:pb-[9px] md:pl-[7px] md:pr-[17px] md:pt-[10px]"},t.createElement(B,{svgName:"location",sizeKey:c?"smIcon20":"mdIcon27",className:"fill-whiteBase"}),t.createElement("p",{className:"font-weather text-base text-contrastWhite md:text-medium"},i))))},Oe=({isCelsius:e})=>{const{hourlyWeather:s}=R(),{isMobile:a}=z(),c=ze(e);return t.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full bg-accentBase duration-500 ease-in backface-hidden rotate-y-180"},t.createElement("table",{className:"h-full min-w-full border-separate border border-transparent bg-accentBase"},t.createElement("thead",{className:"h-10"},t.createElement(M,{label:"Time",side:"top",sideOffset:0,ariaLabel:"Time interval (3 hours)"},t.createElement("tr",null,t.createElement("th",{className:"w-10 pr-2"},t.createElement(B,{svgName:"time",sizeKey:a?"smIcon20":"mdIcon24",className:"fill-whiteBase"})),Array.isArray(s)&&(s==null?void 0:s.map(o=>t.createElement("th",{key:k(o).timeScale,scope:"col",className:"-rotate-90 whitespace-nowrap text-center text-small text-whiteBase md:text-base hg:text-xl"},k(o).convertedTimeScale)))))),t.createElement("tbody",null,c.map(({label:o,icon:n,iconColorStyles:l,iconSize:i,renderCell:r})=>t.createElement(M,{key:n,label:o,side:"top",sideOffset:0,ariaLabel:`Info about ${o} by time interval`},t.createElement("tr",null,t.createElement("th",{scope:"row",className:"w-10 pr-2"},t.createElement(B,{svgName:n,sizeKey:a?"smIcon20":i,className:l})),s&&Array.isArray(s)&&s.map(m=>t.createElement(t.Fragment,{key:k(m).timeScale},r(m,e)))))))))},Ue=()=>{const{currentWeather:e}=R(),{isMobile:s}=z(),{days:a,dateNow:c}=$e(),o=Me(s,e);return t.createElement("div",{className:"rows-[1/1] col-[1/1] flex h-full w-full flex-col justify-between gap-3 backface-hidden"},t.createElement("div",{className:"mb-3 text-center hg:mb-5"},t.createElement("span",{className:"font-weather text-3.5xl text-contrastWhite md:text-4.5xl hg:text-5xl"},a),t.createElement("p",{className:"text-2.5xl font-weather text-contrastWhite md:text-3.5xl"},c)),t.createElement("ul",{className:"grid grid-cols-2 grid-rows-2 gap-y-3.5"},Array.isArray(o)&&o.map(({icon:n,iconSize:l,value:i,label:r,hint:m,justifyItemClass:d,subTextValue:h})=>t.createElement("li",{key:r},t.createElement(M,{label:m,side:"top",align:d==="justify-end"?"end":"start",sideOffset:4,ariaLabel:`Info about ${r} for current time`},t.createElement("div",{className:`flex items-center gap-3 text-base text-contrastWhite md:text-medium hg:text-2xl ${d}`},t.createElement("div",{className:`${d==="justify-end"?"order-last":"order-1"}`},t.createElement(B,{svgName:n,sizeKey:l,className:"fill-whiteBase"})),t.createElement("p",{className:"flex items-baseline gap-x-1 even:order-1"},i,t.createElement("span",{className:"text-xs hg:text-small"},h))))))))},O="py-1.5 text-center text-small text-whiteBase md:py-4 md:text-base hg:text-medium",Ne=(e,s)=>{const{mainTemperature:a}=k(e,s);return t.createElement("td",{className:`${O}`},a)},Ge=e=>{const{iconWeather:s,iconAlt:a}=k(e);return t.createElement("td",{className:"h-35px"},t.createElement("img",{className:"cover",src:`${Z.WEATHER_ICON_URL}/${s}@2x.png`,alt:a}))},_e=e=>{const{humidityPercent:s}=k(e);return t.createElement("td",{className:`${O}`},s)},Ve=e=>{const{pressureMmHg:s}=k(e);return t.createElement("td",{className:`${O}`},s)},qe=e=>{const{windSpeed:s}=k(e);return t.createElement("td",{className:`${O}`},s)},Ke=()=>{const{hasGeolocationPermission:e,isCelsius:s,flippingCard:a,toggleTemperatureScale:c,flipWeatherDetails:o}=ae(),{isWeatherLoading:n,currentWeather:l,weatherError:i}=R(),r=l&&Object.keys(l).length===0,m=i&&i,d=!n&&r||m,h=n&&e,b=!n&&!r&&e,{iconWeather:p,iconAlt:f}=Y(l),E=`${(()=>{switch(!0){case(!n&&r&&!m):return"flex flex-col items-center justify-between px-6 py-10 text-center md:px-10";case!!m:return"px-6 py-10 text-center md:px-10";default:return"px-5 py-8 md:px-8 md:pt-10 hg:pt-8"}})()} h-[515px] md:h-700px flex flex-col justify-between w-full bg-accentBase hg:w-442px`;return t.createElement("div",{className:`${E}`},d&&t.createElement(ke,{showError:m}),h&&t.createElement(K,{variant:"element"}),b&&t.createElement(t.Fragment,null,t.createElement(je,{toggleTemperatureScale:c,currentWeather:l,isCelsius:s}),p&&t.createElement("img",{className:"m-auto h-32 w-32 md:h-165px md:w-165px hg:h-180px hg:w-180px",src:`${Z.WEATHER_ICON_URL}/${p}@2x.png`,alt:f}),t.createElement("div",{className:"h-56 w-full cursor-pointer perspective-10 md:h-[314px]",onClick:o},t.createElement("div",{className:`grid h-full w-full grid-cols-1 grid-rows-1 transition-transform transform-style-3d ${a}`},t.createElement(Ue,null),t.createElement(Oe,{isCelsius:s})))))},Xe=({myButtonRef:e,handleOpenConfirm:s})=>t.createElement(M,{label:"Delete news from archive",side:"bottom",sideOffset:16,ariaLabel:"Button for deleting news from archive"},t.createElement("div",null,t.createElement(V,{ref:e,onHandleClick:s,variant:q.Small,hasIcon:!0,svgName:"close",svgSize:"mdIcon24",classNameIcon:"stroke-whiteBase",ariaLabel:"Delete news from archive button",classNameButton:"absolute z-40 top-3 right-3 bg-accentBase/[.8] py-1.5"}))),Ye=({handleDeleteNews:e,handleClose:s})=>{const{isOpenModal:a}=W(),c=[{onClick:o=>s(o,!1),id:"Cancel deletion the news",label:"Cancel",icon:"reset"},{onClick:e,id:"Delete selected news",label:"Delete",icon:"trash"}];return t.createElement(ue,{enabled:a},t.createElement("div",null,t.createElement("h3",{className:"mb-4 text-2xl text-darkBase dark:text-whiteBase md:mb-6 md:text-4xl"},"Delete news"),t.createElement("p",{className:"mb-6 text-medium text-darkBase dark:text-whiteBase md:mb-10 md:text-xl"},"Are you sure you want to delete this news?"),t.createElement("ul",{className:"max-md:space-y-4 md:flex md:items-center md:justify-between md:gap-8"},c.map(({onClick:o,id:n,label:l,icon:i})=>t.createElement("li",{key:l,className:"w-full"},t.createElement(V,{variant:q.Primary,onHandleClick:o,hasIcon:!0,id:n,svgName:i,svgSize:"smIcon18",classNameIcon:"fill-whiteBase",classNameButton:"md:text-xl border border-whiteBase"},l))))))},Je=({liveNews:e})=>{const{wideScreens:s}=z();return t.createElement("div",{className:"mt-4 px-4"},t.createElement("p",{className:"mb-2 line-clamp-1 text-end text-small leading-tight text-darkBase dark:text-whiteBase lg:text-base hg:text-medium"},e!=null&&e.author?`By ${e==null?void 0:e.author}`:`${e==null?void 0:e.materialType}`),t.createElement("h2",{className:"mb-4 line-clamp-3 h-100px text-3xl font-bold leading-tight tracking-mediumTight dark:text-whiteBase md:h-132px md:text-4xl md:tracking-tighter hg:h-[120px] hg:text-3.5xl"},e==null?void 0:e.title),t.createElement("p",{className:"mb-4 line-clamp-3 h-57px text-base leading-tight text-darkBase dark:text-whiteBase md:h-66px md:text-medium hg:h-[72px] hg:text-xl"},e==null?void 0:e.description),t.createElement("div",{className:"flex justify-between"},t.createElement("p",{className:"text-base text-greyAlt md:text-medium hg:text-xl"},e==null?void 0:e.publishDate),t.createElement("div",{className:"flex translate-x-full items-center gap-2 rounded-2xl bg-accentAlt pr-2 transition-all group-hover:translate-x-0 group-hover:bg-accentAlt dark:bg-transparent"},t.createElement(B,{svgName:"triangle-double",sizeKey:s?"smIcon20":"xsIcon16",className:"fill-whiteBase"}),t.createElement("p",{className:"text-base text-whiteBase transition-colors md:text-medium hg:py-px hg:text-xl"},"Click for read more..."))))},Qe=({liveNews:e,isFavourite:s,setIsFavourite:a,setHasRead:c})=>{const[o,n]=w.useState(!1),[l,i]=w.useState(!1),{savedNews:r,updateSavedNews:m,addVotedNews:d,removeNews:h}=H(),{showToast:b}=ee(),{setIsScrollDisabled:p}=ge(),{isArchiveActive:f}=v();w.useEffect(()=>{(async()=>{o&&r.length>0&&(await d(r),n(!1))})()},[o,d]);const x=!!(r!=null&&r.length)&&e&&(e==null?void 0:e.newsUrl)!==void 0&&!f,E=()=>{const y=r==null?void 0:r.find(J=>J.newsUrl===(e==null?void 0:e.newsUrl)),A=y==null?void 0:y.isFavourite,C=y==null?void 0:y.hasRead,L=y==null?void 0:y.additionDate;return{isFavourite:A,hasRead:C,additionDate:L}},{isFavourite:g,hasRead:u,additionDate:S}=E(),N=y=>{if(y.stopPropagation(),y.preventDefault(),x){a(!s),n(!0);const A=pe(e,g,u,S);A&&m(A)}},F=w.useCallback(()=>{if(x){c(!0),n(!0);const y=he(e,g,u,S);y&&m(y)}},[x,r,m]);return{isDeleted:l,handleChangeFavourites:N,handleReadNews:F,handleDeleteNews:async(y,A)=>{y.stopPropagation(),y.preventDefault();try{const C=await h(A);b(C.meta.requestStatus)}catch(C){console.error("Error during removeNews: ",C)}finally{i(!0),p(!1)}}}},ne=({liveNews:e})=>{const{savedNews:s,allArchive:a}=H(),{isArchiveActive:c}=v(),[o,n]=w.useState(p().isFavourite??!1),[l,i]=w.useState(p().hasRead??!1),{isAuthenticated:r}=j();w.useEffect(()=>{r&&p()&&(n(p().isFavourite??!1),i(p().hasRead??!1))},[p,r,e]);const{isDeleted:m,handleChangeFavourites:d,handleReadNews:h,handleDeleteNews:b}=Qe({liveNews:e,isFavourite:o,setIsFavourite:n,setHasRead:i});function p(){const f=c?a:s,x=f==null?void 0:f.find(u=>u.newsUrl===(e==null?void 0:e.newsUrl)),E=x==null?void 0:x.isFavourite,g=x==null?void 0:x.hasRead;return{isFavourite:E,hasRead:g}}return{isFavourite:o,hasRead:l,isDeleted:m,handleChangeFavourites:d,handleReadNews:h,handleDeleteNews:b}},Ze=({liveNews:e,isFavourite:s,buttonData:a})=>{const[c,o]=w.useState(!1),{handleChangeFavourites:n}=ne({liveNews:e}),{isArchiveActive:l}=v(),i=`absolute bottom-3 right-2 z-20 flex items-center gap-x-1 rounded-3xl bg-contrastWhite px-3 py-1.5 text-small font-medium text-darkBase transition-colors duration-500 lg:text-medium ${l?"":"group hocus:bg-accentBase hocus:text-whiteBase"}`;return t.createElement("button",{id:a==null?void 0:a.id,type:"button",className:`${i}`,onClick:n,onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1)},fe(l,s),t.createElement(B,{svgName:"heart",sizeKey:"xsIcon16",className:xe(s,c,l)}))},We=({liveNews:e={}})=>{const s=t.createRef(),{isAuthenticated:a}=j(),{isOpenModal:c,modalType:o}=W(),{toggleModal:n,popUpRef:l,isOpenModalForItem:i}=ye(),{isHomeActive:r,isArchiveActive:m,isFavoriteActive:d}=v(),{isFavourite:h,hasRead:b,handleReadNews:p,handleDeleteNews:f}=ne({liveNews:e}),x=async(u,S)=>{S&&(n(),await f(u,S))},E=a&&b&&(r||m||d),g=c&&i&&a&&o==="deleteNews"&&(e==null?void 0:e._id);return t.createElement(t.Fragment,null,(e==null?void 0:e.newsUrl)&&t.createElement("a",{rel:"noopener noreferrer nofollow",className:"group block transition-colors",href:e.newsUrl,target:"_blank",onClick:a?p:void 0,"aria-label":"Click to read current news"},t.createElement("div",{className:`${E?"absolute z-20 h-full w-full bg-whiteBase/[.4]":"hidden"}`}),m?t.createElement(Xe,{myButtonRef:s,handleOpenConfirm:u=>n(u,!0,"deleteNews")}):null,t.createElement("p",{className:"absolute left-0 top-10 z-20 rounded-r bg-accentBase/[.7] px-2 py-1 text-small font-medium text-contrastWhite hg:text-medium"},e==null?void 0:e.category," / ",e==null?void 0:e.materialType),E?t.createElement("p",{className:"absolute right-14 top-3.5 z-10 flex items-center gap-1 text-base font-bold text-readBase md:top-5"},"Already read",t.createElement(B,{svgName:"check",sizeKey:"smIcon18",className:"fill-readBase"})):null,t.createElement("div",{className:"relative flex h-395px items-center justify-center overflow-hidden rounded-[10px]"},t.createElement("p",{className:"absolute bottom-3 left-3 z-10 text-whiteBase opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100"},e==null?void 0:e.edition),e&&(e!=null&&e.imgLink)?t.createElement("img",{loading:"lazy",className:"absolute h-full max-w-none rounded-xl object-cover",src:e==null?void 0:e.imgLink,alt:e!=null&&e.imgAlt?e==null?void 0:e.imgAlt:"plug image"}):t.createElement(se,{variant:"card"}),a&&t.createElement(Ze,{liveNews:e,isFavourite:h,buttonData:{id:`Add ${e==null?void 0:e.title} to favourites or remove from them`}})),t.createElement(Je,{liveNews:e})),g&&t.createElement(be,{closeModal:n,modalRef:l},t.createElement(Ye,{handleClose:u=>n(u),handleDeleteNews:u=>x(u,e._id)})))},et=0,tt=1,rt=({currentItems:e,currentPage:s})=>{const{isWeatherLoading:a}=R(),{isFavoriteActive:c}=v(),o=`${c?"mb-0":"mb-10 md:mb-12 lg:mb-[60px]"} max-md:space-y-7 md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10 hg:gap-10`,n=l=>{let i="";switch(l){case et:i="md:col-start-1 md:row-start-1 lg:col-start-1";break;case tt:i="lg:col-start-2 lg:row-start-1";break}return`relative h-655px w-72 overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard md:h-700px md:w-353px lg:w-395px hg:w-442px ${i}`};return t.createElement("ul",{className:`${o}`},s&&s===1&&t.createElement("li",{className:"overflow-hidden rounded-[10px] shadow-card transition-colors dark:shadow-darkCard max-md:h-515px md:col-start-2 lg:col-start-3"},a?t.createElement(K,{variant:"element"}):t.createElement(Ke,null)),e==null?void 0:e.map((l,i)=>t.createElement("li",{key:l.newsUrl,className:n(i)},t.createElement(We,{liveNews:l}))))},st=()=>{const{errorDB:e}=H(),{authError:s}=j(),{errorAPI:a}=P(),c=Ee();w.useEffect(()=>{(e&&o(e)||a&&o(a)||s&&o(s))&&c("/server-error")},[e,a,s]);function o(n){return typeof n=="number"&&n>=500}},at=()=>{const{headline:e}=P(),{isHomeActive:s,isFavoriteActive:a,isReadActive:c,isArchiveActive:o}=v();return{getHeadline:()=>{switch(!0){case(e&&s):return e;case a:return"Favourite news";case c:return"Read news";case o:return"Archive news";default:return""}}}},U=()=>{const{hasResults:e}=X(),{isLoadingAPIData:s}=P(),{isLoadingDBData:a}=H(),{isHomeActive:c,isFavoriteActive:o,isReadActive:n,isArchiveActive:l}=v(),i=a||e==="loading",r=s||i;return{commonDBLoader:i,isHomeLoader:r,shouldShowLoader:c&&r||(o||n)&&i||l&&a}},ie=()=>{const{hasResults:e}=X(),{errorAPI:s}=P(),{allArchive:a,archiveHistoryLog:c,isLoadingDBData:o}=H(),n=v(),{rebuiltNews:l}=te(n),{isHomeLoader:i,commonDBLoader:r}=U(),{isHomeActive:m,isFavoriteActive:d,isReadActive:h,isArchiveActive:b}=n,p=s==null?void 0:s.toString().includes("429"),f=(l==null?void 0:l.length)===0||e==="empty",x=f||p,E=a.length===0&&c.length===0;return{isHomePlug:x,commonPlug:f,shouldShowPlug:m&&x&&!i||(d||h)&&f&&!r||b&&E&&!o}},ot=()=>{const{allArchive:e,isLoadingDBData:s}=H(),a=v(),{isHomeLoader:c,commonDBLoader:o}=U(),{isHomePlug:n,commonPlug:l}=ie(),{isArchiveActive:i,isFavoriteActive:r,isHomeActive:m,isReadActive:d}=a,h=m&&!c&&!n,b=(r||d)&&!o&&!l,p=i&&!s&&(e==null?void 0:e.length)>0;return{shouldShowContent:h||b||p}},nt=()=>{const{filteredNews:e}=X(),{errorAPI:s,newsByKeyword:a,newsByCategory:c,newsByDate:o}=P(),{authError:n,statusMessage:l}=j(),{allFavourites:i,allReads:r,dbSuccessMessage:m}=H(),{setOpenToast:d}=ee(),h=v(),{rebuiltNews:b}=te(h),{isHomeLoader:p,commonDBLoader:f}=U(),{isArchiveActive:x,isFavoriteActive:E,isHomeActive:g,isReadActive:u}=h;w.useEffect(()=>{(E||u)&&(b==null?void 0:b.length)>0&&d(!0)},[]);const S=a&&a.length>0||c&&c.length>0||o&&o.length>0,F=["Email sent successfully","Password has successfully changed","User sign-in success","Your saved password has been successfully retrieved","Sign-out success"].includes(l),G=typeof n=="string"||typeof s=="number",y=!p&&S||(e==null?void 0:e.length)>0,A=E&&!f&&(i==null?void 0:i.length)>0,C=u&&!f&&(r==null?void 0:r.length)>0,L=x&&(m==="Remove news success"||m==="Your deleted news feed has been successfully cleared")&&!f,ce=g&&(G||F||y)||A||C||L;let T,I;switch(!0){case(g&&F):T="success",I="non-interactive";break;case(g&&G):T="error",I="interactive";break;case(g&&y):T="info",I="non-interactive";break;case A:T="info",I="non-interactive";break;case C:T="info",I="non-interactive";break;case L:T="success",I="interactive";break;default:T="info",I="non-interactive";break}return{shouldShowToast:ce,statusToast:T,toastType:I}},mt=({children:e})=>{const{shouldShowLoader:s}=U(),{shouldShowPlug:a}=ie(),{shouldShowContent:c}=ot(),{shouldShowToast:o,statusToast:n,toastType:l}=nt(),{getHeadline:i}=at();return st(),t.createElement(t.Fragment,null,s&&t.createElement(K,{variant:"generalSection"}),o&&t.createElement(ve,{variant:l,status:n}),a&&t.createElement(se,{variant:"page"}),c&&t.createElement("h1",{className:"mb-6 text-giant font-bold dark:text-whiteBase"},i()),c&&e)};export{rt as N,mt as P};
