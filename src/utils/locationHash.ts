import { isLocationSectionId } from '../data/locationPageSections';
import { toLocationSlug } from '../data/locations';

/**
 * Parse /locations query targets (?service=…&area=…).
 * Legacy hash URLs (#section/region) are still parsed for redirects.
 */
export interface LocationQueryTarget {
  /** Section id, e.g. general, wash-fold, dry-cleaning */
  sectionId: string;
  /** Region slug within that section, e.g. manchester */
  regionId?: string;
}

/** @deprecated Use LocationQueryTarget */
export type LocationHashTarget = LocationQueryTarget;

export function parseLocationSearchParams(search: string): LocationQueryTarget | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const sectionId = params.get('service')?.trim();
  if (!sectionId || !isLocationSectionId(sectionId)) return null;

  const regionRaw = params.get('area')?.trim();
  return {
    sectionId,
    regionId: regionRaw ? normalizeRegionSlug(regionRaw) : undefined,
  };
}

/**
 * Parse legacy /locations hash targets.
 *
 * Supported:
 * - #general
 * - #general/manchester
 * - #dry-cleaners/manchester
 */
export function parseLocationHash(hash: string): LocationQueryTarget | null {
  const raw = hash.replace(/^#/, '').trim();
  if (!raw) return null;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  if (decoded.includes('/')) {
    const [sectionId, regionId, ...extra] = decoded.split('/').filter(Boolean);
    if (!sectionId || extra.length > 0 || !isLocationSectionId(sectionId)) return null;

    return {
      sectionId,
      regionId: regionId ? normalizeRegionSlug(regionId) : undefined,
    };
  }

  if (isLocationSectionId(decoded)) {
    return { sectionId: decoded };
  }

  return null;
}

export function normalizeRegionSlug(region: string): string {
  return toLocationSlug(region);
}

/** DOM id for a region block inside a locations section. */
export function getLocationRegionElementId(sectionId: string, regionId: string): string {
  return `location-region-${sectionId}-${normalizeRegionSlug(regionId)}`;
}

/** SEO-friendly /locations deep link. */
export function buildLocationsHref(sectionId: string, regionId?: string): string {
  const params = new URLSearchParams();
  params.set('service', sectionId);
  if (regionId) {
    params.set('area', normalizeRegionSlug(regionId));
  }

  return `/locations.html?${params.toString()}`;
}
