import curtainIcon from '../assets/icons/curtain.webp';
import weddingIcon from '../assets/icons/wedding.webp';
import shirtServiceIcon from '../assets/icons/washing.webp';
import ironingIcon from '../assets/icons/clothes.webp';
import dryCleaningIcon from '../assets/icons/dry-cleaning.webp';
import laundryServiceIcon from '../assets/icons/laundry-service.webp';

export interface ServiceItem {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

export const services: ServiceItem[] = [
  {
    id: 'wash-fold',
    name: 'Wash & Fold',
    title: 'Wash & Fold',
    description:
      'Enjoy the convenience of professionally washed, carefully dried, and neatly folded laundry, ready to wear or put away. Our Wash & Fold service is ideal for busy individuals, families, and businesses looking to save time without compromising on quality.\n\nFor garments that require extra care and a crisp, polished appearance, we also offer a professional ironing service. Every item is handled with attention to detail to ensure your clothes are returned fresh, clean, and finished to the highest standard.',
    image: laundryServiceIcon,
    price: '£4.50',
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    title: 'Dry Cleaning',
    description:
      'Your garments are professionally cleaned, pressed, and finished using advanced, industry-leading equipment and premium eco-friendly cleaning solutions. Our carefully selected processes are designed to remove stains effectively while helping to preserve the colour, texture, and quality of your garments.\n\nWith a focus on quality and garment care, we use high-performance equipment and environmentally responsible products to deliver exceptional results while being gentle on both your clothes and the environment.',
    image: dryCleaningIcon,
    price: '£6.00',
  },
  {
    id: 'ironing-service',
    name: 'Ironing Service',
    title: 'Ironing Service',
    description:
      'Enjoy perfectly finished garments with our professional ironing service. Each item is carefully pressed and finished with attention to detail, giving your clothes a crisp, fresh, and polished appearance.\n\nWe provide expert ironing for shirts, trousers, office wear, casual clothing, everyday dresses, occasion wear, and delicate fabrics. Using professional equipment and garment-specific techniques, we help maintain the shape, quality, and presentation of your clothing, saving you time while ensuring exceptional results every time.',
    image: ironingIcon,
    price: '£4.50',
  },
  {
    id: 'shirt-service',
    name: 'Shirt Service',
    title: 'Shirt Service',
    description:
      'Look your best every day with our professional Shirt Service. Each shirt is carefully washed, expertly pressed, and finished to a high standard, ensuring a crisp, fresh, and professional appearance.\n\nUsing quality laundry processes and professional finishing equipment, we help maintain the shape, fabric quality, and appearance of your shirts. For your convenience, shirts can be returned neatly folded or individually hung and ready to wear, saving you valuable time while delivering outstanding results.',
    image: shirtServiceIcon,
    price: '£6.00',
  },
  {
    id: 'curtain-cleaning',
    name: 'Curtain Cleaning',
    title: 'Curtain Cleaning',
    description:
      'Refresh and restore your curtains with our professional curtain cleaning service for both residential and commercial properties across Manchester. Using specialist cleaning techniques and careful handling, we remove dust, odours, and everyday build-up while helping to preserve the appearance, colour, and fabric quality of your curtains.\n\nWe have the expertise and equipment to clean a wide range of curtain types, including delicate and lined fabrics. We also specialise in cleaning blackout curtains, a service that requires particular care and is not widely offered. Every curtain is treated with attention to detail and returned fresh, clean, and ready to hang.',
    image: curtainIcon,
    price: '£10.00',
  },
  {
    id: 'wedding-dress-cleaning',
    name: 'Wedding Dress Cleaning',
    title: 'Wedding Dress Cleaning',
    description:
      'Preserve the beauty of your treasured gown with our specialist wedding dress cleaning service. Using gentle, professional cleaning techniques, we carefully treat delicate fabrics, intricate lace, beadwork, embroidery, and detailed embellishments to achieve the best possible results.\n\nEvery wedding dress receives individual attention and expert care, helping to remove marks and restore freshness while protecting the fabric and fine details. Whether you wish to preserve your gown as a keepsake or prepare it for future use, we ensure it is returned in the best possible condition with the care it deserves.',
    image: weddingIcon,
    price: '£50.00',
  },
];

export type ServiceId = (typeof services)[number]['id'];
