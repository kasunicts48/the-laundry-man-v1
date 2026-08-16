import React from 'react';

import bookingIcon from '../assets/icons/booking.webp';
import clothingIcon from '../assets/icons/clothing.webp';
import fastDeliveryIcon from '../assets/icons/fast-delivery.webp';

const steps = [
  {
    image: bookingIcon,
    title: '1. Book Your Slot',
    description: 'Pick a time that suits you online or in our app.',
  },
  {
    image: clothingIcon,
    title: '2. We Collect & Clean',
    description: 'Our drivers collect, then we clean to the highest standard on-site.',
  },
  {
    image: fastDeliveryIcon,
    title: '3. Delivered Fresh',
    description: 'Crisp, folded or ironed, ready to wear — back at your door.',
  },
];

const iconFilter =
  'invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)';

function StepIcon({ image, title }: { image: string; title: string }) {
  return (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-contain opacity-90"
      style={{ filter: iconFilter }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-28 overflow-hidden bg-navy py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:max-w-none">
          <h2 className="section-eyebrow">How It Works</h2>
          <h3 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-4xl xl:text-5xl">
            Simple, stress-free service in three easy steps
          </h3>
        </div>

        <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          <div
            className="pointer-events-none absolute top-8 left-[17%] right-[17%] z-0 hidden h-px bg-slate/15 md:block lg:top-9"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
              <div className="relative z-10 mb-1 flex h-24 w-24 items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none backdrop-blur-none md:mb-2 md:h-14 md:w-14 md:rounded-2xl md:border md:border-gold/20 md:bg-glass/90 md:p-2.5 md:shadow-sm md:backdrop-blur-md lg:h-16 lg:w-16 lg:p-3">
                <StepIcon image={step.image} title={step.title} />
              </div>

              <h4 className="mb-1.5 text-xl font-semibold leading-snug text-slate md:mb-2 md:text-lg lg:text-xl">
                {step.title}
              </h4>
              <p className="mx-auto max-w-xs px-2 text-sm leading-relaxed text-ink sm:px-4 md:mx-0 md:max-w-none">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
