import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import lavBotLaundry from '../assets/images/lav_bot_laundry_1780456662542.png';
import satisfactionImg from '../assets/images/satisfaction.png';
import collectionDeliveryImg from '../assets/images/collection-delivery.png';
import recommendedServiceImg from '../assets/images/recommended-service.png';
import type { CityData } from '../data/cities';

interface HeroProps {
  onBookNow: () => void;
  city?: string;
  cityData?: CityData;
}

export default function Hero({ onBookNow, city, cityData }: HeroProps) {
  return (
    <div className="relative overflow-hidden flex items-center min-h-screen pt-24 pb-12 lg:pt-32 lg:pb-16">
      {/* Background Image & Overlay */}
      <div className={`absolute inset-0 z-0 bg-white`}>
        <img 
          src={lavBotLaundry} 
          alt="Laundry Hero" 
          className={`w-full h-full object-cover transition-all duration-700 opacity-100 object-bottom`}
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
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-4"
          >
            <div className="flex items-center gap-4 text-slate bg-glass/90 backdrop-blur-md p-4 rounded-2xl border border-gold/20 transition-colors hover:bg-glass">
              <div className="shrink-0 flex items-center justify-center">
                <img src={satisfactionImg} alt="100% Customer Satisfaction" className="w-8 h-8 opacity-90" style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }} />
              </div>
              <span className="font-bold text-sm sm:text-base tracking-wide flex-1 text-slate font-sans">100% Customer Satisfaction</span>
            </div>
            
            <div className="flex items-center gap-4 text-slate bg-glass/90 backdrop-blur-md p-4 rounded-2xl border border-gold/20 transition-colors hover:bg-glass">
              <div className="shrink-0 flex items-center justify-center">
                <img src={collectionDeliveryImg} alt="Free Collection & Delivery" className="w-8 h-8 opacity-90" style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }} />
              </div>
              <span className="font-bold text-sm sm:text-base tracking-wide flex-1 text-slate font-sans">Free Collection & Delivery</span>
            </div>

            <div className="flex items-center gap-4 text-slate bg-glass/90 backdrop-blur-md p-4 rounded-2xl border border-gold/20 transition-colors hover:bg-glass">
              <div className="shrink-0 flex items-center justify-center">
                <img src={recommendedServiceImg} alt="Highly Recommended Service" className="w-8 h-8 opacity-90" style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }} />
              </div>
              <span className="font-bold text-sm sm:text-base tracking-wide flex-1 text-slate font-sans">Highly Recommended Service</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
