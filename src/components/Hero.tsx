import React from 'react';
import { useMatch } from 'react-router-dom';
import { motion } from 'motion/react';
import HeroPromoBooking from './HeroPromoBooking';
import { DEFAULT_LOCATION_NAME } from '../data/locations';
import type { CityData } from '../data/cities';
import heroMobileImage from '../assets/images/sm-hero-section-image.jpeg';
import heroDesktopImage from '../assets/images/hero-section-image.jpeg';

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
      className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden bg-black sm:block"
    >
      {/* Hero image: in-flow top block on mobile, full background on tablet/desktop */}
      <div className="relative -mb-px h-[55svh] w-full shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:z-0 sm:mb-0 sm:h-full">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 640px)" srcSet={heroDesktopImage} />
          <img
            src={heroMobileImage}
            alt=""
            className="block h-full w-full object-cover object-center md:object-[80%_center]"
            fetchPriority="high"
            decoding="async"
            aria-hidden="true"
          />
        </picture>
        {/* Mobile: fade image bottom smoothly into the black content area */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black via-black/70 to-transparent sm:hidden"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black sm:hidden"
          aria-hidden="true"
        />
      </div>

      {/* Desktop/tablet: even overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-black/50 sm:block"
        aria-hidden="true"
      />

      {/* Content: fills remaining space below image on mobile, centered over image on desktop */}
      <div className="relative z-10 -mt-4 flex flex-1 flex-col justify-start bg-black px-4 pb-8 pt-2 sm:mt-0 sm:min-h-[100svh] sm:flex-none sm:flex-row sm:items-center sm:justify-center sm:bg-transparent sm:px-6 sm:pb-12 sm:pt-0 lg:px-8 lg:pb-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-4 sm:items-center sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="mb-3 font-extrabold leading-[0.95] tracking-tighter text-paper sm:mb-6">
                  {isRootHome ? (
                    <div className="text-3xl sm:text-6xl lg:text-6xl xl:text-7xl lg:whitespace-nowrap">
                      Premium Laundry &<br />
                      <span className="text-gold">Dry Cleaning Services.</span>
                    </div>
                  ) : (
                    <div className="text-3xl sm:text-6xl lg:text-6xl xl:text-7xl lg:whitespace-nowrap">
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
                className="mx-auto max-w-xl text-xs font-light leading-relaxed text-paper/90 sm:text-lg lg:mx-0"
              >
                {isRootHome
                  ? 'Eco-friendly, professional garment care delivered right to your door. We pick up, clean, and return your clothes pristine within 24 hours.'
                  : cityData?.heroDescription ??
                    `Eco-friendly, professional garment care delivered right to your door in ${resolvedLocationName}. We pick up, clean, and return your clothes pristine within 24 hours.`}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex w-full justify-center lg:justify-end"
            >
              <HeroPromoBooking />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
