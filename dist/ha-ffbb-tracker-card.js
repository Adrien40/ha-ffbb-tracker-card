var ve=globalThis,xe=ve.ShadowRoot&&(ve.ShadyCSS===void 0||ve.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),pt=new WeakMap,ne=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(xe&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=pt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&pt.set(t,e))}return e}toString(){return this.cssText}},mt=n=>new ne(typeof n=="string"?n:n+"",void 0,Fe),re=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((o,a,r)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+n[r+1],n[0]);return new ne(t,n,Fe)},ft=(n,e)=>{if(xe)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let o=document.createElement("style"),a=ve.litNonce;a!==void 0&&o.setAttribute("nonce",a),o.textContent=t.cssText,n.appendChild(o)}},Ve=xe?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return mt(t)})(n):n;var{is:$o,defineProperty:wo,getOwnPropertyDescriptor:ko,getOwnPropertyNames:Ao,getOwnPropertySymbols:Co,getPrototypeOf:So}=Object,I=globalThis,_t=I.trustedTypes,Mo=_t?_t.emptyScript:"",Eo=I.reactiveElementPolyfillSupport,se=(n,e)=>n,He={toAttribute(n,e){switch(e){case Boolean:n=n?Mo:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},bt=(n,e)=>!$o(n,e),gt={attribute:!0,type:String,converter:He,reflect:!1,useDefault:!1,hasChanged:bt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);var z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=gt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),a=this.getPropertyDescriptor(e,o,t);a!==void 0&&wo(this.prototype,e,a)}}static getPropertyDescriptor(e,t,o){let{get:a,set:r}=ko(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:a,set(s){let d=a?.call(this);r?.call(this,s),this.requestUpdate(e,d,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??gt}static _$Ei(){if(this.hasOwnProperty(se("elementProperties")))return;let e=So(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(se("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(se("properties"))){let t=this.properties,o=[...Ao(t),...Co(t)];for(let a of o)this.createProperty(a,t[a])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,a]of t)this.elementProperties.set(o,a)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let a=this._$Eu(t,o);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let a of o)t.unshift(Ve(a))}else e!==void 0&&t.push(Ve(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,o);if(a!==void 0&&o.reflect===!0){let r=(o.converter?.toAttribute!==void 0?o.converter:He).toAttribute(t,o.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){let o=this.constructor,a=o._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let r=o.getPropertyOptions(a),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:He;this._$Em=a;let d=s.fromAttribute(t,r.type);this[a]=d??this._$Ej?.get(a)??d,this._$Em=null}}requestUpdate(e,t,o,a=!1,r){if(e!==void 0){let s=this.constructor;if(a===!1&&(r=this[e]),o??(o=s.getPropertyOptions(e)),!((o.hasChanged??bt)(r,t)||o.useDefault&&o.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:a,wrapped:r},s){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,r]of this._$Ep)this[a]=r;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[a,r]of o){let{wrapped:s}=r,d=this[a];s!==!0||this._$AL.has(a)||d===void 0||this.C(a,void 0,r,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[se("elementProperties")]=new Map,z[se("finalized")]=new Map,Eo?.({ReactiveElement:z}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");var le=globalThis,vt=n=>n,ye=le.trustedTypes,xt=ye?ye.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ct="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+U,Oo=`<${St}>`,V=document,ce=()=>V.createComment(""),de=n=>n===null||typeof n!="object"&&typeof n!="function",Xe=Array.isArray,No=n=>Xe(n)||typeof n?.[Symbol.iterator]=="function",je=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yt=/-->/g,$t=/>/g,B=RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,kt=/"/g,Mt=/^(?:script|style|textarea|title)$/i,Ye=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=Ye(1),Wo=Ye(2),Jo=Ye(3),H=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),At=new WeakMap,F=V.createTreeWalker(V,129);function Et(n,e){if(!Xe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(e):e}var Lo=(n,e)=>{let t=n.length-1,o=[],a,r=e===2?"<svg>":e===3?"<math>":"",s=ie;for(let d=0;d<t;d++){let l=n[d],u,p,i=-1,c=0;for(;c<l.length&&(s.lastIndex=c,p=s.exec(l),p!==null);)c=s.lastIndex,s===ie?p[1]==="!--"?s=yt:p[1]!==void 0?s=$t:p[2]!==void 0?(Mt.test(p[2])&&(a=RegExp("</"+p[2],"g")),s=B):p[3]!==void 0&&(s=B):s===B?p[0]===">"?(s=a??ie,i=-1):p[1]===void 0?i=-2:(i=s.lastIndex-p[2].length,u=p[1],s=p[3]===void 0?B:p[3]==='"'?kt:wt):s===kt||s===wt?s=B:s===yt||s===$t?s=ie:(s=B,a=void 0);let f=s===B&&n[d+1].startsWith("/>")?" ":"";r+=s===ie?l+Oo:i>=0?(o.push(u),l.slice(0,i)+Ct+l.slice(i)+U+f):l+U+(i===-2?d:f)}return[Et(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},he=class n{constructor({strings:e,_$litType$:t},o){let a;this.parts=[];let r=0,s=0,d=e.length-1,l=this.parts,[u,p]=Lo(e,t);if(this.el=n.createElement(u,o),F.currentNode=this.el.content,t===2||t===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(a=F.nextNode())!==null&&l.length<d;){if(a.nodeType===1){if(a.hasAttributes())for(let i of a.getAttributeNames())if(i.endsWith(Ct)){let c=p[s++],f=a.getAttribute(i).split(U),k=/([.?@])?(.*)/.exec(c);l.push({type:1,index:r,name:k[2],strings:f,ctor:k[1]==="."?Ke:k[1]==="?"?Ge:k[1]==="@"?We:J}),a.removeAttribute(i)}else i.startsWith(U)&&(l.push({type:6,index:r}),a.removeAttribute(i));if(Mt.test(a.tagName)){let i=a.textContent.split(U),c=i.length-1;if(c>0){a.textContent=ye?ye.emptyScript:"";for(let f=0;f<c;f++)a.append(i[f],ce()),F.nextNode(),l.push({type:2,index:++r});a.append(i[c],ce())}}}else if(a.nodeType===8)if(a.data===St)l.push({type:2,index:r});else{let i=-1;for(;(i=a.data.indexOf(U,i+1))!==-1;)l.push({type:7,index:r}),i+=U.length-1}r++}}static createElement(e,t){let o=V.createElement("template");return o.innerHTML=e,o}};function W(n,e,t=n,o){if(e===H)return e;let a=o!==void 0?t._$Co?.[o]:t._$Cl,r=de(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),r===void 0?a=void 0:(a=new r(n),a._$AT(n,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=a:t._$Cl=a),a!==void 0&&(e=W(n,a._$AS(n,e.values),a,o)),e}var qe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,a=(e?.creationScope??V).importNode(t,!0);F.currentNode=a;let r=F.nextNode(),s=0,d=0,l=o[0];for(;l!==void 0;){if(s===l.index){let u;l.type===2?u=new ue(r,r.nextSibling,this,e):l.type===1?u=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(u=new Je(r,this,e)),this._$AV.push(u),l=o[++d]}s!==l?.index&&(r=F.nextNode(),s++)}return F.currentNode=V,a}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},ue=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),de(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):No(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,a=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=he.createElement(Et(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===a)this._$AH.p(t);else{let r=new qe(a,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=At.get(e.strings);return t===void 0&&At.set(e.strings,t=new he(e)),t}k(e){Xe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,a=0;for(let r of e)a===t.length?t.push(o=new n(this.O(ce()),this.O(ce()),this,this.options)):o=t[a],o._$AI(r),a++;a<t.length&&(this._$AR(o&&o._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=vt(e).nextSibling;vt(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,a,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(e,t=this,o,a){let r=this.strings,s=!1;if(r===void 0)e=W(this,e,t,0),s=!de(e)||e!==this._$AH&&e!==H,s&&(this._$AH=e);else{let d=e,l,u;for(e=r[0],l=0;l<r.length-1;l++)u=W(this,d[o+l],t,l),u===H&&(u=this._$AH[l]),s||(s=!de(u)||u!==this._$AH[l]),u===m?e=m:e!==m&&(e+=(u??"")+r[l+1]),this._$AH[l]=u}s&&!a&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ke=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}},Ge=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}},We=class extends J{constructor(e,t,o,a,r){super(e,t,o,a,r),this.type=5}_$AI(e,t=this){if((e=W(this,e,t,0)??m)===H)return;let o=this._$AH,a=e===m&&o!==m||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==m&&(o===m||a);a&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Je=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}};var Do=le.litHtmlPolyfillSupport;Do?.(he,ue),(le.litHtmlVersions??(le.litHtmlVersions=[])).push("3.3.3");var Ot=(n,e,t)=>{let o=t?.renderBefore??e,a=o._$litPart$;if(a===void 0){let r=t?.renderBefore??null;o._$litPart$=a=new ue(e.insertBefore(ce(),r),r,void 0,t??{})}return a._$AI(n),a};var pe=globalThis,D=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ot(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};D._$litElement$=!0,D.finalized=!0,pe.litElementHydrateSupport?.({LitElement:D});var To=pe.litElementPolyfillSupport;To?.({LitElement:D});(pe.litElementVersions??(pe.litElementVersions=[])).push("4.2.2");var me="0.2.8";var fe={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_form:!0,show_venue:!0,show_watermark:!0};var C="/local/community/ha-ffbb-tracker-card/brand/icon.png";function S(n){return(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function Dt(n,e){if(!n||!e)return null;let t=n.match(/^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/),o=t?`sensor.${t[2]}_`:n.substring(0,n.lastIndexOf("_")+1),a=t?`binary_sensor.${t[2]}_`:o.replace("sensor.","binary_sensor."),r=s=>{for(let d of s)if(e[d])return e[d];return null};return{nextOpponent:r([`${o}prochain_match_adversaire`,`${o}next_match_opponent`]),nextDate:r([`${o}prochain_match_date`,`${o}next_match_date`]),nextLocation:r([`${o}prochain_match_lieu`,`${o}next_match_location`]),nextVenue:r([`${o}prochain_match_terrain`,`${o}next_match_venue_type`]),lastScore:r([`${o}dernier_match_score`,`${o}last_match_score`]),lastOpponent:r([`${o}dernier_match_adversaire`,`${o}last_match_opponent`]),lastResult:r([`${o}dernier_match_resultat`,`${o}last_match_result`]),lastDate:r([`${o}dernier_match_date`,`${o}last_match_date`]),poule:r([`${o}poule`]),rank:r([`${o}classement`,`${o}rank`]),rankEvolution:r([`${o}classement_evolution`,`${o}rank_evolution`]),form:r([`${o}forme_recente`,`${o}form`]),matchInProgress:r([`${a}match_en_cours`,`${a}match_in_progress`])}}function $e(n,e){let t=S(e||"");if(!t)return()=>!1;let o=(Array.isArray(n)?n:[]).some(a=>{let r=S(a||"");return!!r&&r===t});return a=>{let r=S(a||"");return r?o?r===t:r.includes(t)||t.includes(r):!1}}function zo(n,e){if(!n||!Array.isArray(e))return null;let t=S(n);if(!t)return null;let o=e.find(a=>{if(!a)return!1;let r=a.team_name||a.name,s=S(r);return!!(s&&s===t)});return o||(o=e.find(a=>{if(!a)return!1;let r=a.team_name||a.name,s=S(r);return!!(s&&(s.includes(t)||t.includes(s)))})),o?o.position:null}function X(n,e){if(n==null||n===""||isNaN(Number(n)))return null;let t=parseInt(n,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let o=t%10,a=t%100;return o===1&&a!==11?`${t}st`:o===2&&a!==12?`${t}nd`:o===3&&a!==13?`${t}rd`:`${t}th`}function Ze(n,e,t){if(!Array.isArray(e))return null;let o=S(n);if(!o)return null;let a=e.find(r=>{let s=S(r?.team_name||r?.name||"");return!!(s&&s===o)});if(a||(a=e.find(r=>{let s=S(r?.team_name||r?.name||"");return!!(s&&(s.includes(o)||o.includes(s)))})),!a)return null;for(let r of t)if(a[r]){let s=j(a[r]);if(s)return s}return null}function Qe(n,e){let t=n?.poule?.attributes?.calendar||n?.poule?.attributes?.matches||n?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let o=n?.nextDate?.attributes?.calendar||n?.nextDate?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let a=n?.rank?.attributes?.calendar||n?.rank?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function j(n){if(!n||typeof n!="string")return null;let e=n.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function Nt(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ro(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=new Date(o);a.setDate(a.getDate()+2);let r=e.getTime();return r>=t.getTime()&&r<a.getTime()}function Po(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=new Date(o);return a.setDate(a.getDate()-1),e.getTime()>=a.getTime()}function Io({defaultView:n="auto",manualView:e=null,isLive:t=!1,lastDate:o=null,hasLastScore:a=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:d=!1,now:l=new Date}={}){return t||!r?!1:e!==null?e==="last":n==="next"?!1:n==="last"?!(!a||d&&Po(s,l)):!!(a&&Ro(o,l))}function Tt(n){return Array.isArray(n)?[...n].sort((e,t)=>{let o=a=>{let r=parseInt(a?.position??a?.rank,10);return isNaN(r)?999:r};return o(e)-o(t)}):[]}function Uo(n,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(n,e):null}var Bo=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function _e(n,e=Uo){if(typeof n!="string")return!1;let t=n.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let o=e("color",t);return typeof o=="boolean"?o:Bo.test(t)}function Fo(n){let e=n?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&_e(n?.custom_accent_color)?n.custom_accent_color.trim():"#ff6b00"}function zt(n,e){if(n==="12"||n==="am_pm")return!0;if(n==="24"||n==="twenty_four")return!1;let t=n==="system"?void 0:e;try{let o=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof o.hour12=="boolean"?o.hour12:o.hourCycle==="h12"||o.hourCycle==="h11"}catch{return!1}}function et(n,e="en-US",{hour12:t}={}){if(!n||n==="unknown"||n==="unavailable")return null;let o=new Date(n);if(isNaN(o.getTime()))return null;let a=o.toLocaleDateString(e,{weekday:"short"}),r=o.toLocaleDateString(e,{day:"numeric",month:"short"}),s=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},d=o.toLocaleTimeString(e,s);return{weekday:a,day:r,time:d}}function Lt({isHome:n=!0,isMyTeam:e=n,teamName:t="",entities:o={},opponentSensor:a=null,selectedEntity:r=null}={}){let s=(d,l)=>{if(!d||typeof d!="object")return null;for(let u of l)if(d[u]){let p=j(d[u]);if(p)return p}return null};if(e){let d=s(a?.attributes,["team_url","url_equipe","team_link"]);if(d)return d;let l=[r,o?.nextDate,o?.lastDate,o?.rank];for(let i of l){let c=s(i?.attributes,["team_url","url_equipe","team_link"]);if(c)return c}let u=o?.rank?.attributes?.standings||r?.attributes?.standings,p=Ze(t,u,["team_url","url","link"]);if(p)return p}else{let d=s(a?.attributes,["opponent_url","opponent_team_url","opponent_link","url_adversaire"]);if(d)return d;let l=o?.rank?.attributes?.standings||r?.attributes?.standings,u=Ze(t,l,["team_url","url","link"]);if(u)return u}return null}function we({teamName:n="",matchLogo:e=null,isMyTeam:t=!1,myTeamLogo:o=null,nextOpponentState:a=null,nextOpponentLogo:r=null,lastOpponentState:s=null,lastOpponentLogo:d=null,standings:l=null}={}){let u=j(e);if(u)return u;if(t&&o&&o!==C)return o;let p=S(n);if(!p)return C;let i=S(a||"");if(i&&(i===p||i.includes(p)||p.includes(i))){let f=j(r);if(f)return f}let c=S(s||"");if(c&&(c===p||c.includes(p)||p.includes(c))){let f=j(d);if(f)return f}if(Array.isArray(l)&&l.length>0){let f=Ze(n,l,["team_logo_url","opponent_logo_url","logo_url","logo","url_logo","team_logo","club_logo","crest"]);if(f)return f}return t&&o?o:C}function Rt({entities:n={},config:e={},manualView:t=null,matchIndex:o=null,states:a={},lang:r="fr",locale:s=null,hour12:d=void 0,t:l=(i,c="")=>c,isPreview:u=!1,now:p=new Date}={}){let i=y=>!!(y&&y!=="unknown"&&y!=="unavailable"),c=!!(n.matchInProgress&&n.matchInProgress.state==="on"),f=n.lastScore?.state,k=i(f),E=n.nextDate?.state,A=i(E),N=k||i(n.lastOpponent?.state)||i(n.lastDate?.state),T=A||i(n.nextOpponent?.state),M=e.entity&&a?a[e.entity]:null,b=Qe(n,M),$=Array.isArray(b)&&b.length>0,w=-1,v=-1;if($){for(let y=b.length-1;y>=0;y--)if(b[y].is_played||b[y].score){w=y;break}v=b.findIndex(y=>!y.is_played&&!y.score)}let Z=Io({defaultView:e.default_match_view||"auto",manualView:t,isLive:c,lastDate:n.lastDate?.state,hasLastScore:k,hasLastMatch:N,nextDate:E,hasNextMatch:A,now:p}),x;typeof o=="number"&&$?x=Math.max(0,Math.min(o,b.length-1)):t==="last"?x=w!==-1?w:0:t==="next"?x=v!==-1?v:Math.max(0,b.length-1):Z?x=w!==-1?w:0:x=v!==-1?v:0;let _=typeof o=="number"&&$&&!!b[x]?b[x]:null,L=_?!!(_.is_played||_.score):Z,Ht=!c&&($&&b.length>1||N&&T),jt=$&&b.length>1?x>0:!L,qt=$&&b.length>1?x<b.length-1:L,Kt=!L&&!c&&(_?!!(_.date&&Nt(_.date,p)):A&&Nt(E,p)),Q=n.poule?.attributes?.team||"",at=e.custom_team_name?.trim(),q=at||Q||l("card.unknown_team","My team"),g,K,R,ee,te,Ce,Se,Me,Ee,oe,Oe,Ne,P=L?n.lastOpponent:n.nextOpponent,ae=P?.state;if(_){let y=_.home_team||"",be=_.away_team||"";g=_.is_home!==void 0?_.is_home:S(y)===S(Q||q),K=g?be:y,R=K;let G=Be=>n[Be]?.attributes,bo=G("nextOpponent")?.team_logo_url||G("lastOpponent")?.team_logo_url||G("nextDate")?.team_logo_url||G("lastDate")?.team_logo_url||null,vo=n.rank?.attributes?.standings,dt=(Be,xo,yo)=>we({teamName:Be,matchLogo:xo,isMyTeam:yo,myTeamLogo:bo,nextOpponentState:n.nextOpponent?.state,nextOpponentLogo:G("nextOpponent")?.opponent_logo_url,lastOpponentState:n.lastOpponent?.state,lastOpponentLogo:G("lastOpponent")?.opponent_logo_url,standings:vo}),ht=dt(y,_.home_logo||_.home_team_logo||_.logo_domicile,g),ut=dt(be,_.away_logo||_.away_team_logo||_.logo_exterieur,!g);ee=g?ht:ut,te=g?ut:ht,Ce=j(_.home_url),Se=j(_.away_url),Me=_.gym_name||"",Ee=_.gym_city||"",oe=_.date||null,Oe=String(_.round??_.journee??""),Ne=!!_.is_stale}else{K=i(ae)?ae:l("card.unknown_opponent","Opponent"),R=i(ae)?ae:"",g=L?n.lastScore?.attributes?.is_home??n.lastDate?.attributes?.is_home??!0:n.nextVenue?.state==="home"||n.nextOpponent?.attributes?.is_home===!0,ee=P?.attributes?.team_logo_url||C,te=P?.attributes?.opponent_logo_url||C;let y=Q||q,be=g?y:R,ct=g?R:y;Ce=Lt({isHome:g,teamName:be,entities:n,opponentSensor:P,selectedEntity:M}),Se=Lt({isHome:!g,teamName:ct,entities:n,opponentSensor:P,selectedEntity:M}),Oe=L?n.lastDate?.attributes?.round||"":n.nextDate?.attributes?.round||"",Me=n.nextLocation?.attributes?.gym_name||n.nextOpponent?.attributes?.gym_name||"",Ee=n.nextLocation?.attributes?.gym_city||n.nextOpponent?.attributes?.gym_city||"",oe=L?n.lastDate?.state:n.nextDate?.state,Ne=!!n.nextDate?.attributes?.is_stale}let Gt=g?q:K,Wt=g?K:q,Jt=g?ee:te,Xt=g?te:ee,Le=Q||q,Yt=g?Le:R,Zt=g?R:Le,Qt=g?e.entity:P?.entity_id,eo=g?P?.entity_id:e.entity,to=n.poule?.attributes?.competition||"",oo=n.poule?.state||"",ao=et(oe,s||r,{hour12:d}),nt=n.form?.attributes?.current_streak||"",De=n.form?.state,ge=i(De),no=ge?De:u?"V-V-D-V-N":"",ro=ge?nt:u?"2V":"",so=e.show_form&&(ge||u),io=e.show_title!==!1,rt=e.title?.trim(),Te=l("card.default_title","Next match");c?Te=l("card.live_title","Live match"):L&&(Te=l("card.last_title","Last match"));let lo=rt||Te,co=e.icon!==void 0?e.icon:"mdi:basketball",ho=`logo-box-${e.logo_size||"medium"}`,st=e.show_rank!==!1,ze=n.rank?.state,it=i(ze)?ze:null,lt=zo(R,n.rank?.attributes?.standings),Re=X(it,r),Pe=X(lt,r),Ie=g?Re:Pe,Ue=g?Pe:Re;u&&st&&(Ie||(Ie=X(g?2:5,r)),Ue||(Ue=X(g?5:2,r)));let uo=!c&&!L&&!!oe,po=e.logo_click_action&&e.logo_click_action!=="none",mo=Array.isArray(n.rank?.attributes?.standings)&&n.rank.attributes.standings.length>0,fo=Fo(e),_o=_?.score||n.lastScore?.state||"-",go=_?.result||n.lastResult?.state||"draw";return{isValidState:i,isLive:c,lastScoreState:f,hasLastScore:k,nextDateState:E,hasNextMatch:A,hasLastMatchData:N,hasNextMatchData:T,canToggleView:Ht,canGoPrev:jt,canGoNext:qt,currentIndex:x,hasCalendar:$,calendarMatches:b,displayedScore:_o,displayedResult:go,isPostMatch:L,isGameDay:Kt,currentOpponentSensor:P,officialTeamName:Q,configuredTeamName:at,teamName:q,rawOpponent:ae,opponentName:K,opponentSearchName:R,isHome:g,teamLogoUrl:ee,opponentLogoUrl:te,leftName:Gt,rightName:Wt,leftLogo:Jt,rightLogo:Xt,searchTeamName:Le,leftMatchName:Yt,rightMatchName:Zt,leftUrl:Ce,rightUrl:Se,leftEntityId:Qt,rightEntityId:eo,competition:to,pouleName:oo,roundNumber:Oe,gymName:Me,gymCity:Ee,targetDateStr:oe,dateFormatted:ao,formStreak:nt,formSequence:De,hasValidForm:ge,isPreview:u,displayFormSequence:no,displayFormStreak:ro,showFormBlock:so,showTitle:io,configuredTitle:rt,titleText:lo,titleIcon:co,logoSizeClass:ho,showRank:st,rawUserRank:ze,userRankNum:it,opponentRankNum:lt,userRankFormatted:Re,opponentRankFormatted:Pe,leftRank:Ie,rightRank:Ue,isCalendarClickable:uo,isLogoClickable:po,hasStandingsData:mo,accentColor:fo,isStale:Ne}}var Pt={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var It={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var Ut={fr:Pt,en:It};function ke(n){return(n?.locale?.language||n?.language||"en").substring(0,2).toLowerCase()}function Y(n){return Ut[n]||Ut.en}function Ae(n,e,t=""){if(!n||!e)return t;let o=e.split("."),a=n;for(let r of o){if(!a||typeof a!="object"||!(r in a))return t;a=a[r]}return typeof a=="string"?a:t}var Bt=re`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
  }
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 16px 0 16px;
    font-size: 1.7em;
    font-weight: 600;
    line-height: 1.2;
    color: var(--ha-card-header-color, --primary-text-color);
  }
  .card-header ha-icon {
    --mdc-icon-size: 28px;
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .card-header-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-warning {
    padding: 16px;
    color: var(--warning-color, #ffa600);
  }
  .container {
    position: relative;
    padding: 14px 16px;
  }
  .watermark {
    position: absolute;
    top: -10%;
    width: 60%;
    max-width: 210px;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
    border-radius: 24%;
    -webkit-mask-image: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0) 70%
    );
    mask-image: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 1) 20%,
      rgba(0, 0, 0, 0) 70%
    );
  }
  .watermark-left {
    left: -7%;
  }
  .watermark-right {
    right: -7%;
  }
  .header {
    text-align: center;
    margin-bottom: 12px;
    position: relative;
    z-index: 1;
    color: var(--secondary-text-color);
  }
  .header-main {
    font-size: 0.92em;
    font-weight: 500;
    line-height: 1.3;
  }
  .header .poule {
    margin-left: 4px;
  }
  .header-round {
    margin-top: 3px;
    font-size: 0.95em;
    font-weight: 600;
    opacity: 0.85;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .header-round.clickable-round {
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.06));
    transition: background 0.15s ease, color 0.15s ease;
  }
  .header-round.clickable-round:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.16));
    color: var(--primary-text-color);
  }
  .round-cal-icon {
    --mdc-icon-size: 15px;
    color: var(--ffbb-accent-color, #ff6b00);
    transition: filter 0.15s ease;
  }
  .header-round.clickable-round:hover .round-cal-icon {
    filter: brightness(1.35);
  }
  .match-area {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: start;
    position: relative;
    z-index: 1;
    margin: 4px 0 6px;
    row-gap: 6px;
  }
  .team-logo-cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cell-left {
    grid-column: 1;
    grid-row: 1;
  }
  .cell-right {
    grid-column: 3;
    grid-row: 1;
  }
  .center-meta-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 14px;
  }
  .center-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    position: relative;
    text-align: center;
    user-select: none;
    padding: 4px 8px;
    border-radius: 12px;
    transition: background-color 0.15s ease, transform 0.15s ease;
  }
  .nav-chevron {
    cursor: pointer;
    --mdc-icon-size: 22px;
    color: var(--secondary-text-color);
    opacity: 0.6;
    transition: transform 0.15s ease, opacity 0.15s ease, color 0.15s ease;
    position: absolute;
  }
  .nav-chevron-left {
    left: -8px;
  }
  .nav-chevron-right {
    right: -8px;
  }
  .nav-chevron:hover:not(.disabled) {
    opacity: 1;
    color: var(--ffbb-accent-color, #ff6b00);
    transform: scale(1.2);
  }
  .nav-chevron.disabled {
    opacity: 0.12;
    cursor: default;
    pointer-events: none;
  }
  .team-name-cell {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 0 4px;
  }
  .name-left {
    grid-column: 1;
    grid-row: 2;
  }
  .name-right {
    grid-column: 3;
    grid-row: 2;
  }
  .team-title {
    font-size: 1em;
    font-weight: 600;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
  }
  .team-rank-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }
  .rank-left {
    grid-column: 1;
    grid-row: 3;
  }
  .rank-right {
    grid-column: 3;
    grid-row: 3;
  }
  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 20px;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9em;
    font-weight: 700;
    padding: 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.10);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #ffffff;
    line-height: 1;
    transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }
  .rank-badge.rank-gold {
    background: rgba(255, 215, 0, 0.12);
    border: 1.5px solid #f1b815;
    color: #ffd043;
    box-shadow: 0 0 6px rgba(241, 184, 21, 0.25);
  }
  .rank-badge.rank-silver {
    background: rgba(220, 227, 235, 0.12);
    border: 1.5px solid #c0c7d0;
    color: #e2e8f0;
    box-shadow: 0 0 6px rgba(192, 199, 208, 0.2);
  }
  .rank-badge.rank-bronze {
    background: rgba(205, 127, 50, 0.12);
    border: 1.5px solid #cd7f32;
    color: #e0944d;
    box-shadow: 0 0 6px rgba(205, 127, 50, 0.2);
  }
  .rank-badge.rank-solid {
    border: none;
    background: rgba(255, 255, 255, 0.18);
    color: #ffffff;
  }
  .rank-badge.rank-solid.rank-gold {
    background: linear-gradient(135deg, #ffd753 0%, #d49809 50%, #f5c430 100%);
    color: #1a1a1a;
    box-shadow: 0 2px 6px rgba(212, 152, 9, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
  }
  .rank-badge.rank-solid.rank-silver {
    background: linear-gradient(135deg, #f0f3f6 0%, #9aa6b2 50%, #dce2e8 100%);
    color: #1a1a1a;
    box-shadow: 0 2px 6px rgba(154, 166, 178, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.6);
  }
  .rank-badge.rank-solid.rank-bronze {
    background: linear-gradient(135deg, #e89b5c 0%, #a8581a 50%, #d98642 100%);
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(168, 88, 26, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.35);
  }
  .rank-badge.clickable-badge {
    cursor: pointer;
  }
  .rank-badge.clickable-badge:hover {
    transform: scale(1.08);
  }
  .rank-badge:not(.rank-solid):not(.rank-gold):not(.rank-silver):not(.rank-bronze).clickable-badge:hover {
    background: var(--ffbb-accent-color, #ff6b00);
    border-color: var(--ffbb-accent-color, #ff6b00);
    color: #ffffff;
  }
  .rank-badge:not(.rank-solid).rank-gold.clickable-badge:hover {
    background: rgba(255, 215, 0, 0.24);
    box-shadow: 0 0 10px rgba(241, 184, 21, 0.45);
  }
  .rank-badge:not(.rank-solid).rank-silver.clickable-badge:hover {
    background: rgba(220, 227, 235, 0.24);
    box-shadow: 0 0 10px rgba(192, 199, 208, 0.4);
  }
  .rank-badge:not(.rank-solid).rank-bronze.clickable-badge:hover {
    background: rgba(205, 127, 50, 0.24);
    box-shadow: 0 0 10px rgba(205, 127, 50, 0.4);
  }
  .rank-badge.rank-solid.clickable-badge:hover {
    filter: brightness(1.15);
  }
  .rank-badge.rank-solid:not(.rank-gold):not(.rank-silver):not(.rank-bronze).clickable-badge:hover {
    background: var(--ffbb-accent-color, #ff6b00);
    color: #ffffff;
  }
  .logo-box {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
    margin-bottom: 0;
    box-sizing: border-box;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .logo-box-small {
    width: 56px;
    height: 56px;
    border-radius: 11px;
    padding: 4px;
  }
  .logo-box-medium {
    width: 72px;
    height: 72px;
    border-radius: 14px;
    padding: 6px;
  }
  .logo-box-large {
    width: 104px;
    height: 104px;
    border-radius: 20px;
    padding: 8px;
  }
  .logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  .match-day {
    font-size: 1.05em;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: capitalize;
    transition: color 0.15s ease;
  }
  .match-time {
    font-size: 1.7em;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1.15;
    margin-top: 2px;
    transition: color 0.15s ease;
  }
  .score-display {
    font-size: 2em;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.92em;
    font-weight: 800;
    padding: 5px 14px;
    border-radius: 13px;
    text-transform: uppercase;
    margin-top: 6px;
    line-height: 1;
    letter-spacing: 0.6px;
  }
  .badge-live {
    background-color: var(--error-color, #db4437);
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    line-height: 1.1;
    box-shadow: 0 0 10px rgba(219, 68, 55, 0.45);
  }
  .live-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #ffffff;
    display: inline-block;
    animation: live-pulse 1.4s infinite ease-in-out;
  }
  @keyframes live-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(0.75);
    }
  }
  .live-clock {
    font-size: 0.9em;
    font-weight: 600;
    color: var(--secondary-text-color);
    margin-top: 5px;
    text-align: center;
    letter-spacing: 0.2px;
  }
  .badge-gameday {
    background-color: rgba(255, 107, 0, 0.12);
    border: 1.5px solid var(--ffbb-accent-color, #ff6b00);
    color: var(--ffbb-accent-color, #ff6b00);
    animation: gamedayPulse 2.5s infinite ease-in-out;
  }
  @keyframes gamedayPulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 0 rgba(255, 107, 0, 0);
    }
    50% {
      opacity: 0.85;
      box-shadow: 0 0 10px rgba(255, 107, 0, 0.35);
    }
  }
  .badge-win {
    background-color: #2e7d32;
    color: #ffffff;
  }
  .badge-loss {
    background-color: #c62828;
    color: #ffffff;
  }
  .badge-draw {
    background-color: #616161;
    color: #ffffff;
  }
  .badge-postponed {
    background-color: #ef6c00;
    color: #ffffff;
  }
  .badge-gameday,
  .badge-postponed {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    white-space: nowrap;
  }
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }
  .footer-form {
    margin: 10px 0 12px;
    text-align: center;
    font-size: 0.95em;
    color: var(--secondary-text-color);
    position: relative;
    z-index: 1;
    transition: color 0.15s ease;
  }
  .footer-form.clickable:hover {
    color: var(--primary-text-color);
  }
  .footer-form.clickable:hover .form-sequence {
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .form-label {
    margin-right: 0;
  }
  .form-sequence {
    font-weight: 700;
    letter-spacing: 2px;
    transition: color 0.15s ease;
  }
  .form-streak {
    margin-left: 0;
    opacity: 0.85;
  }
  .form-preview-tag {
    margin-left: 4px;
    opacity: 0.6;
  }
  .footer-venue {
    border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
    padding-top: 10px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85em;
    position: relative;
    z-index: 1;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .venue-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .venue-info ha-icon {
    --mdc-icon-size: 16px;
  }
  .clickable {
    cursor: pointer;
  }
  .header-round:focus-visible,
  .logo-box:focus-visible,
  .nav-chevron:focus-visible,
  .center-meta:focus-visible,
  .rank-badge:focus-visible,
  .footer-form:focus-visible,
  .footer-venue:focus-visible,
  .modal-close-btn:focus-visible,
  .modal-body:focus-visible,
  .calendar-row:focus-visible {
    outline: 2px solid var(--ffbb-accent-color, #ff6b00);
    outline-offset: 2px;
  }
  .logo-box.clickable:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
  }
  .center-meta.clickable:hover {
    background-color: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }
  .center-meta.clickable:hover .match-day {
    color: var(--primary-text-color);
  }
  .center-meta.clickable:hover .match-time {
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .center-meta.clickable:active {
    transform: scale(0.97);
  }
  .footer-venue.clickable:hover .venue-text {
    text-decoration: underline;
    color: var(--primary-text-color);
  }
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(2px);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    animation: fadeIn 0.2s ease;
  }
  .modal-card {
    background: var(--card-background-color, #1c1c1e);
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    border-radius: 16px;
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  .modal-card:focus {
    outline: none;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
  }
  .modal-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 1.05em;
    color: var(--primary-text-color);
  }
  .modal-title ha-icon {
    color: var(--ffbb-accent-color, #ff6b00);
    --mdc-icon-size: 20px;
  }
  .modal-close-btn {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s ease;
  }
  .modal-close-btn:hover {
    opacity: 1;
  }
  .modal-subtitle {
    padding: 2px 16px 4px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .modal-body {
    padding: 4px 16px 12px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }
  .modal-body::-webkit-scrollbar {
    width: 5px;
  }
  .modal-body::-webkit-scrollbar-track {
    background: transparent;
  }
  .modal-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .modal-body::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.35);
  }
  .standings-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85em;
  }
  .standings-table th {
    text-align: center;
    padding: 6px 4px;
    color: var(--secondary-text-color);
    font-weight: 600;
    border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  }
  .standings-table td {
    padding: 4px 4px;
    text-align: center;
  }
  .standings-table .col-team {
    text-align: left;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .standings-table .pos-cell {
    font-weight: 700;
  }
  .standings-table .pts-cell {
    font-weight: 700;
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .standings-table tr.highlight-row {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
    font-weight: 700;
  }
  .form-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-top: 14px;
  }
  .form-badges-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .form-badge-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 14px;
    min-width: 68px;
    min-height: 72px;
    box-sizing: border-box;
  }
  .pill-char {
    font-size: 2.0em;
    font-weight: 800;
    line-height: 1;
  }
  .pill-label {
    font-size: 0.9em;
    font-weight: 600;
    margin-top: 4px;
    text-transform: capitalize;
  }
  .form-streak-box {
    font-size: 0.9em;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
    padding: 6px 14px;
    border-radius: 20px;
  }
  .streak-val {
    color: var(--primary-text-color);
    margin-left: 0;
  }
  .calendar-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .calendar-row {
    display: grid;
    grid-template-columns: 36px 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 5px 8px;
    min-height: 44px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease, transform 0.1s ease;
    border-left: 3px solid transparent;
  }
  .calendar-row:hover {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.12));
    transform: translateX(2px);
  }
  .calendar-row.highlight-row {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
    border-left: 3px solid rgba(255, 255, 255, 0.18);
  }
  .calendar-row.next-match-row {
    border-left: 3px solid var(--ffbb-accent-color, #ff6b00);
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.12));
  }
  .calendar-col-round {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }
  .cal-round-tag {
    font-size: 0.78em;
    font-weight: 700;
    color: var(--secondary-text-color);
    line-height: 1;
  }
  .cal-venue-pill {
    font-size: 0.65em;
    font-weight: 800;
    padding: 1px 3px;
    border-radius: 4px;
    line-height: 1;
    letter-spacing: 0.5px;
  }
  .pill-dom {
    background: rgba(46, 125, 50, 0.2);
    color: #81c784;
  }
  .pill-ext {
    background: rgba(255, 255, 255, 0.08);
    color: var(--secondary-text-color);
  }
  .calendar-col-teams {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }
  .cal-team-line {
    display: flex;
    align-items: center;
    gap: 6px;
    overflow: hidden;
  }
  .cal-mini-logo {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    object-fit: contain;
    flex-shrink: 0;
    background: #ffffff;
    padding: 1px;
    box-sizing: border-box;
  }
  .cal-team {
    font-size: 0.84em;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cal-team.my-team-text {
    font-weight: 700;
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .calendar-col-meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    text-align: right;
    min-width: 58px;
  }
  .cal-score {
    font-weight: 800;
    font-size: 1.15em;
    color: var(--primary-text-color);
    line-height: 1;
    letter-spacing: 0.5px;
  }
  .cal-date {
    font-size: 0.76em;
    color: var(--secondary-text-color);
    line-height: 1.2;
  }
  .cal-time {
    font-size: 0.76em;
    font-weight: 600;
    line-height: 1.2;
  }
  .modal-empty-text {
    text-align: center;
    padding: 16px;
    color: var(--secondary-text-color);
    font-style: italic;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;var tt=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return re`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=Y("fr")}setConfig(e){this._config={entity:"",...fe,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ke(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=Y(t))}}_t(e,t=""){return Ae(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!_e(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},o=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of o)s in t||(t[s]="");let a={...this._config,...t},r=new CustomEvent("config-changed",{detail:{config:a},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return h``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${me}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",tt);var ot=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=Y("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...fe}}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:9}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...fe,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,o=String(t??"").trim();e!=="custom"||!o||_e(o)||this._warnedAccentColor!==o&&(this._warnedAccentColor=o,console.warn(`[FFBB Tracker Card] custom_accent_color "${o}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ke(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=Y(t))}}_t(e,t=""){return Ae(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none"||this._config?.disable_podium_colors)return"";let o=String(e).trim().match(/^(\d+)/);if(!o)return"";let a=parseInt(o[1],10);return a===1?"rank-gold":a===2?"rank-silver":a===3?"rank-bronze":""}_resolveEntities(){return Dt(this._config.entity,this.hass?.states)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:zt(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:o}=this._localeInfo();return et(e,t,{hour12:o})}_openMaps(e,t){let o=encodeURIComponent(`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${o}`,"_blank","noreferrer")}_openCalendar(e,t,o,a,r){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let d=new Date(s.getTime()+7200*1e3),l=f=>f.toISOString().replace(/[-:]|\.\d{3}/g,""),u=`${t} vs ${o}`,p=`${a} ${r}`.trim(),i=`FFBB match: ${t} vs ${o}`,c=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(u)}&dates=${l(s)}/${l(d)}&details=${encodeURIComponent(i)}&location=${encodeURIComponent(p)}`;window.open(c,"_blank","noreferrer")}_handleLogoClick(e,t,o){let a=this._config.logo_click_action||"team_url";a==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${o}".`),e&&this._fireMoreInfo(e)):a==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let o=this._modalTrigger;this._modalTrigger=null,o&&o.isConnected&&typeof o.focus=="function"&&o.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let o=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(o.length===0){e.preventDefault(),t.focus();return}let a=o[0],r=o[o.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===a||s===t)?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),a.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let o=e==="prev"?t.currentIndex-1:t.currentIndex+1;if(o>=0&&o<t.calendarMatches.length){this._matchIndex=o;let a=t.calendarMatches[o];this._manualView=a.is_played||a.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,t){this._matchIndex=e,this._manualView=t?"last":"next",this._closeModal()}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return Qe(e,t)}_renderModal(e,t,o){if(!this._activeModal)return h``;if(this._activeModal==="standings"){let a=e.rank?.attributes?.standings||[],r=Tt(a),s=e.poule?.attributes?.competition||"",d=e.poule?.state||"",l=r.map(i=>i.team_name||i.name||""),u=$e(l,t),p=$e(l,o);return h`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${i=>i.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:format-list-numbered"></ha-icon>
                <span>${this._t("card.standings_title","Standings")} ${d?`\u2022 ${d}`:""}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close","Close")}
              ></ha-icon>
            </div>
            ${s?h`<div class="modal-subtitle">${s}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${r.length>0?h`
                    <table class="standings-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th class="col-team">${this._t("card.table_team","Team")}</th>
                          <th>${this._t("card.table_pts","Pts")}</th>
                          <th>${this._t("card.table_played","J")}</th>
                          <th>${this._t("card.table_wins","G")}</th>
                          <th>${this._t("card.table_losses","P")}</th>
                          <th>${this._t("card.table_draws","N")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${r.map(i=>{let c=i.team_name||i.name||"",f=u(c)||p(c);return h`
                            <tr class=${f?"highlight-row":""}>
                              <td class="pos-cell">${i.position||i.rank||"-"}</td>
                              <td class="col-team">${i.team_name||i.name||"-"}</td>
                              <td class="pts-cell">${i.points??i.pts??"-"}</td>
                              <td>${i.played??i.joues??"-"}</td>
                              <td>${i.wins??i.won??i.gagnes??"-"}</td>
                              <td>${i.losses??i.lost??i.perdus??"-"}</td>
                              <td>${i.draws??i.nuls??i.nul??i.n??"-"}</td>
                            </tr>
                          `})}
                      </tbody>
                    </table>
                  `:h`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings","No standings data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="form"){let a=e.form?.state,r=a&&a!=="unknown"&&a!=="unavailable",s=r?a:"",d=r&&e.form?.attributes?.current_streak||"",l=s.split("-").filter(Boolean);return h`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${u=>u.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
                <span>${this._t("card.form_title","Recent form details")}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close","Close")}
              ></ha-icon>
            </div>
            <div class="modal-body form-modal-content" tabindex="0">
              ${l.length>0?h`
                    <div class="form-badges-container">
                      ${l.map(u=>{let p="badge-draw",i=this._t("card.draw","Draw");return u==="V"||u==="W"?(p="badge-win",i=this._t("card.win","Win")):(u==="D"||u==="L")&&(p="badge-loss",i=this._t("card.loss","Loss")),h`
                          <div class="form-badge-pill ${p}">
                            <span class="pill-char">${u}</span>
                            <span class="pill-label">${i}</span>
                          </div>
                        `})}
                    </div>
                    ${d?h`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${d}</strong>
                          </div>
                        `:""}
                  `:h`
                    <div class="modal-empty-text">
                      ${this._t("card.no_form","No recent form data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="calendar"){let a=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",s=e.poule?.state||"",d=a.flatMap(c=>[c.home_team||c.equipe_domicile||"",c.away_team||c.equipe_exterieur||""]),l=$e(d,t),u=a.findIndex(c=>!c.is_played&&!c.score),p=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||C,i=e.rank?.attributes?.standings;return h`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${this._onModalKeydown}
        >
          <div
            class="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ffbb-modal-title"
            tabindex="-1"
            @click=${c=>c.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
                <span>${this._t("card.calendar_title","Season schedule")} ${s?`\u2022 ${s}`:""}</span>
              </div>
              <ha-icon
                class="modal-close-btn"
                icon="mdi:close"
                @click=${this._closeModal}
                @keydown=${this._onKeyActivate(this._closeModal)}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.close","Close")}
              ></ha-icon>
            </div>
            ${r?h`<div class="modal-subtitle">${r}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${a.length>0?h`
                    <div class="calendar-list">
                      ${a.map((c,f)=>{let k=c.home_team||c.equipe_domicile||"-",E=c.away_team||c.equipe_exterieur||"-",A=c.score||(c.home_score!==void 0?`${c.home_score} - ${c.away_score}`:""),N=this._formatDate(c.date||c.datetime),T=l(k),M=l(E),b=T||M,$=!!(c.is_played||A),w=f===u,v=we({teamName:k,matchLogo:c.home_logo||c.home_team_logo||c.logo_domicile,isMyTeam:T,myTeamLogo:p,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:i}),Z=we({teamName:E,matchLogo:c.away_logo||c.away_team_logo||c.logo_exterieur,isMyTeam:M,myTeamLogo:p,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:i}),x="";return T?x="DOM":M&&(x="EXT"),h`
                          <div
                            class="calendar-row ${b?"highlight-row":""} ${w?"next-match-row":""}"
                            @click=${()=>this._selectCalendarMatch(f,$)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(f,$))}
                            role="button"
                            tabindex="0"
                            aria-label="${k} vs${E}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${c.round||c.journee||"-"}</span>
                              ${x?h`<span class="cal-venue-pill ${x==="DOM"?"pill-dom":"pill-ext"}">${x}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${v}
                                  alt=""
                                  @error=${O=>{O.target.src.endsWith(C)||(O.target.src=C)}}
                                />
                                <span class="cal-team ${T?"my-team-text":""}">${k}</span>
                              </div>
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${Z}
                                  alt=""
                                  @error=${O=>{O.target.src.endsWith(C)||(O.target.src=C)}}
                                />
                                <span class="cal-team ${M?"my-team-text":""}">${E}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${A?h`<div class="cal-score">${A}</div>`:N?h`
                                    <div class="cal-date">${N.day}</div>
                                    <div class="cal-time">${N.time}</div>
                                  `:h`<div class="cal-date">-</div>`}
                            </div>
                          </div>
                        `})}
                    </div>
                  `:h`
                    <div class="modal-empty-text">
                      ${this._t("card.no_calendar","No schedule available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}return h``}_computeViewModel(e){let{language:t,hour12:o}=this._localeInfo();return Rt({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:o,t:(a,r)=>this._t(a,r),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return h``;let e=this._resolveEntities();if(!e)return h`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let t=this._computeViewModel(e);return h`
      <ha-card style="--ffbb-accent-color: ${t.accentColor};">
        ${this._renderHeader(t)}

        <div class="container">
          ${this._renderWatermark(t)}
          ${this._renderMatchHeader(t)}
          ${this._renderMatchArea(t)}
          ${this._renderFooter(t)}
        </div>

        ${this._renderModal(e,t.searchTeamName,t.opponentSearchName)}
      </ha-card>
    `}_renderHeader(e){let{showTitle:t,titleText:o,titleIcon:a}=e;return h`
      ${t&&(o||a)?h`
            <div class="card-header">
              ${a?h`<ha-icon .icon=${a}></ha-icon>`:""}
              ${o?h`<span class="card-header-title">${o}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:t,rightLogo:o}=e;return h`
      ${this._config.show_watermark?h`
            <img
              class="watermark watermark-left"
              src=${t}
              alt=""
              aria-hidden="true"
              @error=${a=>a.target.style.display="none"}
              @load=${a=>a.target.style.display=""}
            />
            <img
              class="watermark watermark-right"
              src=${o}
              alt=""
              aria-hidden="true"
              @error=${a=>a.target.style.display="none"}
              @load=${a=>a.target.style.display=""}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:t,pouleName:o,roundNumber:a}=e;return h`
      ${this._config.show_header?h`
            <div class="header">
              ${t||o?h`
                    <div class="header-main">
                      <span class="competition">${t}</span>
                      ${o?h`<span class="poule">• ${o}</span>`:""}
                    </div>
                  `:""}
              <div
                class="header-round clickable-round"
                @click=${()=>this._openModal("calendar")}
                @keydown=${this._onKeyActivate(()=>this._openModal("calendar"))}
                role="button"
                tabindex="0"
                aria-label=${this._t("card.view_calendar","View full season schedule")}
                title=${this._t("card.view_calendar","View full season schedule")}
              >
                <span>${a?`${this._t("card.round","Round")} ${a}`:this._t("card.calendar_title","Schedule")}</span>
                <ha-icon icon="mdi:calendar-month-outline" class="round-cal-icon"></ha-icon>
              </div>
            </div>
          `:""}
    `}_renderMatchArea(e){let{isLive:t,canToggleView:o,isPostMatch:a,isGameDay:r,leftName:s,rightName:d,leftLogo:l,rightLogo:u,leftUrl:p,rightUrl:i,leftEntityId:c,rightEntityId:f,gymName:k,gymCity:E,dateFormatted:A,logoSizeClass:N,showRank:T,leftRank:M,rightRank:b,isCalendarClickable:$,isLogoClickable:w,hasStandingsData:v}=e,x=this._config?.rank_badge_style==="solid"||!!this._config?.solid_rank_badges?"rank-solid":"";return h`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${N} ${w?"clickable":""}"
            @click=${()=>this._handleLogoClick(c,p,s)}
            @keydown=${w?this._onKeyActivate(()=>this._handleLogoClick(c,p,s)):m}
            role=${w?"button":m}
            tabindex=${w?"0":m}
            aria-label=${w?this._t("card.view_team","View {team}").replace("{team}",s):m}
          >
            <img
              class="logo"
              src=${l}
              alt=""
              @error=${O=>{O.target.src.endsWith(C)||(O.target.src=C)}}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${o?h`
                <ha-icon
                  icon="mdi:chevron-left"
                  class="nav-chevron nav-chevron-left ${e.canGoPrev?"":"disabled"}"
                  @click=${()=>this._handleChevronClick("prev",e)}
                  @keydown=${this._onKeyActivate(()=>this._handleChevronClick("prev",e))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_last_match","Show last played match")}
                  title=${this._t("card.view_last_match","Show last played match")}
                ></ha-icon>
              `:""}

          <div
            class="center-meta ${$?"clickable":""}"
            @click=${()=>{$&&this._openCalendar(e.targetDateStr,s,d,k,E)}}
            @keydown=${$?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,s,d,k,E)):m}
            role=${$?"button":m}
            tabindex=${$?"0":m}
            aria-label=${$?this._t("card.add_to_calendar","Add to Google Calendar"):m}
            title=${$?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${t?h`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${A?`${this._t("card.kickoff","Kick-off")} ${A.time}`:""}
                  </div>
                `:a?h`
                  <div class="score-display">
                    ${e.displayedScore}
                  </div>
                  <div class="badge badge-${e.displayedResult}">
                    ${this._t(`card.${e.displayedResult}`)}
                  </div>
                `:h`
                  ${A?h`
                        <div class="match-day">${A.weekday} ${A.day}</div>
                        <div class="match-time">${A.time}</div>
                      `:h`<div class="match-time">-</div>`}
                  ${r&&!e.isStale?h`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${e.isStale?h`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${o?h`
                <ha-icon
                  icon="mdi:chevron-right"
                  class="nav-chevron nav-chevron-right ${e.canGoNext?"":"disabled"}"
                  @click=${()=>this._handleChevronClick("next",e)}
                  @keydown=${this._onKeyActivate(()=>this._handleChevronClick("next",e))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_next_match","Show upcoming match")}
                  title=${this._t("card.view_next_match","Show upcoming match")}
                ></ha-icon>
              `:""}
        </div>

        <div class="team-logo-cell cell-right">
          <div
            class="logo-box ${N} ${w?"clickable":""}"
            @click=${()=>this._handleLogoClick(f,i,d)}
            @keydown=${w?this._onKeyActivate(()=>this._handleLogoClick(f,i,d)):m}
            role=${w?"button":m}
            tabindex=${w?"0":m}
            aria-label=${w?this._t("card.view_team","View {team}").replace("{team}",d):m}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${O=>{O.target.src.endsWith(C)||(O.target.src=C)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${s}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${d}</div>
        </div>

        ${T&&(M||b)?h`
              <div class="team-rank-cell rank-left">
                ${M?h`
                      <span
                        class="rank-badge ${this._getRankClass(M)} ${x} ${v?"clickable-badge":""}"
                        @click=${()=>{v&&this._openModal("standings")}}
                        @keydown=${v?this._onKeyActivate(()=>this._openModal("standings")):m}
                        role=${v?"button":m}
                        tabindex=${v?"0":m}
                        aria-label=${v?this._t("card.view_standings","View league standings"):m}
                        title=${v?this._t("card.view_standings","View league standings"):""}
                      >${M}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${b?h`
                      <span
                        class="rank-badge ${this._getRankClass(b)} ${x} ${v?"clickable-badge":""}"
                        @click=${()=>{v&&this._openModal("standings")}}
                        @keydown=${v?this._onKeyActivate(()=>this._openModal("standings")):m}
                        role=${v?"button":m}
                        tabindex=${v?"0":m}
                        aria-label=${v?this._t("card.view_standings","View league standings"):m}
                        title=${v?this._t("card.view_standings","View league standings"):""}
                      >${b}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:o,hasValidForm:a,isPreview:r,displayFormSequence:s,displayFormStreak:d,showFormBlock:l}=e;return h`
      ${l?h`
            <div
              class="footer-form clickable"
              @click=${()=>this._openModal("form")}
              @keydown=${this._onKeyActivate(()=>this._openModal("form"))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.view_form_details","View form details")}
              title=${this._t("card.view_form_details","View form details")}
            >
              <span class="form-label">${this._t("card.form","Form")}${this._colon()}</span>
              <span class="form-sequence">${s}</span>${d?h`<span class="form-streak">(${d})</span>`:""}
              ${!a&&r?h`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
            </div>
          `:""}

      ${this._config.show_venue&&(t||o)?h`
            <div
              class="footer-venue clickable"
              @click=${()=>this._openMaps(t,o)}
              @keydown=${this._onKeyActivate(()=>this._openMaps(t,o))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.open_maps","Open in Google Maps")}
              title=${this._t("card.open_maps","Open in Google Maps")}
            >
              <div class="venue-info">
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                <span class="venue-text">${t}${o?` (${o})`:""}</span>
              </div>
            </div>
          `:""}
    `}static get styles(){return Bt}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",ot);console.info(`%c FFBB Tracker Card %c v${me} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var Ft=window.customCards.findIndex(n=>n.type==="ffbb-tracker-card"),Vt={type:"ffbb-tracker-card",name:`FFBB Tracker v${me}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};Ft!==-1?window.customCards[Ft]=Vt:window.customCards.push(Vt);
