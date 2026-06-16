import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';

export default function Blog() {
  return (
    <>
      <InnerPageHeader
        eyebrow="Our Insights"
        title={
          <>
            The Laundry <InnerPageTitleHighlight>Blog</InnerPageTitleHighlight>.
          </>
        }
        description="Read about garment care tips, our eco-friendly practices, and industry news."
      />

      <div className="pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="glass-card p-8 block hover:border-gold/30 transition-colors"
            >
              <div className="h-40 bg-white/5 rounded-xl mb-6 overflow-hidden">
                <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
              </div>
              {post.category && (
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{post.category}</p>
              )}
              <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
              <p className="text-sm text-ink font-light">{post.excerpt}...</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
