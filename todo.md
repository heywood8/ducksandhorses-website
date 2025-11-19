# Website Improvements TODO

**Last Updated:** 2025-11-19
**Status:** Generated from comprehensive review

---

## 🚀 Quick Wins (Low Effort, High Impact)

- [ ] Add Russian crisis hotlines to `/emergency/index.astro`
  - [ ] Россия: Линия помощи "Дотянуться до жизни" (8-800-333-44-34)
  - [ ] Украина: Телефон довіри (7333)
  - [ ] Казахстан: (1414)
  - [ ] Remove or de-emphasize non-Russian resources

- [ ] Download and optimize images locally
  - [ ] Download hero portrait from Telegram CDN to `/public/images/hero-portrait.jpg`
  - [ ] Download logo avatar to `/public/images/logo-avatar.jpg`
  - [ ] Update `src/pages/index.astro:32` to use local image
  - [ ] Update `src/layouts/Layout.astro:60` to use local image

- [ ] Add contact email visibility
  - [ ] Add email to footer or about section
  - [ ] Consider obfuscation to prevent spam
  - [ ] Add expected response time notice

- [ ] Specify timezone on schedule page
  - [ ] Add "Все время указано в часовом поясе: UTC+3 (Москва)" notice
  - [ ] Clarify in both scheduling sections

- [ ] Add resource preconnect hints
  - [ ] Add `<link rel="preconnect" href="https://assets.calendly.com">` to Layout head
  - [ ] Add `<link rel="dns-prefetch" href="https://assets.calendly.com">`

- [ ] Enhance meta descriptions with specific keywords
  - [ ] Homepage: Add ACT, IFS, онлайн терапия keywords
  - [ ] Services page: Expand description
  - [ ] Conditions page: Add specific condition keywords

- [ ] Update image alt text
  - [ ] Change "Therapeutic nature scene" to "Портрет Анны Лопатиной, психолога"
  - [ ] Update "Это я!" to more descriptive text

---

## 🎯 High Priority (Critical for Launch Quality)

### Images & Assets
- [ ] Implement Astro Image optimization
  - [ ] Convert to `<Image>` component from `astro:assets`
  - [ ] Generate WebP/AVIF formats
  - [ ] Create responsive srcsets
  - [ ] Set proper loading priorities (`fetchpriority="high"` for hero)

- [ ] Create social sharing images
  - [ ] Design Open Graph card (1200x630px)
  - [ ] Add to `/public/images/social-card-og.png`
  - [ ] Update Meta component to use custom OG image
  - [ ] Test on Facebook/Twitter/LinkedIn validators

### SEO Enhancements
- [ ] Add structured data for FAQ section
  - [ ] Create JSON-LD schema for homepage FAQ
  - [ ] Test with Google Rich Results tool
  - [ ] Ensure proper markup for each Q&A pair

- [ ] Add ProfessionalService structured data
  - [ ] Include service type, pricing, availability
  - [ ] Add to homepage alongside Person schema
  - [ ] Validate with Schema.org validator

- [ ] Enhance canonical URLs
  - [ ] Verify all pages have correct canonicals
  - [ ] Test sitemap.xml generation
  - [ ] Add lastmod dates to sitemap

### Professional Content
- [ ] Create credentials/qualifications page
  - [ ] Add education details
  - [ ] List certifications and training
  - [ ] Include professional memberships
  - [ ] Add license numbers (if applicable)
  - [ ] Create `/about/credentials.astro` or expand homepage

- [ ] Clarify therapy terminology
  - [ ] Add brief explanation of ACT (Acceptance and Commitment Therapy)
  - [ ] Explain IFS (Internal Family Systems) approach
  - [ ] Consider tooltips or expandable definitions
  - [ ] Keep language accessible for non-professionals

---

## 🔧 Medium Priority (UX & Performance)

### Mobile Experience
- [ ] Improve theme toggle placement
  - [ ] Consider moving inside nav bar
  - [ ] Test on devices < 380px width
  - [ ] Ensure no overlap with navigation items
  - [ ] Add better touch target sizing

- [ ] Enhance horizontal navigation scroll
  - [ ] Add visual scroll indicators (shadows/gradients)
  - [ ] Consider hamburger menu for very small screens
  - [ ] Test gesture navigation on iOS/Android
  - [ ] Add smooth scroll behavior

