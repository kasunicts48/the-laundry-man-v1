import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isLocationHomePath } from '../data/locations';

export default function StickyBookNowBar() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide immediately on route change; re-evaluate against the current hero.
    setIsVisible(false);

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let retryId = 0;

    const disconnect = () => {
      observer?.disconnect();
      observer = null;
    };

    const attachToHero = () => {
      if (cancelled) return;

      const hero = document.getElementById('hero');

      // Inner pages without a hero: keep the sticky CTA available.
      if (!hero) {
        if (!isLocationHomePath(pathname)) {
          setIsVisible(true);
        }
        return false;
      }

      const rect = hero.getBoundingClientRect();
      const heroInView = rect.bottom > 0 && rect.top < window.innerHeight;
      setIsVisible(!heroInView);

      disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!cancelled) {
            setIsVisible(!entry.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      observer.observe(hero);
      return true;
    };

    // Hero can mount a tick after the route update (city pages).
    if (!attachToHero()) {
      retryId = window.setTimeout(() => {
        attachToHero();
      }, 50);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(retryId);
      disconnect();
    };
  }, [pathname]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 block bg-transparent p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-none md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-label="Quick booking"
      aria-hidden={!isVisible}
    >
      <a
        href="/booking.html"
        className="block w-full rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-paper shadow-accent transition-all duration-200 active:scale-[0.98]"
      >
        Ready to order
      </a>
    </div>
  );
}
