import{j as v,R as x,c as N,r as m,a as g}from"./jsx-runtime.04992bd5.js";/* empty css                       */import{_ as A,f as $,a as S,T as _}from"./Transition.dd47f3eb.js";function L(e,n){return e.classList?!!n&&e.classList.contains(n):(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+n+" ")!==-1}function T(e,n){e.classList?e.classList.add(n):L(e,n)||(typeof e.className=="string"?e.className=e.className+" "+n:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+n))}function h(e,n){return e.replace(new RegExp("(^|\\s)"+n+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}function R(e,n){e.classList?e.classList.remove(n):typeof e.className=="string"?e.className=h(e.className,n):e.setAttribute("class",h(e.className&&e.className.baseVal||"",n))}var b=function(n,i){return n&&i&&i.split(" ").forEach(function(s){return T(n,s)})},f=function(n,i){return n&&i&&i.split(" ").forEach(function(s){return R(n,s)})},C=function(e){A(n,e);function n(){for(var s,o=arguments.length,p=new Array(o),l=0;l<o;l++)p[l]=arguments[l];return s=e.call.apply(e,[this].concat(p))||this,s.appliedClasses={appear:{},enter:{},exit:{}},s.onEnter=function(a,r){var t=s.resolveArguments(a,r),c=t[0],d=t[1];s.removeClasses(c,"exit"),s.addClass(c,d?"appear":"enter","base"),s.props.onEnter&&s.props.onEnter(a,r)},s.onEntering=function(a,r){var t=s.resolveArguments(a,r),c=t[0],d=t[1],u=d?"appear":"enter";s.addClass(c,u,"active"),s.props.onEntering&&s.props.onEntering(a,r)},s.onEntered=function(a,r){var t=s.resolveArguments(a,r),c=t[0],d=t[1],u=d?"appear":"enter";s.removeClasses(c,u),s.addClass(c,u,"done"),s.props.onEntered&&s.props.onEntered(a,r)},s.onExit=function(a){var r=s.resolveArguments(a),t=r[0];s.removeClasses(t,"appear"),s.removeClasses(t,"enter"),s.addClass(t,"exit","base"),s.props.onExit&&s.props.onExit(a)},s.onExiting=function(a){var r=s.resolveArguments(a),t=r[0];s.addClass(t,"exit","active"),s.props.onExiting&&s.props.onExiting(a)},s.onExited=function(a){var r=s.resolveArguments(a),t=r[0];s.removeClasses(t,"exit"),s.addClass(t,"exit","done"),s.props.onExited&&s.props.onExited(a)},s.resolveArguments=function(a,r){return s.props.nodeRef?[s.props.nodeRef.current,a]:[a,r]},s.getClassNames=function(a){var r=s.props.classNames,t=typeof r=="string",c=t&&r?r+"-":"",d=t?""+c+a:r[a],u=t?d+"-active":r[a+"Active"],E=t?d+"-done":r[a+"Done"];return{baseClassName:d,activeClassName:u,doneClassName:E}},s}var i=n.prototype;return i.addClass=function(o,p,l){var a=this.getClassNames(p)[l+"ClassName"],r=this.getClassNames("enter"),t=r.doneClassName;p==="appear"&&l==="done"&&t&&(a+=" "+t),l==="active"&&o&&$(o),a&&(this.appliedClasses[p][l]=a,b(o,a))},i.removeClasses=function(o,p){var l=this.appliedClasses[p],a=l.base,r=l.active,t=l.done;this.appliedClasses[p]={},a&&f(o,a),r&&f(o,r),t&&f(o,t)},i.render=function(){var o=this.props;o.classNames;var p=S(o,["classNames"]);return v(_,{...p,onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited})},n}(x.Component);C.defaultProps={classNames:""};C.propTypes={};const j=C,w=()=>{const[e,n]=m.exports.useState(!1);return g("div",{children:[v("p",{children:g("label",{children:[v("input",{type:"checkbox",checked:e,onChange:i=>n(i.target.checked)}),"in"]})}),v(j,{in:e,timeout:1e3,children:i=>v("p",{children:i})})]})};N(document.getElementById("root")).render(v(m.exports.StrictMode,{children:v(w,{})}));
