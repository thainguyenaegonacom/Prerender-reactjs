(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[51],{294:function(e,t,i){"use strict";i.r(t);var n=i(5),a=i(2),o=i.n(a),d=i(14),l=i(10),c=i(1),r=i(64),u=i(318),s=i(28),v=i(21),h=i(56),p=i(0);function j(e){var t=e.width,i=void 0===t?"100%":t,n=e.src,a=e.type,o=e.link,d=e.muted,l=void 0===d||d,c=e.autoplay,r=void 0===c||c,u=e.loop,s=void 0===u||u,j=function(){return Object(p.jsx)("div",{className:"video-wrapper",children:Object(p.jsx)("video",{style:{width:i,height:h.isMobile?"auto":"100%"},className:"video-preview",muted:l,autoPlay:r,loop:s,children:Object(p.jsx)("source",{src:n,type:a})})})};return o?Object(p.jsx)(v.b,{to:o,children:j()}):j()}var b=Object(c.memo)(j),f=i(11),m=i(6),x=i(50);function O(e){var t=e.slides,i=e.dragOrAuto,a=void 0!==i&&i,v=e.maxWidth,h=e.maxHeight,j=e.hasText,O=void 0!==j&&j,g=Object(c.useState)(0),k=Object(l.a)(g,2),y=k[0],w=k[1],N=Object(c.useState)([]),H=Object(l.a)(N,2),I=H[0],P=H[1];Object(c.useEffect)((function(){function e(){return(e=Object(d.a)(o.a.mark((function e(){var i,n,a,d,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=null===x.a||void 0===x.a||null===(i=x.a.find((function(e){return"Product Detail Page"==e.name})))||void 0===i?void 0:i.path,a=[],d=[],(null===t||void 0===t?void 0:t.length)>0&&t.forEach((function(e,t){if(null===e||void 0===e?void 0:e.product){var i,n={};n.index=t,n.productLink=null===e||void 0===e?void 0:e.product,d.push(n);var o={url:"".concat(m.m).concat(null===e||void 0===e||null===(i=e.product)||void 0===i?void 0:i.id,"/"),method:"GET",body:null};a.push(Object(f.e)(o))}})),e.prev=4,l=[],e.next=8,Promise.all(a);case 8:e.sent.forEach((function(e){var t,i,a={};a.id=e.id,a.url=n.replace(":IDBrand",null===e||void 0===e||null===(t=e.brand_page)||void 0===t||null===(i=t.page_ptr)||void 0===i?void 0:i.slug).replace(":IDProduct",e.handle),l.push(a)})),P(l),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(4);case 15:case"end":return e.stop()}}),e,null,[[4,13]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[t]);var S=s.b?135:s.a?120:window.innerHeight-192;return Object(p.jsx)("section",{className:"blk-carousel",children:Object(p.jsx)("div",{className:"carousel-block ".concat(O&&"has-text"),style:{maxWidth:v?"".concat(v,"px"):"",maxHeight:(S>737?737:S)+"px",height:S},children:Object(p.jsx)(u.a,{onSlideComplete:w,activeIndex:y,threshHold:s.a?100:500,transition:s.a?.2:.8,scaleOnDrag:!1,isSquare:!1,dragOrAuto:a,slideInterval:5e3,children:t.map((function(e,t){var i,o=null===I||void 0===I?void 0:I.find((function(t){var i;return(null===t||void 0===t?void 0:t.id)==(null===e||void 0===e||null===(i=e.product)||void 0===i?void 0:i.id)}));return Object(p.jsxs)("div",{className:"animated faster fadeIn",children:[a?Object(p.jsx)("a",{className:"nav-link-full-img",href:(null===e||void 0===e?void 0:e.link)?null===e||void 0===e||null===(i=e.link)||void 0===i?void 0:i.full_url:o?null===o||void 0===o?void 0:o.url:""}):"",e.video&&e.video.src.length?Object(p.jsx)(b,{src:e.video.src[0].src,type:e.video.src[0].type}):Object(p.jsx)(r.default,{data:Object(n.a)(Object(n.a)({},e.background),{},{maxHeight:h,maxWidth:v})}),(null===e||void 0===e?void 0:e.text)?Object(p.jsx)("div",{className:"content-slide",dangerouslySetInnerHTML:{__html:null===e||void 0===e?void 0:e.text}}):""]},t)}))})})})}t.default=Object(c.memo)(O)}}]);
//# sourceMappingURL=51.f9338d7b.chunk.js.map