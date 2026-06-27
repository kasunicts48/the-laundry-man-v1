import React from 'react';
import { motion } from 'motion/react';

const benefits = [
  {
    title: 'A Real Laundry & Dry Cleaning Company',
    description:
      'We are a professional laundry and dry cleaning business — not an app company. Garment care is what we do, and quality is at the heart of everything we offer.',
  },
  {
    title: 'Cleaned at Our Own Site',
    description:
      'Every item is cleaned, finished, and quality-checked at our own facility. That means full control over standards, care, and results from start to finish.',
  },
  {
    title: 'Free Collection & Delivery',
    description:
      'Enjoy convenient door-to-door collection and delivery across our service areas, so professional laundry care fits around your schedule.',
  },
  {
    title: '100% Customer Satisfaction',
    description:
      'We provide excellent customer service and take pride in returning your clothes fresh, clean, and ready to wear.',
  },
  {
    title: 'Best Quality',
    description:
      'From everyday wash & fold to specialist dry cleaning, leather, duvets, and more — our experienced team handles every fabric with care.',
  },
  {
    title: 'Affordable Prices',
    description:
      'We offer practical solutions for all your laundry needs, with competitive pricing and a straightforward booking experience online or by phone.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="pt-24 pb-12 md:py-24 bg-navy transition-colors duration-500 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-eyebrow">
            Why Choose Us
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">
            Professional Laundry & Dry Cleaning You Can Trust
          </h3>
          <p className="text-ink font-light mt-4 text-lg leading-relaxed">
            We are a dry cleaning and laundry company — not an app company. We collect your
            clothes, clean every item at our own site, and return them within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-y-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center md:text-left max-w-md mx-auto md:max-w-none md:mx-0"
            >
              <h4 className="text-lg font-bold text-slate mb-2 leading-snug">{benefit.title}</h4>
              <p className="text-sm sm:text-base text-ink font-light leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
