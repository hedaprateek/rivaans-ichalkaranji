const config = window.RIVAANS;
const $ = selector => document.querySelector(selector);
const safeUrl = value => { try { const url = new URL(value, document.baseURI); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
const whatsappUrl = message => `https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl(link.dataset.whatsapp); });
document.querySelectorAll('[data-phone]').forEach(link => { link.href = `tel:${config.phone.replace(/[^+\d]/g, '')}`; });
function configuredLink(selector, url) {
  const link = $(selector); const valid = url && safeUrl(url);
  if (valid) { link.href = valid; link.hidden = false; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
}
configuredLink('#map-link', config.mapsUrl);
configuredLink('#instagram-link', config.instagramUrl);
configuredLink('#google-reviews', config.reviewsUrl);
if (config.menuUrl && safeUrl(config.menuUrl)) { configuredLink('#menu-link', config.menuUrl); $('#menu-link').removeAttribute('data-whatsapp'); $('#menu-link').textContent = config.sampleContent?'View the sample menu (design preview).':'View our current menu.'; }
if (config.address) $('#address').textContent = config.address;
if (config.hours) $('#hours').textContent = config.hours;
if (config.kitchenStatement) $('#kitchen-story').textContent = config.kitchenStatement;
if (config.sourcingStatement) $('#sourcing-story').textContent = config.sourcingStatement;
$('#year').textContent = new Date().getFullYear();
const navToggle = $('.nav-toggle');
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  const englishLabel=open?'Close navigation':'Open navigation';navToggle.dataset.originalarialabel=englishLabel;
  navToggle.setAttribute('aria-label', document.documentElement.lang==='mr-IN'?(open?'मेनू बंद करा':'मेनू उघडा'):englishLabel);
  $('#navigation').classList.toggle('open', open);
});
$('#navigation').addEventListener('click', event => { if (event.target.closest('a') && navToggle.getAttribute('aria-expanded')==='true') navToggle.click(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') navToggle.click(); });
function handleImageError(img) { img.addEventListener('error', () => img.parentElement.classList.add('image-error')); if (img.complete && !img.naturalWidth) img.parentElement.classList.add('image-error'); }
document.querySelectorAll('img:not(#dialog-image)').forEach(handleImageError);
const dialog = $('#photo-dialog');
function renderGallery(filter = 'all') {
  $('#gallery').replaceChildren();
  config.gallery.filter(photo => filter === 'all' || photo.category === filter).forEach(photo => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'gallery-card'; button.setAttribute('aria-label', `Enlarge photo: ${photo.title}`);
    const wrap = document.createElement('div'); wrap.className = 'image-wrap';
    const img = document.createElement('img'); img.src = safeUrl(photo.src); img.alt = photo.alt; img.loading = 'lazy'; img.width = 900; img.height = 700; handleImageError(img); wrap.append(img);
    const title = document.createElement('p'); title.textContent = `${photo.title} ↗`; button.append(wrap, title);
    if (photo.illustrative) { const tag = document.createElement('span'); tag.className = 'image-tag'; tag.textContent = 'ILLUSTRATIVE PHOTO'; button.append(tag); }
    button.addEventListener('click', () => { $('#dialog-image').src = img.src; $('#dialog-image').alt = photo.alt; $('#photo-title').textContent = photo.title; $('#photo-disclosure').textContent = photo.illustrative ? 'Stock photograph for inspiration; this does not depict Rivaan’s.' : 'Rivaan’s, Ichalkaranji'; dialog.showModal(); });
    $('#gallery').append(button);
  });
}
renderGallery();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderGallery(button.dataset.filter);
}));
$('#photo-dialog .dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
const reviews = config.reviews.filter(review => review.name && review.text && safeUrl(review.url));
if (reviews.length) {
  $('#review-list').replaceChildren();
  reviews.forEach(review => {
    const article = document.createElement('article'); article.className = 'real-review';
    const quote = document.createElement('blockquote'); quote.textContent = review.text;
    const name = document.createElement('strong'); name.textContent = review.name;
    const source = document.createElement('a'); source.textContent = `Read original on ${review.source || 'review source'} ↗`; source.href = safeUrl(review.url); source.target = '_blank'; source.rel = 'noopener noreferrer';
    article.append(quote, name, source); $('#review-list').append(article);
  });
}
function indiaDate() { const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()); const part = type => parts.find(p => p.type === type).value; return `${part('year')}-${part('month')}-${part('day')}`; }
$('#visit-date').min = indiaDate();
function buildRsvpMessage(data) {
  const name = String(data.get('name')).trim();
  const date = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${data.get('date')}T12:00:00`));
  const occasions = { meal: 'Meal together', birthday: 'Birthday', family: 'Family occasion', group: 'Friends / group gathering', other: 'Other occasion' };
  return `Hi Abhijeet! I’d like to RSVP at Rivaan’s.\n\nName: ${name}\nOccasion: ${occasions[data.get('occasion')] || 'Meal together'}\nPreferred date: ${date}\nPreferred time: ${data.get('time')}\nGuests: ${data.get('guests')}${String(data.get('note')).trim() ? `\nNote: ${String(data.get('note')).trim()}` : ''}\n\nPlease confirm availability and any arrangements or charges. I understand this RSVP is pending your confirmation.`;
}
$('#visit-form').addEventListener('submit', event => {
  event.preventDefault(); $('#visit-date').min = indiaDate();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget); const name = String(data.get('name')).trim();
  if (!name) { $('#guest-name').setCustomValidity('Please enter your name.'); $('#guest-name').reportValidity(); return; }
  const message = buildRsvpMessage(data);
  $('#form-status').hidden = false; $('#form-status').textContent = document.documentElement.lang==='mr-IN' ? 'WhatsApp उघडत आहे. RSVP पूर्ण करण्यासाठी तेथे संदेश पाठवा.' : 'Opening WhatsApp. Please send your message there to complete the enquiry.';
  location.href = whatsappUrl(message);
});
$('#guest-name').addEventListener('input', event => event.target.setCustomValidity(''));
