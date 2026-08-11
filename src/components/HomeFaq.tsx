import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import faqImage from '../assets/images/girl-thinking.webp';
import { homeFaqItems } from '../data/homeFaq';
import BookNowButton from './BookNowButton';

export default function HomeFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="scroll-mt-28 border-y border-white/10 bg-navy py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="section-eyebrow">Questions &amp; Answers</h2>
          <h3 className="text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-5xl">
            Got a question? We&apos;re happy to help.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-ink sm:text-lg">
            Straightforward answers about laundry, dry cleaning, and doorstep delivery across the
            UK.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:gap-x-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:sticky lg:top-28"
          >
            <div className="relative aspect-[3/4] max-h-[28rem] shape-blob shape-blob-faq sm:max-h-[32rem] lg:max-h-none lg:min-h-[24rem]">
              <img
                src={faqImage}
                alt="Smiling woman thinking about laundry and dry cleaning questions"
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width={800}
                height={1067}
              />
            </div>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {homeFaqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-faq-panel-${index}`;
              const buttonId = `${baseId}-faq-button-${index}`;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="text-base font-bold leading-snug text-slate sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-gold transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/5 px-5 pb-5 pt-4 text-sm font-light leading-relaxed text-ink sm:px-6 sm:pb-6 sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <BookNowButton label="Book Now" />
        </div>
      </div>
    </section>
  );
}