- [ ] Calendly modal improvements
  - [ ] Add loading state indicator
  - [ ] Implement focus trap when modal opens
  - [ ] Test keyboard navigation (Esc to close)
  - [ ] Add error handling if Calendly fails to load

### Performance Optimizations
- [ ] Font optimization
  - [ ] Preload Merriweather if using web fonts
  - [ ] Use font-display: swap for custom fonts
  - [ ] Consider system font stack only (already using)
  - [ ] Subset Cyrillic characters if custom fonts added

- [ ] Critical CSS inlining
  - [ ] Extract above-the-fold CSS
  - [ ] Inline critical styles in <head>
  - [ ] Defer non-critical stylesheets
  - [ ] Test with Lighthouse

- [ ] JavaScript optimizations
  - [ ] Audit prefetch script necessity
  - [ ] Consider deferring theme toggle script
  - [ ] Minimize inline scripts where possible
  - [ ] Add error boundaries for third-party scripts

### Accessibility Enhancements
- [ ] Enhance skip link visibility
  - [ ] Increase font weight on focus
  - [ ] Add shadow for better contrast
  - [ ] Test with screen readers (NVDA/JAWS)

- [ ] Add ARIA live regions
  - [ ] Announce theme changes to screen readers
  - [ ] Add status messages for form submissions
  - [ ] Implement polite/assertive regions appropriately

- [ ] Keyboard navigation improvements
  - [ ] Document keyboard shortcuts
  - [ ] Add visible focus indicators throughout
  - [ ] Test tab order on all pages
  - [ ] Ensure all interactive elements are keyboard accessible

- [ ] Add focus trap for modals
  - [ ] Calendly popup should trap focus
  - [ ] Return focus to trigger button on close
  - [ ] Test with keyboard-only navigation

---

## 📊 Nice-to-Have (Future Enhancements)

### Design & Visual Polish
- [ ] Add decorative visual elements
  - [ ] Subtle background patterns or gradients
  - [ ] Iconography for process steps
  - [ ] Illustrated headers for sections
  - [ ] Consider custom illustrations vs. stock

- [ ] Hero image improvements
  - [ ] Use distinct hero image (not same as avatar)
  - [ ] Consider professional photography session
  - [ ] Add subtle overlay for text readability
  - [ ] Test various aspect ratios on mobile

- [ ] Visual separators between sections
  - [ ] Subtle dividers or spacing adjustments
  - [ ] Background color alternation
  - [ ] Decorative borders

- [ ] Testimonials section (when compliant)
  - [ ] Research local regulations on testimonials
  - [ ] Create testimonials collection schema
  - [ ] Design testimonial card component
  - [ ] Add consent/approval workflow

### Content Strategy
- [ ] Blog/articles system (currently removed)
  - [ ] Re-enable blog content collection
  - [ ] Write 5-10 educational articles
  - [ ] Implement reading time estimation
  - [ ] Add RSS feed
  - [ ] Create tag-based filtering

- [ ] Resources library
  - [ ] Curate external mental health resources
  - [ ] Create downloadable worksheets (PDFs)
  - [ ] Add self-help guides
  - [ ] Organize by topic/condition

- [ ] Video content
  - [ ] Record brief video introduction
  - [ ] Create "What to expect" video
  - [ ] Consider approach explanation videos
  - [ ] Add to about/homepage

- [ ] Multilingual support (if needed)
  - [ ] Enable i18n feature flag
  - [ ] Add English translation
  - [ ] Implement language switcher UI
  - [ ] Translate all content and metadata

### Technical Debt & Code Quality
- [ ] Clean up siteConfig
  - [ ] Populate or remove `social.linkedIn`
  - [ ] Populate or remove `social.directoryProfile`
  - [ ] Remove or implement `form.endpoint`
  - [ ] Document all feature flags

- [ ] TypeScript improvements
  - [ ] Add stricter type checking
  - [ ] Create interfaces for all configs
  - [ ] Validate required fields at build time
  - [ ] Add JSDoc comments for complex functions

