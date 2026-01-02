import express from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { generateToken, authenticateToken } from '../middleware/auth.js';
import { getAdmin, updateAdminPassword } from '../data/admin.js';
import { limiter } from '../index.js';

const router = express.Router();

// Rate limiter uniquement pour le login - compte seulement les échecs
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limite les tentatives échouées à 5 par 15 minutes
  message: { error: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.' },
  skip: (req) => req.method === 'OPTIONS',
  // Ne compter que les réponses avec erreur (401, 400, etc.)
  skipSuccessfulRequests: true
});

/**
 * POST /api/auth/login
 * Connexion administrateur
 */
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation des entrées
    if (!username || !password) {
      return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis.' });
    }

    // Récupérer l'admin
    const admin = getAdmin();

    // Vérifier les identifiants
    if (username !== admin.username) {
      // Délai pour éviter le timing attack
      await bcrypt.compare(password, '$2a$12$invalidhashtopreventtimingattacks');
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects.' });
    }

    // Générer le token
    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: 'admin'
    });

    // Reset le rate limiter global pour cette IP après login réussi
    limiter.resetKey(req.ip);

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

/**
 * POST /api/auth/verify
 * Vérifie si le token est valide
 */
router.post('/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

/**
 * POST /api/auth/change-password
 * Changer le mot de passe (nécessite d'être connecté)
 */
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Mot de passe actuel et nouveau mot de passe requis.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
    }

    const admin = getAdmin();
    const isValidPassword = await bcrypt.compare(currentPassword, admin.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });
    }

    // Hash du nouveau mot de passe
    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    updateAdminPassword(newPasswordHash);

    res.json({ message: 'Mot de passe modifié avec succès.' });
  } catch (error) {
    console.error('Erreur changement mot de passe:', error);
    res.status(500).json({ error: 'Erreur lors du changement de mot de passe.' });
  }
});

export default router;
