import rawLocations from './ukLocations.json';

export interface UkLocationRegion {
  id: string;
  name: string;
  areas: string[];
}

/** UK regions and sub-towns from the General section of the Laundryheap sitemap HTML. */
export const ukLocationRegions: UkLocationRegion[] = rawLocations as UkLocationRegion[];

export const ukLocationRegionCount = ukLocationRegions.length;

export const ukLocationAreaCount = ukLocationRegions.reduce(
  (total, region) => total + region.areas.length,
  0,
);
