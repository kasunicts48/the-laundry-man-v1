import { services, type ServiceId } from './services';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterServiceLink {
  label: string;
  href: '/services';
  serviceId: ServiceId;
}

export interface ServicesBookingLocationState {
  autoOpenBooking?: boolean;
  serviceType?: ServiceId;
}

export interface OperatingHour {
  day: string;
  hours: string;
}

export interface LondonRegion {
  name: string;
  areas: string[];
}

const cityRouteMap: Record<string, string> = {
  cheshire: '/cheshire',
  leeds: '/leeds',
  manchester: '/manchester',
  'manchester city centre': '/manchester',
  birmingham: '/birmingham',
  sheffield: '/sheffield',
};

export function resolveCityHref(area: string): string {
  return cityRouteMap[area.toLowerCase()] ?? '#';
}

export const footerServices: FooterServiceLink[] = services.map((service) => ({
  label: service.title,
  href: '/services',
  serviceId: service.id,
}));

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
  { label: 'Contact', href: '/contact' },
];

export const footerQuickLinksCol2: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Commercial Cleaning', href: '/commercial' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
];

export const footerLondonRegions: LondonRegion[] = [
  {
    name: 'East London',
    areas: ['Hackney', 'Walthamstow', 'Crouch End', 'Dalston', 'Finsbury Park', 'Canary Wharf'],
  },
  {
    name: 'North London',
    areas: ['Stoke Newington', 'Highbury', 'Holloway', 'Homerton', 'Hoxton', 'Camden'],
  },
  {
    name: 'South London',
    areas: ['Richmond Upon Thames', 'London Fields', 'Muswell Hill', 'Stratford', 'Islington', 'Hornsey', 'Lambeth'],
  },
  {
    name: 'West London',
    areas: ['Mayfair', 'Tottenham', 'Wood Green', 'Stamford Hill', 'Leytonstone', 'Bond Street', 'Hammersmith', 'Wandsworth'],
  },
];

export const footerUkCitiesCol1: string[] = [
  'Cheshire',
  'Didsbury',
  'Leeds',
  'Newcastle',
  'Salford',
  'Manchester City Centre',
];

export const footerUkCitiesCol2: string[] = [
  'Birmingham',
  'Harrogate',
  'Manchester',
  'Sheffield',
  'Stockport',
];

export const footerSocialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    className: 'bg-[#1877F2] hover:bg-[#166fe0]',
    icon: 'facebook' as const,
  },
  {
    label: 'X',
    href: 'https://x.com/',
    className: 'bg-black hover:bg-zinc-900',
    icon: 'x' as const,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    className: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90',
    icon: 'instagram' as const,
  },
];
