(self.webpackChunkblog_farazshaikh_com=self.webpackChunkblog_farazshaikh_com||[]).push([[678],{383:function(e,t,a){"use strict";a.d(t,{E:function(){return i}});var r=a(6156),n=a(7294),l=a(6802);function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){(0,r.Z)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var i=function(e){var t=e.post,a=e.style;return t.frontmatter&&t.frontmatter.featuredImage?n.createElement(n.Fragment,null,"gif"===t.frontmatter.featuredImage.extension?n.createElement("img",{src:t.frontmatter.featuredImage.publicURL,alt:"gif",style:c({},a)}):n.createElement(l.G,{style:c({},a),image:t.frontmatter.featuredImage.childImageSharp.gatsbyImageData,alt:"image"})):n.createElement(n.Fragment,null)}},6106:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return i}});var r=a(7294),n=a(2565),l=a(5444),s=a(383),c=function(e){var t=e.post,a=e.index;return r.createElement("div",{style:{display:"flex",marginTop:"1em"}},r.createElement(l.rU,{className:"box",to:t.frontmatter.slug},r.createElement("figure",{className:"image"},r.createElement(s.E,{post:t})),r.createElement("div",null,r.createElement("h1",{className:"title is-4"},t.frontmatter.title),r.createElement("h2",{className:"subtitle is-5 is-italic "},t.frontmatter.subtitle),r.createElement("span",{className:"tag"},t.frontmatter.date),r.createElement("span",{className:"tag ml-1"},t.fields.readingTime.text),0===a?r.createElement("span",{className:"tag ml-1",style:{backgroundColor:"limegreen",color:"black"}},"Latest"):r.createElement(r.Fragment,null),r.createElement("br",null),r.createElement("br",null),r.createElement("span",null,t.frontmatter.summary))))},i=function(e){var t,a,l=e.data.allMdx.edges,s=e.location,i=(0,r.useState)(!1),o=i[0],m=i[1],u=l.map((function(e,t){return r.createElement(c,{key:e.node.id,index:t,post:e.node})}));if(o){var f=Math.ceil(u.length/2);t=u.slice(0,f),a=u.slice(-f)}else t=u.filter((function(e,t){return t%2!=0})),a=u.filter((function(e,t){return t%2==0}));return(0,r.useEffect)((function(){m(window.innerWidth<1024)}),[o]),r.createElement(n.g,{is404:!1,title:"",description:"A list of all my posts. Stuff I find cool, intresting, or both.",pathname:s.pathname},r.createElement("div",{id:"stories",className:"columns is-mobile"},r.createElement("div",{className:"column is-above-canvas"},r.createElement("div",null,r.createElement("h1",{className:"title is-2"},"Stories"),r.createElement("h4",{className:"subtitle is-4 mt-1"},"Sometimes I write about things I find cool, intresting, or both.")),t),r.createElement("div",{className:"column is-above-canvas"},a)),r.createElement("div",{className:"has-text-centered is-6 is-above-canvas"},"More coming soon..."))}}}]);
//# sourceMappingURL=component---src-pages-index-js-7d57898b893482498345.js.map