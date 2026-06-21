export const ORDER_PLACED_STORAGE_KEY = 'has_placed_order';
export const ORDER_PLACED_EVENT = 'thelaundryman:order-placed';

/** Returns true when the user has successfully placed an order in this browser. */
export function hasPlacedOrder(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ORDER_PLACED_STORAGE_KEY) === 'true';
}

/**
 * Call when a booking or CleanCloud order completes successfully.
 * Sets `has_placed_order: true` and notifies listeners to update without a refresh.
 */
export function handleOrderSuccess(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(ORDER_PLACED_STORAGE_KEY, 'true');
  window.dispatchEvent(new CustomEvent(ORDER_PLACED_EVENT));
}
