import{R as u,ah as v,a4 as b,ai as E,aj as S,ak as $,B,al as C,g as _,d as y,am as x,an as m,J as T,h as D,G as A,ao as g,f as R,ap as c,aq as p,S as h,a3 as k,o as P}from"./index-bbedbc49.js";const U={root:'data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-whiteBase p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_"title_action"_"description_action"] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border dark:border-whiteBase dark:bg-darkBackground',itemTitle:"mb-[5px] text-[15px] font-medium text-darkBase [grid-area:_title] dark:text-whiteBase",itemDescription:"m-0 text-[10px] md:text-[13px] leading-[1.3] text-darkBase [grid-area:_description] dark:text-whiteBase",undoButton:"inline-flex h-25px items-center justify-center rounded-[10px] bg-accentBase px-[10px] text-small font-medium leading-[25px] text-whiteBase shadow-[inset_0_0_0_1px] transition-colors duration-500 hocus:bg-accentAlt hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]",viewport:"max-w-screen fixed right-0 top-0 z-[2147483647] m-0 flex w-[320px] md:w-390px list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"},N=({variant:n,title:e,description:i,openToast:d,setOpenToast:l})=>{const{root:r,itemDescription:t,itemTitle:a,undoButton:s,viewport:o}=U;return u.createElement(u.Fragment,null,u.createElement(v,{type:n===b.Background?"background":"foreground",open:d,defaultOpen:n===b.Background,onOpenChange:w=>l(w),className:r},u.createElement(E,{className:a},e),u.createElement(S,{className:t},i),u.createElement($,{className:"[grid-area:_action]",asChild:!0,altText:"Goto schedule to undo"},u.createElement("button",{className:s,type:B.Button},"Undo"))),u.createElement(C,{className:o}))},I=()=>{const{authError:n}=_(),{errorAPI:e}=y(),i=r=>{let t=x.Unknown,a=m.Unknown;switch(r){case T.Conflict:t=x.Auth,a=m.Conflict;break;case T.NotAuthorised:t=x.Auth,a=m.BadCredentialsRequest;break;case T.InvalidPassword:t=x.Auth,a=m.BadCredentialsRequest;break;case T.NotFound:t=x.Auth,a=m.NotFound;break;case T.IncorrectPassword:t=x.Auth,a=m.BadPasswordRequest;break;case T.TooManyRequest:t=x.API,a=m.ManyRequests;break;default:t=x.Unknown,a=m.Unknown;break}return{title:t,description:a}},d=(n||e)??null;return{showErrorToast:()=>i(d)}},M=()=>({chooseInfoToastText:()=>{const{rebuiltNews:e}=D(),{isHomeActive:i,isFavoriteActive:d,isReadActive:l}=A();let r=g.Unknown,t="";switch(!0){case i:r=g.FoundNews,t=`There are ${(e==null?void 0:e.length)??"no"} news has been found`;break;case d:r=g.MonthStatistics,t=`${e==null?void 0:e.length} news added to Favourites`;break;case l:r=g.MonthStatistics,t=`${e==null?void 0:e.length} news added to Reads`;break}return{title:r,description:t}}}),F=n=>Object.keys(n).find(e=>n.hasOwnProperty(e)),O=()=>{const{statusMessage:n,haveAccounts:e}=_(),{dbSuccessMessage:i}=R(),{isArchiveActive:d}=A(),l=a=>{let s=c.Default,o;const w=F(e);switch(a){case h.SignIn:case h.SignUp:s=c.Welcome,o=p.Welcome;break;case h.RememberMe:s=c.PasteCredentials,o=p.RememberMe;break;case h.SignOut:s=c.Goodbye,o=p.Goodbye;break;case h.UpdateEmail:s=c.UpdateCredentials,o=p.UpdateEmail;break;case h.UpdatePassword:s=c.UpdateCredentials,o=p.UpdatePassword;break;case h.RecoveryPasswordSent:s=c.SendRecovery,o=p.SendRecovery;break;case h.PasswordChange:s=c.RecoverPassword,o=p.RecoveryPassword;break;case h.DeleteNews:s=c.DeleteNews,o=p.DeleteNews;break;case h.ClearLog:s=c.ClearLog,o=p.ClearLog;break;case`Account ${w} linking successful`:s=c.LinkAccount,o=`Your ${w} account is successfully linking`;break;case`Account ${w} unlinking successful`:s=c.UnlinkAccount,o=`Your ${w} account has unlinked successfully`;break;default:s=c.Default,o=p.Default;break}return{title:s,description:o}},r=d?i:n;return{showSuccessToast:()=>l(r)}},q=()=>{const{showSuccessToast:n}=O(),{showErrorToast:e}=I(),{chooseInfoToastText:i}=M(),{title:d,description:l}=i(),{title:r,description:t}=n(),{title:a,description:s}=e();return{getToastTitle:f=>{switch(f){case k.Success:return r;case k.Error:return a;default:return d}},getToastDescription:f=>{switch(f){case k.Success:return t;case k.Error:return s;default:return l}}}},G=({variant:n,status:e})=>{const{openToast:i,setOpenToast:d}=P(),{getToastTitle:l,getToastDescription:r}=q(),t=l(e),a=r(e);return u.createElement(u.Fragment,null,u.createElement(N,{variant:n,openToast:i,setOpenToast:d,title:t,description:a}))};export{G as T};
