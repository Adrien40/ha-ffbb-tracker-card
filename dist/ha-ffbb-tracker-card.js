var ne=globalThis,re=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,xe=Symbol(),qe=new WeakMap,H=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==xe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(re&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=qe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&qe.set(t,e))}return e}toString(){return this.cssText}},Ke=n=>new H(typeof n=="string"?n:n+"",void 0,xe),j=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((a,o,r)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[r+1],n[0]);return new H(t,n,xe)},Ge=(n,e)=>{if(re)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),o=ne.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=t.cssText,n.appendChild(a)}},ye=re?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return Ke(t)})(n):n;var{is:Wt,defineProperty:Jt,getOwnPropertyDescriptor:Xt,getOwnPropertyNames:Yt,getOwnPropertySymbols:Zt,getPrototypeOf:Qt}=Object,M=globalThis,We=M.trustedTypes,ea=We?We.emptyScript:"",ta=M.reactiveElementPolyfillSupport,q=(n,e)=>n,ke={toAttribute(n,e){switch(e){case Boolean:n=n?ea:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Xe=(n,e)=>!Wt(n,e),Je={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:Xe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),M.litPropertyMetadata??(M.litPropertyMetadata=new WeakMap);var A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Je){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(e,a,t);o!==void 0&&Jt(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){let{get:o,set:r}=Xt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){let d=o?.call(this);r?.call(this,s),this.requestUpdate(e,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Je}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let e=Qt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let t=this.properties,a=[...Yt(t),...Zt(t)];for(let o of a)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,o]of t)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let o=this._$Eu(t,a);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let o of a)t.unshift(ye(o))}else e!==void 0&&t.push(ye(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ge(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(o!==void 0&&a.reflect===!0){let r=(a.converter?.toAttribute!==void 0?a.converter:ke).toAttribute(t,a.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let a=this.constructor,o=a._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let r=a.getPropertyOptions(o),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:ke;this._$Em=o;let d=s.fromAttribute(t,r.type);this[o]=d??this._$Ej?.get(o)??d,this._$Em=null}}requestUpdate(e,t,a,o=!1,r){if(e!==void 0){let s=this.constructor;if(o===!1&&(r=this[e]),a??(a=s.getPropertyOptions(e)),!((a.hasChanged??Xe)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:r},s){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,r]of a){let{wrapped:s}=r,d=this[o];s!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,r,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[q("elementProperties")]=new Map,A[q("finalized")]=new Map,ta?.({ReactiveElement:A}),(M.reactiveElementVersions??(M.reactiveElementVersions=[])).push("2.1.2");var G=globalThis,Ye=n=>n,se=G.trustedTypes,Ze=se?se.createPolicy("lit-html",{createHTML:n=>n}):void 0,nt="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+T,aa=`<${rt}>`,z=document,W=()=>z.createComment(""),J=n=>n===null||typeof n!="object"&&typeof n!="function",Ne=Array.isArray,oa=n=>Ne(n)||typeof n?.[Symbol.iterator]=="function",Ae=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,et=/>/g,L=RegExp(`>|${Ae}(?:([^\\s"'>=/]+)(${Ae}*=${Ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),tt=/'/g,at=/"/g,st=/^(?:script|style|textarea|title)$/i,De=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=De(1),wa=De(2),xa=De(3),O=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ot=new WeakMap,R=z.createTreeWalker(z,129);function it(n,e){if(!Ne(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ze!==void 0?Ze.createHTML(e):e}var na=(n,e)=>{let t=n.length-1,a=[],o,r=e===2?"<svg>":e===3?"<math>":"",s=K;for(let d=0;d<t;d++){let l=n[d],c,u,i=-1,m=0;for(;m<l.length&&(s.lastIndex=m,u=s.exec(l),u!==null);)m=s.lastIndex,s===K?u[1]==="!--"?s=Qe:u[1]!==void 0?s=et:u[2]!==void 0?(st.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=L):u[3]!==void 0&&(s=L):s===L?u[0]===">"?(s=o??K,i=-1):u[1]===void 0?i=-2:(i=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?L:u[3]==='"'?at:tt):s===at||s===tt?s=L:s===Qe||s===et?s=K:(s=L,o=void 0);let f=s===L&&n[d+1].startsWith("/>")?" ":"";r+=s===K?l+aa:i>=0?(a.push(c),l.slice(0,i)+nt+l.slice(i)+T+f):l+T+(i===-2?d:f)}return[it(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},X=class n{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let r=0,s=0,d=e.length-1,l=this.parts,[c,u]=na(e,t);if(this.el=n.createElement(c,a),R.currentNode=this.el.content,t===2||t===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(o=R.nextNode())!==null&&l.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(let i of o.getAttributeNames())if(i.endsWith(nt)){let m=u[s++],f=o.getAttribute(i).split(T),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:b[2],strings:f,ctor:b[1]==="."?Se:b[1]==="?"?Ee:b[1]==="@"?Me:F}),o.removeAttribute(i)}else i.startsWith(T)&&(l.push({type:6,index:r}),o.removeAttribute(i));if(st.test(o.tagName)){let i=o.textContent.split(T),m=i.length-1;if(m>0){o.textContent=se?se.emptyScript:"";for(let f=0;f<m;f++)o.append(i[f],W()),R.nextNode(),l.push({type:2,index:++r});o.append(i[m],W())}}}else if(o.nodeType===8)if(o.data===rt)l.push({type:2,index:r});else{let i=-1;for(;(i=o.data.indexOf(T,i+1))!==-1;)l.push({type:7,index:r}),i+=T.length-1}r++}}static createElement(e,t){let a=z.createElement("template");return a.innerHTML=e,a}};function U(n,e,t=n,a){if(e===O)return e;let o=a!==void 0?t._$Co?.[a]:t._$Cl,r=J(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(n),o._$AT(n,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=o:t._$Cl=o),o!==void 0&&(e=U(n,o._$AS(n,e.values),o,a)),e}var Ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??z).importNode(t,!0);R.currentNode=o;let r=R.nextNode(),s=0,d=0,l=a[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new Y(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new Te(r,this,e)),this._$AV.push(c),l=a[++d]}s!==l?.index&&(r=R.nextNode(),s++)}return R.currentNode=z,o}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},Y=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),J(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):oa(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&J(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=X.createElement(it(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{let r=new Ce(o,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=ot.get(e.strings);return t===void 0&&ot.set(e.strings,t=new X(e)),t}k(e){Ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,o=0;for(let r of e)o===t.length?t.push(a=new n(this.O(W()),this.O(W()),this,this.options)):a=t[o],a._$AI(r),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Ye(e).nextSibling;Ye(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(e,t=this,a,o){let r=this.strings,s=!1;if(r===void 0)e=U(this,e,t,0),s=!J(e)||e!==this._$AH&&e!==O,s&&(this._$AH=e);else{let d=e,l,c;for(e=r[0],l=0;l<r.length-1;l++)c=U(this,d[a+l],t,l),c===O&&(c=this._$AH[l]),s||(s=!J(c)||c!==this._$AH[l]),c===p?e=p:e!==p&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Se=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Ee=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Me=class extends F{constructor(e,t,a,o,r){super(e,t,a,o,r),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??p)===O)return;let a=this._$AH,o=e===p&&a!==p||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==p&&(a===p||o);o&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Te=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var ra=G.litHtmlPolyfillSupport;ra?.(X,Y),(G.litHtmlVersions??(G.litHtmlVersions=[])).push("3.3.3");var lt=(n,e,t)=>{let a=t?.renderBefore??e,o=a._$litPart$;if(o===void 0){let r=t?.renderBefore??null;a._$litPart$=o=new Y(e.insertBefore(W(),r),r,void 0,t??{})}return o._$AI(n),o};var Z=globalThis,k=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=lt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};k._$litElement$=!0,k.finalized=!0,Z.litElementHydrateSupport?.({LitElement:k});var sa=Z.litElementPolyfillSupport;sa?.({LitElement:k});(Z.litElementVersions??(Z.litElementVersions=[])).push("4.2.2");var Q="0.1.9";var ee={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_form:!0,show_venue:!0,show_watermark:!0};var P="/local/community/ha-ffbb-tracker-card/brand/icon.png";function C(n){return(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function ht(n,e){if(!n||!e)return null;let t=n.match(/^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/),a=t?`sensor.${t[2]}_`:n.substring(0,n.lastIndexOf("_")+1),o=t?`binary_sensor.${t[2]}_`:a.replace("sensor.","binary_sensor."),r=s=>{for(let d of s)if(e[d])return e[d];return null};return{nextOpponent:r([`${a}prochain_match_adversaire`,`${a}next_match_opponent`]),nextDate:r([`${a}prochain_match_date`,`${a}next_match_date`]),nextLocation:r([`${a}prochain_match_lieu`,`${a}next_match_location`]),nextVenue:r([`${a}prochain_match_terrain`,`${a}next_match_venue_type`]),lastScore:r([`${a}dernier_match_score`,`${a}last_match_score`]),lastOpponent:r([`${a}dernier_match_adversaire`,`${a}last_match_opponent`]),lastResult:r([`${a}dernier_match_resultat`,`${a}last_match_result`]),lastDate:r([`${a}dernier_match_date`,`${a}last_match_date`]),poule:r([`${a}poule`]),rank:r([`${a}classement`,`${a}rank`]),rankEvolution:r([`${a}classement_evolution`,`${a}rank_evolution`]),form:r([`${a}forme_recente`,`${a}form`]),matchInProgress:r([`${o}match_en_cours`,`${o}match_in_progress`])}}function ie(n,e){let t=C(e||"");if(!t)return()=>!1;let a=(Array.isArray(n)?n:[]).some(o=>{let r=C(o||"");return!!r&&r===t});return o=>{let r=C(o||"");return r?a?r===t:r.includes(t)||t.includes(r):!1}}function ia(n,e){if(!n||!Array.isArray(e))return null;let t=C(n);if(!t)return null;let a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=C(r);return!!(s&&s===t)});return a||(a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=C(r);return!!(s&&(s.includes(t)||t.includes(s)))})),a?a.position:null}function I(n,e){if(n==null||n===""||isNaN(Number(n)))return null;let t=parseInt(n,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let a=t%10,o=t%100;return a===1&&o!==11?`${t}st`:a===2&&o!==12?`${t}nd`:a===3&&o!==13?`${t}rd`:`${t}th`}function ct(n,e,t){if(!Array.isArray(e))return null;let a=C(n);if(!a)return null;let o=e.find(r=>{let s=C(r?.team_name||r?.name||"");return!!(s&&s===a)});if(o||(o=e.find(r=>{let s=C(r?.team_name||r?.name||"");return!!(s&&(s.includes(a)||a.includes(s)))})),!o)return null;for(let r of t)if(o[r]){let s=pt(o[r]);if(s)return s}return null}function ut(n,e){let t=n?.poule?.attributes?.calendar||n?.poule?.attributes?.matches||n?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let a=n?.nextDate?.attributes?.calendar||n?.nextDate?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let o=n?.rank?.attributes?.calendar||n?.rank?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function pt(n){if(!n||typeof n!="string")return null;let e=n.trim();return e.startsWith("http://")||e.startsWith("https://")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function la(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function ca(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);o.setDate(o.getDate()+2);let r=e.getTime();return r>=t.getTime()&&r<o.getTime()}function da(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);return o.setDate(o.getDate()-1),e.getTime()>=o.getTime()}function ha({defaultView:n="auto",manualView:e=null,isLive:t=!1,lastDate:a=null,hasLastScore:o=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:d=!1,now:l=new Date}={}){return t||!r?!1:e!==null?e==="last":n==="next"?!1:n==="last"?!(!o||d&&da(s,l)):!!(o&&ca(a,l))}function mt(n){return Array.isArray(n)?[...n].sort((e,t)=>{let a=o=>{let r=parseInt(o?.position??o?.rank,10);return isNaN(r)?999:r};return a(e)-a(t)}):[]}function ua(n,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(n,e):null}var pa=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function te(n,e=ua){if(typeof n!="string")return!1;let t=n.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let a=e("color",t);return typeof a=="boolean"?a:pa.test(t)}function ma(n){let e=n?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&te(n?.custom_accent_color)?n.custom_accent_color.trim():"#ff6b00"}function ft(n,e){if(n==="12"||n==="am_pm")return!0;if(n==="24"||n==="twenty_four")return!1;let t=n==="system"?void 0:e;try{let a=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof a.hour12=="boolean"?a.hour12:a.hourCycle==="h12"||a.hourCycle==="h11"}catch{return!1}}function Le(n,e="en-US",{hour12:t}={}){if(!n||n==="unknown"||n==="unavailable")return null;let a=new Date(n);if(isNaN(a.getTime()))return null;let o=a.toLocaleDateString(e,{weekday:"short"}),r=a.toLocaleDateString(e,{day:"numeric",month:"short"}),s=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},d=a.toLocaleTimeString(e,s);return{weekday:o,day:r,time:d}}function dt({isHome:n=!0,isMyTeam:e=n,teamName:t="",entities:a={},opponentSensor:o=null,selectedEntity:r=null}={}){let s=(d,l)=>{if(!d||typeof d!="object")return null;for(let c of l)if(d[c]){let u=pt(d[c]);if(u)return u}return null};if(e){let d=s(o?.attributes,["team_url","url_equipe","team_link"]);if(d)return d;let l=[r,a?.nextDate,a?.lastDate,a?.rank];for(let i of l){let m=s(i?.attributes,["team_url","url_equipe","team_link"]);if(m)return m}let c=a?.rank?.attributes?.standings||r?.attributes?.standings,u=ct(t,c,["team_url","url","link"]);if(u)return u}else{let d=s(o?.attributes,["opponent_url","opponent_team_url","opponent_link","url_adversaire"]);if(d)return d;let l=a?.rank?.attributes?.standings||r?.attributes?.standings,c=ct(t,l,["team_url","url","link"]);if(c)return c}return null}function _t({entities:n={},config:e={},manualView:t=null,states:a={},lang:o="fr",locale:r=null,hour12:s=void 0,t:d=(u,i="")=>i,isPreview:l=!1,now:c=new Date}={}){let u=we=>!!(we&&we!=="unknown"&&we!=="unavailable"),i=!!(n.matchInProgress&&n.matchInProgress.state==="on"),m=n.lastScore?.state,f=u(m),b=n.nextDate?.state,w=u(b),N=f||u(n.lastOpponent?.state)||u(n.lastDate?.state),B=w||u(n.nextOpponent?.state),S=!i&&N&&B,x=ha({defaultView:e.default_match_view||"auto",manualView:t,isLive:i,lastDate:n.lastDate?.state,hasLastScore:f,hasLastMatch:N,nextDate:b,hasNextMatch:w,now:c}),de=!x&&!i&&w&&la(b,c),$=x?n.lastOpponent:n.nextOpponent,E=n.poule?.attributes?.team||"",y=e.custom_team_name?.trim(),v=y||E||d("card.unknown_team","My team"),g=$?.state,ae=u(g)?g:d("card.unknown_opponent","Opponent"),D=u(g)?g:"",_=x?n.lastScore?.attributes?.is_home??n.lastDate?.attributes?.is_home??!0:n.nextVenue?.state==="home"||n.nextOpponent?.attributes?.is_home===!0,he=$?.attributes?.team_logo_url||P,ue=$?.attributes?.opponent_logo_url||P,yt=_?v:ae,kt=_?ae:v,At=_?he:ue,Ct=_?ue:he,pe=E||v,Oe=_?pe:D,Pe=_?D:pe,Ue=e.entity&&a?a[e.entity]:null,St=dt({isHome:_,teamName:Oe,entities:n,opponentSensor:$,selectedEntity:Ue}),Et=dt({isHome:!_,teamName:Pe,entities:n,opponentSensor:$,selectedEntity:Ue}),Mt=_?e.entity:$?.entity_id,Tt=_?$?.entity_id:e.entity,Nt=n.poule?.attributes?.competition||"",Dt=n.poule?.state||"",Lt=x?n.lastDate?.attributes?.round||"":n.nextDate?.attributes?.round||"",Rt=n.nextLocation?.attributes?.gym_name||n.nextOpponent?.attributes?.gym_name||"",zt=n.nextLocation?.attributes?.gym_city||n.nextOpponent?.attributes?.gym_city||"",Fe=x?n.lastDate?.state:n.nextDate?.state,Ot=Le(Fe,r||o,{hour12:s}),Ie=n.form?.attributes?.current_streak||"",me=n.form?.state,oe=u(me),Pt=oe?me:l?"V-V-D-V-N":"",Ut=oe?Ie:l?"2V":"",Ft=e.show_form&&(oe||l),It=e.show_title!==!1,Ve=e.title?.trim(),fe=d("card.default_title","Next match");i?fe=d("card.live_title","Live match"):x&&(fe=d("card.last_title","Last match"));let Vt=Ve||fe,Bt=e.icon!==void 0?e.icon:"mdi:basketball",Ht=`logo-box-${e.logo_size||"medium"}`,Be=e.show_rank!==!1,_e=n.rank?.state,He=u(_e)?_e:null,je=ia(D,n.rank?.attributes?.standings),ge=I(He,o),be=I(je,o),ve=_?ge:be,$e=_?be:ge;l&&Be&&(ve||(ve=I(_?2:5,o)),$e||($e=I(_?5:2,o)));let jt=!i&&!x&&w,qt=e.logo_click_action&&e.logo_click_action!=="none",Kt=Array.isArray(n.rank?.attributes?.standings)&&n.rank.attributes.standings.length>0,Gt=ma(e);return{isValidState:u,isLive:i,lastScoreState:m,hasLastScore:f,nextDateState:b,hasNextMatch:w,hasLastMatchData:N,hasNextMatchData:B,canToggleView:S,isPostMatch:x,isGameDay:de,currentOpponentSensor:$,officialTeamName:E,configuredTeamName:y,teamName:v,rawOpponent:g,opponentName:ae,opponentSearchName:D,isHome:_,teamLogoUrl:he,opponentLogoUrl:ue,leftName:yt,rightName:kt,leftLogo:At,rightLogo:Ct,searchTeamName:pe,leftMatchName:Oe,rightMatchName:Pe,leftUrl:St,rightUrl:Et,leftEntityId:Mt,rightEntityId:Tt,competition:Nt,pouleName:Dt,roundNumber:Lt,gymName:Rt,gymCity:zt,targetDateStr:Fe,dateFormatted:Ot,formStreak:Ie,formSequence:me,hasValidForm:oe,isPreview:l,displayFormSequence:Pt,displayFormStreak:Ut,showFormBlock:Ft,showTitle:It,configuredTitle:Ve,titleText:Vt,titleIcon:Bt,logoSizeClass:Ht,showRank:Be,rawUserRank:_e,userRankNum:He,opponentRankNum:je,userRankFormatted:ge,opponentRankFormatted:be,leftRank:ve,rightRank:$e,isCalendarClickable:jt,isLogoClickable:qt,hasStandingsData:Kt,accentColor:Gt}}var gt={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logo",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var bt={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logo",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var vt={fr:gt,en:bt};function le(n){return(n?.locale?.language||n?.language||"en").substring(0,2).toLowerCase()}function V(n){return vt[n]||vt.en}function ce(n,e,t=""){if(!n||!e)return t;let a=e.split("."),o=n;for(let r of a){if(!o||typeof o!="object"||!(r in o))return t;o=o[r]}return typeof o=="string"?o:t}var $t=j`
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
  /* Game day / postponed badges hang below the date+time block instead of
     sitting in the flow: the centre column shares grid row 1 with the logos,
     so an in-flow badge made that row taller than the logo and pushed the
     team names and ranks down (very visible with the small logo size). */
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
  .modal-body:focus-visible {
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
  /* Focused programmatically when the dialog opens (tabindex="-1"); the
     dialog container itself is not an interactive control, so no ring. */
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
    padding: 4px 16px 8px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .modal-body {
    padding: 10px 16px 14px;
    overflow-y: auto;
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
    gap: 8px;
  }
  .calendar-row {
    display: grid;
    grid-template-columns: 36px 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 10px;
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
  }
  .calendar-row.highlight-row {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));
    border-left: 3px solid var(--ffbb-accent-color, #ff6b00);
  }
  .calendar-col-round {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cal-round-tag {
    font-size: 0.8em;
    font-weight: 700;
    color: var(--secondary-text-color);
  }
  .calendar-col-teams {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }
  .cal-team {
    font-size: 0.88em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cal-team.my-team-text {
    font-weight: 700;
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .calendar-col-meta {
    text-align: right;
    min-width: 60px;
  }
  .cal-score {
    font-weight: 800;
    font-size: 0.95em;
    color: var(--primary-text-color);
  }
  .cal-date {
    font-size: 0.8em;
    color: var(--secondary-text-color);
  }
  .cal-time {
    font-size: 0.8em;
    font-weight: 600;
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
`;var Re=class extends k{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return j`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=V("fr")}setConfig(e){this._config={entity:"",...ee,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=le(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=V(t))}}_t(e,t=""){return ce(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!te(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},a=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of a)s in t||(t[s]="");let o={...this._config,...t},r=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return h``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${Q}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Re);var ze=class extends k{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=V("en"),this._activeModal=null,this._manualView=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...ee}}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:9}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...ee,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,a=String(t??"").trim();e!=="custom"||!a||te(a)||this._warnedAccentColor!==a&&(this._warnedAccentColor=a,console.warn(`[FFBB Tracker Card] custom_accent_color "${a}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=le(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=V(t))}}_t(e,t=""){return ce(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none"||this._config?.disable_podium_colors)return"";let a=String(e).trim().match(/^(\d+)/);if(!a)return"";let o=parseInt(a[1],10);return o===1?"rank-gold":o===2?"rank-silver":o===3?"rank-bronze":""}_resolveEntities(){return ht(this._config.entity,this.hass?.states)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:ft(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:a}=this._localeInfo();return Le(e,t,{hour12:a})}_openMaps(e,t){let a=encodeURIComponent(`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${a}`,"_blank","noreferrer")}_openCalendar(e,t,a,o,r){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let d=new Date(s.getTime()+7200*1e3),l=f=>f.toISOString().replace(/[-:]|\.\d{3}/g,""),c=`${t} vs ${a}`,u=`${o} ${r}`.trim(),i=`FFBB match: ${t} vs ${a}`,m=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c)}&dates=${l(s)}/${l(d)}&details=${encodeURIComponent(i)}&location=${encodeURIComponent(u)}`;window.open(m,"_blank","noreferrer")}_handleLogoClick(e,t,a){let o=this._config.logo_click_action||"team_url";o==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${a}".`),e&&this._fireMoreInfo(e)):o==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let a=this._modalTrigger;this._modalTrigger=null,a&&a.isConnected&&typeof a.focus=="function"&&a.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let a=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(a.length===0){e.preventDefault(),t.focus();return}let o=a[0],r=a[a.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===o||s===t)?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),o.focus())}_setManualView(e){this._manualView=e}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return ut(e,t)}_renderModal(e,t,a){if(!this._activeModal)return h``;if(this._activeModal==="standings"){let o=e.rank?.attributes?.standings||[],r=mt(o),s=e.poule?.attributes?.competition||"",d=e.poule?.state||"",l=r.map(i=>i.team_name||i.name||""),c=ie(l,t),u=ie(l,a);return h`
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
                        ${r.map(i=>{let m=i.team_name||i.name||"",f=c(m)||u(m);return h`
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
      `}if(this._activeModal==="form"){let o=e.form?.state,r=o&&o!=="unknown"&&o!=="unavailable",s=r?o:"",d=r&&e.form?.attributes?.current_streak||"",l=s.split("-").filter(Boolean);return h`
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
                      ${l.map(c=>{let u="badge-draw",i=this._t("card.draw","Draw");return c==="V"||c==="W"?(u="badge-win",i=this._t("card.win","Win")):(c==="D"||c==="L")&&(u="badge-loss",i=this._t("card.loss","Loss")),h`
                          <div class="form-badge-pill ${u}">
                            <span class="pill-char">${c}</span>
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
      `}if(this._activeModal==="calendar"){let o=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",s=e.poule?.state||"",d=o.flatMap(c=>[c.home_team||c.equipe_domicile||"",c.away_team||c.equipe_exterieur||""]),l=ie(d,t);return h`
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
              ${o.length>0?h`
                    <div class="calendar-list">
                      ${o.map(c=>{let u=c.home_team||c.equipe_domicile||"-",i=c.away_team||c.equipe_exterieur||"-",m=c.score||(c.home_score!==void 0?`${c.home_score} - ${c.away_score}`:""),f=this._formatDate(c.date||c.datetime),b=l(u),w=l(i);return h`
                          <div class="calendar-row ${b||w?"highlight-row":""}">
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${c.round||c.journee||"-"}</span>
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team ${b?"my-team-text":""}">${u}</div>
                              <div class="cal-team ${w?"my-team-text":""}">${i}</div>
                            </div>
                            <div class="calendar-col-meta">
                              ${m?h`<div class="cal-score">${m}</div>`:f?h`
                                    <div class="cal-date">${f.day}</div>
                                    <div class="cal-time">${f.time}</div>
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
      `}return h``}_computeViewModel(e){let{language:t,hour12:a}=this._localeInfo();return _t({entities:e,config:this._config,manualView:this._manualView,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:a,t:(o,r)=>this._t(o,r),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return h``;let e=this._resolveEntities();if(!e)return h`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let t=this._computeViewModel(e);return h`
      <ha-card style="--ffbb-accent-color: ${t.accentColor};">
        ${this._renderHeader(t)}

        <div class="container">
          ${this._renderWatermark(t)}
          ${this._renderMatchHeader(t)}
          ${this._renderMatchArea(t,e)}
          ${this._renderFooter(t)}
        </div>

        ${this._renderModal(e,t.searchTeamName,t.opponentSearchName)}
      </ha-card>
    `}_renderHeader(e){let{showTitle:t,titleText:a,titleIcon:o}=e;return h`
      ${t&&(a||o)?h`
            <div class="card-header">
              ${o?h`<ha-icon .icon=${o}></ha-icon>`:""}
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
              @error=${o=>o.target.style.display="none"}
              @load=${o=>o.target.style.display=""}
            />
            <img
              class="watermark watermark-right"
              src=${a}
              alt=""
              aria-hidden="true"
              @error=${o=>o.target.style.display="none"}
              @load=${o=>o.target.style.display=""}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:t,pouleName:a,roundNumber:o}=e;return h`
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
                <span>${o?`${this._t("card.round","Round")} ${o}`:this._t("card.calendar_title","Schedule")}</span>
                <ha-icon icon="mdi:calendar-month-outline" class="round-cal-icon"></ha-icon>
              </div>
            </div>
          `:""}
    `}_renderMatchArea(e,t){let{isValidState:a,isLive:o,canToggleView:r,isPostMatch:s,isGameDay:d,leftName:l,rightName:c,leftLogo:u,rightLogo:i,leftUrl:m,rightUrl:f,leftEntityId:b,rightEntityId:w,gymName:N,gymCity:B,dateFormatted:S,logoSizeClass:x,showRank:de,leftRank:$,rightRank:E,isCalendarClickable:y,isLogoClickable:v,hasStandingsData:g}=e,D=this._config?.rank_badge_style==="solid"||!!this._config?.solid_rank_badges?"rank-solid":"";return h`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${x} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(b,m,l)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(b,m,l)):p}
            role=${v?"button":p}
            tabindex=${v?"0":p}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",l):p}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${_=>{_.target.src.endsWith(P)||(_.target.src=P)}}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${r?h`
                <ha-icon
                  icon="mdi:chevron-left"
                  class="nav-chevron nav-chevron-left ${s?"disabled":""}"
                  @click=${()=>this._setManualView("last")}
                  @keydown=${this._onKeyActivate(()=>this._setManualView("last"))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_last_match","Show last played match")}
                  title=${this._t("card.view_last_match","Show last played match")}
                ></ha-icon>
              `:""}

          <div
            class="center-meta ${y?"clickable":""}"
            @click=${()=>{y&&this._openCalendar(t.nextDate?.state,l,c,N,B)}}
            @keydown=${y?this._onKeyActivate(()=>this._openCalendar(t.nextDate?.state,l,c,N,B)):p}
            role=${y?"button":p}
            tabindex=${y?"0":p}
            aria-label=${y?this._t("card.add_to_calendar","Add to Google Calendar"):p}
            title=${y?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${o?h`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${S?`${this._t("card.kickoff","Kick-off")} ${S.time}`:""}
                  </div>
                `:s?h`
                  <div class="score-display">
                    ${a(t.lastScore?.state)?t.lastScore.state:"-"}
                  </div>
                  <div class="badge badge-${a(t.lastResult?.state)?t.lastResult.state:"draw"}">
                    ${this._t(`card.${a(t.lastResult?.state)?t.lastResult.state:"draw"}`)}
                  </div>
                `:h`
                  ${S?h`
                        <div class="match-day">${S.weekday} ${S.day}</div>
                        <div class="match-time">${S.time}</div>
                      `:h`<div class="match-time">-</div>`}
                  ${d&&!t.nextDate?.attributes?.is_stale?h`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${t.nextDate?.attributes?.is_stale?h`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${r?h`
                <ha-icon
                  icon="mdi:chevron-right"
                  class="nav-chevron nav-chevron-right ${s?"":"disabled"}"
                  @click=${()=>this._setManualView("next")}
                  @keydown=${this._onKeyActivate(()=>this._setManualView("next"))}
                  role="button"
                  tabindex="0"
                  aria-label=${this._t("card.view_next_match","Show upcoming match")}
                  title=${this._t("card.view_next_match","Show upcoming match")}
                ></ha-icon>
              `:""}
        </div>

        <div class="team-logo-cell cell-right">
          <div
            class="logo-box ${x} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(w,f,c)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(w,f,c)):p}
            role=${v?"button":p}
            tabindex=${v?"0":p}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",c):p}
          >
            <img
              class="logo"
              src=${i}
              alt=""
              @error=${_=>{_.target.src.endsWith(P)||(_.target.src=P)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${l}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${c}</div>
        </div>

        ${de&&($||E)?h`
              <div class="team-rank-cell rank-left">
                ${$?h`
                      <span
                        class="rank-badge ${this._getRankClass($)} ${D} ${g?"clickable-badge":""}"
                        @click=${()=>{g&&this._openModal("standings")}}
                        @keydown=${g?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${g?"button":p}
                        tabindex=${g?"0":p}
                        aria-label=${g?this._t("card.view_standings","View league standings"):p}
                        title=${g?this._t("card.view_standings","View league standings"):""}
                      >${$}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${E?h`
                      <span
                        class="rank-badge ${this._getRankClass(E)} ${D} ${g?"clickable-badge":""}"
                        @click=${()=>{g&&this._openModal("standings")}}
                        @keydown=${g?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${g?"button":p}
                        tabindex=${g?"0":p}
                        aria-label=${g?this._t("card.view_standings","View league standings"):p}
                        title=${g?this._t("card.view_standings","View league standings"):""}
                      >${E}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:a,hasValidForm:o,isPreview:r,displayFormSequence:s,displayFormStreak:d,showFormBlock:l}=e;return h`
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
              ${!o&&r?h`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
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
    `}static get styles(){return $t}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",ze);console.info(`%c FFBB Tracker Card %c v${Q} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var wt=window.customCards.findIndex(n=>n.type==="ffbb-tracker-card"),xt={type:"ffbb-tracker-card",name:`FFBB Tracker v${Q}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};wt!==-1?window.customCards[wt]=xt:window.customCards.push(xt);
