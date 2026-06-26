import { useCallback } from 'react';

const BOOKING_PAGE_URL = '/booking.html';

export function useOpenBooking() {
  return useCallback((_serviceId?: string) => {
    window.location.assign(BOOKING_PAGE_URL);
  }, []);
}
