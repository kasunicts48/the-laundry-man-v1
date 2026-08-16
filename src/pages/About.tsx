import React from 'react';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';

export default function About() {
  return (
    <>
      <InnerPageHeader
        eyebrow="About Us"
        title={
          <>
            Dedicated to <InnerPageTitleHighlight>Quality</InnerPageTitleHighlight> and the{' '}
            <InnerPageTitleHighlight>Planet</InnerPageTitleHighlight>
          </>
        }
        description="We are a premium eco-friendly laundry and dry cleaning service. Our closed-loop technology and pH-neutral bio-enzymes ensure your garments receive the best care possible, without harming the environment."
      />

      <div className="pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 flex flex-col justify-center">
        <div className="max-w-4xl space-y-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate sm:text-4xl">
            Why The Laundry Man App?
          </h2>

          <div className="space-y-6 text-ink text-base sm:text-lg font-light leading-relaxed">
            <p>
              With over 25 years of experience, we provide expert laundry and dry-cleaning services with
              quality, care, and attention to detail. All work is carried out at our own premises,
              ensuring consistent standards and reliable results.
            </p>
            <p>
              We specialise in the care of designer and premium garments, using professional techniques
              and products to help protect delicate fabrics, maintain garment quality, and preserve
              their appearance. Whether it&apos;s everyday clothing or luxury fashion, every item receives
              the attention it deserves.
            </p>
            <p>
              We use eco-friendly cleaning products and detergents that are gentle on your clothes,
              kinder to your skin, and better for the environment. Combined with competitive pricing,
              friendly service, and a commitment to excellence, The Laundry Man is a name you can trust.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
