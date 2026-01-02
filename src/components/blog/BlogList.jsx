import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import * as api from '../../services/api';
import { siteConfig } from '../../data/siteConfig';
import BlogSEO from './BlogSEO';

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [allPosts, setAllPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        api.getAllPosts(),
        api.getCategories()
      ]);
      setAllPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erreur chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = activeCategory === 'all'
    ? allPosts
    : allPosts.filter(post => post.categorySlug === activeCategory);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: fr });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#636e72]">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogSEO
        title={`Blog Nutrition et Bien-être | ${siteConfig.professional.fullName}`}
        description="Conseils en nutrition, recettes santé et astuces bien-être par Pauline Rolland, diététicienne à Dijon. Articles pour manger équilibré au quotidien."
      />

      <div className="min-h-screen bg-[#faf8f5]">
        {/* Hero section */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#f0ebe3] to-[#faf8f5]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2d3436] mb-4">
              Le Blog
            </h1>
            <p className="text-lg md:text-xl text-[#636e72] max-w-2xl mx-auto">
              Conseils nutrition, recettes santé et astuces bien-être pour vous accompagner au quotidien
            </p>
          </div>
        </section>

        {/* Categories filter */}
        <section className="py-6 border-b border-[#e8e4de]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-[#7c9082] text-white shadow-md'
                      : 'bg-white text-[#636e72] hover:bg-[#f0ebe3] border border-[#e8e4de]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#636e72] text-lg">
                  Aucun article dans cette catégorie pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 card-hover group"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      {/* Image container */}
                      <div className="relative h-48 bg-gradient-to-br from-[#a8bfae] to-[#7c9082] overflow-hidden">
                        {post.coverImage && !post.coverImage.includes('placeholder') ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-white/40"
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
                        {/* Category badge */}
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#5a6b5e] text-xs font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-[#636e72] mb-3">
                          <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                          </time>
                          <span>•</span>
                          <span>{post.readingTime} min de lecture</span>
                        </div>

                        <h2 className="text-lg font-semibold text-[#2d3436] mb-2 group-hover:text-[#7c9082] transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-[#636e72] text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 flex items-center text-[#7c9082] font-medium text-sm group-hover:gap-2 transition-all">
                          <span>Lire l'article</span>
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
            )}
          </div>
        </section>

        {/* CTA section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#7c9082] to-[#5a6b5e]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Je vous aide à atteindre vos objectifs nutritionnels avec un suivi adapté à votre mode de vie.
            </p>
            <a
              href={siteConfig.contact.doctolibUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#5a6b5e] px-6 py-3 rounded-full font-medium hover:bg-[#f0ebe3] transition-colors"
            >
              Prendre rendez-vous
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogList;
