/** Shared legacy path mapping for blog link normalization (used by parser script). */
export const LEGACY_PATH_REDIRECTS = {
  '': '/',
  'commercial-cleaning': '/commercial',
  'laundry-service': '/services',
  'dry-cleaner': '/services',
  'dry-cleaner-near-me': '/services',
  laundry: '/services',
  'dry-cleaning-in-manchester': '/manchester',
  'dry-cleaning-in-leeds': '/leeds',
  'dry-cleaning-in-cheshire': '/cheshire',
  'laundry-service-in-manchester': '/manchester',
  'laundry-service-in-leeds': '/leeds',
  'alteration-repairs-manchester': '/manchester',
  'alterations-repairs-in-salford': '/salford',
  'manchester-laundry-and-dry-cleaner-services': '/manchester',
  'dry-cleaning-services-near-manchester': '/manchester',
  'laundry-and-dry-cleaning-service-near-me-in-leeds': '/leeds',
  'laundry-and-dry-cleaning-manchester-leeds': '/manchester',
  'shirt-service-in-leeds': '/leeds',
  'dry-cleaners-london': '/london',
  'birmingham.php': '/birmingham',
};

const SLUG_ALIASES = {
  'manchester-city-centre': 'manchester',
};

const LEGACY_SITE_URL =
  /(?:https?:)?\/\/(?:www\.)?thelaundryman\.co\.uk([^"'\\s<>]*)/gi;

function normalizeLocationSlug(slug) {
  const lower = slug.toLowerCase();
  return SLUG_ALIASES[lower] ?? lower;
}

function legacyPathToHref(pathname, blogSlugs) {
  const withoutHash = (pathname.split('#')[0] ?? '').replace(/^\/+|\/+$/g, '');
  if (!withoutHash) return '/';

  const lower = withoutHash.toLowerCase();
  if (LEGACY_PATH_REDIRECTS[lower]) return LEGACY_PATH_REDIRECTS[lower];

  const segment = lower.split('/').filter(Boolean)[0] ?? '';
  if (blogSlugs.has(segment)) return `/blog/${segment}`;

  const normalized = normalizeLocationSlug(segment);
  if (normalized !== segment) return `/${normalized}`;

  return `/${lower}`;
}

function isLegacyMediaPath(pathSuffix) {
  const path = pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`;
  const lower = path.toLowerCase();
  return lower.startsWith('/wp-content') || lower.startsWith('/wp-includes');
}

export function normalizeLegacySiteLinks(html, blogSlugs = new Set()) {
  if (!html || !html.toLowerCase().includes('thelaundryman.co.uk')) return html;

  return html.replace(LEGACY_SITE_URL, (fullMatch, pathSuffix = '') => {
    if (isLegacyMediaPath(pathSuffix)) return fullMatch;
    return legacyPathToHref(pathSuffix, blogSlugs);
  });
}
