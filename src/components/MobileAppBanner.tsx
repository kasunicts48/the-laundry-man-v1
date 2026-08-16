import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, X } from 'lucide-react';

import { isLocationHomePath } from '../data/locations';
import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../data/siteBrand';

const APP_SECTION_ID = 'the-app';

interface MobileAppBannerProps {
  onClose: () => void;
}

function scrollToAppSection(): boolean {
  const section = document.getElementById(APP_SECTION_ID);
  if (!section) return false;
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

function waitAndScrollToAppSection(maxAttempts = 40) {
  let attempts = 0;

  const tick = () => {
    if (scrollToAppSection()) return;
    attempts += 1;
    if (attempts < maxAttempts) {
      window.setTimeout(tick, 100);
    }
  };

  tick();
}

export default function MobileAppBanner({ onClose }: MobileAppBannerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!isLocationHomePath(location.pathname)) {
      navigate(`/#${APP_SECTION_ID}`);
    } else {
      const nextUrl = `${location.pathname}#${APP_SECTION_ID}`;
      if (`${location.pathname}${location.hash}` !== nextUrl) {
        navigate(nextUrl, { replace: true });
      }
    }

    waitAndScrollToAppSection();
  };

  return (
    <div
      className="border-b border-black/5 bg-paper md:hidden"
      role="region"
      aria-label="Download The Laundry Man app"
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/45 transition-colors hover:bg-black/5 hover:text-ink"
          aria-label="Close app banner"
        >
          <X size={16} strokeWidth={2} aria-hidden="true" />
        </button>

        <img
          src={SITE_LOGO_SRC}
          alt={SITE_LOGO_ALT}
          className="h-11 w-11 shrink-0 rounded-xl object-cover"
          width={44}
          height={44}
          decoding="async"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-slate">The Laundry Man</p>
          <p className="mt-0.5 truncate text-[0.6875rem] font-light leading-tight text-ink">
            Eco laundry &amp; dry cleaning
          </p>
          <div className="mt-1 flex items-center gap-1">
            <div className="flex items-center gap-px" aria-hidden="true">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={11}
                  className="fill-gold text-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <a
              href="https://www.trustpilot.com/review/www.thelaundryman.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-[0.625rem] font-medium text-ink/70 underline-offset-2 hover:text-gold hover:underline"
            >
              Trustpilot
            </a>
          </div>
        </div>

        <a
          href={`/#${APP_SECTION_ID}`}
          onClick={handleGetClick}
          className="shrink-0 rounded-md border border-gold px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold transition-colors hover:bg-gold hover:text-paper"
        >
          GET
        </a>
      </div>
    </div>
  );
}
