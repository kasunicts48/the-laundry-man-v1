import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ServiceId } from '../data/services';

export interface BookingLocationState {
  serviceType?: ServiceId;
}

export function useOpenBooking() {
  const navigate = useNavigate();

  return useCallback((serviceId?: string) => {
    const state: BookingLocationState | undefined = serviceId
      ? { serviceType: serviceId as ServiceId }
      : undefined;

    navigate('/book', { state });
  }, [navigate]);
}
