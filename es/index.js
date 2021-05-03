var w=Object.prototype.hasOwnProperty;var g=Object.getOwnPropertySymbols,h=Object.prototype.propertyIsEnumerable;var s=Object.assign;var v=(e,t)=>{var o={};for(var a in e)w.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&g)for(var a of g(e))t.indexOf(a)<0&&h.call(e,a)&&(o[a]=e[a]);return o};import E from"template-css";var j={bottom:"ux-model-bottom",top:"ux-model-top",left:"ux-model-left",right:"ux-model-right",center:"ux-model-center"},M={bottom:{transform:"translate(0, 100vh)"},top:{transform:"translate(0, -100vh)"},left:{transform:"translate(-100vw, 0)"},right:{transform:"translate(100vw, 0)"},center:{transform:"scale(0.7)"}},O={bottom:{transform:"translate(0, 0px)"},top:{transform:"translate(0, 0px)"},left:{transform:"translate(0px, 0)"},right:{transform:"translate(0px, 0)"},center:{transform:"scale(1)"}};function f(c){var{maskClickClose:e=!1,animeTime:t=300,direction:o="bottom",opacity:a=.4,mask:r=!0,maskColor:x="bg-black",closeTimeout:m,children:l}=c,d=v(c,["maskClickClose","animeTime","direction","opacity","mask","maskColor","closeTimeout","children"]);let p=j[o],n=document.createElement("div");n.className=["ux-model",p].join(" ");let i=document.createElement("div"),u=M[o],k=O[o];setTimeout(()=>{n.style.background="var(--model-mask, rgba(0,0,0,0.5))",Object.assign(i.style,k)}),n.close=()=>{n.style.background="rgba(0,0,0,0)",o==="center"?Object.assign(i.style,s(s({},u),{opacity:0})):Object.assign(i.style,s(s({},u),{opacity:1})),setTimeout(()=>{Object.assign(n.style,{pointerEvents:"none"}),Object.assign(i.style,{pointerEvents:"none"})},t/2),setTimeout(()=>{n.remove()},t)},m&&setTimeout(close,m);let b=document.body.querySelectorAll("[mask-plan]").length;return b>0&&(a=a/b/2),n.setAttribute("mask-plan","1"),Object.assign(n.style,{transition:`all ${t}ms var(--ease, ease-out)`,width:"100vw",height:"100vh",position:"fixed",top:"0px",left:"0px",background:"rgba(0,0,0,0)",pointerEvents:r?void 0:"none",zIndex:"1100",overflow:"hidden"}),n.onclick=()=>{e&&r&&close()},Object.assign(n,d),Object.assign(i.style,s({transition:`all ${t}ms var(--ease, ease-out)`},u)),l&&i.append(...l),n.append(i),n}E`
  .ux-model {
    font-family: var(--sans);
    display: grid;
  }
  .ux-model-bottom {
    place-content: end center;
  }
  .ux-model-top {
    place-content: start center;
  }
  .ux-model-left {
    place-content: center start;
  }
  .ux-model-right {
    place-content: center end;
  }
  .ux-model-center {
    place-content: center;
  }
`;import I from"template-css";function y(e,t,o,a){let r=document.createElement("div");return r.className=["ux-alert-btn",a&&"ux-alert-btn-cancel"].join(" "),r.onclick=()=>{t?t(o.close):o.close()},e&&r.append(...e),r}function S({events:e,title:t,ok:o,oncancel:a,onok:r,cancel:x="Cancel",children:m}){let l=document.createElement("form");if(l.className="ux-alert-form",t){let n=document.createElement("div");Object.assign(n,{className:"ux-alert-form-title",textContent:t}),l.append(t)}let d=document.createElement("div");d.className="ux-alert-content",m&&d.append(...m),l.append(d);let c=document.createElement("div");if(c.className="ux-alert-btns",l.append(c),o){let n=y([o],r,e);Object.assign(n.style,{borderBotton:"1px solid var(--gray-300, #aaa)"}),c.append(n)}let p=y([x],r,e,!0);return c.append(p),l.onsubmit=()=>{r&&r(e.close)},l}function C(e={}){let t=f({direction:"center",children:[S(s({events:{close:()=>{t.close()}}},e))]});return t}I`
  .ux-alert-btns {
    display: grid;
    grid-auto-flow: row;
  }
  @media (min-width: 640px) {
    .ux-alert-btns {
      display: grid;
      grid-auto-flow: column;
    }
  }
  .ux-alert-btn {
    font-weight: 500;
    font-size: 14px;
    border-top: 1px solid var(--disable-weak, #eee);
    text-align: center;
    padding: var(--a2, 16px);
    cursor: pointer;
    color: var(--primary, #f33);
  }
  @media (pointer: fine) {
    .ux-alert-btn {
      border-left: 1px solid var(--disable-weak, #eee);
    }
    .ux-alert-btn:hover {
      background: var(--active-weak, #faa);
    }
  }
  .ux-alert-btn:active {
    background: var(--active, #f66);
  }
  .ux-alert-btn-cancel {
    color: var(--label-deep, #888) !important;
  }
  .ux-alert-form {
    width: 80vw;
    max-width: 500px;
    background: var(--bg, #fff);
    border-radius: var(--r, 6px);
    box-shadow: 0px 4px 10px var(--black-10, rgba(0, 0, 0, 0.1));
    overflow: hidden;
  }
  /* @media (max-width: 640px) {
    .ux-alert-form {
      width: 70vw;
      max-width: 1024px;
    }
  } */
  .ux-alert-title {
    font-size: 16px;
    font-weight: 500;
    padding: 20px;
    padding-bottom: 0px;
    background: var(--bg, #fff);
  }
  .ux-alert-content {
    padding: 20px;
    background: var(--bg, #fff);
  }
`;export{C as VanillaAlert,f as VanillaModel};
