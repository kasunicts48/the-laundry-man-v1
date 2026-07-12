import React, { useLayoutEffect, useRef } from 'react';
import { Phone, Sparkles } from 'lucide-react';

import BookNowButton from './BookNowButton';
import { specialOffers, type SpecialOfferCard } from '../data/specialOffers';

const INITIAL_CENTER_INDEX = Math.floor(specialOffers.length / 2);
const MOBILE_CAROUSEL_END_SPACER =
  'w-[max(1rem,calc(50%-min(42.5vw,8.75rem)))] shrink-0 snap-none sm:hidden';

function OfferPriceList({ lines }: { lines: NonNullable<SpecialOfferCard['priceLines']> }) {
  return (
    <ul className="flex flex-col gap-2">
      {lines.map((line) => (
        <li
          key={line.label}
          className="flex items-center justify-between gap-3 rounded-lg border border-slate/10 bg-navy-alt/40 px-3 py-2.5"
        >
          <span className="min-w-0 text-[0.8125rem] font-medium leading-snug text-slate/85">
            {line.label}
          </span>
          <span className="shrink-0 text-sm font-extrabold tabular-nums text-gold">{line.price}</span>
        </li>
      ))}
    </ul>
  );
}

function OfferPromoDetails({ offer }: { offer: SpecialOfferCard }) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {offer.headline ? (
        <p className="line-clamp-3 text-[0.8125rem] font-medium leading-relaxed text-slate/85">
          {offer.headline}
        </p>
      ) : null}

      <div className="mt-auto min-h-[6.75rem] space-y-2 rounded-lg border border-[rgb(76,175,80)]/15 bg-[rgb(76,175,80)]/5 p-3.5 max-sm:flex max-sm:flex-col max-sm:justify-end">
        {offer.validUntil ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
            Valid till {offer.validUntil}
          </p>
        ) : null}
        {offer.businessName ? (
          <p className="text-sm font-semibold leading-snug text-slate">{offer.businessName}</p>
        ) : null}
        {offer.postcode ? (
          <p className="text-xs font-light text-slate/70">{offer.postcode}</p>
        ) : null}
        {offer.phone ? (
          <a
            href={`tel:${offer.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-hover"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {offer.phone}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function SpecialOfferCardItem({ offer }: { offer: SpecialOfferCard }) {
  return (
    <article className="glass-card flex h-[27rem] w-[min(85vw,17.5rem)] shrink-0 snap-center flex-col overflow-hidden sm:h-auto sm:w-auto sm:min-h-[24.5rem] lg:min-h-[25.5rem]">
      <div className="flex h-[5.5rem] shrink-0 items-center border-b border-[rgb(76,175,80)]/15 bg-gradient-to-r from-[rgb(76,175,80)]/10 via-transparent to-transparent px-4 sm:h-auto sm:min-h-[5.25rem] sm:px-5">
        <div className="flex w-full items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            {offer.eyebrow ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                {offer.eyebrow}
              </p>
            ) : null}
            <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-tight tracking-tight text-slate sm:text-lg">
              {offer.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-paper p-4 sm:p-5">
        <div className="flex min-h-0 flex-1 flex-col justify-start overflow-hidden sm:min-h-[14rem]">
          {offer.type === 'pricing' && offer.priceLines ? (
            <OfferPriceList lines={offer.priceLines} />
          ) : (
            <OfferPromoDetails offer={offer} />
          )}
        </div>

        <div className="mt-auto shrink-0 pt-4">
          <BookNowButton fullWidth label="Book Now" />
        </div>
      </div>
    </article>
  );
}

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
          <p className="section-eyebrow">Special Offers</p>
          <h2 className="text-3xl font-extrabold tracking-tighter text-slate sm:text-4xl lg:text-5xl">
            Save on laundry &amp; dry cleaning
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-slate/80 sm:text-lg">
            Bundle pricing and exclusive discounts — book online in minutes.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="-mx-4 flex items-stretch gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 snap-x snap-mandatory scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6"
        >
          <div className={MOBILE_CAROUSEL_END_SPACER} aria-hidden="true" />
          {specialOffers.map((offer) => (
            <SpecialOfferCardItem key={offer.id} offer={offer} />
          ))}
          <div className={MOBILE_CAROUSEL_END_SPACER} aria-hidden="true" />
        </div>

        <p className="mt-3 text-center text-xs font-light text-slate/60 sm:hidden" aria-hidden="true">
          Swipe to see more offers
        </p>

        <div className="mt-6 text-center sm:mt-8">
          <p className="text-sm font-light text-slate/75 sm:text-base">
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
