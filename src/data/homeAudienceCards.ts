import type { LucideIcon } from 'lucide-react';
import { Briefcase, Heart, User, Users } from 'lucide-react';

// Pexels — free for commercial use (pexels.com/license)
import familiesImage from '../assets/images/audience/families.jpg';
import businessesImage from '../assets/images/audience/businesses.jpg';
import professionalsImage from '../assets/images/audience/professionals.jpg';
import youImage from '../assets/images/audience/you.jpg';

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
      'More memories, fewer chores — Laundry Man treats every garment with the same love you give your family.',
    image: familiesImage,
    imageAlt: 'Happy family spending quality time together at home',
    icon: Users,
  },
  {
    id: 'businesses',
    eyebrow: 'Made for Businesses',
    title: 'Businesses',
    headline:
      'Stop spending company time on company laundry. Laundry Man keeps your operations fresh so your team stays focused on what drives growth.',
    image: businessesImage,
    imageAlt: 'Business team collaborating in a modern office',
    icon: Briefcase,
  },
  {
    id: 'professionals',
    eyebrow: 'Made for Professionals',
    title: 'Professionals',
    headline:
      'Your career deserves a sharp wardrobe — Laundry Man keeps you looking the part while you focus on the bigger picture.',
    image: professionalsImage,
    imageAlt: 'Professional in a sharp suit ready for work',
    icon: User,
  },
  {
    id: 'you',
    eyebrow: 'Made for You',
    title: 'You',
    headline:
      "Whether it's a lazy Sunday or a packed Monday, Laundry Man fits around your life — not the other way around.",
    image: youImage,
    imageAlt: 'Person relaxing and enjoying free time',
    icon: Heart,
  },
];
