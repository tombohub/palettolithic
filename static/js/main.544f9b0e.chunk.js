(this.webpackJsonppalettolithic=this.webpackJsonppalettolithic||[]).push([[0],{21:function(e,t,a){},39:function(e,t,a){e.exports=a(84)},44:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(26),c=a.n(o),l=(a(44),a(45),a(46),a(3));var i=function(e){return n.a.createElement("div",{"data-name":"shade",className:"",style:{backgroundColor:e.shade}})};var u=function(e){return!!Array.isArray(e.shades)&&n.a.createElement("div",{className:"flex-1 rounded p-1","data-name":"color-outer"},n.a.createElement("div",{className:"grid grid-cols-11 gap-1 h-full rounded","data-name":"color-inner"},n.a.createElement("span",{className:"my-auto"},e.color.toUpperCase(),":"),e.shades.map((function(e,t){return n.a.createElement(i,{key:t,shade:e})}))))};var s=function(e){var t=Object.keys(e.palette);return n.a.createElement("div",{id:"palette-outer",className:"col-span-8 row-span-8 flex-auto bg-white rounded p-1 pl-2"},n.a.createElement("div",{id:"palette-inner",className:"flex flex-col justify-between h-full rounded overflow-hidden"},t.map((function(t,a){return n.a.createElement(u,{key:a,shades:e.palette[t],color:t})}))))};a(47);var m=function(e){return n.a.createElement("li",{className:"cursor-pointer p-2 capitalize text-lg mt-2 border-l-4\n      ".concat(function(e,t){var a=function(a){return t===e?a.active:a.nonActive};switch(e){case"tailwind":return a({active:"bg-teal-400 border-teal-400 rounded",nonActive:"hover:bg-teal-400 hover:rounded border-teal-400 transition duration-200"});case"bootstrap":return a({active:"bg-purple-400 border-purple-400 rounded ",nonActive:"hover:bg-purple-400 hover:rounded border-purple-400 transition duration-200"});case"css":return a({active:"bg-orange-400 border-orange-400 rounded ",nonActive:"hover:bg-orange-400 hover:rounded border-orange-400 transition duration-200"});default:return""}}(e.framework,e.activeFramework),"\n      "),onClick:function(){return e.setActiveFramework(e.framework)}},e.framework)};var v=function(e){return n.a.createElement("ul",{className:"pt-12"},n.a.createElement(m,{framework:"tailwind",activeFramework:e.activeFramework,setActiveFramework:e.setActiveFramework}),n.a.createElement(m,{framework:"bootstrap",activeFramework:e.activeFramework,setActiveFramework:e.setActiveFramework}),n.a.createElement(m,{framework:"css",activeFramework:e.activeFramework,setActiveFramework:e.setActiveFramework}))},d=a(38);function p(){return n.a.createElement(n.a.Fragment,null,"code:",n.a.createElement("br",null),n.a.createElement(d.a,{className:"inline"})," ",n.a.createElement("a",{href:"https://github.com/tombohub/palettolithic",className:"underline"}," ","Github"))}var f=a(10);a(20),a(21);function g(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement(f.b,{color:e.color,onChange:e.onColorChange}),n.a.createElement(f.a,{placeholder:"HEX code",color:e.color,onChange:e.onColorChange,className:"bg-gray-200 rounded p-2 border w-full "}))}var h=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"col-span-2 row-span-7"},n.a.createElement(g,{color:e.color,onColorChange:e.onColorChange}),n.a.createElement(v,{activeFramework:e.activeFramework,setActiveFramework:e.setActiveFramework}),n.a.createElement("div",{className:"mt-32"},n.a.createElement(p,null))))},b=a(27),E=a(49),w=["red","orange","yellow","lime","green","teal","cyan","blue","indigo","violet","purple","pink","red"],k=[.95,.9,.8,.7,.6,.5,.4,.3,.2,.1],y=function(e){return function(t){var a=E(t).hsl(),r=Object(l.a)(a,3),n=r[0],o=(r[1],r[2]);return E.hsl(n,e,o).hex()}},x=function(e){var t=E(e).hsl(),a=Object(l.a)(t,3),r=a[0],n=a[1];a[2];return k.map((function(e){return E.hsl(r,n,e).hex()}))},F=function(e){var t=E(e).hsl(),a=Object(l.a)(t,2),r=a[0];a[1];return function(e){var t=Math.round(e/30);return w[t]}(r)},j=function(e,t){return e[e[t.key]?t.key+"2":t.key]=t.value,e};function C(e){var t=E(e),a=[],r=t.hsl(),n=Object(l.a)(r,3),o=n[0],c=n[1],i=n[2],u=function(e){var t=360/e;return function(a){return function(e){for(var t=[],a=0;a<e;a++)t.push(a);return t}(e).map((function(e){return Math.floor((a+e*t)%360)}))}}(12)(o);return a.push({key:"gray",value:x(y(.04)(""+t.hex()))}),isNaN(o)||u.forEach((function(e){var t=E.hsl(e,c,i),r=F(t);a.push({key:r,value:x(""+t.hex())})})),a.reduce(j,{})}function N(e){for(var t=function(t){var a,r=50,n={},o=Object(b.a)(e[t]);try{for(o.s();!(a=o.n()).done;){var c=a.value;n[parseInt(r)]=c,r=50===r?100:r+100}}catch(l){o.e(l)}finally{o.f()}return n},a={},r=0,n=Object.keys(e);r<n.length;r++){var o=n[r];a[o]=t(o)}return a}function O(e){var t=N(e),a=JSON.stringify(t,null,2).slice(1,-1).trim().replace(/"([^"]+)":/g,"$1:").replace(/\n/g,"\n    ");return'// tailwind.config.js\nmodule.exports = {\n  theme: {\n    colors: {\n      transparent: "transparent",\n      current: "currentColor",\n      '.concat(a,"\n    }\n  }\n}")}function A(e){var t=N(e),a=function(e){var t="";for(var a in e){t+="\n";for(var r=0,n=Object.entries(e[a]);r<n.length;r++){var o=Object(l.a)(n[r],2),c=o[0],i=o[1];t+="$".concat(a,"-").concat(c,": ").concat(i,"; \n")}}return t}(t),r=function(e){var t="";for(var a in e)t+="$".concat(a,": $").concat(a,"-500;\n");return t}(t),n=function(e){var t="";for(var a in e)for(var r in t+="\n",e[a])t+='  "'.concat(a,"-").concat(r,'": $').concat(a,"-").concat(r,",\n");return"$theme-colors: (\n"+"".concat(t)+");"}(t);return"".concat(a,"\n\n").concat(r,"\n\n").concat(n)}function $(e){var t=N(e),a="";for(var r in t){a+="\n";for(var n=0,o=Object.entries(t[r]);n<o.length;n++){var c=Object(l.a)(o[n],2),i=c[0],u=c[1];a+="--".concat(r,"-").concat(i,": ").concat(u,"; \n")}}return":root {\n                ".concat(a,"\n}")}var S=a(88),J=a(31),L=a(33),M=a(35),P=a(87),T=a(12);var B=function(e){var t=Object(r.useState)("Copy"),a=Object(l.a)(t,2),o=a[0],c=a[1];function i(e){c("Copied")}Object(r.useEffect)((function(){c("Copy")}),[e.palette,e.activeFramework]),S.a.registerLanguage("javascript",J.a),S.a.registerLanguage("scss",L.a),S.a.registerLanguage("css",M.a);var u=n.a.createElement(n.a.Fragment,null,n.a.createElement(T.CopyToClipboard,{text:O(e.palette)},n.a.createElement("div",{className:"flex justify-end"},n.a.createElement("span",{onClick:i,className:"cursor-pointer font-mono bg-teal-300 rounded text-teal-900 px-1 hover:bg-teal-900 hover:text-teal-300 transition duration-100"},o))),n.a.createElement(S.a,{language:"javascript",style:P.a},O(e.palette))),s=n.a.createElement(n.a.Fragment,null,n.a.createElement(T.CopyToClipboard,{text:A(e.palette)},n.a.createElement("div",{className:"flex justify-end"},n.a.createElement("span",{onClick:i,className:"cursor-pointer font-mono bg-purple-300 rounded text-purple-900 px-1 hover:bg-purple-900 hover:text-purple-300 transition duration-100"},o))),n.a.createElement(S.a,{language:"scss",style:P.a},A(e.palette))),m=n.a.createElement(n.a.Fragment,null,n.a.createElement(T.CopyToClipboard,{text:$(e.palette)},n.a.createElement("div",{className:"flex justify-end"},n.a.createElement("span",{onClick:i,className:"cursor-pointer font-mono bg-orange-300 rounded text-orange-900 px-1 hover:bg-orange-900 hover:text-orange-300 transition duration-100"},o))),n.a.createElement(S.a,{language:"css",style:P.a},$(e.palette)));return n.a.createElement(n.a.Fragment,null,function(e){switch(e){case"tailwind":return u;case"bootstrap":return s;case"css":return m;default:return"nothing selected"}}(e.activeFramework))};var I=function(e){return n.a.createElement("div",{id:"code-area",className:"col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded overflow-auto"},n.a.createElement(B,{activeFramework:e.activeFramework,palette:e.palette}))};var W=function(){return n.a.createElement("header",{className:"col-span-4 rounded shadow"},n.a.createElement("h1",{className:"lg:text-4xl md:text-3xl text-gray-900 font-frijole inline-block"},"Palettolithic"),n.a.createElement("h6",{className:"font-schoolbell md:text-xl lg:text-2xl text-gray-800 inline-block"},"So easy caveman can do it."))},z=a(1);var G=function(e){var t="#"+e,a="#07c";return/^#([0-9a-f]{3}){1,2}$/i.test(t)&&(a=t),a};var H=function(e){var t=Object(z.f)().colorParam,a=void 0===t?"07c":t,o=Object(z.e)(),c=Object(r.useState)(G(a)),i=Object(l.a)(c,2),u=i[0],m=i[1],v=Object(r.useState)({}),d=Object(l.a)(v,2),p=d[0],f=d[1],g=Object(r.useState)("tailwind"),b=Object(l.a)(g,2),E=b[0],w=b[1];return Object(r.useEffect)((function(){var e=C(u);f(e)}),[u]),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"font-mono text-gray-900 bg-white p-2 h-screen w-screen grid \r grid-cols-12 grid-rows-8 gap-2"},n.a.createElement(W,null),n.a.createElement(s,{palette:p}),n.a.createElement(h,{color:u,onColorChange:function(e){o.push(e.replace("#","")),m(e),f(C(e))},activeFramework:E,setActiveFramework:w}),n.a.createElement(I,{palette:p,activeFramework:E})))},U=a(14);var X=function(){return n.a.createElement(U.a,null,n.a.createElement(n.a.Fragment,null,n.a.createElement(z.a,{path:"/:colorParam?"},n.a.createElement(H,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.544f9b0e.chunk.js.map