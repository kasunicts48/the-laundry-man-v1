import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
    <div className="w-full max-w-sm min-h-[11rem] sm:w-fit sm:max-w-full" aria-hidden="true" />
  );
}

function ReturningActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:w-fit sm:max-w-full"
    >
      <a
        href={BOOKING_PAGE_URL}
        className={`${actionButtonBase} bg-gold text-navy shadow-accent cursor-pointer`}
      >
        Book a Collection
      </a>
      <a
        href="#services"
        className={`${actionButtonBase} border border-slate/20 bg-glass text-slate hover:bg-glass/80`}
      >
        View Services
      </a>
    </motion.div>
  );
}

function FirstOrderPromo() {
  const prefersReducedMotion = useReducedMotion();
  const glowTransition = prefersReducedMotion
    ? undefined
    : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const };
  const shimmerTransition = prefersReducedMotion
    ? undefined
    : {
        duration: 2.8,
        repeat: Infinity,
        repeatDelay: 3.5,
        ease: 'easeInOut' as const,
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-sm flex-col gap-2.5 sm:w-fit sm:max-w-full"
    >
      {/* Top box — promo badge */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B3516] via-[#152d12] to-[#0f2310] px-5 py-3.5 text-center text-paper shadow-lg sm:px-6 sm:py-4">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-emerald-400/8 via-transparent to-white/5"
          aria-hidden="true"
        />

        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 z-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            aria-hidden="true"
            initial={{ x: '-120%' }}
            animate={{ x: '280%' }}
            transition={shimmerTransition}
          />
        )}

        <div className="relative z-10">
          <motion.span
            className="mb-2 inline-block rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.15)] sm:text-[10px]"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 0 10px rgba(52, 211, 153, 0.15)',
                      '0 0 18px rgba(52, 211, 153, 0.35)',
                      '0 0 10px rgba(52, 211, 153, 0.15)',
                    ],
                  }
            }
            transition={glowTransition}
          >
            First Order Offer
          </motion.span>

          <p className="text-base font-bold leading-snug sm:text-base">
            Get{' '}
            <motion.span
              className="inline-block font-extrabold text-lime-300"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.06, 1],
                      filter: [
                        'drop-shadow(0 0 6px rgba(190,242,100,0.2))',
                        'drop-shadow(0 0 14px rgba(190,242,100,0.5))',
                        'drop-shadow(0 0 6px rgba(190,242,100,0.2))',
                      ],
                    }
              }
              transition={glowTransition}
            >
              {FIRST_ORDER_DISCOUNT_PERCENT}% OFF
            </motion.span>{' '}
            Your First Order
          </p>

          <div className="mt-3 flex flex-row flex-wrap items-center justify-center gap-2 sm:mt-4 sm:gap-2.5">
            <span className="text-xs font-light uppercase tracking-[0.18em] text-paper/75 sm:text-[10px]">
              Use Code
            </span>
            <span
              className="inline-flex items-center justify-center rounded-lg border border-emerald-400/50 bg-black/40 px-2.5 py-1 text-sm font-bold tracking-[0.16em] text-paper shadow-[0_0_16px_rgba(52,211,153,0.2)] ring-1 ring-emerald-400/20 sm:px-3 sm:py-1.5 sm:text-sm"
              aria-label={`Promo code ${FIRST_ORDER_PROMO_CODE}`}
            >
              {FIRST_ORDER_PROMO_CODE}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom box — primary CTA */}
      <a
        href={BOOKING_PAGE_URL}
        className="group flex w-full items-center justify-center rounded-2xl bg-gold px-5 py-3 text-navy shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-accent-lg active:translate-y-0 active:scale-[0.98] cursor-pointer sm:px-6 sm:py-3.5"
      >
        <span className="text-xs font-extrabold uppercase tracking-[0.12em] sm:text-sm sm:tracking-[0.14em]">
          Schedule Your Pickup
        </span>
      </a>
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
