import { getCityData, type CityData } from './cities';

/** Default location shown on `/` before a specific area is selected. */
export const DEFAULT_LOCATION_NAME = 'London';

/** First path segments owned by static app pages — never treated as locations. */
export const RESERVED_PATH_SEGMENTS = new Set([
  'about',
  'book',
  'services',
  'commercial',
  'blog',
  'contact',
  'locations',
  'privacy-policy',
  'terms-conditions',
]);

const SLUG_ALIASES: Record<string, string> = {
  'manchester city centre': 'manchester',
  'manchester-city-centre': 'manchester',
};

export interface PageLocation {
  slug: string;
  displayName: string;
  cityData: CityData;
  isDefaultLocation: boolean;
}

export function toLocationSlug(area: string): string {
  return area
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function formatLocationName(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeLocationSlug(slug: string): string {
  const lower = slug.toLowerCase();
  return SLUG_ALIASES[lower] ?? lower;
}

export function resolveLocationHref(area: string): string {
  const trimmed = area.toLowerCase().trim();
  const slug =
    SLUG_ALIASES[trimmed] ??
    SLUG_ALIASES[toLocationSlug(area)] ??
    toLocationSlug(area);

  return `/${slug}`;
}

export function isReservedPathSegment(segment: string): boolean {
  return RESERVED_PATH_SEGMENTS.has(segment.toLowerCase());
}

export function isLocationHomePath(pathname: string): boolean {
  if (pathname === '/') return true;

  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return false;

  return !isReservedPathSegment(segment);
}

export function getPageLocation(locationSlug?: string | null): PageLocation {
  if (!locationSlug) {
    const cityData = getCityData(DEFAULT_LOCATION_NAME);

    return {
      slug: toLocationSlug(DEFAULT_LOCATION_NAME),
      displayName: DEFAULT_LOCATION_NAME,
      cityData,
      isDefaultLocation: true,
    };
  }

  const slug = normalizeLocationSlug(locationSlug);
  const cityData = getCityData(formatLocationName(slug));

  return {
    slug,
    displayName: cityData.name,
    cityData,
    isDefaultLocation: false,
  };
}
