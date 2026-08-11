import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import BookNowButton from './BookNowButton';
import { specialOffers, type SpecialOfferCard } from '../data/specialOffers';

const INITIAL_CENTER_INDEX = Math.floor(specialOffers.length / 2);
const MOBILE_CAROUSEL_END_SPACER =
  'w-[max(1rem,calc(50%-min(42.5vw,8.75rem)))] shrink-0 snap-none sm:hidden';

function OfferPriceList({ lines }: { lines: SpecialOfferCard['priceLines'] }) {
  return (
    <ul className="mt-6 flex flex-col">
      {lines.map((line) => (
        <li
          key={line.label}
          className="flex items-baseline justify-between gap-4 border-b border-ink/20 py-3 last:border-b-0"
        >
          <span className="min-w-0 text-sm font-normal leading-snug text-ink">{line.label}</span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-ink">{line.price}</span>
        </li>
      ))}
    </ul>
  );
}

const OfferCard: React.FC<{ offer: SpecialOfferCard }> = ({ offer }) => {
  return (
    <article className="flex h-auto w-[min(85vw,17.5rem)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-ink bg-paper px-5 py-6 sm:w-auto sm:rounded-3xl sm:px-6 sm:py-7">
      <header className="text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink sm:text-[0.9375rem]">
          {offer.title}
        </h3>
        {offer.eyebrow ? (
          <p className="mt-1.5 text-sm font-normal leading-snug text-ink/80">{offer.eyebrow}</p>
        ) : null}
      </header>

      <OfferPriceList lines={offer.priceLines} />
    </article>
  );
};

export default function SpecialOffers() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(INITIAL_CENTER_INDEX);

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

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const updateActiveIndex = () => {
      if (window.matchMedia('(min-width: 640px)').matches) return;

      const cards = Array.from(container.children).slice(1, -1) as HTMLElement[];
      if (!cards.length) return;

      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    updateActiveIndex();
    container.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      container.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.children[index + 1] as HTMLElement | undefined;
    if (!card) return;

    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

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

        <div className="mt-4 flex justify-center gap-2.5 sm:hidden" aria-label="Price cards">
          {specialOffers.map((offer, index) => (
            <button
              key={offer.id}
              type="button"
              onClick={() => scrollToCard(index)}
              className={`h-2.5 w-2.5 rounded-full border-2 transition-colors ${
                activeIndex === index
                  ? 'border-gold bg-gold'
                  : 'border-gold/40 bg-transparent'
              }`}
              aria-label={`Show ${offer.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            />
          ))}
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-md">
          <a
            href="#the-app"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-gold bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-[#1B3516] active:scale-[0.98]"
          >
            View full pricelist
          </a>
          <BookNowButton label="Book Now" fullWidth />
          <p className="pt-1 text-center text-sm font-light text-ink sm:text-base">
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
