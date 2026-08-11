import React from 'react';
import { BellRing, CalendarClock, MapPinned, Sparkles, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

import BookNowButton from './BookNowButton';
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
    <section className="relative overflow-hidden bg-[#134633] py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(76,175,80)] sm:text-sm">
              The Laundry Man
            </p>
            <h2 className="text-3xl font-extrabold tracking-tighter text-paper sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              Hassle-Free Service
            </h2>

            <ul className="mt-8 flex flex-col gap-3 sm:items-center lg:items-start">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper/15 text-[rgb(76,175,80)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-paper sm:text-base">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center lg:justify-start">
              <BookNowButton label="Book Now" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] shape-blob">
              <img
                src={trustImage}
                alt="The Laundry Man App delivery van and doorstep collection service"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
