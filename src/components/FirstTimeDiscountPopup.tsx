import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Copy, X } from 'lucide-react';
import {
  BOOKING_PAGE_URL,
  FIRST_ORDER_DISCOUNT_PERCENT,
  FIRST_ORDER_PROMO_CODE,
} from '../data/firstOrderPromo';
import promoPopupImage from '../assets/images/vitaly-gariev-bcvlVB6_mxk-unsplash.jpg';
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
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closePopup}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-t-3xl border border-black/8 bg-paper shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:max-w-[26rem] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="first-time-discount-title"
          >
            <div className="relative h-52 overflow-hidden sm:h-56">
              <img
                src={promoPopupImage}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-paper" />
              <button
                type="button"
                onClick={closePopup}
                className="absolute right-3 top-3 rounded-full bg-paper/90 p-2 text-slate shadow-sm transition-colors hover:bg-paper"
                aria-label="Close discount popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 pb-6 pt-5 text-center sm:px-7 sm:pb-7">
              <span className="inline-block rounded-full border border-[rgb(76,175,80)]/25 bg-[rgb(76,175,80)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[rgb(76,175,80)]">
                Welcome Offer
              </span>

              <h2
                id="first-time-discount-title"
                className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-slate sm:text-[1.75rem]"
              >
                Get {FIRST_ORDER_DISCOUNT_PERCENT}% OFF
              </h2>
              <p className="mt-1 text-lg font-bold text-gold sm:text-xl">Your First Order</p>

              <p className="mx-auto mt-3 max-w-xs text-sm font-light leading-relaxed text-slate/75">
                Free collection and delivery. Book online and save on your first laundry or dry
                cleaning order.
              </p>

              <div className="mt-5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate/50">
                  Use code at checkout
                </p>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex w-full max-w-[14rem] items-center justify-center gap-2 rounded-xl border border-[rgb(76,175,80)]/30 bg-[rgb(76,175,80)]/8 px-4 py-3 text-sm font-bold tracking-[0.14em] text-slate transition-colors hover:border-[rgb(76,175,80)]/50 hover:bg-[rgb(76,175,80)]/12"
                  aria-label={`Copy promo code ${FIRST_ORDER_PROMO_CODE}`}
                >
                  {FIRST_ORDER_PROMO_CODE}
                  <Copy className="h-4 w-4 text-[rgb(76,175,80)]" />
                </button>
                {copied && (
                  <p className="mt-2 text-xs font-medium text-[rgb(76,175,80)]">Code copied!</p>
                )}
              </div>

              <a
                href={BOOKING_PAGE_URL}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-gold px-5 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#1B3516] shadow-accent transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Book Your Collection
              </a>

              <button
                type="button"
                onClick={closePopup}
                className="mt-4 text-sm font-light text-slate/55 transition-colors hover:text-slate"
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
