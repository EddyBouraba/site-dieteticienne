import { useState } from 'react';
import { blogCategories } from '../../data/blogPosts';

/**
 * Générateur d'article pour non-développeurs
 *
 * Ce composant génère le code JavaScript à copier/coller dans blogPosts.js
 * C'est la solution la plus simple pour une personne non-technique
 */
const ArticleEditor = () => {
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Nutrition',
    coverImage: '/images/blog/',
    metaTitle: '',
    metaDescription: '',
    featured: false,
    content: '',
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Génère automatiquement le slug à partir du titre
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/-+/g, '-') // Évite les tirets multiples
      .trim();
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setArticle({
      ...article,
      title,
      slug: generateSlug(title),
      metaTitle: title ? `${title} | Conseils diététicienne Dijon` : '',
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle({
      ...article,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Calcul du temps de lecture estimé
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  // Génère le code JavaScript de l'article
  const generateCode = () => {
    const today = new Date().toISOString().split('T')[0];
    const categorySlug = article.category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');

    const code = `  {
    id: /* REMPLACEZ PAR LE PROCHAIN ID DISPONIBLE */,
    title: "${article.title.replace(/"/g, '\\"')}",
    slug: "${article.slug}",
    excerpt: "${article.excerpt.replace(/"/g, '\\"')}",
    coverImage: "${article.coverImage}",
    category: "${article.category}",
    categorySlug: "${categorySlug}",
    author: "Pauline Rolland",
    publishedAt: "${today}",
    metaTitle: "${article.metaTitle.replace(/"/g, '\\"')}",
    metaDescription: "${article.metaDescription.replace(/"/g, '\\"')}",
    featured: ${article.featured},
    readingTime: ${calculateReadingTime(article.content)},
    content: \`${article.content.replace(/`/g, '\\`')}\`
  },`;

    setGeneratedCode(code);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur de copie:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-[#2d3436] mb-2">
            Créer un nouvel article
          </h1>
          <p className="text-[#636e72] mb-8">
            Remplissez le formulaire, puis copiez le code généré dans le fichier{' '}
            <code className="bg-[#f0ebe3] px-2 py-1 rounded text-sm">src/data/blogPosts.js</code>
          </p>

          <div className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Titre de l'article *
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

            {/* Slug (auto-généré) */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                URL de l'article (générée automatiquement)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[#636e72]">/blog/</span>
                <input
                  type="text"
                  name="slug"
                  value={article.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={article.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors bg-white"
              >
                {blogCategories.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Résumé */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Résumé (affiché dans la liste des articles) *
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
                Chemin de l'image de couverture
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

            {/* SEO */}
            <div className="bg-[#f0ebe3] rounded-xl p-6 space-y-4">
              <h3 className="font-medium text-[#2d3436]">SEO (référencement Google)</h3>

              <div>
                <label className="block text-sm font-medium text-[#2d3436] mb-2">
                  Titre SEO (affiché dans Google)
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={article.metaTitle}
                  onChange={handleChange}
                  placeholder="Titre pour Google (50-60 caractères)"
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors resize-none"
                />
                <p className="text-sm text-[#636e72] mt-1">
                  {article.metaDescription.length}/160 caractères
                </p>
              </div>
            </div>

            {/* Article mis en avant */}
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

            {/* Contenu */}
            <div>
              <label className="block text-sm font-medium text-[#2d3436] mb-2">
                Contenu de l'article (format Markdown) *
              </label>
              <div className="bg-[#f0ebe3] rounded-lg p-4 mb-3">
                <p className="text-sm text-[#636e72] mb-2">Aide Markdown :</p>
                <ul className="text-sm text-[#636e72] space-y-1">
                  <li><code className="bg-white px-1 rounded">## Titre</code> = Titre de section</li>
                  <li><code className="bg-white px-1 rounded">### Sous-titre</code> = Sous-titre</li>
                  <li><code className="bg-white px-1 rounded">**texte**</code> = <strong>texte en gras</strong></li>
                  <li><code className="bg-white px-1 rounded">- élément</code> = liste à puces</li>
                  <li><code className="bg-white px-1 rounded">1. élément</code> = liste numérotée</li>
                </ul>
              </div>
              <textarea
                name="content"
                value={article.content}
                onChange={handleChange}
                rows={15}
                placeholder="Écrivez votre article ici en utilisant le format Markdown..."
                className="w-full px-4 py-3 rounded-lg border border-[#e8e4de] focus:border-[#7c9082] focus:ring-2 focus:ring-[#7c9082]/20 outline-none transition-colors font-mono text-sm"
              />
              <p className="text-sm text-[#636e72] mt-1">
                Temps de lecture estimé : {calculateReadingTime(article.content)} min
              </p>
            </div>

            {/* Bouton générer */}
            <button
              onClick={generateCode}
              className="w-full bg-[#7c9082] text-white py-4 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors"
            >
              Générer le code de l'article
            </button>
          </div>

          {/* Code généré */}
          {generatedCode && (
            <div className="mt-8 pt-8 border-t border-[#e8e4de]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#2d3436]">
                  Code généré
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-[#7c9082] text-white rounded-lg hover:bg-[#5a6b5e] transition-colors"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copié !
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copier
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#2d3436] rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-[#a8bfae] font-mono whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              </div>

              <div className="mt-6 bg-[#f0ebe3] rounded-xl p-6">
                <h3 className="font-medium text-[#2d3436] mb-3">Comment ajouter l'article ?</h3>
                <ol className="space-y-2 text-[#636e72]">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#7c9082] text-white rounded-full flex items-center justify-center text-sm">1</span>
                    <span>Copiez le code ci-dessus</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#7c9082] text-white rounded-full flex items-center justify-center text-sm">2</span>
                    <span>Ouvrez le fichier <code className="bg-white px-1 rounded">src/data/blogPosts.js</code></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#7c9082] text-white rounded-full flex items-center justify-center text-sm">3</span>
                    <span>Collez le code dans le tableau <code className="bg-white px-1 rounded">blogPosts</code> (après le dernier article)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#7c9082] text-white rounded-full flex items-center justify-center text-sm">4</span>
                    <span>Remplacez le numéro <code className="bg-white px-1 rounded">id</code> par le prochain disponible</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-[#7c9082] text-white rounded-full flex items-center justify-center text-sm">5</span>
                    <span>Sauvegardez et déployez !</span>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
