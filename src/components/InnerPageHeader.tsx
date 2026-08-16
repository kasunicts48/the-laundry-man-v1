import React from 'react';
import { useLocation } from 'react-router-dom';
import { getInnerPageIllustration } from '../data/innerPageIllustrations';
import InnerPageBannerIllustration from './InnerPageBannerIllustration';

interface InnerPageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
}

export function InnerPageTitleHighlight({ children }: { children: React.ReactNode }) {
  return <span className="text-paper">{children}</span>;
}

export default function InnerPageHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: InnerPageHeaderProps) {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  const illustration = getInnerPageIllustration(location.pathname);

  return (
    <section className="inner-page-banner relative z-10 rounded-b-[30px] bg-gold px-4 py-10 sm:px-6 sm:py-14 lg:px-8 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
        <div className={`min-w-0 flex-1 ${centered ? 'text-center md:text-left' : 'text-left'}`}>
          <p className="mb-2 text-sm font-medium tracking-wide text-paper/85">{eyebrow}</p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p
              className={`mt-4 max-w-3xl text-base font-light leading-relaxed text-paper/90 sm:text-xl ${
                centered ? 'mx-auto md:mx-0' : ''
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {illustration && <InnerPageBannerIllustration config={illustration} />}
      </div>
    </section>
  );
}
