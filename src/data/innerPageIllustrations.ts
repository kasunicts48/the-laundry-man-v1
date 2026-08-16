import type { FC, SVGProps } from 'react';
import BannerAbout from '../assets/images/banner-about.svg?react';
import BannerBlog from '../assets/images/banner-blog.svg?react';
import BannerCommercial from '../assets/images/banner-commercial.svg?react';
import BannerContact from '../assets/images/banner-contact.svg?react';
import BannerLegal from '../assets/images/banner-legal.svg?react';
import BannerLocations from '../assets/images/Directions-bro.svg?react';

export type BannerIllustrationAspect = 'landscape' | 'square';
export type BannerIllustrationComponent = FC<SVGProps<SVGSVGElement>>;

export interface InnerPageIllustrationConfig {
  Illustration: BannerIllustrationComponent;
  alt: string;
  aspect: BannerIllustrationAspect;
}

export const innerPageIllustrations: Record<string, InnerPageIllustrationConfig> = {
  '/contact': {
    Illustration: BannerContact,
    alt: 'Contact us illustration',
    aspect: 'square',
  },
  '/about': {
    Illustration: BannerAbout,
    alt: 'About our laundry service illustration',
    aspect: 'square',
  },
  '/services': {
    Illustration: BannerLegal,
    alt: 'Laundry and dry cleaning illustration',
    aspect: 'landscape',
  },
  '/pricing': {
    Illustration: BannerLegal,
    alt: 'Pricing and garment care illustration',
    aspect: 'landscape',
  },
  '/commercial': {
    Illustration: BannerCommercial,
    alt: 'Commercial laundry illustration',
    aspect: 'landscape',
  },
  '/blog': {
    Illustration: BannerBlog,
    alt: 'Blog illustration',
    aspect: 'square',
  },
  '/locations': {
    Illustration: BannerLocations,
    alt: 'Directions and locations illustration',
    aspect: 'square',
  },
  '/privacy-policy': {
    Illustration: BannerLegal,
    alt: 'Privacy policy illustration',
    aspect: 'landscape',
  },
  '/terms-conditions': {
    Illustration: BannerLegal,
    alt: 'Terms and conditions illustration',
    aspect: 'landscape',
  },
};

export function getInnerPageIllustration(pathname: string): InnerPageIllustrationConfig | null {
  return innerPageIllustrations[pathname] ?? null;
}
