import React from 'react';
import {
  BadgePoundSterling,
  Clock,
  Factory,
  Gem,
  Leaf,
  Sparkles,
  Truck,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import whyChooseUsImage from '../assets/images/waching_room_laundry_man.webp';

const benefits: {
  icon: LucideIcon;
  title: string;
}[] = [
  {
    icon: Gem,
    title: 'Designerwear specialists',
  },
  {
    icon: Factory,
    title: 'All work done on-site',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly cleaning',
  },
  {
    icon: Truck,
    title: 'Free collection & delivery',
  },
  {
    icon: UserCheck,
    title: 'Our own trusted drivers',
  },
  {
    icon: BadgePoundSterling,
    title: 'Premium service, fair prices',
  },
  {
    icon: Clock,
    title: '24-hour turnaround',
  },
  {
    icon: Sparkles,
    title: 'Expert care you can trust',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative scroll-mt-28 overflow-hidden bg-[#134633] py-14 sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(76,175,80)] sm:text-sm">
            Why Choose Us
          </p>
          <h3 className="text-3xl font-extrabold tracking-tighter text-paper sm:text-4xl lg:text-5xl">
            Professional Laundry &amp; Dry Cleaning You Can Trust
          </h3>
          <p className="mt-4 text-base font-normal leading-relaxed text-paper sm:text-lg">
            We are laundry and dry cleaning specialists first – not just an app business. Every
            single garment is cleaned at our own premises by our expert team, with free collection
            and delivery across all our service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h4 className="mb-6 text-center text-xl font-extrabold tracking-tight text-paper sm:mb-7 sm:text-left sm:text-2xl">
              Why Choose The Laundry Man?
            </h4>
            <div className="grid content-center gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex flex-row items-center justify-center gap-3 text-center sm:justify-start sm:text-left"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/15 text-[rgb(76,175,80)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="min-w-0 text-base font-semibold leading-snug text-paper sm:text-lg">
                      {benefit.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-first lg:order-none"
          >
            <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 sm:rounded-3xl lg:mx-0 lg:h-full lg:min-h-[22rem] lg:rounded-none lg:border-0">
              <img
                src={whyChooseUsImage}
                alt="Professional washing machines and laundry facility at The Laundry Man"
                className="block aspect-[4/3] h-auto w-full object-cover object-center sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:w-full lg:object-cover lg:object-center"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#134633]/40 to-transparent lg:from-[#134633]/35" />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <BookNowButton label="Book Now" />
        </div>
      </div>
    </section>
  );
}
