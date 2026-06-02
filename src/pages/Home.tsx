import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ServicesOverview from '../components/ServicesOverview';
import AppPromoAndReviews from '../components/AppPromo';

interface HomeProps {
  onBookNow: () => void;
}

export default function Home({ onBookNow }: HomeProps) {
  return (
    <>
      <Hero onBookNow={onBookNow} />
      <HowItWorks />
      <ServicesOverview />
      <AppPromoAndReviews />
    </>
  );
}
