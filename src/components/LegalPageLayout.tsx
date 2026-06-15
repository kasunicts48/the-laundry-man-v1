import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface LegalSection {
  title?: string;
  paragraphs?: string[];
  listItems?: string[];
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: LegalSection[];
  backHref?: string;
  backLabel?: string;
}

function renderTextWithEmailLinks(text: string, keyPrefix: string) {
  const parts = text.split(/(info@thelaundryman\.co\.uk)/g);

  return parts.map((part, index) =>
    part === 'info@thelaundryman.co.uk' ? (
      <a
        key={`${keyPrefix}-email-${index}`}
        href="mailto:info@thelaundryman.co.uk"
        className="text-gold hover:opacity-80 transition-opacity"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={`${keyPrefix}-text-${index}`}>{part}</React.Fragment>
    )
  );
}

export default function LegalPageLayout({
  eyebrow,
  title,
  intro,
  sections,
  backHref = '/',
  backLabel = 'Back to Home',
}: LegalPageLayoutProps) {
  return (
    <article className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        to={backHref}
        className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </Link>

      <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">{eyebrow}</p>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">{title}</h1>

      {intro && (
        <p className="text-lg text-ink font-light leading-relaxed mb-12 max-w-3xl">{intro}</p>
      )}

      <div className="space-y-10">
        {sections.map((section, sectionIndex) => (
          <section key={section.title ?? sectionIndex} className="space-y-4">
            {section.title && (
              <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-white/5 pb-3">
                {section.title}
              </h2>
            )}

            {section.paragraphs?.map((paragraph, paragraphIndex) => (
              <p
                key={`${sectionIndex}-p-${paragraphIndex}`}
                className="text-ink font-light leading-relaxed"
              >
                {renderTextWithEmailLinks(paragraph, `${sectionIndex}-p-${paragraphIndex}`)}
              </p>
            ))}

            {section.listItems && section.listItems.length > 0 && (
              <ul className="list-disc pl-5 space-y-2 text-ink font-light leading-relaxed">
                {section.listItems.map((item, itemIndex) => (
                  <li key={`${sectionIndex}-li-${itemIndex}`}>
                    {renderTextWithEmailLinks(item, `${sectionIndex}-li-${itemIndex}`)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
