import{d as a}from"./index-5af3dd8f.js";const i=()=>{const{authError:r}=a(),e=o=>{let s="";switch(o){case"Email already in use":s="Email already in use";break;case"User is not authentified":s="Email or password are wrong";break;case"Password is not valid":s="Email or password are wrong";break;case"User not found":s="User is not found";break;case"Password incorrect":s="Password is wrong";break;default:s="";break}return s};return{showErrorToast:()=>e(r==null?void 0:r.message)}};export{i as u};