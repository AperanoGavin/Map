class S{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const r=this.get(e);if(r!==void 0){if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}getType(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.7.4/dist";class se{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new S(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function D(n){const e=n?"#"+n.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function ae(n,e){const t=await WA.room.getTiledMap(),r=new Map;return Q(t.layers,r,n,e),r}function Q(n,e,t,r){for(const o of n)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(t&&o.name!==t||r&&!r.includes(s.name))continue;e.set(s.name,new se(s))}}else o.type==="group"&&Q(o.layers,e,t,r)}let j;async function k(){return j===void 0&&(j=ie()),j}async function ie(){return ue(await WA.room.getTiledMap())}function ue(n){const e=new Map;return F(n.layers,"",e),e}function F(n,e,t){for(const r of n)r.type==="group"?F(r.layers,e+r.name+"/",t):(r.name=e+r.name,t.set(r.name,r))}async function Z(){const n=await k(),e=[];for(const t of n.values())if(t.type==="objectgroup")for(const r of t.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ce(n){let e=1/0,t=1/0,r=0,o=0;const s=n.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<n.height;a++)for(let i=0;i<n.width;i++)s[i+a*n.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,a),r=Math.max(r,a));return{top:t,left:e,right:o+1,bottom:r+1}}function ee(n){let e=1/0,t=1/0,r=0,o=0;for(const s of n){const a=ce(s);a.left<e&&(e=a.left),a.top<t&&(t=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:t,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var le=Object.prototype.toString,C=Array.isArray||function(e){return le.call(e)==="[object Array]"};function U(n){return typeof n=="function"}function pe(n){return C(n)?"array":typeof n}function G(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function N(n,e){return n!=null&&typeof n=="object"&&e in n}function fe(n,e){return n!=null&&typeof n!="object"&&n.hasOwnProperty&&n.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(n,e){return ge.call(n,e)}var de=/\S/;function ye(n){return!he(de,n)}var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function ve(n){return String(n).replace(/[&<>"'`=\/]/g,function(t){return me[t]})}var be=/\s*/,Ae=/\s+/,q=/\s*=/,we=/\s*\}/,We=/#|\^|\/|>|\{|&|=|!/;function Se(n,e){if(!n)return[];var t=!1,r=[],o=[],s=[],a=!1,i=!1,u="",l=0;function f(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,v,x;function E(A){if(typeof A=="string"&&(A=A.split(Ae,2)),!C(A)||A.length!==2)throw new Error("Invalid tags: "+A);d=new RegExp(G(A[0])+"\\s*"),v=new RegExp("\\s*"+G(A[1])),x=new RegExp("\\s*"+G("}"+A[1]))}E(e||h.tags);for(var p=new T(n),b,c,y,L,B,w;!p.eos();){if(b=p.pos,y=p.scanUntil(d),y)for(var V=0,oe=y.length;V<oe;++V)L=y.charAt(V),ye(L)?(s.push(o.length),u+=L):(i=!0,t=!0,u+=" "),o.push(["text",L,b,b+1]),b+=1,L===`
`&&(f(),u="",l=0,t=!1);if(!p.scan(d))break;if(a=!0,c=p.scan(We)||"name",p.scan(be),c==="="?(y=p.scanUntil(q),p.scan(q),p.scanUntil(v)):c==="{"?(y=p.scanUntil(x),p.scan(we),p.scanUntil(v),c="&"):y=p.scanUntil(v),!p.scan(v))throw new Error("Unclosed tag at "+p.pos);if(c==">"?B=[c,y,b,p.pos,u,l,t]:B=[c,y,b,p.pos],l++,o.push(B),c==="#"||c==="^")r.push(B);else if(c==="/"){if(w=r.pop(),!w)throw new Error('Unopened section "'+y+'" at '+b);if(w[1]!==y)throw new Error('Unclosed section "'+w[1]+'" at '+b)}else c==="name"||c==="{"||c==="&"?i=!0:c==="="&&E(y)}if(f(),w=r.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+p.pos);return Ce(Pe(o))}function Pe(n){for(var e=[],t,r,o=0,s=n.length;o<s;++o)t=n[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(e.push(t),r=t));return e}function Ce(n){for(var e=[],t=e,r=[],o,s,a=0,i=n.length;a<i;++a)switch(o=n[a],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],t=r.length>0?r[r.length-1][4]:e;break;default:t.push(o)}return e}function T(n){this.string=n,this.tail=n,this.pos=0}T.prototype.eos=function(){return this.tail===""};T.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};T.prototype.scanUntil=function(e){var t=this.tail.search(e),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function P(n,e){this.view=n,this.cache={".":this.view},this.parent=e}P.prototype.push=function(e){return new P(e,this)};P.prototype.lookup=function(e){var t=this.cache,r;if(t.hasOwnProperty(e))r=t[e];else{for(var o=this,s,a,i,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(u=N(s,a[i])||fe(s,a[i])),s=s[a[i++]];else s=o.view[e],u=N(o.view,e);if(u){r=s;break}o=o.parent}t[e]=r}return U(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||h.tags).join(":"),s=typeof r<"u",a=s?r.get(o):void 0;return a==null&&(a=Se(e,t),s&&r.set(o,a)),a};g.prototype.render=function(e,t,r,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=t instanceof P?t:new P(t,void 0);return this.renderTokens(a,i,r,e,o)};g.prototype.renderTokens=function(e,t,r,o,s){for(var a="",i,u,l,f=0,d=e.length;f<d;++f)l=void 0,i=e[f],u=i[0],u==="#"?l=this.renderSection(i,t,r,o,s):u==="^"?l=this.renderInverted(i,t,r,o,s):u===">"?l=this.renderPartial(i,t,r,s):u==="&"?l=this.unescapedValue(i,t):u==="name"?l=this.escapedValue(i,t,s):u==="text"&&(l=this.rawValue(i)),l!==void 0&&(a+=l);return a};g.prototype.renderSection=function(e,t,r,o,s){var a=this,i="",u=t.lookup(e[1]);function l(v){return a.render(v,t,r,s)}if(u){if(C(u))for(var f=0,d=u.length;f<d;++f)i+=this.renderTokens(e[4],t.push(u[f]),r,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")i+=this.renderTokens(e[4],t.push(u),r,o,s);else if(U(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(t.view,o.slice(e[3],e[5]),l),u!=null&&(i+=u)}else i+=this.renderTokens(e[4],t,r,o,s);return i}};g.prototype.renderInverted=function(e,t,r,o,s){var a=t.lookup(e[1]);if(!a||C(a)&&a.length===0)return this.renderTokens(e[4],t,r,o,s)};g.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!r)&&(s[a]=o+s[a]);return s.join(`
`)};g.prototype.renderPartial=function(e,t,r,o){if(r){var s=this.getConfigTags(o),a=U(r)?r(e[1]):r[e[1]];if(a!=null){var i=e[6],u=e[5],l=e[4],f=a;u==0&&l&&(f=this.indentPartial(a,l,i));var d=this.parse(f,s);return this.renderTokens(d,t,r,f,o)}}};g.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||h.escape,s=t.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return C(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!C(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(n){M.templateCache=n},get templateCache(){return M.templateCache}},M=new g;h.clearCache=function(){return M.clearCache()};h.parse=function(e,t){return M.parse(e,t)};h.render=function(e,t,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+pe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,t,r,o)};h.escape=ve;h.Scanner=T;h.Context=P;h.Writer=g;class te{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const r of this.getUsedVariables().values())t.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of t)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const r of e){const o=r[0],s=r[1],a=r[4];["name","&","#","^"].includes(o)&&t.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,t)}}}async function Ee(){var n;const e=await Z();for(const t of e){const r=(n=t.properties)!==null&&n!==void 0?n:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new te(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await z(t.name,o.name,a),s.onChange(async i=>{await z(t.name,o.name,i)})}}}async function Le(){var n;const e=await k();for(const[t,r]of e.entries())if(r.type!=="objectgroup"){const o=(n=r.properties)!==null&&n!==void 0?n:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new te(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();K(t,s.name,i),a.onChange(u=>{K(t,s.name,u)})}}}async function z(n,e,t){console.log(n),(await WA.room.area.get(n)).setProperty(e,t)}function K(n,e,t){WA.room.setProperty(n,e,t),e==="visible"&&(t?WA.room.showLayer(n):WA.room.hideLayer(n))}const Me="https://admin.workadventu.re/html";let I,_=0,O=0;function $(n){if(WA.state[n.name]){let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function ke(n){const e=n.properties.getString("openSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=re(n.properties.mustGetString("openLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function Te(n){const e=n.properties.getString("closeSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=re(n.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function ne(n){return n.map(e=>I.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function re(n){const e=ne(n),t=ee(e),r=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(_-r,2)+Math.pow(O-o,2))}function xe(n){WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]?ke(n):Te(n),$(n)}),$(n)}function H(n,e,t,r){const o=n.name;let s,a,i=!1;const u=t.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const f=!!u;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,v()}})}function v(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function x(){let c;if(n.type==="tilelayer")c=ee(ne(e.properties.mustGetString("closeLayer").split(`
`)));else{if(n.x===void 0||n.y===void 0||n.width===void 0||n.height===void 0)throw new Error(`Doorstep zone "${n.name}" is missing x, y, width or height`);c={top:n.y,left:n.x,right:n.x+n.width,bottom:n.y+n.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function E(){a&&(WA.room.website.delete(a.name),a=void 0)}function p(){if(i=!0,t.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(f&&!l||!f)&&(t.getString("code")||t.getString("codeVariable"))){x();return}l&&(WA.state[e.name]?d():v())}function b(){i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),E()}n.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(b)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(b)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&E(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&v())})}function Be(n){const e=n.properties.mustGetString("bellSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=Math.sqrt(Math.pow(n.x-_,2)+Math.pow(n.y-O,2));if(o>t)return;r=1-o/t}WA.sound.loadSound(e).play({volume:r})}function Re(n){WA.state[n.name]===void 0&&(WA.state[n.name]=0),WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]&&Be(n)})}function X(n,e,t){let r;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const s=t.name;WA.room.onEnterLayer(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=t.name;WA.room.area.onEnter(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function Ve(n){n=n??Me;const e=await ae();I=await k();for(const t of e.values())t.properties.get("door")&&xe(t),t.properties.get("bell")&&Re(t);for(const t of I.values()){const r=new S(t.properties),o=r.getString("doorVariable");if(o&&t.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');H(t,a,r,n)}const s=r.getString("bellVariable");s&&t.type==="tilelayer"&&X(s,r,t)}for(const t of await Z()){const r=new S(t.properties),o=r.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');H(t,a,r,n)}const s=r.getString("bellVariable");s&&X(s,r,t)}WA.player.onPlayerMove(t=>{_=t.x,O=t.y})}function je(n,e){const t=n.getString("bindVariable");if(t){const r=n.get("enterValue"),o=n.get("leaveValue"),s=n.getString("triggerMessage"),a=n.getString("tag");Ge(t,e,r,o,s,a)}}function Ge(n,e,t,r,o,s){s&&!WA.player.tags.includes(s)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[n]=t)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[n]=r}))}async function Ie(){const n=await k();for(const e of n.values()){const t=new S(e.properties);je(t,e.name)}}let Y;async function Ue(n){const e=await WA.room.getTiledMap();n=n??J,Y=await k();const t=e.layers.find(r=>r.name==="configuration");if(t){const o=new S(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(n+"/configuration.html",!0)});for(const s of Y.values()){const a=new S(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&_e(i.split(","),s.name,a)}}}function _e(n,e,t){let r;const o=t.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=t.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>D(n)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=t.getString("openConfigTrigger");s&&(u&&u==="onaction"?a():D(n))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function Oe(){return WA.onInit().then(()=>{Ve().catch(n=>console.error(n)),Ie().catch(n=>console.error(n)),Ue().catch(n=>console.error(n)),Le().catch(n=>console.error(n)),Ee().catch(n=>console.error(n))}).catch(n=>console.error(n))}console.log("Script started successfully");let W,m;WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);let n=0;await WA.players.configureTracking({players:!0,movement:!0});const e=WA.players.list();for(const t of e)t.state.role==="comedian"?n++:t.state.role;console.log(Array.from(e)),WA.players.onPlayerEnters.subscribe(t=>{t.state.role==="comedian"?n++:t.state.role}),WA.players.onPlayerLeaves.subscribe(t=>{t.state.role==="comedian"?n--:t.state.role}),console.log(n),n<1&&!WA.player.state.role&&WA.ui.openPopup("chooseRole","Choose your role",[{label:"Comedian",className:"primary",callback:t=>{WA.player.state.saveVariable("role","comedian",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),n++,console.log(n),t.close()}},{label:"Audience",className:"primary",callback:t=>{WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),t.close()}}]),WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),WA.room.area.onEnter("toilettePopup").subscribe(()=>{m=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to use WC",callback:()=>{W=WA.ui.openPopup("toilettePopup","5",[])}})}),WA.room.area.onLeave("toilettePopup").subscribe(()=>{m!==void 0&&(m.remove(),m=void 0)}),WA.room.area.onEnter("gateauxPopup").subscribe(()=>{m=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to eat the cake",callback:()=>{W=WA.ui.openPopup("gateauxPopup","7",[])}})}),WA.room.area.onLeave("gateauxPopup").subscribe(()=>{m!==void 0&&(m.remove(),m=void 0)}),WA.room.area.onEnter("dehorePopup").subscribe(()=>{m=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to brezze",callback:()=>{W=WA.ui.openPopup("dehorePopup","A",[])}})}),WA.room.area.onLeave("dehorePopup").subscribe(()=>{m!==void 0&&(m.remove(),m=void 0)}),WA.room.area.onEnter("clock").subscribe(()=>{const t="https://player.twitch.tv/?channel=loic_z&parent=play.workadventu.re";WA.nav.openCoWebSite(t,!0)}),WA.room.area.onLeave("clock").subscribe(R),WA.room.area.onLeave("gateauxPopup").subscribe(R),WA.room.area.onLeave("toilettePopup").subscribe(R),WA.room.area.onLeave("dehorePopup").subscribe(R),Oe().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(n=>console.error(n));function R(){W!==void 0&&(W.close(),W=void 0)}