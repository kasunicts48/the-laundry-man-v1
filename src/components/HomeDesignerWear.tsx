import React from 'react';

import designerWearImage from '../assets/images/we-specialise-in-designer-wear.webp';

const careNotes = ['Delicate fabrics', 'Luxury labels', 'Hand-finished care'];

export default function HomeDesignerWear() {
  return (
    <section
      id="designerwear"
      className="relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy py-14 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center text-center lg:mx-0 lg:items-start lg:text-left">
            <p className="section-eyebrow">Designer wear</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Expert Care for Designer Wear
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
              Your premium garments deserve special attention. We handle delicate fabrics, luxury
              labels and fine finishes with expert care — all cleaned at our own premises, returned
              fresh and ready to wear.
            </p>

            <p className="mt-6 max-w-md text-sm font-medium leading-relaxed tracking-wide text-slate/90 lg:max-w-none">
              {careNotes.map((note, index) => (
                <React.Fragment key={note}>
                  {index > 0 && (
                    <span className="mx-2.5 inline-block text-gold/60" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{note}</span>
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:mx-0 lg:h-full lg:min-h-[26rem] lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-black/8 bg-paper shadow-accent-sm sm:rounded-3xl lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <img
                src={designerWearImage}
                alt="Designer garments hanging ready after specialist cleaning and care"
                className="absolute inset-0 h-full w-full object-cover object-[50%_22%] sm:object-[50%_26%] lg:object-[50%_30%]"
                loading="lazy"
                decoding="async"
                width={896}
                height={1200}
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-slate/20 to-transparent lg:h-1/4"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
