import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHasPlacedOrder } from '../hooks/useHasPlacedOrder';

const PROMO_CODE = 'LAUNDRY35';

const actionButtonBase =
  'px-6 py-3 font-bold text-xs pill transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-center tracking-wider uppercase';

function PromoPlaceholder() {
  return (
    <div className="w-full max-w-sm min-h-[8.5rem]" aria-hidden="true" />
  );
}

function ReturningActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <Link
        to="/book"
        className={`${actionButtonBase} bg-gold text-navy shadow-accent cursor-pointer`}
      >
        Book a Collection
      </Link>
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
  return (
    <div className="flex w-full max-w-sm flex-col gap-2.5">
      {/* Top box — promo badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="rounded-2xl border border-gold/25 bg-navy-alt px-5 py-4 text-center shadow-accent-sm backdrop-blur-sm"
      >
        <p className="text-sm font-semibold leading-snug text-slate sm:text-base">
          Get <span className="font-extrabold text-gold">35% OFF</span> Your First Order
        </p>
        <p className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-xs font-light text-slate/90 sm:text-sm">
          <span>Use Code</span>
          <span
            className="inline-flex items-center rounded-lg border border-gold/40 bg-gold/10 px-3 py-1 font-bold tracking-[0.15em] text-gold"
            aria-label={`Promo code ${PROMO_CODE}`}
          >
            {PROMO_CODE}
          </span>
        </p>
      </motion.div>

      {/* Bottom box — primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <Link
          to="/book"
          className="group flex w-full flex-col items-center justify-center rounded-2xl bg-gold px-6 py-4 text-navy shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-accent-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
        >
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] sm:text-sm">
            Schedule Your Pickup
          </span>
          <span className="mt-1 text-[10px] font-light uppercase tracking-[0.25em] text-navy/70 sm:text-xs">
            In Next 60 Minutes
          </span>
        </Link>
      </motion.div>
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
