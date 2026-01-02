/**
 * Service API pour communiquer avec le backend
 */

// En production, utiliser l'URL relative /api (même serveur)
// En développement, utiliser localhost:3001
const API_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');

/**
 * Récupère le token d'authentification
 */
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Headers par défaut pour les requêtes
 */
const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Gestion des erreurs de réponse
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(error.error || 'Erreur serveur');
  }
  return response.json();
};

// ============ POSTS (Articles) ============

/**
 * Récupère tous les articles (public)
 */
export const getAllPosts = async () => {
  const response = await fetch(`${API_URL}/posts`, {
    headers: getHeaders()
  });
  return handleResponse(response);
};

/**
 * Récupère un article par son slug (public)
 */
export const getPostBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/posts/slug/${slug}`, {
    headers: getHeaders()
  });
  return handleResponse(response);
};

/**
 * Récupère un article par son ID (authentifié)
 */
export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: getHeaders(true)
  });
  return handleResponse(response);
};

/**
 * Crée un nouvel article (authentifié)
 */
export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(postData)
  });
  return handleResponse(response);
};

/**
 * Met à jour un article (authentifié)
 */
export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(postData)
  });
  return handleResponse(response);
};

/**
 * Supprime un article (authentifié)
 */
export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true)
  });
  return handleResponse(response);
};

/**
 * Réinitialise les articles par défaut (authentifié)
 */
export const resetToDefaults = async () => {
  const response = await fetch(`${API_URL}/posts/reset`, {
    method: 'POST',
    headers: getHeaders(true)
  });
  return handleResponse(response);
};

/**
 * Récupère les catégories (public)
 */
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/posts/categories`, {
    headers: getHeaders()
  });
  return handleResponse(response);
};

// ============ Fonctions utilitaires ============

/**
 * Récupère les articles par catégorie
 */
export const getPostsByCategory = async (categorySlug) => {
  const posts = await getAllPosts();
  if (categorySlug === 'all') return posts;
  return posts.filter(post => post.categorySlug === categorySlug);
};

/**
 * Récupère les articles mis en avant
 */
export const getFeaturedPosts = async () => {
  const posts = await getAllPosts();
  return posts.filter(post => post.featured);
};

/**
 * Récupère les articles récents
 */
export const getRecentPosts = async (limit = 3) => {
  const posts = await getAllPosts();
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

/**
 * Calcule le temps de lecture
 */
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export default {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  resetToDefaults,
  getCategories,
  getPostsByCategory,
  getFeaturedPosts,
  getRecentPosts,
  generateSlug,
  calculateReadingTime
};
