import{r as d,R as l,q as o,u as y,A as g,v as E}from"./index-4189adfe.js";function j(e,t,r){d.useEffect(()=>(window.addEventListener(e,t,r),()=>window.removeEventListener(e,t,r)),[e,t])}var L=Object.defineProperty,i=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable,_=(e,t,r)=>t in e?L(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&_(e,r,t[r]);if(i)for(var r of i(t))u.call(t,r)&&_(e,r,t[r]);return e},S=(e,t)=>{var r={};for(var n in e)p.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&i)for(var n of i(e))t.indexOf(n)<0&&u.call(e,n)&&(r[n]=e[n]);return r};function w(e){const t=e,{width:r,height:n,style:a}=t,f=S(t,["width","height","style"]);return l.createElement("svg",v({viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:v({width:r,height:n},a)},f),l.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}w.displayName="@mantine/core/CloseIcon";var x=Object.defineProperty,s=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable,m=(e,t,r)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,z=(e,t)=>{for(var r in t||(t={}))h.call(t,r)&&m(e,r,t[r]);if(s)for(var r of s(t))O.call(t,r)&&m(e,r,t[r]);return e},I=(e,t)=>{var r={};for(var n in e)h.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&s)for(var n of s(e))t.indexOf(n)<0&&O.call(e,n)&&(r[n]=e[n]);return r};const R={xs:o(12),sm:o(16),md:o(20),lg:o(28),xl:o(34)},$={size:"sm"},C=d.forwardRef((e,t)=>{const r=y("CloseButton",$,e),{iconSize:n,size:a,children:f}=r,P=I(r,["iconSize","size","children"]),c=o(n||R[a]);return l.createElement(g,z({ref:t,__staticSelector:"CloseButton",size:a},P),f||l.createElement(w,{width:c,height:c}))});C.displayName="@mantine/core/CloseButton";const B=E(C);export{B as C,j as u};