- [ ] Component organization
  - [ ] Create Breadcrumb component
  - [ ] Create ContactInfo component
  - [ ] Create LoadingSpinner component
  - [ ] Establish component library docs

- [ ] Error handling
  - [ ] Create custom error boundaries
  - [ ] Add Calendly loading states
  - [ ] Implement offline fallback messaging
  - [ ] Add network error recovery

---

## 🔐 Privacy & Compliance

### Privacy Policy Enhancements
- [ ] Expand privacy policy
  - [ ] Detail Calendly data handling
  - [ ] Add GDPR compliance statement
  - [ ] Clarify data retention policies
  - [ ] Add comprehensive cookie policy
  - [ ] Document client data rights

- [ ] Legal disclaimers
  - [ ] Add scope of practice statement
  - [ ] Include jurisdiction/licensing info
  - [ ] Add cancellation policy details
  - [ ] Specify technical requirements for sessions
  - [ ] Disclose record-keeping practices

### Cookie Consent (if needed)
- [ ] Research Russian data protection requirements
- [ ] Implement cookie banner if necessary
- [ ] Add granular consent options
- [ ] Integrate with analytics (when enabled)
- [ ] Store consent preferences

---

## 📈 Analytics & Monitoring (Future)

### When `features.analytics: true`
- [ ] Set up privacy-friendly analytics
  - [ ] Choose provider (Plausible/Fathom)
  - [ ] Configure domain in siteConfig
  - [ ] Enable analytics feature flag
  - [ ] Add privacy notice to footer

- [ ] Configure key event tracking
  - [ ] Track schedule button clicks
  - [ ] Monitor FAQ section interactions
  - [ ] Measure scroll depth on long pages
  - [ ] Identify common exit points

- [ ] Privacy compliance
  - [ ] Respect DNT headers
  - [ ] Anonymize IP addresses
  - [ ] No cross-site tracking
  - [ ] Document in privacy policy

- [ ] Performance monitoring
  - [ ] Set up Lighthouse CI in GitHub Actions
  - [ ] Define performance budgets
  - [ ] Monitor Core Web Vitals
  - [ ] Set up alerts for regressions

---

## 🧪 Testing & Quality Assurance

### Accessibility Testing
- [ ] Run automated axe-core tests (already scripted)
  - [ ] Fix color contrast issues (temporarily disabled)
  - [ ] Resolve any new violations
  - [ ] Test with real assistive technology

- [ ] Manual testing checklist
  - [ ] Keyboard-only navigation (all pages)
  - [ ] Screen reader testing (NVDA on Windows, VoiceOver on Mac)
  - [ ] High contrast mode verification
  - [ ] Text resize to 200% (content should remain readable)
  - [ ] Test with browser zoom

### Cross-browser Testing
- [ ] Test on major browsers
  - [ ] Chrome/Chromium (desktop & mobile)
  - [ ] Firefox (desktop & mobile)
  - [ ] Safari (macOS & iOS)
  - [ ] Edge
  - [ ] Opera/Brave (Chromium-based)

- [ ] Device testing
  - [ ] iPhone (various sizes)
  - [ ] Android phones
  - [ ] Tablets (iPad, Android)
  - [ ] Desktop (various resolutions)

### Performance Testing
- [ ] Run Lighthouse audits
  - [ ] Desktop audit (target: 95+ all categories)
  - [ ] Mobile audit (target: 90+ all categories)
  - [ ] Fix any flagged issues
  - [ ] Document baseline scores

- [ ] Real-world performance
  - [ ] Test on slow 3G connection
  - [ ] Test on 4G connection
  - [ ] Test with throttled CPU
  - [ ] Measure actual user experience

### User Testing
- [ ] Gather feedback from test users
  - [ ] 3-5 potential clients
  - [ ] Mobile vs desktop preferences
  - [ ] Scheduling flow usability
  - [ ] Content clarity and helpfulness

---

## 📁 File Structure Additions

- [ ] Create `/public/images/` directory
- [ ] Create `/public/images/hero-portrait.jpg` (optimized)
- [ ] Create `/public/images/logo-avatar.jpg` (optimized)
- [ ] Create `/public/images/social-card-og.png` (1200x630)
- [ ] Create `/src/pages/about/credentials.astro`
- [ ] Create `/src/components/Breadcrumb.astro`
- [ ] Create `/src/components/ContactInfo.astro`
- [ ] Create `/src/components/LoadingSpinner.astro`
- [ ] Create `/src/content/testimonials/` (future)

