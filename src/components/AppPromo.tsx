import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { CityData } from '../data/cities';

interface AppPromoProps {
  cityData?: CityData;
}

export default function AppPromoAndReviews({ cityData }: AppPromoProps = {}) {
  const defaults = [
    { text: 'Excellent, efficient and friendly service. The turnaround time is unbeatable.', author: 'Sarah Jenkins' },
    { text: 'Great Customer Service! They saved my suit right before a major conference.', author: 'Michael T.' },
    { text: 'Good Services. The app makes booking a collection incredibly seamless.', author: 'Emma W.' },
  ];

  let reviews = defaults;

  return (
    <section id="testimonials" className="scroll-mt-28 overflow-hidden bg-navy pt-12 pb-24 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="section-eyebrow">Testimonials</h2>
          <h3 className="text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h3>
        </div>

        <div className="mb-10 flex items-center justify-center md:mb-12">
          <div className="flex items-center gap-3">
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-[#00B67A]"
                >
                  <Star size={12} className="fill-white text-white" />
                </div>
              ))}
            </div>
            <div className="text-sm font-bold text-ink">Excellent</div>
            <div className="hidden text-ink sm:inline">•</div>
            <a
              href="https://www.trustpilot.com/review/www.thelaundryman.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 hover:opacity-80 transition-opacity sm:flex"
            >
              <span className="text-sm font-light text-ink whitespace-nowrap">Based on reviews on</span>
              <div className="flex items-center gap-1 font-bold text-ink whitespace-nowrap">
                <Star size={16} className="fill-[#00B67A] text-[#00B67A]" />
                Trustpilot
              </div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card border-l-[4px] border-l-[#00B67A] !rounded-bl-md !rounded-tl-md p-6"
            >
              <div className="mb-3 flex gap-[2px]">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex h-5 w-5 items-center justify-center rounded-[2px] bg-[#00B67A]"
                  >
                    <Star size={10} className="fill-white text-white" />
                  </div>
                ))}
              </div>
              <p className="mb-3 font-light leading-relaxed text-ink">"{review.text}"</p>
              <p className="text-sm font-bold text-[#00B67A]">- {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
