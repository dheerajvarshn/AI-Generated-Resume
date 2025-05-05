(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6882:function(e,r,t){"use strict";t.d(r,{Z:function(){return N}});var i=t(20791),s=t(13428),a=t(2265),n=t(57042),o=t(95600),l=t(99538),c=t(28702),u=t(19996),d=t(35843),f=t(26520),h=t(25702);function v(e){return(0,h.ZP)("MuiCircularProgress",e)}(0,f.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(57437);let k=["className","color","disableShrink","size","style","thickness","value","variant"],p=e=>e,x,g,Z,y,P=(0,l.F4)(x||(x=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),b=(0,l.F4)(g||(g=p`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),C=e=>{let{classes:r,variant:t,color:i,disableShrink:s}=e,a={root:["root",t,`color${(0,c.Z)(i)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,s&&"circleDisableShrink"]};return(0,o.Z)(a,v,r)},S=(0,d.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,c.Z)(t.color)}`]]}})(({ownerState:e,theme:r})=>(0,s.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main}),({ownerState:e})=>"indeterminate"===e.variant&&(0,l.iv)(Z||(Z=p`
      animation: ${0} 1.4s linear infinite;
    `),P)),w=(0,d.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),D=(0,d.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{let{ownerState:t}=e;return[r.circle,r[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})(({ownerState:e,theme:r})=>(0,s.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.iv)(y||(y=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),b)),M=a.forwardRef(function(e,r){let t=(0,u.i)({props:e,name:"MuiCircularProgress"}),{className:a,color:o="primary",disableShrink:l=!1,size:c=40,style:d,thickness:f=3.6,value:h=0,variant:v="indeterminate"}=t,p=(0,i.Z)(t,k),x=(0,s.Z)({},t,{color:o,disableShrink:l,size:c,thickness:f,value:h,variant:v}),g=C(x),Z={},y={},P={};if("determinate"===v){let e=2*Math.PI*((44-f)/2);Z.strokeDasharray=e.toFixed(3),P["aria-valuenow"]=Math.round(h),Z.strokeDashoffset=`${((100-h)/100*e).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,m.jsx)(S,(0,s.Z)({className:(0,n.Z)(g.root,a),style:(0,s.Z)({width:c,height:c},y,d),ownerState:x,ref:r,role:"progressbar"},P,p,{children:(0,m.jsx)(w,{className:g.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,m.jsx)(D,{className:g.circle,style:Z,ownerState:x,cx:44,cy:44,r:(44-f)/2,fill:"none",strokeWidth:f})})}))});var N=M},84523:function(e,r,t){Promise.resolve().then(t.bind(t,5721))},5721:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return l}});var i=t(57437),s=t(2265),a=t(24033),n=t(25577),o=t(6882);function l(){let e=(0,a.useRouter)();return(0,s.useEffect)(()=>{e.push("/resume")},[e]),(0,i.jsx)(n.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:(0,i.jsx)(o.Z,{})})}},24033:function(e,r,t){e.exports=t(50094)}},function(e){e.O(0,[656,971,472,744],function(){return e(e.s=84523)}),_N_E=e.O()}]);