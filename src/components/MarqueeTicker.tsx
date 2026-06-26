import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MARQUEE_TICKER_MESSAGES } from '../data/marqueeTicker';

export default function MarqueeTicker() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const tickerItems = [...MARQUEE_TICKER_MESSAGES, ...MARQUEE_TICKER_MESSAGES];

  return (
    <div
      className="marquee-ticker relative z-[60] flex items-center border-b border-emerald-500/25 bg-[#1B3516] text-paper"
      role="region"
      aria-label="Site announcements"
    >
      <div className="marquee-ticker__viewport flex-1 overflow-hidden py-2.5 pr-2">
        <div className="marquee-ticker__track flex w-max items-center gap-10">
          {tickerItems.map((message, index) => (
            <span
              key={`${message}-${index}`}
              className="inline-flex shrink-0 items-center gap-10 text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm sm:tracking-[0.16em]"
            >
              <span className="whitespace-nowrap">{message}</span>
              <span className="text-emerald-300" aria-hidden="true">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center border-l border-white/10 py-2 pl-2 pr-3 sm:pr-4">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="rounded-full p-1.5 text-paper/70 transition-colors hover:bg-white/10 hover:text-paper"
          aria-label="Close announcement bar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
