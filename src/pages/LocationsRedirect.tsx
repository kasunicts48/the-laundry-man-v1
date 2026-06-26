import { useEffect } from 'react';
import { buildLocationsHref, parseLocationHash, parseLocationSearchParams } from '../utils/locationHash';

/** Redirects legacy /locations route to static HTML, preserving query or hash targets. */
export default function LocationsRedirect() {
  useEffect(() => {
    const hashTarget = parseLocationHash(window.location.hash);
    if (hashTarget) {
      window.location.replace(buildLocationsHref(hashTarget.sectionId, hashTarget.regionId));
      return;
    }

    const queryTarget = parseLocationSearchParams(window.location.search);
    if (queryTarget) {
      window.location.replace(buildLocationsHref(queryTarget.sectionId, queryTarget.regionId));
      return;
    }

    window.location.replace('/locations.html');
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-navy text-ink text-sm font-light">
      Loading locations…
    </div>
  );
}
