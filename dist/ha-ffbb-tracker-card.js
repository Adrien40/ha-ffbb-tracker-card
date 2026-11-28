var Ze=globalThis,Qe=Ze.ShadowRoot&&(Ze.ShadyCSS===void 0||Ze.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kt=Symbol(),ya=new WeakMap,Te=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o,a=this.t;if(Qe&&e===void 0){let o=a!==void 0&&a.length===1;o&&(e=ya.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&ya.set(a,e))}return e}toString(){return this.cssText}},wa=t=>new Te(typeof t=="string"?t:t+"",void 0,kt),ne=(t,...e)=>{let a=t.length===1?t[0]:e.reduce((o,n,s)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1],t[0]);return new Te(a,t,kt)},va=(t,e)=>{if(Qe)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of e){let o=document.createElement("style"),n=Ze.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=a.cssText,t.appendChild(o)}},St=Qe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(let o of e.cssRules)a+=o.cssText;return wa(a)})(t):t;var{is:Ko,defineProperty:Yo,getOwnPropertyDescriptor:Jo,getOwnPropertyNames:Xo,getOwnPropertySymbols:Zo,getPrototypeOf:Qo}=Object,ee=globalThis,$a=ee.trustedTypes,en=$a?$a.emptyScript:"",tn=ee.reactiveElementPolyfillSupport,Le=(t,e)=>t,At={toAttribute(t,e){switch(e){case Boolean:t=t?en:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},Sa=(t,e)=>!Ko(t,e),ka={attribute:!0,type:String,converter:At,reflect:!1,useDefault:!1,hasChanged:Sa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ee.litPropertyMetadata??(ee.litPropertyMetadata=new WeakMap);var J=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=ka){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){let o=Symbol(),n=this.getPropertyDescriptor(e,o,a);n!==void 0&&Yo(this.prototype,e,n)}}static getPropertyDescriptor(e,a,o){let{get:n,set:s}=Jo(this.prototype,e)??{get(){return this[a]},set(r){this[a]=r}};return{get:n,set(r){let i=n?.call(this);s?.call(this,r),this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ka}static _$Ei(){if(this.hasOwnProperty(Le("elementProperties")))return;let e=Qo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Le("properties"))){let a=this.properties,o=[...Xo(a),...Zo(a)];for(let n of o)this.createProperty(n,a[n])}let e=this[Symbol.metadata];if(e!==null){let a=litPropertyMetadata.get(e);if(a!==void 0)for(let[o,n]of a)this.elementProperties.set(o,n)}this._$Eh=new Map;for(let[a,o]of this.elementProperties){let n=this._$Eu(a,o);n!==void 0&&this._$Eh.set(n,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let a=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let n of o)a.unshift(St(n))}else e!==void 0&&a.push(St(e));return a}static _$Eu(e,a){let o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,a=this.constructor.elementProperties;for(let o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return va(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$ET(e,a){let o=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,o);if(n!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:At).toAttribute(a,o.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,a){let o=this.constructor,n=o._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let s=o.getPropertyOptions(n),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:At;this._$Em=n;let i=r.fromAttribute(a,s.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(e,a,o,n=!1,s){if(e!==void 0){let r=this.constructor;if(n===!1&&(s=this[e]),o??(o=r.getPropertyOptions(e)),!((o.hasChanged??Sa)(s,a)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:o,reflect:n,wrapped:s},r){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??a??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(a=void 0),this._$AL.set(e,a)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[n,s]of o){let{wrapped:r}=s,i=this[n];r!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,s,i)}}let e=!1,a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(a)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(a)}willUpdate(e){}_$AE(e){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[Le("elementProperties")]=new Map,J[Le("finalized")]=new Map,tn?.({ReactiveElement:J}),(ee.reactiveElementVersions??(ee.reactiveElementVersions=[])).push("2.1.2");var Oe=globalThis,Aa=t=>t,et=Oe.trustedTypes,Ca=et?et.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oa="$lit$",te=`lit$${Math.random().toFixed(9).slice(2)}$`,Da="?"+te,an=`<${Da}>`,ie=document,De=()=>ie.createComment(""),Ie=t=>t===null||typeof t!="object"&&typeof t!="function",Ot=Array.isArray,on=t=>Ot(t)||typeof t?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ea=/-->/g,Ma=/>/g,se=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ta=/'/g,La=/"/g,Ia=/^(?:script|style|textarea|title)$/i,Dt=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),c=Dt(1),Hn=Dt(2),Vn=Dt(3),le=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Na=new WeakMap,re=ie.createTreeWalker(ie,129);function Ra(t,e){if(!Ot(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ca!==void 0?Ca.createHTML(e):e}var nn=(t,e)=>{let a=t.length-1,o=[],n,s=e===2?"<svg>":e===3?"<math>":"",r=Ne;for(let i=0;i<a;i++){let l=t[i],d,p,m=-1,u=0;for(;u<l.length&&(r.lastIndex=u,p=r.exec(l),p!==null);)u=r.lastIndex,r===Ne?p[1]==="!--"?r=Ea:p[1]!==void 0?r=Ma:p[2]!==void 0?(Ia.test(p[2])&&(n=RegExp("</"+p[2],"g")),r=se):p[3]!==void 0&&(r=se):r===se?p[0]===">"?(r=n??Ne,m=-1):p[1]===void 0?m=-2:(m=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?se:p[3]==='"'?La:Ta):r===La||r===Ta?r=se:r===Ea||r===Ma?r=Ne:(r=se,n=void 0);let h=r===se&&t[i+1].startsWith("/>")?" ":"";s+=r===Ne?l+an:m>=0?(o.push(d),l.slice(0,m)+Oa+l.slice(m)+te+h):l+te+(m===-2?i:h)}return[Ra(t,s+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},Re=class t{constructor({strings:e,_$litType$:a},o){let n;this.parts=[];let s=0,r=0,i=e.length-1,l=this.parts,[d,p]=nn(e,a);if(this.el=t.createElement(d,o),re.currentNode=this.el.content,a===2||a===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=re.nextNode())!==null&&l.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(Oa)){let u=p[r++],h=n.getAttribute(m).split(te),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:s,name:f[2],strings:h,ctor:f[1]==="."?Mt:f[1]==="?"?Tt:f[1]==="@"?Lt:be}),n.removeAttribute(m)}else m.startsWith(te)&&(l.push({type:6,index:s}),n.removeAttribute(m));if(Ia.test(n.tagName)){let m=n.textContent.split(te),u=m.length-1;if(u>0){n.textContent=et?et.emptyScript:"";for(let h=0;h<u;h++)n.append(m[h],De()),re.nextNode(),l.push({type:2,index:++s});n.append(m[u],De())}}}else if(n.nodeType===8)if(n.data===Da)l.push({type:2,index:s});else{let m=-1;for(;(m=n.data.indexOf(te,m+1))!==-1;)l.push({type:7,index:s}),m+=te.length-1}s++}}static createElement(e,a){let o=ie.createElement("template");return o.innerHTML=e,o}};function _e(t,e,a=t,o){if(e===le)return e;let n=o!==void 0?a._$Co?.[o]:a._$Cl,s=Ie(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(t),n._$AT(t,a,o)),o!==void 0?(a._$Co??(a._$Co=[]))[o]=n:a._$Cl=n),n!==void 0&&(e=_e(t,n._$AS(t,e.values),n,o)),e}var Et=class{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:a},parts:o}=this._$AD,n=(e?.creationScope??ie).importNode(a,!0);re.currentNode=n;let s=re.nextNode(),r=0,i=0,l=o[0];for(;l!==void 0;){if(r===l.index){let d;l.type===2?d=new Pe(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new Nt(s,this,e)),this._$AV.push(d),l=o[++i]}r!==l?.index&&(s=re.nextNode(),r++)}return re.currentNode=ie,n}p(e){let a=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,a),a+=o.strings.length-2):o._$AI(e[a])),a++}},Pe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,o,n){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=_e(this,e,a),Ie(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==le&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):on(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&Ie(this._$AH)?this._$AA.nextSibling.data=e:this.T(ie.createTextNode(e)),this._$AH=e}$(e){let{values:a,_$litType$:o}=e,n=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Re.createElement(Ra(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(a);else{let s=new Et(n,this),r=s.u(this.options);s.p(a),this.T(r),this._$AH=s}}_$AC(e){let a=Na.get(e.strings);return a===void 0&&Na.set(e.strings,a=new Re(e)),a}k(e){Ot(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,o,n=0;for(let s of e)n===a.length?a.push(o=new t(this.O(De()),this.O(De()),this,this.options)):o=a[n],o._$AI(s),n++;n<a.length&&(this._$AR(o&&o._$AB.nextSibling,n),a.length=n)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){let o=Aa(e).nextSibling;Aa(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},be=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,o,n,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=a,this._$AM=n,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=g}_$AI(e,a=this,o,n){let s=this.strings,r=!1;if(s===void 0)e=_e(this,e,a,0),r=!Ie(e)||e!==this._$AH&&e!==le,r&&(this._$AH=e);else{let i=e,l,d;for(e=s[0],l=0;l<s.length-1;l++)d=_e(this,i[o+l],a,l),d===le&&(d=this._$AH[l]),r||(r=!Ie(d)||d!==this._$AH[l]),d===g?e=g:e!==g&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}r&&!n&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Mt=class extends be{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},Tt=class extends be{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},Lt=class extends be{constructor(e,a,o,n,s){super(e,a,o,n,s),this.type=5}_$AI(e,a=this){if((e=_e(this,e,a,0)??g)===le)return;let o=this._$AH,n=e===g&&o!==g||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==g&&(o===g||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nt=class{constructor(e,a,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){_e(this,e)}};var sn=Oe.litHtmlPolyfillSupport;sn?.(Re,Pe),(Oe.litHtmlVersions??(Oe.litHtmlVersions=[])).push("3.3.3");var Pa=(t,e,a)=>{let o=a?.renderBefore??e,n=o._$litPart$;if(n===void 0){let s=a?.renderBefore??null;o._$litPart$=n=new Pe(e.insertBefore(De(),s),s,void 0,a??{})}return n._$AI(t),n};var ze=globalThis,j=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;let e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pa(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return le}};j._$litElement$=!0,j.finalized=!0,ze.litElementHydrateSupport?.({LitElement:j});var rn=ze.litElementPolyfillSupport;rn?.({LitElement:j});(ze.litElementVersions??(ze.litElementVersions=[])).push("4.2.2");var Fe="0.7.4";var Be={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",display_mode:"match",standings_title:"",standings_icon:"mdi:format-list-numbered",standings_popup_detailed:!1,show_form:!0,show_venue:!0,show_watermark:!0,show_calendar_logos:!0,show_standings_logos:!0};var za={nextOpponent:["prochain_match_adversaire","next_match_opponent"],nextDate:["prochain_match_date","next_match_date"],nextLocation:["prochain_match_lieu","next_match_location"],nextVenue:["prochain_match_terrain","next_match_venue","next_match_venue_type"],lastScore:["dernier_match_score","last_match_score"],lastOpponent:["dernier_match_adversaire","last_match_opponent"],lastResult:["dernier_match_resultat","last_match_result"],lastDate:["dernier_match_date","last_match_date"],poule:["poule","pool"],rank:["classement","rank"],rankEvolution:["classement_evolution","rank_evolution"],form:["forme_recente","recent_form","form"]},Fa={matchInProgress:["match_en_cours","match_in_progress"]},It=["prochain_match","next_match","dernier_match","last_match","classement","rank","poule","pool","forme_recente","recent_form","form","game_day","jour_de_match","match_en_cours","match_in_progress"],ns=new RegExp(`^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${It.join("|")})`),Rt="ffbb_tracker",ln={nextOpponent:"next_match_opponent",nextDate:"next_match_date",nextLocation:"next_match_location",nextVenue:"next_match_venue_type",lastScore:"last_match_score",lastOpponent:"last_match_opponent",lastResult:"last_match_result",lastDate:"last_match_date",poule:"poule",rank:"rank",rankEvolution:"rank_evolution",form:"form",matchInProgress:"match_in_progress"},Ba=new Map(Object.entries(ln).map(([t,e])=>[e,t]));var cn=["win","loss","draw"],A="/local/community/ha-ffbb-tracker-card/brand/icon.png";function Ue(t){return typeof t=="string"?t:typeof t=="number"?String(t):""}function F(t){return Ue(t).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function Ua(t){return Ue(t).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bphase\s*(\d+)\b/g,"phase$1").replace(/([a-z0-9])[^a-z0-9]+(?=\d)/g,"$1_").replace(/[^a-z0-9_]/g,"")}function dn(t,e){if(!t||!e)return!1;if(t===e)return!0;let[a,o]=t.length<=e.length?[t,e]:[e,t],n=/\d$/.test(a.replace(/_/g,""));for(let s=o.indexOf(a);s!==-1;s=o.indexOf(a,s+1))if(hn(o.slice(0,s),o.slice(s+a.length),n))return!0;return!1}function ae(t,e){let a=F(t),o=F(e);return!a||!o?!1:a===o?!0:dn(Ua(t),Ua(e))}var Ha=/u(?:7|8|9|1\d|20|21)[mf]?|(?:nm|nf|rm|rf|dm|df|pm|pf)\d|phase\d+/g;function hn(t,e,a){let o=t.replace(Ha,"").replace(/_/g,""),n=e.replace(Ha,""),s=n.startsWith("_"),r=n.replace(/_/g,"");return/(^|\D)1$/.test(r)&&!(r==="1"&&a&&!s)&&(r=r.slice(0,-1)),!/\d/.test(o)&&!/\d/.test(r)}var Va={fr:{win:"V",loss:"D",draw:"N"},en:{win:"W",loss:"L",draw:"D"}};function zt(t){let e=String(t??"").trim().toLowerCase();return e?e.replace(/_/g,"-").split("-")[0]:""}function Ft(t,e){let a=String(t??"").trim().toUpperCase();if(!a)return null;let o=zt(e);if(o){let n=Va[o]||Va.en,s=Object.keys(n).find(r=>n[r]===a);if(s)return s}return a==="V"||a==="W"?"win":a==="L"?"loss":a==="N"?"draw":a==="D"?o?null:"loss":null}function Ja(t,e){return Ft(t,e)??"draw"}function tt(t,e,a){let o=zt(e);return!o||typeof t!="string"||!a?t:t.split("-").map(n=>{let s=Ft(n,o);return s&&a[s]||n}).join("-")}function at(t,e,a){let o=zt(e);if(!o||typeof t!="string"||!a)return t;let n=/^(\d+)\s*([A-Za-z])$/.exec(t.trim());if(!n)return t;let s=Ft(n[2],o);return s?`${n[1]}${a[s]||n[2]}`:t}function Bt(t,e){if(typeof t?.is_home=="boolean")return{isHomeMyTeam:t.is_home,isAwayMyTeam:!t.is_home};let a=!!e(t?.home_team||""),o=!!e(t?.away_team||"");if(!a&&!o){if(b(t?.home_team)&&!b(t?.away_team))return{isHomeMyTeam:!1,isAwayMyTeam:!0};if(b(t?.away_team)&&!b(t?.home_team))return{isHomeMyTeam:!0,isAwayMyTeam:!1}}return{isHomeMyTeam:a,isAwayMyTeam:o}}function nt(t,e,a=null){if(!t||!e)return null;let o=fn(t,e),n=pn(t,e,a);if(!n)return o;let s={};for(let r of Object.keys(o))s[r]=n[r]??o[r];return s}function pn(t,e,a){let o=a?.[t];if(!o?.device_id||o.platform&&o.platform!==Rt)return null;let n={},s=!1;for(let[r,i]of Object.entries(a)){if(i?.device_id!==o.device_id||i.platform&&i.platform!==Rt)continue;let l=Ba.get(i.translation_key);l&&e[r]&&(n[l]=e[r],s=!0)}return s?n:null}function un(t,e,a){let o=s=>{for(let r of s)if(a[r])return a[r];return null},n={};for(let[s,r]of Object.entries(za))n[s]=o(r.map(i=>`${t}${i}`));for(let[s,r]of Object.entries(Fa))n[s]=o(r.map(i=>`${e}${i}`));return n}function fn(t,e){let a=t.slice(t.indexOf(".")+1),o=[];for(let r=1;r<a.length;r++)if(a[r]==="_"&&It.some(i=>a.startsWith(i,r+1))){let i=a.slice(0,r);o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}if(o.length===0){let r=a.lastIndexOf("_"),i=r>0?a.slice(0,r):a;o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}let n=null,s=-1;for(let[r,i]of o){let l=un(r,i,e),d=Object.values(l).filter(Boolean).length;d>s&&(n=l,s=d)}return n}function b(t){let e=String(t??"").trim().toLowerCase();return e==="n/a"||/^exempt(?:[\s-]+\d+)?$/.test(e)}function de(t,e){let a=F(e||"");if(!a||b(e))return()=>!1;let o=(Array.isArray(t)?t:[]).some(n=>{if(b(n))return!1;let s=F(n||"");return!!s&&s===a});return n=>{if(b(n))return!1;let s=F(n||"");return s?o?s===a:ae(n,e):!1}}function ja(t){return!t||typeof t!="string"?null:t.trim().split(/[?#]/)[0].replace(/\/+$/,"").toLowerCase()||null}function mn(t,e,{opponentUrl:a=null}={}){if(Array.isArray(e)&&a){let s=ja(a),r=s?e.find(i=>!i||b(i.team_name||i.name)?!1:[i.team_url,i.url,i.link].some(l=>ja(l)===s)):null;if(r)return r.position??r.rank}if(!t||b(t)||!Array.isArray(e))return null;let o=F(t);if(!o)return null;let n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name;if(b(r))return!1;let i=F(r);return!!(i&&i===o)});if(n||(n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name;return b(r)?!1:ae(r,t)})),!n){let s=o.replace(/\d+$/,"");if(s&&s!==o){let r=e.filter(i=>{if(!i)return!1;let l=i.team_name||i.name;if(b(l))return!1;let d=F(l);return!!d&&d.startsWith(s)});r.length===1&&F(r[0].team_name||r[0].name)===s&&(n=r[0])}}return n?n.position??n.rank:null}function xe(t,e){if(t==null||t===""||isNaN(Number(t)))return null;let a=parseInt(t,10);if(a<=0)return null;if(e==="fr")return a===1?"1er":`${a}e`;let o=a%10,n=a%100;return o===1&&n!==11?`${a}st`:o===2&&n!==12?`${a}nd`:o===3&&n!==13?`${a}rd`:`${a}th`}function Ut(t,e){if(typeof t!="string")return null;let a=t.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);if(!a)return null;let[,o,n]=a;return e?{my:o,opponent:n,mineFirst:!0}:{my:n,opponent:o,mineFirst:!1}}function gn(t,e,a){let o=r=>/^\d+$/.test(String(r??"").trim())?Number(r):null,n=o(e?.team_score),s=o(e?.opponent_score);if(n===null||s===null){let r=typeof t=="string"?t.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/):null;if(!r)return t;n=Number(r[1]),s=Number(r[2])}return a?`${n} - ${s}`:`${s} - ${n}`}function ot(t,e,a){if(!Array.isArray(e)||b(t))return null;let o=F(t);if(!o)return null;let n=e.find(s=>{let r=s?.team_name||s?.name||"";if(b(r))return!1;let i=F(r);return!!(i&&i===o)});if(n||(n=e.find(s=>{let r=s?.team_name||s?.name||"";return b(r)?!1:ae(r,t)})),!n)return null;for(let s of a)if(n[s]){let r=E(n[s]);if(r)return r}return null}function _n(t){if(!Array.isArray(t)||t.length<2)return t;let e=t.map(a=>{let o=parseInt(String(a?.round??"").trim(),10);return Number.isFinite(o)?o:null});return e.some(a=>a===null)||new Set(e).size!==e.length?t:t.map((a,o)=>({m:a,r:e[o]})).sort((a,o)=>a.r-o.r).map(a=>a.m)}function Ht(t,e){return _n(bn(t,e))}function bn(t,e){let a=t?.poule?.attributes?.calendar||t?.poule?.attributes?.matches||t?.poule?.attributes?.schedule;if(Array.isArray(a)&&a.length>0)return a;let o=t?.nextDate?.attributes?.calendar||t?.nextDate?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let n=t?.rank?.attributes?.calendar||t?.rank?.attributes?.matches;if(Array.isArray(n)&&n.length>0)return n;let s=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(s)&&s.length>0?s:[]}function E(t){if(!t||typeof t!="string")return null;let e=t.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function qa(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);return isNaN(a.getTime())?!1:a.getFullYear()===e.getFullYear()&&a.getMonth()===e.getMonth()&&a.getDate()===e.getDate()}function Xa(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);if(isNaN(a.getTime()))return!1;let o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),n=new Date(o);n.setDate(n.getDate()+2);let s=e.getTime();return s>=a.getTime()&&s<n.getTime()}function xn(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);if(isNaN(a.getTime()))return!1;let o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),n=new Date(o);return n.setDate(n.getDate()-1),e.getTime()>=n.getTime()}var Vt=3;function jt(t){let e=Number(t?.nextDate?.attributes?.result_grace_hours);return Number.isFinite(e)&&e>0?e:Vt}var Za=t=>t?t.score?String(t.score):t.home_score!=null&&t.away_score!=null?`${t.home_score} - ${t.away_score}`:"":"",ye=t=>!!(t&&(t.is_played||Za(t))),X=t=>Date.parse(t?.date??t?.datetime);function st(t,e=new Date,a=Vt){if(!t||t.is_exempt||ye(t))return!1;let o=X(t);return Number.isNaN(o)?!1:e.getTime()-o>a*36e5}function Ga(t,e=new Date){if(!Array.isArray(t))return-1;let a=-1,o=-1/0;for(let n=0;n<t.length;n++){let s=t[n],r=s?.date??s?.datetime;if(s&&!ye(s)&&r&&Xa(r,e)){let i=X(s),l=Number.isFinite(i)?i:-1/0;(a===-1||l>=o)&&(a=n,o=l)}}return a}function yn(t){if(!Array.isArray(t)||t.length===0)return 0;let e=-1,a=-1/0;for(let o=0;o<t.length;o++){let n=X(t[o]);Number.isFinite(n)&&(e===-1||n>=a)&&(e=o,a=n)}return e!==-1?e:t.length-1}function wn(t){if(!Array.isArray(t))return-1;let e=-1,a=-1/0;for(let o=0;o<t.length;o++){if(!ye(t[o]))continue;let n=X(t[o]),s=Number.isFinite(n)?n:-1/0;(e===-1||s>=a)&&(e=o,a=s)}return e}function qt(t,e=new Date,a=Vt){if(!Array.isArray(t))return-1;let o=r=>!!r?.is_exempt,n=r=>{let i=-1,l=1/0;return t.forEach((d,p)=>{if(!r(d))return;let m=X(d),u=Number.isFinite(m)?m:1/0;(i===-1||u<l)&&(i=p,l=u)}),i},s=n(r=>!o(r)&&!ye(r)&&!st(r,e,a));return s!==-1?s:n(r=>!o(r)&&!ye(r))}function Wa(t,e,a){if(!Array.isArray(t)||!Number.isInteger(e)||e<0||e>=t.length)return-1;let o=t.map((i,l)=>l),n=o.filter(i=>Number.isFinite(X(t[i]))),s=[...n].sort((i,l)=>X(t[i])-X(t[l])||i-l);n.forEach((i,l)=>{o[i]=s[l]});let r=o.indexOf(e)+(a==="prev"?-1:1);return r>=0&&r<o.length?o[r]:-1}function vn(t,{matchNumber:e,dateStr:a}={}){if(!Array.isArray(t))return-1;let o=String(e??"").trim();if(o){let s=t.findIndex(r=>String(r?.match_number??"").trim()===o);if(s!==-1)return s}let n=Date.parse(a);return Number.isNaN(n)?-1:t.findIndex(s=>X(s)===n)}function $n({defaultView:t="auto",manualView:e=null,isLive:a=!1,lastDate:o=null,hasLastScore:n=!1,hasLastMatch:s=!0,nextDate:r=null,hasNextMatch:i=!1,nextIsStale:l=!1,now:d=new Date}={}){return a||!s?!1:e!==null?e==="last":t==="next"?!1:t==="last"?!(!n||i&&!l&&xn(r,d)):!!(n&&(l||Xa(o,d)))}var kn=["match","standings","both"];function ce(t){return t&&t!=="unknown"&&t!=="unavailable"?t:""}function rt(t){return kn.includes(t?.display_mode)?t.display_mode:"match"}var Ka=3,Sn=3,An=2;function Ya(t){let e=Number.isFinite(t)&&t>0?t:0;return Sn+Math.ceil(e/An)}function Qa({config:t,standings:e}={}){let a=rt(t),o=Array.isArray(e)?e.length:0;return a==="match"?Ka:a==="standings"?Ya(o):Ka+Ya(o)}function it(t){return Array.isArray(t)?[...t].sort((e,a)=>{let o=n=>{let s=parseInt(n?.position??n?.rank,10);return isNaN(s)?999:s};return o(e)-o(a)}):[]}function Cn(t,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(t,e):null}var En=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function He(t,e=Cn){if(typeof t!="string")return!1;let a=t.trim();if(!a||/[;{}<>\\"']/.test(a))return!1;let o=e("color",a);return typeof o=="boolean"?o:En.test(a)}function Mn(t){let e=t?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&He(t?.custom_accent_color)?t.custom_accent_color.trim():"#ff6b00"}function eo(t,e){if(t==="12"||t==="am_pm")return!0;if(t==="24"||t==="twenty_four")return!1;let a=t==="system"?void 0:e;try{let o=new Intl.DateTimeFormat(a,{hour:"numeric"}).resolvedOptions();return typeof o.hour12=="boolean"?o.hour12:o.hourCycle==="h12"||o.hourCycle==="h11"}catch{return!1}}function Gt(t,e="en-US",{hour12:a}={}){if(!t||t==="unknown"||t==="unavailable")return null;let o=new Date(t);if(isNaN(o.getTime()))return null;let n=typeof a=="boolean"?{hour:a?"numeric":"2-digit",minute:"2-digit",hourCycle:a?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},s=r=>({weekday:o.toLocaleDateString(r,{weekday:"short"}),day:o.toLocaleDateString(r,{day:"numeric",month:"short"}),time:o.toLocaleTimeString(r,n)});try{return s(e||"en-US")}catch{return s("en-US")}}function Pt({isHome:t=!0,isMyTeam:e=t,teamName:a="",entities:o={},opponentSensor:n=null,selectedEntity:s=null}={}){let r=(i,l)=>{if(!i||typeof i!="object")return null;for(let d of l)if(i[d]){let p=E(i[d]);if(p)return p}return null};if(e){let i=r(n?.attributes,["team_url","team_link"]);if(i)return i;let l=[s,o?.nextDate,o?.lastDate,o?.rank];for(let m of l){let u=r(m?.attributes,["team_url","team_link"]);if(u)return u}let d=o?.rank?.attributes?.standings||s?.attributes?.standings,p=ot(a,d,["team_url","url","link"]);if(p)return p}else{let i=r(n?.attributes,["opponent_url","opponent_team_url","opponent_link"]);if(i)return i;let l=o?.rank?.attributes?.standings||s?.attributes?.standings,d=ot(a,l,["team_url","url","link"]);if(d)return d}return null}function lt({teamName:t="",matchLogo:e=null,isMyTeam:a=!1,myTeamLogo:o=null,nextOpponentState:n=null,nextOpponentLogo:s=null,lastOpponentState:r=null,lastOpponentLogo:i=null,standings:l=null}={}){let d=E(e);if(d)return d;let p=E(o);if(a&&p&&p!==A)return p;if(F(t)&&!b(t)){if(n&&!b(n)&&ae(n,t)){let u=E(s);if(u)return u}if(r&&!b(r)&&ae(r,t)){let u=E(i);if(u)return u}if(Array.isArray(l)&&l.length>0){let u=ot(t,l,["team_logo_url","opponent_logo_url","logo_url","logo","team_logo","club_logo","crest","image","image_url","badge"]);if(u)return u}}return a&&p?p:A}function to({entities:t={},config:e={},manualView:a=null,matchIndex:o=null,states:n={},lang:s="fr",locale:r=null,hour12:i=void 0,t:l=(u,h="")=>h,isPreview:d=!1,now:p=new Date,instanceLanguage:m=""}={}){let u=k=>!!(k&&k!=="unknown"&&k!=="unavailable"),h=!!(t.matchInProgress&&t.matchInProgress.state==="on"),f=t.lastScore?.state,_=u(f),S=t.nextDate?.state,$=u(S),V=_||u(t.lastOpponent?.state)||u(t.lastDate?.state),P=$||u(t.nextOpponent?.state),M=e.entity&&n?n[e.entity]:null,v=Ht(t,M),y=Array.isArray(v)&&v.length>0,L=y?wn(v):-1,C=jt(t),he=y?qt(v,p,C):-1,q=y&&he===-1&&Ga(v,p)===-1&&!$&&_&&!h&&a===null&&e.default_match_view!=="next"||$n({defaultView:e.default_match_view||"auto",manualView:a,isLive:h,lastDate:t.lastDate?.state,hasLastScore:_,hasLastMatch:V,nextDate:S,hasNextMatch:$,nextIsStale:!!t.nextDate?.attributes?.is_stale&&Date.parse(S)<Date.parse(t.lastDate?.state),now:p}),Z=y&&!h&&!q&&a===null&&e.default_match_view!=="next"&&typeof o!="number"?Ga(v,p):-1,G=typeof o=="number"&&!h?o:Z!==-1?Z:null,B=k=>y?vn(v,{matchNumber:t[k]?.attributes?.match_number,dateStr:t[k]?.state}):-1,U=(k,Q)=>k!==-1?k:Q,W=B("lastDate"),ve=B("nextDate"),I=U(W,L),N=U(ve,he),Zt=y?yn(v):0,O;typeof G=="number"&&y?O=Math.max(0,Math.min(G,v.length-1)):a==="last"?O=I!==-1?I:0:a==="next"?O=N!==-1?N:Zt:q?O=I!==-1?I:0:O=N!==-1?N:Zt;let w=typeof G=="number"&&y&&!!v[O]?v[O]:null,T=w?ye(w):q,uo=!h&&(y&&v.length>1||V&&P),Ve=y&&v.length>1,Qt=Ve?Wa(v,O,"prev"):-1,ea=Ve?Wa(v,O,"next"):-1,fo=Ve?Qt!==-1:!T,mo=Ve?ea!==-1:T,go=!T&&!h&&(w?!!(w.date&&qa(w.date,p)):$&&qa(S,p)),pe=t.poule?.attributes?.team||"",ta=Ue(e.custom_team_name).trim(),oe=ta||pe||l("card.unknown_team","My team"),x,K,Y,$e,ke,je,qe,Ge,We,Ke,Ye,Se,pt,Ae,H,R=T?t.lastOpponent:t.nextOpponent,ue=R?.state;if(w){let k=w.home_team||"",Q=w.away_team||"",vt=de([k,Q],pe||oe),{isHomeMyTeam:Go}=Bt(w,vt);x=Go,K=x?Q:k,Y=K;let me=D=>t[D]?.attributes,Wo=me("nextOpponent")?.team_logo_url||me("lastOpponent")?.team_logo_url||me("nextDate")?.team_logo_url||me("lastDate")?.team_logo_url||null,pa=t.rank?.attributes?.standings,$t=T?O===I:O===N,ua=$t?E(R?.attributes?.opponent_logo_url):null,fa=(D,ge,Ce)=>{let Ee=lt({teamName:D,matchLogo:ge,isMyTeam:Ce,myTeamLogo:Wo,nextOpponentState:t.nextOpponent?.state,nextOpponentLogo:me("nextOpponent")?.opponent_logo_url,lastOpponentState:t.lastOpponent?.state,lastOpponentLogo:me("lastOpponent")?.opponent_logo_url,standings:pa});return Ee===A&&!Ce&&!b(D)&&ua?ua:Ee},ma=fa(k,w.home_logo||w.home_team_logo,x),ga=fa(Q,w.away_logo||w.away_team_logo,!x);$e=x?ma:ga,ke=x?ga:ma;let _a=(D,ge)=>!b(D)&&!b(ge)&&ae(D,ge),ba=(D,ge,Ce)=>{if(!Ce&&b(D))return null;let Ee=E(ge);if(Ee)return Ee;if(Ce)return Pt({isHome:!0,teamName:pe||oe,entities:t,opponentSensor:R,selectedEntity:M});if($t){let Me=E(R?.attributes?.opponent_url);if(Me)return Me}for(let Me of[t.nextOpponent,t.lastOpponent])if(_a(Me?.state,D)){let xa=E(Me?.attributes?.opponent_url);if(xa)return xa}return ot(D,pa,["team_url","url","link"])};je=ba(k,w.home_url,x),qe=ba(Q,w.away_url,!x),Ge=E(x?w.away_url:w.home_url)||($t?E(R?.attributes?.opponent_url):null)||[t.nextOpponent,t.lastOpponent].map(D=>_a(D?.state,K)?E(D?.attributes?.opponent_url):null).find(Boolean)||null,We=w.gym_name||"",Ke=w.gym_city||"",Ye=w.formatted_address||"",Se=w.date??w.datetime??null,pt=String(w.round??""),Ae=!!w.is_stale,H=!!w.is_exempt||b(K)}else{K=u(ue)?ue:l("card.unknown_opponent","Opponent"),Y=u(ue)?ue:"",x=T?t.lastScore?.attributes?.is_home??t.lastDate?.attributes?.is_home??!0:t.nextVenue?.state==="home"||t.nextOpponent?.attributes?.is_home===!0,$e=E(R?.attributes?.team_logo_url)||A,ke=E(R?.attributes?.opponent_logo_url)||A;let k=pe||oe,Q=x?k:Y,vt=x?Y:k;je=Pt({isHome:x,teamName:Q,entities:t,opponentSensor:R,selectedEntity:M}),qe=Pt({isHome:!x,teamName:vt,entities:t,opponentSensor:R,selectedEntity:M}),Ge=E(R?.attributes?.opponent_url)||E(R?.attributes?.opponent_team_url)||null,pt=T?t.lastDate?.attributes?.round||"":t.nextDate?.attributes?.round||"",T?(We=t.lastDate?.attributes?.gym_name||"",Ke=t.lastDate?.attributes?.gym_city||"",Ye=t.lastDate?.attributes?.formatted_address||""):(We=t.nextLocation?.attributes?.gym_name||t.nextOpponent?.attributes?.gym_name||"",Ke=t.nextLocation?.attributes?.gym_city||t.nextOpponent?.attributes?.gym_city||"",Ye=t.nextLocation?.attributes?.formatted_address||t.nextOpponent?.attributes?.formatted_address||""),Se=T?t.lastDate?.state:t.nextDate?.state,Ae=!!t.nextDate?.attributes?.is_stale,H=!T&&(!!t.nextDate?.attributes?.is_exempt||b(ue))}H&&(K=l("card.exempt","Bye"),Y="",Ge=null,x?qe=null:je=null);let _o=x?oe:K,bo=x?K:oe,xo=x?$e:ke,yo=x?ke:$e,ut=pe||oe,wo=x?ut:Y,vo=x?Y:ut,aa=H?null:R?.entity_id,$o=x?e.entity:aa,ko=x?aa:e.entity,So=ce(t.poule?.attributes?.competition),Ao=ce(t.poule?.state),Co=Gt(Se,r||s,{hour12:i}),Je={win:l("card.form_letter_win","W"),loss:l("card.form_letter_loss","L"),draw:l("card.form_letter_draw","D")},oa=at(t.form?.attributes?.current_streak||"",m,Je),ft=t.form?.state,mt=u(ft)?tt(ft,m,Je):ft,Xe=u(mt),Eo=Xe?mt:d?tt("V-V-D-V-N","fr",Je):"",Mo=Xe?oa:d?at("2V","fr",Je):"",To=e.show_form&&(Xe||d),Lo=!!e.show_venue&&y&&v.some(k=>k&&(k.gym_name||k.gym_city)),No=e.show_title!==!1,gt=Ue(e.title).trim(),fe=l("card.default_title","Next match");h?fe=l("card.live_title","Live match"):T?fe=!!w&&L!==-1&&O!==L?l("card.played_title","Played match"):l("card.last_title","Last match"):H?fe=l("card.exempt_title","Bye week"):Ae&&(fe=l("card.postponed_title","Postponed match"));let Oo=gt?`${gt} \u2022 ${fe}`:fe,Do=e.icon!==void 0?e.icon:"mdi:basketball",Io=`logo-box-${e.logo_size||"medium"}`,Ro=rt(e),Po=Ue(e.standings_title).trim()||l("card.standings_title","Standings"),zo=e.standings_icon!==void 0?e.standings_icon:"mdi:format-list-numbered",na=e.show_rank!==!1,_t=t.rank?.state,sa=u(_t)?_t:null,ra=H?null:mn(Y,t.rank?.attributes?.standings,{opponentUrl:Ge}),bt=xe(sa,s),xt=xe(ra,s),yt=x?bt:xt,wt=x?xt:bt;d&&na&&(!yt&&(x||!H)&&(yt=xe(x?2:5,s)),!wt&&(!x||!H)&&(wt=xe(x?5:2,s)));let ia=w||(!T&&ve!==-1?v[ve]:null),la=!!ia&&!T&&!h&&!Ae&&!H&&st(ia,p,C),Fo=!h&&!T&&!la&&!H&&!!Se,Bo=e.logo_click_action&&e.logo_click_action!=="none",Uo=Array.isArray(t.rank?.attributes?.standings)&&t.rank.attributes.standings.length>0,Ho=Mn(e),ca=!w||T&&O===I,Vo=ca&&u(t.lastScore?.state)?gn(t.lastScore.state,t.lastScore.attributes,x):null,da=Za(w)||Vo||"-",ha=k=>cn.includes(k)?k:null,jo=ha(w?.result)||(ca?ha(t.lastResult?.state):null),qo=Ut(da,x);return{isValidState:u,isLive:h,lastScoreState:f,hasLastScore:_,nextDateState:S,hasNextMatch:$,hasLastMatchData:V,hasNextMatchData:P,canToggleView:uo,canGoPrev:fo,canGoNext:mo,chevronPrevIndex:Qt,chevronNextIndex:ea,currentIndex:O,hasCalendar:y,calendarMatches:v,displayedScore:da,displayedResult:jo,scoreParts:qo,isPostMatch:T,isGameDay:go,currentOpponentSensor:R,officialTeamName:pe,configuredTeamName:ta,teamName:oe,rawOpponent:ue,opponentName:K,opponentSearchName:Y,isHome:x,teamLogoUrl:$e,opponentLogoUrl:ke,leftName:_o,rightName:bo,leftLogo:xo,rightLogo:yo,searchTeamName:ut,leftMatchName:wo,rightMatchName:vo,leftUrl:je,rightUrl:qe,leftEntityId:$o,rightEntityId:ko,competition:So,pouleName:Ao,roundNumber:pt,gymName:We,gymCity:Ke,gymAddress:Ye,targetDateStr:Se,dateFormatted:Co,formStreak:oa,formSequence:mt,hasValidForm:Xe,isPreview:d,displayFormSequence:Eo,displayFormStreak:Mo,showFormBlock:To,reserveVenueRow:Lo,showTitle:No,configuredTitle:gt,titleText:Oo,titleIcon:Do,displayMode:Ro,standingsTitle:Po,standingsIcon:zo,logoSizeClass:Io,showRank:na,rawUserRank:_t,userRankNum:sa,opponentRankNum:ra,userRankFormatted:bt,opponentRankFormatted:xt,leftRank:yt,rightRank:wt,isCalendarClickable:Fo,isLogoClickable:Bo,hasStandingsData:Uo,accentColor:Ho,isStale:Ae,isExempt:H,isResultPending:la}}var ao={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",postponed_title:"Match report\xE9",exempt:"Exempt",exempt_title:"Journ\xE9e d'exempt",result_pending:"R\xE9sultat en attente",result_pending_short:"En attente",win:"Victoire",loss:"D\xE9faite",draw:"Nul",your_score:"Notre score",home_short:"DOM",away_short:"EXT",opponent_score:"Score adversaire",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_letter_win:"V",form_letter_loss:"D",form_letter_draw:"N",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",table_group_matches:"Rencontres",table_irregularities:"I",table_penalties:"P\xE9n.",table_forfeits:"For.",table_defaults:"D\xE9f.",table_group_penalties:"P\xE9nalit\xE9s",table_referee:"Arb",table_coach:"Ent",table_group_points:"Points",table_scored:"M",table_conceded:"E",table_diff:"D",table_played_full:"Matchs jou\xE9s",table_wins_full:"Victoires",table_losses_full:"D\xE9faites",table_draws_full:"Matchs nuls",table_irregularities_full:"Irr\xE9gularit\xE9s",table_penalties_full:"P\xE9nalit\xE9s (total)",table_forfeits_full:"Forfaits",table_defaults_full:"D\xE9fauts",table_referee_full:"P\xE9nalit\xE9s arbitrage",table_coach_full:"P\xE9nalit\xE9s entra\xEEneur",table_scored_full:"Points marqu\xE9s",table_conceded_full:"Points encaiss\xE9s",table_diff_full:"Diff\xE9rence de points",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",played_title:"Match jou\xE9",last_title:"Dernier match",kickoff:"Coup d'envoi",calendar_details:"Match FFBB\xA0: {home} vs {away}"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",entity_missing:"\xAB {entity} \xBB n'existe plus (sans doute renomm\xE9e) : s\xE9lectionnez-la \xE0 nouveau.",entity_suggestion:"Suggestion : {entity}",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_size_extra_large:"Tr\xE8s grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",title_helper:"Laissez vide pour un titre dynamique par d\xE9faut (\xAB Prochain match \xBB / \xAB Match en direct \xBB / \xAB Dernier match \xBB). Si renseign\xE9, il s'affiche en pr\xE9fixe devant ce titre dynamique.",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",standings_popup_detailed:"Classement d\xE9taill\xE9 dans la popup",standings_popup_detailed_helper:"Affiche le tableau complet (m\xEAmes colonnes que la carte classement secondaire) \xE0 la place du tableau simple.",display_mode:"Cartes \xE0 afficher",display_mode_match:"Carte match uniquement (par d\xE9faut)",display_mode_standings:"Carte classement uniquement",display_mode_both:"Carte match + carte classement",standings_card_section:"Carte classement ind\xE9pendante",standings_title:"Titre de la carte classement",standings_title_helper:"Laissez vide pour utiliser le titre par d\xE9faut",standings_icon:"Ic\xF4ne de la carte classement",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan",show_calendar_logos:"Logos d'\xE9quipe dans les lignes du calendrier",show_standings_logos:"Logos d'\xE9quipe dans les lignes de classement (popup et carte autonome)"}};var oo={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",postponed_title:"Postponed match",exempt:"Bye",exempt_title:"Bye week",result_pending:"Result pending",result_pending_short:"Pending",win:"Win",loss:"Loss",draw:"Draw",your_score:"Our score",home_short:"HOME",away_short:"AWAY",opponent_score:"Opponent score",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_letter_win:"W",form_letter_loss:"L",form_letter_draw:"D",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",table_group_matches:"Games",table_irregularities:"I",table_penalties:"Pen.",table_forfeits:"Forf.",table_defaults:"Def.",table_group_penalties:"Penalties",table_referee:"Ref",table_coach:"Coach",table_group_points:"Points",table_scored:"F",table_conceded:"A",table_diff:"D",table_played_full:"Games played",table_wins_full:"Wins",table_losses_full:"Losses",table_draws_full:"Draws",table_irregularities_full:"Irregularities",table_penalties_full:"Penalties (total)",table_forfeits_full:"Forfeits",table_defaults_full:"Defaults",table_referee_full:"Referee penalties",table_coach_full:"Coach penalties",table_scored_full:"Points scored (for)",table_conceded_full:"Points conceded (against)",table_diff_full:"Points difference",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",played_title:"Played match",last_title:"Last match",kickoff:"Kick-off",calendar_details:"FFBB match: {home} vs {away}"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",entity_missing:'"{entity}" no longer exists (probably renamed): select it again.',entity_suggestion:"Suggestion: {entity}",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team logo size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_size_extra_large:"Extra Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",title_helper:'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix in front of that dynamic title.',icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",standings_popup_detailed:"Detailed standings in popup",standings_popup_detailed_helper:"Show the full table (same columns as the secondary standings card) instead of the simple one.",display_mode:"Cards to display",display_mode_match:"Match card only (default)",display_mode_standings:"Standings card only",display_mode_both:"Match card + standings card",standings_card_section:"Standalone standings card",standings_title:"Standings card title",standings_title_helper:"Leave blank for the default title",standings_icon:"Standings card icon",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos",show_calendar_logos:"Team logos in the calendar rows",show_standings_logos:"Team logos in standings rows (popup and standalone card)"}};var no={fr:ao,en:oo};function ct(t){return(t?.locale?.language||t?.language||"en").substring(0,2).toLowerCase()}function we(t){return no[t]||no.en}function dt(t,e,a=""){if(!t||!e)return a;let o=e.split("."),n=t;for(let s of o){if(!n||typeof n!="object"||!(s in n))return a;n=n[s]}return typeof n=="string"?n:a}var so=ne`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
    container-type: inline-size;
  }
  @supports (width: 1cqw) {
    ha-card {
      --ffbb-logo-cap: max(44px, calc((100cqw - clamp(118px, 38cqw, 144px) - 76px) / 2));
    }
  }
  /* Visually hidden but readable by screen readers -- standard "sr-only"
     recipe (not display:none/visibility:hidden, which most ATs also skip). */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 16px 0 16px;
    font-size: 1.7em;
    font-weight: 600;
    line-height: 1.2;
    color: var(--ha-card-header-color, var(--primary-text-color));
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
    /* The centre column width depends only on card width (never on match text
       content), so logos stay at the exact same x between played/upcoming/bye
       states while still yielding space on narrow multi-column cards. */
    grid-template-columns: minmax(0, 1fr) 144px minmax(0, 1fr);
    grid-template-columns: minmax(0, 1fr) clamp(118px, 38cqw, 144px) minmax(0, 1fr);
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
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 14px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .center-meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    /* Takes the width of its content instead of shrinking to the (fixed)
       centre column: a wide score overflows it evenly on both sides, which
       does not move anything else. */
    flex: none;
    /* The tallest content (day + score + result badge, once a match is played)
       sets the height; every other state (upcoming, bye, live...) keeps it, so
       the card doesn't change height from one match to the next. */
    min-height: calc(4.3em + 28px);
    box-sizing: border-box;
    position: relative;
    text-align: center;
    user-select: none;
    padding: 4px 8px;
    border-radius: 12px;
    transition: background-color 0.15s ease, transform 0.15s ease;
  }
  .nav-chevron {
    cursor: pointer;
    /* Bigger glyph, and padding that widens the clickable/touchable area
       well beyond the glyph itself (48x48px box, the usual touch target). */
    --mdc-icon-size: 32px;
    padding: 8px;
    border-radius: 50%;
    -webkit-tap-highlight-color: transparent;
    color: var(--secondary-text-color);
    opacity: 0.75;
    transition: transform 0.15s ease, opacity 0.15s ease, color 0.15s ease;
    position: absolute;
    /* Above the centre block, which the wider touch area overlaps. */
    z-index: 1;
  }
  .nav-chevron-left {
    left: -26px;
  }
  .nav-chevron-right {
    right: -26px;
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
  /* align-self (not the inner align-items below) is what actually centres a
     one-line team name against a two-line one on the other side: with the
     grid's align-items: start, this item's own box only takes its content's
     height and sits at the top of shared row 2 -- align-self: center
     repositions that box within the row instead (row height still set by
     the taller two-line side). The inner align-items: center now matters
     too: .team-title reserves 2 lines of height even for a one-line name
     (see .team-title's min-height), so that name needs centering within
     its own now-taller box, not just top-aligned inside it. */
  .team-name-cell {
    display: flex;
    align-self: center;
    align-items: center;
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
    /* Always reserve the space for 2 lines (line-height 1.25 x 2), even for
       a one-line name, so row 2's height -- and the whole card's vertical
       size -- stays constant match to match instead of shrinking/growing
       with how long the two team names happen to be. */
    min-height: 2.5em;
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
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.28));
    color: var(--primary-text-color);
    line-height: 1;
    transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }
  .rank-badge.rank-gold {
    background: rgba(241, 184, 21, 0.14);
    border: 1.5px solid #d49809;
    color: #b88200;
    color: color-mix(in srgb, #c98a00 65%, var(--primary-text-color));
    box-shadow: 0 0 6px rgba(241, 184, 21, 0.25);
  }
  .rank-badge.rank-silver {
    background: rgba(154, 166, 178, 0.16);
    border: 1.5px solid #9aa6b2;
    color: #6b7480;
    color: color-mix(in srgb, #8a94a0 65%, var(--primary-text-color));
    box-shadow: 0 0 6px rgba(154, 166, 178, 0.2);
  }
  .rank-badge.rank-bronze {
    background: rgba(205, 127, 50, 0.14);
    border: 1.5px solid #cd7f32;
    color: #a8581a;
    color: color-mix(in srgb, #c46d29 70%, var(--primary-text-color));
    box-shadow: 0 0 6px rgba(205, 127, 50, 0.2);
  }
  .rank-badge.rank-solid {
    border: none;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.18));
    background: color-mix(in srgb, var(--primary-text-color, #888888) 14%, transparent);
    color: var(--primary-text-color);
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
    width: min(56px, var(--ffbb-logo-cap, 56px));
    height: min(56px, var(--ffbb-logo-cap, 56px));
    border-radius: 19.5%;
    padding: 4px;
  }
  .logo-box-medium {
    width: 72px;
    height: 72px;
    width: min(72px, var(--ffbb-logo-cap, 72px));
    height: min(72px, var(--ffbb-logo-cap, 72px));
    border-radius: 19.5%;
    padding: 6px;
    padding: clamp(4px, 1.6cqw, 6px);
  }
  .logo-box-large {
    width: 104px;
    height: 104px;
    width: min(104px, var(--ffbb-logo-cap, 104px));
    height: min(104px, var(--ffbb-logo-cap, 104px));
    border-radius: 19.5%;
    padding: 8px;
    padding: clamp(5px, 2cqw, 8px);
  }
  .logo-box-extra_large {
    width: 136px;
    height: 136px;
    width: min(136px, var(--ffbb-logo-cap, 136px));
    height: min(136px, var(--ffbb-logo-cap, 136px));
    border-radius: 19.5%;
    padding: 10px;
    padding: clamp(5px, 2.2cqw, 10px);
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
  /* One fixed-height row shared by the time (upcoming / bye) and the score
     (played), so the date above it sits at the same place in every state. */
  .match-main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    margin-top: 2px;
  }
  .match-main .match-time {
    margin-top: 0;
  }
  .score-display {
    /* The score is NEVER split over two lines, whatever the width of the
       centre column (it is fixed, see .match-area). */
    white-space: nowrap;
    font-size: 2em;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 1px;
    margin-bottom: 0;
  }
  /* My own score reads at a glance: bold + the card's accent color. The
     opponent's stays visibly secondary (lighter weight, muted color) so
     the two numbers are never confused at a quick glance. */
  .score-mine {
    color: var(--ffbb-accent-color, #ff6b00);
    font-weight: 900;
  }
  .score-theirs {
    color: var(--primary-text-color, #fff);
    font-weight: 600;
  }
  .score-sep {
    color: var(--secondary-text-color);
    font-weight: 400;
    opacity: 0.55;
    margin: 0 1px;
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
    background-color: color-mix(in srgb, var(--ffbb-accent-color, #ff6b00) 14%, transparent);
    border: 1.5px solid var(--ffbb-accent-color, #ff6b00);
    color: var(--ffbb-accent-color, #ff6b00);
    animation: gamedayPulse 2.5s infinite ease-in-out;
  }
  @keyframes gamedayPulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 0 transparent;
    }
    50% {
      opacity: 0.85;
      box-shadow: 0 0 10px color-mix(in srgb, var(--ffbb-accent-color, #ff6b00) 35%, transparent);
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
  .badge-pending {
    background-color: #546e7a;
    color: #ffffff;
  }
  .badge-gameday,
  .badge-postponed,
  .badge-pending,
  .badge-win,
  .badge-loss,
  .badge-draw {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    white-space: nowrap;
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
  /* Same size as a real venue row, nothing visible: it only holds the place
     when this match has no gym, so the card keeps its height. */
  .footer-venue-empty {
    border-top-color: transparent;
    pointer-events: none;
  }
  .footer-venue-empty .venue-info {
    visibility: hidden;
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
    padding: 4px clamp(10px, 3.8cqw, 16px) 12px;
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
  /* My own team (not the opponent, who only gets the grey highlight above):
     position and name in the accent colour, in the standings popup and in
     the standalone standings blocks. The other columns keep the normal text
     colour so the (already accent-coloured) points column still stands out. */
  .standings-table tr.my-team-row .pos-cell,
  .standings-table tr.my-team-row .col-team {
    color: var(--ffbb-accent-color, #ff6b00);
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
    gap: clamp(5px, 2cqw, 10px);
    flex-wrap: nowrap;
    justify-content: center;
    width: 100%;
  }
  /* The pills reuse .badge-win/.badge-loss/.badge-draw for their colours.
     Cancel the absolute positioning those classes get for the centre badge,
     otherwise every pill is stacked/clipped outside the popup. */
  .form-badge-pill.badge-win,
  .form-badge-pill.badge-loss,
  .form-badge-pill.badge-draw {
    position: static;
    top: auto;
    left: auto;
    transform: none;
    margin-top: 0;
    white-space: normal;
  }
  .form-badge-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 0 1 74px;
    min-width: 0;
    min-height: 72px;
    min-height: clamp(56px, 18cqw, 72px);
    padding: 8px 10px;
    padding: clamp(6px, 2cqw, 8px) clamp(3px, 1.5cqw, 10px);
    border-radius: 14px;
    border-radius: clamp(10px, 3.5cqw, 14px);
    box-sizing: border-box;
  }
  .pill-char {
    font-size: 2em;
    font-size: clamp(1.35em, 5.2cqw, 2em);
    font-weight: 800;
    line-height: 1;
  }
  .pill-label {
    font-size: 0.9em;
    font-size: clamp(0.68em, 2.5cqw, 0.9em);
    font-weight: 600;
    margin-top: 4px;
    text-transform: capitalize;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    grid-template-columns: 42px 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 3px 8px;
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
  .cal-team.bye-text {
    font-weight: 600;
    color: var(--primary-text-color);
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
    background: rgba(46, 125, 50, 0.18);
    color: #2e7d32;
    color: color-mix(in srgb, #2e7d32 65%, var(--primary-text-color));
  }
  .pill-ext {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
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
    width: 22px;
    height: 22px;
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
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
    text-align: right;
    min-width: 58px;
    padding: 4px 0;
    box-sizing: border-box;
  }
  .calendar-col-meta > :only-child {
    margin: auto 0;
  }
  .cal-score {
    font-weight: 800;
    font-size: 1.25em;
    color: var(--primary-text-color);
    line-height: 1;
    letter-spacing: 0.5px;
  }
  .cal-date {
    font-size: 0.84em;
    font-weight: 700;
    color: var(--secondary-text-color);
    line-height: 1.2;
    margin-top: 2px;
  }
  .cal-time {
    font-size: 0.9em;
    font-weight: 600;
    line-height: 1.2;
  }
  .cal-pending {
    font-size: 0.72em;
    font-weight: 600;
    line-height: 1.2;
    color: #546e7a;
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
`;var ro=["unknown","unavailable"];function Nn(t,e,a=null){if(ht(t))return!1;let o=t?.team_name||t?.name||"";return a?!!a(o):!o||!e?!1:ae(o,e)}function io(t){return t==null||t===""?"-":t}function On(t){if(t==null||t==="")return"-";let e=Number(t);return Number.isFinite(e)?e>0?`+${e}`:String(e):t}function Dn(t){let e=Number(t);return t==null||t===""||!Number.isFinite(e)||e===0?"":e>0?"diff-pos":"diff-neg"}var In={matches:[{key:"table_played",fb:"J",full:"table_played_full",fullFb:"Games played",get:t=>t.played},{key:"table_wins",fb:"G",full:"table_wins_full",fullFb:"Wins",get:t=>t.wins??t.won},{key:"table_losses",fb:"P",full:"table_losses_full",fullFb:"Losses",get:t=>t.losses??t.lost},{key:"table_draws",fb:"N",full:"table_draws_full",fullFb:"Draws",get:t=>t.draws}],singles:[{key:"table_irregularities",fb:"I",full:"table_irregularities_full",fullFb:"Irregularities",get:t=>t.irregularities},{key:"table_penalties",fb:"P\xE9n.",full:"table_penalties_full",fullFb:"Penalties",get:t=>t.total_penalties},{key:"table_forfeits",fb:"For.",full:"table_forfeits_full",fullFb:"Forfeits",get:t=>t.forfeits},{key:"table_defaults",fb:"D\xE9f.",full:"table_defaults_full",fullFb:"Defaults",get:t=>t.defaults}],penalties:[{key:"table_referee",fb:"Arb",full:"table_referee_full",fullFb:"Referee penalties",get:t=>t.referee_penalties},{key:"table_coach",fb:"Ent",full:"table_coach_full",fullFb:"Coach penalties",get:t=>t.coach_penalties}],points:[{key:"table_scored",fb:"M",full:"table_scored_full",fullFb:"Points scored",get:t=>t.points_for},{key:"table_conceded",fb:"E",full:"table_conceded_full",fullFb:"Points conceded",get:t=>t.points_against},{key:"table_diff",fb:"D",full:"table_diff_full",fullFb:"Points difference",get:t=>t.points_diff,signed:!0}]};function Wt(t,e=!0){if(!e)return g;let a=E(t)||A;return c`
    <img
      class="col-team-logo"
      src=${a}
      alt=""
      @error=${o=>{o.target.src.endsWith(A)||(o.target.src=A)}}
    />
  `}function ht(t){return b(t?.team_name??t?.name)}function Kt(t,e){return ht(t)?e("card.exempt","Bye"):t?.team_name||t?.name||"-"}function Yt({rows:t,teamName:e,displayTeamName:a,t:o,showLogos:n=!0}){let s=de((Array.isArray(t)?t:[]).map(f=>f?.team_name||f?.name||""),e),{matches:r,singles:i,penalties:l,points:d}=In,p=f=>o(`card.${f.key}`,f.fb),m=f=>o(`card.${f.full}`,f.fullFb),u=f=>c`<th class="sub-head" scope="col"><abbr title=${m(f)}>${p(f)}</abbr></th>`,h=(f,_)=>{let S=f.get(_);return f.signed?c`<td class="num ${Dn(S)}">${On(S)}</td>`:c`<td class="num">${io(S)}</td>`};return c`
    <div class="standings-scroll">
      <table class="standings-table standings-table-detailed">
        <thead>
          <tr class="group-row">
            <th class="col-pos" rowspan="2" scope="col">#</th>
            <th class="col-team" rowspan="2" scope="col">${o("card.table_team","Team")}</th>
            <th class="single-head" rowspan="2" scope="col">${o("card.table_pts","Pts")}</th>
            <th class="group-head" colspan=${r.length} scope="colgroup">${o("card.table_group_matches","Games")}</th>
            ${i.map(f=>c`<th class="single-head" rowspan="2" scope="col" title=${m(f)}><abbr title=${m(f)}>${p(f)}</abbr></th>`)}
            <th class="group-head" colspan=${l.length} scope="colgroup">${o("card.table_group_penalties","Penalties")}</th>
            <th class="group-head" colspan=${d.length} scope="colgroup">${o("card.table_group_points","Points")}</th>
          </tr>
          <tr class="sub-row">
            ${r.map(u)}
            ${l.map(u)}
            ${d.map(u)}
          </tr>
        </thead>
        <tbody>
          ${t.map(f=>{let _=Nn(f,e,s),S=_&&a?a:Kt(f,o);return c`
              <tr class=${_?"highlight-row my-team-row":""}>
                <td class="pos-cell col-pos">${f.position||f.rank||"-"}</td>
                <td class="col-team">${Wt(f.logo_url,n)}<span>${S}</span></td>
                <td class="pts-cell">${io(f.points??f.pts)}</td>
                ${r.map($=>h($,f))}
                ${i.map($=>h($,f))}
                ${l.map($=>h($,f))}
                ${d.map($=>h($,f))}
              </tr>
            `})}
        </tbody>
      </table>
    </div>
  `}function lo({standings:t,poule:e,competition:a,teamName:o,displayTeamName:n,accentColor:s,title:r,icon:i,compact:l,showLogos:d=!0,t:p}){let m=it(t),u=e&&!ro.includes(e)?e:"",h=a&&!ro.includes(a)?a:"",f=r||p("card.standings_title","Standings"),_=i!==void 0?i:"mdi:format-list-numbered";return c`
    <ha-card class="standings-card ${l?"standings-compact":""}" style="--ffbb-accent-color: ${s};">
      <div class="standings-card-header">
        ${_?c`<ha-icon icon=${_}></ha-icon>`:g}
        <span>${f}${u?` \u2022 ${u}`:""}</span>
      </div>
      ${h?c`<div class="standings-card-subtitle">${h}</div>`:g}
      <div class="standings-card-body">
        ${m.length>0?Yt({rows:m,teamName:o,displayTeamName:n,t:p,showLogos:d}):c`<div class="standings-empty-text">${p("card.no_standings","No standings data available.")}</div>`}
      </div>
    </ha-card>
  `}var co=ne`
  .standings-card {
    display: block;
    overflow: hidden;
  }
  .standings-card.standings-compact {
    margin-top: 12px;
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
  /* Standing alone as the only card on the dashboard (display_mode
     "standings", compact === false), the title reads at the exact same
     size/weight as the match card's own header (.card-header in styles.js:
     1.7em, weight 600, 28px icon) instead of the smaller size used when
     this card sits under the match card ("both", compact === true). */
  .standings-card:not(.standings-compact) .standings-card-header {
    padding: 16px 16px 0 16px;
    font-size: 1.7em;
    font-weight: 600;
  }
  .standings-card:not(.standings-compact) .standings-card-header ha-icon {
    --mdc-icon-size: 28px;
  }
  .standings-card-subtitle {
    padding: 0 16px 6px;
    font-size: 0.82em;
    color: var(--secondary-text-color);
  }
  .standings-card-body {
    padding: 6px 8px 14px;
  }
  .standings-empty-text {
    text-align: center;
    padding: 16px;
    color: var(--secondary-text-color);
    font-style: italic;
  }

  /* ---- table layout --------------------------------------------------- */
  .standings-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .standings-table-detailed {
    min-width: 560px;
    font-variant-numeric: tabular-nums;
  }
  /* Only when the card sits right under the match card (display_mode
     "both") do we shrink the table to match the popup's simple standings
     table (0.85em). Standing alone as the only card on the dashboard, it
     keeps a normal card's text size instead -- see the "compact" doc
     comment on renderStandingsBlock. */
  .standings-compact .standings-table-detailed {
    font-size: 0.85em;
  }
  .standings-table-detailed th {
    padding: 8px 6px 4px;
    color: var(--primary-text-color);
    font-weight: 700;
    font-size: 0.78em;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    white-space: nowrap;
    border-bottom: none;
  }
  /* Not scoped to .standings-card: this must un-truncate the team name
     wherever the detailed table renders -- the standalone standings card
     AND the popup opened from the rank badges (standings_popup_detailed) --
     so both look and behave identically (horizontal scroll via
     .standings-scroll, never wrapped, never an ellipsis).

     The compound selector (.standings-table.standings-table-detailed, both
     classes on the same <table>) is deliberate, not just
     ".standings-table-detailed .col-team": that has the SAME specificity
     (0,0,2,0) as the truncating base rule (.standings-table .col-team in
     styles.js), so it depends entirely on source order to win -- which, in
     practice, it did not (regression: this broke the standalone card too,
     which the old .standings-card .standings-table .col-team selector,
     3 classes, had safely beaten on specificity alone regardless of order).
     Three class components here (.standings-table + .standings-table-detailed
     + .col-team) gives (0,0,3,0), reliably higher than the base rule's
     (0,0,2,0), independent of stylesheet order. */
  .standings-table.standings-table-detailed .col-team {
    text-align: left;
    min-width: 110px;
    max-width: none;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
  }
  /* Deliberately tiny and inline (not a flex layout on .col-team, which
     would fight the sticky/scroll positioning rules above and below this
     block): a 16px circle plus a small margin adds only ~2px to a
     ~29-31px detailed-table row, and 0px to a table using this same class
     elsewhere (styles.js's simple popup table) -- the point was adding
     logos without growing any row. Shared with that simple table via
     renderStandingsLogo() so both use one rule, not two that could drift. */
  /* Measured against real screenshots (popup: 27px row / 8px padding;
     detailed table: 31px row / 12px padding), both landed on ~19px of
     already-reserved text content height regardless of table -- 18px
     stays safely under that in both, so this grows the logo without
     growing either row. */
  .col-team-logo {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: contain;
    vertical-align: middle;
    margin-right: 4px;
    background: #ffffff;
    padding: 1px;
    box-sizing: border-box;
  }
  .standings-table-detailed .col-team,
  .standings-table-detailed .col-pos {
    position: sticky;
    background: var(--card-background-color, var(--ha-card-background, #fff));
    z-index: 1;
  }
  .standings-table-detailed .col-pos {
    left: 0;
    width: 28px;
    min-width: 28px;
    box-sizing: border-box;
  }
  .standings-table-detailed .col-team {
    left: 28px;
  }
  .standings-table-detailed tr.highlight-row .col-pos,
  .standings-table-detailed tr.highlight-row .col-team {
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));
  }
  .standings-table-detailed .group-row th {
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  }
  .standings-table-detailed .group-row th.group-head {
    border-bottom: 2px solid var(--ffbb-accent-color, #ff6b00);
  }
  .standings-table-detailed .group-head + .single-head,
  .standings-table-detailed .single-head + .group-head,
  .standings-table-detailed .group-head + .group-head {
    padding-left: 10px;
  }
  .standings-table-detailed .sub-row th {
    padding: 3px 6px 6px;
    font-size: 0.72em;
    font-weight: 600;
    color: var(--secondary-text-color);
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  }
  .standings-table-detailed .sub-row abbr,
  .standings-table-detailed .single-head abbr {
    text-decoration: none;
    cursor: help;
  }
  .standings-table-detailed td {
    padding: 6px 4px;
    white-space: nowrap;
  }
  .standings-table-detailed .diff-pos {
    color: var(--success-color, #43a047);
  }
  .standings-table-detailed .diff-neg {
    color: var(--error-color, #e53935);
  }

  /* Narrow screens: keep team names on a single line, let the table scroll
     horizontally instead of shrinking/wrapping the column. */
  @media (max-width: 600px) {
    .standings-card-body {
      padding-left: 4px;
      padding-right: 4px;
    }
    .standings-table-detailed .col-team {
      font-size: 0.92em;
    }
  }
`;var Jt=class extends j{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return ne`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=we("fr")}setConfig(e){this._config={entity:"",...Be,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let a=ct(this.hass);a!==this._translationsLang&&(this._translationsLang=a,this._translations=we(a))}}_t(e,a=""){return dt(this._translations,e,a)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),a=String(this._config?.custom_accent_color??"").trim();return a&&!He(a)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_entityHelper(){let e=this._t("editor.entity_helper","Select any sensor belonging to the team"),a=String(this._config?.entity??"").trim(),o=this.hass?.states;if(!a||!o||Object.keys(o).length===0||Object.prototype.hasOwnProperty.call(o,a))return e;let n=this._t("editor.entity_missing",'"{entity}" no longer exists (probably renamed): select it again.').replace("{entity}",a),s=this._suggestEntity(a,o);if(!s)return`\u26A0 ${n}`;let r=this._t("editor.entity_suggestion","Suggestion: {entity}").replace("{entity}",s);return`\u26A0 ${n} ${r}`}_suggestEntity(e,a){let o=nt(e,a,this.hass?.entities);return[o.poule,o.nextDate,...Object.values(o)].map(s=>s?.entity_id).find(s=>typeof s=="string"&&s.startsWith("sensor."))??""}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let a={...e.detail.value},o=["entity","custom_team_name","title","icon","custom_accent_color","standings_title","standings_icon"];for(let r of o)(!(r in a)||a[r]===void 0||a[r]===null)&&(a[r]="");let n={...this._config,...a},s=new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return c``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._entityHelper(),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),helper:this._t("editor.title_helper",'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix before that dynamic title.'),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team logo size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")},{value:"extra_large",label:this._t("editor.logo_size_extra_large","Extra Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}},{name:"show_calendar_logos",label:this._t("editor.show_calendar_logos","Team logos in the calendar rows"),default:!0,selector:{boolean:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}},{name:"standings_popup_detailed",label:this._t("editor.standings_popup_detailed","Detailed standings in popup"),helper:this._t("editor.standings_popup_detailed_helper","Show the full table (same columns as the secondary standings card) instead of the simple one."),default:!1,selector:{boolean:{}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}},{name:"standings_card",type:"expandable",title:this._t("editor.standings_card_section","Standalone standings card"),icon:"mdi:card-multiple-outline",flatten:!0,schema:[{name:"display_mode",label:this._t("editor.display_mode","Cards to display"),default:"match",selector:{select:{mode:"dropdown",options:[{value:"match",label:this._t("editor.display_mode_match","Match card only (default)")},{value:"standings",label:this._t("editor.display_mode_standings","Standings card only")},{value:"both",label:this._t("editor.display_mode_both","Match card + standings card")}]}}},...this._config.display_mode!=="match"?[{name:"standings_title",label:this._t("editor.standings_title","Standings card title"),helper:this._t("editor.standings_title_helper","Leave blank for the default title"),selector:{text:{}}},{name:"standings_icon",label:this._t("editor.standings_icon","Standings card icon"),selector:{icon:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]:[]]}];return c`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${a=>a.label||a.title}
        .computeHelper=${a=>a.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${Fe}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Jt);var Xt=class extends j{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=we("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...Be}}getCardSize(){let e=this._config?this._resolveEntities():null;return Qa({config:this._config,standings:e?.rank?.attributes?.standings})}getGridOptions(){return{columns:12,min_columns:9,min_rows:3}}setConfig(e){if(!e||!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");let a={...Be,...e},o=this._config;o&&((o.entity!==a.entity||o.default_match_view!==a.default_match_view)&&(this._matchIndex=null,this._manualView=null),(o.entity!==a.entity||rt(a)==="standings")&&(this._activeModal=null)),this._config=a,this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:a}=this._config,o=String(a??"").trim();e!=="custom"||!o||He(o)||this._warnedAccentColor!==o&&(this._warnedAccentColor=o,console.warn(`[FFBB Tracker Card] custom_accent_color "${o}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let a=ct(this.hass);a!==this._translationsLang&&(this._translationsLang=a,this._translations=we(a))}}_t(e,a=""){return dt(this._translations,e,a)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none")return"";let o=String(e).trim().match(/^(\d+)/);if(!o)return"";let n=parseInt(o[1],10);return n===1?"rank-gold":n===2?"rank-silver":n===3?"rank-bronze":""}_resolveEntities(){return nt(this._config.entity,this.hass?.states,this.hass?.entities)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:eo(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:a,hour12:o}=this._localeInfo();return Gt(e,a,{hour12:o})}_openMaps(e,a,o=""){let n=encodeURIComponent(o?.trim()||`${e} ${a}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${n}`,"_blank","noreferrer")}_openCalendar(e,a,o,n,s,r=""){if(!e||e==="unknown"||e==="unavailable")return;let i=new Date(e);if(isNaN(i.getTime()))return;let l=new Date(i.getTime()+7200*1e3),d=f=>f.toISOString().replace(/[-:]|\.\d{3}/g,""),p=`${a} vs ${o}`,m=r?.trim()||`${n} ${s}`.trim(),u=this._t("card.calendar_details","FFBB match: {home} vs {away}").replace(/\{(home|away)\}/g,(f,_)=>_==="home"?a:o),h=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(p)}&dates=${d(i)}/${d(l)}&details=${encodeURIComponent(u)}&location=${encodeURIComponent(m)}`;window.open(h,"_blank","noreferrer")}_handleLogoClick(e,a,o){if(b(o)||o===this._t("card.exempt","Bye"))return;let n=this._config.logo_click_action||"team_url";n==="team_url"?a?window.open(a,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${o}".`),e&&this._fireMoreInfo(e)):n==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let a=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(a)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let a=e.get("_activeModal");if(this._activeModal&&!a)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&a){let o=this._modalTrigger;this._modalTrigger=null,o&&o.isConnected&&typeof o.focus=="function"&&o.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let a=e.currentTarget.querySelector(".modal-card");if(!a)return;let o=[...a.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(o.length===0){e.preventDefault(),a.focus();return}let n=o[0],s=o[o.length-1],r=this.shadowRoot?.activeElement;e.shiftKey&&(r===n||r===a)?(e.preventDefault(),s.focus()):!e.shiftKey&&r===s&&(e.preventDefault(),n.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,a){if(!(e==="prev"&&a.canGoPrev===!1||e==="next"&&a.canGoNext===!1))if(a.hasCalendar&&a.calendarMatches.length>1){let o=e==="prev"?a.chevronPrevIndex:a.chevronNextIndex;if(Number.isInteger(o)&&o>=0&&o<a.calendarMatches.length){this._matchIndex=o;let n=a.calendarMatches[o],s=!!(n.score||n.home_score!=null&&n.away_score!=null);this._manualView=n.is_played||s?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,a){let o=this._config?this._resolveEntities():null;o?.matchInProgress&&o.matchInProgress.state==="on"||(this._matchIndex=e,this._manualView=a?"last":"next"),this._closeModal()}_onKeyActivate(e){return a=>{(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),e())}}_extractCalendarMatches(e){let a=this._config.entity?this.hass?.states[this._config.entity]:null;return Ht(e,a)}_renderScoreParts(e){let a=c`<span class="score-mine">${e.my}</span>`,o=c`<span class="score-theirs">${e.opponent}</span>`,n=c`<span class="score-sep"> - </span>`;return e.mineFirst===!1?c`${o}${n}${a}`:c`${a}${n}${o}`}_renderModal(e,a,o,n){if(!this._activeModal)return c``;if(this._activeModal==="standings"){let s=e.rank?.attributes?.standings||[],r=it(s),i=ce(e.poule?.attributes?.competition),l=ce(e.poule?.state),d=r.map(h=>h.team_name||h.name||""),p=de(d,a),m=de(d,o),u=!!this._config?.standings_popup_detailed;return c`
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
            @click=${h=>h.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:format-list-numbered"></ha-icon>
                <span>${this._t("card.standings_title","Standings")} ${l?`\u2022 ${l}`:""}</span>
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
            ${i?c`<div class="modal-subtitle">${i}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${r.length===0?c`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings","No standings data available.")}
                    </div>
                  `:u?Yt({rows:r,teamName:a,displayTeamName:n,t:(h,f)=>this._t(h,f),showLogos:this._config.show_standings_logos!==!1}):c`
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
                        ${r.map(h=>{let f=h.team_name||h.name||"",_=ht(h),S=!_&&p(f),$=S||!_&&m(f),V=S&&n?n:Kt(h,(P,M)=>this._t(P,M));return c`
                            <tr class=${[$?"highlight-row":"",S?"my-team-row":""].filter(Boolean).join(" ")}>
                              <td class="pos-cell">${h.position||h.rank||"-"}</td>
                              <td class="col-team">${Wt(h.logo_url,this._config.show_standings_logos!==!1)}<span>${V}</span></td>
                              <td class="pts-cell">${h.points??h.pts??"-"}</td>
                              <td>${h.played??"-"}</td>
                              <td>${h.wins??h.won??"-"}</td>
                              <td>${h.losses??h.lost??"-"}</td>
                              <td>${h.draws??"0"}</td>
                            </tr>
                          `})}
                      </tbody>
                    </table>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="form"){let s=e.form?.state,r=s&&s!=="unknown"&&s!=="unavailable",i=r?s:"",l=this.hass?.config?.language||"",d={win:this._t("card.form_letter_win","W"),loss:this._t("card.form_letter_loss","L"),draw:this._t("card.form_letter_draw","D")},p=r?at(e.form?.attributes?.current_streak||"",l,d):"",m=i.split("-").filter(Boolean);return c`
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
              ${m.length>0?c`
                    <div class="form-badges-container">
                      ${m.map(u=>{let h=Ja(u,l),f=`badge-${h}`,_=this._t(`card.${h}`,h),S=tt(u,l,d);return c`
                          <div class="form-badge-pill ${f}">
                            <span class="pill-char">${S}</span>
                            <span class="pill-label">${_}</span>
                          </div>
                        `})}
                    </div>
                    ${p?c`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${p}</strong>
                          </div>
                        `:""}
                  `:c`
                    <div class="modal-empty-text">
                      ${this._t("card.no_form","No recent form data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="calendar"){let s=this._extractCalendarMatches(e),r=ce(e.poule?.attributes?.competition),i=ce(e.poule?.state),l=s.flatMap(_=>[_.home_team||"",_.away_team||""]),d=de(l,a),p=new Date,m=jt(e),u=qt(s,p,m),h=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||A,f=e.rank?.attributes?.standings;return c`
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
            @click=${_=>_.stopPropagation()}
          >
            <div class="modal-header">
              <div class="modal-title" id="ffbb-modal-title">
                <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
                <span>${this._t("card.calendar_title","Season schedule")} ${i?`\u2022 ${i}`:""}</span>
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
            ${r?c`<div class="modal-subtitle">${r}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${s.length>0?c`
                    <div class="calendar-list">
                      ${s.map((_,S)=>{let $=_.home_team||"-",V=_.away_team||"-",P=!!_.is_exempt||b(_.home_team)||b(_.away_team),M=P?"":_.score||(_.home_score!=null&&_.away_score!=null?`${_.home_score} - ${_.away_score}`:""),v=this._formatDate(_.date||_.datetime),{isHomeMyTeam:y,isAwayMyTeam:L}=Bt(_,d),C=y||L,he=!!(_.is_played||M),z=null;P&&(y!==L?z=y?"away":"home":z=b($)?"home":"away");let q=this._t("card.exempt","Bye"),Z=z==="home"?q:$,G=z==="away"?q:V,B=S===u,U=st(_,p,m),W=z==="home"?A:lt({teamName:Z,matchLogo:_.home_logo||_.home_team_logo,isMyTeam:y,myTeamLogo:h,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:f}),ve=z==="away"?A:lt({teamName:G,matchLogo:_.away_logo||_.away_team_logo,isMyTeam:L,myTeamLogo:h,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:f}),I="";return P?I="":y?I="home":L&&(I="away"),c`
                          <div
                            class="calendar-row ${C?"highlight-row":""} ${B?"next-match-row":""} ${P?"bye-row":""}"
                            @click=${()=>this._selectCalendarMatch(S,he)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(S,he))}
                            role="button"
                            tabindex="0"
                            aria-label="${y&&n?n:Z} vs ${L&&n?n:G}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${_.round||"-"}</span>
                              ${I?c`<span class="cal-venue-pill ${I==="home"?"pill-dom":"pill-ext"}">${I==="home"?this._t("card.home_short","HOME"):this._t("card.away_short","AWAY")}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1?c`
                                      <img
                                        class="cal-mini-logo"
                                        src=${W}
                                        alt=""
                                        @error=${N=>{N.target.src.endsWith(A)||(N.target.src=A)}}
                                      />
                                    `:g}
                                <span class="cal-team ${y?"my-team-text":""} ${z==="home"?"bye-text":""}">${y&&n?n:Z}</span>
                              </div>
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1?c`
                                      <img
                                        class="cal-mini-logo"
                                        src=${ve}
                                        alt=""
                                        @error=${N=>{N.target.src.endsWith(A)||(N.target.src=A)}}
                                      />
                                    `:g}
                                <span class="cal-team ${L?"my-team-text":""} ${z==="away"?"bye-text":""}">${L&&n?n:G}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${M?c`
                                    ${v?c`<div class="cal-date">${v.day}</div>`:g}
                                    <div class="cal-score">
                                      ${(()=>{let N=C?Ut(M,y):null;return N?this._renderScoreParts(N):M})()}
                                    </div>
                                  `:v?c`
                                    <div class="cal-date">${v.day}</div>
                                    ${U?c`<div class="cal-pending" title=${this._t("card.result_pending","Result pending")}>${this._t("card.result_pending_short","Pending")}</div>`:c`<div class="cal-time">${P?"-":v.time}</div>`}
                                  `:c`<div class="cal-date">-</div>`}
                            </div>
                          </div>
                        `})}
                    </div>
                  `:c`
                    <div class="modal-empty-text">
                      ${this._t("card.no_calendar","No schedule available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}return c``}_computeViewModel(e){let{language:a,hour12:o}=this._localeInfo();return to({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:a,hour12:o,t:(n,s)=>this._t(n,s),instanceLanguage:this.hass?.config?.language||"",isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return c``;let e=this._resolveEntities();if(!e)return c`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let a=this._computeViewModel(e);return c`
      ${a.displayMode!=="standings"?c`
            <ha-card style="--ffbb-accent-color: ${a.accentColor};">
              ${this._renderHeader(a)}

              <div class="container">
                ${this._renderWatermark(a)}
                ${this._renderMatchHeader(a)}
                ${this._renderMatchArea(a)}
                ${this._renderFooter(a)}
              </div>

              ${this._renderModal(e,a.searchTeamName,a.opponentSearchName,a.configuredTeamName)}
            </ha-card>
          `:g}

      ${a.displayMode!=="match"?lo({standings:e.rank?.attributes?.standings,poule:e.poule?.state,competition:e.poule?.attributes?.competition,teamName:a.searchTeamName,displayTeamName:a.configuredTeamName,accentColor:a.accentColor,title:a.standingsTitle,icon:a.standingsIcon,compact:a.displayMode==="both",showLogos:this._config.show_standings_logos!==!1,t:(o,n)=>this._t(o,n)}):g}
    `}_renderHeader(e){let{showTitle:a,titleText:o,titleIcon:n}=e;return c`
      ${a&&(o||n)?c`
            <div class="card-header">
              ${n?c`<ha-icon .icon=${n}></ha-icon>`:""}
              ${o?c`<span class="card-header-title">${o}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:a,rightLogo:o}=e;return c`
      ${this._config.show_watermark?c`
            <img
              class="watermark watermark-left"
              src=${a}
              alt=""
              aria-hidden="true"
              @error=${n=>n.target.style.display="none"}
              @load=${n=>n.target.style.display=""}
            />
            <img
              class="watermark watermark-right"
              src=${o}
              alt=""
              aria-hidden="true"
              @error=${n=>n.target.style.display="none"}
              @load=${n=>n.target.style.display=""}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:a,pouleName:o,roundNumber:n}=e;return c`
      ${this._config.show_header?c`
            <div class="header">
              ${a||o?c`
                    <div class="header-main">
                      <span class="competition">${a}</span>
                      ${o?c`<span class="poule">${a?"\u2022 ":""}${o}</span>`:""}
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
    `}_renderMatchArea(e){let{isLive:a,canToggleView:o,isPostMatch:n,isGameDay:s,leftName:r,rightName:i,leftLogo:l,rightLogo:d,leftUrl:p,rightUrl:m,leftEntityId:u,rightEntityId:h,gymName:f,gymCity:_,gymAddress:S,dateFormatted:$,logoSizeClass:V,showRank:P,leftRank:M,rightRank:v,isCalendarClickable:y,isLogoClickable:L,hasStandingsData:C}=e,z=this._config?.rank_badge_style==="solid"?"rank-solid":"",q=this._t("card.exempt","Bye"),Z=e.isExempt&&!e.isHome||b(r)||r===q,G=e.isExempt&&e.isHome||b(i)||i===q,B=!!(L&&!Z),U=!!(L&&!G);return c`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${V} ${B?"clickable":""}"
            @click=${()=>{B&&this._handleLogoClick(u,p,r)}}
            @keydown=${B?this._onKeyActivate(()=>this._handleLogoClick(u,p,r)):g}
            role=${B?"button":g}
            tabindex=${B?"0":g}
            aria-label=${B?this._t("card.view_team","View {team}").replace("{team}",r):g}
          >
            <img
              class="logo"
              src=${l}
              alt=""
              @error=${W=>{W.target.src.endsWith(A)||(W.target.src=A)}}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${o?c`
                <ha-icon
                  icon="mdi:chevron-left"
                  class="nav-chevron nav-chevron-left ${e.canGoPrev?"":"disabled"}"
                  @click=${()=>this._handleChevronClick("prev",e)}
                  @keydown=${this._onKeyActivate(()=>this._handleChevronClick("prev",e))}
                  role="button"
                  tabindex=${e.canGoPrev?"0":"-1"}
                  aria-disabled=${e.canGoPrev?g:"true"}
                  aria-label=${this._t("card.view_last_match","Show last played match")}
                  title=${this._t("card.view_last_match","Show last played match")}
                ></ha-icon>
              `:""}

          <div
            class="center-meta ${y?"clickable":""}"
            @click=${()=>{y&&this._openCalendar(e.targetDateStr,r,i,f,_,S)}}
            @keydown=${y?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,r,i,f,_,S)):g}
            role=${y?"button":g}
            tabindex=${y?"0":g}
            aria-label=${y?this._t("card.add_to_calendar","Add to Google Calendar"):g}
            title=${y?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${a?c`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${$?`${this._t("card.kickoff","Kick-off")} ${$.time}`:""}
                  </div>
                `:n?c`
                  ${$?c`<div class="match-day">${$.weekday} ${$.day}</div>`:""}
                  <div class="match-main">
                    <div class="score-display">
                      ${e.scoreParts?c`
                            <span class="sr-only">${`${this._t("card.your_score","Our score")}: ${e.scoreParts.my} \u2014 ${this._t("card.opponent_score","Opponent score")}: ${e.scoreParts.opponent}`}</span
                            ><span aria-hidden="true">${this._renderScoreParts(e.scoreParts)}</span
                            >
                          `:e.displayedScore}
                    </div>
                  </div>
                  ${e.displayedResult?c`<div class="badge badge-${e.displayedResult}">
                        ${this._t(`card.${e.displayedResult}`)}
                      </div>`:""}
                `:c`
                  ${$?c`
                        <div class="match-day">${$.weekday} ${$.day}</div>
                        <div class="match-main">
                          <div class="match-time">${e.isExempt?"-":$.time}</div>
                        </div>
                      `:c`<div class="match-main"><div class="match-time">-</div></div>`}
                  ${s&&!e.isStale&&!e.isExempt&&!e.isResultPending?c`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${e.isExempt?c`<div class="badge badge-postponed">${this._t("card.exempt","Bye")}</div>`:""}
                  ${e.isResultPending&&!e.isExempt?c`<div class="badge badge-pending">${this._t("card.result_pending","Result pending")}</div>`:""}
                  ${e.isStale&&!e.isExempt?c`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${o?c`
                <ha-icon
                  icon="mdi:chevron-right"
                  class="nav-chevron nav-chevron-right ${e.canGoNext?"":"disabled"}"
                  @click=${()=>this._handleChevronClick("next",e)}
                  @keydown=${this._onKeyActivate(()=>this._handleChevronClick("next",e))}
                  role="button"
                  tabindex=${e.canGoNext?"0":"-1"}
                  aria-disabled=${e.canGoNext?g:"true"}
                  aria-label=${this._t("card.view_next_match","Show upcoming match")}
                  title=${this._t("card.view_next_match","Show upcoming match")}
                ></ha-icon>
              `:""}
        </div>

        <div class="team-logo-cell cell-right">
          <div
            class="logo-box ${V} ${U?"clickable":""}"
            @click=${()=>{U&&this._handleLogoClick(h,m,i)}}
            @keydown=${U?this._onKeyActivate(()=>this._handleLogoClick(h,m,i)):g}
            role=${U?"button":g}
            tabindex=${U?"0":g}
            aria-label=${U?this._t("card.view_team","View {team}").replace("{team}",i):g}
          >
            <img
              class="logo"
              src=${d}
              alt=""
              @error=${W=>{W.target.src.endsWith(A)||(W.target.src=A)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${r}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${i}</div>
        </div>

        ${P&&(M||v)?c`
              <div class="team-rank-cell rank-left">
                ${M?c`
                      <span
                        class="rank-badge ${this._getRankClass(M)} ${z} ${C?"clickable-badge":""}"
                        @click=${()=>{C&&this._openModal("standings")}}
                        @keydown=${C?this._onKeyActivate(()=>this._openModal("standings")):g}
                        role=${C?"button":g}
                        tabindex=${C?"0":g}
                        aria-label=${C?this._t("card.view_standings","View league standings"):g}
                        title=${C?this._t("card.view_standings","View league standings"):""}
                      >${M}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${v?c`
                      <span
                        class="rank-badge ${this._getRankClass(v)} ${z} ${C?"clickable-badge":""}"
                        @click=${()=>{C&&this._openModal("standings")}}
                        @keydown=${C?this._onKeyActivate(()=>this._openModal("standings")):g}
                        role=${C?"button":g}
                        tabindex=${C?"0":g}
                        aria-label=${C?this._t("card.view_standings","View league standings"):g}
                        title=${C?this._t("card.view_standings","View league standings"):""}
                      >${v}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:a,gymCity:o,gymAddress:n,hasValidForm:s,isPreview:r,displayFormSequence:i,displayFormStreak:l,showFormBlock:d,reserveVenueRow:p}=e;return c`
      ${d?c`
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
              <span class="form-sequence">${i}</span>${l?c`<span class="form-streak">(${l})</span>`:""}
              ${!s&&r?c`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
            </div>
          `:""}

      ${this._config.show_venue&&(a||o)?c`
            <div
              class="footer-venue clickable"
              @click=${()=>this._openMaps(a,o,n)}
              @keydown=${this._onKeyActivate(()=>this._openMaps(a,o,n))}
              role="button"
              tabindex="0"
              aria-label=${this._t("card.open_maps","Open in Google Maps")}
              title=${this._t("card.open_maps","Open in Google Maps")}
            >
              <div class="venue-info">
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                <span class="venue-text">${a}${o?` (${o})`:""}</span>
              </div>
            </div>
          `:this._config.show_venue&&p?c`
              <div class="footer-venue footer-venue-empty" aria-hidden="true">
                <div class="venue-info">
                  <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                  <span class="venue-text">&nbsp;</span>
                </div>
              </div>
            `:""}
    `}static get styles(){return[so,co]}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Xt);console.info(`%c FFBB Tracker Card %c v${Fe} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var ho=window.customCards.findIndex(t=>t.type==="ffbb-tracker-card"),po={type:"ffbb-tracker-card",name:`FFBB Tracker v${Fe}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};ho!==-1?window.customCards[ho]=po:window.customCards.push(po);
