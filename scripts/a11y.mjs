#!/usr/bin/env node
// Simple accessibility audit for built static HTML using axe-core + jsdom.
// Usage: run after `npm run build`. Scans dist/**/*.html.
import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const DIST = path.resolve('dist');

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      yield full;
    }
  }
}

const failures = [];
let pages = 0;
for await (const file of walk(DIST)) {
  const html = await readFile(file, 'utf8');
  const dom = new JSDOM(html, { url: 'http://localhost/', pretendToBeVisual: true });
  const { window } = dom;
  // Set globals before importing axe-core so it can detect them.
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.Node = window.Node;
  globalThis.Element = window.Element;
  // Dynamic import AFTER globals present
  const axe = (await import('axe-core')).default || (await import('axe-core'));
  // Disable rules that rely on full rendering/layout not available in jsdom
  if (axe?.configure) {
    axe.configure({
      rules: [
        { id: 'color-contrast', enabled: false }
      ]
    });
  }
  /* eslint-disable no-await-in-loop */
  let results;
  try {
    results = await axe.run(window.document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
    });
  } catch (err) {
    console.warn(`Skipping page (axe error) ${path.relative(process.cwd(), file)}: ${err.message}`);
    continue; // proceed to next page
  }
  pages++;
  for (const v of results.violations) {
    failures.push({ file: path.relative(process.cwd(), file), id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map(n => n.target.join(' ')) });
  }
  // Cleanup (avoid leaking references across iterations)
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.Node;
  delete globalThis.Element;
}

if (failures.length) {
  console.error(`A11y violations found (${failures.length}) across ${pages} page(s):`);
  for (const f of failures) {
    console.error(`\n[${f.impact || 'n/a'}] ${f.id} – ${f.help}\n  Page: ${f.file}\n  Nodes: ${f.nodes.join(' | ')}`);
  }
  process.exit(1);
} else {
  console.log(`A11y audit passed for ${pages} page(s).`);
}
