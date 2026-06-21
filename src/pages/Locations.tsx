import React from 'react';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';
import LocationDirectory from '../components/LocationDirectory';
import { locationPageSections } from '../data/locationPageSections';
import { ukLocationAreaCount, ukLocationRegionCount } from '../data/ukLocations';

export default function Locations() {
  return (
    <>
      <InnerPageHeader
        eyebrow="Service Areas"
        title={
          <>
            Laundry Services Across the{' '}
            <InnerPageTitleHighlight>United Kingdom</InnerPageTitleHighlight>.
          </>
        }
        description="Find your city or neighbourhood below. Select any location to view local laundry and dry cleaning services with free collection and delivery."
      />

      <div className="min-h-[70vh] bg-navy px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-12 max-w-3xl text-base font-light leading-relaxed text-ink sm:text-lg">
            We serve {ukLocationRegionCount} major regions and {ukLocationAreaCount.toLocaleString()}{' '}
            neighbourhoods across the UK. Browse by service or explore our full location directory
            below.
          </p>

          <div className="space-y-16 sm:space-y-20">
            {locationPageSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`locations-section-${section.id}`}
                  className={index > 0 ? 'border-t border-white/10 pt-16 sm:pt-20' : undefined}
                >
                  <div className="mb-8">
                    <h2
                      id={`locations-section-${section.id}`}
                      className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter"
                    >
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="mt-4 max-w-3xl text-base font-light leading-relaxed text-ink sm:text-lg">
                        {section.description}
                      </p>
                    )}
                  </div>

                  <LocationDirectory sectionKey={section.id} />
                </section>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
