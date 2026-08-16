import React from 'react';
import {
  BadgePoundSterling,
  CheckCircle2,
  Clock,
  Factory,
  Leaf,
  Shirt,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

import whyChooseUsImage from '../assets/images/waching_room_laundry_man.webp';

const benefits: {
  icon: LucideIcon;
  title: string;
}[] = [
  {
    icon: Leaf,
    title: 'Eco-friendly cleaning',
  },
  {
    icon: Factory,
    title: 'All work done on-site',
  },
  {
    icon: Shirt,
    title: 'Designer wear specialists',
  },
  {
    icon: Truck,
    title: 'Free collection & delivery',
  },
  {
    icon: CheckCircle2,
    title: 'Our own trusted drivers',
  },
  {
    icon: Clock,
    title: '24-hour turnaround',
  },
  {
    icon: BadgePoundSterling,
    title: 'Premium care, fair prices',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative scroll-mt-28 overflow-hidden border-y border-black/5 bg-navy-alt py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="section-eyebrow">Why The Laundry Man App?</p>
          <h3 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-5xl">
            Why Choose The Laundry Man?
          </h3>
          <p className="mt-4 text-base font-light leading-relaxed text-ink sm:text-lg">
            We’re laundry specialists first — not just an app. Every garment is cleaned at our own
            premises by our expert team, with free doorstep collection across all our service areas.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center rounded-3xl border border-black/5 bg-paper p-6 shadow-accent-sm sm:p-8">
            <ul className="mx-auto grid w-full max-w-md grid-cols-1 gap-4 sm:mx-0 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.li
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="grid grid-cols-[2rem_1fr] items-center gap-3 text-left"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="text-base font-medium leading-snug text-ink sm:text-[1.0625rem]">
                      {benefit.title}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="relative order-first lg:order-none">
            <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-black/5 shadow-accent-sm sm:rounded-3xl lg:h-full lg:min-h-[22rem]">
              <img
                src={whyChooseUsImage}
                alt="Professional washing machines and laundry facility at The Laundry Man"
                className="block aspect-[4/3] h-auto w-full object-cover object-center sm:aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:w-full lg:object-cover lg:object-center"
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
