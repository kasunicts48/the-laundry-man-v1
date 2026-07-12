export interface SpecialOfferPriceLine {
  label: string;
  price: string;
}

export interface SpecialOfferCard {
  id: string;
  title: string;
  eyebrow?: string;
  type: 'pricing' | 'promo';
  priceLines?: SpecialOfferPriceLine[];
  headline?: string;
  validUntil?: string;
  businessName?: string;
  postcode?: string;
  phone?: string;
}

export const specialOffers: SpecialOfferCard[] = [
  {
    id: 'bundle-pricing',
    title: 'Bundle Savings',
    eyebrow: 'Special offer',
    type: 'pricing',
    priceLines: [
      { label: '8 kg wash and fold', price: '£19.99' },
      { label: '2pc suit', price: '£15.99' },
      { label: '5 shirts clean and iron', price: '£12.50' },
      { label: 'One suit × 5 shirts clean & iron', price: '£25.00' },
    ],
  },
  {
    id: 'prepay-discount',
    title: 'Prepay Discount',
    eyebrow: 'Limited time',
    type: 'promo',
    headline:
      'Enjoy Unlimited 35% discount on your Dry Cleaning & Laundry Orders with prepayment.',
    validUntil: '25/06/26',
    businessName: 'The Eco Dry Cleaning & Laundry',
    postcode: 'SK9 1HG',
    phone: '01625527581',
  },
  {
    id: 'first-order',
    title: 'First Order Offer',
    eyebrow: 'New customers',
    type: 'promo',
    headline: '30% off your first laundry or dry cleaning order when you book online.',
    validUntil: 'Ongoing',
    businessName: 'The Laundry Man App',
    postcode: 'UK-wide service',
  },
  {
    id: 'bedding-bundle',
    title: 'Bedding Refresh',
    eyebrow: 'Home essentials',
    type: 'pricing',
    priceLines: [
      { label: 'Double duvet clean', price: '£12.99' },
      { label: 'King duvet clean', price: '£15.99' },
      { label: '2 pillows refresh', price: '£8.99' },
      { label: 'Duvet + 2 pillows bundle', price: '£22.00' },
    ],
  },
];
