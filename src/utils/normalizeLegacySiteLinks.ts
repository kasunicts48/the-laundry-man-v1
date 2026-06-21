import { normalizeLocationSlug } from '../data/locations';

/** Old WordPress paths mapped to current app routes. */
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
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

const LEGACY_SITE_URL =
  /(?:https?:)?\/\/(?:www\.)?thelaundryman\.co\.uk([^"'\\s<>]*)/gi;

function legacyPathToHref(pathname: string, blogSlugs: ReadonlySet<string>): string {
  const withoutHash = pathname.split('#')[0] ?? '';
  const trimmed = withoutHash.replace(/^\/+|\/+$/g, '');

  if (!trimmed) return '/';

  const lower = trimmed.toLowerCase();
  const redirect = LEGACY_PATH_REDIRECTS[lower];
  if (redirect) return redirect;

  const segment = lower.split('/').filter(Boolean)[0] ?? '';
  if (blogSlugs.has(segment)) return `/blog/${segment}`;

  const normalized = normalizeLocationSlug(segment);
  if (normalized !== segment) return `/${normalized}`;

  return `/${lower}`;
}

function isLegacyMediaPath(pathSuffix: string): boolean {
  const path = pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`;
  const lower = path.toLowerCase();
  return lower.startsWith('/wp-content') || lower.startsWith('/wp-includes');
}

/** Rewrite a single legacy URL to a relative app route. */
export function normalizeLegacyHref(
  href: string,
  blogSlugs: ReadonlySet<string> = new Set()
): string {
  if (!href || !href.toLowerCase().includes('thelaundryman.co.uk')) return href;

  return href.replace(LEGACY_SITE_URL, (fullMatch, pathSuffix: string) => {
    if (isLegacyMediaPath(pathSuffix ?? '')) return fullMatch;
    return legacyPathToHref(pathSuffix ?? '', blogSlugs);
  });
}

/** Rewrite legacy thelaundryman.co.uk URLs in blog HTML to relative app routes. */
export function normalizeLegacySiteLinks(
  html: string,
  blogSlugs: ReadonlySet<string> = new Set()
): string {
  if (!html || !html.toLowerCase().includes('thelaundryman.co.uk')) return html;

  return html.replace(LEGACY_SITE_URL, (fullMatch, pathSuffix: string) => {
    if (isLegacyMediaPath(pathSuffix ?? '')) return fullMatch;
    return legacyPathToHref(pathSuffix ?? '', blogSlugs);
  });
}
