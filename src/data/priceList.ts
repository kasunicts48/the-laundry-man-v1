export interface PriceListItem {
  name: string;
  price: string;
}

export interface PriceListSection {
  id: string;
  title: string;
  /** Highlight special offers with the sale badge colour */
  featured?: boolean;
  items: PriceListItem[];
}

export const priceListSections: PriceListSection[] = [
  {
    id: 'special-offer',
    title: 'Special Offer',
    featured: true,
    items: [
      { name: '10 Shirt Clean & Iron', price: '£19.99' },
      { name: '2 Dress Clean & Pressed', price: '£25.00' },
      { name: '2 Piece Suit & 5 Shirt Clean & Pressed', price: '£25.99' },
      { name: '5 Blouse Clean & Pressed', price: '£25.00' },
      { name: '5 Shirt Clean & Pressed', price: '£9.99' },
    ],
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning Service',
    items: [
      { name: '2 Piece Suit', price: '£18.00' },
      { name: '3 Piece Suit', price: '£22.99' },
      { name: 'Blouse', price: '£8.99' },
      { name: 'Cardigan', price: '£7.99' },
      { name: 'Coat', price: '£15.99' },
      { name: 'Coat (Canada Goose)', price: '£30.00' },
      { name: 'Coat (Moncler)', price: '£30.00' },
      { name: 'Dinner Jacket', price: '£9.99' },
      { name: 'Dinner Suit', price: '£19.99' },
      { name: 'Dress From', price: '£15.99' },
      { name: 'Dress With Trim', price: '£15.99' },
      { name: 'Evening Dress From', price: '£25.00' },
      { name: 'Jacket', price: '£8.99' },
      { name: 'Jacket (Puffy / Padded)', price: '£25.99' },
      { name: 'Jacket With Trim', price: '£19.99' },
      { name: 'Jeans', price: '£7.99' },
      { name: 'Jumper', price: '£7.99' },
      { name: 'Jumpsuit', price: '£18.99' },
      { name: 'Shorts', price: '£6.99' },
      { name: 'Silk Blouse', price: '£7.99' },
      { name: 'Silk Dress From', price: '£16.99' },
      { name: 'Silk Trouser', price: '£9.99' },
      { name: 'Skirt', price: '£7.00' },
      { name: 'Skirt With Trim', price: '£9.99' },
      { name: 'Trouser', price: '£8.99' },
      { name: 'Waistcoat', price: '£4.99' },
      { name: 'Blazer', price: '£8.99' },
    ],
  },
  {
    id: 'shirt-tops',
    title: 'Shirt / Tops Service',
    items: [
      { name: 'Blouse', price: '£7.99' },
      { name: 'Polo Shirt', price: '£3.50' },
      { name: 'Shirt', price: '£2.95' },
      { name: 'T Shirt', price: '£3.00' },
      { name: 'Top', price: '£5.99' },
    ],
  },
  {
    id: 'ironing',
    title: 'Ironing Service',
    items: [
      { name: 'Blouse Iron Only', price: '£3.50' },
      { name: 'Jean Iron Only', price: '£3.99' },
      { name: 'Laundry Iron Only (Per Kg)', price: '£7.99' },
      { name: 'Polo Shirt Iron Only', price: '£1.75' },
      { name: 'Shirt Iron Only', price: '£1.75' },
      { name: 'T Shirt Iron Only', price: '£2.00' },
      { name: 'Trouser Iron Only', price: '£3.99' },
    ],
  },
  {
    id: 'laundry',
    title: 'Laundry Service',
    items: [
      { name: 'Bath Mat', price: '£4.00' },
      { name: 'Bath Towel', price: '£4.99' },
      { name: 'Bath Towel (Hand)', price: '£1.50' },
      { name: 'Wash & Fold (8kg)', price: '£15.99' },
      { name: 'Wash & Fold Per Kg Extra Charge', price: '£2.50' },
    ],
  },
  {
    id: 'bedding-laundry',
    title: 'Bedding Laundry Service',
    items: [
      { name: 'Duvet (Double)', price: '£20.00' },
      { name: 'Duvet (Double - Feather)', price: '£25.99' },
      { name: 'Duvet (King Size)', price: '£25.99' },
      { name: 'Duvet (King Size - Feather)', price: '£30.99' },
      { name: 'Duvet (Single)', price: '£12.99' },
      { name: 'Duvet (Single - Feather)', price: '£15.99' },
      { name: 'Pillow', price: '£6.99' },
      { name: 'Pillow (Feather)', price: '£8.99' },
      { name: 'Blanket', price: '£19.99' },
      { name: 'Blanket (Large)', price: '£25.99' },
      { name: 'Mattress Protector From', price: '£0.20' },
    ],
  },
  {
    id: 'bedding',
    title: 'Bedding Service',
    items: [
      { name: 'Bed Set (Double)', price: '£12.99' },
      { name: 'Bed Set (King Size)', price: '£15.99' },
      { name: 'Bed Set (Single)', price: '£9.99' },
      { name: 'Duvet Cover (Double)', price: '£5.99' },
      { name: 'Duvet Cover (King Size)', price: '£6.99' },
      { name: 'Duvet Cover (Single)', price: '£4.99' },
      { name: 'Pillow Case', price: '£1.75' },
      { name: 'Sheet (Double)', price: '£4.99' },
      { name: 'Sheet (King Size)', price: '£5.99' },
      { name: 'Sheet (Single)', price: '£3.99' },
    ],
  },
  {
    id: 'accessories',
    title: 'Accessories',
    items: [
      { name: 'Dressing Gown', price: '£9.99' },
      { name: 'Scarf (Silk)', price: '£8.99' },
      { name: 'Scarf (Wool)', price: '£7.99' },
      { name: 'Tie', price: '£4.99' },
    ],
  },
];
