import{R as l,$ as f,X as g,Y as x,Z as m,_ as b,e as p,u as k,g as T,d as _,f as h,k as y}from"./index-a82b227f.js";const v=({variant:n,title:a,description:s,openToast:c,setOpenToast:i})=>{const d='data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-whiteBase p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]  [grid-template-areas:_"title_action"_"description_action"] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border dark:border-whiteBase dark:bg-darkBackground',t="mb-[5px] text-[15px] font-medium text-darkBase [grid-area:_title] dark:text-whiteBase",e="m-0 text-[13px] leading-[1.3] text-darkBase [grid-area:_description] dark:text-whiteBase",o="inline-flex h-25px items-center justify-center rounded-[10px] bg-accentBase px-[10px] text-small font-medium leading-[25px] text-whiteBase shadow-[inset_0_0_0_1px] transition-colors duration-500 hocus:bg-accentAlt hocus:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]",r="max-w-screen fixed right-0 top-0 z-[2147483647] m-0 flex w-390px list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]";return l.createElement(l.Fragment,null,l.createElement(f,{type:n==="non-interactive"?"background":"foreground",open:c,defaultOpen:n==="non-interactive",onOpenChange:u=>i(u),className:d},l.createElement(g,{className:t},a),l.createElement(x,{className:e},s),l.createElement(m,{className:"[grid-area:_action]",asChild:!0,altText:"Goto schedule to undo"},l.createElement("button",{className:o},"Undo"))),l.createElement(b,{className:r}))},E=()=>{const{authError:n}=p(),{errorAPI:a}=k(),s=d=>{let t="UnknownError",e="Try to reload page";switch(d){case"Email already in use":t="Authorisation error",e="Email already in use";break;case"User is not authentified":t="Authorisation error",e="Email or password are wrong";break;case"Password is not valid":t="Authorisation error",e="Email or password are wrong";break;case"User not found":t="Authorisation error",e="User is not found";break;case"Password incorrect":t="Authorisation error",e="Password is wrong";break;case 429:t="News API Error",e="Too many requests";break;default:t="UnknownError",e="Try to reload page";break}return{title:t,description:e}},c=n||a||null;return{showErrorToast:()=>s(c)}},$=()=>({chooseInfoToastText:a=>{const{rebuiltNews:s}=T(a),{isHomeActive:c,isFavoriteActive:i,isReadActive:d}=a;let t,e="";switch(!0){case c:t="Found news",e=`There are ${(s==null?void 0:s.length)??"no"} news has been found`;break;case i:t="Monthly statistics",e=`${s==null?void 0:s.length} news added to Favourites`;break;case d:t="Monthly statistics",e=`${s==null?void 0:s.length} news added to Reads`;break;default:t="",e="";break}return{title:t,description:e}}}),A=()=>{const{statusMessage:n,haveAccounts:a}=p(),{dbSuccessMessage:s}=_(),{isArchiveActive:c}=h(),i=e=>{let o,r;const u=Object.keys(a).find(w=>a.hasOwnProperty(w));switch(e){case"User sign-in success":o="Welcome",r="Welcome to New York Times News Viewer";break;case"Your saved password has been successfully retrieved":o="Paste credentials",r="Your credentials have been successfully inserted";break;case"Sign-out success":o="Goodbye",r="See you soon! We will be waiting for you with new news";break;case"Email is successfully updated":o="Update credentials",r="Your email address has been successfully updated";break;case"Password is successfully updated":o="Update credentials",r="Your password has been successfully updated";break;case"Email sent successfully":o="Sending settings success",r="Your request is successfully sent. Please check your email and follow the instructions for recovering your password";break;case"Password has successfully changed":o="Password recovered",r="Your password successfully recovered";break;case"Remove news success":o="Delete news",r="News has been successfully deleted";break;case"Your History Log news feed has been successfully cleared":o="Clearing log",r="Your deleted news feed has been successfully cleared";break;case`Account ${u} linking successful`:o="Link Account",r=`Your ${u} account is successfully linking`;break;case`Account ${u} unlinking successful`:o="Unlink Account",r=`Your ${u} account has unlinked successfully`;break;default:o="Default title",r="Default description";break}return{title:o,description:r}},d=c?s:n;return{showSuccessToast:()=>i(d)}},S=()=>{const{showSuccessToast:n}=A(),{showErrorToast:a}=E(),{chooseInfoToastText:s}=$(),c=h(),i=s(c);return{getToastTitle:e=>{switch(e){case"success":return n().title;case"error":return a().title;default:return i.title}},getToastDescription:e=>{switch(e){case"success":return n().description;case"error":return a().description;default:return i.description}}}},Y=({variant:n,status:a})=>{const{openToast:s,setOpenToast:c}=y(),{getToastTitle:i,getToastDescription:d}=S();return l.createElement(l.Fragment,null,l.createElement(v,{variant:n,openToast:s,setOpenToast:c,title:i(a),description:d(a)}))};export{Y as T};