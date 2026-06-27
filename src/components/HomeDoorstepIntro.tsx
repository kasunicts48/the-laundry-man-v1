import React from 'react';
import { Clock, HandHeart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

import doorstepIntroImage from '../assets/images/cleaning-delivery-eco-firendly.jpeg';

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
          className="glass-card grid grid-cols-1 items-center gap-8 overflow-hidden p-6 sm:gap-10 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:p-10"
        >
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gold/15 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 shadow-accent">
              <img
                src={doorstepIntroImage}
                alt="Dry cleaning delivered to a happy customer at her front door"
                className="aspect-[75/56] h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={896}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/50 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              Laundry and dry cleaning at{' '}
              <span className="text-gold">your doorstep</span>
            </h2>

            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-ink sm:text-lg">
              We collect from your home, clean every garment with care, and return everything fresh,
              folded, and ready to wear — without you leaving the house.
            </p>

            <ul className="mt-6 flex w-full max-w-lg flex-col gap-5 sm:mt-8 sm:gap-6">
              {highlights.map(({ icon: Icon, title, subtitle }, index) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  className="flex items-start gap-4 text-left"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center text-slate">
                    <Icon className="h-9 w-9 stroke-[1.5] text-slate" aria-hidden="true" />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-base font-bold leading-snug text-slate sm:text-lg">{title}</p>
                    <p className="mt-0.5 text-sm font-light leading-relaxed text-ink sm:text-base">
                      {subtitle}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>          </div>
        </motion.div>
      </div>
    </section>
  );
}
