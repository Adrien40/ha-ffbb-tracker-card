var et=globalThis,tt=et.ShadowRoot&&(et.ShadyCSS===void 0||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kt=Symbol(),wa=new WeakMap,Ne=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o,a=this.t;if(tt&&e===void 0){let o=a!==void 0&&a.length===1;o&&(e=wa.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&wa.set(a,e))}return e}toString(){return this.cssText}},va=t=>new Ne(typeof t=="string"?t:t+"",void 0,kt),ne=(t,...e)=>{let a=t.length===1?t[0]:e.reduce((o,n,r)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new Ne(a,t,kt)},$a=(t,e)=>{if(tt)t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of e){let o=document.createElement("style"),n=et.litNonce;n!==void 0&&o.setAttribute("nonce",n),o.textContent=a.cssText,t.appendChild(o)}},St=tt?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(let o of e.cssRules)a+=o.cssText;return va(a)})(t):t;var{is:Jo,defineProperty:Xo,getOwnPropertyDescriptor:Zo,getOwnPropertyNames:Qo,getOwnPropertySymbols:en,getPrototypeOf:tn}=Object,ee=globalThis,ka=ee.trustedTypes,an=ka?ka.emptyScript:"",on=ee.reactiveElementPolyfillSupport,De=(t,e)=>t,At={toAttribute(t,e){switch(e){case Boolean:t=t?an:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},Aa=(t,e)=>!Jo(t,e),Sa={attribute:!0,type:String,converter:At,reflect:!1,useDefault:!1,hasChanged:Aa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ee.litPropertyMetadata??(ee.litPropertyMetadata=new WeakMap);var J=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Sa){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){let o=Symbol(),n=this.getPropertyDescriptor(e,o,a);n!==void 0&&Xo(this.prototype,e,n)}}static getPropertyDescriptor(e,a,o){let{get:n,set:r}=Zo(this.prototype,e)??{get(){return this[a]},set(s){this[a]=s}};return{get:n,set(s){let i=n?.call(this);r?.call(this,s),this.requestUpdate(e,i,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Sa}static _$Ei(){if(this.hasOwnProperty(De("elementProperties")))return;let e=tn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(De("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(De("properties"))){let a=this.properties,o=[...Qo(a),...en(a)];for(let n of o)this.createProperty(n,a[n])}let e=this[Symbol.metadata];if(e!==null){let a=litPropertyMetadata.get(e);if(a!==void 0)for(let[o,n]of a)this.elementProperties.set(o,n)}this._$Eh=new Map;for(let[a,o]of this.elementProperties){let n=this._$Eu(a,o);n!==void 0&&this._$Eh.set(n,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let a=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let n of o)a.unshift(St(n))}else e!==void 0&&a.push(St(e));return a}static _$Eu(e,a){let o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,a=this.constructor.elementProperties;for(let o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $a(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$ET(e,a){let o=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,o);if(n!==void 0&&o.reflect===!0){let r=(o.converter?.toAttribute!==void 0?o.converter:At).toAttribute(a,o.type);this._$Em=e,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(e,a){let o=this.constructor,n=o._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let r=o.getPropertyOptions(n),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:At;this._$Em=n;let i=s.fromAttribute(a,r.type);this[n]=i??this._$Ej?.get(n)??i,this._$Em=null}}requestUpdate(e,a,o,n=!1,r){if(e!==void 0){let s=this.constructor;if(n===!1&&(r=this[e]),o??(o=s.getPropertyOptions(e)),!((o.hasChanged??Aa)(r,a)||o.useDefault&&o.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:o,reflect:n,wrapped:r},s){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??a??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(a=void 0),this._$AL.set(e,a)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[n,r]of o){let{wrapped:s}=r,i=this[n];s!==!0||this._$AL.has(n)||i===void 0||this.C(n,void 0,r,i)}}let e=!1,a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(a)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(a)}willUpdate(e){}_$AE(e){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};J.elementStyles=[],J.shadowRootOptions={mode:"open"},J[De("elementProperties")]=new Map,J[De("finalized")]=new Map,on?.({ReactiveElement:J}),(ee.reactiveElementVersions??(ee.reactiveElementVersions=[])).push("2.1.2");var Ie=globalThis,Ca=t=>t,at=Ie.trustedTypes,Ea=at?at.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oa="$lit$",te=`lit$${Math.random().toFixed(9).slice(2)}$`,Ia="?"+te,nn=`<${Ia}>`,ie=document,Re=()=>ie.createComment(""),Pe=t=>t===null||typeof t!="object"&&typeof t!="function",Dt=Array.isArray,rn=t=>Dt(t)||typeof t?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,Oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ma=/-->/g,Ta=/>/g,re=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),La=/'/g,Na=/"/g,Ra=/^(?:script|style|textarea|title)$/i,Ot=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),c=Ot(1),jn=Ot(2),qn=Ot(3),le=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Da=new WeakMap,se=ie.createTreeWalker(ie,129);function Pa(t,e){if(!Dt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ea!==void 0?Ea.createHTML(e):e}var sn=(t,e)=>{let a=t.length-1,o=[],n,r=e===2?"<svg>":e===3?"<math>":"",s=Oe;for(let i=0;i<a;i++){let l=t[i],d,u,f=-1,p=0;for(;p<l.length&&(s.lastIndex=p,u=s.exec(l),u!==null);)p=s.lastIndex,s===Oe?u[1]==="!--"?s=Ma:u[1]!==void 0?s=Ta:u[2]!==void 0?(Ra.test(u[2])&&(n=RegExp("</"+u[2],"g")),s=re):u[3]!==void 0&&(s=re):s===re?u[0]===">"?(s=n??Oe,f=-1):u[1]===void 0?f=-2:(f=s.lastIndex-u[2].length,d=u[1],s=u[3]===void 0?re:u[3]==='"'?Na:La):s===Na||s===La?s=re:s===Ma||s===Ta?s=Oe:(s=re,n=void 0);let h=s===re&&t[i+1].startsWith("/>")?" ":"";r+=s===Oe?l+nn:f>=0?(o.push(d),l.slice(0,f)+Oa+l.slice(f)+te+h):l+te+(f===-2?i:h)}return[Pa(t,r+(t[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ze=class t{constructor({strings:e,_$litType$:a},o){let n;this.parts=[];let r=0,s=0,i=e.length-1,l=this.parts,[d,u]=sn(e,a);if(this.el=t.createElement(d,o),se.currentNode=this.el.content,a===2||a===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(n=se.nextNode())!==null&&l.length<i;){if(n.nodeType===1){if(n.hasAttributes())for(let f of n.getAttributeNames())if(f.endsWith(Oa)){let p=u[s++],h=n.getAttribute(f).split(te),m=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:m[2],strings:h,ctor:m[1]==="."?Mt:m[1]==="?"?Tt:m[1]==="@"?Lt:ye}),n.removeAttribute(f)}else f.startsWith(te)&&(l.push({type:6,index:r}),n.removeAttribute(f));if(Ra.test(n.tagName)){let f=n.textContent.split(te),p=f.length-1;if(p>0){n.textContent=at?at.emptyScript:"";for(let h=0;h<p;h++)n.append(f[h],Re()),se.nextNode(),l.push({type:2,index:++r});n.append(f[p],Re())}}}else if(n.nodeType===8)if(n.data===Ia)l.push({type:2,index:r});else{let f=-1;for(;(f=n.data.indexOf(te,f+1))!==-1;)l.push({type:7,index:r}),f+=te.length-1}r++}}static createElement(e,a){let o=ie.createElement("template");return o.innerHTML=e,o}};function be(t,e,a=t,o){if(e===le)return e;let n=o!==void 0?a._$Co?.[o]:a._$Cl,r=Pe(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(t),n._$AT(t,a,o)),o!==void 0?(a._$Co??(a._$Co=[]))[o]=n:a._$Cl=n),n!==void 0&&(e=be(t,n._$AS(t,e.values),n,o)),e}var Et=class{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:a},parts:o}=this._$AD,n=(e?.creationScope??ie).importNode(a,!0);se.currentNode=n;let r=se.nextNode(),s=0,i=0,l=o[0];for(;l!==void 0;){if(s===l.index){let d;l.type===2?d=new Fe(r,r.nextSibling,this,e):l.type===1?d=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(d=new Nt(r,this,e)),this._$AV.push(d),l=o[++i]}s!==l?.index&&(r=se.nextNode(),s++)}return se.currentNode=ie,n}p(e){let a=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,a),a+=o.strings.length-2):o._$AI(e[a])),a++}},Fe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,a,o,n){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=o,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,a=this._$AM;return a!==void 0&&e?.nodeType===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=be(this,e,a),Pe(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==le&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):rn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&Pe(this._$AH)?this._$AA.nextSibling.data=e:this.T(ie.createTextNode(e)),this._$AH=e}$(e){let{values:a,_$litType$:o}=e,n=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ze.createElement(Pa(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===n)this._$AH.p(a);else{let r=new Et(n,this),s=r.u(this.options);r.p(a),this.T(s),this._$AH=r}}_$AC(e){let a=Da.get(e.strings);return a===void 0&&Da.set(e.strings,a=new ze(e)),a}k(e){Dt(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,o,n=0;for(let r of e)n===a.length?a.push(o=new t(this.O(Re()),this.O(Re()),this,this.options)):o=a[n],o._$AI(r),n++;n<a.length&&(this._$AR(o&&o._$AB.nextSibling,n),a.length=n)}_$AR(e=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);e!==this._$AB;){let o=Ca(e).nextSibling;Ca(e).remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ye=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,o,n,r){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=a,this._$AM=n,this.options=r,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=g}_$AI(e,a=this,o,n){let r=this.strings,s=!1;if(r===void 0)e=be(this,e,a,0),s=!Pe(e)||e!==this._$AH&&e!==le,s&&(this._$AH=e);else{let i=e,l,d;for(e=r[0],l=0;l<r.length-1;l++)d=be(this,i[o+l],a,l),d===le&&(d=this._$AH[l]),s||(s=!Pe(d)||d!==this._$AH[l]),d===g?e=g:e!==g&&(e+=(d??"")+r[l+1]),this._$AH[l]=d}s&&!n&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Mt=class extends ye{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},Tt=class extends ye{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},Lt=class extends ye{constructor(e,a,o,n,r){super(e,a,o,n,r),this.type=5}_$AI(e,a=this){if((e=be(this,e,a,0)??g)===le)return;let o=this._$AH,n=e===g&&o!==g||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==g&&(o===g||n);n&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nt=class{constructor(e,a,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){be(this,e)}};var ln=Ie.litHtmlPolyfillSupport;ln?.(ze,Fe),(Ie.litHtmlVersions??(Ie.litHtmlVersions=[])).push("3.3.3");var za=(t,e,a)=>{let o=a?.renderBefore??e,n=o._$litPart$;if(n===void 0){let r=a?.renderBefore??null;o._$litPart$=n=new Fe(e.insertBefore(Re(),r),r,void 0,a??{})}return n._$AI(t),n};var Be=globalThis,j=class extends J{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;let e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=za(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return le}};j._$litElement$=!0,j.finalized=!0,Be.litElementHydrateSupport?.({LitElement:j});var cn=Be.litElementPolyfillSupport;cn?.({LitElement:j});(Be.litElementVersions??(Be.litElementVersions=[])).push("4.2.2");var Ue="0.7.2";var He={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",display_mode:"match",standings_title:"",standings_icon:"mdi:format-list-numbered",standings_popup_detailed:!1,show_form:!0,show_venue:!0,show_watermark:!0,show_calendar_logos:!0,show_standings_logos:!0};var Fa={nextOpponent:["prochain_match_adversaire","next_match_opponent"],nextDate:["prochain_match_date","next_match_date"],nextLocation:["prochain_match_lieu","next_match_location"],nextVenue:["prochain_match_terrain","next_match_venue","next_match_venue_type"],lastScore:["dernier_match_score","last_match_score"],lastOpponent:["dernier_match_adversaire","last_match_opponent"],lastResult:["dernier_match_resultat","last_match_result"],lastDate:["dernier_match_date","last_match_date"],poule:["poule","pool"],rank:["classement","rank"],rankEvolution:["classement_evolution","rank_evolution"],form:["forme_recente","recent_form","form"]},Ba={matchInProgress:["match_en_cours","match_in_progress"]},It=["prochain_match","next_match","dernier_match","last_match","classement","rank","poule","pool","forme_recente","recent_form","form","game_day","jour_de_match","match_en_cours","match_in_progress"],sr=new RegExp(`^(sensor|binary_sensor)\\.([a-z0-9_]+?)_(${It.join("|")})`),Rt="ffbb_tracker",dn={nextOpponent:"next_match_opponent",nextDate:"next_match_date",nextLocation:"next_match_location",nextVenue:"next_match_venue_type",lastScore:"last_match_score",lastOpponent:"last_match_opponent",lastResult:"last_match_result",lastDate:"last_match_date",poule:"poule",rank:"rank",rankEvolution:"rank_evolution",form:"form",matchInProgress:"match_in_progress"},Ua=new Map(Object.entries(dn).map(([t,e])=>[e,t]));var hn=["win","loss","draw"],A="/local/community/ha-ffbb-tracker-card/brand/icon.png";function Ve(t){return typeof t=="string"?t:typeof t=="number"?String(t):""}function F(t){return Ve(t).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function Ha(t){return Ve(t).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\bphase\s*(\d+)\b/g,"phase$1").replace(/([a-z0-9])[^a-z0-9]+(?=\d)/g,"$1_").replace(/[^a-z0-9_]/g,"")}function pn(t,e){if(!t||!e)return!1;if(t===e)return!0;let[a,o]=t.length<=e.length?[t,e]:[e,t],n=/\d$/.test(a.replace(/_/g,""));for(let r=o.indexOf(a);r!==-1;r=o.indexOf(a,r+1))if(un(o.slice(0,r),o.slice(r+a.length),n))return!0;return!1}function ae(t,e){let a=F(t),o=F(e);return!a||!o?!1:a===o?!0:pn(Ha(t),Ha(e))}var Va=/u(?:7|8|9|1\d|20|21)[mf]?|(?:nm|nf|rm|rf|dm|df|pm|pf)\d|phase\d+/g;function un(t,e,a){let o=t.replace(Va,"").replace(/_/g,""),n=e.replace(Va,""),r=n.startsWith("_"),s=n.replace(/_/g,"");return/(^|\D)1$/.test(s)&&!(s==="1"&&a&&!r)&&(s=s.slice(0,-1)),!/\d/.test(o)&&!/\d/.test(s)}var ja={fr:{win:"V",loss:"D",draw:"N"},en:{win:"W",loss:"L",draw:"D"}};function zt(t){return String(t??"").trim().toLowerCase()}function Ft(t,e){let a=String(t??"").trim().toUpperCase();if(!a)return null;let o=zt(e);if(o){let n=ja[o]||ja.en,r=Object.keys(n).find(s=>n[s]===a);if(r)return r}return a==="V"||a==="W"?"win":a==="L"?"loss":a==="N"?"draw":a==="D"?o?null:"loss":null}function Bt(t,e){return Ft(t,e)??"draw"}function je(t,e,a){let o=zt(e);return!o||typeof t!="string"||!a?t:t.split("-").map(n=>{let r=Ft(n,o);return r&&a[r]||n}).join("-")}function ot(t,e,a){let o=zt(e);if(!o||typeof t!="string"||!a)return t;let n=/^(\d+)\s*([A-Za-z])$/.exec(t.trim());if(!n)return t;let r=Ft(n[2],o);return r?`${n[1]}${a[r]||n[2]}`:t}function qa(t,e,a){return typeof t!="string"||!t.trim()?[]:t.split("-").map(o=>o.trim()).filter(Boolean).map(o=>({char:je(o,e,a),result:Bt(o,e)}))}function Ut(t,e){if(typeof t?.is_home=="boolean")return{isHomeMyTeam:t.is_home,isAwayMyTeam:!t.is_home};let a=!!e(t?.home_team||""),o=!!e(t?.away_team||"");if(!a&&!o){if(y(t?.home_team)&&!y(t?.away_team))return{isHomeMyTeam:!1,isAwayMyTeam:!0};if(y(t?.away_team)&&!y(t?.home_team))return{isHomeMyTeam:!0,isAwayMyTeam:!1}}return{isHomeMyTeam:a,isAwayMyTeam:o}}function rt(t,e,a=null){if(!t||!e)return null;let o=gn(t,e),n=fn(t,e,a);if(!n)return o;let r={};for(let s of Object.keys(o))r[s]=n[s]??o[s];return r}function fn(t,e,a){let o=a?.[t];if(!o?.device_id||o.platform&&o.platform!==Rt)return null;let n={},r=!1;for(let[s,i]of Object.entries(a)){if(i?.device_id!==o.device_id||i.platform&&i.platform!==Rt)continue;let l=Ua.get(i.translation_key);l&&e[s]&&(n[l]=e[s],r=!0)}return r?n:null}function mn(t,e,a){let o=r=>{for(let s of r)if(a[s])return a[s];return null},n={};for(let[r,s]of Object.entries(Fa))n[r]=o(s.map(i=>`${t}${i}`));for(let[r,s]of Object.entries(Ba))n[r]=o(s.map(i=>`${e}${i}`));return n}function gn(t,e){let a=t.slice(t.indexOf(".")+1),o=[];for(let s=1;s<a.length;s++)if(a[s]==="_"&&It.some(i=>a.startsWith(i,s+1))){let i=a.slice(0,s);o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}if(o.length===0){let s=a.lastIndexOf("_"),i=s>0?a.slice(0,s):a;o.push([`sensor.${i}_`,`binary_sensor.${i}_`])}let n=null,r=-1;for(let[s,i]of o){let l=mn(s,i,e),d=Object.values(l).filter(Boolean).length;d>r&&(n=l,r=d)}return n}function y(t){let e=String(t??"").trim().toLowerCase();return e==="exempt"||e==="n/a"}function de(t,e){let a=F(e||"");if(!a||y(e))return()=>!1;let o=(Array.isArray(t)?t:[]).some(n=>{if(y(n))return!1;let r=F(n||"");return!!r&&r===a});return n=>{if(y(n))return!1;let r=F(n||"");return r?o?r===a:ae(n,e):!1}}function Ga(t){return!t||typeof t!="string"?null:t.trim().split(/[?#]/)[0].replace(/\/+$/,"").toLowerCase()||null}function _n(t,e,{opponentUrl:a=null}={}){if(Array.isArray(e)&&a){let r=Ga(a),s=r?e.find(i=>!i||y(i.team_name||i.name)?!1:[i.team_url,i.url,i.link].some(l=>Ga(l)===r)):null;if(s)return s.position??s.rank}if(!t||y(t)||!Array.isArray(e))return null;let o=F(t);if(!o)return null;let n=e.find(r=>{if(!r)return!1;let s=r.team_name||r.name;if(y(s))return!1;let i=F(s);return!!(i&&i===o)});if(n||(n=e.find(r=>{if(!r)return!1;let s=r.team_name||r.name;return y(s)?!1:ae(s,t)})),!n){let r=o.replace(/\d+$/,"");if(r&&r!==o){let s=e.filter(i=>{if(!i)return!1;let l=i.team_name||i.name;if(y(l))return!1;let d=F(l);return!!d&&d.startsWith(r)});s.length===1&&F(s[0].team_name||s[0].name)===r&&(n=s[0])}}return n?n.position??n.rank:null}function xe(t,e){if(t==null||t===""||isNaN(Number(t)))return null;let a=parseInt(t,10);if(a<=0)return null;if(e==="fr")return a===1?"1er":`${a}e`;let o=a%10,n=a%100;return o===1&&n!==11?`${a}st`:o===2&&n!==12?`${a}nd`:o===3&&n!==13?`${a}rd`:`${a}th`}function Ht(t,e){if(typeof t!="string")return null;let a=t.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);if(!a)return null;let[,o,n]=a;return e?{my:o,opponent:n,mineFirst:!0}:{my:n,opponent:o,mineFirst:!1}}function bn(t,e,a){let o=s=>/^\d+$/.test(String(s??"").trim())?Number(s):null,n=o(e?.team_score),r=o(e?.opponent_score);if(n===null||r===null){let s=typeof t=="string"?t.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/):null;if(!s)return t;n=Number(s[1]),r=Number(s[2])}return a?`${n} - ${r}`:`${r} - ${n}`}function nt(t,e,a){if(!Array.isArray(e)||y(t))return null;let o=F(t);if(!o)return null;let n=e.find(r=>{let s=r?.team_name||r?.name||"";if(y(s))return!1;let i=F(s);return!!(i&&i===o)});if(n||(n=e.find(r=>{let s=r?.team_name||r?.name||"";return y(s)?!1:ae(s,t)})),!n)return null;for(let r of a)if(n[r]){let s=E(n[r]);if(s)return s}return null}function yn(t){if(!Array.isArray(t)||t.length<2)return t;let e=t.map(a=>{let o=parseInt(String(a?.round??"").trim(),10);return Number.isFinite(o)?o:null});return e.some(a=>a===null)||new Set(e).size!==e.length?t:t.map((a,o)=>({m:a,r:e[o]})).sort((a,o)=>a.r-o.r).map(a=>a.m)}function Vt(t,e){return yn(xn(t,e))}function xn(t,e){let a=t?.poule?.attributes?.calendar||t?.poule?.attributes?.matches||t?.poule?.attributes?.schedule;if(Array.isArray(a)&&a.length>0)return a;let o=t?.nextDate?.attributes?.calendar||t?.nextDate?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let n=t?.rank?.attributes?.calendar||t?.rank?.attributes?.matches;if(Array.isArray(n)&&n.length>0)return n;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function E(t){if(!t||typeof t!="string")return null;let e=t.trim();return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/local/")||e.startsWith("/api/")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function Wa(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);return isNaN(a.getTime())?!1:a.getFullYear()===e.getFullYear()&&a.getMonth()===e.getMonth()&&a.getDate()===e.getDate()}function Za(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);if(isNaN(a.getTime()))return!1;let o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),n=new Date(o);n.setDate(n.getDate()+2);let r=e.getTime();return r>=a.getTime()&&r<n.getTime()}function wn(t,e=new Date){if(!t||t==="unknown"||t==="unavailable")return!1;let a=new Date(t);if(isNaN(a.getTime()))return!1;let o=new Date(a.getFullYear(),a.getMonth(),a.getDate()),n=new Date(o);return n.setDate(n.getDate()-1),e.getTime()>=n.getTime()}var jt=3;function qt(t){let e=Number(t?.nextDate?.attributes?.result_grace_hours);return Number.isFinite(e)&&e>0?e:jt}var Qa=t=>t?t.score?String(t.score):t.home_score!=null&&t.away_score!=null?`${t.home_score} - ${t.away_score}`:"":"",we=t=>!!(t&&(t.is_played||Qa(t))),X=t=>Date.parse(t?.date??t?.datetime);function st(t,e=new Date,a=jt){if(!t||t.is_exempt||we(t))return!1;let o=X(t);return Number.isNaN(o)?!1:e.getTime()-o>a*36e5}function Ka(t,e=new Date){if(!Array.isArray(t))return-1;let a=-1,o=-1/0;for(let n=0;n<t.length;n++){let r=t[n],s=r?.date??r?.datetime;if(r&&!we(r)&&s&&Za(s,e)){let i=X(r),l=Number.isFinite(i)?i:-1/0;(a===-1||l>=o)&&(a=n,o=l)}}return a}function vn(t){if(!Array.isArray(t)||t.length===0)return 0;let e=-1,a=-1/0;for(let o=0;o<t.length;o++){let n=X(t[o]);Number.isFinite(n)&&(e===-1||n>=a)&&(e=o,a=n)}return e!==-1?e:t.length-1}function $n(t){if(!Array.isArray(t))return-1;let e=-1,a=-1/0;for(let o=0;o<t.length;o++){if(!we(t[o]))continue;let n=X(t[o]),r=Number.isFinite(n)?n:-1/0;(e===-1||r>=a)&&(e=o,a=r)}return e}function Gt(t,e=new Date,a=jt){if(!Array.isArray(t))return-1;let o=s=>!!s?.is_exempt,n=s=>{let i=-1,l=1/0;return t.forEach((d,u)=>{if(!s(d))return;let f=X(d),p=Number.isFinite(f)?f:1/0;(i===-1||p<l)&&(i=u,l=p)}),i},r=n(s=>!o(s)&&!we(s)&&!st(s,e,a));return r!==-1?r:n(s=>!o(s)&&!we(s))}function Ya(t,e,a){if(!Array.isArray(t)||!Number.isInteger(e)||e<0||e>=t.length)return-1;let o=t.map((i,l)=>l),n=o.filter(i=>Number.isFinite(X(t[i]))),r=[...n].sort((i,l)=>X(t[i])-X(t[l])||i-l);n.forEach((i,l)=>{o[i]=r[l]});let s=o.indexOf(e)+(a==="prev"?-1:1);return s>=0&&s<o.length?o[s]:-1}function kn(t,{matchNumber:e,dateStr:a}={}){if(!Array.isArray(t))return-1;let o=String(e??"").trim();if(o){let r=t.findIndex(s=>String(s?.match_number??"").trim()===o);if(r!==-1)return r}let n=Date.parse(a);return Number.isNaN(n)?-1:t.findIndex(r=>X(r)===n)}function Sn({defaultView:t="auto",manualView:e=null,isLive:a=!1,lastDate:o=null,hasLastScore:n=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:i=!1,nextIsStale:l=!1,now:d=new Date}={}){return a||!r?!1:e!==null?e==="last":t==="next"?!1:t==="last"?!(!n||i&&!l&&wn(s,d)):!!(n&&(l||Za(o,d)))}var An=["match","standings","both"];function ce(t){return t&&t!=="unknown"&&t!=="unavailable"?t:""}function it(t){return An.includes(t?.display_mode)?t.display_mode:"match"}var Ja=3,Cn=3,En=2;function Xa(t){let e=Number.isFinite(t)&&t>0?t:0;return Cn+Math.ceil(e/En)}function eo({config:t,standings:e}={}){let a=it(t),o=Array.isArray(e)?e.length:0;return a==="match"?Ja:a==="standings"?Xa(o):Ja+Xa(o)}function lt(t){return Array.isArray(t)?[...t].sort((e,a)=>{let o=n=>{let r=parseInt(n?.position??n?.rank,10);return isNaN(r)?999:r};return o(e)-o(a)}):[]}function Mn(t,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(t,e):null}var Tn=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function qe(t,e=Mn){if(typeof t!="string")return!1;let a=t.trim();if(!a||/[;{}<>\\"']/.test(a))return!1;let o=e("color",a);return typeof o=="boolean"?o:Tn.test(a)}function Ln(t){let e=t?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&qe(t?.custom_accent_color)?t.custom_accent_color.trim():"#ff6b00"}function to(t,e){if(t==="12"||t==="am_pm")return!0;if(t==="24"||t==="twenty_four")return!1;let a=t==="system"?void 0:e;try{let o=new Intl.DateTimeFormat(a,{hour:"numeric"}).resolvedOptions();return typeof o.hour12=="boolean"?o.hour12:o.hourCycle==="h12"||o.hourCycle==="h11"}catch{return!1}}function Wt(t,e="en-US",{hour12:a}={}){if(!t||t==="unknown"||t==="unavailable")return null;let o=new Date(t);if(isNaN(o.getTime()))return null;let n=typeof a=="boolean"?{hour:a?"numeric":"2-digit",minute:"2-digit",hourCycle:a?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},r=s=>({weekday:o.toLocaleDateString(s,{weekday:"short"}),day:o.toLocaleDateString(s,{day:"numeric",month:"short"}),time:o.toLocaleTimeString(s,n)});try{return r(e||"en-US")}catch{return r("en-US")}}function Pt({isHome:t=!0,isMyTeam:e=t,teamName:a="",entities:o={},opponentSensor:n=null,selectedEntity:r=null}={}){let s=(i,l)=>{if(!i||typeof i!="object")return null;for(let d of l)if(i[d]){let u=E(i[d]);if(u)return u}return null};if(e){let i=s(n?.attributes,["team_url","team_link"]);if(i)return i;let l=[r,o?.nextDate,o?.lastDate,o?.rank];for(let f of l){let p=s(f?.attributes,["team_url","team_link"]);if(p)return p}let d=o?.rank?.attributes?.standings||r?.attributes?.standings,u=nt(a,d,["team_url","url","link"]);if(u)return u}else{let i=s(n?.attributes,["opponent_url","opponent_team_url","opponent_link"]);if(i)return i;let l=o?.rank?.attributes?.standings||r?.attributes?.standings,d=nt(a,l,["team_url","url","link"]);if(d)return d}return null}function ct({teamName:t="",matchLogo:e=null,isMyTeam:a=!1,myTeamLogo:o=null,nextOpponentState:n=null,nextOpponentLogo:r=null,lastOpponentState:s=null,lastOpponentLogo:i=null,standings:l=null}={}){let d=E(e);if(d)return d;let u=E(o);if(a&&u&&u!==A)return u;if(F(t)&&!y(t)){if(n&&!y(n)&&ae(n,t)){let p=E(r);if(p)return p}if(s&&!y(s)&&ae(s,t)){let p=E(i);if(p)return p}if(Array.isArray(l)&&l.length>0){let p=nt(t,l,["team_logo_url","opponent_logo_url","logo_url","logo","team_logo","club_logo","crest","image","image_url","badge"]);if(p)return p}}return a&&u?u:A}function ao({entities:t={},config:e={},manualView:a=null,matchIndex:o=null,states:n={},lang:r="fr",locale:s=null,hour12:i=void 0,t:l=(p,h="")=>h,isPreview:d=!1,now:u=new Date,instanceLanguage:f=""}={}){let p=k=>!!(k&&k!=="unknown"&&k!=="unavailable"),h=!!(t.matchInProgress&&t.matchInProgress.state==="on"),m=t.lastScore?.state,_=p(m),S=t.nextDate?.state,v=p(S),V=_||p(t.lastOpponent?.state)||p(t.lastDate?.state),P=v||p(t.nextOpponent?.state),M=e.entity&&n?n[e.entity]:null,$=Vt(t,M),x=Array.isArray($)&&$.length>0,L=x?$n($):-1,C=qt(t),he=x?Gt($,u,C):-1,q=x&&he===-1&&Ka($,u)===-1&&!v&&_&&!h&&a===null&&e.default_match_view!=="next"||Sn({defaultView:e.default_match_view||"auto",manualView:a,isLive:h,lastDate:t.lastDate?.state,hasLastScore:_,hasLastMatch:V,nextDate:S,hasNextMatch:v,nextIsStale:!!t.nextDate?.attributes?.is_stale&&Date.parse(S)<Date.parse(t.lastDate?.state),now:u}),Z=x&&!h&&!q&&a===null&&e.default_match_view!=="next"&&typeof o!="number"?Ka($,u):-1,G=typeof o=="number"&&!h?o:Z!==-1?Z:null,B=k=>x?kn($,{matchNumber:t[k]?.attributes?.match_number,dateStr:t[k]?.state}):-1,U=(k,Q)=>k!==-1?k:Q,W=B("lastDate"),$e=B("nextDate"),I=U(W,L),N=U($e,he),Qt=x?vn($):0,D;typeof G=="number"&&x?D=Math.max(0,Math.min(G,$.length-1)):a==="last"?D=I!==-1?I:0:a==="next"?D=N!==-1?N:Qt:q?D=I!==-1?I:0:D=N!==-1?N:Qt;let w=typeof G=="number"&&x&&!!$[D]?$[D]:null,T=w?we(w):q,fo=!h&&(x&&$.length>1||V&&P),Ge=x&&$.length>1,ea=Ge?Ya($,D,"prev"):-1,ta=Ge?Ya($,D,"next"):-1,mo=Ge?ea!==-1:!T,go=Ge?ta!==-1:T,_o=!T&&!h&&(w?!!(w.date&&Wa(w.date,u)):v&&Wa(S,u)),pe=t.poule?.attributes?.team||"",aa=Ve(e.custom_team_name).trim(),oe=aa||pe||l("card.unknown_team","My team"),b,K,Y,ke,Se,We,Ke,Ye,Je,Xe,Ze,Ae,ut,Ce,H,R=T?t.lastOpponent:t.nextOpponent,ue=R?.state;if(w){let k=w.home_team||"",Q=w.away_team||"",vt=de([k,Q],pe||oe),{isHomeMyTeam:Ko}=Ut(w,vt);b=Ko,K=b?Q:k,Y=K;let ge=O=>t[O]?.attributes,Yo=ge("nextOpponent")?.team_logo_url||ge("lastOpponent")?.team_logo_url||ge("nextDate")?.team_logo_url||ge("lastDate")?.team_logo_url||null,ua=t.rank?.attributes?.standings,$t=T?D===I:D===N,fa=$t?E(R?.attributes?.opponent_logo_url):null,ma=(O,_e,Me)=>{let Te=ct({teamName:O,matchLogo:_e,isMyTeam:Me,myTeamLogo:Yo,nextOpponentState:t.nextOpponent?.state,nextOpponentLogo:ge("nextOpponent")?.opponent_logo_url,lastOpponentState:t.lastOpponent?.state,lastOpponentLogo:ge("lastOpponent")?.opponent_logo_url,standings:ua});return Te===A&&!Me&&!y(O)&&fa?fa:Te},ga=ma(k,w.home_logo||w.home_team_logo,b),_a=ma(Q,w.away_logo||w.away_team_logo,!b);ke=b?ga:_a,Se=b?_a:ga;let ba=(O,_e)=>!y(O)&&!y(_e)&&ae(O,_e),ya=(O,_e,Me)=>{if(!Me&&y(O))return null;let Te=E(_e);if(Te)return Te;if(Me)return Pt({isHome:!0,teamName:pe||oe,entities:t,opponentSensor:R,selectedEntity:M});if($t){let Le=E(R?.attributes?.opponent_url);if(Le)return Le}for(let Le of[t.nextOpponent,t.lastOpponent])if(ba(Le?.state,O)){let xa=E(Le?.attributes?.opponent_url);if(xa)return xa}return nt(O,ua,["team_url","url","link"])};We=ya(k,w.home_url,b),Ke=ya(Q,w.away_url,!b),Ye=E(b?w.away_url:w.home_url)||($t?E(R?.attributes?.opponent_url):null)||[t.nextOpponent,t.lastOpponent].map(O=>ba(O?.state,K)?E(O?.attributes?.opponent_url):null).find(Boolean)||null,Je=w.gym_name||"",Xe=w.gym_city||"",Ze=w.formatted_address||"",Ae=w.date??w.datetime??null,ut=String(w.round??""),Ce=!!w.is_stale,H=!!w.is_exempt||y(K)}else{K=p(ue)?ue:l("card.unknown_opponent","Opponent"),Y=p(ue)?ue:"",b=T?t.lastScore?.attributes?.is_home??t.lastDate?.attributes?.is_home??!0:t.nextVenue?.state==="home"||t.nextOpponent?.attributes?.is_home===!0,ke=E(R?.attributes?.team_logo_url)||A,Se=E(R?.attributes?.opponent_logo_url)||A;let k=pe||oe,Q=b?k:Y,vt=b?Y:k;We=Pt({isHome:b,teamName:Q,entities:t,opponentSensor:R,selectedEntity:M}),Ke=Pt({isHome:!b,teamName:vt,entities:t,opponentSensor:R,selectedEntity:M}),Ye=E(R?.attributes?.opponent_url)||E(R?.attributes?.opponent_team_url)||null,ut=T?t.lastDate?.attributes?.round||"":t.nextDate?.attributes?.round||"",T?(Je=t.lastDate?.attributes?.gym_name||"",Xe=t.lastDate?.attributes?.gym_city||"",Ze=t.lastDate?.attributes?.formatted_address||""):(Je=t.nextLocation?.attributes?.gym_name||t.nextOpponent?.attributes?.gym_name||"",Xe=t.nextLocation?.attributes?.gym_city||t.nextOpponent?.attributes?.gym_city||"",Ze=t.nextLocation?.attributes?.formatted_address||t.nextOpponent?.attributes?.formatted_address||""),Ae=T?t.lastDate?.state:t.nextDate?.state,Ce=!!t.nextDate?.attributes?.is_stale,H=!T&&(!!t.nextDate?.attributes?.is_exempt||y(ue))}H&&(K=l("card.exempt","Bye"),Y="",Ye=null,b?Ke=null:We=null);let bo=b?oe:K,yo=b?K:oe,xo=b?ke:Se,wo=b?Se:ke,ft=pe||oe,vo=b?ft:Y,$o=b?Y:ft,oa=H?null:R?.entity_id,ko=b?e.entity:oa,So=b?oa:e.entity,Ao=ce(t.poule?.attributes?.competition),Co=ce(t.poule?.state),Eo=Wt(Ae,s||r,{hour12:i}),fe={win:l("card.form_letter_win","W"),loss:l("card.form_letter_loss","L"),draw:l("card.form_letter_draw","D")},na=ot(t.form?.attributes?.current_streak||"",f,fe),Qe=t.form?.state,mt=p(Qe)?je(Qe,f,fe):Qe,Ee=p(mt),Mo=Ee?mt:d?je("V-V-D-V-N","fr",fe):"",To=Ee?qa(Qe,f,fe):d?qa("V-V-D-V-N","fr",fe):[],Lo=Ee?na:d?ot("2V","fr",fe):"",No=e.show_form&&(Ee||d),Do=!!e.show_venue&&x&&$.some(k=>k&&(k.gym_name||k.gym_city)),Oo=e.show_title!==!1,gt=Ve(e.title).trim(),me=l("card.default_title","Next match");h?me=l("card.live_title","Live match"):T?me=!!w&&L!==-1&&D!==L?l("card.played_title","Played match"):l("card.last_title","Last match"):H?me=l("card.exempt_title","Bye week"):Ce&&(me=l("card.postponed_title","Postponed match"));let Io=gt?`${gt} \u2022 ${me}`:me,Ro=e.icon!==void 0?e.icon:"mdi:basketball",Po=`logo-box-${e.logo_size||"medium"}`,zo=it(e),Fo=Ve(e.standings_title).trim()||l("card.standings_title","Standings"),Bo=e.standings_icon!==void 0?e.standings_icon:"mdi:format-list-numbered",ra=e.show_rank!==!1,_t=t.rank?.state,sa=p(_t)?_t:null,ia=H?null:_n(Y,t.rank?.attributes?.standings,{opponentUrl:Ye}),bt=xe(sa,r),yt=xe(ia,r),xt=b?bt:yt,wt=b?yt:bt;d&&ra&&(!xt&&(b||!H)&&(xt=xe(b?2:5,r)),!wt&&(!b||!H)&&(wt=xe(b?5:2,r)));let la=w||(!T&&$e!==-1?$[$e]:null),ca=!!la&&!T&&!h&&!Ce&&!H&&st(la,u,C),Uo=!h&&!T&&!ca&&!H&&!!Ae,Ho=e.logo_click_action&&e.logo_click_action!=="none",Vo=Array.isArray(t.rank?.attributes?.standings)&&t.rank.attributes.standings.length>0,jo=Ln(e),da=!w||T&&D===I,qo=da&&p(t.lastScore?.state)?bn(t.lastScore.state,t.lastScore.attributes,b):null,ha=Qa(w)||qo||"-",pa=k=>hn.includes(k)?k:null,Go=pa(w?.result)||(da?pa(t.lastResult?.state):null),Wo=Ht(ha,b);return{isValidState:p,isLive:h,lastScoreState:m,hasLastScore:_,nextDateState:S,hasNextMatch:v,hasLastMatchData:V,hasNextMatchData:P,canToggleView:fo,canGoPrev:mo,canGoNext:go,chevronPrevIndex:ea,chevronNextIndex:ta,currentIndex:D,hasCalendar:x,calendarMatches:$,displayedScore:ha,displayedResult:Go,scoreParts:Wo,isPostMatch:T,isGameDay:_o,currentOpponentSensor:R,officialTeamName:pe,configuredTeamName:aa,teamName:oe,rawOpponent:ue,opponentName:K,opponentSearchName:Y,isHome:b,teamLogoUrl:ke,opponentLogoUrl:Se,leftName:bo,rightName:yo,leftLogo:xo,rightLogo:wo,searchTeamName:ft,leftMatchName:vo,rightMatchName:$o,leftUrl:We,rightUrl:Ke,leftEntityId:ko,rightEntityId:So,competition:Ao,pouleName:Co,roundNumber:ut,gymName:Je,gymCity:Xe,gymAddress:Ze,targetDateStr:Ae,dateFormatted:Eo,formStreak:na,formSequence:mt,hasValidForm:Ee,isPreview:d,displayFormSequence:Mo,displayFormTokens:To,displayFormStreak:Lo,showFormBlock:No,reserveVenueRow:Do,showTitle:Oo,configuredTitle:gt,titleText:Io,titleIcon:Ro,displayMode:zo,standingsTitle:Fo,standingsIcon:Bo,logoSizeClass:Po,showRank:ra,rawUserRank:_t,userRankNum:sa,opponentRankNum:ia,userRankFormatted:bt,opponentRankFormatted:yt,leftRank:xt,rightRank:wt,isCalendarClickable:Uo,isLogoClickable:Ho,hasStandingsData:Vo,accentColor:jo,isStale:Ce,isExempt:H,isResultPending:ca}}var oo={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",postponed_title:"Match report\xE9",exempt:"Exempt",exempt_title:"Journ\xE9e d'exempt",result_pending:"R\xE9sultat en attente",result_pending_short:"En attente",win:"Victoire",loss:"D\xE9faite",draw:"Nul",your_score:"Notre score",home_short:"DOM",away_short:"EXT",opponent_score:"Score adversaire",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_letter_win:"V",form_letter_loss:"D",form_letter_draw:"N",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",table_group_matches:"Rencontres",table_irregularities:"I",table_penalties:"P\xE9n.",table_forfeits:"For.",table_defaults:"D\xE9f.",table_group_penalties:"P\xE9nalit\xE9s",table_referee:"Arb",table_coach:"Ent",table_group_points:"Points",table_scored:"M",table_conceded:"E",table_diff:"D",table_played_full:"Matchs jou\xE9s",table_wins_full:"Victoires",table_losses_full:"D\xE9faites",table_draws_full:"Matchs nuls",table_irregularities_full:"Irr\xE9gularit\xE9s",table_penalties_full:"P\xE9nalit\xE9s (total)",table_forfeits_full:"Forfaits",table_defaults_full:"D\xE9fauts",table_referee_full:"P\xE9nalit\xE9s arbitrage",table_coach_full:"P\xE9nalit\xE9s entra\xEEneur",table_scored_full:"Points marqu\xE9s",table_conceded_full:"Points encaiss\xE9s",table_diff_full:"Diff\xE9rence de points",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",played_title:"Match jou\xE9",last_title:"Dernier match",kickoff:"Coup d'envoi",calendar_details:"Match FFBB\xA0: {home} vs {away}"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",entity_missing:"\xAB {entity} \xBB n'existe plus (sans doute renomm\xE9e) : s\xE9lectionnez-la \xE0 nouveau.",entity_suggestion:"Suggestion : {entity}",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_size_extra_large:"Tr\xE8s grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",title_helper:"Laissez vide pour un titre dynamique par d\xE9faut (\xAB Prochain match \xBB / \xAB Match en direct \xBB / \xAB Dernier match \xBB). Si renseign\xE9, il s'affiche en pr\xE9fixe devant ce titre dynamique.",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",standings_popup_detailed:"Classement d\xE9taill\xE9 dans la popup",standings_popup_detailed_helper:"Affiche le tableau complet (m\xEAmes colonnes que la carte classement secondaire) \xE0 la place du tableau simple.",display_mode:"Cartes \xE0 afficher",display_mode_match:"Carte match uniquement (par d\xE9faut)",display_mode_standings:"Carte classement uniquement",display_mode_both:"Carte match + carte classement",standings_card_section:"Carte classement ind\xE9pendante",standings_title:"Titre de la carte classement",standings_title_helper:"Laissez vide pour utiliser le titre par d\xE9faut",standings_icon:"Ic\xF4ne de la carte classement",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan",show_calendar_logos:"Logos d'\xE9quipe dans les lignes du calendrier",show_standings_logos:"Logos d'\xE9quipe dans les lignes de classement (popup et carte autonome)"}};var no={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",postponed_title:"Postponed match",exempt:"Bye",exempt_title:"Bye week",result_pending:"Result pending",result_pending_short:"Pending",win:"Win",loss:"Loss",draw:"Draw",your_score:"Our score",home_short:"HOME",away_short:"AWAY",opponent_score:"Opponent score",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_letter_win:"W",form_letter_loss:"L",form_letter_draw:"D",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",table_group_matches:"Games",table_irregularities:"I",table_penalties:"Pen.",table_forfeits:"Forf.",table_defaults:"Def.",table_group_penalties:"Penalties",table_referee:"Ref",table_coach:"Coach",table_group_points:"Points",table_scored:"F",table_conceded:"A",table_diff:"D",table_played_full:"Games played",table_wins_full:"Wins",table_losses_full:"Losses",table_draws_full:"Draws",table_irregularities_full:"Irregularities",table_penalties_full:"Penalties (total)",table_forfeits_full:"Forfeits",table_defaults_full:"Defaults",table_referee_full:"Referee penalties",table_coach_full:"Coach penalties",table_scored_full:"Points scored (for)",table_conceded_full:"Points conceded (against)",table_diff_full:"Points difference",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",played_title:"Played match",last_title:"Last match",kickoff:"Kick-off",calendar_details:"FFBB match: {home} vs {away}"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",entity_missing:'"{entity}" no longer exists (probably renamed): select it again.',entity_suggestion:"Suggestion: {entity}",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team logo size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_size_extra_large:"Extra Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",title_helper:'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix in front of that dynamic title.',icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",standings_popup_detailed:"Detailed standings in popup",standings_popup_detailed_helper:"Show the full table (same columns as the secondary standings card) instead of the simple one.",display_mode:"Cards to display",display_mode_match:"Match card only (default)",display_mode_standings:"Standings card only",display_mode_both:"Match card + standings card",standings_card_section:"Standalone standings card",standings_title:"Standings card title",standings_title_helper:"Leave blank for the default title",standings_icon:"Standings card icon",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos",show_calendar_logos:"Team logos in the calendar rows",show_standings_logos:"Team logos in standings rows (popup and standalone card)"}};var ro={fr:oo,en:no};function dt(t){return(t?.locale?.language||t?.language||"en").substring(0,2).toLowerCase()}function ve(t){return ro[t]||ro.en}function ht(t,e,a=""){if(!t||!e)return a;let o=e.split("."),n=t;for(let r of o){if(!n||typeof n!="object"||!(r in n))return a;n=n[r]}return typeof n=="string"?n:a}var so=ne`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
    position: relative;
    container-type: inline-size;
    --ffbb-logo-cap: max(44px, calc((100cqw - clamp(118px, 38cqw, 144px) - 76px) / 2));
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
    padding: clamp(4px, 1.6cqw, 6px);
  }
  .logo-box-large {
    width: 104px;
    height: 104px;
    width: min(104px, var(--ffbb-logo-cap, 104px));
    height: min(104px, var(--ffbb-logo-cap, 104px));
    border-radius: 19.5%;
    padding: clamp(5px, 2cqw, 8px);
  }
  .logo-box-extra_large {
    width: 136px;
    height: 136px;
    width: min(136px, var(--ffbb-logo-cap, 136px));
    height: min(136px, var(--ffbb-logo-cap, 136px));
    border-radius: 19.5%;
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
  .footer-form.clickable:hover .form-label {
    color: var(--ffbb-accent-color, #ff6b00);
  }
  .form-label {
    margin-right: 0;
    transition: color 0.15s ease;
  }
  .form-sequence {
    font-weight: 700;
    letter-spacing: 2px;
  }
  .form-char-win {
    color: #2e7d32;
    color: color-mix(in srgb, #2eae36 75%, var(--primary-text-color));
  }
  .form-char-loss {
    color: #d32f2f;
    color: color-mix(in srgb, #e53935 78%, var(--primary-text-color));
  }
  .form-char-draw {
    color: var(--secondary-text-color);
  }
  .form-sep {
    color: var(--secondary-text-color);
    opacity: 0.65;
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
    min-height: clamp(56px, 18cqw, 72px);
    padding: clamp(6px, 2cqw, 8px) clamp(3px, 1.5cqw, 10px);
    border-radius: clamp(10px, 3.5cqw, 14px);
    box-sizing: border-box;
  }
  .pill-char {
    font-size: clamp(1.35em, 5.2cqw, 2em);
    font-weight: 800;
    line-height: 1;
  }
  .pill-label {
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
`;var io=["unknown","unavailable"];function On(t,e,a=null){if(pt(t))return!1;let o=t?.team_name||t?.name||"";return a?!!a(o):!o||!e?!1:ae(o,e)}function lo(t){return t==null||t===""?"-":t}function In(t){if(t==null||t==="")return"-";let e=Number(t);return Number.isFinite(e)?e>0?`+${e}`:String(e):t}function Rn(t){let e=Number(t);return t==null||t===""||!Number.isFinite(e)||e===0?"":e>0?"diff-pos":"diff-neg"}var Pn={matches:[{key:"table_played",fb:"J",full:"table_played_full",fullFb:"Games played",get:t=>t.played},{key:"table_wins",fb:"G",full:"table_wins_full",fullFb:"Wins",get:t=>t.wins??t.won},{key:"table_losses",fb:"P",full:"table_losses_full",fullFb:"Losses",get:t=>t.losses??t.lost},{key:"table_draws",fb:"N",full:"table_draws_full",fullFb:"Draws",get:t=>t.draws}],singles:[{key:"table_irregularities",fb:"I",full:"table_irregularities_full",fullFb:"Irregularities",get:t=>t.irregularities},{key:"table_penalties",fb:"P\xE9n.",full:"table_penalties_full",fullFb:"Penalties",get:t=>t.total_penalties},{key:"table_forfeits",fb:"For.",full:"table_forfeits_full",fullFb:"Forfeits",get:t=>t.forfeits},{key:"table_defaults",fb:"D\xE9f.",full:"table_defaults_full",fullFb:"Defaults",get:t=>t.defaults}],penalties:[{key:"table_referee",fb:"Arb",full:"table_referee_full",fullFb:"Referee penalties",get:t=>t.referee_penalties},{key:"table_coach",fb:"Ent",full:"table_coach_full",fullFb:"Coach penalties",get:t=>t.coach_penalties}],points:[{key:"table_scored",fb:"M",full:"table_scored_full",fullFb:"Points scored",get:t=>t.points_for},{key:"table_conceded",fb:"E",full:"table_conceded_full",fullFb:"Points conceded",get:t=>t.points_against},{key:"table_diff",fb:"D",full:"table_diff_full",fullFb:"Points difference",get:t=>t.points_diff,signed:!0}]};function Kt(t,e=!0){if(!e)return g;let a=E(t)||A;return c`
    <img
      class="col-team-logo"
      src=${a}
      alt=""
      @error=${o=>{o.target.src.endsWith(A)||(o.target.src=A)}}
    />
  `}function pt(t){let e=String(t?.team_name??t?.name??"").trim().toLowerCase();return e==="n/a"||e==="exempt"}function Yt(t,e){return pt(t)?e("card.exempt","Bye"):t?.team_name||t?.name||"-"}function Jt({rows:t,teamName:e,displayTeamName:a,t:o,showLogos:n=!0}){let r=de((Array.isArray(t)?t:[]).map(m=>m?.team_name||m?.name||""),e),{matches:s,singles:i,penalties:l,points:d}=Pn,u=m=>o(`card.${m.key}`,m.fb),f=m=>o(`card.${m.full}`,m.fullFb),p=m=>c`<th class="sub-head" scope="col"><abbr title=${f(m)}>${u(m)}</abbr></th>`,h=(m,_)=>{let S=m.get(_);return m.signed?c`<td class="num ${Rn(S)}">${In(S)}</td>`:c`<td class="num">${lo(S)}</td>`};return c`
    <div class="standings-scroll">
      <table class="standings-table standings-table-detailed">
        <thead>
          <tr class="group-row">
            <th class="col-pos" rowspan="2" scope="col">#</th>
            <th class="col-team" rowspan="2" scope="col">${o("card.table_team","Team")}</th>
            <th class="single-head" rowspan="2" scope="col">${o("card.table_pts","Pts")}</th>
            <th class="group-head" colspan=${s.length} scope="colgroup">${o("card.table_group_matches","Games")}</th>
            ${i.map(m=>c`<th class="single-head" rowspan="2" scope="col" title=${f(m)}><abbr title=${f(m)}>${u(m)}</abbr></th>`)}
            <th class="group-head" colspan=${l.length} scope="colgroup">${o("card.table_group_penalties","Penalties")}</th>
            <th class="group-head" colspan=${d.length} scope="colgroup">${o("card.table_group_points","Points")}</th>
          </tr>
          <tr class="sub-row">
            ${s.map(p)}
            ${l.map(p)}
            ${d.map(p)}
          </tr>
        </thead>
        <tbody>
          ${t.map(m=>{let _=On(m,e,r),S=_&&a?a:Yt(m,o);return c`
              <tr class=${_?"highlight-row my-team-row":""}>
                <td class="pos-cell col-pos">${m.position||m.rank||"-"}</td>
                <td class="col-team">${Kt(m.logo_url,n)}<span>${S}</span></td>
                <td class="pts-cell">${lo(m.points??m.pts)}</td>
                ${s.map(v=>h(v,m))}
                ${i.map(v=>h(v,m))}
                ${l.map(v=>h(v,m))}
                ${d.map(v=>h(v,m))}
              </tr>
            `})}
        </tbody>
      </table>
    </div>
  `}function co({standings:t,poule:e,competition:a,teamName:o,displayTeamName:n,accentColor:r,title:s,icon:i,compact:l,showLogos:d=!0,t:u}){let f=lt(t),p=e&&!io.includes(e)?e:"",h=a&&!io.includes(a)?a:"",m=s||u("card.standings_title","Standings"),_=i!==void 0?i:"mdi:format-list-numbered";return c`
    <ha-card class="standings-card ${l?"standings-compact":""}" style="--ffbb-accent-color: ${r};">
      <div class="standings-card-header">
        ${_?c`<ha-icon icon=${_}></ha-icon>`:g}
        <span>${m}${p?` \u2022 ${p}`:""}</span>
      </div>
      ${h?c`<div class="standings-card-subtitle">${h}</div>`:g}
      <div class="standings-card-body">
        ${f.length>0?Jt({rows:f,teamName:o,displayTeamName:n,t:u,showLogos:d}):c`<div class="standings-empty-text">${u("card.no_standings","No standings data available.")}</div>`}
      </div>
    </ha-card>
  `}var ho=ne`
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
`;var Xt=class extends j{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return ne`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=ve("fr")}setConfig(e){this._config={entity:"",...He,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let a=dt(this.hass);a!==this._translationsLang&&(this._translationsLang=a,this._translations=ve(a))}}_t(e,a=""){return ht(this._translations,e,a)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),a=String(this._config?.custom_accent_color??"").trim();return a&&!qe(a)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_entityHelper(){let e=this._t("editor.entity_helper","Select any sensor belonging to the team"),a=String(this._config?.entity??"").trim(),o=this.hass?.states;if(!a||!o||Object.keys(o).length===0||Object.prototype.hasOwnProperty.call(o,a))return e;let n=this._t("editor.entity_missing",'"{entity}" no longer exists (probably renamed): select it again.').replace("{entity}",a),r=this._suggestEntity(a,o);if(!r)return`\u26A0 ${n}`;let s=this._t("editor.entity_suggestion","Suggestion: {entity}").replace("{entity}",r);return`\u26A0 ${n} ${s}`}_suggestEntity(e,a){let o=rt(e,a,this.hass?.entities);return[o.poule,o.nextDate,...Object.values(o)].map(r=>r?.entity_id).find(r=>typeof r=="string"&&r.startsWith("sensor."))??""}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let a={...e.detail.value},o=["entity","custom_team_name","title","icon","custom_accent_color","standings_title","standings_icon"];for(let s of o)(!(s in a)||a[s]===void 0||a[s]===null)&&(a[s]="");let n={...this._config,...a},r=new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return c``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._entityHelper(),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),helper:this._t("editor.title_helper",'Leave blank for a dynamic default title ("Next match" / "Live match" / "Last match"). If filled in, it is shown as a prefix before that dynamic title.'),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team logo size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")},{value:"extra_large",label:this._t("editor.logo_size_extra_large","Extra Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}},{name:"show_calendar_logos",label:this._t("editor.show_calendar_logos","Team logos in the calendar rows"),default:!0,selector:{boolean:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}},{name:"standings_popup_detailed",label:this._t("editor.standings_popup_detailed","Detailed standings in popup"),helper:this._t("editor.standings_popup_detailed_helper","Show the full table (same columns as the secondary standings card) instead of the simple one."),default:!1,selector:{boolean:{}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}},{name:"standings_card",type:"expandable",title:this._t("editor.standings_card_section","Standalone standings card"),icon:"mdi:card-multiple-outline",flatten:!0,schema:[{name:"display_mode",label:this._t("editor.display_mode","Cards to display"),default:"match",selector:{select:{mode:"dropdown",options:[{value:"match",label:this._t("editor.display_mode_match","Match card only (default)")},{value:"standings",label:this._t("editor.display_mode_standings","Standings card only")},{value:"both",label:this._t("editor.display_mode_both","Match card + standings card")}]}}},...this._config.display_mode!=="match"?[{name:"standings_title",label:this._t("editor.standings_title","Standings card title"),helper:this._t("editor.standings_title_helper","Leave blank for the default title"),selector:{text:{}}},{name:"standings_icon",label:this._t("editor.standings_icon","Standings card icon"),selector:{icon:{}}},{name:"show_standings_logos",label:this._t("editor.show_standings_logos","Team logos in standings rows (popup and standalone card)"),default:!0,selector:{boolean:{}}}]:[]]}];return c`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${a=>a.label||a.title}
        .computeHelper=${a=>a.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${Ue}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Xt);var Zt=class extends j{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=ve("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...He}}getCardSize(){let e=this._config?this._resolveEntities():null;return eo({config:this._config,standings:e?.rank?.attributes?.standings})}getGridOptions(){return{columns:12,min_columns:9,min_rows:3}}setConfig(e){if(!e||!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");let a={...He,...e},o=this._config;o&&((o.entity!==a.entity||o.default_match_view!==a.default_match_view)&&(this._matchIndex=null,this._manualView=null),(o.entity!==a.entity||it(a)==="standings")&&(this._activeModal=null)),this._config=a,this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:a}=this._config,o=String(a??"").trim();e!=="custom"||!o||qe(o)||this._warnedAccentColor!==o&&(this._warnedAccentColor=o,console.warn(`[FFBB Tracker Card] custom_accent_color "${o}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let a=dt(this.hass);a!==this._translationsLang&&(this._translationsLang=a,this._translations=ve(a))}}_t(e,a=""){return ht(this._translations,e,a)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none")return"";let o=String(e).trim().match(/^(\d+)/);if(!o)return"";let n=parseInt(o[1],10);return n===1?"rank-gold":n===2?"rank-silver":n===3?"rank-bronze":""}_resolveEntities(){return rt(this._config.entity,this.hass?.states,this.hass?.entities)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:to(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:a,hour12:o}=this._localeInfo();return Wt(e,a,{hour12:o})}_openMaps(e,a,o=""){let n=encodeURIComponent(o?.trim()||`${e} ${a}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${n}`,"_blank","noreferrer")}_openCalendar(e,a,o,n,r,s=""){if(!e||e==="unknown"||e==="unavailable")return;let i=new Date(e);if(isNaN(i.getTime()))return;let l=new Date(i.getTime()+7200*1e3),d=m=>m.toISOString().replace(/[-:]|\.\d{3}/g,""),u=`${a} vs ${o}`,f=s?.trim()||`${n} ${r}`.trim(),p=this._t("card.calendar_details","FFBB match: {home} vs {away}").replace(/\{(home|away)\}/g,(m,_)=>_==="home"?a:o),h=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(u)}&dates=${d(i)}/${d(l)}&details=${encodeURIComponent(p)}&location=${encodeURIComponent(f)}`;window.open(h,"_blank","noreferrer")}_handleLogoClick(e,a,o){if(y(o)||o===this._t("card.exempt","Bye"))return;let n=this._config.logo_click_action||"team_url";n==="team_url"?a?window.open(a,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${o}".`),e&&this._fireMoreInfo(e)):n==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let a=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(a)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let a=e.get("_activeModal");if(this._activeModal&&!a)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&a){let o=this._modalTrigger;this._modalTrigger=null,o&&o.isConnected&&typeof o.focus=="function"&&o.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let a=e.currentTarget.querySelector(".modal-card");if(!a)return;let o=[...a.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(o.length===0){e.preventDefault(),a.focus();return}let n=o[0],r=o[o.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===n||s===a)?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),n.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,a){if(!(e==="prev"&&a.canGoPrev===!1||e==="next"&&a.canGoNext===!1))if(a.hasCalendar&&a.calendarMatches.length>1){let o=e==="prev"?a.chevronPrevIndex:a.chevronNextIndex;if(Number.isInteger(o)&&o>=0&&o<a.calendarMatches.length){this._matchIndex=o;let n=a.calendarMatches[o],r=!!(n.score||n.home_score!=null&&n.away_score!=null);this._manualView=n.is_played||r?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,a){let o=this._config?this._resolveEntities():null;o?.matchInProgress&&o.matchInProgress.state==="on"||(this._matchIndex=e,this._manualView=a?"last":"next"),this._closeModal()}_onKeyActivate(e){return a=>{(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),e())}}_extractCalendarMatches(e){let a=this._config.entity?this.hass?.states[this._config.entity]:null;return Vt(e,a)}_renderScoreParts(e){let a=c`<span class="score-mine">${e.my}</span>`,o=c`<span class="score-theirs">${e.opponent}</span>`,n=c`<span class="score-sep"> - </span>`;return e.mineFirst===!1?c`${o}${n}${a}`:c`${a}${n}${o}`}_renderModal(e,a,o,n){if(!this._activeModal)return c``;if(this._activeModal==="standings"){let r=e.rank?.attributes?.standings||[],s=lt(r),i=ce(e.poule?.attributes?.competition),l=ce(e.poule?.state),d=s.map(h=>h.team_name||h.name||""),u=de(d,a),f=de(d,o),p=!!this._config?.standings_popup_detailed;return c`
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
              ${s.length===0?c`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings","No standings data available.")}
                    </div>
                  `:p?Jt({rows:s,teamName:a,displayTeamName:n,t:(h,m)=>this._t(h,m),showLogos:this._config.show_standings_logos!==!1}):c`
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
                        ${s.map(h=>{let m=h.team_name||h.name||"",_=pt(h),S=!_&&u(m),v=S||!_&&f(m),V=S&&n?n:Yt(h,(P,M)=>this._t(P,M));return c`
                            <tr class=${[v?"highlight-row":"",S?"my-team-row":""].filter(Boolean).join(" ")}>
                              <td class="pos-cell">${h.position||h.rank||"-"}</td>
                              <td class="col-team">${Kt(h.logo_url,this._config.show_standings_logos!==!1)}<span>${V}</span></td>
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
      `}if(this._activeModal==="form"){let r=e.form?.state,s=r&&r!=="unknown"&&r!=="unavailable",i=s?r:"",l=this.hass?.config?.language||"",d={win:this._t("card.form_letter_win","W"),loss:this._t("card.form_letter_loss","L"),draw:this._t("card.form_letter_draw","D")},u=s?ot(e.form?.attributes?.current_streak||"",l,d):"",f=i.split("-").filter(Boolean);return c`
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
                      ${f.map(p=>{let h=Bt(p,l),m=`badge-${h}`,_=this._t(`card.${h}`,h),S=je(p,l,d);return c`
                          <div class="form-badge-pill ${m}">
                            <span class="pill-char">${S}</span>
                            <span class="pill-label">${_}</span>
                          </div>
                        `})}
                    </div>
                    ${u?c`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${u}</strong>
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
      `}if(this._activeModal==="calendar"){let r=this._extractCalendarMatches(e),s=ce(e.poule?.attributes?.competition),i=ce(e.poule?.state),l=r.flatMap(_=>[_.home_team||"",_.away_team||""]),d=de(l,a),u=new Date,f=qt(e),p=Gt(r,u,f),h=e.nextOpponent?.attributes?.team_logo_url||e.lastOpponent?.attributes?.team_logo_url||e.nextDate?.attributes?.team_logo_url||A,m=e.rank?.attributes?.standings;return c`
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
            ${s?c`<div class="modal-subtitle">${s}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${r.length>0?c`
                    <div class="calendar-list">
                      ${r.map((_,S)=>{let v=_.home_team||"-",V=_.away_team||"-",P=!!_.is_exempt||y(_.home_team)||y(_.away_team),M=P?"":_.score||(_.home_score!=null&&_.away_score!=null?`${_.home_score} - ${_.away_score}`:""),$=this._formatDate(_.date||_.datetime),{isHomeMyTeam:x,isAwayMyTeam:L}=Ut(_,d),C=x||L,he=!!(_.is_played||M),z=null;P&&(x!==L?z=x?"away":"home":z=y(v)||/^exempt/i.test(v)?"home":"away");let q=this._t("card.exempt","Bye"),Z=z==="home"?q:v,G=z==="away"?q:V,B=S===p,U=st(_,u,f),W=z==="home"?A:ct({teamName:Z,matchLogo:_.home_logo||_.home_team_logo,isMyTeam:x,myTeamLogo:h,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:m}),$e=z==="away"?A:ct({teamName:G,matchLogo:_.away_logo||_.away_team_logo,isMyTeam:L,myTeamLogo:h,nextOpponentState:e.nextOpponent?.state,nextOpponentLogo:e.nextOpponent?.attributes?.opponent_logo_url,lastOpponentState:e.lastOpponent?.state,lastOpponentLogo:e.lastOpponent?.attributes?.opponent_logo_url,standings:m}),I="";return P?I="":x?I="home":L&&(I="away"),c`
                          <div
                            class="calendar-row ${C?"highlight-row":""} ${B?"next-match-row":""} ${P?"bye-row":""}"
                            @click=${()=>this._selectCalendarMatch(S,he)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(S,he))}
                            role="button"
                            tabindex="0"
                            aria-label="${x&&n?n:Z} vs ${L&&n?n:G}"
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
                                <span class="cal-team ${x?"my-team-text":""} ${z==="home"?"bye-text":""}">${x&&n?n:Z}</span>
                              </div>
                              <div class="cal-team-line">
                                ${this._config.show_calendar_logos!==!1?c`
                                      <img
                                        class="cal-mini-logo"
                                        src=${$e}
                                        alt=""
                                        @error=${N=>{N.target.src.endsWith(A)||(N.target.src=A)}}
                                      />
                                    `:g}
                                <span class="cal-team ${L?"my-team-text":""} ${z==="away"?"bye-text":""}">${L&&n?n:G}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${M?c`
                                    ${$?c`<div class="cal-date">${$.day}</div>`:g}
                                    <div class="cal-score">
                                      ${(()=>{let N=C?Ht(M,x):null;return N?this._renderScoreParts(N):M})()}
                                    </div>
                                  `:$?c`
                                    <div class="cal-date">${$.day}</div>
                                    ${U?c`<div class="cal-pending" title=${this._t("card.result_pending","Result pending")}>${this._t("card.result_pending_short","Pending")}</div>`:c`<div class="cal-time">${P?"-":$.time}</div>`}
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
      `}return c``}_computeViewModel(e){let{language:a,hour12:o}=this._localeInfo();return ao({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:a,hour12:o,t:(n,r)=>this._t(n,r),instanceLanguage:this.hass?.config?.language||"",isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return c``;let e=this._resolveEntities();if(!e)return c`
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

      ${a.displayMode!=="match"?co({standings:e.rank?.attributes?.standings,poule:e.poule?.state,competition:e.poule?.attributes?.competition,teamName:a.searchTeamName,displayTeamName:a.configuredTeamName,accentColor:a.accentColor,title:a.standingsTitle,icon:a.standingsIcon,compact:a.displayMode==="both",showLogos:this._config.show_standings_logos!==!1,t:(o,n)=>this._t(o,n)}):g}
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
    `}_renderMatchArea(e){let{isLive:a,canToggleView:o,isPostMatch:n,isGameDay:r,leftName:s,rightName:i,leftLogo:l,rightLogo:d,leftUrl:u,rightUrl:f,leftEntityId:p,rightEntityId:h,gymName:m,gymCity:_,gymAddress:S,dateFormatted:v,logoSizeClass:V,showRank:P,leftRank:M,rightRank:$,isCalendarClickable:x,isLogoClickable:L,hasStandingsData:C}=e,z=this._config?.rank_badge_style==="solid"?"rank-solid":"",q=this._t("card.exempt","Bye"),Z=e.isExempt&&!e.isHome||y(s)||s===q,G=e.isExempt&&e.isHome||y(i)||i===q,B=!!(L&&!Z),U=!!(L&&!G);return c`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${V} ${B?"clickable":""}"
            @click=${()=>{B&&this._handleLogoClick(p,u,s)}}
            @keydown=${B?this._onKeyActivate(()=>this._handleLogoClick(p,u,s)):g}
            role=${B?"button":g}
            tabindex=${B?"0":g}
            aria-label=${B?this._t("card.view_team","View {team}").replace("{team}",s):g}
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
            class="center-meta ${x?"clickable":""}"
            @click=${()=>{x&&this._openCalendar(e.targetDateStr,s,i,m,_,S)}}
            @keydown=${x?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,s,i,m,_,S)):g}
            role=${x?"button":g}
            tabindex=${x?"0":g}
            aria-label=${x?this._t("card.add_to_calendar","Add to Google Calendar"):g}
            title=${x?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${a?c`
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
                  ${r&&!e.isStale&&!e.isExempt&&!e.isResultPending?c`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
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
            @click=${()=>{U&&this._handleLogoClick(h,f,i)}}
            @keydown=${U?this._onKeyActivate(()=>this._handleLogoClick(h,f,i)):g}
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
          <div class="team-title">${s}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${i}</div>
        </div>

        ${P&&(M||$)?c`
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
                ${$?c`
                      <span
                        class="rank-badge ${this._getRankClass($)} ${z} ${C?"clickable-badge":""}"
                        @click=${()=>{C&&this._openModal("standings")}}
                        @keydown=${C?this._onKeyActivate(()=>this._openModal("standings")):g}
                        role=${C?"button":g}
                        tabindex=${C?"0":g}
                        aria-label=${C?this._t("card.view_standings","View league standings"):g}
                        title=${C?this._t("card.view_standings","View league standings"):""}
                      >${$}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:a,gymCity:o,gymAddress:n,hasValidForm:r,isPreview:s,displayFormSequence:i,displayFormTokens:l,displayFormStreak:d,showFormBlock:u,reserveVenueRow:f}=e;return c`
      ${u?c`
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
              <span class="form-sequence">${Array.isArray(l)&&l.length>0?l.map((p,h)=>c`${h>0?c`<span class="form-sep">-</span>`:g}<span class="form-char form-char-${p.result}">${p.char}</span>`):i}</span>${d?c`<span class="form-streak">(${d})</span>`:""}
              ${!r&&s?c`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
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
          `:this._config.show_venue&&f?c`
              <div class="footer-venue footer-venue-empty" aria-hidden="true">
                <div class="venue-info">
                  <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                  <span class="venue-text">&nbsp;</span>
                </div>
              </div>
            `:""}
    `}static get styles(){return[so,ho]}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Zt);console.info(`%c FFBB Tracker Card %c v${Ue} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var po=window.customCards.findIndex(t=>t.type==="ffbb-tracker-card"),uo={type:"ffbb-tracker-card",name:`FFBB Tracker v${Ue}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};po!==-1?window.customCards[po]=uo:window.customCards.push(uo);
