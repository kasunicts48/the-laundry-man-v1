export interface SpecialOfferPriceLine {
  label: string;
  price: string;
}

export interface SpecialOfferCard {
  id: string;
  title: string;
  eyebrow?: string;
  priceLines: SpecialOfferPriceLine[];
}

export const specialOffers: SpecialOfferCard[] = [
  {
    id: 'laundry-service',
    title: 'Wash & Fold',
    eyebrow: 'From £15.99',
    priceLines: [
      { label: 'Wash & Fold (8kg)', price: '£15.99' },
      { label: 'Each extra kg', price: '£2.50' },
      { label: 'Bath towel', price: '£4.99' },
      { label: 'Bath mat', price: '£4.00' },
      { label: 'Hand towel', price: '£1.50' },
      { label: 'Duvet (single)', price: '£12.99' },
    ],
  },
  {
    id: 'shirt-service',
    title: 'Shirt Service',
    eyebrow: 'From £2.95',
    priceLines: [
      { label: 'Shirt', price: '£2.95' },
      { label: 'Polo shirt', price: '£3.50' },
      { label: 'T-shirt', price: '£3.00' },
      { label: 'Top', price: '£5.99' },
      { label: 'Blouse', price: '£7.99' },
      { label: '5 shirts clean & pressed', price: '£9.99' },
    ],
  },
  {
    id: 'dry-clean',
    title: 'Dry Cleaning',
    eyebrow: 'From £8.99',
    priceLines: [
      { label: '2-piece suit', price: '£18.00' },
      { label: 'Jacket', price: '£8.99' },
      { label: 'Trouser', price: '£8.99' },
      { label: 'Dress from', price: '£15.99' },
      { label: '3-piece suit', price: '£22.99' },
      { label: 'Coat', price: '£15.99' },
    ],
  },
  {
    id: 'managers-special',
    title: 'Special Offer',
    eyebrow: 'Best value',
    priceLines: [
      { label: '5 shirts clean & pressed', price: '£9.99' },
      { label: '10 shirts clean & iron', price: '£19.99' },
      { label: 'Suit + 5 shirts', price: '£25.99' },
      { label: '2 dresses clean & pressed', price: '£25.00' },
      { label: '5 blouses clean & pressed', price: '£25.00' },
      { label: '3-piece suit', price: '£22.99' },
    ],
  },
];
