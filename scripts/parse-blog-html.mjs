import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { normalizeLegacySiteLinks } from './lib/normalize-legacy-links.mjs';
import { sanitizeBlogHtml } from './lib/sanitize-blog-html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const META_PATH = 'C:/Users/kasun/Downloads/all blog post laundry man/all_blog_posts.html';
const FULL_PATH =
  'C:/Users/kasun/Downloads/all blog post laundry man/all blog content/all_blog_contents_full.html';
const OUT_PATH = path.join(__dirname, '../src/data/blogsImported.json');

/** Existing handcrafted posts — skip by canonical URL slug */
const EXISTING_URL_SLUGS = new Set([
  'laundry-and-dry-cleaning-manchester-thelaundryman-app',
  'effortless-dry-cleaning-solutions-at-your-fingertips-discover-thelaundryman-app',
  'the-benefits-of-professional-dry-cleaning-services-in-manchester',
]);

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function slugFromUrl(url) {
  try {
    const pathname = new URL(url).pathname.replace(/\/$/, '');
    return pathname.split('/').filter(Boolean).pop() ?? '';
  } catch {
    return '';
  }
}

function parseMetaPosts(html) {
  const posts = [];
  const articleRegex = /<!-- Start Post -->([\s\S]*?)<!-- End Post -->/g;
  let match;

  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];
    const linkMatch = block.match(/<h2 class="entry-title">[\s\S]*?<a href="([^"]+)">([\s\S]*?)<\/a>/);
    if (!linkMatch) continue;

    const url = linkMatch[1];
    const slug = slugFromUrl(url);
    const title = stripTags(linkMatch[2]);

    const dateMatch = block.match(/<span class="published">([^<]+)<\/span>/);
    const date = dateMatch ? dateMatch[1].trim() : '';

    const imgMatch = block.match(/<img[^>]+src="([^"]+)"/);
    let image = imgMatch ? imgMatch[1] : '';
    const srcsetMatch = block.match(/srcset="([^"]+)"/);
    if (srcsetMatch) {
      const parts = srcsetMatch[1].split(',').map((p) => p.trim().split(/\s+/)[0]);
      const full = parts.find((u) => !u.includes('-400x250') && !u.includes('-480x'));
      if (full) image = full;
    }

    const altMatch = block.match(/<img[^>]+alt="([^"]*)"/);
    const imageAlt = altMatch ? decodeHtml(altMatch[1]) || title : title;

    const excerptMatch = block.match(
      /<div class="post-content-inner[^"]*">[\s\S]*?<p>([\s\S]*?)<\/p>/
    );
    let excerpt = excerptMatch ? stripTags(excerptMatch[1]) : '';
    excerpt = excerpt.replace(/\.\.\.$/, '').trim();

    const categoryMatch = block.match(/category-([a-z0-9-]+)/);
    const category = categoryMatch
      ? categoryMatch[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : '';

    posts.push({ slug, url, title, date, excerpt, image, imageAlt, category });
  }

  return posts;
}

function parseFullContents(html) {
  const map = new Map();
  const parts = html.split('<div class="full-post"');

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const urlMatch = part.match(/href="(https:\/\/thelaundryman\.co\.uk\/[^"]+)"/);
    if (!urlMatch) continue;

    const slug = slugFromUrl(urlMatch[1]);
    const hrIdx = part.indexOf('<hr>');
    if (hrIdx < 0) continue;

    let contentHtml = part.slice(hrIdx + 4).trim();
    const lastDiv = contentHtml.lastIndexOf('</div>');
    if (lastDiv > contentHtml.length - 30) {
      contentHtml = contentHtml.slice(0, lastDiv).trim();
    }

    contentHtml = contentHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
    map.set(slug, contentHtml);
  }

  return map;
}

function formatDate(raw) {
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const metaHtml = fs.readFileSync(META_PATH, 'utf8');
const fullHtml = fs.readFileSync(FULL_PATH, 'utf8');

const metaPosts = parseMetaPosts(metaHtml);
const fullMap = parseFullContents(fullHtml);

const imported = [];
const seenSlugs = new Set();

for (const meta of metaPosts) {
  if (!meta.slug || seenSlugs.has(meta.slug)) continue;
  if (EXISTING_URL_SLUGS.has(meta.slug)) continue;

  seenSlugs.add(meta.slug);
  let contentHtml = fullMap.get(meta.slug) ?? '';

  imported.push({
    id: meta.slug,
    category: meta.category,
    title: meta.title,
    date: formatDate(meta.date),
    excerpt: meta.excerpt,
    image: meta.image,
    imageAlt: meta.imageAlt,
    contentHtml,
  });
}

const blogSlugs = new Set(imported.map((post) => post.id));
for (const post of imported) {
  post.contentHtml = sanitizeBlogHtml(
    normalizeLegacySiteLinks(post.contentHtml, blogSlugs)
  );
}

imported.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(OUT_PATH, JSON.stringify(imported, null, 2));
console.log(`Imported ${imported.length} new posts to ${OUT_PATH}`);
console.log(`Skipped ${EXISTING_URL_SLUGS.size} existing posts`);
console.log(`Full content matched: ${imported.filter((p) => p.contentHtml).length}/${imported.length}`);
