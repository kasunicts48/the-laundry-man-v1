import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ServicesOverview from '../components/ServicesOverview';
import WhyChooseUs from '../components/WhyChooseUs';
import AppPromoAndReviews from '../components/AppPromo';
import { getCityData } from '../data/cities';

interface CityLandingProps {
  city: string;
  onBookNow: (serviceId?: string) => void;
}

export default function CityLanding({ city, onBookNow }: CityLandingProps) {
  const cityData = getCityData(city);

  useEffect(() => {
    // Update the document title dynamically for SEO
    const originalTitle = document.title;
    document.title = `Premium Laundry & Dry Cleaning in ${cityData.name} | The Laundry Man`;

    // Update the meta description dynamically
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content');
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.setAttribute(
      'content', 
      cityData.heroDescription
    );

    // Inject Schema.org JSON-LD
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'city-schema';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "DryCleaningOrLaundry",
      "name": `The Laundry Man - ${cityData.name}`,
      "image": "https://thelaundryman.co.uk/logo.png",
      "@id": `https://thelaundryman.co.uk/${cityData.id}`,
      "url": `https://thelaundryman.co.uk/${cityData.id}`,
      "telephone": "+44 123 456 7890",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityData.name,
        "addressCountry": "UK"
      },
      "areaServed": {
        "@type": "City",
        "name": cityData.name
      },
      "description": cityData.heroDescription,
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
      ]
    };
    
    schemaScript.text = JSON.stringify(schemaData);
    document.head.appendChild(schemaScript);

    // Cleanup when unmounting or changing cities
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      const activeSchema = document.getElementById('city-schema');
      if (activeSchema) {
        document.head.removeChild(activeSchema);
      }
    };
  }, [city, cityData]);

  return (
    <>
      <Hero onBookNow={onBookNow} city={city} cityData={cityData} />
      <HowItWorks />
      <ServicesOverview city={city} cityData={cityData} onBookNow={onBookNow} />
      <WhyChooseUs />
      <AppPromoAndReviews cityData={cityData} />
    </>
  );
}

