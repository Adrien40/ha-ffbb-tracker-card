var ke=globalThis,Ae=ke.ShadowRoot&&(ke.ShadyCSS===void 0||ke.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ge=Symbol(),kt=new WeakMap,he=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==Ge)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ae&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=kt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&kt.set(t,e))}return e}toString(){return this.cssText}},At=o=>new he(typeof o=="string"?o:o+"",void 0,Ge),q=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((a,n,r)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[r+1],o[0]);return new he(t,o,Ge)},St=(o,e)=>{if(Ae)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),n=ke.litNonce;n!==void 0&&a.setAttribute("nonce",n),a.textContent=t.cssText,o.appendChild(a)}},We=Ae?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return At(t)})(o):o;var{is:La,defineProperty:Ra,getOwnPropertyDescriptor:za,getOwnPropertyNames:Ia,getOwnPropertySymbols:Pa,getPrototypeOf:Fa}=Object,V=globalThis,Ct=V.trustedTypes,Ba=Ct?Ct.emptyScript:"",Ua=V.reactiveElementPolyfillSupport,ue=(o,e)=>o,Je={toAttribute(o,e){switch(e){case Boolean:o=o?Ba:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Et=(o,e)=>!La(o,e),Mt={attribute:!0,type:String,converter:Je,reflect:!1,useDefault:!1,hasChanged:Et};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),V.litPropertyMetadata??(V.litPropertyMetadata=new WeakMap);var P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Mt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),n=this.getPropertyDescriptor(e,a,t);n!==void 0&&Ra(this.prototype,e,n)}}static getPropertyDescriptor(e,t,a){let{get:n,set:r}=za(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:n,set(s){let c=n?.call(this);r?.call(this,s),this.requestUpdate(e,c,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Mt}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let e=Fa(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let t=this.properties,a=[...Ia(t),...Pa(t)];for(let n of a)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,n]of t)this.elementProperties.set(a,n)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let n=this._$Eu(t,a);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let n of a)t.unshift(We(n))}else e!==void 0&&t.push(We(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return St(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,a);if(n!==void 0&&a.reflect===!0){let r=(a.converter?.toAttribute!==void 0?a.converter:Je).toAttribute(t,a.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,t){let a=this.constructor,n=a._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let r=a.getPropertyOptions(n),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Je;this._$Em=n;let c=s.fromAttribute(t,r.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(e,t,a,n=!1,r){if(e!==void 0){let s=this.constructor;if(n===!1&&(r=this[e]),a??(a=s.getPropertyOptions(e)),!((a.hasChanged??Et)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:n,wrapped:r},s){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[n,r]of a){let{wrapped:s}=r,c=this[n];s!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,r,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[ue("elementProperties")]=new Map,P[ue("finalized")]=new Map,Ua?.({ReactiveElement:P}),(V.reactiveElementVersions??(V.reactiveElementVersions=[])).push("2.1.2");var me=globalThis,Nt=o=>o,Se=me.trustedTypes,Ot=Se?Se.createPolicy("lit-html",{createHTML:o=>o}):void 0,It="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+H,Va=`<${Pt}>`,W=document,fe=()=>W.createComment(""),ge=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,Ha=o=>at(o)||typeof o?.[Symbol.iterator]=="function",Xe=`[ 	
\f\r]`,pe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Dt=/>/g,K=RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lt=/'/g,Rt=/"/g,Ft=/^(?:script|style|textarea|title)$/i,ot=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),h=ot(1),lo=ot(2),co=ot(3),J=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),zt=new WeakMap,G=W.createTreeWalker(W,129);function Bt(o,e){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(e):e}var ja=(o,e)=>{let t=o.length-1,a=[],n,r=e===2?"<svg>":e===3?"<math>":"",s=pe;for(let c=0;c<t;c++){let i=o[c],u,d,l=-1,p=0;for(;p<i.length&&(s.lastIndex=p,d=s.exec(i),d!==null);)p=s.lastIndex,s===pe?d[1]==="!--"?s=Tt:d[1]!==void 0?s=Dt:d[2]!==void 0?(Ft.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=K):d[3]!==void 0&&(s=K):s===K?d[0]===">"?(s=n??pe,l=-1):d[1]===void 0?l=-2:(l=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?K:d[3]==='"'?Rt:Lt):s===Rt||s===Lt?s=K:s===Tt||s===Dt?s=pe:(s=K,n=void 0);let f=s===K&&o[c+1].startsWith("/>")?" ":"";r+=s===pe?i+Va:l>=0?(a.push(u),i.slice(0,l)+It+i.slice(l)+H+f):i+H+(l===-2?c:f)}return[Bt(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},_e=class o{constructor({strings:e,_$litType$:t},a){let n;this.parts=[];let r=0,s=0,c=e.length-1,i=this.parts,[u,d]=ja(e,t);if(this.el=o.createElement(u,a),G.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(n=G.nextNode())!==null&&i.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let l of n.getAttributeNames())if(l.endsWith(It)){let p=d[s++],f=n.getAttribute(l).split(H),A=/([.?@])?(.*)/.exec(p);i.push({type:1,index:r,name:A[2],strings:f,ctor:A[1]==="."?Ze:A[1]==="?"?Qe:A[1]==="@"?et:ee}),n.removeAttribute(l)}else l.startsWith(H)&&(i.push({type:6,index:r}),n.removeAttribute(l));if(Ft.test(n.tagName)){let l=n.textContent.split(H),p=l.length-1;if(p>0){n.textContent=Se?Se.emptyScript:"";for(let f=0;f<p;f++)n.append(l[f],fe()),G.nextNode(),i.push({type:2,index:++r});n.append(l[p],fe())}}}else if(n.nodeType===8)if(n.data===Pt)i.push({type:2,index:r});else{let l=-1;for(;(l=n.data.indexOf(H,l+1))!==-1;)i.push({type:7,index:r}),l+=H.length-1}r++}}static createElement(e,t){let a=W.createElement("template");return a.innerHTML=e,a}};function Q(o,e,t=o,a){if(e===J)return e;let n=a!==void 0?t._$Co?.[a]:t._$Cl,r=ge(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(o),n._$AT(o,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=n:t._$Cl=n),n!==void 0&&(e=Q(o,n._$AS(o,e.values),n,a)),e}var Ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,n=(e?.creationScope??W).importNode(t,!0);G.currentNode=n;let r=G.nextNode(),s=0,c=0,i=a[0];for(;i!==void 0;){if(s===i.index){let u;i.type===2?u=new be(r,r.nextSibling,this,e):i.type===1?u=new i.ctor(r,i.name,i.strings,this,e):i.type===6&&(u=new tt(r,this,e)),this._$AV.push(u),i=a[++c]}s!==i?.index&&(r=G.nextNode(),s++)}return G.currentNode=W,n}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},be=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),ge(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==J&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ha(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,n=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=_e.createElement(Bt(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===n)this._$AH.p(t);else{let r=new Ye(n,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=zt.get(e.strings);return t===void 0&&zt.set(e.strings,t=new _e(e)),t}k(e){at(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,n=0;for(let r of e)n===t.length?t.push(a=new o(this.O(fe()),this.O(fe()),this,this.options)):a=t[n],a._$AI(r),n++;n<t.length&&(this._$AR(a&&a._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Nt(e).nextSibling;Nt(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,n,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=m}_$AI(e,t=this,a,n){let r=this.strings,s=!1;if(r===void 0)e=Q(this,e,t,0),s=!ge(e)||e!==this._$AH&&e!==J,s&&(this._$AH=e);else{let c=e,i,u;for(e=r[0],i=0;i<r.length-1;i++)u=Q(this,c[a+i],t,i),u===J&&(u=this._$AH[i]),s||(s=!ge(u)||u!==this._$AH[i]),u===m?e=m:e!==m&&(e+=(u??"")+r[i+1]),this._$AH[i]=u}s&&!n&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ze=class extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}},Qe=class extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}},et=class extends ee{constructor(e,t,a,n,r){super(e,t,a,n,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??m)===J)return;let a=this._$AH,n=e===m&&a!==m||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==m&&(a===m||n);n&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},tt=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}};var qa=me.litHtmlPolyfillSupport;qa?.(_e,be),(me.litHtmlVersions??(me.litHtmlVersions=[])).push("3.3.3");var Ut=(o,e,t)=>{let a=t?.renderBefore??e,n=a._$litPart$;if(n===void 0){let r=t?.renderBefore??null;a._$litPart$=n=new be(e.insertBefore(fe(),r),r,void 0,t??{})}return n._$AI(o),n};var ve=globalThis,R=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ut(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};R._$litElement$=!0,R.finalized=!0,ve.litElementHydrateSupport?.({LitElement:R});var Ka=ve.litElementPolyfillSupport;Ka?.({LitElement:R});(ve.litElementVersions??(ve.litElementVersions=[])).push("4.2.2");var xe="0.3.5";var ye={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_standings_below:!1,show_form:!0,show_venue:!0,show_watermark:!0};var Vt={nextOpponent:["prochain_match_adversaire","next_match_opponent"],nextDate:["prochain_match_date","next_match_date"],nextLocation:["prochain_match_lieu","next_match_location"],nextVenue:["prochain_match_terrain","next_match_venue_type"],lastScore:["dernier_match_score","last_match_score"],lastOpponent:["dernier_match_adversaire","last_match_opponent"],lastResult:["dernier_match_resultat","last_match_result"],lastDate:["dernier_match_date","last_match_date"],poule:["poule"],rank:["classement","rank"],rankEvolution:["classement_evolution","rank_evolution"],form:["forme_recente","form"]},Ht={matchInProgress:["match_en_cours","match_in_progress"]},Ga=["prochain_match","next_match","dernier_match","last_match","classement","rank","poule","forme_recente","form","game_day","jour_de_match","match_en_cours","match_in_progress"],jt=new RegExp(`^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${Ga.join("|")})`);var C="/local/community/ha-ffbb-tracker-card/brand/icon.png";function w(o){return(o||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function Kt(o,e){if(!o||!e)return null;let t=o.match(jt),a=t?`sensor.${t[2]}_`:o.substring(0,o.lastIndexOf("_")+1),n=t?`binary_sensor.${t[2]}_`:a.replace("sensor.","binary_sensor."),r=c=>{for(let i of c)if(e[i])return e[i];return null},s={};for(let[c,i]of Object.entries(Vt))s[c]=r(i.map(u=>`${a}${u}`));for(let[c,i]of Object.entries(Ht))s[c]=r(i.map(u=>`${n}${u}`));return s}function Me(o,e){let t=w(e||"");if(!t)return()=>!1;let a=(Array.isArray(o)?o:[]).some(n=>{let r=w(n||"");return!!r&&r===t});return n=>{let r=w(n||"");return r?a?r===t:r.includes(t)||t.includes(r):!1}}function Wa(o,e){if(!o||!Array.isArray(e))return null;let t=w(o);if(!t)return null;let a=e.find(n=>{if(!n)return!1;let r=n.team_name||n.name,s=w(r);return!!(s&&s===t)});return a||(a=e.find(n=>{if(!n)return!1;let r=n.team_name||n.name,s=w(r);return!!(s&&(s.includes(t)||t.includes(s)))})),a?a.position:null}function te(o,e){if(o==null||o===""||isNaN(Number(o)))return null;let t=parseInt(o,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let a=t%10,n=t%100;return a===1&&n!==11?`${t}st`:a===2&&n!==12?`${t}nd`:a===3&&n!==13?`${t}rd`:`${t}th`}function Ce(o,e,t){if(!Array.isArray(e))return null;let a=w(o);if(!a)return null;let n=e.find(r=>{let s=w(r?.team_name||r?.name||"");return!!(s&&s===a)});if(n||(n=e.find(r=>{let s=w(r?.team_name||r?.name||"");return!!(s&&(s.includes(a)||a.includes(s)))})),!n)return null;for(let r of t)if(n[r]){let s=F(n[r]);if(s)return s}return null}function rt(o,e){let t=o?.poule?.attributes?.calendar||o?.poule?.attributes?.matches||o?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let a=o?.nextDate?.attributes?.calendar||o?.nextDate?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let n=o?.rank?.attributes?.calendar||o?.rank?.attributes?.matches;if(Array.isArray(n)&&n.length>0)return n;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function F(o){if(!o||typeof o!="string")return null;let e=o.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function qt(o,e=new Date){if(!o||o==="unknown"||o==="unavailable")return!1;let t=new Date(o);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ja(o,e=new Date){if(!o||o==="unknown"||o==="unavailable")return!1;let t=new Date(o);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(a);n.setDate(n.getDate()+2);let r=e.getTime();return r>=t.getTime()&&r<n.getTime()}function Xa(o,e=new Date){if(!o||o==="unknown"||o==="unavailable")return!1;let t=new Date(o);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(a);return n.setDate(n.getDate()-1),e.getTime()>=n.getTime()}function Ya({defaultView:o="auto",manualView:e=null,isLive:t=!1,lastDate:a=null,hasLastScore:n=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:c=!1,now:i=new Date}={}){return t||!r?!1:e!==null?e==="last":o==="next"?!1:o==="last"?!(!n||c&&Xa(s,i)):!!(n&&Ja(a,i))}function Ee(o){return Array.isArray(o)?[...o].sort((e,t)=>{let a=n=>{let r=parseInt(n?.position??n?.rank,10);return isNaN(r)?999:r};return a(e)-a(t)}):[]}function Za(o,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(o,e):null}var Qa=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function we(o,e=Za){if(typeof o!="string")return!1;let t=o.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let a=e("color",t);return typeof a=="boolean"?a:Qa.test(t)}function eo(o){let e=o?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&we(o?.custom_accent_color)?o.custom_accent_color.trim():"#ff6b00"}function Gt(o,e){if(o==="12"||o==="am_pm")return!0;if(o==="24"||o==="twenty_four")return!1;let t=o==="system"?void 0:e;try{let a=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof a.hour12=="boolean"?a.hour12:a.hourCycle==="h12"||a.hourCycle==="h11"}catch{return!1}}function st(o,e="en-US",{hour12:t}={}){if(!o||o==="unknown"||o==="unavailable")return null;let a=new Date(o);if(isNaN(a.getTime()))return null;let n=a.toLocaleDateString(e,{weekday:"short"}),r=a.toLocaleDateString(e,{day:"numeric",month:"short"}),s=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},c=a.toLocaleTimeString(e,s);return{weekday:n,day:r,time:c}}function nt({isHome:o=!0,isMyTeam:e=o,teamName:t="",entities:a={},opponentSensor:n=null,selectedEntity:r=null}={}){let s=(c,i)=>{if(!c||typeof c!="object")return null;for(let u of i)if(c[u]){let d=F(c[u]);if(d)return d}return null};if(e){let c=s(n?.attributes,["team_url","team_link"]);if(c)return c;let i=[r,a?.nextDate,a?.lastDate,a?.rank];for(let l of i){let p=s(l?.attributes,["team_url","team_link"]);if(p)return p}let u=a?.rank?.attributes?.standings||r?.attributes?.standings,d=Ce(t,u,["team_url","url","link"]);if(d)return d}else{let c=s(n?.attributes,["opponent_url","opponent_team_url","opponent_link"]);if(c)return c;let i=a?.rank?.attributes?.standings||r?.attributes?.standings,u=Ce(t,i,["team_url","url","link"]);if(u)return u}return null}function Ne({teamName:o="",matchLogo:e=null,isMyTeam:t=!1,myTeamLogo:a=null,nextOpponentState:n=null,nextOpponentLogo:r=null,lastOpponentState:s=null,lastOpponentLogo:c=null,standings:i=null}={}){let u=F(e);if(u)return u;if(t&&a&&a!==C)return a;let d=w(o);if(d){let l=w(n||"");if(l&&(l===d||l.includes(d)||d.includes(l))){let f=F(r);if(f)return f}let p=w(s||"");if(p&&(p===d||p.includes(d)||d.includes(p))){let f=F(c);if(f)return f}if(Array.isArray(i)&&i.length>0){let f=Ce(o,i,["team_logo_url","opponent_logo_url","logo_url","logo","team_logo","club_logo","crest","image","image_url","badge"]);if(f)return f}}return t&&a?a:C}function Wt({entities:o={},config:e={},manualView:t=null,matchIndex:a=null,states:n={},lang:r="fr",locale:s=null,hour12:c=void 0,t:i=(l,p="")=>p,isPreview:u=!1,now:d=new Date}={}){let l=y=>!!(y&&y!=="unknown"&&y!=="unavailable"),p=!!(o.matchInProgress&&o.matchInProgress.state==="on"),f=o.lastScore?.state,A=l(f),E=o.nextDate?.state,S=l(E),D=A||l(o.lastOpponent?.state)||l(o.lastDate?.state),z=S||l(o.nextOpponent?.state),M=e.entity&&n?n[e.entity]:null,v=rt(o,M),k=Array.isArray(v)&&v.length>0,$=-1,b=-1;if(k){for(let y=v.length-1;y>=0;y--)if(v[y].is_played||v[y].score){$=y;break}b=v.findIndex(y=>!y.is_played&&!y.score)}let oe=Ya({defaultView:e.default_match_view||"auto",manualView:t,isLive:p,lastDate:o.lastDate?.state,hasLastScore:A,hasLastMatch:D,nextDate:E,hasNextMatch:S,now:d}),x;typeof a=="number"&&k?x=Math.max(0,Math.min(a,v.length-1)):t==="last"?x=$!==-1?$:0:t==="next"?x=b!==-1?b:Math.max(0,v.length-1):oe?x=$!==-1?$:0:x=b!==-1?b:0;let _=typeof a=="number"&&k&&!!v[x]?v[x]:null,O=_?!!(_.is_played||_.score):oe,na=!p&&(k&&v.length>1||D&&z),ra=k&&v.length>1?x>0:!O,sa=k&&v.length>1?x<v.length-1:O,ia=!O&&!p&&(_?!!(_.date&&qt(_.date,d)):S&&qt(E,d)),X=o.poule?.attributes?.team||"",ct=e.custom_team_name?.trim(),j=ct||X||i("card.unknown_team","My team"),g,Y,B,ne,re,De,Le,Re,ze,se,Ie,Pe,T=O?o.lastOpponent:o.nextOpponent,ie=T?.state;if(_){let y=_.home_team||"",le=_.away_team||"";g=_.is_home!==void 0?_.is_home:w(y)===w(X||j),Y=g?le:y,B=Y;let Z=U=>o[U]?.attributes,Ta=Z("nextOpponent")?.team_logo_url||Z("lastOpponent")?.team_logo_url||Z("nextDate")?.team_logo_url||Z("lastDate")?.team_logo_url||null,gt=o.rank?.attributes?.standings,_t=O?x===$:x===b,bt=_t?F(T?.attributes?.opponent_logo_url):null,vt=(U,ce,I)=>{let L=Ne({teamName:U,matchLogo:ce,isMyTeam:I,myTeamLogo:Ta,nextOpponentState:o.nextOpponent?.state,nextOpponentLogo:Z("nextOpponent")?.opponent_logo_url,lastOpponentState:o.lastOpponent?.state,lastOpponentLogo:Z("lastOpponent")?.opponent_logo_url,standings:gt});return L===C&&!I&&bt?bt:L},xt=vt(y,_.home_logo||_.home_team_logo,g),yt=vt(le,_.away_logo||_.away_team_logo,!g);ne=g?xt:yt,re=g?yt:xt;let Da=(U,ce)=>{let I=w(U),L=w(ce);return!!(I&&L&&(I===L||I.includes(L)||L.includes(I)))},wt=(U,ce,I)=>{let L=F(ce);if(L)return L;if(I)return nt({isHome:!0,teamName:X||j,entities:o,opponentSensor:T,selectedEntity:M});if(_t){let de=F(T?.attributes?.opponent_url);if(de)return de}for(let de of[o.nextOpponent,o.lastOpponent])if(Da(de?.state,U)){let $t=F(de?.attributes?.opponent_url);if($t)return $t}return Ce(U,gt,["team_url","url","link"])};De=wt(y,_.home_url,g),Le=wt(le,_.away_url,!g),Re=_.gym_name||"",ze=_.gym_city||"",se=_.date||null,Ie=String(_.round??""),Pe=!!_.is_stale}else{Y=l(ie)?ie:i("card.unknown_opponent","Opponent"),B=l(ie)?ie:"",g=O?o.lastScore?.attributes?.is_home??o.lastDate?.attributes?.is_home??!0:o.nextVenue?.state==="home"||o.nextOpponent?.attributes?.is_home===!0,ne=T?.attributes?.team_logo_url||C,re=T?.attributes?.opponent_logo_url||C;let y=X||j,le=g?y:B,ft=g?B:y;De=nt({isHome:g,teamName:le,entities:o,opponentSensor:T,selectedEntity:M}),Le=nt({isHome:!g,teamName:ft,entities:o,opponentSensor:T,selectedEntity:M}),Ie=O?o.lastDate?.attributes?.round||"":o.nextDate?.attributes?.round||"",Re=o.nextLocation?.attributes?.gym_name||o.nextOpponent?.attributes?.gym_name||"",ze=o.nextLocation?.attributes?.gym_city||o.nextOpponent?.attributes?.gym_city||"",se=O?o.lastDate?.state:o.nextDate?.state,Pe=!!o.nextDate?.attributes?.is_stale}let la=g?j:Y,ca=g?Y:j,da=g?ne:re,ha=g?re:ne,Fe=X||j,ua=g?Fe:B,pa=g?B:Fe,ma=g?e.entity:T?.entity_id,fa=g?T?.entity_id:e.entity,ga=o.poule?.attributes?.competition||"",_a=o.poule?.state||"",ba=st(se,s||r,{hour12:c}),dt=o.form?.attributes?.current_streak||"",Be=o.form?.state,$e=l(Be),va=$e?Be:u?"V-V-D-V-N":"",xa=$e?dt:u?"2V":"",ya=e.show_form&&($e||u),wa=e.show_title!==!1,ht=e.title?.trim(),Ue=i("card.default_title","Next match");p?Ue=i("card.live_title","Live match"):O&&(Ue=i("card.last_title","Last match"));let $a=ht||Ue,ka=e.icon!==void 0?e.icon:"mdi:basketball",Aa=`logo-box-${e.logo_size||"medium"}`,ut=e.show_rank!==!1,Ve=o.rank?.state,pt=l(Ve)?Ve:null,mt=Wa(B,o.rank?.attributes?.standings),He=te(pt,r),je=te(mt,r),qe=g?He:je,Ke=g?je:He;u&&ut&&(qe||(qe=te(g?2:5,r)),Ke||(Ke=te(g?5:2,r)));let Sa=!p&&!O&&!!se,Ca=e.logo_click_action&&e.logo_click_action!=="none",Ma=Array.isArray(o.rank?.attributes?.standings)&&o.rank.attributes.standings.length>0,Ea=eo(e),Na=_?.score||o.lastScore?.state||"-",Oa=_?.result||o.lastResult?.state||"draw";return{isValidState:l,isLive:p,lastScoreState:f,hasLastScore:A,nextDateState:E,hasNextMatch:S,hasLastMatchData:D,hasNextMatchData:z,canToggleView:na,canGoPrev:ra,canGoNext:sa,currentIndex:x,hasCalendar:k,calendarMatches:v,displayedScore:Na,displayedResult:Oa,isPostMatch:O,isGameDay:ia,currentOpponentSensor:T,officialTeamName:X,configuredTeamName:ct,teamName:j,rawOpponent:ie,opponentName:Y,opponentSearchName:B,isHome:g,teamLogoUrl:ne,opponentLogoUrl:re,leftName:la,rightName:ca,leftLogo:da,rightLogo:ha,searchTeamName:Fe,leftMatchName:ua,rightMatchName:pa,leftUrl:De,rightUrl:Le,leftEntityId:ma,rightEntityId:fa,competition:ga,pouleName:_a,roundNumber:Ie,gymName:Re,gymCity:ze,targetDateStr:se,dateFormatted:ba,formStreak:dt,formSequence:Be,hasValidForm:$e,isPreview:u,displayFormSequence:va,displayFormStreak:xa,showFormBlock:ya,showTitle:wa,configuredTitle:ht,titleText:$a,titleIcon:ka,logoSizeClass:Aa,showRank:ut,rawUserRank:Ve,userRankNum:pt,opponentRankNum:mt,userRankFormatted:He,opponentRankFormatted:je,leftRank:qe,rightRank:Ke,isCalendarClickable:Sa,isLogoClickable:Ca,hasStandingsData:Ma,accentColor:Ea,isStale:Pe}}var Jt={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",show_standings_below:"Afficher le classement complet sous la carte",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var Xt={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",show_standings_below:"Show full standings below the card",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var Yt={fr:Jt,en:Xt};function Oe(o){return(o?.locale?.language||o?.language||"en").substring(0,2).toLowerCase()}function ae(o){return Yt[o]||Yt.en}function Te(o,e,t=""){if(!o||!e)return t;let a=e.split("."),n=o;for(let r of a){if(!n||typeof n!="object"||!(r in n))return t;n=n[r]}return typeof n=="string"?n:t}var Zt=q`
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
`;var Qt=["unknown","unavailable"];function oo(o,e,t){let a=w(o?.team_name||o?.name||""),n=w(e),r=w(t);if(!a)return!1;let s=!!(n&&(a.includes(n)||n.includes(a))),c=!!(r&&(a.includes(r)||r.includes(a)));return s||c}function ea({standings:o,poule:e,competition:t,teamName:a,opponentName:n,accentColor:r,t:s}){let c=Ee(o);if(c.length===0)return m;let i=e&&!Qt.includes(e)?e:"",u=t&&!Qt.includes(t)?t:"";return h`
    <ha-card class="standings-card" style="--ffbb-accent-color: ${r};">
      <div class="standings-card-header">
        <ha-icon icon="mdi:format-list-numbered"></ha-icon>
        <span>${s("card.standings_title","Standings")}${i?` \u2022 ${i}`:""}</span>
      </div>
      ${u?h`<div class="standings-card-subtitle">${u}</div>`:m}
      <div class="standings-card-body">
        <table class="standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th class="col-team">${s("card.table_team","Team")}</th>
              <th>${s("card.table_pts","Pts")}</th>
              <th>${s("card.table_played","J")}</th>
              <th>${s("card.table_wins","G")}</th>
              <th>${s("card.table_losses","P")}</th>
              <th>${s("card.table_draws","N")}</th>
            </tr>
          </thead>
          <tbody>
            ${c.map(d=>h`
                <tr class=${oo(d,a,n)?"highlight-row":""}>
                  <td class="pos-cell">${d.position||d.rank||"-"}</td>
                  <td class="col-team">${d.team_name||d.name||"-"}</td>
                  <td class="pts-cell">${d.points??d.pts??"-"}</td>
                  <td>${d.played??"-"}</td>
                  <td>${d.wins??d.won??"-"}</td>
                  <td>${d.losses??d.lost??"-"}</td>
                  <td>${d.draws??"0"}</td>
                </tr>
              `)}
          </tbody>
        </table>
      </div>
    </ha-card>
  `}var ta=q`
  .standings-card {
    display: block;
    margin-top: 12px;
    overflow: hidden;
  }
  .standings-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px 4px;
    font-weight: 700;
    font-size: 1.05em;
    color: var(--primary-text-color);
  }
  .standings-card-header ha-icon {
    color: var(--ffbb-accent-color, #ff6b00);
    --mdc-icon-size: 20px;
  }
  .standings-card-subtitle {
    padding: 0 16px 6px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .standings-card-body {
    padding: 6px 16px 14px;
  }
  .standings-card .standings-table .col-team {
    max-width: none;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
`;var it=class extends R{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return q`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=ae("fr")}setConfig(e){this._config={entity:"",...ye,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=Oe(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=ae(t))}}_t(e,t=""){return Te(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!we(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},a=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of a)s in t||(t[s]="");let n={...this._config,...t},r=new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return h``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[],{name:"show_standings_below",label:this._t("editor.show_standings_below","Show full standings below the card"),default:!1,selector:{boolean:{}}}]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${xe}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",it);var lt=class extends R{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=ae("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...ye}}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:9}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...ye,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,a=String(t??"").trim();e!=="custom"||!a||we(a)||this._warnedAccentColor!==a&&(this._warnedAccentColor=a,console.warn(`[FFBB Tracker Card] custom_accent_color "${a}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=Oe(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=ae(t))}}_t(e,t=""){return Te(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none")return"";let a=String(e).trim().match(/^(\d+)/);if(!a)return"";let n=parseInt(a[1],10);return n===1?"rank-gold":n===2?"rank-silver":n===3?"rank-bronze":""}_resolveEntities(){return Kt(this._config.entity,this.hass?.states)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:Gt(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:a}=this._localeInfo();return st(e,t,{hour12:a})}_openMaps(e,t){let a=encodeURIComponent(`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${a}`,"_blank","noreferrer")}_openCalendar(e,t,a,n,r){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let c=new Date(s.getTime()+7200*1e3),i=f=>f.toISOString().replace(/[-:]|\.\d{3}/g,""),u=`${t} vs ${a}`,d=`${n} ${r}`.trim(),l=`FFBB match: ${t} vs ${a}`,p=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(u)}&dates=${i(s)}/${i(c)}&details=${encodeURIComponent(l)}&location=${encodeURIComponent(d)}`;window.open(p,"_blank","noreferrer")}_handleLogoClick(e,t,a){let n=this._config.logo_click_action||"team_url";n==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${a}".`),e&&this._fireMoreInfo(e)):n==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let a=this._modalTrigger;this._modalTrigger=null,a&&a.isConnected&&typeof a.focus=="function"&&a.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let a=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(a.length===0){e.preventDefault(),t.focus();return}let n=a[0],r=a[a.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===n||s===t)?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),n.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let a=e==="prev"?t.currentIndex-1:t.currentIndex+1;if(a>=0&&a<t.calendarMatches.length){this._matchIndex=a;let n=t.calendarMatches[a];this._manualView=n.is_played||n.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,t){this._matchIndex=e,this._manualView=t?"last":"next",this._closeModal()}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return rt(e,t)}_renderModal(e,t,a){if(!this._activeModal)return h``;if(this._activeModal==="standings"){let n=e.rank?.attributes?.standings||[],r=Ee(n),s=e.poule?.attributes?.competition||"",c=e.poule?.state||"",i=r.map(l=>l.team_name||l.name||""),u=Me(i,t),d=Me(i,a);return h`
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
            @click=${l=>l.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:format-list-numbered"></ha-icon>
                <span>${this._t("card.standings_title","Standings")} ${c?`\u2022 ${c}`:""}</span>
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
                        ${r.map(l=>{let p=l.team_name||l.name||"",f=u(p)||d(p);return h`
                            <tr class=${f?"highlight-row":""}>
                              <td class="pos-cell">${l.position||l.rank||"-"}</td>
                              <td class="col-team">${l.team_name||l.name||"-"}</td>
                              <td class="pts-cell">${l.points??l.pts??"-"}</td>
                              <td>${l.played??"-"}</td>
                              <td>${l.wins??l.won??"-"}</td>
                              <td>${l.losses??l.lost??"-"}</td>
                              <td>${l.draws??"0"}</td>
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
      `}if(this._activeModal==="form"){let n=e.form?.state,r=n&&n!=="unknown"&&n!=="unavailable",s=r?n:"",c=r&&e.form?.attributes?.current_streak||"",i=s.split("-").filter(Boolean);return h`
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
              ${i.length>0?h`
                    <div class="form-badges-container">
                      ${i.map(u=>{let d="badge-draw",l=this._t("card.draw","Draw");return u==="V"||u==="W"?(d="badge-win",l=this._t("card.win","Win")):(u==="D"||u==="L")&&(d="badge-loss",l=this._t("card.loss","Loss")),h`
                          <div class="form-badge-pill ${d}">
                            <span class="pill-char">${u}</span>
                            <span class="pill-label">${l}</span>
                          </div>
                        `})}
                    </div>
                    ${c?h`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${c}</strong>
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
      `}if(this._activeModal==="calendar"){let n=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",s=e.poule?.state||"",c=n.flatMap(p=>[p.home_team||"",p.away_team||""]),i=Me(c,t),u=n.findIndex(p=>!p.is_played&&!p.score),d=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||C,l=e.rank?.attributes?.standings;return h`
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
            @click=${p=>p.stopPropagation()}
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
              ${n.length>0?h`
                    <div class="calendar-list">
                      ${n.map((p,f)=>{let A=p.home_team||"-",E=p.away_team||"-",S=p.score||(p.home_score!==void 0?`${p.home_score} - ${p.away_score}`:""),D=this._formatDate(p.date||p.datetime),z=i(A),M=i(E),v=z||M,k=!!(p.is_played||S),$=f===u,b=Ne({teamName:A,matchLogo:p.home_logo||p.home_team_logo,isMyTeam:z,myTeamLogo:d,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:l}),oe=Ne({teamName:E,matchLogo:p.away_logo||p.away_team_logo,isMyTeam:M,myTeamLogo:d,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:l}),x="";return z?x="DOM":M&&(x="EXT"),h`
                          <div
                            class="calendar-row ${v?"highlight-row":""} ${$?"next-match-row":""}"
                            @click=${()=>this._selectCalendarMatch(f,k)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(f,k))}
                            role="button"
                            tabindex="0"
                            aria-label="${A} vs ${E}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${p.round||"-"}</span>
                              ${x?h`<span class="cal-venue-pill ${x==="DOM"?"pill-dom":"pill-ext"}">${x}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${b}
                                  alt=""
                                  @error=${N=>{N.target.src.endsWith(C)||(N.target.src=C)}}
                                />
                                <span class="cal-team ${z?"my-team-text":""}">${A}</span>
                              </div>
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${oe}
                                  alt=""
                                  @error=${N=>{N.target.src.endsWith(C)||(N.target.src=C)}}
                                />
                                <span class="cal-team ${M?"my-team-text":""}">${E}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${S?h`<div class="cal-score">${S}</div>`:D?h`
                                    <div class="cal-date">${D.day}</div>
                                    <div class="cal-time">${D.time}</div>
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
      `}return h``}_computeViewModel(e){let{language:t,hour12:a}=this._localeInfo();return Wt({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:a,t:(n,r)=>this._t(n,r),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return h``;let e=this._resolveEntities();if(!e)return h`
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

      ${this._config.show_standings_below?ea({standings:e.rank?.attributes?.standings,poule:e.poule?.state,competition:e.poule?.attributes?.competition,teamName:t.searchTeamName,opponentName:t.opponentSearchName,accentColor:t.accentColor,t:(a,n)=>this._t(a,n)}):m}
    `}_renderHeader(e){let{showTitle:t,titleText:a,titleIcon:n}=e;return h`
      ${t&&(a||n)?h`
            <div class="card-header">
              ${n?h`<ha-icon .icon=${n}></ha-icon>`:""}
              ${a?h`<span class="card-header-title">${a}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:t,rightLogo:a}=e;return h`
      ${this._config.show_watermark?h`
            <img
              class="watermark watermark-left"
              src=${t}
              alt=""
              aria-hidden="true"
              @error=${n=>n.target.style.display="none"}
              @load=${n=>n.target.style.display=""}
            />
            <img
              class="watermark watermark-right"
              src=${a}
              alt=""
              aria-hidden="true"
              @error=${n=>n.target.style.display="none"}
              @load=${n=>n.target.style.display=""}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:t,pouleName:a,roundNumber:n}=e;return h`
      ${this._config.show_header?h`
            <div class="header">
              ${t||a?h`
                    <div class="header-main">
                      <span class="competition">${t}</span>
                      ${a?h`<span class="poule">• ${a}</span>`:""}
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
                <span>${n?`${this._t("card.round","Round")} ${n}`:this._t("card.calendar_title","Schedule")}</span>
                <ha-icon icon="mdi:calendar-month-outline" class="round-cal-icon"></ha-icon>
              </div>
            </div>
          `:""}
    `}_renderMatchArea(e){let{isLive:t,canToggleView:a,isPostMatch:n,isGameDay:r,leftName:s,rightName:c,leftLogo:i,rightLogo:u,leftUrl:d,rightUrl:l,leftEntityId:p,rightEntityId:f,gymName:A,gymCity:E,dateFormatted:S,logoSizeClass:D,showRank:z,leftRank:M,rightRank:v,isCalendarClickable:k,isLogoClickable:$,hasStandingsData:b}=e,x=this._config?.rank_badge_style==="solid"?"rank-solid":"";return h`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${D} ${$?"clickable":""}"
            @click=${()=>this._handleLogoClick(p,d,s)}
            @keydown=${$?this._onKeyActivate(()=>this._handleLogoClick(p,d,s)):m}
            role=${$?"button":m}
            tabindex=${$?"0":m}
            aria-label=${$?this._t("card.view_team","View {team}").replace("{team}",s):m}
          >
            <img
              class="logo"
              src=${i}
              alt=""
              @error=${N=>{N.target.src.endsWith(C)||(N.target.src=C)}}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${a?h`
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
            class="center-meta ${k?"clickable":""}"
            @click=${()=>{k&&this._openCalendar(e.targetDateStr,s,c,A,E)}}
            @keydown=${k?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,s,c,A,E)):m}
            role=${k?"button":m}
            tabindex=${k?"0":m}
            aria-label=${k?this._t("card.add_to_calendar","Add to Google Calendar"):m}
            title=${k?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${t?h`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${S?`${this._t("card.kickoff","Kick-off")} ${S.time}`:""}
                  </div>
                `:n?h`
                  <div class="score-display">
                    ${e.displayedScore}
                  </div>
                  <div class="badge badge-${e.displayedResult}">
                    ${this._t(`card.${e.displayedResult}`)}
                  </div>
                `:h`
                  ${S?h`
                        <div class="match-day">${S.weekday} ${S.day}</div>
                        <div class="match-time">${S.time}</div>
                      `:h`<div class="match-time">-</div>`}
                  ${r&&!e.isStale?h`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${e.isStale?h`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${a?h`
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
            class="logo-box ${D} ${$?"clickable":""}"
            @click=${()=>this._handleLogoClick(f,l,c)}
            @keydown=${$?this._onKeyActivate(()=>this._handleLogoClick(f,l,c)):m}
            role=${$?"button":m}
            tabindex=${$?"0":m}
            aria-label=${$?this._t("card.view_team","View {team}").replace("{team}",c):m}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${N=>{N.target.src.endsWith(C)||(N.target.src=C)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${s}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${c}</div>
        </div>

        ${z&&(M||v)?h`
              <div class="team-rank-cell rank-left">
                ${M?h`
                      <span
                        class="rank-badge ${this._getRankClass(M)} ${x} ${b?"clickable-badge":""}"
                        @click=${()=>{b&&this._openModal("standings")}}
                        @keydown=${b?this._onKeyActivate(()=>this._openModal("standings")):m}
                        role=${b?"button":m}
                        tabindex=${b?"0":m}
                        aria-label=${b?this._t("card.view_standings","View league standings"):m}
                        title=${b?this._t("card.view_standings","View league standings"):""}
                      >${M}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${v?h`
                      <span
                        class="rank-badge ${this._getRankClass(v)} ${x} ${b?"clickable-badge":""}"
                        @click=${()=>{b&&this._openModal("standings")}}
                        @keydown=${b?this._onKeyActivate(()=>this._openModal("standings")):m}
                        role=${b?"button":m}
                        tabindex=${b?"0":m}
                        aria-label=${b?this._t("card.view_standings","View league standings"):m}
                        title=${b?this._t("card.view_standings","View league standings"):""}
                      >${v}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:a,hasValidForm:n,isPreview:r,displayFormSequence:s,displayFormStreak:c,showFormBlock:i}=e;return h`
      ${i?h`
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
              <span class="form-sequence">${s}</span>${c?h`<span class="form-streak">(${c})</span>`:""}
              ${!n&&r?h`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
            </div>
          `:""}

      ${this._config.show_venue&&(t||a)?h`
            <div
              class="footer-venue clickable"
              @click=${()=>this._openMaps(t,a)}
              @keydown=${this._onKeyActivate(()=>this._openMaps(t,a))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.open_maps","Open in Google Maps")}
              title=${this._t("card.open_maps","Open in Google Maps")}
            >
              <div class="venue-info">
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                <span class="venue-text">${t}${a?` (${a})`:""}</span>
              </div>
            </div>
          `:""}
    `}static get styles(){return[Zt,ta]}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",lt);console.info(`%c FFBB Tracker Card %c v${xe} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var aa=window.customCards.findIndex(o=>o.type==="ffbb-tracker-card"),oa={type:"ffbb-tracker-card",name:`FFBB Tracker v${xe}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};aa!==-1?window.customCards[aa]=oa:window.customCards.push(oa);
