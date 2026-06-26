import React, { useEffect, useState } from 'react';

export default function StickyBookNowBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 block p-0 bg-transparent shadow-none md:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      aria-label="Quick booking"
      aria-hidden={!isVisible}
    >
      <a
        href="/booking.html"
        className="block w-full bg-gold text-navy font-bold py-3.5 px-6 pb-[max(0.875rem,env(safe-area-inset-bottom))] rounded-none active:scale-[0.98] transition-all duration-200 uppercase tracking-wider text-sm shadow-sm text-center"
      >
        Book Now
      </a>
    </div>
  );
}
