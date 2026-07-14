import beddingRefreshIcon from '../assets/icons/special-offers/bedding-refresh.webp';
import bundleSavingsIcon from '../assets/icons/special-offers/bundle-savings.webp';
import firstOrderIcon from '../assets/icons/special-offers/first-order.webp';
import prepayDiscountIcon from '../assets/icons/special-offers/prepay-discount.webp';

export interface SpecialOfferPriceLine {
  label: string;
  price: string;
}

export interface SpecialOfferCard {
  id: string;
  title: string;
  eyebrow?: string;
  icon: string;
  priceLines: SpecialOfferPriceLine[];
}

export const specialOffers: SpecialOfferCard[] = [
  {
    id: 'laundry-service',
    title: 'Laundry service',
    eyebrow: 'Wash & fold',
    icon: bundleSavingsIcon,
    priceLines: [
      { label: '8 kg wash & fold', price: '£15.00' },
      { label: 'Each extra kg', price: '£2.50' },
    ],
  },
  {
    id: 'shirt-service',
    title: 'Shirt service',
    eyebrow: 'Clean & iron',
    icon: firstOrderIcon,
    priceLines: [
      { label: 'Single shirt', price: '£2.95' },
      { label: '5 shirts', price: '£12.50' },
    ],
  },
  {
    id: 'dry-clean',
    title: 'Dry cleaning',
    eyebrow: 'By the piece',
    icon: beddingRefreshIcon,
    priceLines: [
      { label: '2-piece suit', price: '£15.99' },
      { label: 'Two 2-piece suits', price: '£25.00' },
    ],
  },
  {
    id: 'managers-special',
    title: "Manager's special",
    eyebrow: 'Best value',
    icon: prepayDiscountIcon,
    priceLines: [
      { label: '2-piece suit + 5 shirts', price: '£25.00' },
      { label: '10 shirts', price: '£20.00' },
    ],
  },
];
