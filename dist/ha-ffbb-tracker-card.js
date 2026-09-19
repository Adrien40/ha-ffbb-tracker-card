var fe=globalThis,_e=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ze=Symbol(),nt=new WeakMap,ee=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(_e&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=nt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&nt.set(t,e))}return e}toString(){return this.cssText}},rt=n=>new ee(typeof n=="string"?n:n+"",void 0,ze),te=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((a,o,r)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[r+1],n[0]);return new ee(t,n,ze)},st=(n,e)=>{if(_e)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),o=fe.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=t.cssText,n.appendChild(a)}},Pe=_e?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return rt(t)})(n):n;var{is:ha,defineProperty:ua,getOwnPropertyDescriptor:pa,getOwnPropertyNames:ma,getOwnPropertySymbols:fa,getPrototypeOf:_a}=Object,z=globalThis,it=z.trustedTypes,ga=it?it.emptyScript:"",ba=z.reactiveElementPolyfillSupport,ae=(n,e)=>n,Ie={toAttribute(n,e){switch(e){case Boolean:n=n?ga:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ct=(n,e)=>!ha(n,e),lt={attribute:!0,type:String,converter:Ie,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),z.litPropertyMetadata??(z.litPropertyMetadata=new WeakMap);var L=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=lt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(e,a,t);o!==void 0&&ua(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){let{get:o,set:r}=pa(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){let d=o?.call(this);r?.call(this,s),this.requestUpdate(e,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??lt}static _$Ei(){if(this.hasOwnProperty(ae("elementProperties")))return;let e=_a(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ae("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ae("properties"))){let t=this.properties,a=[...ma(t),...fa(t)];for(let o of a)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,o]of t)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let o=this._$Eu(t,a);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let o of a)t.unshift(Pe(o))}else e!==void 0&&t.push(Pe(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return st(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(o!==void 0&&a.reflect===!0){let r=(a.converter?.toAttribute!==void 0?a.converter:Ie).toAttribute(t,a.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let a=this.constructor,o=a._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let r=a.getPropertyOptions(o),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ie;this._$Em=o;let d=s.fromAttribute(t,r.type);this[o]=d??this._$Ej?.get(o)??d,this._$Em=null}}requestUpdate(e,t,a,o=!1,r){if(e!==void 0){let s=this.constructor;if(o===!1&&(r=this[e]),a??(a=s.getPropertyOptions(e)),!((a.hasChanged??ct)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:r},s){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,r]of a){let{wrapped:s}=r,d=this[o];s!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,r,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};L.elementStyles=[],L.shadowRootOptions={mode:"open"},L[ae("elementProperties")]=new Map,L[ae("finalized")]=new Map,ba?.({ReactiveElement:L}),(z.reactiveElementVersions??(z.reactiveElementVersions=[])).push("2.1.2");var ne=globalThis,dt=n=>n,ge=ne.trustedTypes,ht=ge?ge.createPolicy("lit-html",{createHTML:n=>n}):void 0,gt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+P,va=`<${bt}>`,F=document,re=()=>F.createComment(""),se=n=>n===null||typeof n!="object"&&typeof n!="function",qe=Array.isArray,ya=n=>qe(n)||typeof n?.[Symbol.iterator]=="function",Ue=`[ 	
\f\r]`,oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,I=RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,ft=/"/g,vt=/^(?:script|style|textarea|title)$/i,Ke=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=Ke(1),Pa=Ke(2),Ia=Ke(3),B=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),_t=new WeakMap,U=F.createTreeWalker(F,129);function yt(n,e){if(!qe(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ht!==void 0?ht.createHTML(e):e}var xa=(n,e)=>{let t=n.length-1,a=[],o,r=e===2?"<svg>":e===3?"<math>":"",s=oe;for(let d=0;d<t;d++){let l=n[d],c,u,i=-1,f=0;for(;f<l.length&&(s.lastIndex=f,u=s.exec(l),u!==null);)f=s.lastIndex,s===oe?u[1]==="!--"?s=ut:u[1]!==void 0?s=pt:u[2]!==void 0?(vt.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=I):u[3]!==void 0&&(s=I):s===I?u[0]===">"?(s=o??oe,i=-1):u[1]===void 0?i=-2:(i=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?I:u[3]==='"'?ft:mt):s===ft||s===mt?s=I:s===ut||s===pt?s=oe:(s=I,o=void 0);let g=s===I&&n[d+1].startsWith("/>")?" ":"";r+=s===oe?l+va:i>=0?(a.push(c),l.slice(0,i)+gt+l.slice(i)+P+g):l+P+(i===-2?d:g)}return[yt(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},ie=class n{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let r=0,s=0,d=e.length-1,l=this.parts,[c,u]=xa(e,t);if(this.el=n.createElement(c,a),U.currentNode=this.el.content,t===2||t===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(o=U.nextNode())!==null&&l.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(let i of o.getAttributeNames())if(i.endsWith(gt)){let f=u[s++],g=o.getAttribute(i).split(P),$=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:$[2],strings:g,ctor:$[1]==="."?Be:$[1]==="?"?Ve:$[1]==="@"?He:q}),o.removeAttribute(i)}else i.startsWith(P)&&(l.push({type:6,index:r}),o.removeAttribute(i));if(vt.test(o.tagName)){let i=o.textContent.split(P),f=i.length-1;if(f>0){o.textContent=ge?ge.emptyScript:"";for(let g=0;g<f;g++)o.append(i[g],re()),U.nextNode(),l.push({type:2,index:++r});o.append(i[f],re())}}}else if(o.nodeType===8)if(o.data===bt)l.push({type:2,index:r});else{let i=-1;for(;(i=o.data.indexOf(P,i+1))!==-1;)l.push({type:7,index:r}),i+=P.length-1}r++}}static createElement(e,t){let a=F.createElement("template");return a.innerHTML=e,a}};function j(n,e,t=n,a){if(e===B)return e;let o=a!==void 0?t._$Co?.[a]:t._$Cl,r=se(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(n),o._$AT(n,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=o:t._$Cl=o),o!==void 0&&(e=j(n,o._$AS(n,e.values),o,a)),e}var Fe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??F).importNode(t,!0);U.currentNode=o;let r=U.nextNode(),s=0,d=0,l=a[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new le(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new je(r,this,e)),this._$AV.push(c),l=a[++d]}s!==l?.index&&(r=U.nextNode(),s++)}return U.currentNode=F,o}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},le=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=j(this,e,t),se(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==B&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ya(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&se(this._$AH)?this._$AA.nextSibling.data=e:this.T(F.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ie.createElement(yt(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{let r=new Fe(o,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=_t.get(e.strings);return t===void 0&&_t.set(e.strings,t=new ie(e)),t}k(e){qe(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,o=0;for(let r of e)o===t.length?t.push(a=new n(this.O(re()),this.O(re()),this,this.options)):a=t[o],a._$AI(r),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=dt(e).nextSibling;dt(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(e,t=this,a,o){let r=this.strings,s=!1;if(r===void 0)e=j(this,e,t,0),s=!se(e)||e!==this._$AH&&e!==B,s&&(this._$AH=e);else{let d=e,l,c;for(e=r[0],l=0;l<r.length-1;l++)c=j(this,d[a+l],t,l),c===B&&(c=this._$AH[l]),s||(s=!se(c)||c!==this._$AH[l]),c===p?e=p:e!==p&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Be=class extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Ve=class extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},He=class extends q{constructor(e,t,a,o,r){super(e,t,a,o,r),this.type=5}_$AI(e,t=this){if((e=j(this,e,t,0)??p)===B)return;let a=this._$AH,o=e===p&&a!==p||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==p&&(a===p||o);o&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},je=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}};var $a=ne.litHtmlPolyfillSupport;$a?.(ie,le),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.3.3");var xt=(n,e,t)=>{let a=t?.renderBefore??e,o=a._$litPart$;if(o===void 0){let r=t?.renderBefore??null;a._$litPart$=o=new le(e.insertBefore(re(),r),r,void 0,t??{})}return o._$AI(n),o};var ce=globalThis,D=class extends L{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};D._$litElement$=!0,D.finalized=!0,ce.litElementHydrateSupport?.({LitElement:D});var wa=ce.litElementPolyfillSupport;wa?.({LitElement:D});(ce.litElementVersions??(ce.litElementVersions=[])).push("4.2.2");var de="0.2.2";var he={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_form:!0,show_venue:!0,show_watermark:!0};var k="/local/community/ha-ffbb-tracker-card/brand/icon.png";function M(n){return(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function At(n,e){if(!n||!e)return null;let t=n.match(/^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/),a=t?`sensor.${t[2]}_`:n.substring(0,n.lastIndexOf("_")+1),o=t?`binary_sensor.${t[2]}_`:a.replace("sensor.","binary_sensor."),r=s=>{for(let d of s)if(e[d])return e[d];return null};return{nextOpponent:r([`${a}prochain_match_adversaire`,`${a}next_match_opponent`]),nextDate:r([`${a}prochain_match_date`,`${a}next_match_date`]),nextLocation:r([`${a}prochain_match_lieu`,`${a}next_match_location`]),nextVenue:r([`${a}prochain_match_terrain`,`${a}next_match_venue_type`]),lastScore:r([`${a}dernier_match_score`,`${a}last_match_score`]),lastOpponent:r([`${a}dernier_match_adversaire`,`${a}last_match_opponent`]),lastResult:r([`${a}dernier_match_resultat`,`${a}last_match_result`]),lastDate:r([`${a}dernier_match_date`,`${a}last_match_date`]),poule:r([`${a}poule`]),rank:r([`${a}classement`,`${a}rank`]),rankEvolution:r([`${a}classement_evolution`,`${a}rank_evolution`]),form:r([`${a}forme_recente`,`${a}form`]),matchInProgress:r([`${o}match_en_cours`,`${o}match_in_progress`])}}function be(n,e){let t=M(e||"");if(!t)return()=>!1;let a=(Array.isArray(n)?n:[]).some(o=>{let r=M(o||"");return!!r&&r===t});return o=>{let r=M(o||"");return r?a?r===t:r.includes(t)||t.includes(r):!1}}function ka(n,e){if(!n||!Array.isArray(e))return null;let t=M(n);if(!t)return null;let a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=M(r);return!!(s&&s===t)});return a||(a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=M(r);return!!(s&&(s.includes(t)||t.includes(s)))})),a?a.position:null}function K(n,e){if(n==null||n===""||isNaN(Number(n)))return null;let t=parseInt(n,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let a=t%10,o=t%100;return a===1&&o!==11?`${t}st`:a===2&&o!==12?`${t}nd`:a===3&&o!==13?`${t}rd`:`${t}th`}function $t(n,e,t){if(!Array.isArray(e))return null;let a=M(n);if(!a)return null;let o=e.find(r=>{let s=M(r?.team_name||r?.name||"");return!!(s&&s===a)});if(o||(o=e.find(r=>{let s=M(r?.team_name||r?.name||"");return!!(s&&(s.includes(a)||a.includes(s)))})),!o)return null;for(let r of t)if(o[r]){let s=Ct(o[r]);if(s)return s}return null}function Ge(n,e){let t=n?.poule?.attributes?.calendar||n?.poule?.attributes?.matches||n?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let a=n?.nextDate?.attributes?.calendar||n?.nextDate?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let o=n?.rank?.attributes?.calendar||n?.rank?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function Ct(n){if(!n||typeof n!="string")return null;let e=n.trim();return e.startsWith("http://")||e.startsWith("https://")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function wt(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Aa(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);o.setDate(o.getDate()+2);let r=e.getTime();return r>=t.getTime()&&r<o.getTime()}function Ca(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);return o.setDate(o.getDate()-1),e.getTime()>=o.getTime()}function Sa({defaultView:n="auto",manualView:e=null,isLive:t=!1,lastDate:a=null,hasLastScore:o=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:d=!1,now:l=new Date}={}){return t||!r?!1:e!==null?e==="last":n==="next"?!1:n==="last"?!(!o||d&&Ca(s,l)):!!(o&&Aa(a,l))}function St(n){return Array.isArray(n)?[...n].sort((e,t)=>{let a=o=>{let r=parseInt(o?.position??o?.rank,10);return isNaN(r)?999:r};return a(e)-a(t)}):[]}function Ma(n,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(n,e):null}var Ea=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function ue(n,e=Ma){if(typeof n!="string")return!1;let t=n.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let a=e("color",t);return typeof a=="boolean"?a:Ea.test(t)}function Na(n){let e=n?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&ue(n?.custom_accent_color)?n.custom_accent_color.trim():"#ff6b00"}function Mt(n,e){if(n==="12"||n==="am_pm")return!0;if(n==="24"||n==="twenty_four")return!1;let t=n==="system"?void 0:e;try{let a=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof a.hour12=="boolean"?a.hour12:a.hourCycle==="h12"||a.hourCycle==="h11"}catch{return!1}}function We(n,e="en-US",{hour12:t}={}){if(!n||n==="unknown"||n==="unavailable")return null;let a=new Date(n);if(isNaN(a.getTime()))return null;let o=a.toLocaleDateString(e,{weekday:"short"}),r=a.toLocaleDateString(e,{day:"numeric",month:"short"}),s=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},d=a.toLocaleTimeString(e,s);return{weekday:o,day:r,time:d}}function kt({isHome:n=!0,isMyTeam:e=n,teamName:t="",entities:a={},opponentSensor:o=null,selectedEntity:r=null}={}){let s=(d,l)=>{if(!d||typeof d!="object")return null;for(let c of l)if(d[c]){let u=Ct(d[c]);if(u)return u}return null};if(e){let d=s(o?.attributes,["team_url","url_equipe","team_link"]);if(d)return d;let l=[r,a?.nextDate,a?.lastDate,a?.rank];for(let i of l){let f=s(i?.attributes,["team_url","url_equipe","team_link"]);if(f)return f}let c=a?.rank?.attributes?.standings||r?.attributes?.standings,u=$t(t,c,["team_url","url","link"]);if(u)return u}else{let d=s(o?.attributes,["opponent_url","opponent_team_url","opponent_link","url_adversaire"]);if(d)return d;let l=a?.rank?.attributes?.standings||r?.attributes?.standings,c=$t(t,l,["team_url","url","link"]);if(c)return c}return null}function Et({entities:n={},config:e={},manualView:t=null,matchIndex:a=null,states:o={},lang:r="fr",locale:s=null,hour12:d=void 0,t:l=(i,f="")=>f,isPreview:c=!1,now:u=new Date}={}){let i=v=>!!(v&&v!=="unknown"&&v!=="unavailable"),f=!!(n.matchInProgress&&n.matchInProgress.state==="on"),g=n.lastScore?.state,$=i(g),E=n.nextDate?.state,O=i(E),N=$||i(n.lastOpponent?.state)||i(n.lastDate?.state),W=O||i(n.nextOpponent?.state),J=e.entity&&o?o[e.entity]:null,b=Ge(n,J),A=Array.isArray(b)&&b.length>0,w=-1,x=-1;if(A){for(let v=b.length-1;v>=0;v--)if(b[v].is_played||b[v].score){w=v;break}x=b.findIndex(v=>!v.is_played&&!v.score)}let y=Sa({defaultView:e.default_match_view||"auto",manualView:t,isLive:f,lastDate:n.lastDate?.state,hasLastScore:$,hasLastMatch:N,nextDate:E,hasNextMatch:O,now:u}),S=0;typeof a=="number"&&A?S=Math.max(0,Math.min(a,b.length-1)):t==="last"?S=w!==-1?w:0:t==="next"?S=x!==-1?x:Math.max(0,b.length-1):y?S=w!==-1?w:0:S=x!==-1?x:0;let m=typeof a=="number"&&A&&!!b[S]?b[S]:null,T=m?!!(m.is_played||m.score):y,zt=!f&&(A&&b.length>1||N&&W),Pt=A&&b.length>1?S>0:!T,It=A&&b.length>1?S<b.length-1:T,Ut=!T&&!f&&(m?!!(m.date&&wt(m.date,u)):O&&wt(E,u)),X=n.poule?.attributes?.team||"",Ye=e.custom_team_name?.trim(),V=Ye||X||l("card.unknown_team","My team"),_=!0,H=l("card.unknown_opponent","Opponent"),R="",Y=k,Z=k,$e=null,we=null,ke="",Ae="",Q=null,Ce="",Se=!1,C=T?n.lastOpponent:n.nextOpponent;if(m){let v=m.home_team||"",me=m.away_team||"";_=m.is_home!==void 0?m.is_home:M(v)===M(X||V),H=_?me:v,R=H,Y=_?m.home_logo||C?.attributes?.team_logo_url||k:m.away_logo||C?.attributes?.team_logo_url||k,Z=_?m.away_logo||C?.attributes?.opponent_logo_url||k:m.home_logo||C?.attributes?.opponent_logo_url||k,$e=_?m.home_url||null:m.away_url||null,we=_?m.away_url||null:m.home_url||null,ke=m.gym_name||"",Ae=m.gym_city||"",Q=m.date||null,Ce=String(m.round??m.journee??""),Se=!!m.is_stale}else{let v=C?.state;H=i(v)?v:l("card.unknown_opponent","Opponent"),R=i(v)?v:"",_=T?n.lastScore?.attributes?.is_home??n.lastDate?.attributes?.is_home??!0:n.nextVenue?.state==="home"||n.nextOpponent?.attributes?.is_home===!0,Y=C?.attributes?.team_logo_url||k,Z=C?.attributes?.opponent_logo_url||k;let me=X||V,ot=_?me:R,da=_?R:me;$e=kt({isHome:_,teamName:ot,entities:n,opponentSensor:C,selectedEntity:J}),we=kt({isHome:!_,teamName:da,entities:n,opponentSensor:C,selectedEntity:J}),Ce=T?n.lastDate?.attributes?.round||"":n.nextDate?.attributes?.round||"",ke=n.nextLocation?.attributes?.gym_name||n.nextOpponent?.attributes?.gym_name||"",Ae=n.nextLocation?.attributes?.gym_city||n.nextOpponent?.attributes?.gym_city||"",Q=T?n.lastDate?.state:n.nextDate?.state,Se=!!n.nextDate?.attributes?.is_stale}let Ft=_?V:H,Bt=_?H:V,Vt=_?Y:Z,Ht=_?Z:Y,Me=X||V,jt=_?Me:R,qt=_?R:Me,Kt=_?e.entity:C?.entity_id,Gt=_?C?.entity_id:e.entity,Wt=n.poule?.attributes?.competition||"",Jt=n.poule?.state||"",Xt=We(Q,s||r,{hour12:d}),Ze=n.form?.attributes?.current_streak||"",Ee=n.form?.state,pe=i(Ee),Yt=pe?Ee:c?"V-V-D-V-N":"",Zt=pe?Ze:c?"2V":"",Qt=e.show_form&&(pe||c),ea=e.show_title!==!1,Qe=e.title?.trim(),Ne=l("card.default_title","Next match");f?Ne=l("card.live_title","Live match"):T&&(Ne=l("card.last_title","Last match"));let ta=Qe||Ne,aa=e.icon!==void 0?e.icon:"mdi:basketball",oa=`logo-box-${e.logo_size||"medium"}`,et=e.show_rank!==!1,Te=n.rank?.state,tt=i(Te)?Te:null,at=ka(R,n.rank?.attributes?.standings),De=K(tt,r),Le=K(at,r),Oe=_?De:Le,Re=_?Le:De;c&&et&&(Oe||(Oe=K(_?2:5,r)),Re||(Re=K(_?5:2,r)));let na=!f&&!T&&!!Q,ra=e.logo_click_action&&e.logo_click_action!=="none",sa=Array.isArray(n.rank?.attributes?.standings)&&n.rank.attributes.standings.length>0,ia=Na(e),la=m?.score||n.lastScore?.state||"-",ca=m?.result||n.lastResult?.state||"draw";return{isValidState:i,isLive:f,lastScoreState:g,hasLastScore:$,nextDateState:E,hasNextMatch:O,hasLastMatchData:N,hasNextMatchData:W,canToggleView:zt,canGoPrev:Pt,canGoNext:It,currentIndex:S,hasCalendar:A,calendarMatches:b,displayedScore:la,displayedResult:ca,isPostMatch:T,isGameDay:Ut,currentOpponentSensor:C,officialTeamName:X,configuredTeamName:Ye,teamName:V,rawOpponent:n.nextOpponent?.state,opponentName:H,opponentSearchName:R,isHome:_,teamLogoUrl:Y,opponentLogoUrl:Z,leftName:Ft,rightName:Bt,leftLogo:Vt,rightLogo:Ht,searchTeamName:Me,leftMatchName:jt,rightMatchName:qt,leftUrl:$e,rightUrl:we,leftEntityId:Kt,rightEntityId:Gt,competition:Wt,pouleName:Jt,roundNumber:Ce,gymName:ke,gymCity:Ae,targetDateStr:Q,dateFormatted:Xt,formStreak:Ze,formSequence:Ee,hasValidForm:pe,isPreview:c,displayFormSequence:Yt,displayFormStreak:Zt,showFormBlock:Qt,showTitle:ea,configuredTitle:Qe,titleText:ta,titleIcon:aa,logoSizeClass:oa,showRank:et,rawUserRank:Te,userRankNum:tt,opponentRankNum:at,userRankFormatted:De,opponentRankFormatted:Le,leftRank:Oe,rightRank:Re,isCalendarClickable:na,isLogoClickable:ra,hasStandingsData:sa,accentColor:ia,isStale:Se}}var Nt={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var Tt={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var Dt={fr:Nt,en:Tt};function ve(n){return(n?.locale?.language||n?.language||"en").substring(0,2).toLowerCase()}function G(n){return Dt[n]||Dt.en}function ye(n,e,t=""){if(!n||!e)return t;let a=e.split("."),o=n;for(let r of a){if(!o||typeof o!="object"||!(r in o))return t;o=o[r]}return typeof o=="string"?o:t}var Lt=te`
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
`;var Je=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return te`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=G("fr")}setConfig(e){this._config={entity:"",...he,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ve(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=G(t))}}_t(e,t=""){return ye(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!ue(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},a=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of a)s in t||(t[s]="");let o={...this._config,...t},r=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return h``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${de}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Je);var Xe=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=G("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...he}}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:9}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...he,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,a=String(t??"").trim();e!=="custom"||!a||ue(a)||this._warnedAccentColor!==a&&(this._warnedAccentColor=a,console.warn(`[FFBB Tracker Card] custom_accent_color "${a}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ve(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=G(t))}}_t(e,t=""){return ye(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none"||this._config?.disable_podium_colors)return"";let a=String(e).trim().match(/^(\d+)/);if(!a)return"";let o=parseInt(a[1],10);return o===1?"rank-gold":o===2?"rank-silver":o===3?"rank-bronze":""}_resolveEntities(){return At(this._config.entity,this.hass?.states)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:Mt(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:a}=this._localeInfo();return We(e,t,{hour12:a})}_openMaps(e,t){let a=encodeURIComponent(`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${a}`,"_blank","noreferrer")}_openCalendar(e,t,a,o,r){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let d=new Date(s.getTime()+7200*1e3),l=g=>g.toISOString().replace(/[-:]|\.\d{3}/g,""),c=`${t} vs ${a}`,u=`${o} ${r}`.trim(),i=`FFBB match: ${t} vs ${a}`,f=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c)}&dates=${l(s)}/${l(d)}&details=${encodeURIComponent(i)}&location=${encodeURIComponent(u)}`;window.open(f,"_blank","noreferrer")}_handleLogoClick(e,t,a){let o=this._config.logo_click_action||"team_url";o==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${a}".`),e&&this._fireMoreInfo(e)):o==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let a=this._modalTrigger;this._modalTrigger=null,a&&a.isConnected&&typeof a.focus=="function"&&a.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let a=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(a.length===0){e.preventDefault(),t.focus();return}let o=a[0],r=a[a.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===o||s===t)?(e.preventDefault(),r.focus()):!e.shiftKey&&s===r&&(e.preventDefault(),o.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let a=e==="prev"?t.currentIndex-1:t.currentIndex+1;if(a>=0&&a<t.calendarMatches.length){this._matchIndex=a;let o=t.calendarMatches[a];this._manualView=o.is_played||o.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return Ge(e,t)}_renderModal(e,t,a){if(!this._activeModal)return h``;if(this._activeModal==="standings"){let o=e.rank?.attributes?.standings||[],r=St(o),s=e.poule?.attributes?.competition||"",d=e.poule?.state||"",l=r.map(i=>i.team_name||i.name||""),c=be(l,t),u=be(l,a);return h`
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
                        ${r.map(i=>{let f=i.team_name||i.name||"",g=c(f)||u(f);return h`
                            <tr class=${g?"highlight-row":""}>
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
      `}if(this._activeModal==="calendar"){let o=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",s=e.poule?.state||"",d=o.flatMap(c=>[c.home_team||c.equipe_domicile||"",c.away_team||c.equipe_exterieur||""]),l=be(d,t);return h`
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
                      ${o.map(c=>{let u=c.home_team||c.equipe_domicile||"-",i=c.away_team||c.equipe_exterieur||"-",f=c.score||(c.home_score!==void 0?`${c.home_score} - ${c.away_score}`:""),g=this._formatDate(c.date||c.datetime),$=l(u),E=l(i);return h`
                          <div class="calendar-row ${$||E?"highlight-row":""}">
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${c.round||c.journee||"-"}</span>
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team ${$?"my-team-text":""}">${u}</div>
                              <div class="cal-team ${E?"my-team-text":""}">${i}</div>
                            </div>
                            <div class="calendar-col-meta">
                              ${f?h`<div class="cal-score">${f}</div>`:g?h`
                                    <div class="cal-date">${g.day}</div>
                                    <div class="cal-time">${g.time}</div>
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
      `}return h``}_computeViewModel(e){let{language:t,hour12:a}=this._localeInfo();return Et({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:a,t:(o,r)=>this._t(o,r),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return h``;let e=this._resolveEntities();if(!e)return h`
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
    `}_renderMatchArea(e,t){let{isLive:a,canToggleView:o,isPostMatch:r,isGameDay:s,leftName:d,rightName:l,leftLogo:c,rightLogo:u,leftUrl:i,rightUrl:f,leftEntityId:g,rightEntityId:$,gymName:E,gymCity:O,dateFormatted:N,logoSizeClass:W,showRank:J,leftRank:b,rightRank:A,isCalendarClickable:w,isLogoClickable:x,hasStandingsData:y}=e,xe=this._config?.rank_badge_style==="solid"||!!this._config?.solid_rank_badges?"rank-solid":"";return h`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${W} ${x?"clickable":""}"
            @click=${()=>this._handleLogoClick(g,i,d)}
            @keydown=${x?this._onKeyActivate(()=>this._handleLogoClick(g,i,d)):p}
            role=${x?"button":p}
            tabindex=${x?"0":p}
            aria-label=${x?this._t("card.view_team","View {team}").replace("{team}",d):p}
          >
            <img
              class="logo"
              src=${c}
              alt=""
              @error=${m=>{m.target.src.endsWith(k)||(m.target.src=k)}}
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
            class="center-meta ${w?"clickable":""}"
            @click=${()=>{w&&this._openCalendar(e.targetDateStr,d,l,E,O)}}
            @keydown=${w?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,d,l,E,O)):p}
            role=${w?"button":p}
            tabindex=${w?"0":p}
            aria-label=${w?this._t("card.add_to_calendar","Add to Google Calendar"):p}
            title=${w?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${a?h`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${N?`${this._t("card.kickoff","Kick-off")} ${N.time}`:""}
                  </div>
                `:r?h`
                  <div class="score-display">
                    ${e.displayedScore}
                  </div>
                  <div class="badge badge-${e.displayedResult}">
                    ${this._t(`card.${e.displayedResult}`)}
                  </div>
                `:h`
                  ${N?h`
                        <div class="match-day">${N.weekday} ${N.day}</div>
                        <div class="match-time">${N.time}</div>
                      `:h`<div class="match-time">-</div>`}
                  ${s&&!e.isStale?h`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
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
            class="logo-box ${W} ${x?"clickable":""}"
            @click=${()=>this._handleLogoClick($,f,l)}
            @keydown=${x?this._onKeyActivate(()=>this._handleLogoClick($,f,l)):p}
            role=${x?"button":p}
            tabindex=${x?"0":p}
            aria-label=${x?this._t("card.view_team","View {team}").replace("{team}",l):p}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${m=>{m.target.src.endsWith(k)||(m.target.src=k)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${d}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${l}</div>
        </div>

        ${J&&(b||A)?h`
              <div class="team-rank-cell rank-left">
                ${b?h`
                      <span
                        class="rank-badge ${this._getRankClass(b)} ${xe} ${y?"clickable-badge":""}"
                        @click=${()=>{y&&this._openModal("standings")}}
                        @keydown=${y?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${y?"button":p}
                        tabindex=${y?"0":p}
                        aria-label=${y?this._t("card.view_standings","View league standings"):p}
                        title=${y?this._t("card.view_standings","View league standings"):""}
                      >${b}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${A?h`
                      <span
                        class="rank-badge ${this._getRankClass(A)} ${xe} ${y?"clickable-badge":""}"
                        @click=${()=>{y&&this._openModal("standings")}}
                        @keydown=${y?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${y?"button":p}
                        tabindex=${y?"0":p}
                        aria-label=${y?this._t("card.view_standings","View league standings"):p}
                        title=${y?this._t("card.view_standings","View league standings"):""}
                      >${A}</span>
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
    `}static get styles(){return Lt}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Xe);console.info(`%c FFBB Tracker Card %c v${de} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var Ot=window.customCards.findIndex(n=>n.type==="ffbb-tracker-card"),Rt={type:"ffbb-tracker-card",name:`FFBB Tracker v${de}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};Ot!==-1?window.customCards[Ot]=Rt:window.customCards.push(Rt);
