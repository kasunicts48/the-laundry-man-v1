import React from 'react';
import { motion } from 'motion/react';

const benefits = [
  {
    title: '100% Customer Satisfaction',
    description: 'We provide excellent customer service.',
  },
  {
    title: 'Free Collection & Delivery',
    description:
      'We process all cleaning at our own site. We provide door-to-door collection and delivery.',
  },
  {
    title: 'Highly Recommended Service',
    description:
      'Our customer-focused approach has helped us acquire loyal repeat customers, offering the most efficient and effective customer service. Available for you through email, online chat or call.',
  },
  {
    title: 'Affordable Prices',
    description:
      'We have a solution for all your laundry needs. We provide the best service in the most convenient way, at the most affordable prices.',
  },
  {
    title: 'Best Quality',
    description:
      'We offer a premiere Dry Cleaning service. We also have a specialist for leather, duvets and much more.',
  },
  {
    title: 'Book With Us',
    description:
      'Orders can be booked by calling, email or through our booking app. Through which you can track your order total, pickup and delivery dates and time, as well as pay at your convenience.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-navy transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">
            Why Choose Us
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate tracking-tighter">
            Best Dry Cleaning & Laundry Service
          </h3>
          <p className="text-ink font-light mt-4 text-lg leading-relaxed">
            We pick up, clean and return within 24 hours.
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
