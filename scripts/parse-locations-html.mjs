import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath =
  process.env.LOCATIONS_HTML_PATH ??
  'C:/Users/kasun/Downloads/locations/Laundry Services Across United Kingdom _ Laundryheap.html';

const html = fs.readFileSync(htmlPath, 'utf8');

function parseGroupedRegions(chunk) {
  const regionRe =
    /<span class="section-title link" id="([^"]+)"><a href="https:\/\/www\.laundryheap\.com\/en-gb\/[^"]+">([^<]+)<\/a><\/span><\/div><div class="col-12 col-md-9"><ul class="row">([\s\S]*?)<\/ul>/g;

  const regions = [];
  let match;

  while ((match = regionRe.exec(chunk)) !== null) {
    const id = match[1];
    const name = match[2].trim().replace(/&amp;/g, '&');
    const listHtml = match[3];
    const areaRe = /<a href="https:\/\/www\.laundryheap\.com\/en-gb\/[^"]+">([^<]+)<\/a>/g;
    const areas = [];
    let areaMatch;

    while ((areaMatch = areaRe.exec(listHtml)) !== null) {
      areas.push(areaMatch[1].trim().replace(/&amp;/g, '&'));
    }

    regions.push({ id, name, areas });
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

const general = parseGroupedRegions(getSectionChunk(html, 'General'));

if (general.length === 0) {
  console.error('No General locations found. Check HTML path:', htmlPath);
  process.exit(1);
}

const outPath = path.join(__dirname, '../src/data/ukLocations.json');
fs.writeFileSync(outPath, JSON.stringify(general, null, 2));

const areaCount = general.reduce((total, region) => total + region.areas.length, 0);
console.log(`Wrote ${general.length} regions and ${areaCount} areas to ${outPath}`);
