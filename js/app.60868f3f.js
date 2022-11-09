(function(t){function e(e){for(var i,s,o=e[0],l=e[1],c=e[2],f=0,h=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&h.push(n[s][0]),n[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(h.length)h.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],i=!0,o=1;o<r.length;o++){var l=r[o];0!==n[l]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=r[0]))}return t}var i={},n={app:0},a=[];function s(e){if(i[e])return i[e].exports;var r=i[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=i,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"342e":function(t,e,r){"use strict";r("8be7")},"56d7":function(t,e,r){"use strict";r.r(e);var i=r("2b0e"),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("TicTacToe")],1)},a=[],s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("div",{attrs:{id:"header"}},[e("button",{staticClass:"button",on:{click:t.changeFirst}},[t._v("点击切换"),e("br"),t._v("当前是"),e("p",[t._v("["+t._s(t.isAiFirst?"电脑先手":"玩家先手")+"]")])]),-2!=t.winner?e("div",{staticClass:"win"},[t._v(t._s(1==t.winner?"AI获胜":-1==t.winner?"玩家获胜":"平局"))]):e("div",{staticClass:"title"},[t._v("井字棋")]),e("button",{staticClass:"button",on:{click:t.reStart}},[t._v("重新"),e("br"),t._v("开始对局")])]),e("div",{attrs:{id:"main"}},[e("div",{attrs:{id:"table"}},[e("table",{staticClass:"checkerboard"},t._l(this.chess,(function(r,i){return e("tr",{key:i},t._l(r,(function(r,n){return e("td",{key:n,class:t.cellStyle(r),on:{click:function(e){return t.placePiece(i,n,!1)}}},[t._v(t._s(t.cellText(r))+" ")])})),0)})),0)])]),t._m(0)])},o=[function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"footer"}},[e("div",{attrs:{id:"footer-item"}},[e("span",{staticStyle:{"font-family":"arial","font-size":"120%"}},[t._v("Copyright © 2022 Wenjie Sha"),e("br"),e("span",{staticStyle:{"font-size":"60%"}},[t._v("Designed For AI Course"),e("br"),t._v("with ❤️ at Xidian University")])])])])}],l=(r("14d9"),{name:"TicTacToe",data(){return{chess:[[0,0,0],[0,0,0],[0,0,0]],allowClick:!0,gameStart:!1,isAiFirst:!1,aiNext:!1,winner:-2}},methods:{changeFirst(){this.gameStart||(this.isAiFirst=!this.isAiFirst,this.startGame())},cellStyle(t){return{noneSelect:0==t,computerSelect:1==t,humanSelect:-1==t}},cellText(t){return-1==t?"◯":1==t?"✕":""},placePiece(t,e,r){if((this.allowClick||r)&&0==this.chess[t][e]){console.log("place",t,e,r);var i=JSON.parse(JSON.stringify(this.chess));r?(i[t][e]=1,this.aiNext=!1,this.allowClick=!0):(this.gameStart||(this.gameStart=!0),i[t][e]=-1,this.aiNext=!0,this.allowClick=!1),this.chess=i}},startGame(){if(this.isAiFirst&&!this.gameStart){var t=JSON.parse(JSON.stringify(this.chess));let e=0==Math.floor(2*Math.random())?0:2,r=0==Math.floor(2*Math.random())?0:2;t[e][r]=1,this.chess=t,this.gameStart=!0}},aiEmplace(){let t=-2,e=[],r=JSON.parse(JSON.stringify(this.chess));for(let n=0;n<3;n++)for(let i=0;i<3;i++)if(0==r[n][i]){r[n][i]=1;let a=this.abPruneNode(r,-2,2,!1);r[n][i]=0,console.log("ai如果选择",n,i,"最终结果是",1==a?"ai获胜":0==a?"平局":"玩家获胜"),a>t&&(t=a,e=[{x:n,y:i}]),a==t&&e.push({x:n,y:i})}var i=e[Math.floor(Math.random()*e.length)];this.placePiece(i.x,i.y,!0)},reStart(){location.reload()},abPruneNode(t,e,r,i){var n=[];for(let s=0;s<3;s++)for(let e=0;e<3;e++)0==t[s][e]&&n.push({x:s,y:e});let a=this.scoreEvaluate(t);if(0!=a&&2!=a)return a;if(0==a)return 0;for(let s=0;s<n.length;s++){let a=n[s];t[a.x][a.y]=i?1:-1;let o=this.abPruneNode(t,e,r,!i);if(t[a.x][a.y]=0,i){if(e<o&&(e=o),e>=r)return r}else if(r>o&&(r=o),r<=e)return e}return i?e:r},scoreEvaluate(t){if(t[0][0]==t[0][1]&&t[0][1]==t[0][2]&&0!=t[0][0])return t[0][0];if(t[1][0]==t[1][1]&&t[1][1]==t[1][2]&&0!=t[1][0])return t[1][0];if(t[2][0]==t[2][1]&&t[2][1]==t[2][2]&&0!=t[2][0])return t[2][0];if(t[0][0]==t[1][0]&&t[1][0]==t[2][0]&&0!=t[0][0])return t[0][0];if(t[0][1]==t[1][1]&&t[1][1]==t[2][1]&&0!=t[0][1])return t[0][1];if(t[0][2]==t[1][2]&&t[1][2]==t[2][2]&&0!=t[0][2])return t[0][2];if(t[0][0]==t[1][1]&&t[1][1]==t[2][2]&&0!=t[0][0])return t[0][0];if(t[0][2]==t[1][1]&&t[1][1]==t[2][0]&&0!=t[0][2])return t[0][2];for(let e=0;e<3;e++)for(let r=0;r<3;r++)if(0==t[e][r])return 2;return 0}},computed:{},mounted(){this.isAiFirst&&(this.allowClick=!1),this.startGame()},watch:{chess:{handler(){console.log("update");let t=this.scoreEvaluate(this.chess);2==t?this.aiNext&&this.aiEmplace():(this.winner=t,this.allowClick=!1)},deep:!0,immediate:!1}}}),c=l,u=(r("62a2"),r("2877")),f=Object(u["a"])(c,s,o,!1,null,"7feae29d",null),h=f.exports,p={name:"App",components:{TicTacToe:h}},d=p,v=(r("342e"),Object(u["a"])(d,n,a,!1,null,null,null)),b=v.exports;i["a"].config.productionTip=!1,new i["a"]({render:t=>t(b)}).$mount("#app")},"62a2":function(t,e,r){"use strict";r("99a5")},"8be7":function(t,e,r){},"99a5":function(t,e,r){}});
//# sourceMappingURL=app.60868f3f.js.map