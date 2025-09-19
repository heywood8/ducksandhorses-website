import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<YOUR_GITHUB_USERNAME>.github.io/psychology_website',
  integrations: [],
  build: {
    format: 'directory'
  }
});
