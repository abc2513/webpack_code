if(!self.define){let i,e={};const n=(n,t)=>(n=new URL(n+".js",t).href,e[n]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=e,document.head.appendChild(i)}else i=n,importScripts(n),e()})).then((()=>{let i=e[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(t,s)=>{const l=i||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const o=i=>n(i,l),u={module:{uri:l},exports:r,require:o};e[l]=Promise.all(t.map((i=>u[i]||o(i)))).then((i=>(s(...i),r)))}}define(["./workbox-b3a946dc"],(function(i){"use strict";self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"index.html",revision:"4d494fb4bef5147f0e40af82f78587b2"},{url:"static/css/main.9e7d32e4.css",revision:null},{url:"static/js/main.56f41776.js",revision:null},{url:"static/js/math.647854ef.chunk.js",revision:null},{url:"static/js/runtime~main.93b4fbac.js",revision:null},{url:"static/media/1.17fe2d08.jpg",revision:null},{url:"static/media/3.a3d91592.gif",revision:null},{url:"static/media/iconfont.0d4e9353.ttf",revision:null},{url:"static/media/iconfont.988dd1c2.woff",revision:null},{url:"static/media/iconfont.a0852692.woff2",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
