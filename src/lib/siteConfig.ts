export const siteConfig = {
  name: 'Anna Lopatina',
  author: 'Anna Lopatina',
  url: 'https://heywood8.github.io/ducksandhorses_website', // TODO: Replace with real GitHub Pages URL
  contactEmail: 'masachusec1+psychology@gmail.com', // Placeholder; replace with forwarding alias
  form: {
    endpoint: '', // Phase 3: integrate third-party endpoint (Formspree/Basin/etc.)
  },
  social: {
    linkedIn: '',
    directoryProfile: ''
  },
  organization: {
    // Extend later if representing a group practice
    type: 'Person'
  }
} as const;

export function canonicalFor(pathname: string): string {
  return siteConfig.url.replace(/\/$/, '') + (pathname === '/' ? '/' : pathname.replace(/\/$/, '') + '/');
}
