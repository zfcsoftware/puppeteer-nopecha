(()=>{var m=chrome;function v(e){let t=("fff12fa3cdd64ff83a30d7b392be57e978a86eee93b9728ed0366bf231abdaad"+e).split("").map(n=>n.charCodeAt(0));return C(t)}var w=new Uint32Array(256);for(let e=256;e--;){let t=e;for(let n=8;n--;)t=t&1?3988292384^t>>>1:t>>>1;w[e]=t}function C(e){let t=-1;for(let n of e)t=t>>>8^w[t&255^n];return(t^-1)>>>0}async function u(e,t){let n=""+[+new Date,performance.now(),Math.random()],[a,o]=await new Promise(i=>{m.runtime.sendMessage([n,e,...t],i)});if(a===v(n))return o}function S(){let e;return t=>e||(e=t().finally(()=>e=void 0),e)}var R=S(),g;function T(){return R(async()=>(g||(g=await u("settings::get",[])),g))}function x(e){g&&(g={...g,...e},M(g))}function f(){return g}var B=[];function h(e,t,n){let a=[e,t,n];B.push(a),L(a,f())}function L(e,t){let n=e[1](t),a=!!e[3];n!==a&&(n?e[3]=e[2]():(e[3](),e[3]=null))}function M(e){B.forEach(t=>L(t,e))}function y(e){if(document.readyState!=="loading")setTimeout(e,0);else{let t;t=()=>{removeEventListener("DOMContentLoaded",t),e()},addEventListener("DOMContentLoaded",t)}}function p(e){return new Promise(t=>setTimeout(t,e))}var N=(e,t,n)=>new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window,detail:1,screenX:t,screenY:n,clientX:t,clientY:n,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null});function l(e,{events:t=null,x:n=null,y:a=null}={}){let o=document.querySelector(e);if(!o)return;if(n===null||a===null){let r=o.getBoundingClientRect();n=r.left+r.width/2,a=r.top+r.height/2}let i=t??["mouseover","mouseenter","mousedown","mouseup","click","mouseout"];for(let r of i)o.dispatchEvent(N(r,n,a))}async function D(){for(;!document.querySelector("div.check");)await p(100)}function H(){let e=document.querySelector("div.check"),t=document.querySelector("#anchor"),n=()=>{e.style.display==="block"||t.getAttribute("aria-hidden")=="true"||O()},a=new MutationObserver(n);return a.observe(e,{attributes:!0}),a.observe(t,{attributes:!0}),n(),()=>a.disconnect()}function O(){l("#checkbox")}async function I(e,t){let n={v:m.runtime.getManifest().version,key:U(e)},a=await u("tab::getURL",[]);return a&&(t||!e.key||new URL(a).hostname.endsWith("nopecha.com"))&&(n.url=a),n}function U(e){return!e.keys||!e.keys.length?e.key:e.keys[Math.floor(Math.random()*e.keys.length)]}function k(e){return e.toDataURL("image/jpeg").replace(/data:image\/[a-z]+;base64,/g,"")}function K(e){try{e.getContext("2d").getImageData(0,0,1,1)}catch{return!0}return!1}async function b(e,t){!t&&!e.complete&&await new Promise(o=>e.addEventListener("load",o));let n=document.createElement("canvas");return n.width=e.naturalWidth||t?.clientWidth,n.height=e.naturalHeight||t?.clientHeight,n.getContext("2d").drawImage(e,0,0),!K(n)&&n}async function A(e){let n=getComputedStyle(e).backgroundImage;if(!n||n==="none")if("src"in e&&e.src)n=`url("${e.src}")`;else return;if("computedStyleMap"in e){let c=e.computedStyleMap().get("background-image");if(c instanceof CSSImageValue){let s=await b(c,e);if(s)return s}}let a=/"(.+)"/.exec(n);if(!a)return;n=a[1];let o=document.createElement("a");if(o.href=n,new URL(o.href).origin===document.location.origin){let c=new Image;c.crossOrigin="anonymous",c.src=n;let s=await b(c);if(s)return s}let i=await u("fetch::asData",[n,{}]),r=new Image;r.crossOrigin="anonymous",r.src=i.data;let d=await b(r);return d}function q(){let e=document.querySelector(".challenge-container"),t=!1,n=!1,a,o=async()=>{if(!n){for(n=!0;e.childElementCount&&!t&&(a=await Y(a),!(document.querySelector(".button-submit[title*=Submit], .button-submit[title*=Verify]")&&document.querySelector(".display-error[aria-hidden=true]"))););n=!1}},i=new MutationObserver(o);return i.observe(e,{childList:!0}),i.observe(document.querySelector(".display-error"),{attributes:!0,attributeFilter:["aria-hidden"]}),o(),()=>{t=!0,i.disconnect()}}async function $(){document.querySelector(".display-language .text").textContent!=="EN"&&l(".language-selector .option:nth-child(23)")}async function E(e){let t=await A(e);if(t)return k(t)}function _(){let e=document.querySelector("h2.prompt-text");if(e)return e.textContent.replace(/\s+/g," ").trim()}var V={[0]:{async getTask(){let e=_();if(!e)return;let t=[...document.querySelectorAll(".task-image")];if(t.length!==9)return;let n=(await Promise.all(t.map(a=>a.querySelector("div.image")).filter(a=>a).map(E))).filter(a=>a);if(n.length===9)return{cells:t,payload:{type:"hcaptcha",task:e,image_data:n}}},async solution({cells:e},t){e.forEach((n,a)=>{let o=n.getAttribute("aria-pressed")=="true";t.data[a]!==o&&l(`.task:nth-child(${a+1})`)})}},[1]:{async getTask(){let e=_();if(!e)return;let t=document.querySelector(".task-image .image");if(!t)return;let n=await E(t);if(!n)return;let a=[...document.querySelectorAll(".challenge-answer")];if(!(a.length<2))return{payload:{type:"hcaptcha_mc",task:e,image_data:[n],choices:a.map(o=>o.querySelector(".text-content").textContent)}}},async solution(e,t){let n=e.payload.choices.indexOf(t.data);l(`.challenge-answer:nth-child(${n+1})`)}},[2]:{async getTask(){let e=_();if(!e)return;let t=document.querySelector(".challenge-view > canvas");if(!t)return;let n=k(t);return{payload:{type:"hcaptcha_bb",task:e,image_data:[n]}}},async solution(e,t){let{x:n,y:a,w:o,h:i}=t.data,r=document.querySelector(".challenge-view > canvas"),d=r?+r.style.width.replace("px","")/500:1,c=r?+r.style.height.replace("px","")/536:1;l(".challenge-view > canvas",{events:["mousedown","mousemove","mouseup"],x:n*d,y:a*c}),await p(100),o&&i&&l(".challenge-view > canvas",{events:["mousedown","mousemove","mouseup"],x:(n+o)*d,y:(a+i)*c})}}},W=[[".challenge-view > .task-grid",0],[".challenge-view > .task-wrapper",1],[".challenge-view > .bounding-box-example",2]];function X(){return W.filter(([e])=>document.querySelector(e)).map(([e,t])=>t)[0]}async function Y(e){await $(),await p(500);let t=X();if(t===void 0){console.warn("New hCaptcha task detected, skipping."),console.warn("Make sure you are running the latest version."),console.warn("If you are, please contact us to get it added: https://nopecha.com/discord"),l(".refresh");return}let n=V[t],a,o;for(let s=0;s<10;s++)if(s&&await p(1e3),a=await n.getTask(),a){if(o=JSON.stringify(a),e&&o===e)continue;break}if(!a){console.warn("[@nope/hcaptcha] failed to retrieve hCaptcha task details within 10s, skipping."),l(".refresh");return}let i=f(),r=new Date().valueOf(),d=await u("api::recognition",[{...a.payload,...await I(i)}]);if("error"in d)return console.warn("[@nope/hcaptcha] api error",d);let c=new Date().valueOf();if(i.hcaptcha_solve_delay){let s=i.hcaptcha_solve_delay_time-c+r;s>0&&await p(s)}return await n.solution(a,d),await p(200),l(".button-submit"),o}function P(){m.runtime.connect({name:"stream"}).onMessage.addListener(t=>{t.event==="settingsUpdate"&&x(t.settings)})}async function j(){P(),await T(),await u("tab::registerDetectedCaptcha",["hcaptcha"]);let e=new URLSearchParams(location.hash.substring(1)),t=e.get("frame"),n=e.get("host");t==="checkbox"?(await D(),h("hcaptcha/auto-open",a=>a.enabled&&a.hcaptcha_auto_open&&!a.disabled_hosts.includes(n),H)):h("hcaptcha/auto-solve",a=>a.enabled&&a.hcaptcha_auto_solve&&!a.disabled_hosts.includes(n),q)}y(j);})();
