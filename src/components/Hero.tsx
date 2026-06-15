import React from 'react';
import { motion } from 'motion/react';
import lavBotLaundry from '../assets/images/lav_bot_laundry_1780456662542.png';
import type { CityData } from '../data/cities';

interface HeroProps {
  onBookNow: () => void;
  city?: string;
  cityData?: CityData;
}

export default function Hero({ onBookNow, city, cityData }: HeroProps) {
  return (
    <div id="hero" className="relative overflow-hidden flex items-center min-h-screen pt-24 pb-12 lg:pt-32 lg:pb-16">
      {/* Background — solid theme on mobile; full image from md up */}
      <div className="absolute inset-0 z-0 bg-navy">
        <img
          src={lavBotLaundry}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom opacity-20 md:opacity-100 transition-opacity duration-700"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-extrabold text-white leading-[0.95] tracking-tighter mb-8">
              {city ? (
                <div className="text-5xl sm:text-6xl lg:text-7xl">
                  Premium Laundry &<br/>
                  Dry Cleaning Services in <span className="text-gold">{cityData?.name || city}</span>.
                </div>
              ) : (
                <div className="text-6xl sm:text-7xl lg:text-8xl">
                  Premium Laundry &<br/>
                  <span className="text-gold">Dry Cleaning Services.</span>
                </div>
              )}
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-ink mb-10 max-w-2xl font-light leading-relaxed"
          >
            {cityData ? cityData.heroDescription : `Eco-friendly, professional garment care delivered right to your door. We pick up, clean, and return your clothes pristine within 24 hours.`}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onBookNow}
              className="px-6 py-3 bg-gold text-navy font-bold text-xs pill shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition-transform hover:-translate-y-1 text-center tracking-wider uppercase cursor-pointer"
            >
              Book a Collection
            </button>
            <a 
              href="#services"
              className="px-6 py-3 bg-white/5 border border-white/10 text-slate font-bold text-xs pill hover:bg-white/10 transition-transform hover:-translate-y-1 text-center tracking-wider uppercase"
            >
              View Services
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
