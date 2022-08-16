import{r as h,j as u,R as x,c as b,a as f}from"./jsx-runtime.04992bd5.js";import{_ as C,a as F,b as E,T as M}from"./Transition.dd47f3eb.js";function m(){return m=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},m.apply(this,arguments)}function D(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t,e){var r=function(i){return e&&h.exports.isValidElement(i)?e(i):i},a=Object.create(null);return t&&h.exports.Children.map(t,function(n){return n}).forEach(function(n){a[n.key]=r(n)}),a}function j(t,e){t=t||{},e=e||{};function r(c){return c in e?e[c]:t[c]}var a=Object.create(null),n=[];for(var i in t)i in e?n.length&&(a[i]=n,n=[]):n.push(i);var o,l={};for(var s in e){if(a[s])for(o=0;o<a[s].length;o++){var d=a[s][o];l[a[s][o]]=r(d)}l[s]=r(s)}for(o=0;o<n.length;o++)l[n[o]]=r(n[o]);return l}function p(t,e,r){return r[e]!=null?r[e]:t.props[e]}function A(t,e){return v(t.children,function(r){return h.exports.cloneElement(r,{onExited:e.bind(null,r),in:!0,appear:p(r,"appear",t),enter:p(r,"enter",t),exit:p(r,"exit",t)})})}function I(t,e,r){var a=v(t.children),n=j(e,a);return Object.keys(n).forEach(function(i){var o=n[i];if(!!h.exports.isValidElement(o)){var l=i in e,s=i in a,d=e[i],c=h.exports.isValidElement(d)&&!d.props.in;s&&(!l||c)?n[i]=h.exports.cloneElement(o,{onExited:r.bind(null,o),in:!0,exit:p(o,"exit",t),enter:p(o,"enter",t)}):!s&&l&&!c?n[i]=h.exports.cloneElement(o,{in:!1}):s&&l&&h.exports.isValidElement(d)&&(n[i]=h.exports.cloneElement(o,{onExited:r.bind(null,o),in:d.props.in,exit:p(o,"exit",t),enter:p(o,"enter",t)}))}}),n}var O=Object.values||function(t){return Object.keys(t).map(function(e){return t[e]})},T={component:"div",childFactory:function(e){return e}},g=function(t){C(e,t);function e(a,n){var i;i=t.call(this,a,n)||this;var o=i.handleExited.bind(D(i));return i.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},i}var r=e.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(n,i){var o=i.children,l=i.handleExited,s=i.firstRender;return{children:s?A(n,l):I(n,o,l),firstRender:!1}},r.handleExited=function(n,i){var o=v(this.props.children);n.key in o||(n.props.onExited&&n.props.onExited(i),this.mounted&&this.setState(function(l){var s=m({},l.children);return delete s[n.key],{children:s}}))},r.render=function(){var n=this.props,i=n.component,o=n.childFactory,l=F(n,["component","childFactory"]),s=this.state.contextValue,d=O(this.state.children).map(o);return delete l.appear,delete l.enter,delete l.exit,i===null?u(E.Provider,{value:s,children:d}):u(E.Provider,{value:s,children:u(i,{...l,children:d})})},e}(x.Component);g.propTypes={};g.defaultProps=T;const V=g,R=({name:t,state:e,onDelete:r})=>f("li",{children:[`(${e}) ${t} `,e.includes("enter")&&u("button",{onClick:r,children:"Delete"})]}),S=()=>{const[{itemCounter:t,items:e},r]=h.exports.useState({itemCounter:2,items:["Item 1"]}),a=l=>r({itemCounter:t+1,items:l});return f("div",{children:[f("p",{children:[u("button",{onClick:()=>{a([`Item ${t}`,...e])},children:"\u5148\u982D\u306B\u8FFD\u52A0"}),u("button",{onClick:()=>{const l=Math.floor(e.length/2);a([...e.slice(0,l),`Item ${t}`,...e.slice(l)])},children:"\u4E2D\u592E\u306B\u8FFD\u52A0"}),u("button",{onClick:()=>{a([...e,`Item ${t}`])},children:"\u672B\u5C3E\u306B\u8FFD\u52A0"})]}),u("ul",{children:u(V,{children:e.map((l,s)=>{const d=()=>{const c=[...e];c.splice(s,1),r({itemCounter:t,items:c})};return u(M,{timeout:1e3,children:c=>u(R,{name:l,state:c,onDelete:d})},l)})})})]})};b(document.getElementById("root")).render(u(h.exports.StrictMode,{children:u(S,{})}));