import React from 'react';
import { Clock, Gem, HandHeart, Leaf, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import doorstepIntroImage from '../assets/images/we use eco-friendly products.jpeg';

const highlights = [
  {
    icon: ShoppingBag,
    title: 'Free Collection & Delivery',
    subtitle: 'With friendly drivers',
  },
  {
    icon: Clock,
    title: '24hr Turnaround',
    subtitle: 'On nearly all items',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    subtitle: 'We use eco-friendly products for gentler, responsible garment care',
  },
  {
    icon: HandHeart,
    title: 'Satisfaction Guaranteed',
    subtitle: "Or we'll re-clean for free",
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
              Laundry and dry cleaning at{' '}
              <span className="text-gold">your doorstep</span>
            </h2>

            <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
              We collect from your home, clean every garment with care using eco-friendly products,
              and return everything fresh, folded, and ready to wear — without you leaving the house.
            </p>

            <div className="mt-6 w-full overflow-hidden rounded-2xl bg-[#134633] shadow-accent-sm sm:mt-7 lg:max-w-none">
              <ul className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 sm:p-6">
                {highlights.map(({ icon: Icon, title, subtitle }, index) => (
                  <motion.li
                    key={title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                    className="flex items-start gap-4 text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper/15 text-[rgb(76,175,80)] sm:h-10 sm:w-10">
                      <Icon className="h-6 w-6 stroke-[1.5] sm:h-5 sm:w-5" aria-hidden="true" />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-base font-semibold leading-snug text-paper sm:text-lg">{title}</p>
                      <p className="mt-0.5 text-sm font-light leading-relaxed text-paper/90 sm:text-base">
                        {subtitle}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="relative border-t border-white/10 bg-gradient-to-r from-black/20 via-black/10 to-black/20 px-5 py-5 sm:px-6 sm:py-6"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold/70 to-transparent"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/25 sm:h-14 sm:w-14">
                    <Gem className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:text-[11px]">
                      Designerwear specialists
                    </p>
                    <p className="mt-1.5 text-base font-extrabold leading-snug text-paper sm:text-lg">
                      We specialise in designerwear
                    </p>
                  </div>
                </div>
              </motion.div>
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
