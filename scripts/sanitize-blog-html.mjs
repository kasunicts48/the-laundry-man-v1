import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeLegacySiteLinks } from './lib/normalize-legacy-links.mjs';
import { sanitizeBlogHtml } from './lib/sanitize-blog-html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_JSON = path.join(__dirname, '../src/data/blogsImported.json');

const posts = JSON.parse(fs.readFileSync(BLOG_JSON, 'utf8'));
const blogSlugs = new Set(posts.map((post) => post.id));

let updated = 0;
for (const post of posts) {
  const original = post.contentHtml ?? '';
  const sanitized = sanitizeBlogHtml(normalizeLegacySiteLinks(original, blogSlugs));

  if (sanitized !== original) {
    post.contentHtml = sanitized;
    updated += 1;
  }
}

fs.writeFileSync(BLOG_JSON, JSON.stringify(posts, null, 2));
console.log(`Sanitized ${updated}/${posts.length} imported blog posts`);
