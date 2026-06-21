import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CleanCloudBookingWidget from '../components/CleanCloudBookingWidget';

export default function Book() {
  return (
    <div
      className="cleancloud-booking-page bg-navy pb-16"
      style={{ paddingTop: 'var(--site-header-height, 6.625rem)' }}
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3 border-b border-phone-border pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-phone-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate transition-colors hover:border-gold/30 hover:text-gold"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight text-slate sm:text-2xl">
              Book a Collection
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
              Secure online booking
            </p>
          </div>
        </div>

        <CleanCloudBookingWidget />
      </div>
    </div>
  );
}
