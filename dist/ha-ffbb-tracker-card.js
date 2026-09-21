var _e=globalThis,ge=_e.ShadowRoot&&(_e.ShadyCSS===void 0||_e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),st=new WeakMap,ae=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ge&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=st.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&st.set(t,e))}return e}toString(){return this.cssText}},it=r=>new ae(typeof r=="string"?r:r+"",void 0,Ie),oe=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((a,o,n)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[n+1],r[0]);return new ae(t,r,Ie)},lt=(r,e)=>{if(ge)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),o=_e.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=t.cssText,r.appendChild(a)}},Ue=ge?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return it(t)})(r):r;var{is:ha,defineProperty:ua,getOwnPropertyDescriptor:pa,getOwnPropertyNames:ma,getOwnPropertySymbols:fa,getPrototypeOf:_a}=Object,I=globalThis,ct=I.trustedTypes,ga=ct?ct.emptyScript:"",ba=I.reactiveElementPolyfillSupport,re=(r,e)=>r,Be={toAttribute(r,e){switch(e){case Boolean:r=r?ga:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ht=(r,e)=>!ha(r,e),dt={attribute:!0,type:String,converter:Be,reflect:!1,useDefault:!1,hasChanged:ht};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);var z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(e,a,t);o!==void 0&&ua(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){let{get:o,set:n}=pa(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){let d=o?.call(this);n?.call(this,s),this.requestUpdate(e,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??dt}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;let e=_a(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){let t=this.properties,a=[...ma(t),...fa(t)];for(let o of a)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,o]of t)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let o=this._$Eu(t,a);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let o of a)t.unshift(Ue(o))}else e!==void 0&&t.push(Ue(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(o!==void 0&&a.reflect===!0){let n=(a.converter?.toAttribute!==void 0?a.converter:Be).toAttribute(t,a.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){let a=this.constructor,o=a._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let n=a.getPropertyOptions(o),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Be;this._$Em=o;let d=s.fromAttribute(t,n.type);this[o]=d??this._$Ej?.get(o)??d,this._$Em=null}}requestUpdate(e,t,a,o=!1,n){if(e!==void 0){let s=this.constructor;if(o===!1&&(n=this[e]),a??(a=s.getPropertyOptions(e)),!((a.hasChanged??ht)(n,t)||a.useDefault&&a.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:n},s){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,n]of a){let{wrapped:s}=n,d=this[o];s!==!0||this._$AL.has(o)||d===void 0||this.C(o,void 0,n,d)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[re("elementProperties")]=new Map,z[re("finalized")]=new Map,ba?.({ReactiveElement:z}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");var se=globalThis,ut=r=>r,be=se.trustedTypes,pt=be?be.createPolicy("lit-html",{createHTML:r=>r}):void 0,vt="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,xt="?"+U,va=`<${xt}>`,V=document,ie=()=>V.createComment(""),le=r=>r===null||typeof r!="object"&&typeof r!="function",Ge=Array.isArray,xa=r=>Ge(r)||typeof r?.[Symbol.iterator]=="function",Fe=`[ 	
\f\r]`,ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,ft=/>/g,B=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,gt=/"/g,yt=/^(?:script|style|textarea|title)$/i,We=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),h=We(1),Pa=We(2),Ia=We(3),H=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),bt=new WeakMap,F=V.createTreeWalker(V,129);function $t(r,e){if(!Ge(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}var ya=(r,e)=>{let t=r.length-1,a=[],o,n=e===2?"<svg>":e===3?"<math>":"",s=ne;for(let d=0;d<t;d++){let l=r[d],u,c,i=-1,m=0;for(;m<l.length&&(s.lastIndex=m,c=s.exec(l),c!==null);)m=s.lastIndex,s===ne?c[1]==="!--"?s=mt:c[1]!==void 0?s=ft:c[2]!==void 0?(yt.test(c[2])&&(o=RegExp("</"+c[2],"g")),s=B):c[3]!==void 0&&(s=B):s===B?c[0]===">"?(s=o??ne,i=-1):c[1]===void 0?i=-2:(i=s.lastIndex-c[2].length,u=c[1],s=c[3]===void 0?B:c[3]==='"'?gt:_t):s===gt||s===_t?s=B:s===mt||s===ft?s=ne:(s=B,o=void 0);let g=s===B&&r[d+1].startsWith("/>")?" ":"";n+=s===ne?l+va:i>=0?(a.push(u),l.slice(0,i)+vt+l.slice(i)+U+g):l+U+(i===-2?d:g)}return[$t(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},ce=class r{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let n=0,s=0,d=e.length-1,l=this.parts,[u,c]=ya(e,t);if(this.el=r.createElement(u,a),F.currentNode=this.el.content,t===2||t===3){let i=this.el.content.firstChild;i.replaceWith(...i.childNodes)}for(;(o=F.nextNode())!==null&&l.length<d;){if(o.nodeType===1){if(o.hasAttributes())for(let i of o.getAttributeNames())if(i.endsWith(vt)){let m=c[s++],g=o.getAttribute(i).split(U),A=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:A[2],strings:g,ctor:A[1]==="."?He:A[1]==="?"?je:A[1]==="@"?qe:W}),o.removeAttribute(i)}else i.startsWith(U)&&(l.push({type:6,index:n}),o.removeAttribute(i));if(yt.test(o.tagName)){let i=o.textContent.split(U),m=i.length-1;if(m>0){o.textContent=be?be.emptyScript:"";for(let g=0;g<m;g++)o.append(i[g],ie()),F.nextNode(),l.push({type:2,index:++n});o.append(i[m],ie())}}}else if(o.nodeType===8)if(o.data===xt)l.push({type:2,index:n});else{let i=-1;for(;(i=o.data.indexOf(U,i+1))!==-1;)l.push({type:7,index:n}),i+=U.length-1}n++}}static createElement(e,t){let a=V.createElement("template");return a.innerHTML=e,a}};function G(r,e,t=r,a){if(e===H)return e;let o=a!==void 0?t._$Co?.[a]:t._$Cl,n=le(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(r),o._$AT(r,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=o:t._$Cl=o),o!==void 0&&(e=G(r,o._$AS(r,e.values),o,a)),e}var Ve=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??V).importNode(t,!0);F.currentNode=o;let n=F.nextNode(),s=0,d=0,l=a[0];for(;l!==void 0;){if(s===l.index){let u;l.type===2?u=new de(n,n.nextSibling,this,e):l.type===1?u=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(u=new Ke(n,this,e)),this._$AV.push(u),l=a[++d]}s!==l?.index&&(n=F.nextNode(),s++)}return F.currentNode=V,o}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},de=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),le(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==H&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):xa(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&le(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=ce.createElement($t(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{let n=new Ve(o,this),s=n.u(this.options);n.p(t),this.T(s),this._$AH=n}}_$AC(e){let t=bt.get(e.strings);return t===void 0&&bt.set(e.strings,t=new ce(e)),t}k(e){Ge(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,o=0;for(let n of e)o===t.length?t.push(a=new r(this.O(ie()),this.O(ie()),this,this.options)):a=t[o],a._$AI(n),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=ut(e).nextSibling;ut(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(e,t=this,a,o){let n=this.strings,s=!1;if(n===void 0)e=G(this,e,t,0),s=!le(e)||e!==this._$AH&&e!==H,s&&(this._$AH=e);else{let d=e,l,u;for(e=n[0],l=0;l<n.length-1;l++)u=G(this,d[a+l],t,l),u===H&&(u=this._$AH[l]),s||(s=!le(u)||u!==this._$AH[l]),u===p?e=p:e!==p&&(e+=(u??"")+n[l+1]),this._$AH[l]=u}s&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},He=class extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},je=class extends W{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},qe=class extends W{constructor(e,t,a,o,n){super(e,t,a,o,n),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??p)===H)return;let a=this._$AH,o=e===p&&a!==p||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,n=e!==p&&(a===p||o);o&&this.element.removeEventListener(this.name,this,a),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ke=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}};var $a=se.litHtmlPolyfillSupport;$a?.(ce,de),(se.litHtmlVersions??(se.litHtmlVersions=[])).push("3.3.3");var wt=(r,e,t)=>{let a=t?.renderBefore??e,o=a._$litPart$;if(o===void 0){let n=t?.renderBefore??null;a._$litPart$=o=new de(e.insertBefore(ie(),n),n,void 0,t??{})}return o._$AI(r),o};var he=globalThis,D=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=wt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};D._$litElement$=!0,D.finalized=!0,he.litElementHydrateSupport?.({LitElement:D});var wa=he.litElementPolyfillSupport;wa?.({LitElement:D});(he.litElementVersions??(he.litElementVersions=[])).push("4.2.2");var ue="0.2.7";var pe={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_form:!0,show_venue:!0,show_watermark:!0};var w="/local/community/ha-ffbb-tracker-card/brand/icon.png";function E(r){return(r||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function St(r,e){if(!r||!e)return null;let t=r.match(/^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/),a=t?`sensor.${t[2]}_`:r.substring(0,r.lastIndexOf("_")+1),o=t?`binary_sensor.${t[2]}_`:a.replace("sensor.","binary_sensor."),n=s=>{for(let d of s)if(e[d])return e[d];return null};return{nextOpponent:n([`${a}prochain_match_adversaire`,`${a}next_match_opponent`]),nextDate:n([`${a}prochain_match_date`,`${a}next_match_date`]),nextLocation:n([`${a}prochain_match_lieu`,`${a}next_match_location`]),nextVenue:n([`${a}prochain_match_terrain`,`${a}next_match_venue_type`]),lastScore:n([`${a}dernier_match_score`,`${a}last_match_score`]),lastOpponent:n([`${a}dernier_match_adversaire`,`${a}last_match_opponent`]),lastResult:n([`${a}dernier_match_resultat`,`${a}last_match_result`]),lastDate:n([`${a}dernier_match_date`,`${a}last_match_date`]),poule:n([`${a}poule`]),rank:n([`${a}classement`,`${a}rank`]),rankEvolution:n([`${a}classement_evolution`,`${a}rank_evolution`]),form:n([`${a}forme_recente`,`${a}form`]),matchInProgress:n([`${o}match_en_cours`,`${o}match_in_progress`])}}function xe(r,e){let t=E(e||"");if(!t)return()=>!1;let a=(Array.isArray(r)?r:[]).some(o=>{let n=E(o||"");return!!n&&n===t});return o=>{let n=E(o||"");return n?a?n===t:n.includes(t)||t.includes(n):!1}}function ka(r,e){if(!r||!Array.isArray(e))return null;let t=E(r);if(!t)return null;let a=e.find(o=>{if(!o)return!1;let n=o.team_name||o.name,s=E(n);return!!(s&&s===t)});return a||(a=e.find(o=>{if(!o)return!1;let n=o.team_name||o.name,s=E(n);return!!(s&&(s.includes(t)||t.includes(s)))})),a?a.position:null}function J(r,e){if(r==null||r===""||isNaN(Number(r)))return null;let t=parseInt(r,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let a=t%10,o=t%100;return a===1&&o!==11?`${t}st`:a===2&&o!==12?`${t}nd`:a===3&&o!==13?`${t}rd`:`${t}th`}function kt(r,e,t){if(!Array.isArray(e))return null;let a=E(r);if(!a)return null;let o=e.find(n=>{let s=E(n?.team_name||n?.name||"");return!!(s&&s===a)});if(o||(o=e.find(n=>{let s=E(n?.team_name||n?.name||"");return!!(s&&(s.includes(a)||a.includes(s)))})),!o)return null;for(let n of t)if(o[n]){let s=ve(o[n]);if(s)return s}return null}function Je(r,e){let t=r?.poule?.attributes?.calendar||r?.poule?.attributes?.matches||r?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let a=r?.nextDate?.attributes?.calendar||r?.nextDate?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let o=r?.rank?.attributes?.calendar||r?.rank?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let n=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(n)&&n.length>0?n:[]}function ve(r){if(!r||typeof r!="string")return null;let e=r.trim();return e.startsWith("http://")||e.startsWith("https://")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function At(r,e=new Date){if(!r||r==="unknown"||r==="unavailable")return!1;let t=new Date(r);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function Aa(r,e=new Date){if(!r||r==="unknown"||r==="unavailable")return!1;let t=new Date(r);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);o.setDate(o.getDate()+2);let n=e.getTime();return n>=t.getTime()&&n<o.getTime()}function Ca(r,e=new Date){if(!r||r==="unknown"||r==="unavailable")return!1;let t=new Date(r);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);return o.setDate(o.getDate()-1),e.getTime()>=o.getTime()}function Sa({defaultView:r="auto",manualView:e=null,isLive:t=!1,lastDate:a=null,hasLastScore:o=!1,hasLastMatch:n=!0,nextDate:s=null,hasNextMatch:d=!1,now:l=new Date}={}){return t||!n?!1:e!==null?e==="last":r==="next"?!1:r==="last"?!(!o||d&&Ca(s,l)):!!(o&&Aa(a,l))}function Mt(r){return Array.isArray(r)?[...r].sort((e,t)=>{let a=o=>{let n=parseInt(o?.position??o?.rank,10);return isNaN(n)?999:n};return a(e)-a(t)}):[]}function Ma(r,e){return typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports(r,e):null}var Ea=/^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla)\(\s*[\d.]+%?(deg)?\s*[,\s]\s*[\d.]+%?\s*[,\s]\s*[\d.]+%?(\s*[,/]\s*[\d.]+%?)?\s*\))$/i;function me(r,e=Ma){if(typeof r!="string")return!1;let t=r.trim();if(!t||/[;{}<>\\"']/.test(t))return!1;let a=e("color",t);return typeof a=="boolean"?a:Ea.test(t)}function Na(r){let e=r?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&me(r?.custom_accent_color)?r.custom_accent_color.trim():"#ff6b00"}function Et(r,e){if(r==="12"||r==="am_pm")return!0;if(r==="24"||r==="twenty_four")return!1;let t=r==="system"?void 0:e;try{let a=new Intl.DateTimeFormat(t,{hour:"numeric"}).resolvedOptions();return typeof a.hour12=="boolean"?a.hour12:a.hourCycle==="h12"||a.hourCycle==="h11"}catch{return!1}}function Xe(r,e="en-US",{hour12:t}={}){if(!r||r==="unknown"||r==="unavailable")return null;let a=new Date(r);if(isNaN(a.getTime()))return null;let o=a.toLocaleDateString(e,{weekday:"short"}),n=a.toLocaleDateString(e,{day:"numeric",month:"short"}),s=typeof t=="boolean"?{hour:t?"numeric":"2-digit",minute:"2-digit",hourCycle:t?"h12":"h23"}:{hour:"2-digit",minute:"2-digit"},d=a.toLocaleTimeString(e,s);return{weekday:o,day:n,time:d}}function Ct({isHome:r=!0,isMyTeam:e=r,teamName:t="",entities:a={},opponentSensor:o=null,selectedEntity:n=null}={}){let s=(d,l)=>{if(!d||typeof d!="object")return null;for(let u of l)if(d[u]){let c=ve(d[u]);if(c)return c}return null};if(e){let d=s(o?.attributes,["team_url","url_equipe","team_link"]);if(d)return d;let l=[n,a?.nextDate,a?.lastDate,a?.rank];for(let i of l){let m=s(i?.attributes,["team_url","url_equipe","team_link"]);if(m)return m}let u=a?.rank?.attributes?.standings||n?.attributes?.standings,c=kt(t,u,["team_url","url","link"]);if(c)return c}else{let d=s(o?.attributes,["opponent_url","opponent_team_url","opponent_link","url_adversaire"]);if(d)return d;let l=a?.rank?.attributes?.standings||n?.attributes?.standings,u=kt(t,l,["team_url","url","link"]);if(u)return u}return null}function Nt({entities:r={},config:e={},manualView:t=null,matchIndex:a=null,states:o={},lang:n="fr",locale:s=null,hour12:d=void 0,t:l=(i,m="")=>m,isPreview:u=!1,now:c=new Date}={}){let i=$=>!!($&&$!=="unknown"&&$!=="unavailable"),m=!!(r.matchInProgress&&r.matchInProgress.state==="on"),g=r.lastScore?.state,A=i(g),L=r.nextDate?.state,k=i(L),N=A||i(r.lastOpponent?.state)||i(r.lastDate?.state),R=k||i(r.nextOpponent?.state),S=e.entity&&o?o[e.entity]:null,b=Je(r,S),x=Array.isArray(b)&&b.length>0,y=-1,f=-1;if(x){for(let $=b.length-1;$>=0;$--)if(b[$].is_played||b[$].score){y=$;break}f=b.findIndex($=>!$.is_played&&!$.score)}let O=Sa({defaultView:e.default_match_view||"auto",manualView:t,isLive:m,lastDate:r.lastDate?.state,hasLastScore:A,hasLastMatch:N,nextDate:L,hasNextMatch:k,now:c}),C;typeof a=="number"&&x?C=Math.max(0,Math.min(a,b.length-1)):t==="last"?C=y!==-1?y:0:t==="next"?C=f!==-1?f:Math.max(0,b.length-1):O?C=y!==-1?y:0:C=f!==-1?f:0;let _=typeof a=="number"&&x&&!!b[C]?b[C]:null,T=_?!!(_.is_played||_.score):O,Pt=!m&&(x&&b.length>1||N&&R),It=x&&b.length>1?C>0:!T,Ut=x&&b.length>1?C<b.length-1:T,Bt=!T&&!m&&(_?!!(_.date&&At(_.date,c)):k&&At(L,c)),Y=r.poule?.attributes?.team||"",Qe=e.custom_team_name?.trim(),q=Qe||Y||l("card.unknown_team","My team"),v,K,P,Z,Q,we,ke,Ae,Ce,ee,Se,Me,M=T?r.lastOpponent:r.nextOpponent,te=M?.state;if(_){let $=_.home_team||"",Pe=_.away_team||"";v=_.is_home!==void 0?_.is_home:E($)===E(Y||q),K=v?Pe:$,P=K,Z=v?_.home_logo||M?.attributes?.team_logo_url||w:_.away_logo||M?.attributes?.team_logo_url||w,Q=v?_.away_logo||M?.attributes?.opponent_logo_url||w:_.home_logo||M?.attributes?.opponent_logo_url||w,we=ve(_.home_url),ke=ve(_.away_url),Ae=_.gym_name||"",Ce=_.gym_city||"",ee=_.date||null,Se=String(_.round??_.journee??""),Me=!!_.is_stale}else{K=i(te)?te:l("card.unknown_opponent","Opponent"),P=i(te)?te:"",v=T?r.lastScore?.attributes?.is_home??r.lastDate?.attributes?.is_home??!0:r.nextVenue?.state==="home"||r.nextOpponent?.attributes?.is_home===!0,Z=M?.attributes?.team_logo_url||w,Q=M?.attributes?.opponent_logo_url||w;let $=Y||q,Pe=v?$:P,nt=v?P:$;we=Ct({isHome:v,teamName:Pe,entities:r,opponentSensor:M,selectedEntity:S}),ke=Ct({isHome:!v,teamName:nt,entities:r,opponentSensor:M,selectedEntity:S}),Se=T?r.lastDate?.attributes?.round||"":r.nextDate?.attributes?.round||"",Ae=r.nextLocation?.attributes?.gym_name||r.nextOpponent?.attributes?.gym_name||"",Ce=r.nextLocation?.attributes?.gym_city||r.nextOpponent?.attributes?.gym_city||"",ee=T?r.lastDate?.state:r.nextDate?.state,Me=!!r.nextDate?.attributes?.is_stale}let Ft=v?q:K,Vt=v?K:q,Ht=v?Z:Q,jt=v?Q:Z,Ee=Y||q,qt=v?Ee:P,Kt=v?P:Ee,Gt=v?e.entity:M?.entity_id,Wt=v?M?.entity_id:e.entity,Jt=r.poule?.attributes?.competition||"",Xt=r.poule?.state||"",Yt=Xe(ee,s||n,{hour12:d}),et=r.form?.attributes?.current_streak||"",Ne=r.form?.state,fe=i(Ne),Zt=fe?Ne:u?"V-V-D-V-N":"",Qt=fe?et:u?"2V":"",ea=e.show_form&&(fe||u),ta=e.show_title!==!1,tt=e.title?.trim(),Te=l("card.default_title","Next match");m?Te=l("card.live_title","Live match"):T&&(Te=l("card.last_title","Last match"));let aa=tt||Te,oa=e.icon!==void 0?e.icon:"mdi:basketball",ra=`logo-box-${e.logo_size||"medium"}`,at=e.show_rank!==!1,De=r.rank?.state,ot=i(De)?De:null,rt=ka(P,r.rank?.attributes?.standings),Le=J(ot,n),Oe=J(rt,n),ze=v?Le:Oe,Re=v?Oe:Le;u&&at&&(ze||(ze=J(v?2:5,n)),Re||(Re=J(v?5:2,n)));let na=!m&&!T&&!!ee,sa=e.logo_click_action&&e.logo_click_action!=="none",ia=Array.isArray(r.rank?.attributes?.standings)&&r.rank.attributes.standings.length>0,la=Na(e),ca=_?.score||r.lastScore?.state||"-",da=_?.result||r.lastResult?.state||"draw";return{isValidState:i,isLive:m,lastScoreState:g,hasLastScore:A,nextDateState:L,hasNextMatch:k,hasLastMatchData:N,hasNextMatchData:R,canToggleView:Pt,canGoPrev:It,canGoNext:Ut,currentIndex:C,hasCalendar:x,calendarMatches:b,displayedScore:ca,displayedResult:da,isPostMatch:T,isGameDay:Bt,currentOpponentSensor:M,officialTeamName:Y,configuredTeamName:Qe,teamName:q,rawOpponent:te,opponentName:K,opponentSearchName:P,isHome:v,teamLogoUrl:Z,opponentLogoUrl:Q,leftName:Ft,rightName:Vt,leftLogo:Ht,rightLogo:jt,searchTeamName:Ee,leftMatchName:qt,rightMatchName:Kt,leftUrl:we,rightUrl:ke,leftEntityId:Gt,rightEntityId:Wt,competition:Jt,pouleName:Xt,roundNumber:Se,gymName:Ae,gymCity:Ce,targetDateStr:ee,dateFormatted:Yt,formStreak:et,formSequence:Ne,hasValidForm:fe,isPreview:u,displayFormSequence:Zt,displayFormStreak:Qt,showFormBlock:ea,showTitle:ta,configuredTitle:tt,titleText:aa,titleIcon:oa,logoSizeClass:ra,showRank:at,rawUserRank:De,userRankNum:ot,opponentRankNum:rt,userRankFormatted:Le,opponentRankFormatted:Oe,leftRank:ze,rightRank:Re,isCalendarClickable:na,isLogoClickable:sa,hasStandingsData:ia,accentColor:la,isStale:Me}}var Tt={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",round_short:"J",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logos",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange Basketball (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",custom_accent_color_invalid:"Couleur non valide (les noms de couleurs sont en anglais : blue, red\u2026) : l'orange par d\xE9faut est utilis\xE9.",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_none:"Neutre (sans podium)",rank_badge_outline:"Bordure (or, argent, bronze) \u2014 (par d\xE9faut)",rank_badge_solid:"Plein m\xE9tallique (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var Dt={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",round_short:"R",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logos",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",custom_accent_color_invalid:"Not a valid color: the default orange is used.",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_none:"Neutral (no podium)",rank_badge_outline:"Outline (gold, silver, bronze) \u2014 (default)",rank_badge_solid:"Solid metallic (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var Lt={fr:Tt,en:Dt};function ye(r){return(r?.locale?.language||r?.language||"en").substring(0,2).toLowerCase()}function X(r){return Lt[r]||Lt.en}function $e(r,e,t=""){if(!r||!e)return t;let a=e.split("."),o=r;for(let n of a){if(!o||typeof o!="object"||!(n in o))return t;o=o[n]}return typeof o=="string"?o:t}var Ot=oe`
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
`;var Ye=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return oe`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=X("fr")}setConfig(e){this._config={entity:"",...pe,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ye(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=X(t))}}_t(e,t=""){return $e(this._translations,e,t)}_customColorHelper(){let e=this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),t=String(this._config?.custom_accent_color??"").trim();return t&&!me(t)?`\u26A0 ${this._t("editor.custom_accent_color_invalid","Not a valid color: the default orange is used.")} ${e}`:e}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},a=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of a)s in t||(t[s]="");let o={...this._config,...t},n=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(n)}render(){if(!this.hass||!this._config)return h``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo_section","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._customColorHelper(),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking_section","Ranking"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return h`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${ue}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",Ye);var Ze=class extends D{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0},_matchIndex:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=X("en"),this._activeModal=null,this._manualView=null,this._matchIndex=null,this._modalTrigger=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...pe}}getCardSize(){return 3}getGridOptions(){return{columns:12,min_columns:9}}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...pe,...e},this._warnIfInvalidAccentColor()}_warnIfInvalidAccentColor(){let{accent_color:e,custom_accent_color:t}=this._config,a=String(t??"").trim();e!=="custom"||!a||me(a)||this._warnedAccentColor!==a&&(this._warnedAccentColor=a,console.warn(`[FFBB Tracker Card] custom_accent_color "${a}" is not a valid CSS color (use e.g. #1e88e5 or "blue"): the default orange is used.`))}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=ye(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=X(t))}}_t(e,t=""){return $e(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.rank_badge_style==="none"||this._config?.disable_podium_colors)return"";let a=String(e).trim().match(/^(\d+)/);if(!a)return"";let o=parseInt(a[1],10);return o===1?"rank-gold":o===2?"rank-silver":o===3?"rank-bronze":""}_resolveEntities(){return St(this._config.entity,this.hass?.states)}_localeInfo(){let e=this.hass?.locale?.language||this.hass?.language||"en-US";return{language:e,hour12:Et(this.hass?.locale?.time_format,e)}}_formatDate(e){let{language:t,hour12:a}=this._localeInfo();return Xe(e,t,{hour12:a})}_openMaps(e,t){let a=encodeURIComponent(`${e} ${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${a}`,"_blank","noreferrer")}_openCalendar(e,t,a,o,n){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let d=new Date(s.getTime()+7200*1e3),l=g=>g.toISOString().replace(/[-:]|\.\d{3}/g,""),u=`${t} vs ${a}`,c=`${o} ${n}`.trim(),i=`FFBB match: ${t} vs ${a}`,m=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(u)}&dates=${l(s)}/${l(d)}&details=${encodeURIComponent(i)}&location=${encodeURIComponent(c)}`;window.open(m,"_blank","noreferrer")}_handleLogoClick(e,t,a){let o=this._config.logo_click_action||"team_url";o==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${a}".`),e&&this._fireMoreInfo(e)):o==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._modalTrigger=this.shadowRoot?.activeElement??null,this._activeModal=e}_closeModal(){this._activeModal=null}updated(e){if(super.updated(e),!e.has("_activeModal"))return;let t=e.get("_activeModal");if(this._activeModal&&!t)this.shadowRoot?.querySelector(".modal-card")?.focus();else if(!this._activeModal&&t){let a=this._modalTrigger;this._modalTrigger=null,a&&a.isConnected&&typeof a.focus=="function"&&a.focus()}}_onModalKeydown(e){if(e.key==="Escape"){e.stopPropagation(),this._closeModal();return}if(e.key!=="Tab")return;let t=e.currentTarget.querySelector(".modal-card");if(!t)return;let a=[...t.querySelectorAll('[tabindex]:not([tabindex="-1"])')];if(a.length===0){e.preventDefault(),t.focus();return}let o=a[0],n=a[a.length-1],s=this.shadowRoot?.activeElement;e.shiftKey&&(s===o||s===t)?(e.preventDefault(),n.focus()):!e.shiftKey&&s===n&&(e.preventDefault(),o.focus())}_setManualView(e){this._manualView=e,this._matchIndex=null}_handleChevronClick(e,t){if(t.hasCalendar&&t.calendarMatches.length>1){let a=e==="prev"?t.currentIndex-1:t.currentIndex+1;if(a>=0&&a<t.calendarMatches.length){this._matchIndex=a;let o=t.calendarMatches[a];this._manualView=o.is_played||o.score?"last":"next"}}else this._setManualView(e==="prev"?"last":"next")}_selectCalendarMatch(e,t){this._matchIndex=e,this._manualView=t?"last":"next",this._closeModal()}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return Je(e,t)}_renderModal(e,t,a){if(!this._activeModal)return h``;if(this._activeModal==="standings"){let o=e.rank?.attributes?.standings||[],n=Mt(o),s=e.poule?.attributes?.competition||"",d=e.poule?.state||"",l=n.map(i=>i.team_name||i.name||""),u=xe(l,t),c=xe(l,a);return h`
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
              ${n.length>0?h`
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
                        ${n.map(i=>{let m=i.team_name||i.name||"",g=u(m)||c(m);return h`
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
      `}if(this._activeModal==="form"){let o=e.form?.state,n=o&&o!=="unknown"&&o!=="unavailable",s=n?o:"",d=n&&e.form?.attributes?.current_streak||"",l=s.split("-").filter(Boolean);return h`
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
                      ${l.map(u=>{let c="badge-draw",i=this._t("card.draw","Draw");return u==="V"||u==="W"?(c="badge-win",i=this._t("card.win","Win")):(u==="D"||u==="L")&&(c="badge-loss",i=this._t("card.loss","Loss")),h`
                          <div class="form-badge-pill ${c}">
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
      `}if(this._activeModal==="calendar"){let o=this._extractCalendarMatches(e),n=e.poule?.attributes?.competition||"",s=e.poule?.state||"",d=o.flatMap(c=>[c.home_team||c.equipe_domicile||"",c.away_team||c.equipe_exterieur||""]),l=xe(d,t),u=o.findIndex(c=>!c.is_played&&!c.score);return h`
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
            ${n?h`<div class="modal-subtitle">${n}</div>`:""}
            <div class="modal-body" tabindex="0">
              ${o.length>0?h`
                    <div class="calendar-list">
                      ${o.map((c,i)=>{let m=c.home_team||c.equipe_domicile||"-",g=c.away_team||c.equipe_exterieur||"-",A=c.home_logo||w,L=c.away_logo||w,k=c.score||(c.home_score!==void 0?`${c.home_score} - ${c.away_score}`:""),N=this._formatDate(c.date||c.datetime),R=l(m),S=l(g),b=R||S,x=!!(c.is_played||k),y=i===u,f="";return R?f="DOM":S&&(f="EXT"),h`
                          <div
                            class="calendar-row ${b?"highlight-row":""} ${y?"next-match-row":""}"
                            @click=${()=>this._selectCalendarMatch(i,x)}
                            @keydown=${this._onKeyActivate(()=>this._selectCalendarMatch(i,x))}
                            role="button"
                            tabindex="0"
                            aria-label="${m} vs${g}"
                          >
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">${this._t("card.round_short","R")}${c.round||c.journee||"-"}</span>
                              ${f?h`<span class="cal-venue-pill ${f==="DOM"?"pill-dom":"pill-ext"}">${f}</span>`:""}
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${A}
                                  alt=""
                                  @error=${O=>{O.target.src.endsWith(w)||(O.target.src=w)}}
                                />
                                <span class="cal-team ${R?"my-team-text":""}">${m}</span>
                              </div>
                              <div class="cal-team-line">
                                <img
                                  class="cal-mini-logo"
                                  src=${L}
                                  alt=""
                                  @error=${O=>{O.target.src.endsWith(w)||(O.target.src=w)}}
                                />
                                <span class="cal-team ${S?"my-team-text":""}">${g}</span>
                              </div>
                            </div>
                            <div class="calendar-col-meta">
                              ${k?h`<div class="cal-score">${k}</div>`:N?h`
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
      `}return h``}_computeViewModel(e){let{language:t,hour12:a}=this._localeInfo();return Nt({entities:e,config:this._config,manualView:this._manualView,matchIndex:this._matchIndex,states:this.hass?.states,lang:this._translationsLang,locale:t,hour12:a,t:(o,n)=>this._t(o,n),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return h``;let e=this._resolveEntities();if(!e)return h`
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
    `}_renderMatchArea(e){let{isLive:t,canToggleView:a,isPostMatch:o,isGameDay:n,leftName:s,rightName:d,leftLogo:l,rightLogo:u,leftUrl:c,rightUrl:i,leftEntityId:m,rightEntityId:g,gymName:A,gymCity:L,dateFormatted:k,logoSizeClass:N,showRank:R,leftRank:S,rightRank:b,isCalendarClickable:x,isLogoClickable:y,hasStandingsData:f}=e,C=this._config?.rank_badge_style==="solid"||!!this._config?.solid_rank_badges?"rank-solid":"";return h`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${N} ${y?"clickable":""}"
            @click=${()=>this._handleLogoClick(m,c,s)}
            @keydown=${y?this._onKeyActivate(()=>this._handleLogoClick(m,c,s)):p}
            role=${y?"button":p}
            tabindex=${y?"0":p}
            aria-label=${y?this._t("card.view_team","View {team}").replace("{team}",s):p}
          >
            <img
              class="logo"
              src=${l}
              alt=""
              @error=${j=>{j.target.src.endsWith(w)||(j.target.src=w)}}
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
            class="center-meta ${x?"clickable":""}"
            @click=${()=>{x&&this._openCalendar(e.targetDateStr,s,d,A,L)}}
            @keydown=${x?this._onKeyActivate(()=>this._openCalendar(e.targetDateStr,s,d,A,L)):p}
            role=${x?"button":p}
            tabindex=${x?"0":p}
            aria-label=${x?this._t("card.add_to_calendar","Add to Google Calendar"):p}
            title=${x?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${t?h`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${k?`${this._t("card.kickoff","Kick-off")} ${k.time}`:""}
                  </div>
                `:o?h`
                  <div class="score-display">
                    ${e.displayedScore}
                  </div>
                  <div class="badge badge-${e.displayedResult}">
                    ${this._t(`card.${e.displayedResult}`)}
                  </div>
                `:h`
                  ${k?h`
                        <div class="match-day">${k.weekday} ${k.day}</div>
                        <div class="match-time">${k.time}</div>
                      `:h`<div class="match-time">-</div>`}
                  ${n&&!e.isStale?h`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
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
            class="logo-box ${N} ${y?"clickable":""}"
            @click=${()=>this._handleLogoClick(g,i,d)}
            @keydown=${y?this._onKeyActivate(()=>this._handleLogoClick(g,i,d)):p}
            role=${y?"button":p}
            tabindex=${y?"0":p}
            aria-label=${y?this._t("card.view_team","View {team}").replace("{team}",d):p}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${j=>{j.target.src.endsWith(w)||(j.target.src=w)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${s}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${d}</div>
        </div>

        ${R&&(S||b)?h`
              <div class="team-rank-cell rank-left">
                ${S?h`
                      <span
                        class="rank-badge ${this._getRankClass(S)} ${C} ${f?"clickable-badge":""}"
                        @click=${()=>{f&&this._openModal("standings")}}
                        @keydown=${f?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${f?"button":p}
                        tabindex=${f?"0":p}
                        aria-label=${f?this._t("card.view_standings","View league standings"):p}
                        title=${f?this._t("card.view_standings","View league standings"):""}
                      >${S}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${b?h`
                      <span
                        class="rank-badge ${this._getRankClass(b)} ${C} ${f?"clickable-badge":""}"
                        @click=${()=>{f&&this._openModal("standings")}}
                        @keydown=${f?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${f?"button":p}
                        tabindex=${f?"0":p}
                        aria-label=${f?this._t("card.view_standings","View league standings"):p}
                        title=${f?this._t("card.view_standings","View league standings"):""}
                      >${b}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:a,hasValidForm:o,isPreview:n,displayFormSequence:s,displayFormStreak:d,showFormBlock:l}=e;return h`
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
              ${!o&&n?h`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
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
    `}static get styles(){return Ot}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Ze);console.info(`%c FFBB Tracker Card %c v${ue} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var zt=window.customCards.findIndex(r=>r.type==="ffbb-tracker-card"),Rt={type:"ffbb-tracker-card",name:`FFBB Tracker v${ue}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};zt!==-1?window.customCards[zt]=Rt:window.customCards.push(Rt);
