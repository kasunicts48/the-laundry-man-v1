import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import HeroPromoBooking from './HeroPromoBooking';
import SiteLogo from './SiteLogo';
import { DEFAULT_LOCATION_NAME } from '../data/locations';
import type { CityData } from '../data/cities';
import { removeLcpHeroShell } from '../utils/lcpHeroShell';
import heroMobileImage from '../assets/images/sm-hero-section-image2.webp';
import heroDesktopImage from '../assets/images/hero-section-image.webp';

interface HeroProps {
  locationName: string;
  cityData?: CityData;
}

export default function Hero({ locationName, cityData }: HeroProps) {
  const isRootHome = Boolean(useMatch({ path: '/', end: true }));
  const resolvedLocationName =
    locationName?.trim() || cityData?.name || DEFAULT_LOCATION_NAME;

  useEffect(() => {
    removeLcpHeroShell();
  }, []);

  return (
    <div
      id="hero"
      className="hero-section relative flex flex-col overflow-hidden bg-paper max-sm:h-[100svh] sm:min-h-[100svh] sm:bg-black sm:block"
    >
      {/* Image keeps ~half the short phone viewport so 376×667 matches taller phones */}
      <div className="relative w-full min-h-0 flex-1 overflow-hidden bg-paper max-sm:min-h-[48svh] sm:absolute sm:inset-0 sm:z-0 sm:flex-none sm:bg-black sm:h-full">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 640px)" srcSet={heroDesktopImage} />
          <img
            src={heroMobileImage}
            alt=""
            className="block h-full w-full object-cover object-[50%_52%] sm:object-center"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            aria-hidden="true"
          />
        </picture>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper via-paper/40 to-transparent sm:hidden"
          aria-hidden="true"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-black/50 sm:block"
        aria-hidden="true"
      />

      <div className="hero-mobile-content relative z-10 flex shrink-0 flex-col bg-paper px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:min-h-[100svh] sm:flex-none sm:flex-row sm:items-center sm:justify-center sm:bg-transparent sm:px-6 sm:py-0 sm:pb-12 sm:pt-0 lg:px-8 lg:pb-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col sm:block">
          <div className="hero-mobile-stack flex flex-col gap-3 sm:grid sm:grid-cols-1 sm:items-center sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="shrink-0 max-sm:w-full text-left">
              <div
                className="hero-rise flex items-center gap-2.5 max-sm:min-w-0 sm:grid sm:grid-cols-[auto_1fr] sm:items-start sm:gap-x-4 sm:gap-y-2.5 lg:gap-x-5 lg:gap-y-3"
              >
                <SiteLogo className="hero-mobile-logo size-12 shrink-0 object-contain sm:row-span-2 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20 lg:h-28 lg:w-28 xl:h-[8.5rem] xl:w-[8.5rem]" />
                <div className="flex min-w-0 flex-col justify-center gap-0.5 max-sm:flex-1 sm:contents">
                  <h1 className="hero-mobile-title whitespace-nowrap text-[1.375rem] font-semibold leading-none tracking-tight text-gold max-sm:min-w-0 max-sm:whitespace-normal sm:col-start-2 sm:text-4xl sm:text-paper lg:text-5xl xl:text-[3.25rem]">
                    The Laundry Man App
                  </h1>
                  <p className="hero-mobile-tagline max-w-full text-[0.8125rem] font-normal leading-snug text-slate sm:col-start-2 sm:max-w-xl sm:text-xl sm:font-medium sm:text-gold sm:leading-snug lg:text-2xl">
                    {isRootHome
                      ? 'Eco-dry cleaning and laundry service at your doorstep'
                      : `Eco-dry cleaning and laundry service at your doorstep in ${resolvedLocationName}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-rise-delayed flex w-full shrink-0 justify-center lg:justify-end">
              <HeroPromoBooking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
