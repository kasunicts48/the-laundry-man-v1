import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostById, type BlogContentBlock } from '../data/blogPosts';

function BlogContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="space-y-6 text-ink font-light leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return <p key={index}>{block.text}</p>;
        }

        if (block.type === 'label') {
          return (
            <p key={index}>
              <strong className="text-white font-bold">{block.label}: </strong>
              {block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag key={index} className={`space-y-4 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ListTag>
          );
        }

        return (
          <div key={index} className="overflow-hidden rounded-xl border border-white/10">
            <img src={block.src} alt={block.alt} className="w-full h-auto object-cover" />
          </div>
        );
      })}
    </div>
  );
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(id) : undefined;

  if (!post) {
    return (
      <div className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
        <h1 className="text-3xl font-extrabold text-white mb-4">Article not found</h1>
        <p className="text-ink font-light">The blog post you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-20 min-h-[70vh] bg-navy px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest mb-8 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {post.category && (
        <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{post.category}</p>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
      <p className="text-sm text-ink font-light mb-8">{post.date}</p>

      <div className="overflow-hidden rounded-2xl border border-white/10 mb-10">
        <img src={post.image} alt={post.imageAlt} className="w-full h-auto max-h-[420px] object-cover" />
      </div>

      <BlogContent blocks={post.content} />
    </article>
  );
}
