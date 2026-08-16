import React from 'react';
import { Link } from 'react-router-dom';
import BookNowButton from '../components/BookNowButton';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';
import { priceListSections } from '../data/priceList';

export default function Pricing() {
  return (
    <>
      <InnerPageHeader
        eyebrow="Pricing"
        title={
          <>
            Clear prices for every <InnerPageTitleHighlight>garment</InnerPageTitleHighlight>.
          </>
        }
        description="Transparent pricing for laundry, dry cleaning, ironing and more. Book a collection when you are ready — free collection and delivery."
      />

      <div className="min-h-[70vh] bg-navy px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12 sm:space-y-14">
            {priceListSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <div className="mb-5 flex flex-wrap items-center gap-3 border-b border-black/5 pb-3">
                  <h2
                    className={`text-xl font-semibold tracking-tight sm:text-2xl ${
                      section.featured ? 'text-sale' : 'text-gold'
                    }`}
                  >
                    {section.title}
                  </h2>
                  {section.featured && (
                    <span className="rounded-full bg-sale px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide text-paper">
                      Offer
                    </span>
                  )}
                </div>

                <ul className="space-y-0">
                  {section.items.map((item) => (
                    <li
                      key={`${section.id}-${item.name}`}
                      className="flex items-baseline justify-between gap-4 border-b border-black/[0.04] py-3.5 last:border-b-0"
                    >
                      <span className="min-w-0 text-sm font-light leading-snug text-ink sm:text-base">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-sm font-medium tabular-nums text-slate sm:text-base">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-black/5 pt-10 text-center">
            <p className="max-w-md text-sm font-light leading-relaxed text-ink sm:text-base">
              Ready to book? Schedule a free collection and we will take care of the rest.
            </p>
            <BookNowButton label="Schedule your collection" />
            <Link
              to="/services"
              className="text-sm font-medium text-gold transition-colors hover:text-gold-hover hover:underline"
            >
              View our services
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
