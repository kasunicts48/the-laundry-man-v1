import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import { usePageLocation } from '../hooks/usePageLocation';
import { SITE_LOGO_URL } from '../data/siteBrand';

const HomeBelowFold = lazy(() => import('../components/HomeBelowFold'));

interface HomeProps {
  onBookNow: (serviceId?: string) => void;
}

export default function Home({ onBookNow }: HomeProps) {
  const { pathname } = useLocation();
  const { displayName, slug, cityData, isDefaultLocation } = usePageLocation();
  const isRootHome = pathname === '/' || pathname.replace(/\/+$/, '') === '';
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    const revealBelowFold = () => setShowBelowFold(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(revealBelowFold, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(revealBelowFold, 200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = isRootHome
      ? 'Premium Laundry & Dry Cleaning Services | The Laundry Man'
      : `Premium Laundry & Dry Cleaning Services in ${displayName} | The Laundry Man`;

    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content');

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute('content', cityData.heroDescription);

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'location-schema';

    const pageUrl = isDefaultLocation
      ? 'https://thelaundryman.co.uk/'
      : `https://thelaundryman.co.uk/${slug}`;

    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'DryCleaningOrLaundry',
      name: `The Laundry Man - ${displayName}`,
      image: SITE_LOGO_URL,
      '@id': pageUrl,
      url: pageUrl,
      telephone: '+44 123 456 7890',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: displayName,
        addressCountry: 'UK',
      },
      areaServed: {
        '@type': 'City',
        name: displayName,
      },
      description: cityData.heroDescription,
    });

    document.head.appendChild(schemaScript);

    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
      document.getElementById('location-schema')?.remove();
    };
  }, [cityData.heroDescription, displayName, isDefaultLocation, isRootHome, slug]);

  return (
    <>
      <Hero locationName={displayName} cityData={cityData} />
      {showBelowFold ? (
        <Suspense fallback={null}>
          <HomeBelowFold
            onBookNow={onBookNow}
            displayName={displayName}
            cityData={cityData}
            isRootHome={isRootHome}
          />
        </Suspense>
      ) : null}
    </>
  );
}
