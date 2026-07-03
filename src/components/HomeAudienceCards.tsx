import React from 'react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import { homeAudienceCards } from '../data/homeAudienceCards';

export default function HomeAudienceCards() {
  return (
    <section id="audience" className="relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy-alt py-16 sm:py-24">
      <div
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[rgb(76,175,80)]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <h2 className="section-eyebrow">Who we serve</h2>
          <h3 className="text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-5xl">
           We do laundry. You do life.
          </h3>
        </div>

        <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
          {homeAudienceCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card group flex w-[min(85vw,20rem)] shrink-0 snap-center flex-col overflow-hidden sm:w-auto"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#134633]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(76,175,80)] text-paper shadow-md">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/90">
                        {card.eyebrow}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col bg-paper p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm font-light leading-relaxed text-slate/80 sm:text-[0.95rem]">
                    {card.headline}
                  </p>

                  <div className="mt-5 pt-1">
                    <BookNowButton fullWidth label="Book Now" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
