import React from 'react';
import { useLocation } from 'react-router-dom';

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

  return (
    <section className="inner-page-banner relative z-10 bg-[#4caf50] rounded-b-[30px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className={`max-w-7xl mx-auto ${centered ? 'text-center' : ''}`}>
        <p className="text-[10px] uppercase tracking-widest text-emerald-100 font-bold mb-2">
          {eyebrow}
        </p>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          {title}
        </h1>
        {description && (
          <p
            className={`text-base sm:text-xl text-emerald-50 font-light leading-relaxed mt-4 max-w-3xl ${
              centered ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
