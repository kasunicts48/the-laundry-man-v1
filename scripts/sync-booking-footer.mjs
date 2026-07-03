import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticFooterCss, getStaticFooterHtml } from './static-footer.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const bookingPath = join(root, 'public/booking.html');

const bookingHtml = readFileSync(bookingPath, 'utf8');
const footerCss = getStaticFooterCss();
const footerHtml = getStaticFooterHtml({ includeLocations: true });

const footerCssRe = /\s*\/\* ── Footer[\s\S]*?(?=\s*\.sr-only\s*\{)/;
const footerHtmlRe = /<footer class="site-footer"[\s\S]*?<\/footer>/;

if (!footerCssRe.test(bookingHtml)) {
  throw new Error('Could not find footer CSS block in public/booking.html');
}

if (!footerHtmlRe.test(bookingHtml)) {
  throw new Error('Could not find footer HTML block in public/booking.html');
}

const updatedHtml = bookingHtml
  .replace(footerCssRe, `\n${footerCss}\n\n      `)
  .replace(footerHtmlRe, footerHtml);

writeFileSync(bookingPath, updatedHtml, 'utf8');
console.log('Synced footer in public/booking.html');
