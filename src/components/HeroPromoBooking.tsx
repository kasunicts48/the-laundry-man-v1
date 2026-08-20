import React, { useState } from 'react';
import { ArrowRight, Copy } from 'lucide-react';
import { useHasPlacedOrder } from '../hooks/useHasPlacedOrder';
import {
  BOOKING_PAGE_URL,
  FIRST_ORDER_DISCOUNT_PERCENT,
  FIRST_ORDER_PROMO_CODE,
} from '../data/firstOrderPromo';

const actionButtonBase =
  'px-5 py-3 text-xs font-semibold pill transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-center tracking-wide sm:px-6 sm:py-3.5 sm:text-sm';

function PromoPlaceholder() {
  return (
    <div
      className="hero-promo-placeholder w-full min-h-[8rem] rounded-2xl bg-sale/5 sm:max-w-[22rem] sm:min-h-[13rem]"
      aria-hidden="true"
    />
  );
}

function ReturningActions() {
  return (
    <div className="flex w-full flex-col gap-2.5 sm:max-w-md sm:w-fit sm:flex-row sm:gap-4">
      <a
        href={BOOKING_PAGE_URL}
        className={`${actionButtonBase} cursor-pointer bg-gold text-paper shadow-accent max-sm:w-full max-sm:py-3.5 max-sm:text-sm`}
      >
        Schedule your collection
      </a>
      <a
        href="#services"
        className={`${actionButtonBase} border border-paper/35 bg-paper/10 text-paper backdrop-blur-sm hover:bg-paper/20 max-sm:w-full max-sm:border-black/10 max-sm:bg-transparent max-sm:text-slate max-sm:hover:border-gold/40 max-sm:hover:text-gold`}
      >
        View Services
      </a>
    </div>
  );
}

function FirstOrderPromo() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(FIRST_ORDER_PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="hero-promo w-full sm:max-w-[22rem]">
      <div className="hero-promo-card overflow-hidden rounded-2xl border border-sale/35 bg-paper shadow-[0_10px_28px_rgba(91,155,213,0.14)] sm:rounded-[1.5rem] sm:border-sale/25 sm:bg-paper/95 sm:shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:backdrop-blur-md">
        <div className="hero-promo-header bg-sale px-4 py-3 text-center text-paper sm:px-6 sm:py-5">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-paper/85 sm:text-[0.6875rem]">
            First order offer
          </p>
          <p className="hero-promo-percent mt-1 text-[1.75rem] font-semibold leading-none tracking-tight sm:mt-1.5 sm:text-[2.75rem]">
            {FIRST_ORDER_DISCOUNT_PERCENT}% off
          </p>
          <p className="hero-promo-sub mt-1.5 text-xs font-medium leading-snug text-paper/95 sm:mt-2 sm:text-sm">
            Your first laundry or dry cleaning order
          </p>
        </div>

        <div className="hero-promo-body space-y-2.5 px-3.5 py-3 sm:space-y-3.5 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={handleCopyCode}
            className="hero-promo-code flex w-full cursor-pointer items-center gap-3 rounded-xl bg-sale/10 px-3 py-2.5 text-left ring-1 ring-sale/25 transition-colors hover:bg-sale/15 active:bg-sale/20 sm:rounded-2xl sm:px-4 sm:py-3"
            aria-label={`Copy promo code ${FIRST_ORDER_PROMO_CODE}`}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[0.625rem] font-semibold uppercase tracking-wide text-sale">
                Use code
              </span>
              <span className="mt-0.5 block font-mono text-base font-semibold tracking-wide text-slate sm:text-lg">
                {FIRST_ORDER_PROMO_CODE}
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sale px-3.5 py-2 text-xs font-semibold text-paper">
              {copied ? (
                'Copied'
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  Copy
                </>
              )}
            </span>
          </button>

          <a
            href={BOOKING_PAGE_URL}
            className="hero-promo-cta group flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold tracking-wide text-paper shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.98] sm:py-3.5"
          >
            Schedule your collection
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </a>

          <p className="hero-promo-note text-center text-[10px] font-light leading-relaxed text-ink/55 sm:text-[11px]">
            Free collection &amp; delivery · Applied at checkout
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HeroPromoBooking() {
  const { isReady, showPromo } = useHasPlacedOrder();

  if (!isReady) return <PromoPlaceholder />;

  if (showPromo) {
    return <FirstOrderPromo />;
  }

  return <ReturningActions />;
}

/** Re-export for booking integrations (CleanCloud embed, etc.) */
export { handleOrderSuccess } from '../utils/orderPlaced';
