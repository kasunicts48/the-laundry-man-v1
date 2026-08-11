import React from 'react';
import { Clock, HandHeart, Leaf, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import doorstepIntroImage from '../assets/images/we use eco-friendly products.webp';

const highlights = [
  {
    icon: ShoppingBag,
    title: 'Free Collection – our own drivers',
  },
  {
    icon: Clock,
    title: '24hr turnaround on most items',
  },
  {
    icon: Leaf,
    title: 'Eco-friendly, gentle care',
  },
  {
    icon: HandHeart,
    title: 'Quality promise you can trust',
  },
];
export default function HomeDoorstepIntro() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-navy-alt py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-stretch gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14"
        >
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:h-full lg:max-w-none">
            <div className="relative aspect-[4/3] squircle border border-gold/20 shadow-accent-sm lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <img
                src={doorstepIntroImage}
                alt="Eco-friendly laundry products used for professional garment care"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={896}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/50 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              24hr Eco-Laundry &amp;{' '}
              <span className="text-gold">Dry Cleaning</span>
            </h2>

            <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
              Pickup from your home or workplace • Eco-friendly cleaning • Perfect results for all
              your clothes.
            </p>

            <div className="mt-6 w-full overflow-hidden rounded-2xl bg-[#134633] shadow-accent-sm sm:mt-7 lg:max-w-none">
              <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 sm:p-6">
                {highlights.map(({ icon: Icon, title }, index) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                    className="flex items-center gap-4 text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper/15 text-[rgb(76,175,80)] sm:h-10 sm:w-10">
                      <Icon className="h-6 w-6 stroke-[1.5] sm:h-5 sm:w-5" aria-hidden="true" />
                    </span>
                    <p className="min-w-0 text-base font-semibold leading-snug text-paper sm:text-lg">
                      {title}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-6 w-full sm:mt-7">
              <BookNowButton fullWidth label="Book Now" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
