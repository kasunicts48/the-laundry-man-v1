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
