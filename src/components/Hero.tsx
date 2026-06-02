import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Star } from 'lucide-react';
import { motion } from 'motion/react';
import friendlyLaundryMan from '../assets/images/friendly_laundry_man_1779977474422.png';
import type { CityData } from '../data/cities';

interface HeroProps {
  onBookNow: () => void;
  city?: string;
  cityData?: CityData;
}

export default function Hero({ onBookNow, city, cityData }: HeroProps) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-navy">
        <img 
          src={friendlyLaundryMan} 
          alt="Friendly Laundry Man" 
          className="w-full h-full object-cover object-[70%_center] opacity-80 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-navy/30 to-transparent mix-blend-overlay"></div>
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
            className="text-base sm:text-lg text-slate/90 mb-10 max-w-2xl font-light leading-relaxed opacity-80"
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
              className="px-6 py-3 bg-gold text-navy font-bold text-xs pill shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] transition-transform hover:-translate-y-1 text-center tracking-wider uppercase"
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate/80 uppercase tracking-widest"
          >
            <span>Available in:</span>
            <div className="flex gap-2">
              <Link to="/manchester" className="hover:text-gold transition-colors">Manchester</Link>
              <Link to="/leeds" className="hover:text-gold transition-colors">Leeds</Link>
              <Link to="/birmingham" className="hover:text-gold transition-colors">Birmingham</Link>
              <Link to="/sheffield" className="hover:text-gold transition-colors">Sheffield</Link>
              <Link to="/cheshire" className="hover:text-gold transition-colors">Cheshire</Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="flex items-center gap-3 text-white/90">
              <div className="bg-gold/20 p-2 rounded-full text-gold">
                <Star size={24} className="fill-gold" />
              </div>
              <span className="font-bold text-sm tracking-wide">100% Customer Satisfaction</span>
            </div>
            <div className="flex items-center gap-3 text-slate">
              <div className="bg-white/5 border border-gold/20 p-2 rounded-2xl text-gold">
                <Truck size={24} />
              </div>
              <span className="font-bold text-sm tracking-wide">Free Collection & Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-slate">
              <div className="bg-white/5 border border-gold/20 p-2 rounded-2xl text-gold">
                <ShieldCheck size={24} />
              </div>
              <span className="font-bold text-sm tracking-wide">Highly Recommended Service</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
