import React from 'react';
import { BellRing, CalendarClock, MapPinned, Sparkles, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

import trustImage from '../assets/images/Laundry_man_why_choose_us.webp';

const trustPoints: { icon: LucideIcon; label: string }[] = [
  {
    icon: BellRing,
    label: 'Real-time updates on every order',
  },
  {
    icon: MapPinned,
    label: 'Track our own drivers live',
  },
  {
    icon: CalendarClock,
    label: 'Change times or dates with one tap',
  },
  {
    icon: Sparkles,
    label: 'We manage everything for you',
  },
];

export default function HomeTrustBand() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="section-eyebrow">The Laundry Man</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              Hassle-Free Service
            </h2>

            <ul className="mt-8 flex flex-col gap-4 sm:items-center lg:items-start">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="grid grid-cols-[2.5rem_1fr] items-center gap-3 text-left">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-ink sm:text-base">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-black/5 shadow-accent-sm">
              <img
                src={trustImage}
                alt="The Laundry Man App delivery van and doorstep collection service"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
