import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

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
        {blogPosts.map((post) => (
           <Link
             key={post.id}
             to={`/blog/${post.id}`}
             className="glass-card p-8 block hover:border-gold/30 transition-colors"
           >
             <div className="h-40 bg-white/5 rounded-xl mb-6 overflow-hidden">
               <img
                 src={post.image}
                 alt={post.imageAlt}
                 className="w-full h-full object-cover"
               />
             </div>
             {post.category && (
               <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{post.category}</p>
             )}
             <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
             <p className="text-sm text-slate opacity-60 font-light">{post.excerpt}...</p>
           </Link>
        ))}
      </div>
    </div>
  );
}
