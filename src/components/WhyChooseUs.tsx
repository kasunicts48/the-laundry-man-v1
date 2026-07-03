import React from 'react';
import {
  BadgePoundSterling,
  Factory,
  HeartHandshake,
  Shirt,
  Sparkles,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import whyChooseUsImage from '../assets/images/side-view-young-woman-spending-time-home.jpg';

const benefits: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Shirt,
    title: 'Not an App Company',
    description:
      'We are not an app company — we are a dry cleaning and laundry company. Garment care is our business, and quality is at the heart of everything we do.',
  },
  {
    icon: Factory,
    title: 'We Clean All Items at Our Own Site',
    description:
      'Every garment is cleaned, finished, and quality-checked at our own facility — not sent to a third party. That means full control over standards, care, and results.',
  },
  {
    icon: Truck,
    title: 'Free Collection & Delivery',
    description:
      'Enjoy convenient door-to-door collection and delivery across our service areas, so professional laundry care fits around your schedule.',
  },
  {
    icon: HeartHandshake,
    title: '100% Customer Satisfaction',
    description:
      'We provide excellent customer service and take pride in returning your clothes fresh, clean, and ready to wear.',
  },
  {
    icon: Sparkles,
    title: 'Best Quality',
    description:
      'From everyday wash & fold to specialist dry cleaning, leather, duvets, and more — our experienced team handles every fabric with care.',
  },
  {
    icon: BadgePoundSterling,
    title: 'Affordable Prices',
    description:
      'We offer practical solutions for all your laundry needs, with competitive pricing and a straightforward booking experience online or by phone.',
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
            Professional Laundry & Dry Cleaning You Can Trust
          </h3>
          <p className="mt-4 text-base font-normal leading-relaxed text-paper/90 sm:text-lg">
            We are not an app company — we are a dry cleaning and laundry company. We clean all
            items at our own site, with free collection and delivery across our service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid content-center gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:gap-y-7">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper/15 text-[rgb(76,175,80)] sm:h-8 sm:w-8">
                  <Icon className="h-6 w-6 sm:h-4 sm:w-4" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="mb-1.5 text-base font-semibold leading-snug text-paper sm:text-lg">
                    {benefit.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-paper/90 sm:text-base">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative min-h-[14rem] sm:min-h-[18rem] lg:min-h-0"
          >
            <div className="relative h-full min-h-[14rem] shape-blob sm:min-h-[18rem] lg:min-h-full">
              <img
                src={whyChooseUsImage}
                alt="Professional dry cleaning and laundry equipment at our facility"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={900}
                height={675}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#134633]/35 to-transparent" />
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
