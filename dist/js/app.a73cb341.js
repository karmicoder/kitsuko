(function(e){function t(t){for(var r,a,u=t[0],s=t[1],c=t[2],f=0,l=[];f<u.length;f++)a=u[f],o[a]&&l.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(l.length)l.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-41f439a3":"82e63939","chunk-5d5cc14c":"91063470"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-41f439a3":1,"chunk-5d5cc14c":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise(function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-41f439a3":"7e8741f8","chunk-5d5cc14c":"c6d09e02"}[e]+".css",o=s.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var c=i[u],f=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(f===r||f===o))return t()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){c=l[u],f=c.getAttribute("data-href");if(f===r||f===o)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.request=r,delete a[e],d.parentNode.removeChild(d),n(i)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)}).then(function(){a[e]=0}));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise(function(t,n){r=o[e]=[t,n]});t.push(r[2]=i);var c,f=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e),c=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}o[e]=void 0}};var d=setTimeout(function(){c({type:"timeout",target:l})},12e4);l.onerror=l.onload=c,f.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/kitsuko/dist/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],f=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=f;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"096c":function(e,t,n){"use strict";n("7f7f"),n("f751");var r=n("d4ec"),a=n("bee2"),o=(n("cadf"),n("551c"),n("097d"),function(){function e(t){Object(r["a"])(this,e),Object.assign(this,t)}return Object(a["a"])(e,[{key:"next",value:function(){this.offset+=this.limit}}]),e}());n.d(t,"a",function(){return s});var i={method:"get"},u=["filter","sort","page","include","animeId"],s=function(){function e(t){Object(r["a"])(this,e),Object.assign(this,i,t),!this.page||this.page instanceof o||(this.page=new o(this.page))}return Object(a["a"])(e,[{key:"payload",value:function(){var e=this,t={};return u.forEach(function(n){null!=e[n]&&(t[n]=e[n])}),t}},{key:"id",get:function(){return this.name||this.path}}]),e}()},4898:function(e,t,n){"use strict";n.d(t,"a",function(){return i});n("f751");var r=n("d4ec"),a=n("bee2"),o=n("096c"),i=function(){function e(t){Object(r["a"])(this,e),Object.assign(this,t),this._data=null,this.request instanceof o["a"]||(this.request=new o["a"](this.request))}return Object(a["a"])(e,[{key:"receiveResponse",value:function(e){this._data=e.data,this._meta=e.meta}},{key:"data",get:function(){return this._data}},{key:"meta",get:function(){return this._meta}},{key:"rowCount",get:function(){return this.meta?this.meta.rows:0}}]),e}()},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=n("43f9"),o=n.n(a),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("md-app",{attrs:{"md-mode":"fixed"}},[n("md-app-toolbar",{staticClass:"md-primary"},[n("router-link",{staticClass:"md-display-2",attrs:{to:"/"}},[n("span",[e._v(e._s(e.appName))]),n("md-icon",[e._v("gesture")])],1)],1),n("md-app-content",{attrs:{flex:""}},[n("transition",{attrs:{name:"slideUp"}},[n("router-view")],1)],1)],1)],1)},u=[],s={name:"app",components:{},computed:{appName:function(){return"Kitsuko"}}},c=s,f=(n("5c0b"),n("2877")),l=Object(f["a"])(c,i,u,!1,null,null,null);l.options.__file="App.vue";var d=l.exports,p=(n("f751"),n("2f62")),h=n("d722"),m=n("4898"),v=n("096c");r["default"].use(p["a"]);var g=new v["a"]({name:"hot",path:"/anime",sort:"-user_count",page:{limit:14,offset:0}}),b=new p["a"].Store({state:{},mutations:{cacheResponse:function(e,t){var n=t.req,a=t.resp,o=e[n.id]?e[n.id].data:[];if(n.page)for(var i=n.page.offset||0,u=n.page.limit||20,s=i;s<i+u;++s)o[s]=a.data[s-i];else o=a.data;r["default"].set(e,n.id,{cachedAt:new Date,filter:Object.assign({},n.filter),lastPage:Object.assign({},n.page),data:o})}},actions:{fetchHot:function(e){var t=e.dispatch,n=e.state,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=r||!n.hot||!n.hot.data;return r&&g.page.next(),a?t("send",g):Promise.resolve(n.hot)},fetch:function(e,t){var n=e.dispatch;if(!(t instanceof m["a"]))throw new Error("Fetch argument must be instance of DataSource");return n("send",t.request).then(function(e){t.receiveResponse(e)})},send:function(e,t){var n=e.commit;if(!(t instanceof v["a"]))throw new Error("Request must be instance of ApiRequest");return h["a"][t.method](t.path,t.payload()).then(function(e){return!0!==t.noCache&&n("cacheResponse",{req:t,resp:e}),e})}}}),y=n("8c4f");r["default"].use(y["a"]);var k=new y["a"]({mode:"history",routes:[{path:"/",name:"home",component:function(){return n.e("chunk-41f439a3").then(n.bind(null,"bb51"))}},{path:"/anime/:id",name:"anime",component:function(){return n.e("chunk-5d5cc14c").then(n.bind(null,"8c21"))}}]}),w=n("5c7d"),j=n.n(w);function O(e){return function(t){j.a.debug("scrolled",t.target.scrollY),t.target.innerHeight+t.target.scrollY>t.target.offsetHeight&&e(t)}}r["default"].directive("scroll-bottom",{bind:function(e,t){e.addEventListener("scroll",O(t.value))},update:function(e,t){null!=t.oldValue&&t.oldValue!==t.value&&(e.removeEventListerner("scroll",t.oldValue),e.addEventListener("scroll",O(t.value)))},unbind:function(e){e.removeEventListener("scroll")}});n("51de"),n("9ddc");r["default"].use(o.a),new r["default"]({store:b,router:k,render:function(e){return e(d)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(e,t,n){},d722:function(e,t,n){"use strict";n("cadf"),n("551c"),n("097d");var r=n("764e");console.log("kitsu base is https://kitsu.io/api/edge"),t["a"]=new r["a"]({baseURL:"https://kitsu.io/api/edge"})}});
//# sourceMappingURL=app.a73cb341.js.map