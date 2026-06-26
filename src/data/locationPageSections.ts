import type { ServiceId } from './services';

export type LocationSectionGroup = 'general' | 'main-services' | 'seo-keywords';

export interface LocationPageSection {
  id: string;
  title: string;
  /** Maps to our service block; omitted for general and SEO keyword sections. */
  serviceId?: ServiceId;
  /** Key in ukLocations.json for this section's region/area data. */
  dataKey: string;
  group: LocationSectionGroup;
}

const mainServiceSections: LocationPageSection[] = [
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    serviceId: 'wash-fold',
    group: 'main-services',
    dataKey: 'laundry-wash',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    serviceId: 'dry-cleaning',
    group: 'main-services',
    dataKey: 'dry-cleaning',
  },
  {
    id: 'ironing-service',
    title: 'Ironing Service',
    serviceId: 'ironing-service',
    group: 'main-services',
    dataKey: 'laundry-ironing',
  },
  {
    id: 'shirt-service',
    title: 'Shirt Service',
    serviceId: 'shirt-service',
    group: 'main-services',
    dataKey: 'laundry',
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain Cleaning',
    serviceId: 'curtain-cleaning',
    group: 'main-services',
    dataKey: 'dry-cleaning',
  },
  {
    id: 'wedding-dress-cleaning',
    title: 'Wedding Dress Cleaning',
    serviceId: 'wedding-dress-cleaning',
    group: 'main-services',
    dataKey: 'dry-cleaning',
  },
];

/** Popular search keyword headings — each lists full UK coverage (general locations). */
const seoKeywordSectionDefs: Array<{ id: string; title: string }> = [
  { id: 'dry-cleaners', title: 'Dry Cleaners' },
  { id: 'dry-cleaners-near-you', title: 'Dry Cleaners Near You' },
  { id: 'laundromats-launderettes', title: 'Laundromats & Launderettes' },
  { id: 'laundry-near-me', title: 'Laundry Near Me' },
  { id: 'laundry-service', title: 'Laundry Service' },
  { id: 'laundry-services', title: 'Laundry Services' },
  { id: 'laundry-pickup-delivery', title: 'Laundry Pickup & Delivery' },
  { id: 'laundry-collection-delivery', title: 'Laundry Collection & Delivery' },
  { id: 'wash-and-fold-near-me', title: 'Wash and Fold Near Me' },
  { id: 'wash-fold-service', title: 'Wash & Fold Service' },
  { id: 'ironing-near-me', title: 'Ironing Near Me' },
  { id: 'professional-ironing', title: 'Professional Ironing' },
  { id: 'shirt-laundry', title: 'Shirt Laundry' },
  { id: 'shirt-laundry-service', title: 'Shirt Laundry Service' },
  { id: 'suit-cleaning', title: 'Suit Cleaning' },
  { id: 'suit-dry-cleaning', title: 'Suit Dry Cleaning' },
  { id: 'duvet-cleaning', title: 'Duvet Cleaning' },
  { id: 'bedding-cleaning', title: 'Bedding Cleaning' },
  { id: 'dry-cleaning-near-me', title: 'Dry Cleaning Near Me' },
  { id: 'dry-cleaning-service', title: 'Dry Cleaning Service' },
  { id: 'clothes-cleaning', title: 'Clothes Cleaning' },
  { id: 'garment-care', title: 'Garment Care' },
  { id: 'linen-cleaning', title: 'Linen Cleaning' },
  { id: 'express-laundry', title: 'Express Laundry Service' },
  { id: 'same-day-laundry', title: 'Same Day Laundry' },
  { id: 'eco-friendly-laundry', title: 'Eco Friendly Laundry' },
  { id: 'formal-wear-cleaning', title: 'Formal Wear Cleaning' },
  { id: 'coat-jacket-cleaning', title: 'Coat & Jacket Cleaning' },
  { id: 'dress-cleaning', title: 'Dress Cleaning' },
  { id: 'delicate-garment-cleaning', title: 'Delicate Garment Cleaning' },
  { id: 'stain-removal-service', title: 'Stain Removal Service' },
  { id: 'wedding-gown-cleaning', title: 'Wedding Gown Cleaning' },
  { id: 'curtain-laundry', title: 'Curtain Laundry' },
  { id: 'home-laundry-service', title: 'Home Laundry Service' },
  { id: 'laundry-delivery-service', title: 'Laundry Delivery Service' },
];

const seoKeywordSections: LocationPageSection[] = seoKeywordSectionDefs.map((section) => ({
  ...section,
  group: 'seo-keywords' as const,
  dataKey: 'general',
}));

/** Total SEO keyword sections on /locations. */
export const seoKeywordSectionCount = seoKeywordSections.length;

/** SEO keyword sections added beyond the original four blocks. */
export const seoKeywordSectionsAdded = seoKeywordSectionCount - 4;

/**
 * Locations page sections — headings and data keys only (no competitor copy).
 */
export const locationPageSections: LocationPageSection[] = [
  {
    id: 'general',
    title: 'General',
    group: 'general',
    dataKey: 'general',
  },
  ...mainServiceSections,
  ...seoKeywordSections,
];

export function getSectionsForGroup(group: LocationSectionGroup): LocationPageSection[] {
  return locationPageSections.filter((section) => section.group === group);
}

export function getSeoKeywordSections(): LocationPageSection[] {
  return seoKeywordSections;
}

/** URL query ids for /locations navigation (e.g. ?service=wash-fold). */
export const locationSectionIds = locationPageSections.map((section) => section.id);

export function isLocationSectionId(id: string): boolean {
  return locationSectionIds.includes(id);
}
