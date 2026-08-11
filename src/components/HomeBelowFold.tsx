import React from 'react';
import HomeDoorstepIntro from './HomeDoorstepIntro';
import HomeDesignerWear from './HomeDesignerWear';
// import HomeAudienceCards from './HomeAudienceCards';
import HowItWorks from './HowItWorks';
import SpecialOffers from './SpecialOffers';
import HomeAppControl from './HomeAppControl';
import HomeTrustBand from './HomeTrustBand';
import ServicesOverview from './ServicesOverview';
import WhyChooseUs from './WhyChooseUs';
import AppPromoAndReviews from './AppPromo';
import HomeFaq from './HomeFaq';
import type { CityData } from '../data/cities';

interface HomeBelowFoldProps {
  onBookNow: (serviceId?: string) => void;
  displayName: string;
  cityData: CityData;
  isRootHome: boolean;
}

export default function HomeBelowFold({
  onBookNow,
  displayName,
  cityData,
  isRootHome,
}: HomeBelowFoldProps) {
  return (
    <>
      <HomeDoorstepIntro />
      <HomeDesignerWear />
      <HowItWorks />
      <SpecialOffers />
      {/* <HomeAudienceCards /> */}
      <ServicesOverview
        city={isRootHome ? undefined : displayName}
        cityData={isRootHome ? undefined : cityData}
        onBookNow={onBookNow}
      />
      <WhyChooseUs />
      <HomeAppControl />
      <HomeTrustBand />
      <AppPromoAndReviews cityData={cityData} />
      <HomeFaq />
    </>
  );
}
