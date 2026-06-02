import React from 'react';
import { Star, Apple, Play } from 'lucide-react';
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
            <h3 className="text-4xl sm:text-5xl font-extrabold text-slate tracking-tighter mb-10">What Our {cityData?.name ? `${cityData.name} ` : ''}Customers Say</h3>
            
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="glass-card p-6 border-l-[3px] border-l-gold !rounded-bl-md !rounded-tl-md">
                  <div className="flex text-gold mb-3">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} className="fill-gold" />)}
                  </div>
                  <p className="text-slate opacity-80 font-light leading-relaxed mb-3">"{review.text}"</p>
                  <p className="text-sm font-bold text-gold opacity-90">- {review.author}</p>
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
              <p className="text-slate opacity-60 text-lg mb-10 font-light leading-relaxed">Manage your orders, track driver locations, and pay securely right from your phone.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 transition-transform hover:-translate-y-1 w-full sm:w-auto">
                  <Apple size={28} className="text-slate" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-slate/60">Download on the</div>
                    <div className="text-lg font-bold leading-tight mt-0.5 text-slate">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-6 py-4 transition-transform hover:-translate-y-1 w-full sm:w-auto">
                  <Play size={24} className="fill-slate text-slate" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest text-slate/60">GET IT ON</div>
                    <div className="text-lg font-bold leading-tight mt-0.5 text-slate">Google Play</div>
                  </div>
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
