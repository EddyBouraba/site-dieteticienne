/**
 * Service pour charger les articles depuis les fichiers Markdown
 * Les articles sont stockés dans content/blog/*.md
 */

import matter from 'gray-matter';

// Import de tous les fichiers Markdown du dossier content/blog
const blogFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Calcule le temps de lecture
 */
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

/**
 * Génère un slug pour les catégories
 */
const generateCategorySlug = (category) => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

/**
 * Parse un fichier Markdown et retourne les données de l'article
 */
const parseMarkdownFile = (content, filename) => {
  const { data: frontmatter, content: markdownContent } = matter(content);

  return {
    id: frontmatter.slug || filename.replace('.md', ''),
    slug: frontmatter.slug || filename.replace('.md', ''),
    title: frontmatter.title || 'Sans titre',
    excerpt: frontmatter.excerpt || '',
    content: markdownContent,
    coverImage: frontmatter.coverImage || null,
    category: frontmatter.category || 'Non classé',
    categorySlug: generateCategorySlug(frontmatter.category || 'Non classé'),
    author: frontmatter.author || 'Pauline Rolland',
    publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    metaTitle: frontmatter.metaTitle || frontmatter.title,
    metaDescription: frontmatter.metaDescription || frontmatter.excerpt,
    featured: frontmatter.featured || false,
    readingTime: calculateReadingTime(markdownContent),
  };
};

/**
 * Charge tous les articles
 */
let cachedPosts = null;

const loadAllPosts = () => {
  if (cachedPosts) return cachedPosts;

  const posts = Object.entries(blogFiles).map(([path, content]) => {
    const filename = path.split('/').pop();
    return parseMarkdownFile(content, filename);
  });

  // Trier par date de publication (plus récent en premier)
  cachedPosts = posts.sort((a, b) =>
    new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return cachedPosts;
};

// ============ API Publique ============

/**
 * Récupère tous les articles
 */
export const getAllPosts = async () => {
  return loadAllPosts();
};

/**
 * Récupère un article par son slug
 */
export const getPostBySlug = async (slug) => {
  const posts = loadAllPosts();
  return posts.find(post => post.slug === slug) || null;
};

/**
 * Récupère un article par son ID
 */
export const getPostById = async (id) => {
  const posts = loadAllPosts();
  return posts.find(post => post.id === id) || null;
};

/**
 * Récupère les catégories
 */
export const getCategories = async () => {
  const posts = loadAllPosts();
  const categoriesMap = new Map();

  // Ajouter "Tous les articles" en premier
  categoriesMap.set('all', { id: 'all', name: 'Tous les articles', slug: 'all' });

  // Extraire les catégories uniques
  posts.forEach(post => {
    if (!categoriesMap.has(post.categorySlug)) {
      categoriesMap.set(post.categorySlug, {
        id: post.categorySlug,
        name: post.category,
        slug: post.categorySlug
      });
    }
  });

  return Array.from(categoriesMap.values());
};

/**
 * Récupère les articles par catégorie
 */
export const getPostsByCategory = async (categorySlug) => {
  const posts = loadAllPosts();
  if (categorySlug === 'all') return posts;
  return posts.filter(post => post.categorySlug === categorySlug);
};

/**
 * Récupère les articles mis en avant
 */
export const getFeaturedPosts = async () => {
  const posts = loadAllPosts();
  return posts.filter(post => post.featured);
};

/**
 * Récupère les articles récents
 */
export const getRecentPosts = async (limit = 3) => {
  const posts = loadAllPosts();
  return posts.slice(0, limit);
};

/**
 * Génère un slug à partir du titre
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Fonctions non utilisées avec TinaCMS (édition via GitHub)
export const createPost = async () => { throw new Error('Utilisez TinaCMS pour créer des articles'); };
export const updatePost = async () => { throw new Error('Utilisez TinaCMS pour modifier des articles'); };
export const deletePost = async () => { throw new Error('Utilisez TinaCMS pour supprimer des articles'); };
export const resetToDefaults = async () => { throw new Error('Non disponible avec TinaCMS'); };

export default {
  getAllPosts,
  getPostBySlug,
  getPostById,
  getCategories,
  getPostsByCategory,
  getFeaturedPosts,
  getRecentPosts,
  generateSlug,
  calculateReadingTime
};
