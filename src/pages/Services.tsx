import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServicesOverview from '../components/ServicesOverview';
import type { ServicesBookingLocationState } from '../data/footerContent';

interface ServicesProps {
  onBookNow: (serviceId?: string) => void;
}

export default function Services({ onBookNow }: ServicesProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as ServicesBookingLocationState | null;
    if (!state?.autoOpenBooking) return;

    onBookNow(state.serviceType);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate, onBookNow]);

  return (
    <div className="pt-24 pb-12 min-h-[70vh] bg-navy-alt transition-colors duration-500">
      <ServicesOverview onBookNow={onBookNow} />
    </div>
  );
}
