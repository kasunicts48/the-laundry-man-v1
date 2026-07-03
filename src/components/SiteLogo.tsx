import React from 'react';

import { SITE_LOGO_ALT, SITE_LOGO_SRC } from '../data/siteBrand';

interface SiteLogoProps {
  className?: string;
}

export default function SiteLogo({ className = 'h-10 w-10 object-contain sm:h-11 sm:w-11' }: SiteLogoProps) {
  return (
    <img
      src={SITE_LOGO_SRC}
      alt={SITE_LOGO_ALT}
      className={className}
      width={44}
      height={44}
      decoding="async"
    />
  );
}
