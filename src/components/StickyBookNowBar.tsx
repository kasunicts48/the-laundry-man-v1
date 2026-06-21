import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface StickyBookNowBarProps {
  onBookNow: () => void;
}

export default function StickyBookNowBar({ onBookNow }: StickyBookNowBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isBookPage = location.pathname === '/book';

  useEffect(() => {
    if (isBookPage) {
      setIsVisible(false);
      return;
    }

    const hero = document.getElementById('hero');

    if (!hero) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [location.pathname, isBookPage]);

  if (isBookPage) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 block p-0 bg-transparent shadow-none md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      aria-label="Quick booking"
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        onClick={onBookNow}
        className="w-full bg-gold text-navy font-bold py-3.5 px-6 pb-[max(0.875rem,env(safe-area-inset-bottom))] rounded-none active:scale-[0.98] transition-all duration-200 cursor-pointer uppercase tracking-wider text-sm shadow-sm md:rounded-full"
      >
        Book Now
      </button>
    </div>
  );
}
