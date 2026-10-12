# Rivaan’s · Ichalkaranji

Pure vegetarian multicuisine restaurant opposite Lions Club, Ichalkaranji. Owner: Abhijeet Badave, +91 90111 00291.

**Live website:** https://hedaprateek.github.io/rivaans-ichalkaranji/

## Edit and publish locally

1. Double-click **edit.cmd** and open http://localhost:8793/editor/.
2. Edit restaurant details, platform links, dishes, photographs, videos, reviews and bilingual page text. Preview changes on desktop or mobile.
3. Click **Save draft**. Drafts and revision backups stay in `.editor-data/` and are excluded from Git.
4. Click **Apply locally** to update the saved site on this computer.
5. Click **Publish website**, check `hedaprateek/rivaans-ichalkaranji` and branch `main`, review the files, then publish. Changes appear after GitHub Pages deploys.

Install Node.js 22+ and Git for Windows. No npm install is needed. GitHub publishing uses the sign-in stored in Git Credential Manager; credentials are never returned to the browser or saved in site files. Use the existing Git account switcher if needed.

The editor binds to 127.0.0.1, checks local origin and session tokens, rejects stale drafts/publication reviews, and does not force-overwrite remote commits. The public site is static; editing and publishing run from this computer. **start.cmd** opens the same local server at http://localhost:8793.

## Content and uploads

- Instagram, Zomato and Swiggy currently use labelled sample links to platform homepages. Replace them with the restaurant’s official profile/listing URLs, then disable the sample-links checkbox.
- The requested dummy dishes, prices, portions, testimonials, PDF menu and video slideshow are labelled as samples. Replace them with verified information, genuine reviews and real footage before disabling sample mode.
- Upload JPG/PNG/WebP images, PDF menus, and MP4/WebM videos up to 8 MB through the editor. Uploaded assets are in `assets/uploads/`.
- English and Marathi page text are editable. Signature dishes have separate Marathi fields. Testimonials remain in their supplied language.
- RSVP opens a WhatsApp draft containing occasion, name, date, time, guest count and notes. The visitor must send it; reservations and arrangements require restaurant confirmation.
- The standard Stunity Tech — by Prateek credit remains separate from the restaurant footer.
- Stock photo sources are listed in `assets/photos/SOURCES.md`. Fonts have local fallbacks.

Use **Download content backup** and **Restore a content backup** for JSON backups. Back up `assets/` separately because the JSON does not contain uploaded binary files. Keep `.editor-data/` when moving the project to another computer.

## Development and hosting

`npm run check` validates scripts. `npm test` checks draft isolation, previews, access checks, uploads, local publishing and reviewed GitHub publication with a simulated GitHub API.

GitHub Pages publishes branch `main` from its root. Initial source, editor and tests are included in the repository; the local editor subsequently updates only public site files, preserving the remaining source. It includes `features.js`, `i18n.js`, PDF/video assets, robots.txt and sitemap.xml.

For another domain, use `npm run seo -- https://YOUR-DOMAIN/ assets/social-card.png`. The publisher sets canonical/social URLs and the sitemap for its reviewed repository destination. Restaurant metadata renders into published HTML as well as the interactive site.

## Site navigation

The sticky top navigation shows one destination at a time: Home, The food, Moments, Celebrations, About us, or RSVP. At narrower widths it becomes a hamburger menu. Existing section links open the matching destination, and browser Back/Forward and bookmarked section URLs work. Without JavaScript, all content remains readable; printing includes every destination and the separate studio credit.
