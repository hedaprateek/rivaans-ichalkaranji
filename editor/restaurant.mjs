const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function renderRestaurantHtml(html,data){
  html=html.replace(/<([a-z][\w:-]*)\b([^>]*data-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi,(original,tag,attrs,key)=>typeof data.copy?.[key]?.en==='string'?`<${tag}${attrs}>${escape(data.copy[key].en)}</${tag}>`:original);
  const name=data.name||'Rivaan’s';const title=`${name} | Pure Veg Multicuisine Restaurant in ${data.city||'Ichalkaranji'}`;
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${escape(title)}</title>`).replace(/(<a\b[^>]*class="brand"[^>]*>)[^<]+/g,(_,open)=>open+escape(name));
  html=html.replace(/(<meta\b[^>]*property="og:title"[^>]*content=")[^"]*("[^>]*>)/gi,(_,open,close)=>open+escape(title)+close);
  if(data.description)html=html.replace(/(<meta\b[^>]*(?:name="description"|property="og:description")[^>]*content=")[^"]*("[^>]*>)/gi,(_,a,b)=>a+escape(data.description)+b);
  const schema={'@context':'https://schema.org','@type':'Restaurant',name,telephone:data.phone,servesCuisine:data.cuisine,address:{'@type':'PostalAddress',streetAddress:data.address,addressLocality:data.city,addressRegion:'Maharashtra',addressCountry:'IN'},founder:{'@type':'Person',name:data.owner},url:data.siteUrl};
  if(data.siteUrl)schema.image=new URL('assets/social-card.png',data.siteUrl).href;
  html=html.replace(/(<script id="restaurant-schema" type="application\/ld\+json">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+JSON.stringify(schema).replaceAll('<','\\u003c')+b);
  html=html.replace(/<img\b([^>]*data-image="([^"]+)"[^>]*)>/g,(original,attrs,key)=>data[key]?'<img'+attrs.replace(/src="[^"]*"/,`src="${escape(data[key])}"`)+'>':original);
  for(const [id,value]of [['address',data.address],['hours',data.hours],['kitchen-story',data.kitchenStatement],['sourcing-story',data.sourcingStatement],['owner-story',data.ownerStory]])if(value)html=html.replace(new RegExp(`(<p[^>]*id="${id}"[^>]*>)[\\s\\S]*?(</p>)`),(_,a,b)=>a+escape(value)+b);
  if(data.siteUrl){html=html.replace(/(<link rel="canonical" href=")[^"]*(")/,(_,a,b)=>a+escape(data.siteUrl)+b).replace(/(<meta property="og:url" content=")[^"]*(")/,(_,a,b)=>a+escape(data.siteUrl)+b);html=html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g,(_,a,b)=>a+escape(new URL('assets/social-card.png',data.siteUrl).href)+b);}
  return html;
}
