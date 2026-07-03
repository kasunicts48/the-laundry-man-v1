import React from 'react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
import bookingIcon from '../assets/icons/booking.png';
import clothingIcon from '../assets/icons/clothing.png';
import fastDeliveryIcon from '../assets/icons/fast-delivery.png';

const steps = [
  {
    image: bookingIcon,
    title: '1. Schedule Booking',
    description: 'Easily schedule a convenient collection slot online or via our app.',
  },
  {
    image: clothingIcon,
    title: '2. Pickup & Clean',
    description:
      'Our trusted drivers collect your clothes directly and our experts clean them meticulously.',
  },
  {
    image: fastDeliveryIcon,
    title: '3. Fast Delivery',
    description: 'Your clothes are returned fresh, folded, and ready to wear.',
  },
];

const iconFilter =
  'invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)';

function StepIcon({ image, title }: { image: string; title: string }) {
  return (
    <img
      src={image}
      alt={title}
      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
      style={{ filter: iconFilter }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-24 bg-navy relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="section-eyebrow">How It Works</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">
            Effortless Laundry in 3 Simple Steps
          </h3>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6 max-w-5xl mx-auto">
          {/* Desktop: horizontal connector between step icons */}
          <div
            className="hidden md:block absolute top-8 lg:top-9 left-[17%] right-[17%] h-px bg-slate/20 z-0 pointer-events-none"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="relative z-10 mb-1 flex h-24 w-24 items-center justify-center bg-transparent border-0 shadow-none rounded-none p-0 backdrop-blur-none md:mb-2 md:h-14 md:w-14 md:bg-glass/90 md:backdrop-blur-md md:rounded-2xl md:shadow-sm md:border md:border-gold/20 md:p-2.5 md:transition-colors md:duration-300 md:transform md:group-hover:bg-glass md:group-hover:-translate-y-1 lg:h-16 lg:w-16 lg:p-3">
                <StepIcon image={step.image} title={step.title} />
              </div>

              <h4 className="text-xl md:text-lg lg:text-xl font-extrabold md:font-bold text-slate mb-1.5 md:mb-2 leading-snug">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed px-2 sm:px-4 text-ink max-w-xs md:max-w-none mx-auto md:mx-0">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <BookNowButton label="Book Now" />
        </div>
      </div>
    </section>
  );
}
