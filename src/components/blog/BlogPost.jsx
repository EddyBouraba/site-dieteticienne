import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as api from '../../services/api';
import { siteConfig } from '../../data/siteConfig';
import BlogSEO from './BlogSEO';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const [postData, allPosts] = await Promise.all([
        api.getPostBySlug(slug),
        api.getAllPosts()
      ]);

      if (!postData) {
        setNotFound(true);
        return;
      }

      setPost(postData);
      setRecentPosts(allPosts.filter(p => p.slug !== slug).slice(0, 2));
    } catch (error) {
      console.error('Erreur chargement article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'd MMMM yyyy', { locale: fr });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#636e72]">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  // Si l'article n'existe pas
  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-semibold text-[#2d3436] mb-4">
            Article non trouvé
          </h1>
          <p className="text-[#636e72] mb-6">
            Désolé, cet article n'existe pas ou a été déplacé.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#7c9082] text-white px-6 py-3 rounded-full font-medium hover:bg-[#5a6b5e] transition-colors"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Composants personnalisés pour ReactMarkdown
  const markdownComponents = {
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-[#2d3436] mt-10 mb-4 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-[#2d3436] mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[#2d3436] leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-[#2d3436]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 text-[#2d3436]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-[#5a6b5e]">
        {children}
      </strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#7c9082] pl-4 py-2 my-6 bg-[#f0ebe3] rounded-r-lg italic text-[#636e72]">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <Link
        to={href}
        className="text-[#7c9082] underline hover:text-[#5a6b5e] transition-colors"
      >
        {children}
      </Link>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[#7c9082] text-white">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-medium">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-t border-[#e8e4de]">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-8 border-t-2 border-[#e8e4de]" />
    ),
    code: ({ children }) => (
      <code className="bg-[#f0ebe3] px-2 py-1 rounded text-sm text-[#5a6b5e]">
        {children}
      </code>
    ),
  };

  return (
    <>
      <BlogSEO
        title={post.metaTitle}
        description={post.metaDescription}
        image={post.coverImage}
        article={true}
        publishedAt={post.publishedAt}
      />

      <article className="min-h-screen bg-[#faf8f5]">
        {/* Hero section */}
        <header className="pt-28 pb-8 md:pt-36 md:pb-12 bg-gradient-to-b from-[#f0ebe3] to-[#faf8f5]">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#636e72] mb-6">
              <Link to="/" className="hover:text-[#7c9082] transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-[#7c9082] transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#2d3436] truncate">{post.title}</span>
            </nav>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#7c9082] text-white text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-[#636e72] text-sm">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-[#636e72] text-sm">
                • {post.readingTime} min de lecture
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2d3436] leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8bfae] to-[#7c9082] flex items-center justify-center text-white font-medium">
                PR
              </div>
              <div>
                <p className="font-medium text-[#2d3436]">{post.author}</p>
                <p className="text-sm text-[#636e72]">Diététicienne diplômée</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-4">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#a8bfae] to-[#7c9082] shadow-lg">
              {!post.coverImage.includes('placeholder') ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share & Back */}
          <div className="mt-12 pt-8 border-t border-[#e8e4de] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-[#636e72] hover:text-[#7c9082] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#636e72]">Partager :</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f0ebe3] hover:bg-[#7c9082] hover:text-white flex items-center justify-center text-[#636e72] transition-colors"
                aria-label="Partager sur Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f0ebe3] hover:bg-[#7c9082] hover:text-white flex items-center justify-center text-[#636e72] transition-colors"
                aria-label="Partager sur Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f0ebe3] hover:bg-[#7c9082] hover:text-white flex items-center justify-center text-[#636e72] transition-colors"
                aria-label="Partager sur LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {recentPosts.length > 0 && (
          <section className="py-12 bg-[#f0ebe3]">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <h2 className="text-2xl font-semibold text-[#2d3436] mb-8 text-center">
                Autres articles qui pourraient vous intéresser
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {recentPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <span className="text-sm text-[#7c9082] font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#2d3436] mt-2 group-hover:text-[#7c9082] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[#636e72] text-sm mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-[#7c9082] to-[#5a6b5e]">
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Envie d'aller plus loin ?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Je vous accompagne avec un suivi diététique personnalisé adapté à vos objectifs.
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
      </article>
    </>
  );
};

export default BlogPost;
