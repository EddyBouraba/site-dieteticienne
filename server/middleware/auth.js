import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET_IN_PRODUCTION';

/**
 * Middleware d'authentification JWT
 * Vérifie que le token est valide avant d'autoriser l'accès aux routes protégées
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification requis.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré. Veuillez vous reconnecter.' });
    }
    return res.status(403).json({ error: 'Token invalide.' });
  }
};

/**
 * Génère un token JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export default { authenticateToken, generateToken };
