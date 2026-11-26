var Ue=globalThis,He=Ue.ShadowRoot&&(Ue.ShadyCSS===void 0||Ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),ia=new WeakMap,ve=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(He&&e===void 0){let o=t!==void 0&&t.length===1;o&&(e=ia.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&ia.set(t,e))}return e}toString(){return this.cssText}},la=a=>new ve(typeof a=="string"?a:a+"",void 0,ft),X=(a,...e)=>{let t=a.length===1?a[0]:e.reduce((o,n,s)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+a[s+1],a[0]);return new ve(t,a,ft)},ca=(a,e)=>{if(He)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let o=document.createElement("style"),n=Ue.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=t.cssText,a.appendChild(o)}},mt=He?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(let o of e.cssRules)t+=o.cssText;return la(t)})(a):a;var{is:Oo,defineProperty:Lo,getOwnPropertyDescriptor:Ro,getOwnPropertyNames:Io,getOwnPropertySymbols:Po,getPrototypeOf:zo}=Object,q=globalThis,da=q.trustedTypes,Fo=da?da.emptyScript:"",Bo=q.reactiveElementPolyfillSupport,$e=(a,e)=>a,gt={toAttribute(a,e){switch(e){case Boolean:a=a?Fo:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ua=(a,e)=>!Oo(a,e),ha={attribute:!0,type:String,converter:gt,reflect:!1,useDefault:!1,hasChanged:ua};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),q.litPropertyMetadata??(q.litPropertyMetadata=new WeakMap);var U=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ha){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let o=Symbol(),n=this.getPropertyDescriptor(e,o,t);n!==void 0&&Lo(this.prototype,e,n)}}static getPropertyDescriptor(e,t,o){let{get:n,set:s}=Ro(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){let i=n?.call(this);s?.call(this,r),this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ha}static _$Ei(){if(this.hasOwnProperty($e("elementProperties")))return;let e=zo(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($e("properties"))){let t=this.properties,o=[...Io(t),...Po(t)];for(let n of o)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[o,n]of t)this.elementProperties.set(o,n)}this._$Eh=new Map;for(let[t,o]of this.elementProperties){let n=this._$Eu(t,o);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let n of o)t.unshift(mt(n))}else e!==void 0&&t.push(mt(e));return t}static _$Eu(e,t){let o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ca(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){let o=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,o);if(n!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:gt).toAttribute(t,o.type);this._$Em=e,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){let o=this.constructor,n=o._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let s=o.getPropertyOptions(n),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:gt;this._$Em=n;let i=r.fromAttribute(t,s.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(e,t,o,n=!1,s){if(e!==void 0){let r=this.constructor;if(n===!1&&(s=this[e]),o??(o=r.getPropertyOptions(e)),!((o.hasChanged??ua)(s,t)||o.useDefault&&o.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:n,wrapped:s},r){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[n,s]of o){let{wrapped:r}=s,i=this[n];r!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,s,i)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[$e("elementProperties")]=new Map,U[$e("finalized")]=new Map,Bo?.({ReactiveElement:U}),(q.reactiveElementVersions??(q.reactiveElementVersions=[])).push("2.1.2");var Se=globalThis,pa=a=>a,Ve=Se.trustedTypes,fa=Ve?Ve.createPolicy("lit-html",{createHTML:a=>a}):void 0,xa="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,wa="?"+G,Uo=`<${wa}>`,ee=document,Ae=()=>ee.createComment(""),Ce=a=>a===null||typeof a!="object"&&typeof a!="function",$t=Array.isArray,Ho=a=>$t(a)||typeof a?.[Symbol.iterator]=="function",_t=`[ 	
\f\r]`,ke=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ma=/-->/g,ga=/>/g,Z=RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_a=/'/g,ba=/"/g,va=/^(?:script|style|textarea|title)$/i,kt=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),d=kt(1),kn=kt(2),Sn=kt(3),te=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ya=new WeakMap,Q=ee.createTreeWalker(ee,129);function $a(a,e){if(!$t(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return fa!==void 0?fa.createHTML(e):e}var Vo=(a,e)=>{let t=a.length-1,o=[],n,s=e===2?"<svg>":e===3?"<math>":"",r=ke;for(let i=0;i<t;i++){let l=a[i],h,u,p=-1,f=0;for(;f<l.length&&(r.lastIndex=f,u=r.exec(l),u!==null);)f=r.lastIndex,r===ke?u[1]==="!--"?r=ma:u[1]!==void 0?r=ga:u[2]!==void 0?(va.test(u[2])&&(n=RegExp("</"+u[2],"g")),r=Z):u[3]!==void 0&&(r=Z):r===Z?u[0]===">"?(r=n??ke,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?Z:u[3]==='"'?ba:_a):r===ba||r===_a?r=Z:r===ma||r===ga?r=ke:(r=Z,n=void 0);let c=r===Z&&a[i+1].startsWith("/>")?" ":"";s+=r===ke?l+Uo:p>=0?(o.push(h),l.slice(0,p)+xa+l.slice(p)+G+c):l+G+(p===-2?i:c)}return[$a(a,s+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},Ee=class a{constructor({strings:e,_$litType$:t},o){let n;this.parts=[];let s=0,r=0,i=e.length-1,l=this.parts,[h,u]=Vo(e,t);if(this.el=a.createElement(h,o),Q.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(n=Q.nextNode())!==null&&l.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(let p of n.getAttributeNames())if(p.endsWith(xa)){let f=u[r++],c=n.getAttribute(p).split(G),b=/([.?@])?(.*)/.exec(f);l.push({type:1,index:s,name:b[2],strings:c,ctor:b[1]==="."?yt:b[1]==="?"?xt:b[1]==="@"?wt:he}),n.removeAttribute(p)}else p.startsWith(G)&&(l.push({type:6,index:s}),n.removeAttribute(p));if(va.test(n.tagName)){let p=n.textContent.split(G),f=p.length-1;if(f>0){n.textContent=Ve?Ve.emptyScript:"";for(let c=0;c<f;c++)n.append(p[c],Ae()),Q.nextNode(),l.push({type:2,index:++s});n.append(p[f],Ae())}}}else if(n.nodeType===8)if(n.data===wa)l.push({type:2,index:s});else{let p=-1;for(;(p=n.data.indexOf(G,p+1))!==-1;)l.push({type:7,index:s}),p+=G.length-1}s++}}static createElement(e,t){let o=ee.createElement("template");return o.innerHTML=e,o}};function de(a,e,t=a,o){if(e===te)return e;let n=o!==void 0?t._$Co?.[o]:t._$Cl,s=Ce(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(a),n._$AT(a,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=n:t._$Cl=n),n!==void 0&&(e=de(a,n._$AS(a,e.values),n,o)),e}var bt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:o}=this._$AD,n=(e?.creationScope??ee).importNode(t,!0);Q.currentNode=n;let s=Q.nextNode(),r=0,i=0,l=o[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new Me(s,s.nextSibling,this,e):l.type===1?h=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(h=new vt(s,this,e)),this._$AV.push(h),l=o[++i]}r!==l?.index&&(s=Q.nextNode(),r++)}return Q.currentNode=ee,n}p(e){let t=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}},Me=class a{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,n){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=de(this,e,t),Ce(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==te&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ho(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&Ce(this._$AH)?this._$AA.nextSibling.data=e:this.T(ee.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:o}=e,n=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Ee.createElement($a(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(t);else{let s=new bt(n,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=ya.get(e.strings);return t===void 0&&ya.set(e.strings,t=new Ee(e)),t}k(e){$t(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,o,n=0;for(let s of e)n===t.length?t.push(o=new a(this.O(Ae()),this.O(Ae()),this,this.options)):o=t[n],o._$AI(s),n++;n<t.length&&(this._$AR(o&&o._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let o=pa(e).nextSibling;pa(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},he=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,n,s){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=g}_$AI(e,t=this,o,n){let s=this.strings,r=!1;if(s===void 0)e=de(this,e,t,0),r=!Ce(e)||e!==this._$AH&&e!==te,r&&(this._$AH=e);else{let i=e,l,h;for(e=s[0],l=0;l<s.length-1;l++)h=de(this,i[o+l],t,l),h===te&&(h=this._$AH[l]),r||(r=!Ce(h)||h!==this._$AH[l]),h===g?e=g:e!==g&&(e+=(h??"")+s[l+1]),this._$AH[l]=h}r&&!n&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},yt=class extends he{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},xt=class extends he{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},wt=class extends he{constructor(e,t,o,n,s){super(e,t,o,n,s),this.type=5}_$AI(e,t=this){if((e=de(this,e,t,0)??g)===te)return;let o=this._$AH,n=e===g&&o!==g||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==g&&(o===g||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vt=class{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){de(this,e)}};var jo=Se.litHtmlPolyfillSupport;jo?.(Ee,Me),(Se.litHtmlVersions??(Se.litHtmlVersions=[])).push("3.3.3");var ka=(a,e,t)=>{let o=t?.renderBefore??e,n=o._$litPart$;if(n===void 0){let s=t?.renderBefore??null;o._$litPart$=n=new Me(e.insertBefore(Ae(),s),s,void 0,t??{})}return n._$AI(a),n};var Ne=globalThis,B=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ka(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return te}};B._$litElement$=!0,B.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:B});var qo=Ne.litElementPolyfillSupport;qo?.({LitElement:B});(Ne.litElementVersions??(Ne.litElementVersions=[])).push("4.2.2");var Te="0.6.23";var De={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",display_mode:"match",standings_title:"",standings_icon:"mdi:format-list-numbered",standings_popup_detailed:!1,show_form:!0,show_venue:!0,show_watermark:!0,show_calendar_logos:!0,show_standings_logos:!0};var Sa={nextOpponent:["prochain_match_adversaire","next_match_opponent"],nextDate:["prochain_match_date","next_match_date"],nextLocation:["prochain_match_lieu","next_match_location"],nextVenue:["prochain_match_terrain","next_match_venue","next_match_venue_type"],lastScore:["dernier_match_score","last_match_score"],lastOpponent:["dernier_match_adversaire","last_match_opponent"],lastResult:["dernier_match_resultat","last_match_result"],lastDate:["dernier_match_date","last_match_date"],poule:["poule","pool"],rank:["classement","rank"],rankEvolution:["classement_evolution","rank_evolution"],form:["forme_recente","recent_form","form"]},Aa={matchInProgress:["match_en_cours","match_in_progress"]},St=["prochain_match","next_match","dernier_match","last_match","classement","rank","poule","pool","forme_recente","recent_form","form","game_day","jour_de_match","match_en_cours","match_in_progress"],Bn=new RegExp(`^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${St.join("|")})`),At="ffbb_tracker",Go={nextOpponent:"next_match_opponent",nextDate:"next_match_date",nextLocation:"next_match_location",nextVenue:"next_match_venue_type",lastScore:"last_match_score",lastOpponent:"last_match_opponent",lastResult:"last_match_result",lastDate:"last_match_date",poule:"poule",rank:"rank",rankEvolution:"rank_evolution",form:"form",matchInProgress:"match_in_progress"},Ca=new Map(Object.entries(Go).map(([a,e])=>[e,a]));var Wo=["win","loss","draw"],M="/local/community/ha-ffbb-tracker-card/brand/icon.png";function A(a){return(a||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function pe(a,e){if(!a||!e)return!1;if(a===e)return!0;let[t,o]=a.length<=e.length?[a,e]:[e,a];if(!o.includes(t))return!1;let n=o.replace(t,""),s=/(^|\D)1$/.test(n)?n.slice(0,-1):n;return!/\d/.test(s)}var Ea={fr:{win:"V",loss:"D",draw:"N"},en:{win:"W",loss:"L",draw:"D"}};function Et(a,e){let t=String(a??"").trim().toUpperCase();if(!t)return null;if(e){let o=Ea[e]||Ea.en,n=Object.keys(o).find(s=>o[s]===t);if(n)return n}return t==="V"||t==="W"?"win":t==="L"?"loss":t==="N"?"draw":t==="D"?e?null:"loss":null}function Ra(a,e){return Et(a,e)??"draw"}function je(a,e,t){return!e||typeof a!="string"||!t?a:a.split("-").map(o=>{let n=Et(o,e);return n&&t[n]||o}).join("-")}function qe(a,e,t){if(!e||typeof a!="string"||!t)return a;let o=/^(\d+)\s*([A-Za-z])$/.exec(a.trim());if(!o)return a;let n=Et(o[2],e);return n?`${o[1]}${t[n]||o[2]}`:a}function Ia(a,e){return typeof a?.is_home=="boolean"?{isHomeMyTeam:a.is_home,isAwayMyTeam:!a.is_home}:{isHomeMyTeam:!!e(a?.home_team||""),isAwayMyTeam:!!e(a?.away_team||"")}}function We(a,e,t=null){if(!a||!e)return null;let o=Jo(a,e),n=Ko(a,e,t);if(!n)return o;let s={};for(let r of Object.keys(o))s[r]=n[r]??o[r];return s}function Ko(a,e,t){let o=t?.[a];if(!o?.device_id||o.platform&&o.platform!==At)return null;let n={},s=!1;for(let[r,i]of Object.entries(t)){if(i?.device_id!==o.device_id||i.platform&&i.platform!==At)continue;let l=Ca.get(i.translation_key);l&&e[r]&&(n[l]=e[r],s=!0)}return s?n:null}function Yo(a,e,t){let o=s=>{for(let r of s)if(t[r])return t[r];return null},n={};for(let[s,r]of Object.entries(Sa))n[s]=o(r.map(i=>`${a}${i}`));for(let[s,r]of Object.entries(Aa))n[s]=o(r.map(i=>`${e}${i}`));return n}function Jo(a,e){let t=a.slice(a.indexOf(".")+1),o=[];for(let r=1;r<t.length;r++)if(t[r]==="_"&&St.some(i=>t.startsWith(i,r+1))){let i=t.slice(0,r);o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}if(o.length===0){let r=a.substring(0,a.lastIndexOf("_")+1);o.push([r,r.replace("sensor.","binary_sensor.")])}let n=null,s=-1;for(let[r,i]of o){let l=Yo(r,i,e),h=Object.values(l).filter(Boolean).length;h>s&&(n=l,s=h)}return n}function Ke(a,e){let t=A(e||"");if(!t)return()=>!1;let o=(Array.isArray(a)?a:[]).some(n=>{let s=A(n||"");return!!s&&s===t});return n=>{let s=A(n||"");return s?o?s===t:pe(s,t):!1}}function Ma(a){return!a||typeof a!="string"?null:a.trim().split(/[?#]/)[0].replace(/\/+$/,"").toLowerCase()||null}function Xo(a,e,{opponentUrl:t=null}={}){if(Array.isArray(e)&&t){let s=Ma(t),r=s?e.find(i=>i?[i.team_url,i.url,i.link].some(l=>Ma(l)===s):!1):null;if(r)return r.position}if(!a||!Array.isArray(e))return null;let o=A(a);if(!o)return null;let n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name,i=A(r);return!!(i&&i===o)});if(n||(n=e.find(s=>{if(!s)return!1;let r=s.team_name||s.name,i=A(r);return pe(i,o)})),!n){let s=o.replace(/\d+$/,"");if(s&&s!==o){let r=e.filter(i=>{if(!i)return!1;let l=A(i.team_name||i.name);return!!l&&l.startsWith(s)});r.length===1&&A(r[0].team_name||r[0].name)===s&&(n=r[0])}}return n?n.position:null}function ue(a,e){if(a==null||a===""||isNaN(Number(a)))return null;let t=parseInt(a,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let o=t%10,n=t%100;return o===1&&n!==11?`${t}st`:o===2&&n!==12?`${t}nd`:o===3&&n!==13?`${t}rd`:`${t}th`}function Mt(a,e){if(typeof a!="string")return null;let t=a.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);if(!t)return null;let[,o,n]=t;return e?{my:o,opponent:n,mineFirst:!0}:{my:n,opponent:o,mineFirst:!1}}function Zo(a,e,t){let o=r=>/^\d+$/.test(String(r??"").trim())?Number(r):null,n=o(e?.team_score),s=o(e?.opponent_score);if(n===null||s===null){let r=typeof a=="string"?a.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/):null;if(!r)return a;n=Number(r[1]),s=Number(r[2])}return t?`${n} - ${s}`:`${s} - ${n}`}function Ge(a,e,t){if(!Array.isArray(e))return null;let o=A(a);if(!o)return null;let n=e.find(s=>{let r=A(s?.team_name||s?.name||"");return!!(r&&r===o)});if(n||(n=e.find(s=>{let r=A(s?.team_name||s?.name||"");return pe(r,o)})),!n)return null;for(let s of t)if(n[s]){let r=O(n[s]);if(r)return r}return null}function Qo(a){if(!Array.isArray(a)||a.length<2)return a;let e=a.map(t=>{let o=parseInt(String(t?.round??"").trim(),10);return Number.isFinite(o)?o:null});return e.some(t=>t===null)||new Set(e).size!==e.length?a:a.map((t,o)=>({m:t,r:e[o]})).sort((t,o)=>t.r-o.r).map(t=>t.m)}function Nt(a,e){return Qo(en(a,e))}function en(a,e){let t=a?.poule?.attributes?.calendar||a?.poule?.attributes?.matches||a?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let o=a?.nextDate?.attributes?.calendar||a?.nextDate?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let n=a?.rank?.attributes?.calendar||a?.rank?.attributes?.matches;if(Array.isArray(n)&&n.length>0)return n;let s=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(s)&&s.length>0?s:[]}function O(a){if(!a||typeof a!="string")return null;let e=a.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function Na(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Pa(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(o);n.setDate(n.getDate()+2);let s=e.getTime();return s>=t.getTime()&&s<n.getTime()}function tn(a,e=new Date){if(!a||a==="unknown"||a==="unavailable")return!1;let t=new Date(a);if(isNaN(t.getTime()))return!1;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=new Date(o);return n.setDate(n.getDate()-1),e.getTime()>=n.getTime()}var Tt=3;function Dt(a){let e=Number(a?.nextDate?.attributes?.result_grace_hours);return Number.isFinite(e)&&e>0?e:Tt}var Oe=a=>!!(a&&(a.is_played||a.score)),ae=a=>Date.parse(a?.date??a?.datetime);function Ye(a,e=new Date,t=Tt){if(!a||a.is_exempt||Oe(a))return!1;let o=ae(a);return Number.isNaN(o)?!1:e.getTime()-o>t*36e5}function Ta(a,e=new Date){if(!Array.isArray(a))return-1;for(let t=a.length-1;t>=0;t--){let o=a[t];if(o&&!Oe(o)&&o.date&&Pa(o.date,e))return t}return-1}function an(a){if(!Array.isArray(a))return-1;let e=-1,t=-1/0;for(let o=0;o<a.length;o++){if(!Oe(a[o]))continue;let n=ae(a[o]),s=Number.isFinite(n)?n:-1/0;(e===-1||s>=t)&&(e=o,t=s)}return e}function Ot(a,e=new Date,t=Tt){if(!Array.isArray(a))return-1;let o=r=>!!r?.is_exempt,n=r=>{let i=-1,l=1/0;return a.forEach((h,u)=>{if(!r(h))return;let p=ae(h),f=Number.isFinite(p)?p:1/0;(i===-1||f<l)&&(i=u,l=f)}),i},s=n(r=>!o(r)&&!Oe(r)&&!Ye(r,e,t));return s!==-1?s:n(r=>!o(r)&&!Oe(r))}function Da(a,e,t){if(!Array.isArray(a)||!Number.isInteger(e)||e<0||e>=a.length)return-1;let o=a.map((i,l)=>l),n=o.filter(i=>Number.isFinite(ae(a[i]))),s=[...n].sort((i,l)=>ae(a[i])-ae(a[l])||i-l);n.forEach((i,l)=>{o[i]=s[l]});let r=o.indexOf(e)+(t==="prev"?-1:1);return r>=0&&r<o.length?o[r]:-1}function on(a,{matchNumber:e,dateStr:t}={}){if(!Array.isArray(a))return-1;let o=String(e??"").trim();if(o){let s=a.findIndex(r=>String(r?.match_number??"").trim()===o);if(s!==-1)return s}let n=Date.parse(t);return Number.isNaN(n)?-1:a.findIndex(s=>ae(s)===n)}function nn({defaultView:a="auto",manualView:e=null,isLive:t=!1,lastDate:o=null,hasLastScore:n=!1,hasLastMatch:s=!0,nextDate:r=null,hasNextMatch:i=!1,nextIsStale:l=!1,now:h=new Date}={}){return t||!s?!1:e!==null?e==="last":a==="next"?!1:a==="last"?!(!n||i&&!l&&tn(r,h)):!!(n&&(l||Pa(o,h)))}var sn=["match","standings","both"];function za(a){return sn.includes(a?.display_mode)?a.display_mode:"match"}var Oa=3,rn=3,ln=2;function La(a){let e=Number.isFinite(a)&&a>0?a:0;return rn+Math.ceil(e/ln)}function Fa({config:a,standings:e}={}){let t=za(a),o=Array.isArray(e)?e.length:0;return t==="match"?Oa:t==="standings"?La(o):Oa+La(o)}function Je(a){return Array.isArray(a)?[...a].sort((e,t)=>{let o=n=>{let s=parseInt(n?.position??n?.rank,10);return isNaN(s)?999:s};return o(e)-o(t)}):[]}function cn(a,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(a,e):null}var dn=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function Le(a,e=cn){if(typeof a!="string")return!1;let t=a.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let o=e("color",t);return typeof o=="boolean"?o:dn.test(t)}function hn(a){let e=a?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&Le(a?.custom_accent_color)?a.custom_accent_color.trim():"#ff6b00"}function Ba(a,e){if(a==="12"||a==="am_pm")return!0;if(a==="24"||a==="twenty_four")return!1;let t=a==="system"?void 0:e;try{let o=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof o.hour12=="boolean"?o.hour12:o.hourCycle==="h12"||o.hourCycle==="h11"}catch{return!1}}function Lt(a,e="en-US",{hour12:t}={}){if(!a||a==="unknown"||a==="unavailable")return null;let o=new Date(a);if(isNaN(o.getTime()))return null;let n=o.toLocaleDateString(e,{weekday:"short"}),s=o.toLocaleDateString(e,{day:"numeric",month:"short"}),r=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},i=o.toLocaleTimeString(e,r);return{weekday:n,day:s,time:i}}function Ct({isHome:a=!0,isMyTeam:e=a,teamName:t="",entities:o={},opponentSensor:n=null,selectedEntity:s=null}={}){let r=(i,l)=>{if(!i||typeof i!="object")return null;for(let h of l)if(i[h]){let u=O(i[h]);if(u)return u}return null};if(e){let i=r(n?.attributes,["team_url","team_link"]);if(i)return i;let l=[s,o?.nextDate,o?.lastDate,o?.rank];for(let p of l){let f=r(p?.attributes,["team_url","team_link"]);if(f)return f}let h=o?.rank?.attributes?.standings||s?.attributes?.standings,u=Ge(t,h,["team_url","url","link"]);if(u)return u}else{let i=r(n?.attributes,["opponent_url","opponent_team_url","opponent_link"]);if(i)return i;let l=o?.rank?.attributes?.standings||s?.attributes?.standings,h=Ge(t,l,["team_url","url","link"]);if(h)return h}return null}function Xe({teamName:a="",matchLogo:e=null,isMyTeam:t=!1,myTeamLogo:o=null,nextOpponentState:n=null,nextOpponentLogo:s=null,lastOpponentState:r=null,lastOpponentLogo:i=null,standings:l=null}={}){let h=O(e);if(h)return h;if(t&&o&&o!==M)return o;let u=A(a);if(u){let p=A(n||"");if(p&&pe(p,u)){let c=O(s);if(c)return c}let f=A(r||"");if(f&&pe(f,u)){let c=O(i);if(c)return c}if(Array.isArray(l)&&l.length>0){let c=Ge(a,l,["team_logo_url","opponent_logo_url","logo_url","logo","team_logo","club_logo","crest","image","image_url","badge"]);if(c)return c}}return t&&o?o:M}function Ua({entities:a={},config:e={},manualView:t=null,matchIndex:o=null,states:n={},lang:s="fr",locale:r=null,hour12:i=void 0,t:l=(f,c="")=>c,isPreview:h=!1,now:u=new Date,instanceLanguage:p=""}={}){let f=S=>!!(S&&S!=="unknown"&&S!=="unavailable"),c=!!(a.matchInProgress&&a.matchInProgress.state==="on"),b=a.lastScore?.state,m=f(b),$=a.nextDate?.state,C=f($),z=m||f(a.lastOpponent?.state)||f(a.lastDate?.state),R=C||f(a.nextOpponent?.state),T=e.entity&&n?n[e.entity]:null,w=Nt(a,T),y=Array.isArray(w)&&w.length>0,v=y?an(w):-1,E=Dt(a),F=y?Ot(w,u,E):-1,I=y&&F===-1&&Ta(w,u)===-1&&!C&&m&&!c&&t===null&&e.default_match_view!=="next"||nn({defaultView:e.default_match_view||"auto",manualView:t,isLive:c,lastDate:a.lastDate?.state,hasLastScore:m,hasLastMatch:z,nextDate:$,hasNextMatch:C,nextIsStale:!!a.nextDate?.attributes?.is_stale&&Date.parse($)<Date.parse(a.lastDate?.state),now:u}),oe=y&&!c&&!I&&typeof o!="number"?Ta(w,u):-1,W=typeof o=="number"?o:oe!==-1?oe:null,ne=S=>y?on(w,{matchNumber:a[S]?.attributes?.match_number,dateStr:a[S]?.state}):-1,se=(S,Y)=>S!==-1?S:Y,N;typeof W=="number"&&y?N=Math.max(0,Math.min(W,w.length-1)):t==="last"?N=se(ne("lastDate"),v!==-1?v:0):t==="next"?N=se(ne("nextDate"),F!==-1?F:Math.max(0,w.length-1)):I?N=se(ne("lastDate"),v!==-1?v:0):N=se(ne("nextDate"),F!==-1?F:0);let _=typeof W=="number"&&y&&!!w[N]?w[N]:null,k=_?!!(_.is_played||_.score):I,Za=!c&&(y&&w.length>1||z&&R),Re=y&&w.length>1,Ut=Re?Da(w,N,"prev"):-1,Ht=Re?Da(w,N,"next"):-1,Qa=Re?Ut!==-1:!k,eo=Re?Ht!==-1:k,to=!k&&!c&&(_?!!(_.date&&Na(_.date,u)):C&&Na($,u)),re=a.poule?.attributes?.team||"",Vt=e.custom_team_name?.trim(),K=Vt||re||l("card.unknown_team","My team"),x,H,V,me,ge,et,tt,at,Ie,Pe,ze,_e,ot,be,j,D=k?a.lastOpponent:a.nextOpponent,ye=D?.state;if(_){let S=_.home_team||"",Y=_.away_team||"";x=_.is_home!==void 0?_.is_home:A(S)===A(re||K),H=x?Y:S,V=H;let le=P=>a[P]?.attributes,Do=le("nextOpponent")?.team_logo_url||le("lastOpponent")?.team_logo_url||le("nextDate")?.team_logo_url||le("lastDate")?.team_logo_url||null,Qt=a.rank?.attributes?.standings,pt=k?N===v:N===F,ea=pt?O(D?.attributes?.opponent_logo_url):null,ta=(P,xe,ce)=>{let J=Xe({teamName:P,matchLogo:xe,isMyTeam:ce,myTeamLogo:Do,nextOpponentState:a.nextOpponent?.state,nextOpponentLogo:le("nextOpponent")?.opponent_logo_url,lastOpponentState:a.lastOpponent?.state,lastOpponentLogo:le("lastOpponent")?.opponent_logo_url,standings:Qt});return J===M&&!ce&&ea?ea:J},aa=ta(S,_.home_logo||_.home_team_logo,x),oa=ta(Y,_.away_logo||_.away_team_logo,!x);me=x?aa:oa,ge=x?oa:aa;let na=(P,xe)=>{let ce=A(P),J=A(xe);return pe(ce,J)},sa=(P,xe,ce)=>{let J=O(xe);if(J)return J;if(ce)return Ct({isHome:!0,teamName:re||K,entities:a,opponentSensor:D,selectedEntity:T});if(pt){let we=O(D?.attributes?.opponent_url);if(we)return we}for(let we of[a.nextOpponent,a.lastOpponent])if(na(we?.state,P)){let ra=O(we?.attributes?.opponent_url);if(ra)return ra}return Ge(P,Qt,["team_url","url","link"])};et=sa(S,_.home_url,x),tt=sa(Y,_.away_url,!x),at=O(x?_.away_url:_.home_url)||(pt?O(D?.attributes?.opponent_url):null)||[a.nextOpponent,a.lastOpponent].map(P=>na(P?.state,H)?O(P?.attributes?.opponent_url):null).find(Boolean)||null,Ie=_.gym_name||"",Pe=_.gym_city||"",ze=_.formatted_address||"",_e=_.date||null,ot=String(_.round??""),be=!!_.is_stale,j=!!_.is_exempt}else{H=f(ye)?ye:l("card.unknown_opponent","Opponent"),V=f(ye)?ye:"",x=k?a.lastScore?.attributes?.is_home??a.lastDate?.attributes?.is_home??!0:a.nextVenue?.state==="home"||a.nextOpponent?.attributes?.is_home===!0,me=D?.attributes?.team_logo_url||M,ge=D?.attributes?.opponent_logo_url||M;let S=re||K,Y=x?S:V,Zt=x?V:S;et=Ct({isHome:x,teamName:Y,entities:a,opponentSensor:D,selectedEntity:T}),tt=Ct({isHome:!x,teamName:Zt,entities:a,opponentSensor:D,selectedEntity:T}),at=O(D?.attributes?.opponent_url)||O(D?.attributes?.opponent_team_url)||null,ot=k?a.lastDate?.attributes?.round||"":a.nextDate?.attributes?.round||"",k?(Ie=a.lastDate?.attributes?.gym_name||"",Pe=a.lastDate?.attributes?.gym_city||"",ze=a.lastDate?.attributes?.formatted_address||""):(Ie=a.nextLocation?.attributes?.gym_name||a.nextOpponent?.attributes?.gym_name||"",Pe=a.nextLocation?.attributes?.gym_city||a.nextOpponent?.attributes?.gym_city||"",ze=a.nextLocation?.attributes?.formatted_address||a.nextOpponent?.attributes?.formatted_address||""),_e=k?a.lastDate?.state:a.nextDate?.state,be=!!a.nextDate?.attributes?.is_stale,j=!k&&!!a.nextDate?.attributes?.is_exempt}j&&(H=l("card.exempt","Bye"));let ao=x?K:H,oo=x?H:K,no=x?me:ge,so=x?ge:me,nt=re||K,ro=x?nt:V,io=x?V:nt,lo=x?e.entity:D?.entity_id,co=x?D?.entity_id:e.entity,ho=a.poule?.attributes?.competition||"",uo=a.poule?.state||"",po=Lt(_e,r||s,{hour12:i}),Fe={win:l("card.form_letter_win","W"),loss:l("card.form_letter_loss","L"),draw:l("card.form_letter_draw","D")},jt=qe(a.form?.attributes?.current_streak||"",p,Fe),st=a.form?.state,rt=f(st)?je(st,p,Fe):st,Be=f(rt),fo=Be?rt:h?je("V-V-D-V-N","fr",Fe):"",mo=Be?jt:h?qe("2V","fr",Fe):"",go=e.show_form&&(Be||h),_o=!!e.show_venue&&y&&w.some(S=>S&&(S.gym_name||S.gym_city)),bo=e.show_title!==!1,it=e.title?.trim(),ie=l("card.default_title","Next match");c?ie=l("card.live_title","Live match"):k?ie=l("card.last_title","Last match"):j?ie=l("card.exempt_title","Bye week"):be&&(ie=l("card.postponed_title","Postponed match"));let yo=it?`${it} \u2022 ${ie}`:ie,xo=e.icon!==void 0?e.icon:"mdi:basketball",wo=`logo-box-${e.logo_size||"medium"}`,vo=za(e),$o=e.standings_title?.trim()||l("card.standings_title","Standings"),ko=e.standings_icon!==void 0?e.standings_icon:"mdi:format-list-numbered",qt=e.show_rank!==!1,lt=a.rank?.state,Gt=f(lt)?lt:null,Wt=Xo(V,a.rank?.attributes?.standings,{opponentUrl:j?null:at}),ct=ue(Gt,s),dt=ue(Wt,s),ht=x?ct:dt,ut=x?dt:ct;h&&qt&&(ht||(ht=ue(x?2:5,s)),ut||(ut=ue(x?5:2,s)));let Kt=!!_&&!k&&!c&&!be&&!j&&Ye(_,u,E),So=!c&&!k&&!Kt&&!j&&!!_e,Ao=e.logo_click_action&&e.logo_click_action!=="none",Co=Array.isArray(a.rank?.attributes?.standings)&&a.rank.attributes.standings.length>0,Eo=hn(e),Yt=!_||k&&N===v,Mo=Yt&&f(a.lastScore?.state)?Zo(a.lastScore.state,a.lastScore.attributes,x):null,Jt=_?.score||Mo||"-",Xt=S=>Wo.includes(S)?S:null,No=Xt(_?.result)||(Yt?Xt(a.lastResult?.state):null),To=Mt(Jt,x);return{isValidState:f,isLive:c,lastScoreState:b,hasLastScore:m,nextDateState:$,hasNextMatch:C,hasLastMatchData:z,hasNextMatchData:R,canToggleView:Za,canGoPrev:Qa,canGoNext:eo,chevronPrevIndex:Ut,chevronNextIndex:Ht,currentIndex:N,hasCalendar:y,calendarMatches:w,displayedScore:Jt,displayedResult:No,scoreParts:To,isPostMatch:k,isGameDay:to,currentOpponentSensor:D,officialTeamName:re,configuredTeamName:Vt,teamName:K,rawOpponent:ye,opponentName:H,opponentSearchName:V,isHome:x,teamLogoUrl:me,opponentLogoUrl:ge,leftName:ao,rightName:oo,leftLogo:no,rightLogo:so,searchTeamName:nt,leftMatchName:ro,rightMatchName:io,leftUrl:et,rightUrl:tt,leftEntityId:lo,rightEntityId:co,competition:ho,pouleName:uo,roundNumber:ot,gymName:Ie,gymCity:Pe,gymAddress:ze,targetDateStr:_e,dateFormatted:po,formStreak:jt,formSequence:rt,hasValidForm:Be,isPreview:h,displayFormSequence:fo,displayFormStreak:mo,showFormBlock:go,reserveVenueRow:_o,showTitle:bo,configuredTitle:it,titleText:yo,titleIcon:xo,displayMode:vo,standingsTitle:$o,standingsIcon:ko,logoSizeClass:wo,showRank:qt,rawUserRank:lt,userRankNum:Gt,opponentRankNum:Wt,userRankFormatted:ct,opponentRankFormatted:dt,leftRank:ht,rightRank:ut,isCalendarClickable:So,isLogoClickable:Ao,hasStandingsData:Co,accentColor:Eo,isStale:be,isExempt:j,isResultPending:Kt}}var Ha={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",postponed_title:"Match report\xE9",exempt:"Exempt",exempt_title:"Journ\xE9e d'exempt",result_pending:"R\xE9sultat en attente",result_pending_short:"En attente",win:"Victoire",loss:"D\xE9faite",draw:"Nul",your_score:"Notre score",home_short:"DOM",away_short:"EXT",opponent_score:"Score adversaire",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_letter_win:"V",form_letter_loss:"D",form_letter_draw:"N",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",table_group_matches:"Rencontres",table_irregularities:"I",table_penalties:"P\xE9n.",table_forfeits:"For.",table_defaults:"D\xE9f.",table_group_penalties:"P\xE9nalit\xE9s",table_referee:"Arb",table_coach:"Ent",table_group_points:"Points",table_scored:"M",table_conceded:"E",table_diff:"D",table_played_full:"Matchs jou\xE9s",table_wins_full:"Victoires",table_losses_full:"D\xE9faites",table_draws_full:"Matchs nuls",table_irregularities_full:"Irr\xE9gularit\xE9s",table_penalties_full:"P\xE9nalit\xE9s (total)",table_forfeits_full:"Forfaits",table_defaults_full:"D\xE9fauts",table_referee_full:"P\xE9nalit\xE9s arbitrage",table_coach_full:"P\xE9nalit\xE9s entra\xEEneur",table_scored_full:"Points marqu\xE9s",table_conceded_full:"Points encaiss\xE9s",table_diff_full:"Diff\xE9rence de points",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi",calendar_details:"Match FFBB\xA0: {home} vs {away}"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",entity_missing:"\xAB {entity} \xBB n'existe plus (sans doute renomm\xE9e) : s\xE9lectionnez-la \xE0 nouveau.",entity_suggestion:"Suggestion : {entity}",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_size_extra_large:"Tr\xE8s grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",title_helper:"Laissez vide pour un titre dynamique par d\xE9faut (\xAB Prochain match \xBB / \xAB Match en direct \xBB / \xAB Dernier match \xBB). Si renseign\xE9, il s'affiche en pr\xE9fixe devant ce titre dynamique.",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",standings_popup_detailed:"Classement d\xE9taill\xE9 dans la popup",standings_popup_detailed_helper:"Affiche le tableau complet (m\xEAmes colonnes que la carte classement secondaire) \xE0 la place du tableau simple.",display_mode:"Cartes \xE0 afficher",display_mode_match:"Carte match uniquement (par d\xE9faut)",display_mode_standings:"Carte classement uniquement",display_mode_both:"Carte match + carte classement",standings_card_section:"Carte classement ind\xE9pendante",standings_title:"Titre de la carte classement",standings_title_helper:"Laissez vide pour utiliser le titre par d\xE9faut",standings_icon:"Ic\xF4ne de la carte classement",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan",show_calendar_logos:"Logos d'\xE9quipe dans les lignes du calendrier",show_standings_logos:"Logos d'\xE9quipe dans les lignes de classement (popup et carte autonome)"}};var Va={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",postponed_title:"Postponed match",exempt:"Bye",exempt_title:"Bye week",result_pending:"Result pending",result_pending_short:"Pending",win:"Win",loss:"Loss",draw:"Draw",your_score:"Our score",home_short:"HOME",away_short:"AWAY",opponent_score:"Opponent score",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_letter_win:"W",form_letter_loss:"L",form_letter_draw:"D",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",table_group_matches:"Games",table_irregularities:"I",table_penalties:"Pen.",table_forfeits:"Forf.",table_defaults:"Def.",table_group_penalties:"Penalties",table_referee:"Ref",table_coach:"Coach",table_group_points:"Points",table_scored:"F",table_conceded:"A",table_diff:"D",table_played_full:"Games played",table_wins_full:"Wins",table_losses_full:"Losses",table_draws_full:"Draws",table_irregularities_full:"Irregularities",table_penalties_full:"Penalties (total)",table_forfeits_full:"Forfeits",table_defaults_full:"Defaults",table_referee_full:"Referee penalties",table_coach_full:"Coach penalties",table_scored_full:"Points scored (for)",table_conceded_full:"Points conceded (against)",table_diff_full:"Points difference",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off",calendar_details:"FFBB match: {home} vs {away}"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",entity_missing:'"{entity}" no longer exists (probably renamed): select it again.',entity_suggestion:"Suggestion: {entity}",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team logo size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_size_extra_large:"Extra Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",title_helper:'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix in front of that dynamic title.',icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",standings_popup_detailed:"Detailed standings in popup",standings_popup_detailed_helper:"Show the full table (same columns as the secondary standings card) instead of the simple one.",display_mode:"Cards to display",display_mode_match:"Match card only (default)",display_mode_standings:"Standings card only",display_mode_both:"Match card + standings card",standings_card_section:"Standalone standings card",standings_title:"Standings card title",standings_title_helper:"Leave blank for the default title",standings_icon:"Standings card icon",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos",show_calendar_logos:"Team logos in the calendar rows",show_standings_logos:"Team logos in standings rows (popup and standalone card)"}};var ja={fr:Ha,en:Va};function Ze(a){return(a?.locale?.language||a?.language||"en").substring(0,2).toLowerCase()}function fe(a){return ja[a]||ja.en}function Qe(a,e,t=""){if(!a||!e)return t;let o=e.split("."),n=a;for(let s of o){if(!n||typeof n!="object"||!(s in n))return t;n=n[s]}return typeof n=="string"?n:t}var qa=X`
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
`;var Ga=["unknown","unavailable"];function fn(a,e){let t=A(a?.team_name||a?.name||""),o=A(e);return!t||!o?!1:t.includes(o)||o.includes(t)}function Wa(a){return a==null||a===""?"-":a}function mn(a){if(a==null||a==="")return"-";let e=Number(a);return Number.isFinite(e)?e>0?`+${e}`:String(e):a}function gn(a){let e=Number(a);return a==null||a===""||!Number.isFinite(e)||e===0?"":e>0?"diff-pos":"diff-neg"}var _n={matches:[{key:"table_played",fb:"J",full:"table_played_full",fullFb:"Games played",get:a=>a.played},{key:"table_wins",fb:"G",full:"table_wins_full",fullFb:"Wins",get:a=>a.wins??a.won},{key:"table_losses",fb:"P",full:"table_losses_full",fullFb:"Losses",get:a=>a.losses??a.lost},{key:"table_draws",fb:"N",full:"table_draws_full",fullFb:"Draws",get:a=>a.draws}],singles:[{key:"table_irregularities",fb:"I",full:"table_irregularities_full",fullFb:"Irregularities",get:a=>a.irregularities},{key:"table_penalties",fb:"P\xE9n.",full:"table_penalties_full",fullFb:"Penalties",get:a=>a.total_penalties},{key:"table_forfeits",fb:"For.",full:"table_forfeits_full",fullFb:"Forfeits",get:a=>a.forfeits},{key:"table_defaults",fb:"D\xE9f.",full:"table_defaults_full",fullFb:"Defaults",get:a=>a.defaults}],penalties:[{key:"table_referee",fb:"Arb",full:"table_referee_full",fullFb:"Referee penalties",get:a=>a.referee_penalties},{key:"table_coach",fb:"Ent",full:"table_coach_full",fullFb:"Coach penalties",get:a=>a.coach_penalties}],points:[{key:"table_scored",fb:"M",full:"table_scored_full",fullFb:"Points scored",get:a=>a.points_for},{key:"table_conceded",fb:"E",full:"table_conceded_full",fullFb:"Points conceded",get:a=>a.points_against},{key:"table_diff",fb:"D",full:"table_diff_full",fullFb:"Points difference",get:a=>a.points_diff,signed:!0}]};function Rt(a,e=!0){return e?d`
    <img
      class="col-team-logo"
      src=${a||M}
      alt=""
      @error=${t=>{t.target.src.endsWith(M)||(t.target.src=M)}}
    />
  `:g}function bn(a){let e=String(a?.team_name??a?.name??"").trim().toLowerCase();return e==="n/a"||e==="exempt"}function It(a,e){return bn(a)?e("card.exempt","Bye"):a?.team_name||a?.name||"-"}function Pt({rows:a,teamName:e,displayTeamName:t,t:o,showLogos:n=!0}){let{matches:s,singles:r,penalties:i,points:l}=_n,h=c=>o(`card.${c.key}`,c.fb),u=c=>o(`card.${c.full}`,c.fullFb),p=c=>d`<th class="sub-head" scope="col"><abbr title=${u(c)}>${h(c)}</abbr></th>`,f=(c,b)=>{let m=c.get(b);return c.signed?d`<td class="num ${gn(m)}">${mn(m)}</td>`:d`<td class="num">${Wa(m)}</td>`};return d`
    <div class="standings-scroll">
      <table class="standings-table standings-table-detailed">
        <thead>
          <tr class="group-row">
            <th class="col-pos" rowspan="2" scope="col">#</th>
            <th class="col-team" rowspan="2" scope="col">${o("card.table_team","Team")}</th>
            <th class="single-head" rowspan="2" scope="col">${o("card.table_pts","Pts")}</th>
            <th class="group-head" colspan=${s.length} scope="colgroup">${o("card.table_group_matches","Games")}</th>
            ${r.map(c=>d`<th class="single-head" rowspan="2" scope="col" title=${u(c)}><abbr title=${u(c)}>${h(c)}</abbr></th>`)}
            <th class="group-head" colspan=${i.length} scope="colgroup">${o("card.table_group_penalties","Penalties")}</th>
            <th class="group-head" colspan=${l.length} scope="colgroup">${o("card.table_group_points","Points")}</th>
          </tr>
          <tr class="sub-row">
            ${s.map(p)}
            ${i.map(p)}
            ${l.map(p)}
          </tr>
        </thead>
        <tbody>
          ${a.map(c=>{let b=fn(c,e),m=b&&t?t:It(c,o);return d`
              <tr class=${b?"highlight-row my-team-row":""}>
                <td class="pos-cell col-pos">${c.position||c.rank||"-"}</td>
                <td class="col-team">${Rt(c.logo_url,n)}<span>${m}</span></td>
                <td class="pts-cell">${Wa(c.points??c.pts)}</td>
                ${s.map($=>f($,c))}
                ${r.map($=>f($,c))}
                ${i.map($=>f($,c))}
                ${l.map($=>f($,c))}
              </tr>
            `})}
        </tbody>
      </table>
    </div>
  `}function Ka({standings:a,poule:e,competition:t,teamName:o,displayTeamName:n,accentColor:s,title:r,icon:i,compact:l,showLogos:h=!0,t:u}){let p=Je(a),f=e&&!Ga.includes(e)?e:"",c=t&&!Ga.includes(t)?t:"",b=r||u("card.standings_title","Standings"),m=i!==void 0?i:"mdi:format-list-numbered";return d`
    <ha-card class="standings-card ${l?"standings-compact":""}" style="--ffbb-accent-color: ${s};">
      <div class="standings-card-header">
        ${m?d`<ha-icon icon=${m}></ha-icon>`:g}
        <span>${b}${f?` \u2022 ${f}`:""}</span>
      </div>
      ${c?d`<div class="standings-card-subtitle">${c}</div>`:g}
      <div class="standings-card-body">
        ${p.length>0?Pt({rows:p,teamName:o,displayTeamName:n,t:u,showLogos:h}):d`<div class="standings-empty-text">${u("card.no_standings","No standings data available.")}</div>`}
      </div>
    </ha-card>
  `}var Ya=X`
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
`;var zt=class extends B{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return X`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=fe("fr")}setConfig(e){this._config={entity:"",...De,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=Ze(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=fe(t))}}_t(e,t=""){return Qe(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!Le(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_entityHelper(){let e=this._t("editor.entity_helper","Select any sensor belonging to the team"),t=String(this._config?.entity??"").trim(),o=this.hass?.states;if(!t||!o||Object.keys(o).length===0||Object.prototype.hasOwnProperty.call(o,t))return e;let n=this._t("editor.entity_missing",'"{entity}" no longer exists (probably renamed): select it again.').replace("{entity}",t),s=this._suggestEntity(t,o);if(!s)return`\u26A0 ${n}`;let r=this._t("editor.entity_suggestion","Suggestion: {entity}").replace("{entity}",s);return`\u26A0 ${n} ${r}`}_suggestEntity(e,t){let o=We(e,t,this.hass?.entities);return[o.poule,o.nextDate,...Object.values(o)].map(s=>s?.entity_id).find(s=>typeof s=="string"&&s.startsWith("sensor."))??""}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},o=["entity","custom_team_name","title","icon","custom_accent_color","standings_title"];for(let r of o)r in t||(t[r]="");let n={...this._config,...t},s=new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0});this.dispatchEvent(s)}render(){if(!this.hass||!this._config)return d``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._entityHelper(),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),helper:this._t("editor.title_helper",'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix before that dynamic title.'),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team logo size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")},{value:"extra_large",label:this._t("editor.logo_size_extra_large","Extra Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}},{name:"show_calendar_logos",label:this._t("editor.show_calendar_logos","Team logos in the calendar rows"),default:!0,selector:{boolean:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}},{name:"standings_popup_detailed",label:this._t("editor.standings_popup_detailed","Detailed standings in popup"),helper:this._t("editor.standings_popup_detailed_helper","Show the full table (same columns as the secondary standings card) instead of the simple one."),default:!1,selector:{boolean:{}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}},{name:"standings_card",type:"expandable",title:this._t("editor.standings_card_section","Standalone standings card"),icon:"mdi:card-multiple-outline",flatten:!0,schema:[{name:"display_mode",label:this._t("editor.display_mode","Cards to display"),default:"match",selector:{select:{mode:"dropdown",options:[{value:"match",label:this._t("editor.display_mode_match","Match card only (default)")},{value:"standings",label:this._t("editor.display_mode_standings","Standings card only")},{value:"both",label:this._t("editor.display_mode_both","Match card + standings card")}]}}},...this._config.display_mode!=="match"?[{name:"standings_title",label:this._t("editor.standings_title","Standings card title"),helper:this._t("editor.standings_title_helper","Leave blank for the default title"),selector:{text:{}}},{name:"standings_icon",label:this._t("editor.standings_icon","Standings card icon"),selector:{icon:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]:[]]}];return d`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${Te}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",zt);var Ft=class extends B{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=fe("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...De}}getCardSize(){let e=this._config?this._resolveEntities():null;return Fa({config:this._config,standings:e?.rank?.attributes?.standings})}getGridOptions(){return{columns:12,min_columns:9,min_rows:3}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...De,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,o=String(t??"").trim();e!=="custom"||!o||Le(o)||this._warnedAccentColor!==o&&(this._warnedAccentColor=o,console.warn(`[FFBB Tracker Card] custom_accent_color "${o}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=Ze(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=fe(t))}}_t(e,t=""){return Qe(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none")return"";let o=String(e).trim().match(/^(\d+)/);if(!o)return"";let n=parseInt(o[1],10);return n===1?"rank-gold":n===2?"rank-silver":n===3?"rank-bronze":""}_resolveEntities(){return We(this._config.entity,this.hass?.states,this.hass?.entities)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:Ba(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:o}=this._localeInfo();return Lt(e,t,{hour12:o})}_openMaps(e,t,o=""){let n=encodeURIComponent(o?.trim()||`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${n}`,"_blank","noreferrer")}_openCalendar(e,t,o,n,s,r=""){if(!e||e==="unknown"||e==="unavailable")return;let i=new Date(e);if(isNaN(i.getTime()))return;let l=new Date(i.getTime()+7200*1e3),h=b=>b.toISOString().replace(/[-:]|\.\d{3}/g,""),u=`${t} vs ${o}`,p=r?.trim()||`${n} ${s}`.trim(),f=this._t("card.calendar_details","FFBB match: {home} vs {away}").replace(/\{(home|away)\}/g,(b,m)=>m==="home"?t:o),c=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(u)}&dates=${h(i)}/${h(l)}&details=${encodeURIComponent(f)}&location=${encodeURIComponent(p)}`;window.open(c,"_blank","noreferrer")}_handleLogoClick(e,t,o){let n=this._config.logo_click_action||"team_url";n==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${o}".`),e&&this._fireMoreInfo(e)):n==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let o=this._modalTrigger;this._modalTrigger=null,o&&o.isConnected&&typeof o.focus=="function"&&o.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let o=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(o.length===0){e.preventDefault(),t.focus();return}let n=o[0],s=o[o.length-1],r=this.shadowRoot?.activeElement;e.shiftKey&&(r===n||r===t)?(e.preventDefault(),s.focus()):!e.shiftKey&&r===s&&(e.preventDefault(),n.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let o=e==="prev"?t.chevronPrevIndex:t.chevronNextIndex;if(Number.isInteger(o)&&o>=0&&o<t.calendarMatches.length){this._matchIndex=o;let n=t.calendarMatches[o];this._manualView=n.is_played||n.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,t){this._matchIndex=e,this._manualView=t?"last":"next",this._closeModal()}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return Nt(e,t)}_renderScoreParts(e){let t=d`<span class="score-mine">${e.my}</span>`,o=d`<span class="score-theirs">${e.opponent}</span>`,n=d`<span class="score-sep"> - </span>`;return e.mineFirst===!1?d`${o}${n}${t}`:d`${t}${n}${o}`}_renderModal(e,t,o,n){if(!this._activeModal)return d``;if(this._activeModal==="standings"){let s=e.rank?.attributes?.standings||[],r=Je(s),i=e.poule?.attributes?.competition||"",l=e.poule?.state||"",h=r.map(c=>c.team_name||c.name||""),u=Ke(h,t),p=Ke(h,o),f=!!this._config?.standings_popup_detailed;return d`
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
            ${i?d`<div class="modal-subtitle">${i}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${r.length===0?d`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings","No standings data available.")}
                    </div>
                  `:f?Pt({rows:r,teamName:t,displayTeamName:n,t:(c,b)=>this._t(c,b),showLogos:this._config.show_standings_logos!==!1}):d`
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
                        ${r.map(c=>{let b=c.team_name||c.name||"",m=u(b),$=m||p(b),C=m&&n?n:It(c,(z,R)=>this._t(z,R));return d`
                            <tr class=${[$?"highlight-row":"",m?"my-team-row":""].filter(Boolean).join(" ")}>
                              <td class="pos-cell">${c.position||c.rank||"-"}</td>
                              <td class="col-team">${Rt(c.logo_url,this._config.show_standings_logos!==!1)}<span>${C}</span></td>
                              <td class="pts-cell">${c.points??c.pts??"-"}</td>
                              <td>${c.played??"-"}</td>
                              <td>${c.wins??c.won??"-"}</td>
                              <td>${c.losses??c.lost??"-"}</td>
                              <td>${c.draws??"0"}</td>
                            </tr>
                          `})}
                      </tbody>
                    </table>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="form"){let s=e.form?.state,r=s&&s!=="unknown"&&s!=="unavailable",i=r?s:"",l=this.hass?.config?.language||"",h={win:this._t("card.form_letter_win","W"),loss:this._t("card.form_letter_loss","L"),draw:this._t("card.form_letter_draw","D")},u=r?qe(e.form?.attributes?.current_streak||"",l,h):"",p=i.split("-").filter(Boolean);return d`
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
            @click=${f=>f.stopPropagation()}
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
              ${p.length>0?d`
                    <div class="form-badges-container">
                      ${p.map(f=>{let c=Ra(f,l),b=`badge-${c}`,m=this._t(`card.${c}`,c),$=je(f,l,h);return d`
                          <div class="form-badge-pill ${b}">
                            <span class="pill-char">${$}</span>
                            <span class="pill-label">${m}</span>
                          </div>
                        `})}
                    </div>
                    ${u?d`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${u}</strong>
                          </div>
                        `:""}
                  `:d`
                    <div class="modal-empty-text">
                      ${this._t("card.no_form","No recent form data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="calendar"){let s=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",i=e.poule?.state||"",l=s.flatMap(m=>[m.home_team||"",m.away_team||""]),h=Ke(l,t),u=new Date,p=Dt(e),f=Ot(s,u,p),c=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||M,b=e.rank?.attributes?.standings;return d`
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
            ${r?d`<div class="modal-subtitle">${r}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${s.length>0?d`
                    <div class="calendar-list">
                      ${s.map((m,$)=>{let C=m.home_team||"-",z=m.away_team||"-",R=!!m.is_exempt,T=R?"":m.score||(m.home_score!==void 0?`${m.home_score} - ${m.away_score}`:""),w=this._formatDate(m.date||m.datetime),{isHomeMyTeam:y,isAwayMyTeam:v}=Ia(m,h),E=y||v,F=!!(m.is_played||T),L=null;R&&(y!==v?L=y?"away":"home":typeof m.is_home=="boolean"?L=m.is_home?"away":"home":L=/^exempt/i.test(C)?"home":"away");let I=this._t("card.exempt","Bye"),oe=L==="home"?I:C,W=L==="away"?I:z,ne=$===f,se=Ye(m,u,p),N=Xe({teamName:oe,matchLogo:m.home_logo||m.home_team_logo,isMyTeam:y,myTeamLogo:c,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:b}),Bt=Xe({teamName:W,matchLogo:m.away_logo||m.away_team_logo,isMyTeam:v,myTeamLogo:c,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:b}),_="";return R?_="":y?_="home":v&&(_="away"),d`
                          <div
                            class="calendar-row ${E?"highlight-row":""} ${ne?"next-match-row":""} ${R?"bye-row":""}"
                            @click=${()=>this._selectCalendarMatch($,F)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch($,F))}
                            role="button"
                            tabindex="0"
                            aria-label="${y&&n?n:oe} vs ${v&&n?n:W}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${m.round||"-"}</span>
                              ${_?d`<span class="cal-venue-pill ${_==="home"?"pill-dom":"pill-ext"}">${_==="home"?this._t("card.home_short","HOME"):this._t("card.away_short","AWAY")}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1&&L==="home"?d`<span class="cal-bye-icon" aria-hidden="true"><ha-icon icon="mdi:pause-circle-outline"></ha-icon></span>`:this._config.show_calendar_logos!==!1?d`
                                      <img
                                        class="cal-mini-logo"
                                        src=${N}
                                        alt=""
                                        @error=${k=>{k.target.src.endsWith(M)||(k.target.src=M)}}
                                      />
                                    `:g}
                                <span class="cal-team ${y?"my-team-text":""} ${L==="home"?"bye-text":""}">${y&&n?n:oe}</span>
                              </div>
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1&&L==="away"?d`<span class="cal-bye-icon" aria-hidden="true"><ha-icon icon="mdi:pause-circle-outline"></ha-icon></span>`:this._config.show_calendar_logos!==!1?d`
                                      <img
                                        class="cal-mini-logo"
                                        src=${Bt}
                                        alt=""
                                        @error=${k=>{k.target.src.endsWith(M)||(k.target.src=M)}}
                                      />
                                    `:g}
                                <span class="cal-team ${v?"my-team-text":""} ${L==="away"?"bye-text":""}">${v&&n?n:W}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${T?d`
                                    ${w?d`<div class="cal-date">${w.day}</div>`:g}
                                    <div class="cal-score">
                                      ${(()=>{let k=E?Mt(T,y):null;return k?this._renderScoreParts(k):T})()}
                                    </div>
                                  `:w?d`
                                    <div class="cal-date">${w.day}</div>
                                    ${se?d`<div class="cal-pending" title=${this._t("card.result_pending","Result pending")}>${this._t("card.result_pending_short","Pending")}</div>`:d`<div class="cal-time">${R?"-":w.time}</div>`}
                                  `:d`<div class="cal-date">-</div>`}
                            </div>
                          </div>
                        `})}
                    </div>
                  `:d`
                    <div class="modal-empty-text">
                      ${this._t("card.no_calendar","No schedule available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}return d``}_computeViewModel(e){let{language:t,hour12:o}=this._localeInfo();return Ua({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:o,t:(n,s)=>this._t(n,s),instanceLanguage:this.hass?.config?.language||"",isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return d``;let e=this._resolveEntities();if(!e)return d`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let t=this._computeViewModel(e);return d`
      ${t.displayMode!=="standings"?d`
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
          `:g}

      ${t.displayMode!=="match"?Ka({standings:e.rank?.attributes?.standings,poule:e.poule?.state,competition:e.poule?.attributes?.competition,teamName:t.searchTeamName,displayTeamName:t.configuredTeamName,accentColor:t.accentColor,title:t.standingsTitle,icon:t.standingsIcon,compact:t.displayMode==="both",showLogos:this._config.show_standings_logos!==!1,t:(o,n)=>this._t(o,n)}):g}
    `}_renderHeader(e){let{showTitle:t,titleText:o,titleIcon:n}=e;return d`
      ${t&&(o||n)?d`
            <div class="card-header">
              ${n?d`<ha-icon .icon=${n}></ha-icon>`:""}
              ${o?d`<span class="card-header-title">${o}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:t,rightLogo:o}=e;return d`
      ${this._config.show_watermark?d`
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
    `}_renderMatchHeader(e){let{competition:t,pouleName:o,roundNumber:n}=e;return d`
      ${this._config.show_header?d`
            <div class="header">
              ${t||o?d`
                    <div class="header-main">
                      <span class="competition">${t}</span>
                      ${o?d`<span class="poule">• ${o}</span>`:""}
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
    `}_renderMatchArea(e){let{isLive:t,canToggleView:o,isPostMatch:n,isGameDay:s,leftName:r,rightName:i,leftLogo:l,rightLogo:h,leftUrl:u,rightUrl:p,leftEntityId:f,rightEntityId:c,gymName:b,gymCity:m,gymAddress:$,dateFormatted:C,logoSizeClass:z,showRank:R,leftRank:T,rightRank:w,isCalendarClickable:y,isLogoClickable:v,hasStandingsData:E}=e,L=this._config?.rank_badge_style==="solid"?"rank-solid":"";return d`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${z} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(f,u,r)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(f,u,r)):g}
            role=${v?"button":g}
            tabindex=${v?"0":g}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",r):g}
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
          ${o?d`
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
            class="center-meta ${y?"clickable":""}"
            @click=${()=>{y&&this._openCalendar(e.targetDateStr,r,i,b,m,$)}}
            @keydown=${y?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,r,i,b,m,$)):g}
            role=${y?"button":g}
            tabindex=${y?"0":g}
            aria-label=${y?this._t("card.add_to_calendar","Add to Google Calendar"):g}
            title=${y?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${t?d`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${C?`${this._t("card.kickoff","Kick-off")} ${C.time}`:""}
                  </div>
                `:n?d`
                  ${C?d`<div class="match-day">${C.weekday} ${C.day}</div>`:""}
                  <div class="match-main">
                    <div class="score-display">
                      ${e.scoreParts?d`
                            <span class="sr-only">${`${this._t("card.your_score","Our score")}: ${e.scoreParts.my} \u2014 ${this._t("card.opponent_score","Opponent score")}: ${e.scoreParts.opponent}`}</span
                            ><span aria-hidden="true">${this._renderScoreParts(e.scoreParts)}</span
                            >
                          `:e.displayedScore}
                    </div>
                  </div>
                  ${e.displayedResult?d`<div class="badge badge-${e.displayedResult}">
                        ${this._t(`card.${e.displayedResult}`)}
                      </div>`:""}
                `:d`
                  ${C?d`
                        <div class="match-day">${C.weekday} ${C.day}</div>
                        <div class="match-main">
                          <div class="match-time">${e.isExempt?"-":C.time}</div>
                        </div>
                      `:d`<div class="match-main"><div class="match-time">-</div></div>`}
                  ${s&&!e.isStale&&!e.isExempt&&!e.isResultPending?d`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${e.isExempt?d`<div class="badge badge-postponed">${this._t("card.exempt","Bye")}</div>`:""}
                  ${e.isResultPending&&!e.isExempt?d`<div class="badge badge-pending">${this._t("card.result_pending","Result pending")}</div>`:""}
                  ${e.isStale&&!e.isExempt?d`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${o?d`
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
            class="logo-box ${z} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(c,p,i)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(c,p,i)):g}
            role=${v?"button":g}
            tabindex=${v?"0":g}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",i):g}
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

        ${R&&(T||w)?d`
              <div class="team-rank-cell rank-left">
                ${T?d`
                      <span
                        class="rank-badge ${this._getRankClass(T)} ${L} ${E?"clickable-badge":""}"
                        @click=${()=>{E&&this._openModal("standings")}}
                        @keydown=${E?this._onKeyActivate(()=>this._openModal("standings")):g}
                        role=${E?"button":g}
                        tabindex=${E?"0":g}
                        aria-label=${E?this._t("card.view_standings","View league standings"):g}
                        title=${E?this._t("card.view_standings","View league standings"):""}
                      >${T}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${w?d`
                      <span
                        class="rank-badge ${this._getRankClass(w)} ${L} ${E?"clickable-badge":""}"
                        @click=${()=>{E&&this._openModal("standings")}}
                        @keydown=${E?this._onKeyActivate(()=>this._openModal("standings")):g}
                        role=${E?"button":g}
                        tabindex=${E?"0":g}
                        aria-label=${E?this._t("card.view_standings","View league standings"):g}
                        title=${E?this._t("card.view_standings","View league standings"):""}
                      >${w}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:o,gymAddress:n,hasValidForm:s,isPreview:r,displayFormSequence:i,displayFormStreak:l,showFormBlock:h,reserveVenueRow:u}=e;return d`
      ${h?d`
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
              <span class="form-sequence">${i}</span>${l?d`<span class="form-streak">(${l})</span>`:""}
              ${!s&&r?d`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
            </div>
          `:""}

      ${this._config.show_venue&&(t||o)?d`
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
          `:this._config.show_venue&&u?d`
              <div class="footer-venue footer-venue-empty" aria-hidden="true">
                <div class="venue-info">
                  <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                  <span class="venue-text">&nbsp;</span>
                </div>
              </div>
            `:""}
    `}static get styles(){return[qa,Ya]}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Ft);console.info(`%c FFBB Tracker Card %c v${Te} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var Ja=window.customCards.findIndex(a=>a.type==="ffbb-tracker-card"),Xa={type:"ffbb-tracker-card",name:`FFBB Tracker v${Te}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};Ja!==-1?window.customCards[Ja]=Xa:window.customCards.push(Xa);
