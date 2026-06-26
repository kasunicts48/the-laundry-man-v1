import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CleanCloudBookingWidget from '../components/CleanCloudBookingWidget';

export default function Book() {
  return (
    <div className="cleancloud-booking-page flex w-full max-w-[100vw] flex-col overflow-x-clip">
      <div className="cleancloud-booking-back shrink-0 border-b border-phone-border px-3 py-2 sm:px-6 sm:py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-phone-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate transition-colors hover:border-gold/30 hover:text-gold"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <div className="cleancloud-booking-shell">
        <CleanCloudBookingWidget />
      </div>
    </div>
  );
}
