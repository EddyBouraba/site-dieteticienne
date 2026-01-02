/**
 * Gestionnaire de stockage des articles de blog
 * Utilise localStorage pour persister les données côté navigateur
 */

import { blogPosts as defaultPosts, blogCategories } from './blogPosts';

const STORAGE_KEY = 'blog_articles';

/**
 * Initialise le stockage avec les articles par défaut si vide
 */
const initializeStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  }
};

/**
 * Récupère tous les articles depuis le stockage
 */
export const getAllPosts = () => {
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEY);
  const posts = JSON.parse(stored);
  return posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

/**
 * Récupère un article par son slug
 */
export const getPostBySlug = (slug) => {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
};

/**
 * Récupère un article par son ID
 */
export const getPostById = (id) => {
  const posts = getAllPosts();
  return posts.find(post => post.id === id);
};

/**
 * Récupère les articles par catégorie
 */
export const getPostsByCategory = (categorySlug) => {
  const posts = getAllPosts();
  if (categorySlug === 'all') return posts;
  return posts.filter(post => post.categorySlug === categorySlug);
};

/**
 * Récupère les articles mis en avant
 */
export const getFeaturedPosts = () => {
  const posts = getAllPosts();
  return posts.filter(post => post.featured);
};

/**
 * Récupère les articles récents
 */
export const getRecentPosts = (limit = 3) => {
  return getAllPosts().slice(0, limit);
};

/**
 * Génère un nouvel ID unique
 */
const generateId = () => {
  const posts = getAllPosts();
  if (posts.length === 0) return 1;
  return Math.max(...posts.map(p => p.id)) + 1;
};

/**
 * Génère le slug à partir du titre
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

/**
 * Génère le categorySlug à partir de la catégorie
 */
const generateCategorySlug = (category) => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
};

/**
 * Calcule le temps de lecture estimé
 */
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

/**
 * Crée un nouvel article
 */
export const createPost = (postData) => {
  const posts = getAllPosts();

  const newPost = {
    id: generateId(),
    title: postData.title,
    slug: postData.slug || generateSlug(postData.title),
    excerpt: postData.excerpt,
    coverImage: postData.coverImage || '/images/blog/default.jpg',
    category: postData.category,
    categorySlug: generateCategorySlug(postData.category),
    author: 'Pauline Rolland',
    publishedAt: postData.publishedAt || new Date().toISOString().split('T')[0],
    metaTitle: postData.metaTitle || `${postData.title} | Conseils diététicienne Dijon`,
    metaDescription: postData.metaDescription || postData.excerpt,
    featured: postData.featured || false,
    readingTime: calculateReadingTime(postData.content),
    content: postData.content,
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

  return newPost;
};

/**
 * Met à jour un article existant
 */
export const updatePost = (id, postData) => {
  const posts = getAllPosts();
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    throw new Error('Article non trouvé');
  }

  const updatedPost = {
    ...posts[index],
    ...postData,
    categorySlug: generateCategorySlug(postData.category || posts[index].category),
    readingTime: calculateReadingTime(postData.content || posts[index].content),
  };

  posts[index] = updatedPost;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

  return updatedPost;
};

/**
 * Supprime un article
 */
export const deletePost = (id) => {
  const posts = getAllPosts();
  const filteredPosts = posts.filter(post => post.id !== id);

  if (filteredPosts.length === posts.length) {
    throw new Error('Article non trouvé');
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  return true;
};

/**
 * Réinitialise les articles avec les valeurs par défaut
 */
export const resetToDefaults = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
};

/**
 * Exporte les catégories
 */
export { blogCategories };
