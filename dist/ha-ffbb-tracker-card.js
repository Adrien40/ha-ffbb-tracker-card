var Ve=globalThis,je=Ve.ShadowRoot&&(Ve.ShadyCSS===void 0||Ve.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gt=Symbol(),ca=new WeakMap,$e=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(je&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=ca.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&ca.set(t,e))}return e}toString(){return this.cssText}},da=a=>new $e(typeof a=="string"?a:a+"",void 0,gt),Z=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((o,n,s)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+a[s+1],a[0]);return new $e(t,a,gt)},ha=(a,e)=>{if(je)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let o=document.createElement("style"),n=Ve.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=t.cssText,a.appendChild(o)}},_t=je?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return da(t)})(a):a;var{is:Ro,defineProperty:Io,getOwnPropertyDescriptor:Po,getOwnPropertyNames:zo,getOwnPropertySymbols:Fo,getPrototypeOf:Bo}=Object,G=globalThis,pa=G.trustedTypes,Uo=pa?pa.emptyScript:"",Ho=G.reactiveElementPolyfillSupport,ke=(a,e)=>a,bt={toAttribute(a,e){switch(e){case Boolean:a=a?Uo:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},fa=(a,e)=>!Ro(a,e),ua={attribute:!0,type:String,converter:bt,reflect:!1,useDefault:!1,hasChanged:fa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),G.litPropertyMetadata??(G.litPropertyMetadata=new WeakMap);var U=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ua){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),n=this.getPropertyDescriptor(e,o,t);n!==void 0&&Io(this.prototype,e,n)}}static getPropertyDescriptor(e,t,o){let{get:n,set:s}=Po(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){let i=n?.call(this);s?.call(this,r),this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ua}static _$Ei(){if(this.hasOwnProperty(ke("elementProperties")))return;let e=Bo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ke("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ke("properties"))){let t=this.properties,o=[...zo(t),...Fo(t)];for(let n of o)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,n]of t)this.elementProperties.set(o,n)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let n=this._$Eu(t,o);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let n of o)t.unshift(_t(n))}else e!==void 0&&t.push(_t(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ha(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,o);if(n!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:bt).toAttribute(t,o.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){let o=this.constructor,n=o._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let s=o.getPropertyOptions(n),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:bt;this._$Em=n;let i=r.fromAttribute(t,s.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(e,t,o,n=!1,s){if(e!==void 0){let r=this.constructor;if(n===!1&&(s=this[e]),o??(o=r.getPropertyOptions(e)),!((o.hasChanged??fa)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:n,wrapped:s},r){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[n,s]of o){let{wrapped:r}=s,i=this[n];r!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,s,i)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[ke("elementProperties")]=new Map,U[ke("finalized")]=new Map,Ho?.({ReactiveElement:U}),(G.reactiveElementVersions??(G.reactiveElementVersions=[])).push("2.1.2");var Ae=globalThis,ma=a=>a,Ge=Ae.trustedTypes,ga=Ge?Ge.createPolicy("lit-html",{createHTML:a=>a}):void 0,va="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,$a="?"+q,Vo=`<${$a}>`,te=document,Ce=()=>te.createComment(""),Ee=a=>a===null||typeof a!="object"&&typeof a!="function",St=Array.isArray,jo=a=>St(a)||typeof a?.[Symbol.iterator]=="function",yt=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_a=/-->/g,ba=/>/g,Q=RegExp(`>|${yt}(?:([^\\s"'>=/]+)(${yt}*=${yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ya=/'/g,xa=/"/g,ka=/^(?:script|style|textarea|title)$/i,At=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),c=At(1),Cn=At(2),En=At(3),ae=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),wa=new WeakMap,ee=te.createTreeWalker(te,129);function Sa(a,e){if(!St(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ga!==void 0?ga.createHTML(e):e}var Go=(a,e)=>{let t=a.length-1,o=[],n,s=e===2?"<svg>":e===3?"<math>":"",r=Se;for(let i=0;i<t;i++){let l=a[i],h,p,f=-1,m=0;for(;m<l.length&&(r.lastIndex=m,p=r.exec(l),p!==null);)m=r.lastIndex,r===Se?p[1]==="!--"?r=_a:p[1]!==void 0?r=ba:p[2]!==void 0?(ka.test(p[2])&&(n=RegExp("</"+p[2],"g")),r=Q):p[3]!==void 0&&(r=Q):r===Q?p[0]===">"?(r=n??Se,f=-1):p[1]===void 0?f=-2:(f=r.lastIndex-p[2].length,h=p[1],r=p[3]===void 0?Q:p[3]==='"'?xa:ya):r===xa||r===ya?r=Q:r===_a||r===ba?r=Se:(r=Q,n=void 0);let d=r===Q&&a[i+1].startsWith("/>")?" ":"";s+=r===Se?l+Vo:f>=0?(o.push(h),l.slice(0,f)+va+l.slice(f)+q+d):l+q+(f===-2?i:d)}return[Sa(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},Me=class a{constructor({strings:e,_$litType$:t},o){let n;this.parts=[];let s=0,r=0,i=e.length-1,l=this.parts,[h,p]=Go(e,t);if(this.el=a.createElement(h,o),ee.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(n=ee.nextNode())!==null&&l.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(let f of n.getAttributeNames())if(f.endsWith(va)){let m=p[r++],d=n.getAttribute(f).split(q),u=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:u[2],strings:d,ctor:u[1]==="."?wt:u[1]==="?"?vt:u[1]==="@"?$t:pe}),n.removeAttribute(f)}else f.startsWith(q)&&(l.push({type:6,index:s}),n.removeAttribute(f));if(ka.test(n.tagName)){let f=n.textContent.split(q),m=f.length-1;if(m>0){n.textContent=Ge?Ge.emptyScript:"";for(let d=0;d<m;d++)n.append(f[d],Ce()),ee.nextNode(),l.push({type:2,index:++s});n.append(f[m],Ce())}}}else if(n.nodeType===8)if(n.data===$a)l.push({type:2,index:s});else{let f=-1;for(;(f=n.data.indexOf(q,f+1))!==-1;)l.push({type:7,index:s}),f+=q.length-1}s++}}static createElement(e,t){let o=te.createElement("template");return o.innerHTML=e,o}};function he(a,e,t=a,o){if(e===ae)return e;let n=o!==void 0?t._$Co?.[o]:t._$Cl,s=Ee(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(a),n._$AT(a,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=n:t._$Cl=n),n!==void 0&&(e=he(a,n._$AS(a,e.values),n,o)),e}var xt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,n=(e?.creationScope??te).importNode(t,!0);ee.currentNode=n;let s=ee.nextNode(),r=0,i=0,l=o[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new Te(s,s.nextSibling,this,e):l.type===1?h=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(h=new kt(s,this,e)),this._$AV.push(h),l=o[++i]}r!==l?.index&&(s=ee.nextNode(),r++)}return ee.currentNode=te,n}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},Te=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,n){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=he(this,e,t),Ee(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==ae&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):jo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&Ee(this._$AH)?this._$AA.nextSibling.data=e:this.T(te.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,n=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Me.createElement(Sa(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(t);else{let s=new xt(n,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=wa.get(e.strings);return t===void 0&&wa.set(e.strings,t=new Me(e)),t}k(e){St(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,n=0;for(let s of e)n===t.length?t.push(o=new a(this.O(Ce()),this.O(Ce()),this,this.options)):o=t[n],o._$AI(s),n++;n<t.length&&(this._$AR(o&&o._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=ma(e).nextSibling;ma(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,n,s){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=_}_$AI(e,t=this,o,n){let s=this.strings,r=!1;if(s===void 0)e=he(this,e,t,0),r=!Ee(e)||e!==this._$AH&&e!==ae,r&&(this._$AH=e);else{let i=e,l,h;for(e=s[0],l=0;l<s.length-1;l++)h=he(this,i[o+l],t,l),h===ae&&(h=this._$AH[l]),r||(r=!Ee(h)||h!==this._$AH[l]),h===_?e=_:e!==_&&(e+=(h??"")+s[l+1]),this._$AH[l]=h}r&&!n&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wt=class extends pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},vt=class extends pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}},$t=class extends pe{constructor(e,t,o,n,s){super(e,t,o,n,s),this.type=5}_$AI(e,t=this){if((e=he(this,e,t,0)??_)===ae)return;let o=this._$AH,n=e===_&&o!==_||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==_&&(o===_||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},kt=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){he(this,e)}};var qo=Ae.litHtmlPolyfillSupport;qo?.(Me,Te),(Ae.litHtmlVersions??(Ae.litHtmlVersions=[])).push("3.3.3");var Aa=(a,e,t)=>{let o=t?.renderBefore??e,n=o._$litPart$;if(n===void 0){let s=t?.renderBefore??null;o._$litPart$=n=new Te(e.insertBefore(Ce(),s),s,void 0,t??{})}return n._$AI(a),n};var Oe=globalThis,B=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Aa(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ae}};B._$litElement$=!0,B.finalized=!0,Oe.litElementHydrateSupport?.({LitElement:B});var Wo=Oe.litElementPolyfillSupport;Wo?.({LitElement:B});(Oe.litElementVersions??(Oe.litElementVersions=[])).push("4.2.2");var Ne="0.6.24";var De={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",display_mode:"match",standings_title:"",standings_icon:"mdi:format-list-numbered",standings_popup_detailed:!1,show_form:!0,show_venue:!0,show_watermark:!0,show_calendar_logos:!0,show_standings_logos:!0};var Ca={nextOpponent:["prochain_match_adversaire","next_match_opponent"],nextDate:["prochain_match_date","next_match_date"],nextLocation:["prochain_match_lieu","next_match_location"],nextVenue:["prochain_match_terrain","next_match_venue","next_match_venue_type"],lastScore:["dernier_match_score","last_match_score"],lastOpponent:["dernier_match_adversaire","last_match_opponent"],lastResult:["dernier_match_resultat","last_match_result"],lastDate:["dernier_match_date","last_match_date"],poule:["poule","pool"],rank:["classement","rank"],rankEvolution:["classement_evolution","rank_evolution"],form:["forme_recente","recent_form","form"]},Ea={matchInProgress:["match_en_cours","match_in_progress"]},Ct=["prochain_match","next_match","dernier_match","last_match","classement","rank","poule","pool","forme_recente","recent_form","form","game_day","jour_de_match","match_en_cours","match_in_progress"],Vn=new RegExp(`^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${Ct.join("|")})`),Et="ffbb_tracker",Ko={nextOpponent:"next_match_opponent",nextDate:"next_match_date",nextLocation:"next_match_location",nextVenue:"next_match_venue_type",lastScore:"last_match_score",lastOpponent:"last_match_opponent",lastResult:"last_match_result",lastDate:"last_match_date",poule:"poule",rank:"rank",rankEvolution:"rank_evolution",form:"form",matchInProgress:"match_in_progress"},Ma=new Map(Object.entries(Ko).map(([a,e])=>[e,a]));var Yo=["win","loss","draw"],M="/local/community/ha-ffbb-tracker-card/brand/icon.png";function C(a){return(a||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function W(a,e){if(!a||!e)return!1;if(a===e)return!0;let[t,o]=a.length<=e.length?[a,e]:[e,a],n=/\d$/.test(t);for(let s=o.indexOf(t);s!==-1;s=o.indexOf(t,s+1))if(Jo(o.slice(0,s),o.slice(s+t.length),n))return!0;return!1}var Ta=/u\d{1,2}[mf]?|(?:nm|nf|rm|rf|dm|df|pm|pf)\d|phase\d+/g;function Jo(a,e,t){let o=a.replace(Ta,""),n=e.replace(Ta,"");return/(^|\D)1$/.test(n)&&!(n==="1"&&t)&&(n=n.slice(0,-1)),!/\d/.test(o)&&!/\d/.test(n)}var Oa={fr:{win:"V",loss:"D",draw:"N"},en:{win:"W",loss:"L",draw:"D"}};function Tt(a,e){let t=String(a??"").trim().toUpperCase();if(!t)return null;if(e){let o=Oa[e]||Oa.en,n=Object.keys(o).find(s=>o[s]===t);if(n)return n}return t==="V"||t==="W"?"win":t==="L"?"loss":t==="N"?"draw":t==="D"?e?null:"loss":null}function za(a,e){return Tt(a,e)??"draw"}function qe(a,e,t){return!e||typeof a!="string"||!t?a:a.split("-").map(o=>{let n=Tt(o,e);return n&&t[n]||o}).join("-")}function We(a,e,t){if(!e||typeof a!="string"||!t)return a;let o=/^(\d+)\s*([A-Za-z])$/.exec(a.trim());if(!o)return a;let n=Tt(o[2],e);return n?`${o[1]}${t[n]||o[2]}`:a}function Fa(a,e){return typeof a?.is_home=="boolean"?{isHomeMyTeam:a.is_home,isAwayMyTeam:!a.is_home}:{isHomeMyTeam:!!e(a?.home_team||""),isAwayMyTeam:!!e(a?.away_team||"")}}function Ye(a,e,t=null){if(!a||!e)return null;let o=Qo(a,e),n=Xo(a,e,t);if(!n)return o;let s={};for(let r of Object.keys(o))s[r]=n[r]??o[r];return s}function Xo(a,e,t){let o=t?.[a];if(!o?.device_id||o.platform&&o.platform!==Et)return null;let n={},s=!1;for(let[r,i]of Object.entries(t)){if(i?.device_id!==o.device_id||i.platform&&i.platform!==Et)continue;let l=Ma.get(i.translation_key);l&&e[r]&&(n[l]=e[r],s=!0)}return s?n:null}function Zo(a,e,t){let o=s=>{for(let r of s)if(t[r])return t[r];return null},n={};for(let[s,r]of Object.entries(Ca))n[s]=o(r.map(i=>`${a}${i}`));for(let[s,r]of Object.entries(Ea))n[s]=o(r.map(i=>`${e}${i}`));return n}function Qo(a,e){let t=a.slice(a.indexOf(".")+1),o=[];for(let r=1;r<t.length;r++)if(t[r]==="_"&&Ct.some(i=>t.startsWith(i,r+1))){let i=t.slice(0,r);o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}if(o.length===0){let r=a.substring(0,a.lastIndexOf("_")+1);o.push([r,r.replace("sensor.","binary_sensor.")])}let n=null,s=-1;for(let[r,i]of o){let l=Zo(r,i,e),h=Object.values(l).filter(Boolean).length;h>s&&(n=l,s=h)}return n}function fe(a,e){let t=C(e||"");if(!t)return()=>!1;let o=(Array.isArray(a)?a:[]).some(n=>{let s=C(n||"");return!!s&&s===t});return n=>{let s=C(n||"");return s?o?s===t:W(s,t):!1}}function Na(a){return!a||typeof a!="string"?null:a.trim().split(/[?#]/)[0].replace(/\/+$/,"").toLowerCase()||null}function en(a,e,{opponentUrl:t=null}={}){if(Array.isArray(e)&&t){let s=Na(t),r=s?e.find(i=>i?[i.team_url,i.url,i.link].some(l=>Na(l)===s):!1):null;if(r)return r.position}if(!a||!Array.isArray(e))return null;let o=C(a);if(!o)return null;let n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name,i=C(r);return!!(i&&i===o)});if(n||(n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name,i=C(r);return W(i,o)})),!n){let s=o.replace(/\d+$/,"");if(s&&s!==o){let r=e.filter(i=>{if(!i)return!1;let l=C(i.team_name||i.name);return!!l&&l.startsWith(s)});r.length===1&&C(r[0].team_name||r[0].name)===s&&(n=r[0])}}return n?n.position:null}function ue(a,e){if(a==null||a===""||isNaN(Number(a)))return null;let t=parseInt(a,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let o=t%10,n=t%100;return o===1&&n!==11?`${t}st`:o===2&&n!==12?`${t}nd`:o===3&&n!==13?`${t}rd`:`${t}th`}function Ot(a,e){if(typeof a!="string")return null;let t=a.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);if(!t)return null;let[,o,n]=t;return e?{my:o,opponent:n,mineFirst:!0}:{my:n,opponent:o,mineFirst:!1}}function tn(a,e,t){let o=r=>/^\d+$/.test(String(r??"").trim())?Number(r):null,n=o(e?.team_score),s=o(e?.opponent_score);if(n===null||s===null){let r=typeof a=="string"?a.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/):null;if(!r)return a;n=Number(r[1]),s=Number(r[2])}return t?`${n} - ${s}`:`${s} - ${n}`}function Ke(a,e,t){if(!Array.isArray(e))return null;let o=C(a);if(!o)return null;let n=e.find(s=>{let r=C(s?.team_name||s?.name||"");return!!(r&&r===o)});if(n||(n=e.find(s=>{let r=C(s?.team_name||s?.name||"");return W(r,o)})),!n)return null;for(let s of t)if(n[s]){let r=D(n[s]);if(r)return r}return null}function an(a){if(!Array.isArray(a)||a.length<2)return a;let e=a.map(t=>{let o=parseInt(String(t?.round??"").trim(),10);return Number.isFinite(o)?o:null});return e.some(t=>t===null)||new Set(e).size!==e.length?a:a.map((t,o)=>({m:t,r:e[o]})).sort((t,o)=>t.r-o.r).map(t=>t.m)}function Nt(a,e){return an(on(a,e))}function on(a,e){let t=a?.poule?.attributes?.calendar||a?.poule?.attributes?.matches||a?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let o=a?.nextDate?.attributes?.calendar||a?.nextDate?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let n=a?.rank?.attributes?.calendar||a?.rank?.attributes?.matches;if(Array.isArray(n)&&n.length>0)return n;let s=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(s)&&s.length>0?s:[]}function D(a){if(!a||typeof a!="string")return null;let e=a.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function Da(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Ba(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(o);n.setDate(n.getDate()+2);let s=e.getTime();return s>=t.getTime()&&s<n.getTime()}function nn(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(o);return n.setDate(n.getDate()-1),e.getTime()>=n.getTime()}var Dt=3;function Lt(a){let e=Number(a?.nextDate?.attributes?.result_grace_hours);return Number.isFinite(e)&&e>0?e:Dt}var Le=a=>!!(a&&(a.is_played||a.score)),oe=a=>Date.parse(a?.date??a?.datetime);function Je(a,e=new Date,t=Dt){if(!a||a.is_exempt||Le(a))return!1;let o=oe(a);return Number.isNaN(o)?!1:e.getTime()-o>t*36e5}function La(a,e=new Date){if(!Array.isArray(a))return-1;for(let t=a.length-1;t>=0;t--){let o=a[t];if(o&&!Le(o)&&o.date&&Ba(o.date,e))return t}return-1}function sn(a){if(!Array.isArray(a))return-1;let e=-1,t=-1/0;for(let o=0;o<a.length;o++){if(!Le(a[o]))continue;let n=oe(a[o]),s=Number.isFinite(n)?n:-1/0;(e===-1||s>=t)&&(e=o,t=s)}return e}function Rt(a,e=new Date,t=Dt){if(!Array.isArray(a))return-1;let o=r=>!!r?.is_exempt,n=r=>{let i=-1,l=1/0;return a.forEach((h,p)=>{if(!r(h))return;let f=oe(h),m=Number.isFinite(f)?f:1/0;(i===-1||m<l)&&(i=p,l=m)}),i},s=n(r=>!o(r)&&!Le(r)&&!Je(r,e,t));return s!==-1?s:n(r=>!o(r)&&!Le(r))}function Ra(a,e,t){if(!Array.isArray(a)||!Number.isInteger(e)||e<0||e>=a.length)return-1;let o=a.map((i,l)=>l),n=o.filter(i=>Number.isFinite(oe(a[i]))),s=[...n].sort((i,l)=>oe(a[i])-oe(a[l])||i-l);n.forEach((i,l)=>{o[i]=s[l]});let r=o.indexOf(e)+(t==="prev"?-1:1);return r>=0&&r<o.length?o[r]:-1}function rn(a,{matchNumber:e,dateStr:t}={}){if(!Array.isArray(a))return-1;let o=String(e??"").trim();if(o){let s=a.findIndex(r=>String(r?.match_number??"").trim()===o);if(s!==-1)return s}let n=Date.parse(t);return Number.isNaN(n)?-1:a.findIndex(s=>oe(s)===n)}function ln({defaultView:a="auto",manualView:e=null,isLive:t=!1,lastDate:o=null,hasLastScore:n=!1,hasLastMatch:s=!0,nextDate:r=null,hasNextMatch:i=!1,nextIsStale:l=!1,now:h=new Date}={}){return t||!s?!1:e!==null?e==="last":a==="next"?!1:a==="last"?!(!n||i&&!l&&nn(r,h)):!!(n&&(l||Ba(o,h)))}var cn=["match","standings","both"];function Re(a){return a&&a!=="unknown"&&a!=="unavailable"?a:""}function Xe(a){return cn.includes(a?.display_mode)?a.display_mode:"match"}var Ia=3,dn=3,hn=2;function Pa(a){let e=Number.isFinite(a)&&a>0?a:0;return dn+Math.ceil(e/hn)}function Ua({config:a,standings:e}={}){let t=Xe(a),o=Array.isArray(e)?e.length:0;return t==="match"?Ia:t==="standings"?Pa(o):Ia+Pa(o)}function Ze(a){return Array.isArray(a)?[...a].sort((e,t)=>{let o=n=>{let s=parseInt(n?.position??n?.rank,10);return isNaN(s)?999:s};return o(e)-o(t)}):[]}function pn(a,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(a,e):null}var un=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function Ie(a,e=pn){if(typeof a!="string")return!1;let t=a.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let o=e("color",t);return typeof o=="boolean"?o:un.test(t)}function fn(a){let e=a?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&Ie(a?.custom_accent_color)?a.custom_accent_color.trim():"#ff6b00"}function Ha(a,e){if(a==="12"||a==="am_pm")return!0;if(a==="24"||a==="twenty_four")return!1;let t=a==="system"?void 0:e;try{let o=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof o.hour12=="boolean"?o.hour12:o.hourCycle==="h12"||o.hourCycle==="h11"}catch{return!1}}function It(a,e="en-US",{hour12:t}={}){if(!a||a==="unknown"||a==="unavailable")return null;let o=new Date(a);if(isNaN(o.getTime()))return null;let n=o.toLocaleDateString(e,{weekday:"short"}),s=o.toLocaleDateString(e,{day:"numeric",month:"short"}),r=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},i=o.toLocaleTimeString(e,r);return{weekday:n,day:s,time:i}}function Mt({isHome:a=!0,isMyTeam:e=a,teamName:t="",entities:o={},opponentSensor:n=null,selectedEntity:s=null}={}){let r=(i,l)=>{if(!i||typeof i!="object")return null;for(let h of l)if(i[h]){let p=D(i[h]);if(p)return p}return null};if(e){let i=r(n?.attributes,["team_url","team_link"]);if(i)return i;let l=[s,o?.nextDate,o?.lastDate,o?.rank];for(let f of l){let m=r(f?.attributes,["team_url","team_link"]);if(m)return m}let h=o?.rank?.attributes?.standings||s?.attributes?.standings,p=Ke(t,h,["team_url","url","link"]);if(p)return p}else{let i=r(n?.attributes,["opponent_url","opponent_team_url","opponent_link"]);if(i)return i;let l=o?.rank?.attributes?.standings||s?.attributes?.standings,h=Ke(t,l,["team_url","url","link"]);if(h)return h}return null}function Qe({teamName:a="",matchLogo:e=null,isMyTeam:t=!1,myTeamLogo:o=null,nextOpponentState:n=null,nextOpponentLogo:s=null,lastOpponentState:r=null,lastOpponentLogo:i=null,standings:l=null}={}){let h=D(e);if(h)return h;if(t&&o&&o!==M)return o;let p=C(a);if(p){let f=C(n||"");if(f&&W(f,p)){let d=D(s);if(d)return d}let m=C(r||"");if(m&&W(m,p)){let d=D(i);if(d)return d}if(Array.isArray(l)&&l.length>0){let d=Ke(a,l,["team_logo_url","opponent_logo_url","logo_url","logo","team_logo","club_logo","crest","image","image_url","badge"]);if(d)return d}}return t&&o?o:M}function Va({entities:a={},config:e={},manualView:t=null,matchIndex:o=null,states:n={},lang:s="fr",locale:r=null,hour12:i=void 0,t:l=(m,d="")=>d,isPreview:h=!1,now:p=new Date,instanceLanguage:f=""}={}){let m=k=>!!(k&&k!=="unknown"&&k!=="unavailable"),d=!!(a.matchInProgress&&a.matchInProgress.state==="on"),u=a.lastScore?.state,g=m(u),A=a.nextDate?.state,v=m(A),z=g||m(a.lastOpponent?.state)||m(a.lastDate?.state),R=v||m(a.nextOpponent?.state),O=e.entity&&n?n[e.entity]:null,y=Nt(a,O),x=Array.isArray(y)&&y.length>0,$=x?sn(y):-1,E=Lt(a),F=x?Rt(y,p,E):-1,I=x&&F===-1&&La(y,p)===-1&&!v&&g&&!d&&t===null&&e.default_match_view!=="next"||ln({defaultView:e.default_match_view||"auto",manualView:t,isLive:d,lastDate:a.lastDate?.state,hasLastScore:g,hasLastMatch:z,nextDate:A,hasNextMatch:v,nextIsStale:!!a.nextDate?.attributes?.is_stale&&Date.parse(A)<Date.parse(a.lastDate?.state),now:p}),ne=x&&!d&&!I&&typeof o!="number"?La(y,p):-1,K=typeof o=="number"&&!d?o:ne!==-1?ne:null,se=k=>x?rn(y,{matchNumber:a[k]?.attributes?.match_number,dateStr:a[k]?.state}):-1,re=(k,J)=>k!==-1?k:J,T;typeof K=="number"&&x?T=Math.max(0,Math.min(K,y.length-1)):t==="last"?T=re(se("lastDate"),$!==-1?$:0):t==="next"?T=re(se("nextDate"),F!==-1?F:Math.max(0,y.length-1)):I?T=re(se("lastDate"),$!==-1?$:0):T=re(se("nextDate"),F!==-1?F:Math.max(0,y.length-1));let b=typeof K=="number"&&x&&!!y[T]?y[T]:null,S=b?!!(b.is_played||b.score):I,eo=!d&&(x&&y.length>1||z&&R),Pe=x&&y.length>1,Vt=Pe?Ra(y,T,"prev"):-1,jt=Pe?Ra(y,T,"next"):-1,to=Pe?Vt!==-1:!S,ao=Pe?jt!==-1:S,oo=!S&&!d&&(b?!!(b.date&&Da(b.date,p)):v&&Da(A,p)),ie=a.poule?.attributes?.team||"",Gt=e.custom_team_name?.trim(),Y=Gt||ie||l("card.unknown_team","My team"),w,H,V,ge,_e,at,ot,nt,ze,Fe,Be,be,st,ye,j,N=S?a.lastOpponent:a.nextOpponent,xe=N?.state;if(b){let k=b.home_team||"",J=b.away_team||"";w=b.is_home!==void 0?b.is_home:C(k)===C(ie||Y),H=w?J:k,V=H;let ce=P=>a[P]?.attributes,Lo=ce("nextOpponent")?.team_logo_url||ce("lastOpponent")?.team_logo_url||ce("nextDate")?.team_logo_url||ce("lastDate")?.team_logo_url||null,ta=a.rank?.attributes?.standings,mt=S?T===$:T===F,aa=mt?D(N?.attributes?.opponent_logo_url):null,oa=(P,we,de)=>{let X=Qe({teamName:P,matchLogo:we,isMyTeam:de,myTeamLogo:Lo,nextOpponentState:a.nextOpponent?.state,nextOpponentLogo:ce("nextOpponent")?.opponent_logo_url,lastOpponentState:a.lastOpponent?.state,lastOpponentLogo:ce("lastOpponent")?.opponent_logo_url,standings:ta});return X===M&&!de&&aa?aa:X},na=oa(k,b.home_logo||b.home_team_logo,w),sa=oa(J,b.away_logo||b.away_team_logo,!w);ge=w?na:sa,_e=w?sa:na;let ra=(P,we)=>{let de=C(P),X=C(we);return W(de,X)},ia=(P,we,de)=>{let X=D(we);if(X)return X;if(de)return Mt({isHome:!0,teamName:ie||Y,entities:a,opponentSensor:N,selectedEntity:O});if(mt){let ve=D(N?.attributes?.opponent_url);if(ve)return ve}for(let ve of[a.nextOpponent,a.lastOpponent])if(ra(ve?.state,P)){let la=D(ve?.attributes?.opponent_url);if(la)return la}return Ke(P,ta,["team_url","url","link"])};at=ia(k,b.home_url,w),ot=ia(J,b.away_url,!w),nt=D(w?b.away_url:b.home_url)||(mt?D(N?.attributes?.opponent_url):null)||[a.nextOpponent,a.lastOpponent].map(P=>ra(P?.state,H)?D(P?.attributes?.opponent_url):null).find(Boolean)||null,ze=b.gym_name||"",Fe=b.gym_city||"",Be=b.formatted_address||"",be=b.date||null,st=String(b.round??""),ye=!!b.is_stale,j=!!b.is_exempt}else{H=m(xe)?xe:l("card.unknown_opponent","Opponent"),V=m(xe)?xe:"",w=S?a.lastScore?.attributes?.is_home??a.lastDate?.attributes?.is_home??!0:a.nextVenue?.state==="home"||a.nextOpponent?.attributes?.is_home===!0,ge=N?.attributes?.team_logo_url||M,_e=N?.attributes?.opponent_logo_url||M;let k=ie||Y,J=w?k:V,ea=w?V:k;at=Mt({isHome:w,teamName:J,entities:a,opponentSensor:N,selectedEntity:O}),ot=Mt({isHome:!w,teamName:ea,entities:a,opponentSensor:N,selectedEntity:O}),nt=D(N?.attributes?.opponent_url)||D(N?.attributes?.opponent_team_url)||null,st=S?a.lastDate?.attributes?.round||"":a.nextDate?.attributes?.round||"",S?(ze=a.lastDate?.attributes?.gym_name||"",Fe=a.lastDate?.attributes?.gym_city||"",Be=a.lastDate?.attributes?.formatted_address||""):(ze=a.nextLocation?.attributes?.gym_name||a.nextOpponent?.attributes?.gym_name||"",Fe=a.nextLocation?.attributes?.gym_city||a.nextOpponent?.attributes?.gym_city||"",Be=a.nextLocation?.attributes?.formatted_address||a.nextOpponent?.attributes?.formatted_address||""),be=S?a.lastDate?.state:a.nextDate?.state,ye=!!a.nextDate?.attributes?.is_stale,j=!S&&!!a.nextDate?.attributes?.is_exempt}j&&(H=l("card.exempt","Bye"));let no=w?Y:H,so=w?H:Y,ro=w?ge:_e,io=w?_e:ge,rt=ie||Y,lo=w?rt:V,co=w?V:rt,ho=w?e.entity:N?.entity_id,po=w?N?.entity_id:e.entity,uo=Re(a.poule?.attributes?.competition),fo=Re(a.poule?.state),mo=It(be,r||s,{hour12:i}),Ue={win:l("card.form_letter_win","W"),loss:l("card.form_letter_loss","L"),draw:l("card.form_letter_draw","D")},qt=We(a.form?.attributes?.current_streak||"",f,Ue),it=a.form?.state,lt=m(it)?qe(it,f,Ue):it,He=m(lt),go=He?lt:h?qe("V-V-D-V-N","fr",Ue):"",_o=He?qt:h?We("2V","fr",Ue):"",bo=e.show_form&&(He||h),yo=!!e.show_venue&&x&&y.some(k=>k&&(k.gym_name||k.gym_city)),xo=e.show_title!==!1,ct=e.title?.trim(),le=l("card.default_title","Next match");d?le=l("card.live_title","Live match"):S?le=!!b&&$!==-1&&T!==$?l("card.played_title","Played match"):l("card.last_title","Last match"):j?le=l("card.exempt_title","Bye week"):ye&&(le=l("card.postponed_title","Postponed match"));let wo=ct?`${ct} \u2022 ${le}`:le,vo=e.icon!==void 0?e.icon:"mdi:basketball",$o=`logo-box-${e.logo_size||"medium"}`,ko=Xe(e),So=e.standings_title?.trim()||l("card.standings_title","Standings"),Ao=e.standings_icon!==void 0?e.standings_icon:"mdi:format-list-numbered",Wt=e.show_rank!==!1,dt=a.rank?.state,Kt=m(dt)?dt:null,Yt=en(V,a.rank?.attributes?.standings,{opponentUrl:j?null:nt}),ht=ue(Kt,s),pt=ue(Yt,s),ut=w?ht:pt,ft=w?pt:ht;h&&Wt&&(ut||(ut=ue(w?2:5,s)),ft||(ft=ue(w?5:2,s)));let Jt=!!b&&!S&&!d&&!ye&&!j&&Je(b,p,E),Co=!d&&!S&&!Jt&&!j&&!!be,Eo=e.logo_click_action&&e.logo_click_action!=="none",Mo=Array.isArray(a.rank?.attributes?.standings)&&a.rank.attributes.standings.length>0,To=fn(e),Xt=!b||S&&T===$,Oo=Xt&&m(a.lastScore?.state)?tn(a.lastScore.state,a.lastScore.attributes,w):null,Zt=b?.score||Oo||"-",Qt=k=>Yo.includes(k)?k:null,No=Qt(b?.result)||(Xt?Qt(a.lastResult?.state):null),Do=Ot(Zt,w);return{isValidState:m,isLive:d,lastScoreState:u,hasLastScore:g,nextDateState:A,hasNextMatch:v,hasLastMatchData:z,hasNextMatchData:R,canToggleView:eo,canGoPrev:to,canGoNext:ao,chevronPrevIndex:Vt,chevronNextIndex:jt,currentIndex:T,hasCalendar:x,calendarMatches:y,displayedScore:Zt,displayedResult:No,scoreParts:Do,isPostMatch:S,isGameDay:oo,currentOpponentSensor:N,officialTeamName:ie,configuredTeamName:Gt,teamName:Y,rawOpponent:xe,opponentName:H,opponentSearchName:V,isHome:w,teamLogoUrl:ge,opponentLogoUrl:_e,leftName:no,rightName:so,leftLogo:ro,rightLogo:io,searchTeamName:rt,leftMatchName:lo,rightMatchName:co,leftUrl:at,rightUrl:ot,leftEntityId:ho,rightEntityId:po,competition:uo,pouleName:fo,roundNumber:st,gymName:ze,gymCity:Fe,gymAddress:Be,targetDateStr:be,dateFormatted:mo,formStreak:qt,formSequence:lt,hasValidForm:He,isPreview:h,displayFormSequence:go,displayFormStreak:_o,showFormBlock:bo,reserveVenueRow:yo,showTitle:xo,configuredTitle:ct,titleText:wo,titleIcon:vo,displayMode:ko,standingsTitle:So,standingsIcon:Ao,logoSizeClass:$o,showRank:Wt,rawUserRank:dt,userRankNum:Kt,opponentRankNum:Yt,userRankFormatted:ht,opponentRankFormatted:pt,leftRank:ut,rightRank:ft,isCalendarClickable:Co,isLogoClickable:Eo,hasStandingsData:Mo,accentColor:To,isStale:ye,isExempt:j,isResultPending:Jt}}var ja={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",postponed_title:"Match report\xE9",exempt:"Exempt",exempt_title:"Journ\xE9e d'exempt",result_pending:"R\xE9sultat en attente",result_pending_short:"En attente",win:"Victoire",loss:"D\xE9faite",draw:"Nul",your_score:"Notre score",home_short:"DOM",away_short:"EXT",opponent_score:"Score adversaire",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_letter_win:"V",form_letter_loss:"D",form_letter_draw:"N",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",table_group_matches:"Rencontres",table_irregularities:"I",table_penalties:"P\xE9n.",table_forfeits:"For.",table_defaults:"D\xE9f.",table_group_penalties:"P\xE9nalit\xE9s",table_referee:"Arb",table_coach:"Ent",table_group_points:"Points",table_scored:"M",table_conceded:"E",table_diff:"D",table_played_full:"Matchs jou\xE9s",table_wins_full:"Victoires",table_losses_full:"D\xE9faites",table_draws_full:"Matchs nuls",table_irregularities_full:"Irr\xE9gularit\xE9s",table_penalties_full:"P\xE9nalit\xE9s (total)",table_forfeits_full:"Forfaits",table_defaults_full:"D\xE9fauts",table_referee_full:"P\xE9nalit\xE9s arbitrage",table_coach_full:"P\xE9nalit\xE9s entra\xEEneur",table_scored_full:"Points marqu\xE9s",table_conceded_full:"Points encaiss\xE9s",table_diff_full:"Diff\xE9rence de points",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",played_title:"Match jou\xE9",last_title:"Dernier match",kickoff:"Coup d'envoi",calendar_details:"Match FFBB\xA0: {home} vs {away}"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",entity_missing:"\xAB {entity} \xBB n'existe plus (sans doute renomm\xE9e) : s\xE9lectionnez-la \xE0 nouveau.",entity_suggestion:"Suggestion : {entity}",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_size_extra_large:"Tr\xE8s grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",title_helper:"Laissez vide pour un titre dynamique par d\xE9faut (\xAB Prochain match \xBB / \xAB Match en direct \xBB / \xAB Dernier match \xBB). Si renseign\xE9, il s'affiche en pr\xE9fixe devant ce titre dynamique.",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",standings_popup_detailed:"Classement d\xE9taill\xE9 dans la popup",standings_popup_detailed_helper:"Affiche le tableau complet (m\xEAmes colonnes que la carte classement secondaire) \xE0 la place du tableau simple.",display_mode:"Cartes \xE0 afficher",display_mode_match:"Carte match uniquement (par d\xE9faut)",display_mode_standings:"Carte classement uniquement",display_mode_both:"Carte match + carte classement",standings_card_section:"Carte classement ind\xE9pendante",standings_title:"Titre de la carte classement",standings_title_helper:"Laissez vide pour utiliser le titre par d\xE9faut",standings_icon:"Ic\xF4ne de la carte classement",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan",show_calendar_logos:"Logos d'\xE9quipe dans les lignes du calendrier",show_standings_logos:"Logos d'\xE9quipe dans les lignes de classement (popup et carte autonome)"}};var Ga={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",postponed_title:"Postponed match",exempt:"Bye",exempt_title:"Bye week",result_pending:"Result pending",result_pending_short:"Pending",win:"Win",loss:"Loss",draw:"Draw",your_score:"Our score",home_short:"HOME",away_short:"AWAY",opponent_score:"Opponent score",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_letter_win:"W",form_letter_loss:"L",form_letter_draw:"D",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",table_group_matches:"Games",table_irregularities:"I",table_penalties:"Pen.",table_forfeits:"Forf.",table_defaults:"Def.",table_group_penalties:"Penalties",table_referee:"Ref",table_coach:"Coach",table_group_points:"Points",table_scored:"F",table_conceded:"A",table_diff:"D",table_played_full:"Games played",table_wins_full:"Wins",table_losses_full:"Losses",table_draws_full:"Draws",table_irregularities_full:"Irregularities",table_penalties_full:"Penalties (total)",table_forfeits_full:"Forfeits",table_defaults_full:"Defaults",table_referee_full:"Referee penalties",table_coach_full:"Coach penalties",table_scored_full:"Points scored (for)",table_conceded_full:"Points conceded (against)",table_diff_full:"Points difference",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",played_title:"Played match",last_title:"Last match",kickoff:"Kick-off",calendar_details:"FFBB match: {home} vs {away}"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",entity_missing:'"{entity}" no longer exists (probably renamed): select it again.',entity_suggestion:"Suggestion: {entity}",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team logo size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_size_extra_large:"Extra Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",title_helper:'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix in front of that dynamic title.',icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",standings_popup_detailed:"Detailed standings in popup",standings_popup_detailed_helper:"Show the full table (same columns as the secondary standings card) instead of the simple one.",display_mode:"Cards to display",display_mode_match:"Match card only (default)",display_mode_standings:"Standings card only",display_mode_both:"Match card + standings card",standings_card_section:"Standalone standings card",standings_title:"Standings card title",standings_title_helper:"Leave blank for the default title",standings_icon:"Standings card icon",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos",show_calendar_logos:"Team logos in the calendar rows",show_standings_logos:"Team logos in standings rows (popup and standalone card)"}};var qa={fr:ja,en:Ga};function et(a){return(a?.locale?.language||a?.language||"en").substring(0,2).toLowerCase()}function me(a){return qa[a]||qa.en}function tt(a,e,t=""){if(!a||!e)return t;let o=e.split("."),n=a;for(let s of o){if(!n||typeof n!="object"||!(s in n))return t;n=n[s]}return typeof n=="string"?n:t}var Wa=Z`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
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
    /* The centre column has a FIXED width: with "auto" it followed its
       content (a played match's score + badge is wider than an upcoming or
       bye one), which moved both logos a few px between states. */
    grid-template-columns: minmax(0, 1fr) 144px minmax(0, 1fr);
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
  .logo-box-extra_large {
    width: 136px;
    height: 136px;
    border-radius: 26px;
    padding: 10px;
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
    flex-wrap: wrap;
    justify-content: center;
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
  .cal-bye-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    flex-shrink: 0;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #37474f;
    color: #ffffff;
    --mdc-icon-size: 16px;
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
`;var Ka=["unknown","unavailable"];function _n(a,e,t=null){let o=a?.team_name||a?.name||"";if(t)return!!t(o);let n=C(o),s=C(e);return!n||!s?!1:W(n,s)}function Ya(a){return a==null||a===""?"-":a}function bn(a){if(a==null||a==="")return"-";let e=Number(a);return Number.isFinite(e)?e>0?`+${e}`:String(e):a}function yn(a){let e=Number(a);return a==null||a===""||!Number.isFinite(e)||e===0?"":e>0?"diff-pos":"diff-neg"}var xn={matches:[{key:"table_played",fb:"J",full:"table_played_full",fullFb:"Games played",get:a=>a.played},{key:"table_wins",fb:"G",full:"table_wins_full",fullFb:"Wins",get:a=>a.wins??a.won},{key:"table_losses",fb:"P",full:"table_losses_full",fullFb:"Losses",get:a=>a.losses??a.lost},{key:"table_draws",fb:"N",full:"table_draws_full",fullFb:"Draws",get:a=>a.draws}],singles:[{key:"table_irregularities",fb:"I",full:"table_irregularities_full",fullFb:"Irregularities",get:a=>a.irregularities},{key:"table_penalties",fb:"P\xE9n.",full:"table_penalties_full",fullFb:"Penalties",get:a=>a.total_penalties},{key:"table_forfeits",fb:"For.",full:"table_forfeits_full",fullFb:"Forfeits",get:a=>a.forfeits},{key:"table_defaults",fb:"D\xE9f.",full:"table_defaults_full",fullFb:"Defaults",get:a=>a.defaults}],penalties:[{key:"table_referee",fb:"Arb",full:"table_referee_full",fullFb:"Referee penalties",get:a=>a.referee_penalties},{key:"table_coach",fb:"Ent",full:"table_coach_full",fullFb:"Coach penalties",get:a=>a.coach_penalties}],points:[{key:"table_scored",fb:"M",full:"table_scored_full",fullFb:"Points scored",get:a=>a.points_for},{key:"table_conceded",fb:"E",full:"table_conceded_full",fullFb:"Points conceded",get:a=>a.points_against},{key:"table_diff",fb:"D",full:"table_diff_full",fullFb:"Points difference",get:a=>a.points_diff,signed:!0}]};function Pt(a,e=!0){return e?c`
    <img
      class="col-team-logo"
      src=${a||M}
      alt=""
      @error=${t=>{t.target.src.endsWith(M)||(t.target.src=M)}}
    />
  `:_}function wn(a){let e=String(a?.team_name??a?.name??"").trim().toLowerCase();return e==="n/a"||e==="exempt"}function zt(a,e){return wn(a)?e("card.exempt","Bye"):a?.team_name||a?.name||"-"}function Ft({rows:a,teamName:e,displayTeamName:t,t:o,showLogos:n=!0}){let s=fe((Array.isArray(a)?a:[]).map(u=>u?.team_name||u?.name||""),e),{matches:r,singles:i,penalties:l,points:h}=xn,p=u=>o(`card.${u.key}`,u.fb),f=u=>o(`card.${u.full}`,u.fullFb),m=u=>c`<th class="sub-head" scope="col"><abbr title=${f(u)}>${p(u)}</abbr></th>`,d=(u,g)=>{let A=u.get(g);return u.signed?c`<td class="num ${yn(A)}">${bn(A)}</td>`:c`<td class="num">${Ya(A)}</td>`};return c`
    <div class="standings-scroll">
      <table class="standings-table standings-table-detailed">
        <thead>
          <tr class="group-row">
            <th class="col-pos" rowspan="2" scope="col">#</th>
            <th class="col-team" rowspan="2" scope="col">${o("card.table_team","Team")}</th>
            <th class="single-head" rowspan="2" scope="col">${o("card.table_pts","Pts")}</th>
            <th class="group-head" colspan=${r.length} scope="colgroup">${o("card.table_group_matches","Games")}</th>
            ${i.map(u=>c`<th class="single-head" rowspan="2" scope="col" title=${f(u)}><abbr title=${f(u)}>${p(u)}</abbr></th>`)}
            <th class="group-head" colspan=${l.length} scope="colgroup">${o("card.table_group_penalties","Penalties")}</th>
            <th class="group-head" colspan=${h.length} scope="colgroup">${o("card.table_group_points","Points")}</th>
          </tr>
          <tr class="sub-row">
            ${r.map(m)}
            ${l.map(m)}
            ${h.map(m)}
          </tr>
        </thead>
        <tbody>
          ${a.map(u=>{let g=_n(u,e,s),A=g&&t?t:zt(u,o);return c`
              <tr class=${g?"highlight-row my-team-row":""}>
                <td class="pos-cell col-pos">${u.position||u.rank||"-"}</td>
                <td class="col-team">${Pt(u.logo_url,n)}<span>${A}</span></td>
                <td class="pts-cell">${Ya(u.points??u.pts)}</td>
                ${r.map(v=>d(v,u))}
                ${i.map(v=>d(v,u))}
                ${l.map(v=>d(v,u))}
                ${h.map(v=>d(v,u))}
              </tr>
            `})}
        </tbody>
      </table>
    </div>
  `}function Ja({standings:a,poule:e,competition:t,teamName:o,displayTeamName:n,accentColor:s,title:r,icon:i,compact:l,showLogos:h=!0,t:p}){let f=Ze(a),m=e&&!Ka.includes(e)?e:"",d=t&&!Ka.includes(t)?t:"",u=r||p("card.standings_title","Standings"),g=i!==void 0?i:"mdi:format-list-numbered";return c`
    <ha-card class="standings-card ${l?"standings-compact":""}" style="--ffbb-accent-color: ${s};">
      <div class="standings-card-header">
        ${g?c`<ha-icon icon=${g}></ha-icon>`:_}
        <span>${u}${m?` \u2022 ${m}`:""}</span>
      </div>
      ${d?c`<div class="standings-card-subtitle">${d}</div>`:_}
      <div class="standings-card-body">
        ${f.length>0?Ft({rows:f,teamName:o,displayTeamName:n,t:p,showLogos:h}):c`<div class="standings-empty-text">${p("card.no_standings","No standings data available.")}</div>`}
      </div>
    </ha-card>
  `}var Xa=Z`
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
`;var Bt=class extends B{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return Z`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=me("fr")}setConfig(e){this._config={entity:"",...De,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=et(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=me(t))}}_t(e,t=""){return tt(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!Ie(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_entityHelper(){let e=this._t("editor.entity_helper","Select any sensor belonging to the team"),t=String(this._config?.entity??"").trim(),o=this.hass?.states;if(!t||!o||Object.keys(o).length===0||Object.prototype.hasOwnProperty.call(o,t))return e;let n=this._t("editor.entity_missing",'"{entity}" no longer exists (probably renamed): select it again.').replace("{entity}",t),s=this._suggestEntity(t,o);if(!s)return`\u26A0 ${n}`;let r=this._t("editor.entity_suggestion","Suggestion: {entity}").replace("{entity}",s);return`\u26A0 ${n} ${r}`}_suggestEntity(e,t){let o=Ye(e,t,this.hass?.entities);return[o.poule,o.nextDate,...Object.values(o)].map(s=>s?.entity_id).find(s=>typeof s=="string"&&s.startsWith("sensor."))??""}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},o=["entity","custom_team_name","title","icon","custom_accent_color","standings_title"];for(let r of o)r in t||(t[r]="");let n={...this._config,...t},s=new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return c``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._entityHelper(),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),helper:this._t("editor.title_helper",'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix before that dynamic title.'),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team logo size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")},{value:"extra_large",label:this._t("editor.logo_size_extra_large","Extra Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}},{name:"show_calendar_logos",label:this._t("editor.show_calendar_logos","Team logos in the calendar rows"),default:!0,selector:{boolean:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}},{name:"standings_popup_detailed",label:this._t("editor.standings_popup_detailed","Detailed standings in popup"),helper:this._t("editor.standings_popup_detailed_helper","Show the full table (same columns as the secondary standings card) instead of the simple one."),default:!1,selector:{boolean:{}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}},{name:"standings_card",type:"expandable",title:this._t("editor.standings_card_section","Standalone standings card"),icon:"mdi:card-multiple-outline",flatten:!0,schema:[{name:"display_mode",label:this._t("editor.display_mode","Cards to display"),default:"match",selector:{select:{mode:"dropdown",options:[{value:"match",label:this._t("editor.display_mode_match","Match card only (default)")},{value:"standings",label:this._t("editor.display_mode_standings","Standings card only")},{value:"both",label:this._t("editor.display_mode_both","Match card + standings card")}]}}},...this._config.display_mode!=="match"?[{name:"standings_title",label:this._t("editor.standings_title","Standings card title"),helper:this._t("editor.standings_title_helper","Leave blank for the default title"),selector:{text:{}}},{name:"standings_icon",label:this._t("editor.standings_icon","Standings card icon"),selector:{icon:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]:[]]}];return c`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${Ne}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Bt);var Ut=class extends B{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=me("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...De}}getCardSize(){let e=this._config?this._resolveEntities():null;return Ua({config:this._config,standings:e?.rank?.attributes?.standings})}getGridOptions(){return{columns:12,min_columns:9,min_rows:3}}setConfig(e){if(!e||!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");let t={...De,...e},o=this._config;o&&((o.entity!==t.entity||o.default_match_view!==t.default_match_view)&&(this._matchIndex=null,this._manualView=null),(o.entity!==t.entity||Xe(t)==="standings")&&(this._activeModal=null)),this._config=t,this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,o=String(t??"").trim();e!=="custom"||!o||Ie(o)||this._warnedAccentColor!==o&&(this._warnedAccentColor=o,console.warn(`[FFBB Tracker Card] custom_accent_color "${o}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=et(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=me(t))}}_t(e,t=""){return tt(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none")return"";let o=String(e).trim().match(/^(\d+)/);if(!o)return"";let n=parseInt(o[1],10);return n===1?"rank-gold":n===2?"rank-silver":n===3?"rank-bronze":""}_resolveEntities(){return Ye(this._config.entity,this.hass?.states,this.hass?.entities)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:Ha(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:o}=this._localeInfo();return It(e,t,{hour12:o})}_openMaps(e,t,o=""){let n=encodeURIComponent(o?.trim()||`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${n}`,"_blank","noreferrer")}_openCalendar(e,t,o,n,s,r=""){if(!e||e==="unknown"||e==="unavailable")return;let i=new Date(e);if(isNaN(i.getTime()))return;let l=new Date(i.getTime()+7200*1e3),h=u=>u.toISOString().replace(/[-:]|\.\d{3}/g,""),p=`${t} vs ${o}`,f=r?.trim()||`${n} ${s}`.trim(),m=this._t("card.calendar_details","FFBB match: {home} vs {away}").replace(/\{(home|away)\}/g,(u,g)=>g==="home"?t:o),d=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(p)}&dates=${h(i)}/${h(l)}&details=${encodeURIComponent(m)}&location=${encodeURIComponent(f)}`;window.open(d,"_blank","noreferrer")}_handleLogoClick(e,t,o){let n=this._config.logo_click_action||"team_url";n==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${o}".`),e&&this._fireMoreInfo(e)):n==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let o=this._modalTrigger;this._modalTrigger=null,o&&o.isConnected&&typeof o.focus=="function"&&o.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let o=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(o.length===0){e.preventDefault(),t.focus();return}let n=o[0],s=o[o.length-1],r=this.shadowRoot?.activeElement;e.shiftKey&&(r===n||r===t)?(e.preventDefault(),s.focus()):!e.shiftKey&&r===s&&(e.preventDefault(),n.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let o=e==="prev"?t.chevronPrevIndex:t.chevronNextIndex;if(Number.isInteger(o)&&o>=0&&o<t.calendarMatches.length){this._matchIndex=o;let n=t.calendarMatches[o];this._manualView=n.is_played||n.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,t){this._matchIndex=e,this._manualView=t?"last":"next",this._closeModal()}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return Nt(e,t)}_renderScoreParts(e){let t=c`<span class="score-mine">${e.my}</span>`,o=c`<span class="score-theirs">${e.opponent}</span>`,n=c`<span class="score-sep"> - </span>`;return e.mineFirst===!1?c`${o}${n}${t}`:c`${t}${n}${o}`}_renderModal(e,t,o,n){if(!this._activeModal)return c``;if(this._activeModal==="standings"){let s=e.rank?.attributes?.standings||[],r=Ze(s),i=e.poule?.attributes?.competition||"",l=Re(e.poule?.state),h=r.map(d=>d.team_name||d.name||""),p=fe(h,t),f=fe(h,o),m=!!this._config?.standings_popup_detailed;return c`
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
            @click=${d=>d.stopPropagation()}
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
                  `:m?Ft({rows:r,teamName:t,displayTeamName:n,t:(d,u)=>this._t(d,u),showLogos:this._config.show_standings_logos!==!1}):c`
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
                        ${r.map(d=>{let u=d.team_name||d.name||"",g=p(u),A=g||f(u),v=g&&n?n:zt(d,(z,R)=>this._t(z,R));return c`
                            <tr class=${[A?"highlight-row":"",g?"my-team-row":""].filter(Boolean).join(" ")}>
                              <td class="pos-cell">${d.position||d.rank||"-"}</td>
                              <td class="col-team">${Pt(d.logo_url,this._config.show_standings_logos!==!1)}<span>${v}</span></td>
                              <td class="pts-cell">${d.points??d.pts??"-"}</td>
                              <td>${d.played??"-"}</td>
                              <td>${d.wins??d.won??"-"}</td>
                              <td>${d.losses??d.lost??"-"}</td>
                              <td>${d.draws??"0"}</td>
                            </tr>
                          `})}
                      </tbody>
                    </table>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="form"){let s=e.form?.state,r=s&&s!=="unknown"&&s!=="unavailable",i=r?s:"",l=this.hass?.config?.language||"",h={win:this._t("card.form_letter_win","W"),loss:this._t("card.form_letter_loss","L"),draw:this._t("card.form_letter_draw","D")},p=r?We(e.form?.attributes?.current_streak||"",l,h):"",f=i.split("-").filter(Boolean);return c`
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
            @click=${m=>m.stopPropagation()}
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
              ${f.length>0?c`
                    <div class="form-badges-container">
                      ${f.map(m=>{let d=za(m,l),u=`badge-${d}`,g=this._t(`card.${d}`,d),A=qe(m,l,h);return c`
                          <div class="form-badge-pill ${u}">
                            <span class="pill-char">${A}</span>
                            <span class="pill-label">${g}</span>
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
      `}if(this._activeModal==="calendar"){let s=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",i=Re(e.poule?.state),l=s.flatMap(g=>[g.home_team||"",g.away_team||""]),h=fe(l,t),p=new Date,f=Lt(e),m=Rt(s,p,f),d=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||M,u=e.rank?.attributes?.standings;return c`
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
            @click=${g=>g.stopPropagation()}
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
                      ${s.map((g,A)=>{let v=g.home_team||"-",z=g.away_team||"-",R=!!g.is_exempt,O=R?"":g.score||(g.home_score!==void 0?`${g.home_score} - ${g.away_score}`:""),y=this._formatDate(g.date||g.datetime),{isHomeMyTeam:x,isAwayMyTeam:$}=Fa(g,h),E=x||$,F=!!(g.is_played||O),L=null;R&&(x!==$?L=x?"away":"home":typeof g.is_home=="boolean"?L=g.is_home?"away":"home":L=/^exempt/i.test(v)?"home":"away");let I=this._t("card.exempt","Bye"),ne=L==="home"?I:v,K=L==="away"?I:z,se=A===m,re=Je(g,p,f),T=Qe({teamName:ne,matchLogo:g.home_logo||g.home_team_logo,isMyTeam:x,myTeamLogo:d,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:u}),Ht=Qe({teamName:K,matchLogo:g.away_logo||g.away_team_logo,isMyTeam:$,myTeamLogo:d,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:u}),b="";return R?b="":x?b="home":$&&(b="away"),c`
                          <div
                            class="calendar-row ${E?"highlight-row":""} ${se?"next-match-row":""} ${R?"bye-row":""}"
                            @click=${()=>this._selectCalendarMatch(A,F)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(A,F))}
                            role="button"
                            tabindex="0"
                            aria-label="${x&&n?n:ne} vs ${$&&n?n:K}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${g.round||"-"}</span>
                              ${b?c`<span class="cal-venue-pill ${b==="home"?"pill-dom":"pill-ext"}">${b==="home"?this._t("card.home_short","HOME"):this._t("card.away_short","AWAY")}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1&&L==="home"?c`<span class="cal-bye-icon" aria-hidden="true"><ha-icon icon="mdi:pause-circle-outline"></ha-icon></span>`:this._config.show_calendar_logos!==!1?c`
                                      <img
                                        class="cal-mini-logo"
                                        src=${T}
                                        alt=""
                                        @error=${S=>{S.target.src.endsWith(M)||(S.target.src=M)}}
                                      />
                                    `:_}
                                <span class="cal-team ${x?"my-team-text":""} ${L==="home"?"bye-text":""}">${x&&n?n:ne}</span>
                              </div>
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1&&L==="away"?c`<span class="cal-bye-icon" aria-hidden="true"><ha-icon icon="mdi:pause-circle-outline"></ha-icon></span>`:this._config.show_calendar_logos!==!1?c`
                                      <img
                                        class="cal-mini-logo"
                                        src=${Ht}
                                        alt=""
                                        @error=${S=>{S.target.src.endsWith(M)||(S.target.src=M)}}
                                      />
                                    `:_}
                                <span class="cal-team ${$?"my-team-text":""} ${L==="away"?"bye-text":""}">${$&&n?n:K}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${O?c`
                                    ${y?c`<div class="cal-date">${y.day}</div>`:_}
                                    <div class="cal-score">
                                      ${(()=>{let S=E?Ot(O,x):null;return S?this._renderScoreParts(S):O})()}
                                    </div>
                                  `:y?c`
                                    <div class="cal-date">${y.day}</div>
                                    ${re?c`<div class="cal-pending" title=${this._t("card.result_pending","Result pending")}>${this._t("card.result_pending_short","Pending")}</div>`:c`<div class="cal-time">${R?"-":y.time}</div>`}
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
      `}return c``}_computeViewModel(e){let{language:t,hour12:o}=this._localeInfo();return Va({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:o,t:(n,s)=>this._t(n,s),instanceLanguage:this.hass?.config?.language||"",isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return c``;let e=this._resolveEntities();if(!e)return c`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let t=this._computeViewModel(e);return c`
      ${t.displayMode!=="standings"?c`
            <ha-card style="--ffbb-accent-color: ${t.accentColor};">
              ${this._renderHeader(t)}

              <div class="container">
                ${this._renderWatermark(t)}
                ${this._renderMatchHeader(t)}
                ${this._renderMatchArea(t)}
                ${this._renderFooter(t)}
              </div>

              ${this._renderModal(e,t.searchTeamName,t.opponentSearchName,t.configuredTeamName)}
            </ha-card>
          `:_}

      ${t.displayMode!=="match"?Ja({standings:e.rank?.attributes?.standings,poule:e.poule?.state,competition:e.poule?.attributes?.competition,teamName:t.searchTeamName,displayTeamName:t.configuredTeamName,accentColor:t.accentColor,title:t.standingsTitle,icon:t.standingsIcon,compact:t.displayMode==="both",showLogos:this._config.show_standings_logos!==!1,t:(o,n)=>this._t(o,n)}):_}
    `}_renderHeader(e){let{showTitle:t,titleText:o,titleIcon:n}=e;return c`
      ${t&&(o||n)?c`
            <div class="card-header">
              ${n?c`<ha-icon .icon=${n}></ha-icon>`:""}
              ${o?c`<span class="card-header-title">${o}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:t,rightLogo:o}=e;return c`
      ${this._config.show_watermark?c`
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
              src=${o}
              alt=""
              aria-hidden="true"
              @error=${n=>n.target.style.display="none"}
              @load=${n=>n.target.style.display=""}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:t,pouleName:o,roundNumber:n}=e;return c`
      ${this._config.show_header?c`
            <div class="header">
              ${t||o?c`
                    <div class="header-main">
                      <span class="competition">${t}</span>
                      ${o?c`<span class="poule">${t?"\u2022 ":""}${o}</span>`:""}
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
    `}_renderMatchArea(e){let{isLive:t,canToggleView:o,isPostMatch:n,isGameDay:s,leftName:r,rightName:i,leftLogo:l,rightLogo:h,leftUrl:p,rightUrl:f,leftEntityId:m,rightEntityId:d,gymName:u,gymCity:g,gymAddress:A,dateFormatted:v,logoSizeClass:z,showRank:R,leftRank:O,rightRank:y,isCalendarClickable:x,isLogoClickable:$,hasStandingsData:E}=e,L=this._config?.rank_badge_style==="solid"?"rank-solid":"";return c`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${z} ${$?"clickable":""}"
            @click=${()=>this._handleLogoClick(m,p,r)}
            @keydown=${$?this._onKeyActivate(()=>this._handleLogoClick(m,p,r)):_}
            role=${$?"button":_}
            tabindex=${$?"0":_}
            aria-label=${$?this._t("card.view_team","View {team}").replace("{team}",r):_}
          >
            <img
              class="logo"
              src=${l}
              alt=""
              @error=${I=>{I.target.src.endsWith(M)||(I.target.src=M)}}
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
                  tabindex="0"
                  aria-label=${this._t("card.view_last_match","Show last played match")}
                  title=${this._t("card.view_last_match","Show last played match")}
                ></ha-icon>
              `:""}

          <div
            class="center-meta ${x?"clickable":""}"
            @click=${()=>{x&&this._openCalendar(e.targetDateStr,r,i,u,g,A)}}
            @keydown=${x?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,r,i,u,g,A)):_}
            role=${x?"button":_}
            tabindex=${x?"0":_}
            aria-label=${x?this._t("card.add_to_calendar","Add to Google Calendar"):_}
            title=${x?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${t?c`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${v?`${this._t("card.kickoff","Kick-off")} ${v.time}`:""}
                  </div>
                `:n?c`
                  ${v?c`<div class="match-day">${v.weekday} ${v.day}</div>`:""}
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
                  ${v?c`
                        <div class="match-day">${v.weekday} ${v.day}</div>
                        <div class="match-main">
                          <div class="match-time">${e.isExempt?"-":v.time}</div>
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
                  tabindex="0"
                  aria-label=${this._t("card.view_next_match","Show upcoming match")}
                  title=${this._t("card.view_next_match","Show upcoming match")}
                ></ha-icon>
              `:""}
        </div>

        <div class="team-logo-cell cell-right">
          <div
            class="logo-box ${z} ${$?"clickable":""}"
            @click=${()=>this._handleLogoClick(d,f,i)}
            @keydown=${$?this._onKeyActivate(()=>this._handleLogoClick(d,f,i)):_}
            role=${$?"button":_}
            tabindex=${$?"0":_}
            aria-label=${$?this._t("card.view_team","View {team}").replace("{team}",i):_}
          >
            <img
              class="logo"
              src=${h}
              alt=""
              @error=${I=>{I.target.src.endsWith(M)||(I.target.src=M)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${r}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${i}</div>
        </div>

        ${R&&(O||y)?c`
              <div class="team-rank-cell rank-left">
                ${O?c`
                      <span
                        class="rank-badge ${this._getRankClass(O)} ${L} ${E?"clickable-badge":""}"
                        @click=${()=>{E&&this._openModal("standings")}}
                        @keydown=${E?this._onKeyActivate(()=>this._openModal("standings")):_}
                        role=${E?"button":_}
                        tabindex=${E?"0":_}
                        aria-label=${E?this._t("card.view_standings","View league standings"):_}
                        title=${E?this._t("card.view_standings","View league standings"):""}
                      >${O}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${y?c`
                      <span
                        class="rank-badge ${this._getRankClass(y)} ${L} ${E?"clickable-badge":""}"
                        @click=${()=>{E&&this._openModal("standings")}}
                        @keydown=${E?this._onKeyActivate(()=>this._openModal("standings")):_}
                        role=${E?"button":_}
                        tabindex=${E?"0":_}
                        aria-label=${E?this._t("card.view_standings","View league standings"):_}
                        title=${E?this._t("card.view_standings","View league standings"):""}
                      >${y}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:o,gymAddress:n,hasValidForm:s,isPreview:r,displayFormSequence:i,displayFormStreak:l,showFormBlock:h,reserveVenueRow:p}=e;return c`
      ${h?c`
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

      ${this._config.show_venue&&(t||o)?c`
            <div
              class="footer-venue clickable"
              @click=${()=>this._openMaps(t,o,n)}
              @keydown=${this._onKeyActivate(()=>this._openMaps(t,o,n))}
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
          `:this._config.show_venue&&p?c`
              <div class="footer-venue footer-venue-empty" aria-hidden="true">
                <div class="venue-info">
                  <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                  <span class="venue-text">&nbsp;</span>
                </div>
              </div>
            `:""}
    `}static get styles(){return[Wa,Xa]}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Ut);console.info(`%c FFBB Tracker Card %c v${Ne} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var Za=window.customCards.findIndex(a=>a.type==="ffbb-tracker-card"),Qa={type:"ffbb-tracker-card",name:`FFBB Tracker v${Ne}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};Za!==-1?window.customCards[Za]=Qa:window.customCards.push(Qa);
