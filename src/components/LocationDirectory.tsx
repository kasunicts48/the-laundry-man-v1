import React from 'react';
import { Link } from 'react-router-dom';
import { ukLocationRegions, type UkLocationRegion } from '../data/ukLocations';
import { resolveLocationHref } from '../data/locations';

const linkClassName =
  'text-sm font-light text-ink hover:text-gold transition-colors duration-300 leading-relaxed';

interface LocationDirectoryProps {
  sectionKey?: string;
  regions?: UkLocationRegion[];
}

function LocationLink({ label }: { label: string }) {
  return (
    <Link to={resolveLocationHref(label)} className={linkClassName}>
      {label}
    </Link>
  );
}

function LocationRegionBlock({
  sectionKey,
  id,
  name,
  areas,
}: UkLocationRegion & { sectionKey: string }) {
  const headingId = `location-region-${sectionKey}-${id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="border-b border-white/10 pb-10 mb-10 last:mb-0 last:border-b-0 last:pb-0"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 lg:col-span-2">
          <h3 id={headingId} className="text-lg font-extrabold text-white sm:text-xl">
            <LocationLink label={name} />
          </h3>
          <p className="mt-1 text-xs font-light text-ink">{areas.length} areas</p>
        </div>

        <ul className="md:col-span-9 lg:col-span-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li key={`${sectionKey}-${id}-${area}`}>
              <LocationLink label={area} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function LocationDirectory({
  sectionKey = 'general',
  regions = ukLocationRegions,
}: LocationDirectoryProps) {
  return (
    <div>
      {regions.map((region) => (
        <LocationRegionBlock key={`${sectionKey}-${region.id}`} sectionKey={sectionKey} {...region} />
      ))}
    </div>
  );
}