---

## 🎨 Design System Enhancements

- [ ] Expand color tokens
  - [ ] Add `--color-teal-50` for lighter backgrounds
  - [ ] Add `--color-teal-800` for darker accents
  - [ ] Consider additional accent colors

- [ ] Add font weight tokens
  - [ ] `--font-weight-normal: 400`
  - [ ] `--font-weight-medium: 500`
  - [ ] `--font-weight-semibold: 600`
  - [ ] `--font-weight-bold: 700`

- [ ] Add z-index scale
  - [ ] `--z-index-dropdown: 1000`
  - [ ] `--z-index-sticky: 1020`
  - [ ] `--z-index-modal: 1050`
  - [ ] `--z-index-tooltip: 1070`

- [ ] Document token usage
  - [ ] Add comments explaining each token category
  - [ ] Provide usage examples in comments
  - [ ] Create design tokens documentation page

---

## 🔍 SEO & Marketing

### Metadata Optimization
- [ ] Research target keywords
  - [ ] "онлайн психолог"
  - [ ] "психологические консультации"
  - [ ] "ACT терапия"
  - [ ] "выгорание помощь"
  - [ ] Other relevant Russian keywords

- [ ] Optimize page titles
  - [ ] Include primary keywords naturally
  - [ ] Keep under 60 characters
  - [ ] Make unique and descriptive
  - [ ] Front-load important terms

- [ ] Meta descriptions
  - [ ] 150-160 characters each
  - [ ] Include call-to-action
  - [ ] Use target keywords naturally
  - [ ] Make compelling and accurate

### Link Building & Visibility
- [ ] Submit to directories
  - [ ] Psychology Today (if applicable)
  - [ ] Local therapist directories
  - [ ] Professional association listings

- [ ] Local SEO (if location-based)
  - [ ] Google Business Profile (if accepting local clients)
  - [ ] Schema LocalBusiness markup
  - [ ] Location pages if serving specific areas

---

## 📱 Progressive Web App (Optional)

- [ ] Research PWA benefits for therapy site
- [ ] Add manifest.json
- [ ] Implement service worker for offline
- [ ] Add "Add to Home Screen" prompt
- [ ] Test offline functionality
- [ ] Consider whether appropriate for privacy context

---

## 🔄 Maintenance & Monitoring

### Regular Tasks (Weekly/Monthly)
- [ ] Check for broken links (automated script)
- [ ] Review analytics (when enabled)
- [ ] Monitor uptime/performance
- [ ] Update content as needed
- [ ] Review and respond to any inquiries

### Quarterly Reviews
- [ ] Full accessibility audit
- [ ] Performance benchmark
- [ ] Content freshness review
- [ ] Competitor analysis
- [ ] Update emergency resources if changed

### Annual Tasks
- [ ] Renew domain (if custom)
- [ ] Review and update privacy policy
- [ ] Update credentials/qualifications
- [ ] Comprehensive SEO audit
- [ ] User survey/feedback collection

---

## ✅ Completed Items

*(Items will be moved here as they are completed)*

---

## 📝 Notes & Decisions

### Decisions Made
- Using Calendly for scheduling (not building custom)
- Privacy-first approach (no tracking initially)
- Russian-only content (no i18n for now)
- Astro static site (no backend)

### Open Questions
- [ ] Decide on analytics provider (if enabling)
- [ ] Confirm jurisdiction for license display requirements
- [ ] Determine if testimonials are legally permissible
- [ ] Choose newsletter provider (if enabling feature)
- [ ] Decide on custom domain vs GitHub Pages subdomain

### Future Considerations
- Blog reintroduction timeline
- Video content production schedule
- Expansion to additional languages
- Group therapy offerings
- Client portal integration (external)

---

**How to use this TODO:**
1. Check off items as completed using `[x]`
2. Add new items as they arise
3. Prioritize based on business needs
4. Review monthly and adjust priorities
5. Archive completed sections periodically

---

*Generated from comprehensive website review on 2025-11-19*
