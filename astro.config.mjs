import { defineConfig } from 'astro/config';

// For GitHub Pages project site deployment we set both `site` (canonical root)
// and `base` (repository sub-path). Internal links must use import.meta.env.BASE_URL.
export default defineConfig({
  site: 'https://heywood8.github.io/ducksandhorses-website',
  base: '/ducksandhorses-website',
  integrations: [],
  build: {
    format: 'directory'
  }
});
