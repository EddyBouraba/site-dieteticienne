import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateCsrfToken, csrfProtection } from './middleware/csrf.js';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Security headers - configuration adaptée pour la production
app.use(helmet({
  contentSecurityPolicy: isProduction ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://www.doctolib.fr"],
      frameSrc: ["'self'", "https://www.doctolib.fr"],
    }
  } : false
}));

// CORS configuration
const allowedOrigins = isProduction
  ? [process.env.FRONTEND_URL, 'https://paulinerolland-dieteticienne.onrender.com']
  : ['http://localhost:5173', 'http://localhost:3001'];

app.use(cors({
  origin: (origin, callback) => {
    // Permettre les requêtes sans origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting - uniquement sur les routes API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes API par fenêtre
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' },
  skip: (req) => req.method === 'OPTIONS', // Ne pas limiter les preflight CORS
});

// Appliquer le rate limiting uniquement aux routes API
app.use('/api', apiLimiter);

// Exporter le limiter pour pouvoir reset après login réussi
export { apiLimiter as limiter };

// Body parser
app.use(express.json());
app.use(cookieParser());

// Route pour obtenir le token CSRF (doit être appelée avant les mutations)
app.get('/api/csrf-token', (req, res) => {
  try {
    const token = generateCsrfToken(req, res);
    res.json({ csrfToken: token });
  } catch (error) {
    console.error('Erreur génération CSRF token:', error);
    res.status(500).json({ error: 'Erreur lors de la génération du token CSRF' });
  }
});

// Protection CSRF sur les routes de mutation (POST, PUT, DELETE)
app.use('/api/posts', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return csrfProtection(req, res, next);
  }
  next();
});

app.use('/api/auth/change-password', csrfProtection);

// Routes
// Note: authLimiter est appliqué uniquement sur /login dans auth.js
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Servir les fichiers statiques en production
if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist');

  // Servir les fichiers statiques
  app.use(express.static(distPath));

  // Fallback SPA : renvoyer index.html pour les routes non-API et non-fichiers
  app.use((req, res, next) => {
    // Si c'est une route API, passer au handler suivant (404)
    if (req.path.startsWith('/api')) {
      return next();
    }
    // Sinon, servir index.html pour le routing côté client
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // 404 handler pour le développement
  app.use((_req, res) => {
    res.status(404).json({ error: 'Route non trouvée.' });
  });
}

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
  if (isProduction) {
    console.log(`Application disponible sur le port ${PORT}`);
  } else {
    console.log(`API disponible sur http://localhost:${PORT}/api`);
  }
});
