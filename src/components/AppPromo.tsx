import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { CityData } from '../data/cities';

interface AppPromoProps {
  cityData?: CityData;
}

export default function AppPromoAndReviews({ cityData }: AppPromoProps = {}) {
  // Use localized testimonials if available and we have at least one, else defaults
  const defaults = [
    { text: "Excellent, efficient and friendly service. The turnaround time is unbeatable.", author: "Sarah Jenkins" },
    { text: "Great Customer Service! They saved my suit right before a major conference.", author: "Michael T." },
    { text: "Good Services. The app makes booking a collection incredibly seamless.", author: "Emma W." }
  ];

  const hasLocalTestimonials = cityData?.testimonials && cityData.testimonials.length > 0;
  
  // Mix in local testimonials with defaults to ensure we have enough reviews shown
  let reviews = defaults;
  if (hasLocalTestimonials) {
      reviews = cityData.testimonials.map(t => ({
          text: t.text,
          author: t.neighborhood ? `${t.author} (${t.neighborhood})` : t.author
      }));
      // Pad with defaults if fewer than 3 local testimonials
      if (reviews.length < 3) {
          reviews = [...reviews, ...defaults.slice(0, 3 - reviews.length)];
      }
  }

  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Reviews Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Testimonials</h2>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter mb-4">What Our {cityData?.name ? `${cityData.name} ` : ''}Customers Say</h3>
            
            {/* Mobile: compact Trustpilot widget */}
            <div className="flex md:hidden items-center justify-center mb-10">
              <div className="flex flex-col items-center">
                <div className="flex gap-[2px]">
                  {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-6 h-6 bg-[#00B67A] flex items-center justify-center rounded-[2px]">
                      <Star size={12} className="fill-white text-white" />
                    </div>
                  ))}
                </div>
                <div className="text-ink font-bold text-xs mt-1.5 whitespace-nowrap">Excellent</div>
              </div>

              <div className="w-px h-8 bg-gray-300 mx-4 shrink-0" aria-hidden="true" />

              <a
                href="https://www.trustpilot.com/review/www.thelaundryman.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:opacity-80 transition-opacity"
              >
                <span className="text-ink text-xs font-light whitespace-nowrap">Based on reviews on</span>
                <div className="flex items-center gap-1 font-bold text-ink mt-1.5 whitespace-nowrap">
                  <Star size={16} className="fill-[#00B67A] text-[#00B67A]" />
                  Trustpilot
                </div>
              </a>
            </div>

            {/* Desktop: original horizontal row */}
            <div className="hidden md:flex items-center gap-3 mb-10">
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="w-6 h-6 bg-[#00B67A] flex items-center justify-center rounded-[2px]">
                    <Star size={12} className="fill-white text-white" />
                  </div>
                ))}
              </div>
              <div className="text-ink font-bold text-sm">Excellent</div>
              <div className="text-ink text-sm">•</div>
              <a
                href="https://www.trustpilot.com/review/www.thelaundryman.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <span className="text-ink text-sm font-light whitespace-nowrap">Based on reviews on</span>
                <div className="flex items-center gap-1 font-bold text-ink whitespace-nowrap">
                  <Star size={16} className="fill-[#00B67A] text-[#00B67A]" />
                  Trustpilot
                </div>
              </a>
            </div>

            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="glass-card p-6 border-l-[4px] border-l-[#00B67A] !rounded-bl-md !rounded-tl-md">
                  <div className="flex gap-[2px] mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center rounded-[2px]">
                        <Star size={10} className="fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <p className="text-ink font-light leading-relaxed mb-3">"{review.text}"</p>
                  <p className="text-sm font-bold text-[#00B67A]">- {review.author}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* App Promo Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-10 sm:p-14 relative flex flex-col justify-center min-h-[500px] overflow-hidden"
          >
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4"></div>

            <div className="relative z-10 w-full max-w-md mx-auto xl:mx-0">
              <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">The App</h2>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter mb-6 leading-tight">Download Our App for Easier Booking</h3>
              <p className="text-ink text-lg mb-10 font-light leading-relaxed">Manage your orders, track driver locations, and pay securely right from your phone.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com/kr/app/the-laundryman-app/id6748582882?l=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:-translate-y-1 inline-block"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-12 sm:h-14 w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.cleancloudapp.thelaundryman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:-translate-y-1 inline-block"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-12 sm:h-14 w-auto"
                  />
                </a>
              </div>
            </div>
            
            {/* Simulated Phone Mockup peeking out */}
            <div className="absolute -bottom-24 -right-12 sm:-right-8 lg:-right-24 xl:-right-10 w-64 sm:w-80 h-96 bg-navy rounded-t-[3rem] border-8 border-phone-border shadow-[0_-20px_60px_-15px_rgba(212,175,55,0.1)] opacity-40 sm:opacity-100 hidden md:block rotate-12 transform origin-bottom-right transition-colors duration-500">
              <div className="w-full h-full bg-navy-alt rounded-t-[2.5rem] p-4 pt-10 border border-white/5 transition-colors duration-500">
                <div className="w-1/2 h-4 bg-white/10 rounded-full mx-auto mb-8 relative before:absolute before:inset-y-1 before:right-2 before:w-2 before:h-2 before:bg-white/20 before:rounded-full"></div>
                <div className="space-y-4">
                  <div className="w-full h-24 bg-white/5 rounded-2xl border border-white/5"></div>
                  <div className="w-full h-24 bg-white/5 rounded-2xl border border-white/5"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
