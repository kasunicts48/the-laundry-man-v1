import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getStaticTopbarCss, renderStaticTopbarHtml } from './static-header.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const bookingPath = join(root, 'public/booking.html');

const bookingHtml = readFileSync(bookingPath, 'utf8');
const topbarCss = getStaticTopbarCss();
const topbarHtml = renderStaticTopbarHtml('-booking-header');

// Tolerate CRLF and extra blank lines between the synced topbar CSS and .header-inner.
const topbarCssRe =
  /\s*\/\* ── Header top bar[\s\S]*?(?=\r?\n\s*\.header-inner\s*\{\r?\n\s*max-width:\s*80rem)/;
const topbarHtmlRe =
  /<div class="header-topbar">[\s\S]*?<\/div>\s*(?=\r?\n\s*<div class="header-main">)/;

if (!topbarCssRe.test(bookingHtml)) {
  throw new Error('Could not find header top bar CSS block in public/booking.html');
}

if (!topbarHtmlRe.test(bookingHtml)) {
  throw new Error('Could not find header top bar HTML block in public/booking.html');
}

const updatedHtml = bookingHtml
  .replace(topbarCssRe, `\n${topbarCss}\n\n      `)
  .replace(topbarHtmlRe, `${topbarHtml}\n`);

writeFileSync(bookingPath, updatedHtml, 'utf8');
console.log('Synced header top bar in public/booking.html');
