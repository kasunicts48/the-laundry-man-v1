import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Copy } from 'lucide-react';
import { useHasPlacedOrder } from '../hooks/useHasPlacedOrder';
import {
  BOOKING_PAGE_URL,
  FIRST_ORDER_DISCOUNT_PERCENT,
  FIRST_ORDER_PROMO_CODE,
} from '../data/firstOrderPromo';

const actionButtonBase =
  'px-5 py-3 font-bold text-xs pill transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-center tracking-wide uppercase sm:px-6';

function PromoPlaceholder() {
  return (
    <div className="w-full min-h-[10rem] sm:max-w-[20rem] sm:min-h-[12rem]" aria-hidden="true" />
  );
}

function ReturningActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="flex w-full flex-col gap-3 sm:max-w-sm sm:flex-row sm:gap-4 sm:w-fit"
    >
      <a
        href={BOOKING_PAGE_URL}
        className={`${actionButtonBase} bg-gold text-[#1B3516] shadow-accent cursor-pointer`}
      >
        Book a Collection
      </a>
      <a
        href="#services"
        className={`${actionButtonBase} border border-paper/25 bg-paper/10 text-paper hover:bg-paper/20`}
      >
        View Services
      </a>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full sm:max-w-[20rem]"
    >
      <div className="overflow-hidden rounded-xl border border-white/60 bg-white/55 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-2xl sm:border-white/15 sm:bg-paper/97 sm:shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:backdrop-blur-md">
        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent sm:via-gold sm:h-1"
          aria-hidden="true"
        />

        <div className="p-3.5 sm:p-5">
          <div className="flex items-start justify-between gap-3 sm:block">
            <span className="inline-flex shrink-0 items-center rounded-full border border-white/60 bg-white/50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-gold backdrop-blur-sm sm:border-[rgba(76,175,80,0.3)] sm:bg-[rgba(76,175,80,0.1)] sm:text-[rgb(76,175,80)] sm:text-[9px] sm:tracking-[0.18em]">
              First order offer
            </span>

            <div className="flex items-baseline gap-1 sm:mt-2.5 sm:gap-1.5">
              <span className="text-3xl font-extrabold leading-none tracking-tight text-gold tabular-nums sm:text-5xl">
                {FIRST_ORDER_DISCOUNT_PERCENT}%
              </span>
              <span className="text-base font-bold uppercase tracking-wide text-paper sm:text-[#1B3516] sm:text-xl">
                off
              </span>
            </div>
          </div>

          <p className="mt-2 text-[11px] font-medium leading-snug text-paper/85 sm:mt-1 sm:text-sm sm:text-slate/75">
            Your first laundry or dry cleaning order
          </p>

          <div className="mt-3 sm:mt-3.5">
            <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-paper/60 sm:mb-1.5 sm:text-[9px] sm:text-slate/45 sm:tracking-[0.18em]">
              Promo code
            </p>
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-dashed border-white/60 bg-white/45 px-3 py-2 text-left backdrop-blur-md transition-all hover:border-gold/50 hover:bg-white/55 active:bg-white/60 sm:min-h-0 sm:gap-3 sm:border-[rgba(76,175,80,0.35)] sm:bg-[rgba(76,175,80,0.06)] sm:py-2.5 sm:backdrop-blur-none sm:hover:border-gold/50 sm:hover:bg-[#f5f8f5] sm:active:bg-[#f5f8f5]"
              aria-label={`Copy promo code ${FIRST_ORDER_PROMO_CODE}`}
            >
              <span className="font-mono text-xs font-bold tracking-[0.16em] text-paper sm:text-base sm:text-[#1B3516] sm:tracking-[0.2em]">
                {FIRST_ORDER_PROMO_CODE}
              </span>
              <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-gold sm:gap-1.5 sm:text-[11px]">
                {copied ? (
                  'Copied!'
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 sm:h-3.5" strokeWidth={2} aria-hidden="true" />
                    Copy
                  </>
                )}
              </span>
            </button>
          </div>

          <a
            href={BOOKING_PAGE_URL}
            className="group mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wide text-[#1B3516] shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.98] sm:mt-3.5 sm:min-h-0 sm:py-3 sm:text-sm sm:tracking-wider"
          >
            <span className="sm:hidden">Book Pickup</span>
            <span className="hidden sm:inline">Schedule Your Pickup</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </a>

          <p className="mt-2 hidden text-center text-[10px] font-light leading-relaxed text-slate/50 sm:mt-2.5 sm:block">
            Free collection &amp; delivery · Applied at checkout
          </p>
        </div>
      </div>
    </motion.div>
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
