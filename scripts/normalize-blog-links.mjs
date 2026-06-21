import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeLegacySiteLinks } from './lib/normalize-legacy-links.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_JSON = path.join(__dirname, '../src/data/blogsImported.json');

const posts = JSON.parse(fs.readFileSync(BLOG_JSON, 'utf8'));
const blogSlugs = new Set(posts.map((post) => post.id));

let updated = 0;
for (const post of posts) {
  const fields = ['contentHtml', 'excerpt'];
  let changed = false;

  for (const field of fields) {
    const next = normalizeLegacySiteLinks(post[field] ?? '', blogSlugs);
    if (next !== post[field]) {
      post[field] = next;
      changed = true;
    }
  }

  if (changed) updated += 1;
}

fs.writeFileSync(BLOG_JSON, JSON.stringify(posts, null, 2));
console.log(`Normalized legacy links in ${updated}/${posts.length} posts`);
