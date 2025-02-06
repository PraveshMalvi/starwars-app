import{s as F,t as N,Z,x as or,r as A,u as D,R as E,B as T}from"./index-4189adfe.js";import{a as ar}from"./CommonLoader-daf6ceed.js";const[nr,sr]=ar("Grid component was not found in tree");var lr=Object.defineProperty,L=Object.getOwnPropertySymbols,ir=Object.prototype.hasOwnProperty,fr=Object.prototype.propertyIsEnumerable,M=(r,t,e)=>t in r?lr(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,ur=(r,t)=>{for(var e in t||(t={}))ir.call(t,e)&&M(r,e,t[e]);if(L)for(var e of L(t))fr.call(t,e)&&M(r,e,t[e]);return r};const C=(r,t)=>r==="content"?"auto":r==="auto"?"0rem":r?`${100/(t/r)}%`:void 0,q=(r,t,e)=>e||r==="auto"||r==="content"?"unset":C(r,t),H=(r,t)=>{if(r)return r==="auto"||t?1:0},J=(r,t)=>r===0?0:r?`${100/(t/r)}%`:void 0,K=(r,t)=>typeof r<"u"?`calc(${N({size:r,sizes:t.spacing})} / 2)`:void 0;function dr({sizes:r,offsets:t,orders:e,theme:o,columns:s,gutters:i,grow:l}){return Z.reduce((n,a)=>(n[`@media (min-width: ${or(o.breakpoints[a])})`]={order:e[a],flexBasis:C(r[a],s),padding:K(i[a],o),flexShrink:0,width:r[a]==="content"?"auto":void 0,maxWidth:q(r[a],s,l),marginLeft:J(t[a],s),flexGrow:H(r[a],l)},n),{})}var mr=F((r,{gutter:t,gutterXs:e,gutterSm:o,gutterMd:s,gutterLg:i,gutterXl:l,grow:n,offset:a,offsetXs:m,offsetSm:c,offsetMd:g,offsetLg:p,offsetXl:_,columns:u,span:d,xs:v,sm:y,md:x,lg:O,xl:w,order:S,orderXs:h,orderSm:I,orderMd:b,orderLg:X,orderXl:G})=>({col:ur({boxSizing:"border-box",flexGrow:H(d,n),order:S,padding:K(t,r),marginLeft:J(a,u),flexBasis:C(d,u),flexShrink:0,width:d==="content"?"auto":void 0,maxWidth:q(d,u,n)},dr({sizes:{xs:v,sm:y,md:x,lg:O,xl:w},offsets:{xs:m,sm:c,md:g,lg:p,xl:_},orders:{xs:h,sm:I,md:b,lg:X,xl:G},gutters:{xs:e,sm:o,md:s,lg:i,xl:l},theme:r,columns:u,grow:n}))}));const cr=mr;var gr=Object.defineProperty,P=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,B=(r,t,e)=>t in r?gr(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,pr=(r,t)=>{for(var e in t||(t={}))Q.call(t,e)&&B(r,e,t[e]);if(P)for(var e of P(t))U.call(t,e)&&B(r,e,t[e]);return r},_r=(r,t)=>{var e={};for(var o in r)Q.call(r,o)&&t.indexOf(o)<0&&(e[o]=r[o]);if(r!=null&&P)for(var o of P(r))t.indexOf(o)<0&&U.call(r,o)&&(e[o]=r[o]);return e};const vr={};function yr(r){return r==="auto"||r==="content"?!0:typeof r=="number"&&r>0&&r%1===0}const Y=A.forwardRef((r,t)=>{const e=D("GridCol",vr,r),{children:o,span:s,offset:i,offsetXs:l,offsetSm:n,offsetMd:a,offsetLg:m,offsetXl:c,xs:g,sm:p,md:_,lg:u,xl:d,order:v,orderXs:y,orderSm:x,orderMd:O,orderLg:w,orderXl:S,className:h,id:I,unstyled:b,variant:X}=e,G=_r(e,["children","span","offset","offsetXs","offsetSm","offsetMd","offsetLg","offsetXl","xs","sm","md","lg","xl","order","orderXs","orderSm","orderMd","orderLg","orderXl","className","id","unstyled","variant"]),f=sr(),j=s||f.columns,{classes:tr,cx:er}=cr({gutter:f.gutter,gutterXs:f.gutterXs,gutterSm:f.gutterSm,gutterMd:f.gutterMd,gutterLg:f.gutterLg,gutterXl:f.gutterXl,offset:i,offsetXs:l,offsetSm:n,offsetMd:a,offsetLg:m,offsetXl:c,xs:g,sm:p,md:_,lg:u,xl:d,order:v,orderXs:y,orderSm:x,orderMd:O,orderLg:w,orderXl:S,grow:f.grow,columns:f.columns,span:j},{unstyled:b,name:"Grid",variant:X});return!yr(j)||j>f.columns?null:E.createElement(T,pr({className:er(tr.col,h),ref:t},G),o)});Y.displayName="@mantine/core/Col";var xr=Object.defineProperty,R=Object.getOwnPropertySymbols,Or=Object.prototype.hasOwnProperty,wr=Object.prototype.propertyIsEnumerable,V=(r,t,e)=>t in r?xr(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Pr=(r,t)=>{for(var e in t||(t={}))Or.call(t,e)&&V(r,e,t[e]);if(R)for(var e of R(t))wr.call(t,e)&&V(r,e,t[e]);return r};function $r(r,t){return Z.reduce((e,o)=>(typeof r[o]<"u"&&(e[`@media (min-width: ${t.breakpoints[o]})`]={margin:`calc(-${N({size:r[o],sizes:t.spacing})} / 2)`}),e),{})}var Sr=F((r,{justify:t,align:e,gutter:o,gutterXs:s,gutterSm:i,gutterMd:l,gutterLg:n,gutterXl:a})=>({root:Pr({margin:`calc(-${N({size:o,sizes:r.spacing})} / 2)`,display:"flex",flexWrap:"wrap",justifyContent:t,alignItems:e},$r({xs:s,sm:i,md:l,lg:n,xl:a},r))}));const hr=Sr;var br=Object.defineProperty,$=Object.getOwnPropertySymbols,z=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,W=(r,t,e)=>t in r?br(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,Xr=(r,t)=>{for(var e in t||(t={}))z.call(t,e)&&W(r,e,t[e]);if($)for(var e of $(t))k.call(t,e)&&W(r,e,t[e]);return r},Gr=(r,t)=>{var e={};for(var o in r)z.call(r,o)&&t.indexOf(o)<0&&(e[o]=r[o]);if(r!=null&&$)for(var o of $(r))t.indexOf(o)<0&&k.call(r,o)&&(e[o]=r[o]);return e};const jr={gutter:"md",justify:"flex-start",align:"stretch",columns:12},rr=A.forwardRef((r,t)=>{const e=D("Grid",jr,r),{gutter:o,gutterXs:s,gutterSm:i,gutterMd:l,gutterLg:n,gutterXl:a,children:m,grow:c,justify:g,align:p,columns:_,className:u,id:d,unstyled:v,variant:y}=e,x=Gr(e,["gutter","gutterXs","gutterSm","gutterMd","gutterLg","gutterXl","children","grow","justify","align","columns","className","id","unstyled","variant"]),{classes:O,cx:w}=hr({gutter:o,justify:g,align:p,gutterXs:s,gutterSm:i,gutterMd:l,gutterLg:n,gutterXl:a},{unstyled:v,name:"Grid",variant:y});return E.createElement(nr,{value:{gutter:o,gutterXs:s,gutterSm:i,gutterMd:l,gutterLg:n,gutterXl:a,grow:c,columns:_}},E.createElement(T,Xr({className:w(O.root,u),ref:t},x),m))});rr.Col=Y;rr.displayName="@mantine/core/Grid";export{rr as G};
