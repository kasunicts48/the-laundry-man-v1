import type { ServiceId } from './services';

export interface LocationPageSection {
  id: string;
  title: string;
  description?: string;
  /** Maps to our service block; omitted for the general locations section. */
  serviceId?: ServiceId;
  /** Source section in the Laundryheap HTML (locations only — not competitor copy). */
  htmlSource: string;
}

/**
 * Page sections mirroring the Laundryheap sitemap structure.
 * Location lists under each service use the same UK coverage extracted from the HTML.
 */
export const locationPageSections: LocationPageSection[] = [
  {
    id: 'general',
    title: 'General',
    htmlSource: 'General',
  },
  {
    id: 'wash-fold',
    title: 'Wash & Fold',
    serviceId: 'wash-fold',
    htmlSource: 'Laundry categories (Wash)',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    serviceId: 'dry-cleaning',
    htmlSource: 'Dry cleaning',
  },
  {
    id: 'ironing-service',
    title: 'Ironing Service',
    serviceId: 'ironing-service',
    htmlSource: 'Laundry categories (Ironing)',
  },
  {
    id: 'shirt-service',
    title: 'Shirt Service',
    serviceId: 'shirt-service',
    htmlSource: 'Laundry',
  },
  {
    id: 'curtain-cleaning',
    title: 'Curtain Cleaning',
    serviceId: 'curtain-cleaning',
    htmlSource: 'Dry cleaning',
  },
  {
    id: 'wedding-dress-cleaning',
    title: 'Wedding Dress Cleaning',
    serviceId: 'wedding-dress-cleaning',
    htmlSource: 'Dry cleaning',
  },
];
