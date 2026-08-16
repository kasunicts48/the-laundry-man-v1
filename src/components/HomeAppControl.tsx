import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

import orderControlImage from '../assets/images/laundry-mobile.webp';

// Defer the QR-code library (~40KB) until this section is near the viewport so it
// stays off the initial critical path and out of the below-the-fold bundle.
const AppDownloadQr = lazy(() => import('./AppDownloadQr'));

function AppPhoneMockup() {
  return (
    <div
      className="pointer-events-none absolute -bottom-24 -right-10 hidden h-96 w-64 origin-bottom-right rotate-12 sm:-right-6 sm:w-72 md:block lg:-right-16 lg:w-80"
      aria-hidden="true"
    >
      <div className="h-full rounded-t-[3rem] border-8 border-phone-border bg-paper shadow-[0_-20px_60px_-15px_rgba(104,168,140,0.14)]">
        <div className="flex h-full flex-col rounded-t-[2.5rem] border border-black/5 bg-navy-alt p-4 pt-10">
          <div className="relative mx-auto mb-8 h-4 w-1/2 rounded-full bg-slate/10 before:absolute before:inset-y-1 before:right-2 before:h-2 before:w-2 before:rounded-full before:bg-slate/20" />
          <div className="space-y-4">
            <div className="h-24 w-full rounded-2xl border border-gold/15 bg-gold/8" />
            <div className="h-24 w-full rounded-2xl border border-gold/15 bg-gold/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeAppControl() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    const el = qrRef.current;
    if (!el || showQr) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowQr(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showQr]);

  return (
    <section id="the-app" className="scroll-mt-28 border-y border-black/5 bg-navy-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-10 lg:gap-x-14">
          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-left lg:text-5xl lg:leading-[1.08]"
            >
              Track &amp; Manage With Our App
            </motion.h2>

            <div className="relative min-h-[16rem] flex-1 sm:min-h-[18rem] lg:min-h-[20rem]">
              <div className="relative h-full min-h-[16rem] shape-blob shape-blob-alt sm:min-h-[18rem] lg:min-h-[20rem]">
                <img
                  src={orderControlImage}
                  alt="Customer with laundry ready for collection and delivery"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card relative flex min-h-[28rem] flex-col justify-center overflow-hidden p-6 sm:min-h-[32rem] sm:p-8 lg:p-10"
          >
            <div
              className="pointer-events-none absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 -translate-x-1/4 translate-y-1/4 rounded-full bg-gold/10 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-md">
              <p className="section-eyebrow mb-2 text-left">The App</p>
              <h3 className="text-2xl font-semibold tracking-tight text-slate sm:text-3xl">
                Track &amp; Manage With Our App
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-ink">
                Book, track your order, see our driver’s location, and pay securely — all from your
                phone.
              </p>
              <div ref={qrRef} className="mt-6 min-h-[15rem] lg:mt-8">
                {showQr ? (
                  <Suspense fallback={<div className="min-h-[15rem]" aria-hidden="true" />}>
                    <AppDownloadQr />
                  </Suspense>
                ) : (
                  <div className="min-h-[15rem]" aria-hidden="true" />
                )}
              </div>
            </div>

            <AppPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
