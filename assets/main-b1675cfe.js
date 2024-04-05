class P{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const r=this.get(e);if(r!==void 0){if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}getType(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const F="https://unpkg.com/@workadventure/scripting-api-extra@1.7.4/dist";class ie{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new P(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(n){const e=n?"#"+n.join():"";WA.nav.openCoWebSite(F+"/configuration.html"+e,!0)}async function le(n,e){const t=await WA.room.getTiledMap(),r=new Map;return Z(t.layers,r,n,e),r}function Z(n,e,t,r){for(const o of n)if(o.type==="objectgroup"){for(const a of o.objects)if(a.type==="variable"||a.class==="variable"){if(t&&o.name!==t||r&&!r.includes(a.name))continue;e.set(a.name,new ie(a))}}else o.type==="group"&&Z(o.layers,e,t,r)}let R;async function k(){return R===void 0&&(R=ce()),R}async function ce(){return ue(await WA.room.getTiledMap())}function ue(n){const e=new Map;return ee(n.layers,"",e),e}function ee(n,e,t){for(const r of n)r.type==="group"?ee(r.layers,e+r.name+"/",t):(r.name=e+r.name,t.set(r.name,r))}async function te(){const n=await k(),e=[];for(const t of n.values())if(t.type==="objectgroup")for(const r of t.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function pe(n){let e=1/0,t=1/0,r=0,o=0;const a=n.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<n.height;s++)for(let i=0;i<n.width;i++)a[i+s*n.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,s),r=Math.max(r,s));return{top:t,left:e,right:o+1,bottom:r+1}}function ne(n){let e=1/0,t=1/0,r=0,o=0;for(const a of n){const s=pe(a);s.left<e&&(e=s.left),s.top<t&&(t=s.top),s.right>o&&(o=s.right),s.bottom>r&&(r=s.bottom)}return{top:t,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var fe=Object.prototype.toString,E=Array.isArray||function(e){return fe.call(e)==="[object Array]"};function D(n){return typeof n=="function"}function de(n){return E(n)?"array":typeof n}function G(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(n,e){return n!=null&&typeof n=="object"&&e in n}function ge(n,e){return n!=null&&typeof n!="object"&&n.hasOwnProperty&&n.hasOwnProperty(e)}var he=RegExp.prototype.test;function ye(n,e){return he.call(n,e)}var me=/\S/;function be(n){return!ye(me,n)}var ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Ae(n){return String(n).replace(/[&<>"'`=\/]/g,function(t){return ve[t]})}var We=/\s*/,we=/\s+/,$=/\s*=/,Se=/\s*\}/,Pe=/#|\^|\/|>|\{|&|=|!/;function Ce(n,e){if(!n)return[];var t=!1,r=[],o=[],a=[],s=!1,i=!1,l="",c=0;function d(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var y,b,x;function L(A){if(typeof A=="string"&&(A=A.split(we,2)),!E(A)||A.length!==2)throw new Error("Invalid tags: "+A);y=new RegExp(G(A[0])+"\\s*"),b=new RegExp("\\s*"+G(A[1])),x=new RegExp("\\s*"+G("}"+A[1]))}L(e||h.tags);for(var p=new V(n),v,u,m,T,B,W;!p.eos();){if(v=p.pos,m=p.scanUntil(y),m)for(var I=0,se=m.length;I<se;++I)T=m.charAt(I),be(T)?(a.push(o.length),l+=T):(i=!0,t=!0,l+=" "),o.push(["text",T,v,v+1]),v+=1,T===`
`&&(d(),l="",c=0,t=!1);if(!p.scan(y))break;if(s=!0,u=p.scan(Pe)||"name",p.scan(We),u==="="?(m=p.scanUntil($),p.scan($),p.scanUntil(b)):u==="{"?(m=p.scanUntil(x),p.scan(Se),p.scanUntil(b),u="&"):m=p.scanUntil(b),!p.scan(b))throw new Error("Unclosed tag at "+p.pos);if(u==">"?B=[u,m,v,p.pos,l,c,t]:B=[u,m,v,p.pos],c++,o.push(B),u==="#"||u==="^")r.push(B);else if(u==="/"){if(W=r.pop(),!W)throw new Error('Unopened section "'+m+'" at '+v);if(W[1]!==m)throw new Error('Unclosed section "'+W[1]+'" at '+v)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&L(m)}if(d(),W=r.pop(),W)throw new Error('Unclosed section "'+W[1]+'" at '+p.pos);return Le(Ee(o))}function Ee(n){for(var e=[],t,r,o=0,a=n.length;o<a;++o)t=n[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(e.push(t),r=t));return e}function Le(n){for(var e=[],t=e,r=[],o,a,s=0,i=n.length;s<i;++s)switch(o=n[s],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:e;break;default:t.push(o)}return e}function V(n){this.string=n,this.tail=n,this.pos=0}V.prototype.eos=function(){return this.tail===""};V.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};V.prototype.scanUntil=function(e){var t=this.tail.search(e),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function C(n,e){this.view=n,this.cache={".":this.view},this.parent=e}C.prototype.push=function(e){return new C(e,this)};C.prototype.lookup=function(e){var t=this.cache,r;if(t.hasOwnProperty(e))r=t[e];else{for(var o=this,a,s,i,l=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=O(a,s[i])||ge(a,s[i])),a=a[s[i++]];else a=o.view[e],l=O(o.view,e);if(l){r=a;break}o=o.parent}t[e]=r}return D(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||h.tags).join(":"),a=typeof r<"u",s=a?r.get(o):void 0;return s==null&&(s=Ce(e,t),a&&r.set(o,s)),s};g.prototype.render=function(e,t,r,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=t instanceof C?t:new C(t,void 0);return this.renderTokens(s,i,r,e,o)};g.prototype.renderTokens=function(e,t,r,o,a){for(var s="",i,l,c,d=0,y=e.length;d<y;++d)c=void 0,i=e[d],l=i[0],l==="#"?c=this.renderSection(i,t,r,o,a):l==="^"?c=this.renderInverted(i,t,r,o,a):l===">"?c=this.renderPartial(i,t,r,a):l==="&"?c=this.unescapedValue(i,t):l==="name"?c=this.escapedValue(i,t,a):l==="text"&&(c=this.rawValue(i)),c!==void 0&&(s+=c);return s};g.prototype.renderSection=function(e,t,r,o,a){var s=this,i="",l=t.lookup(e[1]);function c(b){return s.render(b,t,r,a)}if(l){if(E(l))for(var d=0,y=l.length;d<y;++d)i+=this.renderTokens(e[4],t.push(l[d]),r,o,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],t.push(l),r,o,a);else if(D(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,o.slice(e[3],e[5]),c),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],t,r,o,a);return i}};g.prototype.renderInverted=function(e,t,r,o,a){var s=t.lookup(e[1]);if(!s||E(s)&&s.length===0)return this.renderTokens(e[4],t,r,o,a)};g.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!r)&&(a[s]=o+a[s]);return a.join(`
`)};g.prototype.renderPartial=function(e,t,r,o){if(r){var a=this.getConfigTags(o),s=D(r)?r(e[1]):r[e[1]];if(s!=null){var i=e[6],l=e[5],c=e[4],d=s;l==0&&c&&(d=this.indentPartial(s,c,i));var y=this.parse(d,a);return this.renderTokens(y,t,r,d,o)}}};g.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||h.escape,a=t.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===h.escape?String(a):o(a)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return E(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!E(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(n){M.templateCache=n},get templateCache(){return M.templateCache}},M=new g;h.clearCache=function(){return M.clearCache()};h.parse=function(e,t){return M.parse(e,t)};h.render=function(e,t,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+de(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,t,r,o)};h.escape=Ae;h.Scanner=V;h.Context=C;h.Writer=g;class re{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const r of this.getUsedVariables().values())t.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of t)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const r of e){const o=r[0],a=r[1],s=r[4];["name","&","#","^"].includes(o)&&t.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,t)}}}async function Te(){var n;const e=await te();for(const t of e){const r=(n=t.properties)!==null&&n!==void 0?n:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const a=new re(o.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await q(t.name,o.name,s),a.onChange(async i=>{await q(t.name,o.name,i)})}}}async function Me(){var n;const e=await k();for(const[t,r]of e.entries())if(r.type!=="objectgroup"){const o=(n=r.properties)!==null&&n!==void 0?n:[];for(const a of o){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new re(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();z(t,a.name,i),s.onChange(l=>{z(t,a.name,l)})}}}async function q(n,e,t){console.log(n),(await WA.room.area.get(n)).setProperty(e,t)}function z(n,e,t){WA.room.setProperty(n,e,t),e==="visible"&&(t?WA.room.showLayer(n):WA.room.hideLayer(n))}const ke="https://admin.workadventu.re/html";let j,N=0,_=0;function K(n){if(WA.state[n.name]){let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function Ve(n){const e=n.properties.getString("openSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=ae(n.properties.mustGetString("openLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function xe(n){const e=n.properties.getString("closeSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=ae(n.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function oe(n){return n.map(e=>j.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ae(n){const e=oe(n),t=ne(e),r=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(N-r,2)+Math.pow(_-o,2))}function Be(n){WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]?Ve(n):xe(n),K(n)}),K(n)}function Y(n,e,t,r){const o=n.name;let a,s,i=!1;const l=t.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const d=!!l;function y(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,b()}})}function b(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function x(){let u;if(n.type==="tilelayer")u=ne(oe(e.properties.mustGetString("closeLayer").split(`
`)));else{if(n.x===void 0||n.y===void 0||n.width===void 0||n.height===void 0)throw new Error(`Doorstep zone "${n.name}" is missing x, y, width or height`);u={top:n.y,left:n.x,right:n.x+n.width,bottom:n.y+n.height}}s=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function L(){s&&(WA.room.website.delete(s.name),s=void 0)}function p(){if(i=!0,t.getBoolean("autoOpen")&&c){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(d&&!c||!d)&&(t.getString("code")||t.getString("codeVariable"))){x();return}c&&(WA.state[e.name]?y():b())}function v(){i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),L()}n.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&L(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&b())})}function Ie(n){const e=n.properties.mustGetString("bellSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=Math.sqrt(Math.pow(n.x-N,2)+Math.pow(n.y-_,2));if(o>t)return;r=1-o/t}WA.sound.loadSound(e).play({volume:r})}function Re(n){WA.state[n.name]===void 0&&(WA.state[n.name]=0),WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]&&Ie(n)})}function H(n,e,t){let r;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const a=t.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;o?r=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const a=t.name;WA.room.area.onEnter(a).subscribe(()=>{var s;o?r=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.area.onLeave(a).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function Ge(n){n=n??ke;const e=await le();j=await k();for(const t of e.values())t.properties.get("door")&&Be(t),t.properties.get("bell")&&Re(t);for(const t of j.values()){const r=new P(t.properties),o=r.getString("doorVariable");if(o&&t.type==="tilelayer"){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');Y(t,s,r,n)}const a=r.getString("bellVariable");a&&t.type==="tilelayer"&&H(a,r,t)}for(const t of await te()){const r=new P(t.properties),o=r.getString("doorVariable");if(o){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');Y(t,s,r,n)}const a=r.getString("bellVariable");a&&H(a,r,t)}WA.player.onPlayerMove(t=>{N=t.x,_=t.y})}function je(n,e){const t=n.getString("bindVariable");if(t){const r=n.get("enterValue"),o=n.get("leaveValue"),a=n.getString("triggerMessage"),s=n.getString("tag");De(t,e,r,o,a,s)}}function De(n,e,t,r,o,a){a&&!WA.player.tags.includes(a)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[n]=t)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[n]=r}))}async function Ne(){const n=await k();for(const e of n.values()){const t=new P(e.properties);je(t,e.name)}}let X;async function _e(n){const e=await WA.room.getTiledMap();n=n??F,X=await k();const t=e.layers.find(r=>r.name==="configuration");if(t){const o=new P(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(n+"/configuration.html",!0)});for(const a of X.values()){const s=new P(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&Ue(i.split(","),a.name,s)}}}function Ue(n,e,t){let r;const o=t.getString("openConfigAdminTag");let a=!0;o&&!WA.player.tags.includes(o)&&(a=!1);function s(){var l;r&&r.remove(),r=WA.ui.displayActionMessage({message:(l=t.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>U(n)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=t.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():U(n))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function Oe(){return WA.onInit().then(()=>{Ge().catch(n=>console.error(n)),Ne().catch(n=>console.error(n)),_e().catch(n=>console.error(n)),Me().catch(n=>console.error(n)),Te().catch(n=>console.error(n))}).catch(n=>console.error(n))}function $e(){let n=0;const e=3e3;WA.chat.open(),WA.chat.sendChatMessage("Tapez '/applause' ou '/booing' dans le chat !"),WA.chat.onChatMessage(s=>{const i=Date.now(),l=s.toLowerCase(),c=Date.now();WA.player.state.role==="audience"&&((l==="/applause"||l==="/booing")&&i-n<=e?WA.state.saveVariable("soundState",`combined-${c}`):l==="/applause"?WA.state.saveVariable("soundState",`applause-${c}`):l==="/booing"&&WA.state.saveVariable("soundState",`booing-${c}`)),n=i});const t=WA.sound.loadSound("reactions/clap-clap.ogg"),r=WA.sound.loadSound("reactions/booing.ogg"),o=WA.sound.loadSound("reactions/applause-and-boo.ogg"),a={volume:.5,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};WA.state.onVariableChange("soundState").subscribe(s=>{const i=s,[l]=i.split("-");l==="applause"?t.play(a):l==="booing"?r.play(a):l==="combined"&&o.play(a)})}console.log("Script started successfully");let S,f;const J="twitch-channel";function qe(){WA.nav.closeCoWebSite()}async function ze(){await WA.onInit(),console.log("Scripting API ready"),await Oe(),console.log("Scripting API Extra ready"),await He(2e3);let n=Ye("comedian");await WA.players.configureTracking({players:!0,movement:!0}),console.log(n);const e=WA.players.list();for(const t of e)t.state.role==="comedian"?n++:t.state.role;console.log(Array.from(e)),WA.players.onPlayerEnters.subscribe(t=>{t.state.role==="comedian"?n++:t.state.role}),WA.players.onPlayerLeaves.subscribe(t=>{t.state.role==="comedian"?n--:t.state.role}),console.log(n),n<=1&&(WA.player.state.role!="comedian"||WA.player.state.role!="audience")&&WA.ui.openPopup("chooseRole","Choose your role",[{label:"Comedian",className:"primary",callback:t=>{WA.player.state.saveVariable("role","comedian",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),n++,console.log(n),t.close(),WA.chat.open(),WA.chat.sendChatMessage("👉 Type your Twitch channel for people to watch you live! 👈"),WA.chat.onChatMessage(r=>{WA.player.state.saveVariable(J,r.trim(),{public:!0,persist:!0,ttl:24*3600,scope:"world"})})}},{label:"Audience",className:"primary",callback:t=>{WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),t.close()}}]),WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),WA.room.area.onEnter("start").subscribe(()=>{console.log("start"),WA.room.area.onEnter("start").subscribe(()=>{console.log("start"),Q(WA.player);const t=setInterval(()=>{Q(WA.player)},100);setTimeout(()=>{clearInterval(t)},1e3)})}),WA.state.onVariableChange("start_stream").subscribe(t=>{const o=`https://player.twitch.tv/?channel=${WA.state.twitch}&parent=play.workadventu.re`;WA.nav.openCoWebSite(o,!0)}),WA.room.area.onEnter("spectacle").subscribe(()=>{if(WA.player.state.role==="comedian")WA.ui.openPopup("before","You have 5 seconds to start your show",[{label:"Start",className:"primary",callback:t=>{WA.state.twitch=WA.player.state.loadVariable(J),WA.state.start_stream=!0,WA.player.state.saveVariable("comedianPassed",!0,{public:!0,persist:!0,ttl:24*3600,scope:"world"}),t.close();let r=5,o;const a=setInterval(()=>{o&&o.close(),o=Xe(r),r--,r===0&&(setTimeout(()=>{o&&o.close(),qe()},1e3),clearInterval(a))},2e3)}}]);else{let t=WA.ui.openPopup("before","Get lost you shouldn't be here",[]);setTimeout(()=>{t.close()},2e3)}}),WA.room.area.onLeave("spectacle").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("vote").subscribe(()=>{console.log("vote"),Ke()}),WA.room.area.onLeave("start").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("gateauxPopup").subscribe(()=>{WA.player.state.role==="comedian"&&WA.ui.openPopup("idPassage",WA.player.playerId.toString(),[{label:"Copy",className:"primary",callback:t=>{navigator.clipboard.writeText(WA.player.playerId.toString()),t.close()}}])}),WA.room.area.onEnter("toilettePopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to use WC",callback:()=>{S=WA.ui.openPopup("toilettePopup","5",[])}})}),WA.room.area.onLeave("toilettePopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("gateauxPopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to eat the cake",callback:()=>{S=WA.ui.openPopup("gateauxPopup","7",[])}})}),WA.room.area.onLeave("gateauxPopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("dehorePopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to brezze",callback:()=>{S=WA.ui.openPopup("dehorePopup","A",[])}})}),WA.room.area.onLeave("dehorePopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("clock").subscribe(()=>{const t="https://player.twitch.tv/?channel=loic_z&parent=play.workadventu.re";WA.nav.openCoWebSite(t,!0)}),console.log(WA.player.state.role),WA.room.area.onEnter("Scene").subscribe(()=>{WA.player.state.role==="audience"&&(console.log("PLAY SOUND !!"),$e())}),WA.room.area.onLeave("clock").subscribe(w),WA.room.area.onLeave("gateauxPopup").subscribe(w),WA.room.area.onLeave("toilettePopup").subscribe(w),WA.room.area.onLeave("dehorePopup").subscribe(w),WA.room.area.onLeave("start").subscribe(w),WA.room.area.onLeave("Started").subscribe(w)}ze().catch(console.error);function Q(n){WA.player.state.role==="audience"?WA.player.moveTo(491.69,274.14,10):WA.player.state.role==="comedian"&&WA.player.moveTo(684.47,159.18,10)}function Ke(){const n=WA.players.list();let e=0;for(const t of n)t.state.role==="comedian"&&t.state.comedianPassed===!0&&e++;e===2&&WA.ui.openPopup("before","Vote for the best comedian",[{label:"Player 1",className:"primary",callback:t=>{t.close()}},{label:"Player 2",className:"primary",callback:t=>{t.close()}}])}function Ye(n){let e=0;const t=WA.players.list();for(const r of t)r.state.role===n&&e++;return e}function He(n){return new Promise(e=>setTimeout(e,n))}function w(){S!==void 0&&(S.close(),S=void 0)}function Xe(n){return WA.ui.openPopup("before",`You have ${n} seconds left`,[])}
