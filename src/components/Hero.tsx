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

  const heroTitle = isRootHome
    ? 'The Laundry Man App'
    : `The Laundry Man App in ${resolvedLocationName}`;

  const tagline = isRootHome
    ? 'Eco-dry cleaning and laundry service at your doorstep'
    : `Eco-dry cleaning and laundry service at your doorstep in ${resolvedLocationName}`;

  const mobileTagline = isRootHome
    ? 'Eco laundry & dry cleaning to your door'
    : `Eco laundry & dry cleaning in ${resolvedLocationName}`;

  return (
    <div
      id="hero"
      className="hero-section relative flex flex-col overflow-hidden bg-paper max-sm:h-[100svh] sm:block sm:min-h-[100svh] sm:bg-black"
    >
      {/* Mobile: dominant image band. Desktop: full-bleed background. */}
      <div className="relative w-full min-h-0 flex-1 overflow-hidden bg-paper max-sm:min-h-[50svh] sm:absolute sm:inset-0 sm:z-0 sm:h-full sm:flex-none sm:bg-black">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 640px)" srcSet={heroDesktopImage} />
          <img
            src={heroMobileImage}
            alt=""
            className="block h-full w-full object-cover object-[50%_48%] sm:scale-105 sm:object-[50%_40%]"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            aria-hidden="true"
          />
        </picture>

        {/* Mobile: soft handoff under the overlapping sheet */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper via-paper/50 to-transparent sm:hidden"
          aria-hidden="true"
        />

        {/* Desktop: cinematic scrim */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35" />
        </div>
      </div>

      {/* Mobile: rounded sheet overlapping the image = one composition */}
      <div className="hero-mobile-content relative z-10 -mt-6 flex shrink-0 flex-col rounded-t-[1.75rem] bg-paper px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_-12px_40px_rgba(42,59,76,0.08)] sm:mt-0 sm:min-h-[100svh] sm:flex-row sm:items-center sm:justify-center sm:rounded-none sm:bg-transparent sm:px-6 sm:pb-16 sm:pt-0 sm:shadow-none lg:px-8 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="hero-mobile-stack flex flex-col gap-4 sm:grid sm:grid-cols-1 sm:items-center sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,22.5rem)] lg:gap-14 xl:gap-20">
            <div className="hero-rise shrink-0 max-sm:w-full">
              <div className="flex min-w-0 flex-col items-center gap-3 max-sm:text-center sm:flex-row sm:items-center sm:justify-start sm:gap-4 sm:text-left lg:gap-5">
                <SiteLogo className="hero-mobile-logo size-12 shrink-0 object-contain sm:h-[4.75rem] sm:w-[4.75rem] md:h-[5.5rem] md:w-[5.5rem] lg:h-28 lg:w-28 xl:h-32 xl:w-32" />

                <div className="min-w-0 max-sm:w-full max-sm:text-center sm:text-left">
                  <h1 className="hero-mobile-title text-[1.375rem] font-semibold leading-[1.05] tracking-tight text-slate sm:text-4xl sm:text-paper md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
                    {heroTitle}
                  </h1>
                  <p className="hero-mobile-tagline mt-1 text-[0.8125rem] font-normal leading-snug text-ink/75 max-sm:mx-auto max-sm:max-w-sm sm:mt-3 sm:max-w-xl sm:text-lg sm:font-medium sm:leading-snug sm:text-gold md:text-xl lg:text-2xl">
                    <span className="sm:hidden">{mobileTagline}</span>
                    <span className="hidden sm:inline">{tagline}</span>
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
