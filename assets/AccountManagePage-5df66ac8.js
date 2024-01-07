import{s as y,t as V,v as P,w as A,x as k,d as h,e as E,y as I,z as b,R as t,A as v,V as x,P as S,B as C}from"./index-89b59f7e.js";const T=({newPassword:s,confirmPassword:l,password:a,errors:e})=>{var i,n,o,u,m;const d=[{placeholder:"Enter new password",fieldValue:s,errors:(i=e==null?void 0:e.newPassword)==null?void 0:i.message,label:"newPassword",ariaInvalid:!!(e!=null&&e.newPassword)},{placeholder:"Confirm new password",fieldValue:l,errors:(n=e==null?void 0:e.confirmPassword)==null?void 0:n.message,label:"confirmPassword",ariaInvalid:!!(e!=null&&e.confirmPassword)}];return s&&l&&!((o=e==null?void 0:e.newPassword)!=null&&o.message)&&!((u=e==null?void 0:e.confirmPassword)!=null&&u.message)&&s.length!==0&&l.length!==0&&d.push({placeholder:"Enter your current password",fieldValue:a,errors:(m=e==null?void 0:e.password)==null?void 0:m.message,label:"password",ariaInvalid:!!(e&&(e!=null&&e.password))}),d},U=({email:s,password:l,errors:a})=>{var c,i,n;const e=[{type:"email",placeholder:"Enter new email",fieldValue:s,errors:(c=a==null?void 0:a.email)==null?void 0:c.message,label:"updatedEmail",iconName:"icon-envelop",ariaInvalid:!!(a!=null&&a.email)}];return s&&!((i=a==null?void 0:a.email)!=null&&i.message)&&s.length!==0&&e.push({type:"password",placeholder:"Enter your current password",fieldValue:l,errors:(n=a==null?void 0:a.password)==null?void 0:n.message,label:"updatedEmail",iconName:"icon-envelop",ariaInvalid:!!(a!=null&&a.password)}),e},D=y({email:V(),password:P()}),H=y({newPassword:A(),confirmPassword:k().required("Confirm password is required").test("passwords-match","Passwords do not match",function(s){return s===this.parent.newPassword}).trim(),password:P()}),O=()=>{const{updateEmail:s}=h(),{setOpenToast:l}=E(),{handleSubmit:a,register:e,watch:d,reset:c,getValues:i,formState:{errors:n}}=I({resolver:b(D),defaultValues:{email:"",password:""}}),[o,u]=d(["email","password"]),m=async r=>{const f=await s(r),{message:w}=f.payload;w&&w==='Email is successfully updated"'&&l(!0),c({...i,email:"",password:""})},p=U({email:o,password:u,errors:n});return{handleSubmit:a,register:e,errors:n,email:o,handleEmailSubmitHandler:m,emailInputs:p}},M=()=>{const{updatePassword:s}=h(),{setOpenToast:l}=E(),{handleSubmit:a,register:e,watch:d,reset:c,getValues:i,formState:{errors:n}}=I({resolver:b(H),defaultValues:{newPassword:"",confirmPassword:"",password:""}}),[o,u,m]=d(["newPassword","confirmPassword","password"]),p=async f=>{const{newPassword:w,password:B}=f,N=await s({password:B,newPassword:w}),{message:g}=N.payload;g&&g==="Password is successfully updated"&&l(!0),c({...i,newPassword:"",confirmPassword:"",password:""})},r=T({newPassword:o,confirmPassword:u,password:m,errors:n});return{handleSubmit:a,register:e,handlePasswordSubmitHandler:p,passwordInputs:r}},R=({})=>{const{isRefreshingUser:s}=h(),{handleSubmit:l,register:a,emailInputs:e,handleEmailSubmitHandler:d}=O();return t.createElement(v,{position:"accountManagePage",filtersBlock:"Change your email"},t.createElement("form",{className:"pt-4 space-y-4 lg:space-y-8",onSubmit:l(d)},t.createElement("ul",{className:"space-y-4 lg:space-y-8"},Array.isArray(e)&&e.map(({type:c,placeholder:i,fieldValue:n,errors:o,label:u,iconName:m,ariaInvalid:p})=>t.createElement("li",{key:u},t.createElement(x,{inputData:{type:c,placeholder:i,fieldValue:n},errors:o,register:a,label:u,svgName:m,className:"fill-accentBase",hasIcon:!0,variant:"accountPage",ariaInvalid:p})))),t.createElement("p",{className:" text-darkBase text-small lg:text-medium dark:text-whiteBase"},"To change your current email, enter the new email and confirm by inputting your current password in the new field. If all information is entered correctly, you will receive a notification confirming the successful update of your email."),t.createElement(S,{buttonData:{type:"submit"},width:"w-28 lg:w-40",id:"Button for applying change your email ",variant:"OtherButton",disabled:!!s},"Apply")))},q=()=>{const{handleSubmit:s,register:l,handlePasswordSubmitHandler:a,passwordInputs:e}=M();return t.createElement(v,{position:"accountManagePage",filtersBlock:"Change your password"},t.createElement("form",{className:"pt-4 space-y-4 lg:space-y-8",onSubmit:s(a)},t.createElement("ul",{className:"space-y-4 lg:space-y-8"},Array.isArray(e)&&e.map(({placeholder:d,fieldValue:c,errors:i,label:n,ariaInvalid:o})=>t.createElement("li",{key:n},t.createElement(x,{inputData:{type:"password",placeholder:d,fieldValue:c},errors:i,register:l,label:n,svgName:"icon-password",hasIcon:!0,variant:"accountPage",ariaInvalid:o})))),t.createElement("p",{className:" text-darkBase text-small lg:text-medium dark:text-whiteBase"},"To change your current password, enter the new password in the first field and repeat the entry in the second field. In the third field, confirm the change by inputting your current password. If all information is entered correctly, you will receive a notification confirming the successful update of your password."),t.createElement(S,{buttonData:{type:"submit"},width:"w-28 lg:w-40",id:"Button for applying change and confirm your new password",variant:"OtherButton"},"Apply")))},z=()=>t.createElement("div",null,t.createElement("h2",{className:"text-darkBase dark:text-whiteBase text-3xl leading-tighter text-end mb-14"},"Account settings"),t.createElement("div",{className:"flex items-center justify-end"},t.createElement("div",{className:"space-y-2 md:space-y-6 w-52 md:w-80 lg:w-[600px]"},t.createElement(R,null),t.createElement(q,null),t.createElement(C,null))));export{z as default};