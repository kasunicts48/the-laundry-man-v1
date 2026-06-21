import { useEffect, useState } from 'react';
import {
  ORDER_PLACED_EVENT,
  handleOrderSuccess,
  hasPlacedOrder,
} from '../utils/orderPlaced';

export function useHasPlacedOrder() {
  const [hasPlaced, setHasPlaced] = useState<boolean | null>(null);

  useEffect(() => {
    setHasPlaced(hasPlacedOrder());

    const sync = () => setHasPlaced(hasPlacedOrder());

    window.addEventListener(ORDER_PLACED_EVENT, sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(ORDER_PLACED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return {
    isReady: hasPlaced !== null,
    hasPlacedOrder: hasPlaced === true,
    showPromo: hasPlaced === false,
    handleOrderSuccess,
  };
}
