import React from 'react';

export default function About() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">About Us</h2>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
        Dedicated to <span className="text-gold">Quality</span> and the <span className="text-gold">Planet</span>.
      </h1>
      <p className="text-lg sm:text-xl text-slate opacity-80 max-w-3xl font-light leading-relaxed mb-16">
        We are a premium eco-friendly laundry and dry cleaning service. 
        Our closed-loop technology and pH-neutral bio-enzymes ensure your garments receive the best care possible, without harming the environment.
      </p>

      <div className="max-w-4xl space-y-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
          Why Choose Us?
        </h3>
        
        <div className="space-y-6 text-slate opacity-80 text-base sm:text-lg font-light leading-relaxed">
          <p>
            With over 25 years of experience, we provide expert laundry and dry-cleaning services with quality, care, and attention to detail. All work is carried out at our own premises, ensuring consistent standards and reliable results.
          </p>
          <p>
            We specialise in the care of designer and premium garments, using professional techniques and products to help protect delicate fabrics, maintain garment quality, and preserve their appearance. Whether it's everyday clothing or luxury fashion, every item receives the attention it deserves.
          </p>
          <p>
            We use eco-friendly cleaning products and detergents that are gentle on your clothes, kinder to your skin, and better for the environment. Combined with competitive pricing, friendly service, and a commitment to excellence, The Laundry Man is a name you can trust.
          </p>
        </div>
      </div>
    </div>
  );
}
