var oe=globalThis,ne=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,be=Symbol(),Ve=new WeakMap,j=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ne&&e===void 0){let a=t!==void 0&&t.length===1;a&&(e=Ve.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&Ve.set(t,e))}return e}toString(){return this.cssText}},He=n=>new j(typeof n=="string"?n:n+"",void 0,be),q=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((a,o,r)=>a+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[r+1],n[0]);return new j(t,n,be)},Ie=(n,e)=>{if(ne)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let a=document.createElement("style"),o=oe.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=t.cssText,n.appendChild(a)}},ve=ne?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let a of e.cssRules)t+=a.cssText;return He(t)})(n):n;var{is:It,defineProperty:jt,getOwnPropertyDescriptor:qt,getOwnPropertyNames:Gt,getOwnPropertySymbols:Kt,getPrototypeOf:Wt}=Object,D=globalThis,je=D.trustedTypes,Jt=je?je.emptyScript:"",Xt=D.reactiveElementPolyfillSupport,G=(n,e)=>n,$e={toAttribute(n,e){switch(e){case Boolean:n=n?Jt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Ge=(n,e)=>!It(n,e),qe={attribute:!0,type:String,converter:$e,reflect:!1,useDefault:!1,hasChanged:Ge};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),D.litPropertyMetadata??(D.litPropertyMetadata=new WeakMap);var S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=qe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(e,a,t);o!==void 0&&jt(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){let{get:o,set:r}=qt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:o,set(s){let l=o?.call(this);r?.call(this,s),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??qe}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;let e=Wt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){let t=this.properties,a=[...Gt(t),...Kt(t)];for(let o of a)this.createProperty(o,t[o])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[a,o]of t)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[t,a]of this.elementProperties){let o=this._$Eu(t,a);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let o of a)t.unshift(ve(o))}else e!==void 0&&t.push(ve(e));return t}static _$Eu(e,t){let a=t.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ie(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){let a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(o!==void 0&&a.reflect===!0){let r=(a.converter?.toAttribute!==void 0?a.converter:$e).toAttribute(t,a.type);this._$Em=e,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){let a=this.constructor,o=a._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let r=a.getPropertyOptions(o),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:$e;this._$Em=o;let l=s.fromAttribute(t,r.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,t,a,o=!1,r){if(e!==void 0){let s=this.constructor;if(o===!1&&(r=this[e]),a??(a=s.getPropertyOptions(e)),!((a.hasChanged??Ge)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,a))))return;this.C(e,t,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:r},s){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,r]of a){let{wrapped:s}=r,l=this[o];s!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,r,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[G("elementProperties")]=new Map,S[G("finalized")]=new Map,Xt?.({ReactiveElement:S}),(D.reactiveElementVersions??(D.reactiveElementVersions=[])).push("2.1.2");var W=globalThis,Ke=n=>n,re=W.trustedTypes,We=re?re.createPolicy("lit-html",{createHTML:n=>n}):void 0,et="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,tt="?"+N,Yt=`<${tt}>`,R=document,J=()=>R.createComment(""),X=n=>n===null||typeof n!="object"&&typeof n!="function",Se=Array.isArray,Qt=n=>Se(n)||typeof n?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Je=/-->/g,Xe=/>/g,z=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ye=/'/g,Qe=/"/g,at=/^(?:script|style|textarea|title)$/i,Ee=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),d=Ee(1),ma=Ee(2),fa=Ee(3),P=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ze=new WeakMap,O=R.createTreeWalker(R,129);function ot(n,e){if(!Se(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return We!==void 0?We.createHTML(e):e}var Zt=(n,e)=>{let t=n.length-1,a=[],o,r=e===2?"<svg>":e===3?"<math>":"",s=K;for(let l=0;l<t;l++){let i=n[l],c,u,h=-1,m=0;for(;m<i.length&&(s.lastIndex=m,u=s.exec(i),u!==null);)m=s.lastIndex,s===K?u[1]==="!--"?s=Je:u[1]!==void 0?s=Xe:u[2]!==void 0?(at.test(u[2])&&(o=RegExp("</"+u[2],"g")),s=z):u[3]!==void 0&&(s=z):s===z?u[0]===">"?(s=o??K,h=-1):u[1]===void 0?h=-2:(h=s.lastIndex-u[2].length,c=u[1],s=u[3]===void 0?z:u[3]==='"'?Qe:Ye):s===Qe||s===Ye?s=z:s===Je||s===Xe?s=K:(s=z,o=void 0);let f=s===z&&n[l+1].startsWith("/>")?" ":"";r+=s===K?i+Yt:h>=0?(a.push(c),i.slice(0,h)+et+i.slice(h)+N+f):i+N+(h===-2?l:f)}return[ot(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},Y=class n{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let r=0,s=0,l=e.length-1,i=this.parts,[c,u]=Zt(e,t);if(this.el=n.createElement(c,a),O.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=O.nextNode())!==null&&i.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let h of o.getAttributeNames())if(h.endsWith(et)){let m=u[s++],f=o.getAttribute(h).split(N),_=/([.?@])?(.*)/.exec(m);i.push({type:1,index:r,name:_[2],strings:f,ctor:_[1]==="."?ye:_[1]==="?"?ke:_[1]==="@"?Ae:B}),o.removeAttribute(h)}else h.startsWith(N)&&(i.push({type:6,index:r}),o.removeAttribute(h));if(at.test(o.tagName)){let h=o.textContent.split(N),m=h.length-1;if(m>0){o.textContent=re?re.emptyScript:"";for(let f=0;f<m;f++)o.append(h[f],J()),O.nextNode(),i.push({type:2,index:++r});o.append(h[m],J())}}}else if(o.nodeType===8)if(o.data===tt)i.push({type:2,index:r});else{let h=-1;for(;(h=o.data.indexOf(N,h+1))!==-1;)i.push({type:7,index:r}),h+=N.length-1}r++}}static createElement(e,t){let a=R.createElement("template");return a.innerHTML=e,a}};function U(n,e,t=n,a){if(e===P)return e;let o=a!==void 0?t._$Co?.[a]:t._$Cl,r=X(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(n),o._$AT(n,t,a)),a!==void 0?(t._$Co??(t._$Co=[]))[a]=o:t._$Cl=o),o!==void 0&&(e=U(n,o._$AS(n,e.values),o,a)),e}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??R).importNode(t,!0);O.currentNode=o;let r=O.nextNode(),s=0,l=0,i=a[0];for(;i!==void 0;){if(s===i.index){let c;i.type===2?c=new Q(r,r.nextSibling,this,e):i.type===1?c=new i.ctor(r,i.name,i.strings,this,e):i.type===6&&(c=new Ce(r,this,e)),this._$AV.push(c),i=a[++l]}s!==i?.index&&(r=O.nextNode(),s++)}return O.currentNode=R,o}p(e){let t=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}},Q=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),X(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Qt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Y.createElement(ot(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{let r=new xe(o,this),s=r.u(this.options);r.p(t),this.T(s),this._$AH=r}}_$AC(e){let t=Ze.get(e.strings);return t===void 0&&Ze.set(e.strings,t=new Y(e)),t}k(e){Se(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,o=0;for(let r of e)o===t.length?t.push(a=new n(this.O(J()),this.O(J()),this,this.options)):a=t[o],a._$AI(r),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let a=Ke(e).nextSibling;Ke(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},B=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=p}_$AI(e,t=this,a,o){let r=this.strings,s=!1;if(r===void 0)e=U(this,e,t,0),s=!X(e)||e!==this._$AH&&e!==P,s&&(this._$AH=e);else{let l=e,i,c;for(e=r[0],i=0;i<r.length-1;i++)c=U(this,l[a+i],t,i),c===P&&(c=this._$AH[i]),s||(s=!X(c)||c!==this._$AH[i]),c===p?e=p:e!==p&&(e+=(c??"")+r[i+1]),this._$AH[i]=c}s&&!o&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ye=class extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},ke=class extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Ae=class extends B{constructor(e,t,a,o,r){super(e,t,a,o,r),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??p)===P)return;let a=this._$AH,o=e===p&&a!==p||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==p&&(a===p||o);o&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ce=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};var ea=W.litHtmlPolyfillSupport;ea?.(Y,Q),(W.litHtmlVersions??(W.litHtmlVersions=[])).push("3.3.3");var nt=(n,e,t)=>{let a=t?.renderBefore??e,o=a._$litPart$;if(o===void 0){let r=t?.renderBefore??null;a._$litPart$=o=new Q(e.insertBefore(J(),r),r,void 0,t??{})}return o._$AI(n),o};var Z=globalThis,k=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};k._$litElement$=!0,k.finalized=!0,Z.litElementHydrateSupport?.({LitElement:k});var ta=Z.litElementPolyfillSupport;ta?.({LitElement:k});(Z.litElementVersions??(Z.litElementVersions=[])).push("4.2.2");var ee="0.1.2";var te={custom_team_name:"",logo_size:"medium",logo_click_action:"team_url",default_match_view:"auto",accent_color:"default",custom_accent_color:"",show_title:!0,title:"",icon:"mdi:basketball",show_header:!0,show_rank:!0,rank_badge_style:"outline",show_form:!0,show_venue:!0,show_watermark:!0};var F="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23ff6b00'/><circle cx='50' cy='50' r='46' stroke='%23ffffff' stroke-width='4' fill='none'/><line x1='50' y1='4' x2='50' y2='96' stroke='%23ffffff' stroke-width='4'/><line x1='4' y1='50' x2='96' y2='50' stroke='%23ffffff' stroke-width='4'/><path d='M17,17 Q50,50 17,83' stroke='%23ffffff' stroke-width='4' fill='none'/><path d='M83,17 Q50,50 83,83' stroke='%23ffffff' stroke-width='4' fill='none'/></svg>";function w(n){return(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"")}function it(n,e){if(!n||!e)return null;let t=n.match(/^(sensor|binary_sensor)\.([a-z0-9_]+?)_(prochain_match|next_match|dernier_match|last_match|classement|rank|poule|forme_recente|form|game_day|jour_de_match|match_en_cours|match_in_progress)/),a=t?`sensor.${t[2]}_`:n.substring(0,n.lastIndexOf("_")+1),o=t?`binary_sensor.${t[2]}_`:a.replace("sensor.","binary_sensor."),r=s=>{for(let l of s)if(e[l])return e[l];return null};return{nextOpponent:r([`${a}prochain_match_adversaire`,`${a}next_match_opponent`]),nextDate:r([`${a}prochain_match_date`,`${a}next_match_date`]),nextLocation:r([`${a}prochain_match_lieu`,`${a}next_match_location`]),nextVenue:r([`${a}prochain_match_terrain`,`${a}next_match_venue_type`]),lastScore:r([`${a}dernier_match_score`,`${a}last_match_score`]),lastOpponent:r([`${a}dernier_match_adversaire`,`${a}last_match_opponent`]),lastResult:r([`${a}dernier_match_resultat`,`${a}last_match_result`]),lastDate:r([`${a}dernier_match_date`,`${a}last_match_date`]),poule:r([`${a}poule`]),rank:r([`${a}classement`,`${a}rank`]),rankEvolution:r([`${a}classement_evolution`,`${a}rank_evolution`]),form:r([`${a}forme_recente`,`${a}form`]),matchInProgress:r([`${o}match_en_cours`,`${o}match_in_progress`])}}function aa(n,e){if(!n||!Array.isArray(e))return null;let t=w(n);if(!t)return null;let a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=w(r);return!!(s&&s===t)});return a||(a=e.find(o=>{if(!o)return!1;let r=o.team_name||o.name,s=w(r);return!!(s&&(s.includes(t)||t.includes(s)))})),a?a.position:null}function V(n,e){if(n==null||n===""||isNaN(Number(n)))return null;let t=parseInt(n,10);if(t<=0)return null;if(e==="fr")return t===1?"1er":`${t}e`;let a=t%10,o=t%100;return a===1&&o!==11?`${t}st`:a===2&&o!==12?`${t}nd`:a===3&&o!==13?`${t}rd`:`${t}th`}function rt(n,e,t){if(!Array.isArray(e))return null;let a=w(n);if(!a)return null;let o=e.find(r=>{let s=w(r?.team_name||r?.name||"");return!!(s&&s===a)});if(o||(o=e.find(r=>{let s=w(r?.team_name||r?.name||"");return!!(s&&(s.includes(a)||a.includes(s)))})),!o)return null;for(let r of t)if(o[r]){let s=ct(o[r]);if(s)return s}return null}function lt(n,e){let t=n?.poule?.attributes?.calendar||n?.poule?.attributes?.matches||n?.poule?.attributes?.schedule;if(Array.isArray(t)&&t.length>0)return t;let a=n?.nextDate?.attributes?.calendar||n?.nextDate?.attributes?.matches;if(Array.isArray(a)&&a.length>0)return a;let o=n?.rank?.attributes?.calendar||n?.rank?.attributes?.matches;if(Array.isArray(o)&&o.length>0)return o;let r=e?.attributes?.calendar||e?.attributes?.matches;return Array.isArray(r)&&r.length>0?r:[]}function ct(n){if(!n||typeof n!="string")return null;let e=n.trim();return e.startsWith("http://")||e.startsWith("https://")?e:e.startsWith("/")?`https://competitions.ffbb.com${e}`:null}function oa(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);return isNaN(t.getTime())?!1:t.getFullYear()===e.getFullYear()&&t.getMonth()===e.getMonth()&&t.getDate()===e.getDate()}function na(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);o.setDate(o.getDate()+2);let r=e.getTime();return r>=t.getTime()&&r<o.getTime()}function ra(n,e=new Date){if(!n||n==="unknown"||n==="unavailable")return!1;let t=new Date(n);if(isNaN(t.getTime()))return!1;let a=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=new Date(a);return o.setDate(o.getDate()-1),e.getTime()>=o.getTime()}function sa({defaultView:n="auto",manualView:e=null,isLive:t=!1,lastDate:a=null,hasLastScore:o=!1,hasLastMatch:r=!0,nextDate:s=null,hasNextMatch:l=!1,now:i=new Date}={}){return t||!r?!1:e!==null?e==="last":n==="next"?!1:n==="last"?!(!o||l&&ra(s,i)):!!(o&&na(a,i))}function dt(n){return Array.isArray(n)?[...n].sort((e,t)=>{let a=o=>{let r=parseInt(o?.position??o?.rank,10);return isNaN(r)?999:r};return a(e)-a(t)}):[]}function ia(n){let e=n?.accent_color||"default";return e==="theme"?"var(--primary-color)":e==="custom"&&n?.custom_accent_color?.trim()?n.custom_accent_color.trim():"#ff6b00"}function Me(n,e="en-US"){if(!n||n==="unknown"||n==="unavailable")return null;let t=new Date(n);if(isNaN(t.getTime()))return null;let a=t.toLocaleDateString(e,{weekday:"short"}),o=t.toLocaleDateString(e,{day:"numeric",month:"short"}),r=t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"});return{weekday:a,day:o,time:r}}function st({isHome:n=!0,isMyTeam:e=n,teamName:t="",entities:a={},opponentSensor:o=null,selectedEntity:r=null}={}){let s=(l,i)=>{if(!l||typeof l!="object")return null;for(let c of i)if(l[c]){let u=ct(l[c]);if(u)return u}return null};if(e){let l=s(o?.attributes,["team_url","url_equipe","team_link"]);if(l)return l;let i=[r,a?.nextDate,a?.lastDate,a?.rank];for(let h of i){let m=s(h?.attributes,["team_url","url_equipe","team_link"]);if(m)return m}let c=a?.rank?.attributes?.standings||r?.attributes?.standings,u=rt(t,c,["team_url","url","link"]);if(u)return u}else{let l=s(o?.attributes,["opponent_url","opponent_team_url","opponent_link","url_adversaire"]);if(l)return l;let i=a?.rank?.attributes?.standings||r?.attributes?.standings,c=rt(t,i,["team_url","url","link"]);if(c)return c}return null}function ht({entities:n={},config:e={},manualView:t=null,states:a={},lang:o="fr",t:r=(i,c="")=>c,isPreview:s=!1,now:l=new Date}={}){let i=ge=>!!(ge&&ge!=="unknown"&&ge!=="unavailable"),c=!!(n.matchInProgress&&n.matchInProgress.state==="on"),u=n.lastScore?.state,h=i(u),m=n.nextDate?.state,f=i(m),_=h||i(n.lastOpponent?.state)||i(n.lastDate?.state),E=f||i(n.nextOpponent?.state),L=!c&&_&&E,x=sa({defaultView:e.default_match_view||"auto",manualView:t,isLive:c,lastDate:n.lastDate?.state,hasLastScore:h,hasLastMatch:_,nextDate:m,hasNextMatch:f,now:l}),M=!x&&!c&&f&&oa(m,l),y=x?n.lastOpponent:n.nextOpponent,I=n.poule?.attributes?.team||"",T=e.custom_team_name?.trim(),A=T||I||r("card.unknown_team","My team"),$=y?.state,v=i($)?$:r("card.unknown_opponent","Opponent"),g=i($)?$:"",b=x?n.lastScore?.attributes?.is_home??n.lastDate?.attributes?.is_home??!0:n.nextVenue?.state==="home"||n.nextOpponent?.attributes?.is_home===!0,C=y?.attributes?.team_logo_url||F,le=y?.attributes?.opponent_logo_url||F,bt=b?A:v,vt=b?v:A,$t=b?C:le,wt=b?le:C,ce=I||A,Le=b?ce:g,Te=b?g:ce,ze=e.entity&&a?a[e.entity]:null,xt=st({isHome:b,teamName:Le,entities:n,opponentSensor:y,selectedEntity:ze}),yt=st({isHome:!b,teamName:Te,entities:n,opponentSensor:y,selectedEntity:ze}),kt=b?e.entity:y?.entity_id,At=b?y?.entity_id:e.entity,Ct=n.poule?.attributes?.competition||"",St=n.poule?.state||"",Et=x?n.lastDate?.attributes?.round||"":n.nextDate?.attributes?.round||"",Mt=n.nextLocation?.attributes?.gym_name||n.nextOpponent?.attributes?.gym_name||"",Dt=n.nextLocation?.attributes?.gym_city||n.nextOpponent?.attributes?.gym_city||"",Oe=x?n.lastDate?.state:n.nextDate?.state,Nt=Me(Oe,o),Re=n.form?.attributes?.current_streak||"",de=n.form?.state,ae=i(de),Lt=ae?de:s?"V-V-D-V-N":"",Tt=ae?Re:s?"2V":"",zt=e.show_form&&(ae||s),Ot=e.show_title!==!1,Pe=e.title?.trim(),he=r("card.default_title","Next match");c?he=r("card.live_title","Live match"):x&&(he=r("card.last_title","Last match"));let Rt=Pe||he,Pt=e.icon!==void 0?e.icon:"mdi:basketball",Ft=`logo-box-${e.logo_size||"medium"}`,Fe=e.show_rank!==!1,ue=n.rank?.state,Ue=i(ue)?ue:null,Be=aa(g,n.rank?.attributes?.standings),pe=V(Ue,o),me=V(Be,o),fe=b?pe:me,_e=b?me:pe;s&&Fe&&(fe||(fe=V(b?2:5,o)),_e||(_e=V(b?5:2,o)));let Ut=!c&&!x&&f,Bt=e.logo_click_action&&e.logo_click_action!=="none",Vt=Array.isArray(n.rank?.attributes?.standings)&&n.rank.attributes.standings.length>0,Ht=ia(e);return{isValidState:i,isLive:c,lastScoreState:u,hasLastScore:h,nextDateState:m,hasNextMatch:f,hasLastMatchData:_,hasNextMatchData:E,canToggleView:L,isPostMatch:x,isGameDay:M,currentOpponentSensor:y,officialTeamName:I,configuredTeamName:T,teamName:A,rawOpponent:$,opponentName:v,opponentSearchName:g,isHome:b,teamLogoUrl:C,opponentLogoUrl:le,leftName:bt,rightName:vt,leftLogo:$t,rightLogo:wt,searchTeamName:ce,leftMatchName:Le,rightMatchName:Te,leftUrl:xt,rightUrl:yt,leftEntityId:kt,rightEntityId:At,competition:Ct,pouleName:St,roundNumber:Et,gymName:Mt,gymCity:Dt,targetDateStr:Oe,dateFormatted:Nt,formStreak:Re,formSequence:de,hasValidForm:ae,isPreview:s,displayFormSequence:Lt,displayFormStreak:Tt,showFormBlock:zt,showTitle:Ot,configuredTitle:Pe,titleText:Rt,titleIcon:Pt,logoSizeClass:Ft,showRank:Fe,rawUserRank:ue,userRankNum:Ue,opponentRankNum:Be,userRankFormatted:pe,opponentRankFormatted:me,leftRank:fe,rightRank:_e,isCalendarClickable:Ut,isLogoClickable:Bt,hasStandingsData:Vt,accentColor:Ht}}var ut={card:{not_configured:"Carte non configur\xE9e",default_title:"Prochain match",unknown_team:"Mon \xE9quipe",unknown_opponent:"Adversaire",round:"Journ\xE9e",live:"En direct",gameday:"Jour de match",postponed:"Report\xE9",win:"Victoire",loss:"D\xE9faite",draw:"Nul",form:"Forme",preview_example:"exemple",open_maps:"Ouvrir dans Google Maps",add_to_calendar:"Ajouter \xE0 Google Agenda",view_standings:"Voir le classement de la poule",view_form_details:"Voir le d\xE9tail de la forme",view_calendar:"Voir le calendrier complet de la saison",view_last_match:"Afficher le dernier match jou\xE9",view_next_match:"Afficher le prochain match \xE0 venir",close:"Fermer",view_team:"Voir {team}",standings_title:"Classement",calendar_title:"Calendrier de la saison",form_title:"D\xE9tail de la forme r\xE9cente",current_streak:"S\xE9rie en cours",table_team:"\xC9quipe",table_pts:"Pts",table_played:"J",table_wins:"G",table_losses:"P",table_draws:"N",no_standings:"Aucune donn\xE9e de classement disponible.",no_calendar:"Aucun calendrier de rencontres disponible.",no_form:"Aucune forme r\xE9cente disponible.",live_title:"Match en direct",last_title:"Dernier match",kickoff:"Coup d'envoi"},editor:{entity:"\xC9quipe FFBB (capteur)",entity_helper:"S\xE9lectionnez n'importe quel capteur de l'\xE9quipe",custom_team_name:"Nom personnalis\xE9 de mon \xE9quipe",custom_team_name_helper:"Laissez vide pour conserver le nom officiel FFBB",logo_section:"Logo",logo_size:"Taille des logos",logo_size_small:"Petite",logo_size_medium:"Moyenne (par d\xE9faut)",logo_size_large:"Grande",logo_click_action:"Action au clic sur les logos",logo_action_none:"Aucune action",logo_action_team_url:"Page officielle FFBB de l'\xE9quipe",logo_action_more_info:"Fiche d\xE9taill\xE9e (plus d'infos)",default_match_view:"Affichage initial",view_auto:"Dernier match jou\xE9 jusqu'\xE0 J+1",view_next:"Toujours le prochain match",view_last:"Dernier match (prochain match \xE0 J-1)",accent_color:"Couleur d'accentuation",accent_color_default:"Orange basket (par d\xE9faut)",accent_color_theme:"Th\xE8me Home Assistant",accent_color_custom:"Couleur personnalis\xE9e",custom_accent_color:"Code couleur personnalis\xE9 (HEX)",custom_accent_color_helper:"Exemple : #1e88e5 ou #ff6b00",show_title:"Afficher le titre",title:"Titre",icon:"Ic\xF4ne",show_header:"Afficher l'en-t\xEAte / Journ\xE9e",ranking_section:"Classement",show_rank:"Afficher le classement des \xE9quipes",rank_badge_style:"Style des badges de classement",rank_badge_style_none:"Neutre (sans couleur)",rank_badge_style_outline:"Contour color\xE9 (or, argent, bronze)",rank_badge_style_solid:"Plein color\xE9 (or, argent, bronze)",show_form:"Afficher la forme r\xE9cente",show_venue:"Afficher la salle",show_watermark:"Logos en transparence en arri\xE8re-plan"}};var pt={card:{not_configured:"Card not configured",default_title:"Next match",unknown_team:"My team",unknown_opponent:"Opponent",round:"Round",live:"Live",gameday:"Game day",postponed:"Postponed",win:"Win",loss:"Loss",draw:"Draw",form:"Form",preview_example:"example",open_maps:"Open in Google Maps",add_to_calendar:"Add to Google Calendar",view_standings:"View league standings",view_form_details:"View form details",view_calendar:"View full season schedule",view_last_match:"Show last played match",view_next_match:"Show upcoming match",close:"Close",view_team:"View {team}",standings_title:"Standings",calendar_title:"Season schedule",form_title:"Recent form details",current_streak:"Current streak",table_team:"Team",table_pts:"Pts",table_played:"P",table_wins:"W",table_losses:"L",table_draws:"D",no_standings:"No standings data available.",no_calendar:"No schedule available.",no_form:"No recent form data available.",live_title:"Live match",last_title:"Last match",kickoff:"Kick-off"},editor:{entity:"FFBB team (sensor)",entity_helper:"Select any sensor belonging to the team",custom_team_name:"Custom name for my team",custom_team_name_helper:"Leave blank to keep official FFBB team name",logo_section:"Logo",logo_size:"Team crest size",logo_size_small:"Small",logo_size_medium:"Medium (default)",logo_size_large:"Large",logo_click_action:"Action on logo click",logo_action_none:"No action",logo_action_team_url:"Official FFBB team page",logo_action_more_info:"Detailed view (more-info)",default_match_view:"Initial view",view_auto:"Last match played until D+1",view_next:"Always upcoming match",view_last:"Last match (upcoming match at D-1)",accent_color:"Accent color",accent_color_default:"Basketball orange (default)",accent_color_theme:"Home Assistant theme",accent_color_custom:"Custom color",custom_accent_color:"Custom color code (HEX)",custom_accent_color_helper:"Example: #1e88e5 or #ff6b00",show_title:"Show title",title:"Title",icon:"Icon",show_header:"Show header / Round",ranking_section:"Ranking",show_rank:"Show team ranking",rank_badge_style:"Rank badge style",rank_badge_style_none:"Neutral (no color)",rank_badge_style_outline:"Colored outline (gold, silver, bronze)",rank_badge_style_solid:"Solid color (gold, silver, bronze)",show_form:"Show recent form",show_venue:"Show venue",show_watermark:"Transparent background logos"}};var mt={fr:ut,en:pt};function se(n){return(n?.locale?.language||n?.language||"en").substring(0,2).toLowerCase()}function H(n){return mt[n]||mt.en}function ie(n,e,t=""){if(!n||!e)return t;let a=e.split("."),o=n;for(let r of a){if(!o||typeof o!="object"||!(r in o))return t;o=o[r]}return typeof o=="string"?o:t}var ft=q`
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
    background: #f1b815;
    color: #1a1a1a;
    box-shadow: 0 2px 6px rgba(241, 184, 21, 0.4);
  }
  .rank-badge.rank-solid.rank-silver {
    background: #c0c7d0;
    color: #1a1a1a;
    box-shadow: 0 2px 6px rgba(192, 199, 208, 0.35);
  }
  .rank-badge.rank-solid.rank-bronze {
    background: #cd7f32;
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(205, 127, 50, 0.35);
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
    padding: 4px 12px;
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
  .modal-close-btn:focus-visible {
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
`;var De=class extends k{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_translations:{state:!0}}}static get styles(){return q`
      .card-version {
        text-align: right;
        font-size: 0.75em;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-top: 16px;
        opacity: 0.6;
      }
    `}constructor(){super(),this._translationsLang="fr",this._translations=H("fr")}setConfig(e){this._config={entity:"",...te,...e}}updated(e){if(super.updated(e),e.has("hass")&&this.hass){let t=se(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=H(t))}}_t(e,t=""){return ie(this._translations,e,t)}_valueChanged(e){if(!this._config||!this.hass||!e.detail||e.detail.value===void 0)return;let t={...e.detail.value},a=["entity","custom_team_name","title","icon","custom_accent_color"];for(let s of a)s in t||(t[s]="");let o={...this._config,...t},r=new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0});this.dispatchEvent(r)}render(){if(!this.hass||!this._config)return d``;let e=[{name:"entity",label:this._t("editor.entity","FFBB team (sensor)"),helper:this._t("editor.entity_helper","Select any sensor belonging to the team"),selector:{entity:{filter:{integration:"ffbb_tracker",domain:"sensor"}}}},{name:"show_title",label:this._t("editor.show_title","Show title"),default:!0,selector:{boolean:{}}},{name:"title",label:this._t("editor.title","Title"),selector:{text:{}}},{name:"icon",label:this._t("editor.icon","Icon"),selector:{icon:{}}},{name:"show_header",label:this._t("editor.show_header","Show header / Round"),default:!0,selector:{boolean:{}}},{name:"logo",type:"expandable",title:this._t("editor.logo","Logo"),icon:"mdi:shield-account",flatten:!0,schema:[{name:"logo_size",label:this._t("editor.logo_size","Team crest size"),default:"medium",selector:{select:{mode:"dropdown",options:[{value:"small",label:this._t("editor.logo_size_small","Small")},{value:"medium",label:this._t("editor.logo_size_medium","Medium (default)")},{value:"large",label:this._t("editor.logo_size_large","Large")}]}}},{name:"logo_click_action",label:this._t("editor.logo_click_action","Action on logo click"),default:"team_url",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.logo_action_none","No action")},{value:"team_url",label:this._t("editor.logo_action_team_url","Official FFBB team page")},{value:"more-info",label:this._t("editor.logo_action_more_info","Detailed view (more-info)")}]}}},{name:"show_watermark",label:this._t("editor.show_watermark","Transparent background logos"),default:!0,selector:{boolean:{}}}]},{name:"default_match_view",label:this._t("editor.default_match_view","Initial view"),default:"auto",selector:{select:{mode:"dropdown",options:[{value:"auto",label:this._t("editor.view_auto","Last match played until D+1")},{value:"next",label:this._t("editor.view_next","Always upcoming match")},{value:"last",label:this._t("editor.view_last","Last match (upcoming match at D-1)")}]}}},{name:"custom_team_name",label:this._t("editor.custom_team_name","Custom name for my team"),helper:this._t("editor.custom_team_name_helper","Leave blank to keep official FFBB team name"),selector:{text:{}}},{name:"accent_color",label:this._t("editor.accent_color","Accent color"),default:"default",selector:{select:{mode:"dropdown",options:[{value:"default",label:this._t("editor.accent_color_default","Basketball orange (default)")},{value:"theme",label:this._t("editor.accent_color_theme","Home Assistant theme")},{value:"custom",label:this._t("editor.accent_color_custom","Custom color")}]}}},...this._config.accent_color==="custom"?[{name:"custom_accent_color",label:this._t("editor.custom_accent_color","Custom color code (HEX)"),helper:this._t("editor.custom_accent_color_helper","Example: #1e88e5 or #ff6b00"),selector:{text:{}}}]:[],{name:"ranking",type:"expandable",title:this._t("editor.ranking","Classement"),icon:"mdi:format-list-numbered",flatten:!0,schema:[{name:"show_rank",label:this._t("editor.show_rank","Show team ranking"),default:!0,selector:{boolean:{}}},...this._config.show_rank!==!1?[{name:"rank_badge_style",label:this._t("editor.rank_badge_style","Rank badge style"),default:"outline",selector:{select:{mode:"dropdown",options:[{value:"none",label:this._t("editor.rank_badge_none","None")},{value:"outline",label:this._t("editor.rank_badge_outline","Outline (podium colors)")},{value:"solid",label:this._t("editor.rank_badge_solid","Solid")}]}}}]:[]]},{name:"show_form",label:this._t("editor.show_form","Show recent form"),default:!0,selector:{boolean:{}}},{name:"show_venue",label:this._t("editor.show_venue","Show venue"),default:!0,selector:{boolean:{}}}];return d`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${t=>t.label||t.title}
        .computeHelper=${t=>t.helper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="card-version">FFBB Tracker Card v${ee}</div>
    `}};customElements.get("ffbb-tracker-card-editor")||customElements.define("ffbb-tracker-card-editor",De);var Ne=class extends k{static get properties(){return{hass:{attribute:!1},_config:{state:!0},_activeModal:{state:!0},_manualView:{state:!0}}}constructor(){super(),this._translationsLang="en",this._translations=H("en"),this._activeModal=null,this._manualView=null}static async getConfigElement(){return document.createElement("ffbb-tracker-card-editor")}static getStubConfig(){return{entity:"",...te}}getCardSize(){return 3}setConfig(e){if(!e.entity)throw new Error("Please define an entity from the FFBB Tracker integration.");this._config={...te,...e}}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this.hass){let t=se(this.hass);t!==this._translationsLang&&(this._translationsLang=t,this._translations=H(t))}}_t(e,t=""){return ie(this._translations,e,t)}_colon(){return this._translationsLang==="fr"?"\xA0:":":"}_getRankClass(e){if(!e||this._config?.disable_podium_colors)return"";let t=String(e).trim().match(/^(\d+)/);if(!t)return"";let a=parseInt(t[1],10);return a===1?"rank-gold":a===2?"rank-silver":a===3?"rank-bronze":""}_resolveEntities(){return it(this._config.entity,this.hass?.states)}_formatDate(e){let t=this.hass?.locale?.language||this.hass?.language||"en-US";return Me(e,t)}_openMaps(e,t){let a=encodeURIComponent(`${e}${t}`.trim());window.open(`https://www.google.com/maps/search/?api=1&query=${a}`,"_blank","noreferrer")}_openCalendar(e,t,a,o,r){if(!e||e==="unknown"||e==="unavailable")return;let s=new Date(e);if(isNaN(s.getTime()))return;let l=new Date(s.getTime()+7200*1e3),i=f=>f.toISOString().replace(/[-:]|\.\d{3}/g,""),c=`${t} vs${a}`,u=`${o}${r}`.trim(),h=`FFBB match: ${t} vs${a}`,m=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(c)}&dates=${i(s)}/${i(l)}&details=${encodeURIComponent(h)}&location=${encodeURIComponent(u)}`;window.open(m,"_blank","noreferrer")}_handleLogoClick(e,t,a){let o=this._config.logo_click_action||"team_url";o==="team_url"?t?window.open(t,"_blank","noreferrer"):(console.warn(`[FFBB Tracker Card] No URL found for team: "${a}".`),e&&this._fireMoreInfo(e)):o==="more-info"&&e&&this._fireMoreInfo(e)}_fireMoreInfo(e){let t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_openModal(e){this._activeModal=e}_closeModal(){this._activeModal=null}_setManualView(e){this._manualView=e}_onKeyActivate(e){return t=>{(t.key==="Enter"||t.key===" "||t.key==="Spacebar")&&(t.preventDefault(),e())}}_extractCalendarMatches(e){let t=this._config.entity?this.hass?.states[this._config.entity]:null;return lt(e,t)}_renderModal(e,t,a){if(!this._activeModal)return d``;if(this._activeModal==="standings"){let o=e.rank?.attributes?.standings||[],r=dt(o),s=e.poule?.attributes?.competition||"",l=e.poule?.state||"";return d`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${i=>{i.key==="Escape"&&this._closeModal()}}
        >
          <div class="modal-card" @click=${i=>i.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            ${s?d`<div class="modal-subtitle">${s}</div>`:""}
            <div class="modal-body">
              ${r.length>0?d`
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
                        ${r.map(i=>{let c=w(i.team_name||i.name||""),u=w(t),h=w(a),m=!!(c&&u&&(c===u||c.includes(u)||u.includes(c))),f=!!(c&&h&&(c===h||c.includes(h)||h.includes(c)));return d`
                            <tr class=${m||f?"highlight-row":""}>
                              <td class="pos-cell">${i.position||i.rank||"-"}</td>
                              <td class="col-team">${i.team_name||i.name||"-"}</td>
                              <td class="pts-cell">${i.points??i.pts??"-"}</td>
                              <td>${i.played??i.joues??"-"}</td>
                              <td>${i.wins??i.gagnes??"-"}</td>
                              <td>${i.losses??i.perdus??"-"}</td>
                              <td>${i.draws??i.nuls??i.nul??i.n??"0"}</td>
                            </tr>
                          `})}
                      </tbody>
                    </table>
                  `:d`
                    <div class="modal-empty-text">
                      ${this._t("card.no_standings","No standings data available.")}
                    </div>
                  `}
            </div>
          </div>
        </div>
      `}if(this._activeModal==="form"){let o=e.form?.state,r=o&&o!=="unknown"&&o!=="unavailable",s=r?o:"",l=r&&e.form?.attributes?.current_streak||"",i=s.split("-").filter(Boolean);return d`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${c=>{c.key==="Escape"&&this._closeModal()}}
        >
          <div class="modal-card" @click=${c=>c.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            <div class="modal-body form-modal-content">
              ${i.length>0?d`
                    <div class="form-badges-container">
                      ${i.map(c=>{let u="badge-draw",h=this._t("card.draw","Draw");return c==="V"||c==="W"?(u="badge-win",h=this._t("card.win","Win")):(c==="D"||c==="L")&&(u="badge-loss",h=this._t("card.loss","Loss")),d`
                          <div class="form-badge-pill ${u}">
                            <span class="pill-char">${c}</span>
                            <span class="pill-label">${h}</span>
                          </div>
                        `})}
                    </div>
                    ${l?d`
                          <div class="form-streak-box">
                            <span class="streak-label">${this._t("card.current_streak","Current streak")}${this._colon()}</span>
                            <strong class="streak-val">${l}</strong>
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
      `}if(this._activeModal==="calendar"){let o=this._extractCalendarMatches(e),r=e.poule?.attributes?.competition||"",s=e.poule?.state||"";return d`
        <div
          class="modal-backdrop"
          @click=${this._closeModal}
          @keydown=${l=>{l.key==="Escape"&&this._closeModal()}}
        >
          <div class="modal-card" @click=${l=>l.stopPropagation()}>
            <div class="modal-header">
              <div class="modal-title">
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
            ${r?d`<div class="modal-subtitle">${r}</div>`:""}
            <div class="modal-body">
              ${o.length>0?d`
                    <div class="calendar-list">
                      ${o.map(l=>{let i=l.home_team||l.equipe_domicile||"-",c=l.away_team||l.equipe_exterieur||"-",u=l.score||(l.home_score!==void 0?`${l.home_score} -${l.away_score}`:""),h=this._formatDate(l.date||l.datetime),m=w(i),f=w(c),_=w(t),E=!!(m&&_&&(m===_||m.includes(_)||_.includes(m))),L=!!(f&&_&&(f===_||f.includes(_)||_.includes(f)));return d`
                          <div class="calendar-row ${E||L?"highlight-row":""}">
                            <div class="calendar-col-round">
                              <span class="cal-round-tag">J${l.round||l.journee||"-"}</span>
                            </div>
                            <div class="calendar-col-teams">
                              <div class="cal-team ${E?"my-team-text":""}">${i}</div>
                              <div class="cal-team ${L?"my-team-text":""}">${c}</div>
                            </div>
                            <div class="calendar-col-meta">
                              ${u?d`<div class="cal-score">${u}</div>`:h?d`
                                    <div class="cal-date">${h.day}</div>
                                    <div class="cal-time">${h.time}</div>
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
      `}return d``}_computeViewModel(e){return ht({entities:e,config:this._config,manualView:this._manualView,states:this.hass?.states,lang:this._translationsLang,t:(t,a)=>this._t(t,a),isPreview:!!(this.preview||this.parentElement?.tagName==="HUI-CARD-PREVIEW"||this.closest&&this.closest("hui-card-preview"))})}render(){if(!this.hass||!this._config)return d``;let e=this._resolveEntities();if(!e)return d`
        <ha-card class="card-warning">
          ${this._t("card.not_configured","Card not configured")}
        </ha-card>
      `;let t=this._computeViewModel(e);return d`
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
    `}_renderHeader(e){let{showTitle:t,titleText:a,titleIcon:o}=e;return d`
      ${t&&(a||o)?d`
            <div class="card-header">
              ${o?d`<ha-icon .icon=${o}></ha-icon>`:""}
              ${a?d`<span class="card-header-title">${a}</span>`:""}
            </div>
          `:""}
    `}_renderWatermark(e){let{leftLogo:t,rightLogo:a}=e;return d`
      ${this._config.show_watermark?d`
            <img
              class="watermark watermark-left"
              src=${t}
              alt=""
              aria-hidden="true"
              @error=${o=>o.target.style.display="none"}
            />
            <img
              class="watermark watermark-right"
              src=${a}
              alt=""
              aria-hidden="true"
              @error=${o=>o.target.style.display="none"}
            />
          `:""}
    `}_renderMatchHeader(e){let{competition:t,pouleName:a,roundNumber:o}=e;return d`
      ${this._config.show_header?d`
            <div class="header">
              ${t||a?d`
                    <div class="header-main">
                      <span class="competition">${t}</span>
                      ${a?d`<span class="poule">• ${a}</span>`:""}
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
    `}_renderMatchArea(e,t){let{isValidState:a,isLive:o,canToggleView:r,isPostMatch:s,isGameDay:l,leftName:i,rightName:c,leftLogo:u,rightLogo:h,leftUrl:m,rightUrl:f,leftEntityId:_,rightEntityId:E,gymName:L,gymCity:x,dateFormatted:M,logoSizeClass:y,showRank:I,leftRank:T,rightRank:A,isCalendarClickable:$,isLogoClickable:v,hasStandingsData:g}=e,b=this._config?.solid_rank_badges?"rank-solid":"";return d`
      <div class="match-area">
        <div class="team-logo-cell cell-left">
          <div
            class="logo-box ${y} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(_,m,i)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(_,m,i)):p}
            role=${v?"button":p}
            tabindex=${v?"0":p}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",i):p}
          >
            <img
              class="logo"
              src=${u}
              alt=""
              @error=${C=>{C.target.src!==F&&(C.target.src=F)}}
            />
          </div>
        </div>

        <div class="center-meta-wrapper">
          ${r?d`
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
            class="center-meta ${$?"clickable":""}"
            @click=${()=>{$&&this._openCalendar(t.nextDate?.state,i,c,L,x)}}
            @keydown=${$?this._onKeyActivate(()=>this._openCalendar(t.nextDate?.state,i,c,L,x)):p}
            role=${$?"button":p}
            tabindex=${$?"0":p}
            aria-label=${$?this._t("card.add_to_calendar","Add to Google Calendar"):p}
            title=${$?this._t("card.add_to_calendar","Add to Google Calendar"):""}
          >
            ${o?d`
                  <div class="badge badge-live">
                    <span class="live-dot"></span>
                    <span>${this._t("card.live","Live")}</span>
                  </div>
                  <div class="live-clock">
                    ${M?`${this._t("card.kickoff","Kick-off")} ${M.time}`:""}
                  </div>
                `:s?d`
                  <div class="score-display">
                    ${a(t.lastScore?.state)?t.lastScore.state:"-"}
                  </div>
                  <div class="badge badge-${a(t.lastResult?.state)?t.lastResult.state:"draw"}">
                    ${this._t(`card.${a(t.lastResult?.state)?t.lastResult.state:"draw"}`)}
                  </div>
                `:d`
                  ${M?d`
                        <div class="match-day">${M.weekday} ${M.day}</div>
                        <div class="match-time">${M.time}</div>
                      `:d`<div class="match-time">-</div>`}
                  ${l&&!t.nextDate?.attributes?.is_stale?d`<div class="badge badge-gameday">${this._t("card.gameday","Game day")}</div>`:""}
                  ${t.nextDate?.attributes?.is_stale?d`<div class="badge badge-postponed">${this._t("card.postponed","Postponed")}</div>`:""}
                `}
          </div>

          ${r?d`
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
            class="logo-box ${y} ${v?"clickable":""}"
            @click=${()=>this._handleLogoClick(E,f,c)}
            @keydown=${v?this._onKeyActivate(()=>this._handleLogoClick(E,f,c)):p}
            role=${v?"button":p}
            tabindex=${v?"0":p}
            aria-label=${v?this._t("card.view_team","View {team}").replace("{team}",c):p}
          >
            <img
              class="logo"
              src=${h}
              alt=""
              @error=${C=>{C.target.src!==F&&(C.target.src=F)}}
            />
          </div>
        </div>

        <div class="team-name-cell name-left">
          <div class="team-title">${i}</div>
        </div>

        <div class="team-name-cell name-right">
          <div class="team-title">${c}</div>
        </div>

        ${I&&(T||A)?d`
              <div class="team-rank-cell rank-left">
                ${T?d`
                      <span
                        class="rank-badge ${this._getRankClass(T)} ${b} ${g?"clickable-badge":""}"
                        @click=${()=>{g&&this._openModal("standings")}}
                        @keydown=${g?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${g?"button":p}
                        tabindex=${g?"0":p}
                        aria-label=${g?this._t("card.view_standings","View league standings"):p}
                        title=${g?this._t("card.view_standings","View league standings"):""}
                      >${T}</span>
                    `:""}
              </div>
              <div class="team-rank-cell rank-right">
                ${A?d`
                      <span
                        class="rank-badge ${this._getRankClass(A)} ${b} ${g?"clickable-badge":""}"
                        @click=${()=>{g&&this._openModal("standings")}}
                        @keydown=${g?this._onKeyActivate(()=>this._openModal("standings")):p}
                        role=${g?"button":p}
                        tabindex=${g?"0":p}
                        aria-label=${g?this._t("card.view_standings","View league standings"):p}
                        title=${g?this._t("card.view_standings","View league standings"):""}
                      >${A}</span>
                    `:""}
              </div>
            `:""}
      </div>
    `}_renderFooter(e){let{gymName:t,gymCity:a,hasValidForm:o,isPreview:r,displayFormSequence:s,displayFormStreak:l,showFormBlock:i}=e;return d`
      ${i?d`
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
              <span class="form-sequence">${s}</span>${l?d`<span class="form-streak">(${l})</span>`:""}
              ${!o&&r?d`<span class="form-preview-tag">(${this._t("card.preview_example","example")})</span>`:""}
            </div>
          `:""}

      ${this._config.show_venue&&(t||a)?d`
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
    `}static get styles(){return ft}};customElements.get("ffbb-tracker-card")||customElements.define("ffbb-tracker-card",Ne);console.info(`%c FFBB Tracker Card %c v${ee} `,"color: white; background: #e02424; font-weight: 700; border-radius: 3px 0 0 3px;","color: #e02424; background: white; font-weight: 700; border-radius: 0 3px 3px 0;");window.customCards=window.customCards||[];var _t=window.customCards.findIndex(n=>n.type==="ffbb-tracker-card"),gt={type:"ffbb-tracker-card",name:`FFBB Tracker v${ee}`,preview:!0,description:"Display French Basketball Federation match schedules, live scores, and gym venue."};_t!==-1?window.customCards[_t]=gt:window.customCards.push(gt);
