import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath =
  process.env.LOCATIONS_HTML_PATH ??
  'C:/Users/kasun/Downloads/locations/Laundry Services Across United Kingdom _ Laundryheap.html';

const html = fs.readFileSync(htmlPath, 'utf8');

/** h3 section titles in the source HTML (locations only — excludes Hotels / Other pages). */
const HTML_SECTION_TITLES = [
  'General',
  'Dry cleaning',
  'Dry cleaners',
  'Dry cleaners in areas',
  'Laundromats & launderettes',
  'Laundromats & launderettes in areas',
  'Laundry',
  'Laundry categories (Ironing)',
  'Laundry categories (Wash)',
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function parseGroupedRegions(chunk) {
  const regionRe =
    /<span class="section-title link"(?: id="([^"]*)")?><a href="https:\/\/www\.laundryheap\.com\/en-gb\/[^"]+">([^<]+)<\/a><\/span><\/div><div class="col-12 col-md-9"><ul class="row">([\s\S]*?)<\/ul>/g;

  const regions = [];
  let match;

  while ((match = regionRe.exec(chunk)) !== null) {
    const name = match[2].trim().replace(/&amp;/g, '&');
    const id = (match[1] || slugify(name)).trim();
    const listHtml = match[3];
    const areaRe = /<a href="https:\/\/www\.laundryheap\.com\/en-gb\/[^"]+">([^<]+)<\/a>/g;
    const areas = [];
    let areaMatch;

    while ((areaMatch = areaRe.exec(listHtml)) !== null) {
      areas.push(areaMatch[1].trim().replace(/&amp;/g, '&'));
    }

    if (areas.length > 0) {
      regions.push({ id, name, areas });
    }
  }

  return regions;
}

function getSectionChunk(htmlContent, sectionTitle) {
  const parts = htmlContent.split(/<div class="row mb-32"><div class="col-12"><h3>/);

  for (let i = 1; i < parts.length; i += 1) {
    const titleEnd = parts[i].indexOf('</h3>');
    const rawTitle = parts[i]
      .slice(0, titleEnd)
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .trim();

    if (rawTitle !== sectionTitle) continue;

    const chunk = parts[i].slice(titleEnd);
    const nextH3 = chunk.search(/<div class="row mb-32"><div class="col-12"><h3>/);
    return nextH3 >= 0 ? chunk.slice(0, nextH3) : chunk;
  }

  return '';
}

const sections = {};

for (const title of HTML_SECTION_TITLES) {
  const chunk = getSectionChunk(html, title);
  const regions = parseGroupedRegions(chunk);
  sections[title] = regions;
}

if (!sections.General?.length) {
  console.error('No General locations found. Check HTML path:', htmlPath);
  process.exit(1);
}

const dataKeyByHtmlTitle = {
  General: 'general',
  'Dry cleaning': 'dry-cleaning',
  'Dry cleaners': 'dry-cleaners',
  'Dry cleaners in areas': 'dry-cleaners-in-areas',
  'Laundromats & launderettes': 'laundromats-launderettes',
  'Laundromats & launderettes in areas': 'laundromats-launderettes-in-areas',
  Laundry: 'laundry',
  'Laundry categories (Ironing)': 'laundry-ironing',
  'Laundry categories (Wash)': 'laundry-wash',
};

const output = {};

for (const [htmlTitle, key] of Object.entries(dataKeyByHtmlTitle)) {
  output[key] = sections[htmlTitle] ?? [];
}

const outPath = path.join(__dirname, '../src/data/ukLocations.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

const generalCount = output.general.reduce((total, region) => total + region.areas.length, 0);
console.log(`Wrote ${Object.keys(output).length} section keys to ${outPath}`);
console.log(`General: ${output.general.length} regions, ${generalCount} areas`);

for (const [key, regions] of Object.entries(output)) {
  if (key === 'general') continue;
  const areaCount = regions.reduce((total, region) => total + region.areas.length, 0);
  console.log(`  ${key}: ${regions.length} regions, ${areaCount} areas`);
}
