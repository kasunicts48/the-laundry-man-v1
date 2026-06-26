import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, X } from 'lucide-react';
import {
  BOOKING_PAGE_URL,
  FIRST_ORDER_DISCOUNT_PERCENT,
  FIRST_ORDER_PROMO_CODE,
} from '../data/firstOrderPromo';
import { useHasPlacedOrder } from '../hooks/useHasPlacedOrder';
import { ORDER_PLACED_EVENT } from '../utils/orderPlaced';

const POPUP_DELAY_MS = 2500;

export default function FirstTimeDiscountPopup() {
  const { isReady, showPromo } = useHasPlacedOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [dismissedThisVisit, setDismissedThisVisit] = useState(false);
  const [copied, setCopied] = useState(false);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setDismissedThisVisit(true);
  }, []);

  useEffect(() => {
    if (!isReady || !showPromo || dismissedThisVisit) return;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY_MS);

    const onOrderPlaced = () => closePopup();

    window.addEventListener(ORDER_PLACED_EVENT, onOrderPlaced);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(ORDER_PLACED_EVENT, onOrderPlaced);
    };
  }, [closePopup, dismissedThisVisit, isReady, showPromo]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(FIRST_ORDER_PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-navy/80 backdrop-blur-sm"
          onClick={closePopup}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl border border-white/10 bg-navy-alt shadow-2xl sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="first-time-discount-title"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1B3516] via-[#152d12] to-[#0f2310] px-6 pb-6 pt-8 text-paper sm:px-8 sm:pb-8 sm:pt-10">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-transparent to-white/5"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={closePopup}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/25 p-2 text-paper/80 transition-colors hover:bg-black/40 hover:text-paper"
                aria-label="Close discount popup"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10 text-center">
                <span className="mb-3 inline-block rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                  Welcome Offer
                </span>

                <h2
                  id="first-time-discount-title"
                  className="text-2xl font-extrabold leading-tight sm:text-3xl"
                >
                  Get {FIRST_ORDER_DISCOUNT_PERCENT}% OFF
                  <span className="mt-1 block text-lg font-bold text-lime-300 sm:text-xl">
                    Your First Order
                  </span>
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-paper/80 sm:text-base">
                  Free collection and delivery across our service areas. Book online and save on
                  your first laundry or dry cleaning order.
                </p>

                <div className="mt-5 flex flex-col items-center gap-2 sm:mt-6">
                  <span className="text-xs font-light uppercase tracking-[0.18em] text-paper/70">
                    Use code at checkout
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-black/35 px-4 py-2.5 text-sm font-bold tracking-[0.16em] text-paper shadow-[0_0_16px_rgba(52,211,153,0.2)] transition-colors hover:border-emerald-300/70"
                    aria-label={`Copy promo code ${FIRST_ORDER_PROMO_CODE}`}
                  >
                    {FIRST_ORDER_PROMO_CODE}
                    <Copy className="h-4 w-4 opacity-80" />
                  </button>
                  {copied && (
                    <span className="text-xs font-medium text-emerald-300">Code copied!</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-6 py-5 sm:px-8 sm:py-6">
              <a
                href={BOOKING_PAGE_URL}
                className="flex w-full items-center justify-center rounded-2xl bg-gold px-5 py-3.5 text-sm font-extrabold uppercase tracking-[0.12em] text-navy shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-accent-lg"
              >
                Book Your Collection
              </a>
              <button
                type="button"
                onClick={closePopup}
                className="text-sm font-light text-ink/70 transition-colors hover:text-ink"
              >
                No thanks, maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
