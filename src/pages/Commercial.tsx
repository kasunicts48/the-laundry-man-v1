import React from 'react';
import ContactForm from '../components/ContactForm';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';

export default function Commercial() {
  return (
    <>
      <InnerPageHeader
        eyebrow="Corporate Solutions"
        title={
          <>
            Commercial <InnerPageTitleHighlight>Cleaning</InnerPageTitleHighlight>.
          </>
        }
        description="Reliable, high-volume laundry and dry cleaning services for hotels, restaurants, and businesses. Get customized pricing and scheduled collections to keep your operations running smoothly."
      />

      <div className="pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
        <div className="max-w-4xl space-y-6 text-ink text-base sm:text-lg font-light leading-relaxed mb-16">
          <p>
            The Laundry Man has provided laundry and dry cleaning services to a wide range of businesses
            in London and Manchester. We have over 15 years&apos; experience serving hotels, retailers,
            restaurants, B&amp;Bs, gyms, nurseries, and many more.
          </p>
          <p>
            We offer a fast turnaround time with unbeatable prices. For more details, please contact our
            commercial team.
          </p>
        </div>

        <ContactForm
          defaultSubject="Commercial Enquiry"
          heading="Contact Our Commercial Team"
          description="Tell us about your business and laundry needs. Fill in the form below and our commercial team will get back to you with pricing and service details."
        />
      </div>
    </>
  );
}
