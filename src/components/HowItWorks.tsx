import React from 'react';
import { motion } from 'motion/react';

import bookingImg from '../assets/images/booking.png';
import pickupTimeImg from '../assets/images/pickup-time.png';
import laundryImg from '../assets/images/laundry.png';
import fastDeliveryImg from '../assets/images/fast-delivery.png';

export default function HowItWorks() {
  const steps = [
    {
      image: bookingImg,
      title: "1. Schedule Booking",
      description: "Easily schedule a convenient collection slot online or via our app."
    },
    {
      image: pickupTimeImg,
      title: "2. We Pickup",
      description: "Our trusted drivers collect directly from your home, office, or hotel."
    },
    {
      image: laundryImg,
      title: "3. Expert Clean",
      description: "Garments are meticulously inspected, naturally cleaned, and cared for."
    },
    {
      image: fastDeliveryImg,
      title: "4. Fast Delivery",
      description: "Your clothes are returned fresh, folded, and ready to wear."
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-24 bg-navy relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">How It Works</h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">Effortless Laundry in 4 Simple Steps</h3>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-10 relative">
          {/* Connecting Line */}
          <div className="absolute top-5 sm:top-8 lg:top-10 left-[12%] right-[12%] h-px bg-slate/20 z-0"></div>

          {steps.map((step, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-glass/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center mb-2 sm:mb-6 border border-gold/20 group-hover:bg-glass transition-colors duration-300 transform group-hover:-translate-y-1 z-10 relative p-2 sm:p-4">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    style={{ filter: "invert(13%) sepia(25%) saturate(1142%) hue-rotate(177deg) brightness(96%) contrast(87%)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <h4 className="text-[10px] sm:text-base lg:text-xl font-bold text-slate mb-1 sm:mb-3 leading-tight z-10">{step.title}</h4>
                <p className="hidden sm:block text-xs lg:text-sm opacity-60 leading-relaxed px-1 lg:px-4 text-slate">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
