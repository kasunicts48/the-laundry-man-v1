import React from 'react';
import { motion } from 'motion/react';

import designerWearImage from '../assets/images/we-specialise-in-designer-wear.webp';

export default function HomeDesignerWear() {
  return (
    <section
      id="designerwear"
      className="relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy-alt py-16 sm:py-24"
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
            <p className="section-eyebrow">Designer wear</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Expert Care for Designer Wear
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
              Your premium garments deserve special attention. We handle delicate fabrics, luxury
              labels and fine finishes with expert care — all cleaned at our own premises, returned
              fresh and ready to wear.
            </p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-[11rem] sm:max-w-sm md:max-w-md lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-xl border border-gold/20 bg-paper shadow-accent-sm sm:rounded-3xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}
