import Tokens from 'csrf';

const tokens = new Tokens();
const CSRF_SECRET = process.env.CSRF_SECRET || tokens.secretSync();

/**
 * Génère un token CSRF
 */
export const generateCsrfToken = (req, res) => {
  const token = tokens.create(CSRF_SECRET);

  // Stocker le secret dans un cookie httpOnly
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('csrf-secret', CSRF_SECRET, {
    httpOnly: true,
    sameSite: isProduction ? 'strict' : 'lax',
    secure: isProduction,
    path: '/'
  });

  return token;
};

/**
 * Middleware de protection CSRF
 */
export const csrfProtection = (req, res, next) => {
  const token = req.headers['x-csrf-token'];
  const secret = req.cookies['csrf-secret'] || CSRF_SECRET;

  if (!token) {
    return res.status(403).json({ error: 'Token CSRF manquant' });
  }

  if (!tokens.verify(secret, token)) {
    return res.status(403).json({ error: 'Token CSRF invalide' });
  }

  next();
};
