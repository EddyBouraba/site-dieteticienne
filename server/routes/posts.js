import express from 'express';
import sanitizeHtml from 'sanitize-html';
import { authenticateToken } from '../middleware/auth.js';
import {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  resetToDefaults,
  getCategories
} from '../data/posts.js';

const router = express.Router();

// Configuration de sanitization sécurisée
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height'],
    a: ['href', 'title', 'target', 'rel']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  disallowedTagsMode: 'discard'
};

const sanitize = (str) => str ? sanitizeHtml(str, sanitizeOptions) : str;

/**
 * GET /api/posts
 * Récupère tous les articles (public)
 */
router.get('/', (req, res) => {
  try {
    const posts = getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Erreur récupération posts:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
  }
});

/**
 * GET /api/posts/categories
 * Récupère les catégories (public)
 */
router.get('/categories', (req, res) => {
  try {
    const categories = getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories.' });
  }
});

/**
 * GET /api/posts/slug/:slug
 * Récupère un article par son slug (public)
 */
router.get('/slug/:slug', (req, res) => {
  try {
    const post = getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Article non trouvé.' });
    }
    res.json(post);
  } catch (error) {
    console.error('Erreur récupération post:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article.' });
  }
});

/**
 * GET /api/posts/:id
 * Récupère un article par son ID (protégé - admin)
 */
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({ error: 'Article non trouvé.' });
    }
    res.json(post);
  } catch (error) {
    console.error('Erreur récupération post:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article.' });
  }
});

/**
 * POST /api/posts
 * Crée un nouvel article (protégé - admin)
 */
router.post('/', authenticateToken, (req, res) => {
  try {
    const postData = req.body;

    // Validation basique
    if (!postData.title || !postData.title.trim()) {
      return res.status(400).json({ error: 'Le titre est obligatoire.' });
    }
    if (!postData.excerpt || !postData.excerpt.trim()) {
      return res.status(400).json({ error: 'Le résumé est obligatoire.' });
    }
    if (!postData.content || !postData.content.trim()) {
      return res.status(400).json({ error: 'Le contenu est obligatoire.' });
    }
    if (!postData.category || !postData.category.trim()) {
      return res.status(400).json({ error: 'La catégorie est obligatoire.' });
    }

    // Sanitization robuste avec sanitize-html
    postData.title = sanitize(postData.title);
    postData.excerpt = sanitize(postData.excerpt);
    postData.content = sanitize(postData.content);

    const newPost = createPost(postData);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erreur création post:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'article.' });
  }
});

/**
 * PUT /api/posts/:id
 * Met à jour un article (protégé - admin)
 */
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const postData = req.body;

    // Validation
    if (!postData.title || !postData.title.trim()) {
      return res.status(400).json({ error: 'Le titre est obligatoire.' });
    }

    // Sanitization robuste avec sanitize-html
    postData.title = sanitize(postData.title);
    postData.excerpt = sanitize(postData.excerpt);
    postData.content = sanitize(postData.content);

    const updatedPost = updatePost(id, postData);
    res.json(updatedPost);
  } catch (error) {
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ error: 'Article non trouvé.' });
    }
    console.error('Erreur mise à jour post:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article.' });
  }
});

/**
 * DELETE /api/posts/:id
 * Supprime un article (protégé - admin)
 */
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    deletePost(id);
    res.json({ message: 'Article supprimé avec succès.' });
  } catch (error) {
    if (error.message === 'Article non trouvé') {
      return res.status(404).json({ error: 'Article non trouvé.' });
    }
    console.error('Erreur suppression post:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'article.' });
  }
});

/**
 * POST /api/posts/reset
 * Réinitialise les articles par défaut (protégé - admin)
 */
router.post('/reset', authenticateToken, (req, res) => {
  try {
    const posts = resetToDefaults();
    res.json({ message: 'Articles réinitialisés avec succès.', posts });
  } catch (error) {
    console.error('Erreur réinitialisation:', error);
    res.status(500).json({ error: 'Erreur lors de la réinitialisation.' });
  }
});

export default router;
