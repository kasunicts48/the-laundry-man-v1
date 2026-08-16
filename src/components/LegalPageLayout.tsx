import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InnerPageHeader from './InnerPageHeader';

export interface LegalSection {
  title?: string;
  paragraphs?: string[];
  listItems?: string[];
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: React.ReactNode;
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
    <>
      <InnerPageHeader eyebrow={eyebrow} title={title} description={intro} />

      <article className="pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-12">
        <Link
          to={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gold transition-opacity hover:opacity-80"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <div className="space-y-10">
          {sections.map((section, sectionIndex) => (
            <section key={section.title ?? sectionIndex} className="space-y-4">
              {section.title && (
                <h2 className="border-b border-black/5 pb-3 text-xl font-semibold text-slate sm:text-2xl">
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
    </>
  );
}
