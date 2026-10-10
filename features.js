const menuButton = document.querySelector('#download-menu');
for(const [id,url] of [['#platform-instagram',config.instagramUrl],['#platform-zomato',config.zomatoUrl],['#platform-swiggy',config.swiggyUrl]])configuredLink(id,url);
const hasPlatforms=[config.instagramUrl,config.zomatoUrl,config.swiggyUrl].some(url=>url&&safeUrl(url));
document.querySelector('#platform-pending').hidden=hasPlatforms&&!config.platformLinksSample;
if(config.platformLinksSample)document.querySelector('#platform-pending').textContent='Sample links open the platform homepages. Replace them with Rivaan’s official listings before launch.';
if(config.heroImage&&safeUrl(config.heroImage)){const image=document.querySelector('[data-image=heroImage]');image.src=safeUrl(config.heroImage);image.alt=config.heroAlt||image.alt;}
if(config.ingredientsImage&&safeUrl(config.ingredientsImage))document.querySelector('[data-image=ingredientsImage]').src=safeUrl(config.ingredientsImage);
if(config.kitchenPhoto&&safeUrl(config.kitchenPhoto)){const image=document.createElement('img');image.src=safeUrl(config.kitchenPhoto);image.alt=config.kitchenPhotoAlt||'Rivaan’s kitchen';image.loading='lazy';image.className='actual-kitchen';document.querySelector('.kitchen-placeholder').replaceWith(image);}
document.querySelectorAll('[data-phone]').forEach(link=>{if(link.classList.contains('phone'))link.textContent=config.phone;});
const menuDialog = document.querySelector('#menu-dialog');
if (config.menuUrl && safeUrl(config.menuUrl)) {
  menuButton.href = safeUrl(config.menuUrl);
  menuButton.download = 'Rivaans-menu.pdf';
  // Browsers only honour download for same-origin files. Remote menus open safely.
  if (new URL(menuButton.href).origin !== location.origin) { menuButton.target = '_blank'; menuButton.rel = 'noopener noreferrer'; }
} else menuButton.addEventListener('click', event => { event.preventDefault(); menuDialog.showModal(); });
document.querySelector('.menu-close').addEventListener('click', () => menuDialog.close());
menuDialog.addEventListener('click', event => { if (event.target === menuDialog) { const r=menuDialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) menuDialog.close(); } });
const video = document.querySelector('#restaurant-video');
const play = document.querySelector('#reel-play');
if (config.reelVideoUrl && safeUrl(config.reelVideoUrl)) {
  video.src = safeUrl(config.reelVideoUrl); video.hidden=false; play.hidden=true;
  document.querySelector('.reel-poster>img').hidden=true;
  document.querySelector('#reel-status').textContent=config.sampleContent?'Sample reel: a slideshow of illustrative food photographs, not footage of Rivaan’s.':'A moment at Rivaan’s. Press play to take a look.';
  video.addEventListener('error',()=>{ document.querySelector('#reel-status').textContent='The video could not load. Please try again later.'; });
} else if (config.reelUrl && safeUrl(config.reelUrl)) {
  play.href=safeUrl(config.reelUrl); play.target='_blank'; play.rel='noopener noreferrer'; play.lastElementChild.textContent='Watch our reel';
  document.querySelector('#reel-status').textContent='Watch a moment at Rivaan’s on Instagram.';
}
if (config.ownerPhoto && safeUrl(config.ownerPhoto)) {
  const img=document.createElement('img');img.src=safeUrl(config.ownerPhoto);img.alt='Abhijeet Badave, owner of Rivaan’s'; img.loading='lazy';
  img.addEventListener('error',()=>{document.querySelector('#owner-portrait').textContent='AB';});document.querySelector('#owner-portrait').replaceChildren(img);
}
if (config.ownerStory) document.querySelector('#owner-story').textContent=config.ownerStory;
function renderDishes(){
  const dishList=config.signatureDishes.filter(dish=>dish.name && dish.description && safeUrl(dish.image));
  if(!dishList.length)return;
  const mr=document.documentElement.lang==='mr-IN'; const grid=document.querySelector('#signature-dishes');grid.replaceChildren();
  dishList.forEach(dish=>{
    const article=document.createElement('article');article.className='food-card';
    const img=document.createElement('img');img.src=safeUrl(dish.image);img.alt=dish.alt||dish.name;img.loading='lazy';img.width=800;img.height=600;handleImageError(img);
    const box=document.createElement('div');const name=document.createElement('h3');name.textContent=mr&&dish.nameMr?dish.nameMr:dish.name;
    const description=document.createElement('p');description.textContent=mr&&dish.descriptionMr?dish.descriptionMr:dish.description;
    const price=document.createElement('strong');price.className='dish-price';price.textContent=Number.isFinite(dish.price)&&dish.price>=0?new Intl.NumberFormat(mr?'mr-IN':'en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(dish.price):(mr?'किंमत विचारा':'Ask for price');
    const portion=document.createElement('small');portion.textContent=mr&&dish.portionMr?dish.portionMr:(dish.portion||'');
    if(config.sampleContent){const label=document.createElement('span');label.className='sample-label';label.textContent=mr?'नमुना पदार्थ · नमुना किंमत':'Sample dish · sample price';box.append(label);}
    box.append(name,description,price,portion);article.append(img,box);grid.append(article);
  });
  document.querySelector('#flavours>.photo-note').textContent=config.sampleContent?(mr?'डिझाइनसाठी नमुना पदार्थ, किमती आणि प्रमाण. ही Rivaan’s ची निश्चित मेनू माहिती नाही.':'Sample dishes, prices and portions for design review. These are not the confirmed Rivaan’s menu.'):(mr?'सध्याच्या उपलब्धतेसाठी रेस्टॉरंटशी संपर्क करा.':'Contact the restaurant for current availability.');
}
renderDishes();
function renderSampleReviews(){
  if(!config.sampleContent||config.reviews.length||!config.sampleReviews?.length)return;
  const mr=document.documentElement.lang==='mr-IN';const list=document.querySelector('#review-list');list.replaceChildren();
  config.sampleReviews.forEach(review=>{const card=document.createElement('article');card.className='real-review sample-review';const label=document.createElement('span');label.className='sample-label';label.textContent=mr?'नमुना अभिप्राय · फक्त डिझाइनसाठी':'Sample testimonial · design preview';const quote=document.createElement('blockquote');quote.textContent=mr?review.textMr:review.text;const name=document.createElement('strong');name.textContent=mr?review.nameMr:review.name;card.append(label,quote,name);list.append(card);});
}
renderSampleReviews();
if(config.sampleContent){menuButton.querySelector('.menu-label').textContent='Sample menu';menuButton.download='Rivaans-sample-menu.pdf';menuButton.title='Sample menu and prices for design review';}
document.addEventListener('rivaans:language',()=>{renderDishes();renderSampleReviews();if(config.ownerStory) document.querySelector('#owner-story').textContent=document.documentElement.lang==='mr-IN'&&config.ownerStoryMr?config.ownerStoryMr:config.ownerStory;});
document.querySelectorAll('[data-occasion]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#visit-occasion').value=link.dataset.occasion;document.querySelector('#guest-name').focus({preventScroll:true});}));
