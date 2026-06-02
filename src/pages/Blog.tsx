import React from 'react';

export default function Blog() {
  return (
    <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <h2 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Our Insights</h2>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
        The Laundry <span className="text-gold">Blog</span>.
      </h1>
      <p className="text-lg sm:text-xl text-slate opacity-80 max-w-3xl font-light leading-relaxed mb-12">
        Read about garment care tips, our eco-friendly practices, and industry news.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
           <div key={item} className="glass-card p-8">
             <div className="h-40 bg-white/5 rounded-xl mb-6"></div>
             <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Garment Care</p>
             <h3 className="text-xl font-bold text-white mb-3">How to care for your delicate silks</h3>
             <p className="text-sm text-slate opacity-60 font-light">Learn the best practices to maintain the sheen and quality of your silk garments at home...</p>
           </div>
        ))}
      </div>
    </div>
  );
}
