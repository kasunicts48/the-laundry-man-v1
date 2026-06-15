import React from 'react';

interface StickyBookNowBarProps {
  onBookNow: () => void;
}

export default function StickyBookNowBar({ onBookNow }: StickyBookNowBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 block p-0 bg-transparent shadow-none md:hidden md:bg-white md:p-4"
      aria-label="Quick booking"
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
