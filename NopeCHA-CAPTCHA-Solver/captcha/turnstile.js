(()=>{var i=chrome;function d(e){let t=("fff12fa3cdd64ff83a30d7b392be57e978a86eee93b9728ed0366bf231abdaad"+e).split("").map(o=>o.charCodeAt(0));return m(t)}var u=new Uint32Array(256);for(let e=256;e--;){let t=e;for(let o=8;o--;)t=t&1?3988292384^t>>>1:t>>>1;u[e]=t}function m(e){let t=-1;for(let o of e)t=t>>>8^u[t&255^o];return(t^-1)>>>0}async function s(e,t){let o=""+[+new Date,performance.now(),Math.random()],[r,x]=await new Promise(E=>{i.runtime.sendMessage([o,e,...t],E)});if(r===d(o))return x}function l(){let e;return t=>e||(e=t().finally(()=>e=void 0),e)}var M=l(),n;function p(){return M(async()=>(n||(n=await s("settings::get",[])),n))}function f(e){n&&(n={...n,...e},g(n))}function a(){return n}var y=[];function b(e,t,o){let r=[e,t,o];y.push(r),h(r,a())}function h(e,t){let o=e[1](t),r=!!e[3];o!==r&&(o?e[3]=e[2]():(e[3](),e[3]=null))}function g(e){y.forEach(t=>h(t,e))}function _(){i.runtime.connect({name:"stream"}).onMessage.addListener(t=>{t.event==="settingsUpdate"&&f(t.settings)})}function c(e){if(document.readyState!=="loading")setTimeout(e,0);else{let t;t=()=>{removeEventListener("DOMContentLoaded",t),e()},addEventListener("DOMContentLoaded",t)}}function v(e){return new Promise(t=>setTimeout(t,e))}function C(e){postMessage({source:"nopecha",...e})}function w(e){C(e)}function S(){let e=document.querySelector("#challenge-stage");if(!e)return;let t=new MutationObserver(o=>{o[0].addedNodes.length>0&&k()});return t.observe(e,{childList:!0}),e.querySelector(".ctp-checkbox-container")&&k(),()=>t.disconnect()}async function k(){let e=a();e.turnstile_solve_delay&&await v(e.turnstile_solve_delay_time),w({action:"click",selector:"input[type=checkbox], #cf-stage area"})}async function B(){_(),await p(),await s("tab::registerDetectedCaptcha",["turnstile"]);let e=location.hostname;b("turnstile/auto-solve",t=>t.enabled&&t.turnstile_auto_solve&&!t.disabled_hosts.includes(e),S)}c(B);})();
