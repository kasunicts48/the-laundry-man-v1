import React from 'react';
import { useMatch } from 'react-router-dom';
import { motion } from 'motion/react';
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
      className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden bg-black sm:block"
    >
      {/* Video: in-flow top block on mobile, full background on tablet/desktop */}
      <div className="relative -mb-px h-[55svh] w-full shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:z-0 sm:mb-0 sm:h-full">
        <video
          className="block h-full w-full object-cover object-center md:object-[80%_center]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/laundry-man-video.webm" type="video/webm" />
        </video>
        {/* Mobile: fade video bottom smoothly into the black content area */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_top,#000_0%,#000_7%,transparent_42%)] sm:hidden"
          aria-hidden="true"
        />
      </div>

      {/* Desktop/tablet: even overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-black/50 sm:block"
        aria-hidden="true"
      />

      {/* Content: fills remaining space below video on mobile, centered over video on desktop */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-8 pt-4 sm:min-h-[100svh] sm:flex-none sm:flex-row sm:items-center sm:px-6 sm:pb-12 sm:pt-0 lg:px-8 lg:pb-14">
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
                    <div className="text-3xl sm:text-6xl lg:text-6xl xl:text-7xl">
                      Premium Laundry &<br />
                      <span className="text-gold">Dry Cleaning Services.</span>
                    </div>
                  ) : (
                    <div className="text-3xl sm:text-6xl lg:text-6xl xl:text-7xl">
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
