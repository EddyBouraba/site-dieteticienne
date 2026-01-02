import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as api from '../../services/api';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Nutrition',
    coverImage: '/images/blog/',
    publishedAt: new Date().toISOString().split('T')[0],
    metaTitle: '',
    metaDescription: '',
    featured: false,
    content: '',
  });

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadPost();
    }
  }, [id, isEditing]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data.filter(c => c.id !== 'all'));
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const post = await api.getPostById(parseInt(id));
      if (post) {
        setArticle({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          coverImage: post.coverImage,
          publishedAt: post.publishedAt,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          featured: post.featured,
          content: post.content,
        });
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Erreur chargement article:', error);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setArticle({
      ...article,
      title,
      slug: isEditing ? article.slug : api.generateSlug(title),
      metaTitle: article.metaTitle || (title ? `${title} | Conseils diététicienne Dijon` : ''),
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle({
      ...article,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    if (!article.title.trim()) {
      setError('Le titre est obligatoire');
      return false;
    }
    if (!article.excerpt.trim()) {
      setError('Le résumé est obligatoire');
      return false;
    }
    if (!article.content.trim()) {
      setError('Le contenu est obligatoire');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setSaving(true);

    try {
      if (isEditing) {
        await api.updatePost(parseInt(id), article);
      } else {
        await api.createPost(article);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c9082] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#636e72]">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="p-2 text-[#636e72] hover:text-[#7c9082] hover:bg-white rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-2xl font-semibold text-[#2d3436]">
            {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Titre de l'article <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={article.title}
                onChange={handleTitleChange}
                placeholder="Ex: Les bienfaits des légumes de saison"
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                URL de l'article
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#636e72] text-sm">/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={article.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Catégorie + Date */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2d3436] mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={article.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d3436] mb-2">
                  Date de publication
                </label>
                <input
                  type="date"
                  name="publishedAt"
                  value={article.publishedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Résumé */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Résumé <span className="text-red-500">*</span>
              </label>
              <textarea
                name="excerpt"
                value={article.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="2-3 phrases qui donnent envie de lire l'article..."
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors resize-none"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Image de couverture
              </label>
              <input
                type="text"
                name="coverImage"
                value={article.coverImage}
                onChange={handleChange}
                placeholder="/images/blog/mon-image.jpg"
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
              />
              <p className="text-sm text-[#636e72] mt-1">
                Placez votre image dans <code className="bg-[#f0ebe3] px-1 rounded">public/images/blog/</code>
              </p>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={article.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[#e8e4de] text-[#7c9082] focus:ring-[#7c9082]"
              />
              <label htmlFor="featured" className="text-sm text-[#2d3436]">
                Mettre cet article en avant sur la page d'accueil
              </label>
            </div>

            {/* SEO */}
            <div className="bg-[#f0ebe3] rounded-xl p-6 space-y-4">
              <h3 className="font-medium text-[#2d3436] flex items-center gap-2">
                <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEO (référencement Google)
              </h3>

              <div>
                <label className="block text-sm font-medium text-[#2d3436] mb-2">
                  Titre SEO
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={article.metaTitle}
                  onChange={handleChange}
                  placeholder="Titre pour Google (50-60 caractères)"
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors bg-white"
                />
                <p className="text-sm text-[#636e72] mt-1">
                  {article.metaTitle.length}/60 caractères
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d3436] mb-2">
                  Description SEO
                </label>
                <textarea
                  name="metaDescription"
                  value={article.metaDescription}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Description pour Google (150-160 caractères)"
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors resize-none bg-white"
                />
                <p className="text-sm text-[#636e72] mt-1">
                  {article.metaDescription.length}/160 caractères
                </p>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Contenu de l'article <span className="text-red-500">*</span>
              </label>
              <div className="bg-[#f0ebe3] rounded-lg p-4 mb-3">
                <p className="text-sm text-[#636e72] mb-2 font-medium">Format Markdown :</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-[#636e72]">
                  <div><code className="bg-white px-1 rounded">## Titre</code> → Titre de section</div>
                  <div><code className="bg-white px-1 rounded">### Sous-titre</code> → Sous-titre</div>
                  <div><code className="bg-white px-1 rounded">**texte**</code> → <strong>gras</strong></div>
                  <div><code className="bg-white px-1 rounded">- élément</code> → liste à puces</div>
                </div>
              </div>
              <textarea
                name="content"
                value={article.content}
                onChange={handleChange}
                rows={20}
                placeholder="Écrivez votre article ici..."
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors font-mono text-sm"
              />
              <p className="text-sm text-[#636e72] mt-1">
                Temps de lecture estimé : {api.calculateReadingTime(article.content)} min
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e8e4de]">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7c9082] text-white py-3 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEditing ? 'Enregistrer les modifications' : 'Publier l\'article'}
                  </>
                )}
              </button>
              <Link
                to="/admin"
                className="px-6 py-3 border border-[#e8e4de] rounded-lg text-[#636e72] hover:bg-[#f0ebe3] transition-colors text-center"
              >
                Annuler
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;
