import React from 'react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import designerWearImage from '../assets/images/we-specialise-in-designer-wear.webp';

export default function HomeDesignerWear() {
  return (
    <section
      id="designerwear"
      className="relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy-alt py-14 sm:py-20"
    >
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
          >
            <p className="section-eyebrow">Designerwear specialists</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              We specialise in designerwear
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
              Premium garments need expert care. We handle delicate fabrics, labels, and finishes
              with the attention they deserve — cleaned at our own site and returned ready to wear.
            </p>
            <div className="mt-7 flex justify-center lg:justify-start">
              <BookNowButton label="Book Now" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="overflow-hidden rounded-2xl border border-gold/20 bg-paper shadow-accent-sm sm:rounded-3xl">
              <img
                src={designerWearImage}
                alt="Designer garments hanging ready after specialist cleaning and care"
                className="block h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
                width={900}
                height={1200}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
