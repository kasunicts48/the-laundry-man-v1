import type { LucideIcon } from 'lucide-react';
import { Briefcase, Heart, User, Users } from 'lucide-react';

// Pexels — free for commercial use (pexels.com/license)
import familiesImage from '../assets/images/audience/families.webp';
import businessesImage from '../assets/images/audience/commercial.webp';
import professionalsImage from '../assets/images/audience/professionals.webp';
import youImage from '../assets/images/audience/you.webp';

export interface HomeAudienceCard {
  id: string;
  eyebrow: string;
  title: string;
  headline: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}

export const homeAudienceCards: HomeAudienceCard[] = [
  {
    id: 'families',
    eyebrow: 'Made for Families',
    title: 'Families',
    headline:
      'More family time, zero laundry chores.',
    image: familiesImage,
    imageAlt: 'Happy family spending quality time together at home',
    icon: Users,
  },
  {
    id: 'commercial',
    eyebrow: 'Made for Commercial',
    title: 'Commercial',
    headline:
      'We clean. Your business grows.',
    image: businessesImage,
    imageAlt: 'Business team collaborating in a modern office',
    icon: Briefcase,
  },
  {
    id: 'professionals',
    eyebrow: 'Made for Professionals',
    title: 'Professionals',
    headline:
      'Look sharp. Focus on success.',
    image: professionalsImage,
    imageAlt: 'Professional in a sharp suit ready for work',
    icon: User,
  },
  {
    id: 'you',
    eyebrow: 'Made for You',
    title: 'You',
    headline:
      "Laundry that fits your life.",
    image: youImage,
    imageAlt: 'Person relaxing and enjoying free time',
    icon: Heart,
  },
];
