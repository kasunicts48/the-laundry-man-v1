import React from 'react';
import { useMatch } from 'react-router-dom';
import { motion } from 'motion/react';
import lavBotLaundry from '../assets/images/lav_bot_laundry_1780456662542.png';
import HeroPromoBooking from './HeroPromoBooking';
import { DEFAULT_LOCATION_NAME } from '../data/locations';
import type { CityData } from '../data/cities';

interface HeroProps {
  locationName: string;
  cityData?: CityData;
}

export default function Hero({ locationName, cityData }: HeroProps) {
  const isRootHome = Boolean(useMatch({ path: '/', end: true }));
  const resolvedLocationName =
    locationName?.trim() || cityData?.name || DEFAULT_LOCATION_NAME;

  return (
    <div
      id="hero"
      className="hero-section relative overflow-hidden flex items-center min-h-[100svh] pb-10 sm:pb-12 lg:pb-14"
    >
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
            <h1 className="font-extrabold text-white leading-[0.95] tracking-tighter mb-5 sm:mb-6">
              {isRootHome ? (
                <div className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl">
                  Premium Laundry &<br />
                  <span className="text-gold">Dry Cleaning Services.</span>
                </div>
              ) : (
                <div className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl">
                  Premium Laundry &<br />
                  Dry Cleaning Services in{' '}
                  <span className="text-gold">{resolvedLocationName}</span>.
                </div>
              )}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-ink mb-6 sm:mb-8 max-w-2xl font-light leading-relaxed"
          >
            {isRootHome
              ? 'Eco-friendly, professional garment care delivered right to your door. We pick up, clean, and return your clothes pristine within 24 hours.'
              : cityData?.heroDescription ??
                `Eco-friendly, professional garment care delivered right to your door in ${resolvedLocationName}. We pick up, clean, and return your clothes pristine within 24 hours.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center sm:justify-start"
          >
            <HeroPromoBooking />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
