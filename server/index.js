import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Security headers - désactivé pour /admin (TinaCMS)
app.use((req, res, next) => {
  // Pas de CSP pour TinaCMS admin
  if (req.path.startsWith('/admin')) {
    return next();
  }

  // CSP pour le reste du site en production
  if (isProduction) {
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "blob:"],
          connectSrc: ["'self'", "https://www.doctolib.fr", "https://formspree.io"],
          frameSrc: ["'self'", "https://www.doctolib.fr"],
        }
      }
    })(req, res, next);
  } else {
    next();
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Servir les fichiers statiques en production
if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist');

  // Servir les fichiers statiques
  app.use(express.static(distPath));

  // Fallback SPA : renvoyer index.html pour les routes non-API
  // Exclure /admin qui a son propre index.html (TinaCMS)
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// 404 pour les routes API non trouvées
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
});
