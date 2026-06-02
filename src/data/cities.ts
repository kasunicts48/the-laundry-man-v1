export interface CityData {
  id: string;
  name: string;
  heroSubtitle: string;
  heroDescription: string;
  servicesDescription: string;
  testimonials: {
    author: string;
    text: string;
    rating: number;
    neighborhood?: string;
  }[];
}

export const citiesData: Record<string, CityData> = {
  manchester: {
    id: 'manchester',
    name: 'Manchester',
    heroSubtitle: 'Premium Laundry & Dry Cleaning Services in',
    heroDescription: 'Ready for unpredictable Manchester rain? Get your coats and everyday wear professionally cleaned and delivered pristine right to your door within 24 hours.',
    servicesDescription: 'From Ancoats to Didsbury, we offer specialized garment care tailored for the Manchester lifestyle.',
    testimonials: [
      {
        author: 'Sarah L.',
        text: 'The best laundry service in Northern Quarter! Saved me so much time and my clothes look brand new.',
        rating: 5,
        neighborhood: 'Northern Quarter'
      },
      {
        author: 'James T.',
        text: 'Dependable and fast. Love that they pick up directly from my office in MediaCity.',
        rating: 5,
        neighborhood: 'MediaCityUK'
      }
    ]
  },
  leeds: {
    id: 'leeds',
    name: 'Leeds',
    heroSubtitle: 'Eco-Friendly Dry Cleaning in',
    heroDescription: 'Professional garment care delivered right to your door across Leeds. We pick up, clean, and return your clothes pristine within 24 hours.',
    servicesDescription: 'Serving Headingley, Roundhay, and the City Centre with top-tier, eco-friendly dry cleaning.',
    testimonials: [
      {
        author: 'Emma W.',
        text: 'Incredibly convenient service! They picked up my suits from the Calls and brought them back perfectly pressed.',
        rating: 5,
        neighborhood: 'The Calls'
      }
    ]
  },
  birmingham: {
    id: 'birmingham',
    name: 'Birmingham',
    heroSubtitle: 'Professional Laundry Services in',
    heroDescription: 'Expert laundry and dry cleaning delivered across Birmingham. Fast turnaround to keep you looking sharp in the Second City.',
    servicesDescription: 'Whether you are in Edgbaston, Digbeth, or the Jewellery Quarter, we have your laundry covered.',
    testimonials: [
      {
        author: 'David M.',
        text: 'Great service. I use them for all my work clothes and they never disappoint. Quick pickup from Digbeth.',
        rating: 5,
        neighborhood: 'Digbeth'
      }
    ]
  },
  sheffield: {
    id: 'sheffield',
    name: 'Sheffield',
    heroSubtitle: 'Top-Rated Dry Cleaners in',
    heroDescription: 'Hassle-free laundry and dry cleaning in Sheffield. We handle the chores so you can explore the outdoors.',
    servicesDescription: 'Delivering exceptional garment care from the city centre out to the Peak District borders.',
    testimonials: [
      {
        author: 'Chloe S.',
        text: 'Absolutely brilliant. Removed a stubborn stain from my coat. Fantastic service for Sheffield locals.',
        rating: 5,
        neighborhood: 'Kelham Island'
      }
    ]
  },
  cheshire: {
    id: 'cheshire',
    name: 'Cheshire',
    heroSubtitle: 'Premium Garment Care in',
    heroDescription: 'Luxury dry cleaning and laundry services for Cheshire residents. We treat your delicate fabrics with the utmost care.',
    servicesDescription: 'Offering specialized care for high-end fashion and everyday wear across the Cheshire area.',
    testimonials: [
      {
        author: 'Richard H.',
        text: 'The only service I trust with my delicate suits. Always punctual and professional.',
        rating: 5,
        neighborhood: 'Alderley Edge'
      }
    ]
  }
};

export const getCityData = (city: string): CityData => {
  const normalizedCity = city.toLowerCase();
  return citiesData[normalizedCity] || {
    id: normalizedCity,
    name: city,
    heroSubtitle: 'Premium Laundry &\nDry Cleaning Services in',
    heroDescription: `Eco-friendly, professional garment care delivered right to your door in ${city}. We pick up, clean, and return your clothes pristine within 24 hours.`,
    servicesDescription: `Expert laundry and dry cleaning services for all your needs in ${city}.`,
    testimonials: [
      {
        author: 'Happy Customer',
        text: `Extremely convenient and reliable service in ${city}. Highly recommended!`,
        rating: 5
      }
    ]
  };
};
