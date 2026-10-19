import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distDir, 'index.html');
const serverEntryPath = path.resolve(distDir, 'server/entry-server.js');

function minifyHtml(html) {
  const jsonLdBlocks = [];
  const withPlaceholders = html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    (_, jsonContent) => {
      const idx = jsonLdBlocks.length;
      try {
        jsonLdBlocks.push(JSON.stringify(JSON.parse(jsonContent)));
      } catch {
        jsonLdBlocks.push(jsonContent.trim());
      }
      return `<script type="application/ld+json">__JSON_LD_${idx}__</script>`;
    }
  );

  let collapsed = withPlaceholders
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();

  jsonLdBlocks.forEach((json, idx) => {
    collapsed = collapsed.replace(`__JSON_LD_${idx}__`, json);
  });

  return collapsed;
}

async function prerender() {
  if (!fs.existsSync(indexPath)) {
    throw new Error(`dist/index.html not found at: ${indexPath}. Make sure client build completed first.`);
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`Server entry not found at: ${serverEntryPath}. Make sure server build completed.`);
  }

  const template = fs.readFileSync(indexPath, 'utf-8');

  // Convert Windows path to file:// URL for dynamic import
  const serverEntryUrl = pathToFileURL(serverEntryPath).href;
  const { render } = await import(serverEntryUrl);

  const appHtml = render();

  let finalHtml = template;
  if (finalHtml.includes('<!--app-html-->')) {
    finalHtml = finalHtml.replace('<!--app-html-->', appHtml);
  } else if (finalHtml.includes('<div id="root"></div>')) {
    finalHtml = finalHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  } else {
    finalHtml = finalHtml.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);
  }

  const minifiedHtml = minifyHtml(finalHtml);
  fs.writeFileSync(indexPath, minifiedHtml, 'utf-8');
  console.log('✓ Successfully prerendered minified static SSG markup into dist/index.html');

  // Clean up dist/server
  try {
    fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
}

prerender().catch((err) => {
  console.error('SSG Prerendering error:', err);
  process.exit(1);
});
