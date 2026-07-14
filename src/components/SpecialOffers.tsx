import React, { useLayoutEffect, useRef } from 'react';

import BookNowButton from './BookNowButton';
import { specialOffers, type SpecialOfferCard } from '../data/specialOffers';

const INITIAL_CENTER_INDEX = Math.floor(specialOffers.length / 2);
const MOBILE_CAROUSEL_END_SPACER =
  'w-[max(1rem,calc(50%-min(42.5vw,8.75rem)))] shrink-0 snap-none sm:hidden';

function OfferPriceList({ lines }: { lines: SpecialOfferCard['priceLines'] }) {
  return (
    <ul className="flex flex-col gap-2">
      {lines.map((line) => (
        <li
          key={line.label}
          className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
        >
          <span className="min-w-0 text-[0.8125rem] font-medium leading-snug text-paper">
            {line.label}
          </span>
          <span className="shrink-0 text-sm font-extrabold tabular-nums text-gold">{line.price}</span>
        </li>
      ))}
    </ul>
  );
}

const OfferCard: React.FC<{ offer: SpecialOfferCard }> = ({ offer }) => {
  return (
    <article className="flex h-[22rem] w-[min(85vw,17.5rem)] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#134633] shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:h-auto sm:w-auto sm:min-h-[20rem]">
      <div className="flex h-[5.5rem] shrink-0 items-center border-b border-white/10 bg-gradient-to-r from-white/5 via-transparent to-transparent px-4 sm:h-auto sm:min-h-[5.25rem] sm:px-5">
        <div className="flex w-full items-center gap-3">
          <img
            src={offer.icon}
            alt=""
            className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div className="min-w-0">
            {offer.eyebrow ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[rgb(76,175,80)]">
                {offer.eyebrow}
              </p>
            ) : null}
            <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-tight tracking-tight text-paper sm:text-lg">
              {offer.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[#134633] p-4 sm:p-5">
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-hidden">
          <OfferPriceList lines={offer.priceLines} />
        </div>

        <div className="mt-auto shrink-0 pt-4">
          <BookNowButton fullWidth label="Book Now" />
        </div>
      </div>
    </article>
  );
};

export default function SpecialOffers() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = carouselRef.current;
    if (!container || window.matchMedia('(min-width: 640px)').matches) return;

    const centerMiddleCard = () => {
      const card = container.children[INITIAL_CENTER_INDEX + 1] as HTMLElement | undefined;
      if (!card) return;

      container.scrollLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    };

    centerMiddleCard();
    requestAnimationFrame(centerMiddleCard);
  }, []);

  return (
    <section id="special-offers" className="relative scroll-mt-28 overflow-hidden bg-navy py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="section-eyebrow">Our Prices</p>
          <h2 className="text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-5xl">
            Premium service — without the High Street price tag
          </h2>
        </div>

        <div
          ref={carouselRef}
          className="-mx-4 flex max-w-[100vw] items-stretch gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 snap-x snap-mandatory scrollbar-hide sm:mx-0 sm:max-w-none sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6"
        >
          <div className={MOBILE_CAROUSEL_END_SPACER} aria-hidden="true" />
          {specialOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
          <div className={MOBILE_CAROUSEL_END_SPACER} aria-hidden="true" />
        </div>

        <p className="mt-3 text-center text-xs font-light text-ink sm:hidden" aria-hidden="true">
          Swipe to see more prices
        </p>

        <div className="mt-6 text-center sm:mt-8">
          <p className="text-sm font-light text-ink sm:text-base">
            To see all prices,{' '}
            <a
              href="#the-app"
              className="font-semibold text-gold transition-colors hover:text-gold-hover hover:underline"
            >
              download our app
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
