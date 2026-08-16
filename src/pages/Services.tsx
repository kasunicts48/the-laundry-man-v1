import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesOverview from '../components/ServicesOverview';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';
import type { ServicesBookingLocationState } from '../data/footerContent';

interface ServicesProps {
  onBookNow: (serviceId?: string) => void;
}

export default function Services({ onBookNow }: ServicesProps) {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as ServicesBookingLocationState | null;
    if (!state?.autoOpenBooking) return;

    window.location.assign('/booking.html');
  }, [location.state]);

  return (
    <>
      <InnerPageHeader
        eyebrow="Our Services"
        title={
          <>
            Professional <InnerPageTitleHighlight>garments care</InnerPageTitleHighlight>.
          </>
        }
        description="From everyday wash & fold to specialist dry cleaning, we look after your clothes with care — so you can get on with your day."
      />

      <div className="pb-12 min-h-[70vh] bg-navy-alt transition-colors duration-500">
        <ServicesOverview onBookNow={onBookNow} hideSectionHeader />
      </div>
    </>
  );
}
