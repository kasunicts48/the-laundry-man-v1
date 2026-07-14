import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getBlogPageCount,
  getBlogPostsForPage,
} from '../data/blogPosts';
import InnerPageHeader, { InnerPageTitleHighlight } from '../components/InnerPageHeader';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded-full border border-phone-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-gold/30 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`min-w-10 cursor-pointer rounded-full border px-3 py-2 text-xs font-bold transition-colors ${
            page === currentPage
              ? 'border-gold bg-gold text-navy'
              : 'border-phone-border text-ink hover:border-gold/30 hover:text-gold'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded-full border border-phone-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-gold/30 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = getBlogPageCount();
  const currentPosts = getBlogPostsForPage(currentPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

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

      <div className="min-h-[70vh] bg-navy px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className="glass-card flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-gold/30"
              >
                <div className="h-44 overflow-hidden bg-white/5">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {post.category && (
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">
                      {post.category}
                    </p>
                  )}
                  <h2 className="mb-3 text-xl font-bold leading-snug text-white">{post.title}</h2>
                  <p className="mb-6 flex-1 text-sm font-light leading-relaxed text-ink line-clamp-4">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex w-fit items-center justify-center rounded-full border border-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-navy"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
