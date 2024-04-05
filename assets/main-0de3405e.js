class P{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const n=this.get(e);if(n!==void 0){if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}getType(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const F="https://unpkg.com/@workadventure/scripting-api-extra@1.7.4/dist";class ie{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new P(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(r){const e=r?"#"+r.join():"";WA.nav.openCoWebSite(F+"/configuration.html"+e,!0)}async function le(r,e){const t=await WA.room.getTiledMap(),n=new Map;return Z(t.layers,n,r,e),n}function Z(r,e,t,n){for(const o of r)if(o.type==="objectgroup"){for(const a of o.objects)if(a.type==="variable"||a.class==="variable"){if(t&&o.name!==t||n&&!n.includes(a.name))continue;e.set(a.name,new ie(a))}}else o.type==="group"&&Z(o.layers,e,t,n)}let R;async function k(){return R===void 0&&(R=ce()),R}async function ce(){return ue(await WA.room.getTiledMap())}function ue(r){const e=new Map;return ee(r.layers,"",e),e}function ee(r,e,t){for(const n of r)n.type==="group"?ee(n.layers,e+n.name+"/",t):(n.name=e+n.name,t.set(n.name,n))}async function te(){const r=await k(),e=[];for(const t of r.values())if(t.type==="objectgroup")for(const n of t.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function pe(r){let e=1/0,t=1/0,n=0,o=0;const a=r.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<r.height;s++)for(let i=0;i<r.width;i++)a[i+s*r.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,s),n=Math.max(n,s));return{top:t,left:e,right:o+1,bottom:n+1}}function re(r){let e=1/0,t=1/0,n=0,o=0;for(const a of r){const s=pe(a);s.left<e&&(e=s.left),s.top<t&&(t=s.top),s.right>o&&(o=s.right),s.bottom>n&&(n=s.bottom)}return{top:t,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var fe=Object.prototype.toString,E=Array.isArray||function(e){return fe.call(e)==="[object Array]"};function _(r){return typeof r=="function"}function de(r){return E(r)?"array":typeof r}function G(r){return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(r,e){return r!=null&&typeof r=="object"&&e in r}function ge(r,e){return r!=null&&typeof r!="object"&&r.hasOwnProperty&&r.hasOwnProperty(e)}var he=RegExp.prototype.test;function ye(r,e){return he.call(r,e)}var me=/\S/;function be(r){return!ye(me,r)}var ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Ae(r){return String(r).replace(/[&<>"'`=\/]/g,function(t){return ve[t]})}var We=/\s*/,we=/\s+/,$=/\s*=/,Se=/\s*\}/,Pe=/#|\^|\/|>|\{|&|=|!/;function Ce(r,e){if(!r)return[];var t=!1,n=[],o=[],a=[],s=!1,i=!1,l="",c=0;function d(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var y,b,x;function L(A){if(typeof A=="string"&&(A=A.split(we,2)),!E(A)||A.length!==2)throw new Error("Invalid tags: "+A);y=new RegExp(G(A[0])+"\\s*"),b=new RegExp("\\s*"+G(A[1])),x=new RegExp("\\s*"+G("}"+A[1]))}L(e||h.tags);for(var p=new V(r),v,u,m,T,B,W;!p.eos();){if(v=p.pos,m=p.scanUntil(y),m)for(var I=0,se=m.length;I<se;++I)T=m.charAt(I),be(T)?(a.push(o.length),l+=T):(i=!0,t=!0,l+=" "),o.push(["text",T,v,v+1]),v+=1,T===`
`&&(d(),l="",c=0,t=!1);if(!p.scan(y))break;if(s=!0,u=p.scan(Pe)||"name",p.scan(We),u==="="?(m=p.scanUntil($),p.scan($),p.scanUntil(b)):u==="{"?(m=p.scanUntil(x),p.scan(Se),p.scanUntil(b),u="&"):m=p.scanUntil(b),!p.scan(b))throw new Error("Unclosed tag at "+p.pos);if(u==">"?B=[u,m,v,p.pos,l,c,t]:B=[u,m,v,p.pos],c++,o.push(B),u==="#"||u==="^")n.push(B);else if(u==="/"){if(W=n.pop(),!W)throw new Error('Unopened section "'+m+'" at '+v);if(W[1]!==m)throw new Error('Unclosed section "'+W[1]+'" at '+v)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&L(m)}if(d(),W=n.pop(),W)throw new Error('Unclosed section "'+W[1]+'" at '+p.pos);return Le(Ee(o))}function Ee(r){for(var e=[],t,n,o=0,a=r.length;o<a;++o)t=r[o],t&&(t[0]==="text"&&n&&n[0]==="text"?(n[1]+=t[1],n[3]=t[3]):(e.push(t),n=t));return e}function Le(r){for(var e=[],t=e,n=[],o,a,s=0,i=r.length;s<i;++s)switch(o=r[s],o[0]){case"#":case"^":t.push(o),n.push(o),t=o[4]=[];break;case"/":a=n.pop(),a[5]=o[2],t=n.length>0?n[n.length-1][4]:e;break;default:t.push(o)}return e}function V(r){this.string=r,this.tail=r,this.pos=0}V.prototype.eos=function(){return this.tail===""};V.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};V.prototype.scanUntil=function(e){var t=this.tail.search(e),n;switch(t){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=n.length,n};function C(r,e){this.view=r,this.cache={".":this.view},this.parent=e}C.prototype.push=function(e){return new C(e,this)};C.prototype.lookup=function(e){var t=this.cache,n;if(t.hasOwnProperty(e))n=t[e];else{for(var o=this,a,s,i,l=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=O(a,s[i])||ge(a,s[i])),a=a[s[i++]];else a=o.view[e],l=O(o.view,e);if(l){n=a;break}o=o.parent}t[e]=n}return _(n)&&(n=n.call(this.view)),n};function g(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,t){var n=this.templateCache,o=e+":"+(t||h.tags).join(":"),a=typeof n<"u",s=a?n.get(o):void 0;return s==null&&(s=Ce(e,t),a&&n.set(o,s)),s};g.prototype.render=function(e,t,n,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=t instanceof C?t:new C(t,void 0);return this.renderTokens(s,i,n,e,o)};g.prototype.renderTokens=function(e,t,n,o,a){for(var s="",i,l,c,d=0,y=e.length;d<y;++d)c=void 0,i=e[d],l=i[0],l==="#"?c=this.renderSection(i,t,n,o,a):l==="^"?c=this.renderInverted(i,t,n,o,a):l===">"?c=this.renderPartial(i,t,n,a):l==="&"?c=this.unescapedValue(i,t):l==="name"?c=this.escapedValue(i,t,a):l==="text"&&(c=this.rawValue(i)),c!==void 0&&(s+=c);return s};g.prototype.renderSection=function(e,t,n,o,a){var s=this,i="",l=t.lookup(e[1]);function c(b){return s.render(b,t,n,a)}if(l){if(E(l))for(var d=0,y=l.length;d<y;++d)i+=this.renderTokens(e[4],t.push(l[d]),n,o,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],t.push(l),n,o,a);else if(_(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,o.slice(e[3],e[5]),c),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],t,n,o,a);return i}};g.prototype.renderInverted=function(e,t,n,o,a){var s=t.lookup(e[1]);if(!s||E(s)&&s.length===0)return this.renderTokens(e[4],t,n,o,a)};g.prototype.indentPartial=function(e,t,n){for(var o=t.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!n)&&(a[s]=o+a[s]);return a.join(`
`)};g.prototype.renderPartial=function(e,t,n,o){if(n){var a=this.getConfigTags(o),s=_(n)?n(e[1]):n[e[1]];if(s!=null){var i=e[6],l=e[5],c=e[4],d=s;l==0&&c&&(d=this.indentPartial(s,c,i));var y=this.parse(d,a);return this.renderTokens(y,t,n,d,o)}}};g.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(n!=null)return n};g.prototype.escapedValue=function(e,t,n){var o=this.getConfigEscape(n)||h.escape,a=t.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===h.escape?String(a):o(a)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return E(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!E(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(r){M.templateCache=r},get templateCache(){return M.templateCache}},M=new g;h.clearCache=function(){return M.clearCache()};h.parse=function(e,t){return M.parse(e,t)};h.render=function(e,t,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+de(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,t,n,o)};h.escape=Ae;h.Scanner=V;h.Context=C;h.Writer=g;class ne{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const n of this.getUsedVariables().values())t.push(this.state.onVariableChange(n).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of t)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const n of e){const o=n[0],a=n[1],s=n[4];["name","&","#","^"].includes(o)&&t.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,t)}}}async function Te(){var r;const e=await te();for(const t of e){const n=(r=t.properties)!==null&&r!==void 0?r:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const a=new ne(o.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await q(t.name,o.name,s),a.onChange(async i=>{await q(t.name,o.name,i)})}}}async function Me(){var r;const e=await k();for(const[t,n]of e.entries())if(n.type!=="objectgroup"){const o=(r=n.properties)!==null&&r!==void 0?r:[];for(const a of o){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new ne(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();z(t,a.name,i),s.onChange(l=>{z(t,a.name,l)})}}}async function q(r,e,t){console.log(r),(await WA.room.area.get(r)).setProperty(e,t)}function z(r,e,t){WA.room.setProperty(r,e,t),e==="visible"&&(t?WA.room.showLayer(r):WA.room.hideLayer(r))}const ke="https://admin.workadventu.re/html";let j,D=0,N=0;function K(r){if(WA.state[r.name]){let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function Ve(r){const e=r.properties.getString("openSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=ae(r.properties.mustGetString("openLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function xe(r){const e=r.properties.getString("closeSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=ae(r.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function oe(r){return r.map(e=>j.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ae(r){const e=oe(r),t=re(e),n=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(D-n,2)+Math.pow(N-o,2))}function Be(r){WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]?Ve(r):xe(r),K(r)}),K(r)}function Y(r,e,t,n){const o=r.name;let a,s,i=!1;const l=t.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const d=!!l;function y(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,b()}})}function b(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=t.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function x(){let u;if(r.type==="tilelayer")u=re(oe(e.properties.mustGetString("closeLayer").split(`
`)));else{if(r.x===void 0||r.y===void 0||r.width===void 0||r.height===void 0)throw new Error(`Doorstep zone "${r.name}" is missing x, y, width or height`);u={top:r.y,left:r.x,right:r.x+r.width,bottom:r.y+r.height}}s=WA.room.website.create({name:"doorKeypad"+o,url:n+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function L(){s&&(WA.room.website.delete(s.name),s=void 0)}function p(){if(i=!0,t.getBoolean("autoOpen")&&c){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(d&&!c||!d)&&(t.getString("code")||t.getString("codeVariable"))){x();return}c&&(WA.state[e.name]?y():b())}function v(){i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),L()}r.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&L(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&b())})}function Ie(r){const e=r.properties.mustGetString("bellSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=Math.sqrt(Math.pow(r.x-D,2)+Math.pow(r.y-N,2));if(o>t)return;n=1-o/t}WA.sound.loadSound(e).play({volume:n})}function Re(r){WA.state[r.name]===void 0&&(WA.state[r.name]=0),WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]&&Ie(r)})}function H(r,e,t){let n;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const a=t.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[r]=WA.state[r]+1}}]):WA.state[r]=WA.state[r]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const a=t.name;WA.room.area.onEnter(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[r]=WA.state[r]+1}}]):WA.state[r]=WA.state[r]+1}),WA.room.area.onLeave(a).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function Ge(r){r=r??ke;const e=await le();j=await k();for(const t of e.values())t.properties.get("door")&&Be(t),t.properties.get("bell")&&Re(t);for(const t of j.values()){const n=new P(t.properties),o=n.getString("doorVariable");if(o&&t.type==="tilelayer"){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');Y(t,s,n,r)}const a=n.getString("bellVariable");a&&t.type==="tilelayer"&&H(a,n,t)}for(const t of await te()){const n=new P(t.properties),o=n.getString("doorVariable");if(o){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');Y(t,s,n,r)}const a=n.getString("bellVariable");a&&H(a,n,t)}WA.player.onPlayerMove(t=>{D=t.x,N=t.y})}function je(r,e){const t=r.getString("bindVariable");if(t){const n=r.get("enterValue"),o=r.get("leaveValue"),a=r.getString("triggerMessage"),s=r.getString("tag");_e(t,e,n,o,a,s)}}function _e(r,e,t,n,o,a){a&&!WA.player.tags.includes(a)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[r]=t)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[r]=n}))}async function De(){const r=await k();for(const e of r.values()){const t=new P(e.properties);je(t,e.name)}}let X;async function Ne(r){const e=await WA.room.getTiledMap();r=r??F,X=await k();const t=e.layers.find(n=>n.name==="configuration");if(t){const o=new P(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(r+"/configuration.html",!0)});for(const a of X.values()){const s=new P(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&Ue(i.split(","),a.name,s)}}}function Ue(r,e,t){let n;const o=t.getString("openConfigAdminTag");let a=!0;o&&!WA.player.tags.includes(o)&&(a=!1);function s(){var l;n&&n.remove(),n=WA.ui.displayActionMessage({message:(l=t.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>U(r)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=t.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():U(r))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function Oe(){return WA.onInit().then(()=>{Ge().catch(r=>console.error(r)),De().catch(r=>console.error(r)),Ne().catch(r=>console.error(r)),Me().catch(r=>console.error(r)),Te().catch(r=>console.error(r))}).catch(r=>console.error(r))}function $e(){let r=0;const e=3e3;WA.chat.open(),WA.chat.sendChatMessage("Tapez '/applause' ou '/booing' dans le chat !"),WA.chat.onChatMessage(s=>{const i=Date.now(),l=s.toLowerCase(),c=Date.now();WA.player.state.role==="audience"&&((l==="/applause"||l==="/booing")&&i-r<=e?WA.state.saveVariable("soundState",`combined-${c}`):l==="/applause"?WA.state.saveVariable("soundState",`applause-${c}`):l==="/booing"&&WA.state.saveVariable("soundState",`booing-${c}`)),r=i});const t=WA.sound.loadSound("reactions/clap-clap.ogg"),n=WA.sound.loadSound("reactions/booing.ogg"),o=WA.sound.loadSound("reactions/applause-and-boo.ogg"),a={volume:.5,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};WA.state.onVariableChange("soundState").subscribe(s=>{const i=s,[l]=i.split("-");l==="applause"?t.play(a):l==="booing"?n.play(a):l==="combined"&&o.play(a)})}console.log("Script started successfully");let S,f;const J="twitch-channel";function qe(){WA.nav.closeCoWebSite()}async function ze(){await WA.onInit(),console.log("Scripting API ready"),await Oe(),console.log("Scripting API Extra ready"),await He(2e3);let r=Ye("comedian");await WA.players.configureTracking({players:!0,movement:!0}),console.log(r);const e=WA.players.list();for(const t of e)t.state.role==="comedian"?r++:t.state.role;console.log(Array.from(e)),WA.players.onPlayerEnters.subscribe(t=>{t.state.role==="comedian"?r++:t.state.role}),WA.players.onPlayerLeaves.subscribe(t=>{t.state.role==="comedian"?r--:t.state.role}),console.log(r),r<=1&&(WA.player.state.role!="comedian"||WA.player.state.role!="audience")&&WA.ui.openPopup("chooseRole","Choose your role",[{label:"Comedian",className:"primary",callback:t=>{WA.player.state.saveVariable("role","comedian",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),r++,console.log(r),t.close(),WA.chat.open(),WA.chat.sendChatMessage("👉 Type your Twitch channel for people to watch you live! 👈"),WA.chat.onChatMessage(n=>{WA.player.state.saveVariable(J,n.trim(),{public:!0,persist:!0,ttl:24*3600,scope:"world"})})}},{label:"Audience",className:"primary",callback:t=>{WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),t.close()}}]),WA.player.state.saveVariable("role","audience",{public:!0,persist:!0,ttl:24*3600,scope:"world"}),WA.room.area.onEnter("start").subscribe(()=>{console.log("start"),WA.room.area.onEnter("start").subscribe(()=>{console.log("start"),Q(WA.player);const t=setInterval(()=>{Q(WA.player)},100);setTimeout(()=>{clearInterval(t)},1e3)})}),WA.state.onVariableChange("start_stream").subscribe(t=>{console.log("start_stream",t);const o=`https://player.twitch.tv/?channel=${WA.player.state.loadVariable(J)}&parent=play.workadventu.re`;WA.nav.openCoWebSite(o,!0)}),WA.room.area.onEnter("spectacle").subscribe(()=>{if(WA.player.state.role==="comedian")WA.ui.openPopup("before","You have 5 seconds to start your show",[{label:"Start",className:"primary",callback:t=>{WA.state.start_stream=!0,WA.player.state.saveVariable("comedianPassed",!0,{public:!0,persist:!0,ttl:24*3600,scope:"world"}),t.close();let n=5,o;const a=setInterval(()=>{o&&o.close(),o=Xe(n),n--,n===0&&(setTimeout(()=>{o&&o.close(),qe()},1e3),clearInterval(a))},2e3)}}]);else{let t=WA.ui.openPopup("before","Get lost you shouldn't be here",[]);setTimeout(()=>{t.close()},2e3)}}),WA.room.area.onLeave("spectacle").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("vote").subscribe(()=>{console.log("vote"),Ke()}),WA.room.area.onLeave("start").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("gateauxPopup").subscribe(()=>{WA.player.state.role==="comedian"&&WA.ui.openPopup("idPassage",WA.player.playerId.toString(),[{label:"Copy",className:"primary",callback:t=>{navigator.clipboard.writeText(WA.player.playerId.toString()),t.close()}}])}),WA.room.area.onEnter("toilettePopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to use WC",callback:()=>{S=WA.ui.openPopup("toilettePopup","5",[])}})}),WA.room.area.onLeave("toilettePopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("gateauxPopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to eat the cake",callback:()=>{S=WA.ui.openPopup("gateauxPopup","7",[])}})}),WA.room.area.onLeave("gateauxPopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("dehorePopup").subscribe(()=>{f=WA.ui.displayActionMessage({type:"message",message:"Press SPACE to brezze",callback:()=>{S=WA.ui.openPopup("dehorePopup","A",[])}})}),WA.room.area.onLeave("dehorePopup").subscribe(()=>{f!==void 0&&(f.remove(),f=void 0)}),WA.room.area.onEnter("clock").subscribe(()=>{const t="https://player.twitch.tv/?channel=loic_z&parent=play.workadventu.re";WA.nav.openCoWebSite(t,!0)}),console.log(WA.player.state.role),WA.room.area.onEnter("Scene").subscribe(()=>{WA.player.state.role==="audience"&&(console.log("PLAY SOUND !!"),$e())}),WA.room.area.onLeave("clock").subscribe(w),WA.room.area.onLeave("gateauxPopup").subscribe(w),WA.room.area.onLeave("toilettePopup").subscribe(w),WA.room.area.onLeave("dehorePopup").subscribe(w),WA.room.area.onLeave("start").subscribe(w),WA.room.area.onLeave("Started").subscribe(w)}ze().catch(console.error);function Q(r){WA.player.state.role==="audience"?WA.player.moveTo(491.69,274.14,10):WA.player.state.role==="comedian"&&WA.player.moveTo(684.47,159.18,10)}function Ke(){const r=WA.players.list();let e=0;for(const t of r)t.state.role==="comedian"&&t.state.comedianPassed===!0&&e++;e===2&&WA.ui.openPopup("before","Vote for the best comedian",[{label:"Player 1",className:"primary",callback:t=>{t.close()}},{label:"Player 2",className:"primary",callback:t=>{t.close()}}])}function Ye(r){let e=0;const t=WA.players.list();for(const n of t)n.state.role===r&&e++;return e}function He(r){return new Promise(e=>setTimeout(e,r))}function w(){S!==void 0&&(S.close(),S=void 0)}function Xe(r){return WA.ui.openPopup("before",`You have ${r} seconds left`,[])}