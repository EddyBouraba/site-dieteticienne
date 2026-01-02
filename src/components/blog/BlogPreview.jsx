import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import * as api from '../../services/api';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const BlogPreview = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('BlogPreview: Chargement des articles...');
        const posts = await api.getRecentPosts(3);
        console.log('BlogPreview: Articles reçus:', posts);
        setRecentPosts(posts);
      } catch (error) {
        console.error('BlogPreview: Erreur chargement articles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'd MMM yyyy', { locale: fr });
  };

  if (loading) {
    return (
      <section id="blog" className="section-padding bg-[#f0ebe3]">
        <div className="container-custom text-center">
          <div className="w-10 h-10 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (recentPosts.length === 0) {
    return (
      <section id="blog" className="section-padding bg-[#f0ebe3]">
        <div className="container-custom text-center">
          <p className="text-[#636e72]">Aucun article disponible</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-[#f0ebe3]">
      <div
        ref={ref}
        className={`container-custom ${isVisible ? 'animate-fade-in' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2d3436] mb-4">
            Conseils & Actualités
          </h2>
          <p className="text-[#636e72] max-w-2xl mx-auto">
            Retrouvez mes derniers articles sur la nutrition, le bien-être et les bonnes pratiques alimentaires
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {recentPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 card-hover group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-[#a8bfae] to-[#7c9082] overflow-hidden">
                  {post.coverImage && !post.coverImage.includes('placeholder') ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#5a6b5e] text-xs font-medium px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-[#636e72]"
                  >
                    {formatDate(post.publishedAt)}
                  </time>

                  <h3 className="text-lg font-semibold text-[#2d3436] mt-2 mb-2 group-hover:text-[#7c9082] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#636e72] line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-3 flex items-center text-[#7c9082] font-medium text-sm">
                    <span>Lire</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#7c9082] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5a6b5e] transition-colors"
          >
            Voir tous les articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
