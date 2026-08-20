import { resolveLocationHref } from './locations';

export interface FooterLink {
  label: string;
  href: string;
}

export interface ServicesBookingLocationState {
  autoOpenBooking?: boolean;
  serviceType?: string;
}

export interface OperatingHour {
  day: string;
  hours: string;
}

/** Footer UK city links → city homepage with hero (e.g. /Birmingham). */
export function resolveFooterUkCityHref(city: string): string {
  const trimmed = city.trim();
  if (!trimmed) return '/';
  return `/${trimmed}`;
}

/** @deprecated Use resolveLocationHref from ./locations */
export function resolveCityHref(area: string): string {
  return resolveLocationHref(area);
}

/** Laundryheap-style service & solution links for the footer */
export const footerServices: FooterLink[] = [
  { label: 'Laundry', href: '/services' },
  { label: 'Wash & Fold', href: '/booking.html' },
  { label: 'Dry Cleaning', href: '/booking.html' },
  { label: 'Dry Cleaners', href: '/services' },
  { label: 'Ironing Service', href: '/booking.html' },
  { label: 'Shirt Service', href: '/booking.html' },
  { label: 'Curtain Cleaning', href: '/booking.html' },
  { label: 'Wedding Dress Cleaning', href: '/booking.html' },
  { label: 'Airbnb Laundry', href: '/commercial' },
  { label: 'Hotel Laundry', href: '/commercial' },
  { label: 'Commercial Laundry', href: '/commercial' },
  { label: 'Express Laundry', href: '/booking.html' },
  { label: 'Laundry Near Me', href: '/locations' },
  { label: 'Dry Cleaners Near Me', href: '/locations' },
];

export const footerOperatingHours: OperatingHour[] = [
  { day: 'Monday', hours: '07:00 - 23:00' },
  { day: 'Tuesday', hours: '07:00 - 23:00' },
  { day: 'Wednesday', hours: '07:00 - 23:00' },
  { day: 'Thursday', hours: '07:00 - 23:00' },
  { day: 'Friday', hours: '07:00 - 23:00' },
  { day: 'Saturday', hours: '08:00 - 18:00' },
  { day: 'Sunday', hours: '09:00 - 21:00' },
];

export const footerQuickLinksCol1: FooterLink[] = [
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Commercial Cleaning', href: '/commercial' },
  { label: 'Contact', href: '/contact' },
  { label: 'Schedule your collection', href: '/booking.html' },
];

export const footerExploreLinks: FooterLink[] = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Why Choose Us', href: '/#why-choose-us' },
  { label: 'Prices & Services', href: '/pricing' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Locations', href: '/locations' },
];

export const footerQuickLinksCol2: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
];

export const footerUkCities = ['London', 'Birmingham', 'Cheshire', 'Manchester', 'Leeds'];

export const footerSocialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/wilmslowedcls/',
    className: 'bg-[#1877F2] hover:bg-[#166fe0]',
    icon: 'facebook' as const,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@ecolaundryanddrycleaners',
    className: 'bg-black hover:bg-zinc-900',
    icon: 'tiktok' as const,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thedrycleaners2025',
    className: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90',
    icon: 'instagram' as const,
  },
];
