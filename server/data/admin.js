import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADMIN_FILE = path.join(__dirname, 'admin.json');

// Configuration admin par défaut - Le mot de passe doit être configuré via variable d'environnement
const DEFAULT_ADMIN = {
  id: 1,
  username: process.env.ADMIN_USERNAME || 'admin',
  // Hash généré dynamiquement au premier démarrage si admin.json n'existe pas
  passwordHash: null,
  role: 'admin',
  createdAt: new Date().toISOString()
};

/**
 * Initialise le fichier admin s'il n'existe pas (synchrone pour éviter les race conditions)
 */
const initializeAdmin = () => {
  if (!fs.existsSync(ADMIN_FILE)) {
    // Génère un mot de passe temporaire sécurisé si non fourni via variable d'environnement
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
    const tempPassword = initialPassword || crypto.randomBytes(16).toString('hex');
    // Utiliser hashSync pour l'initialisation synchrone
    const hashedPassword = bcrypt.hashSync(tempPassword, 12);

    const adminData = {
      ...DEFAULT_ADMIN,
      passwordHash: hashedPassword
    };

    fs.writeFileSync(ADMIN_FILE, JSON.stringify(adminData, null, 2));

    if (!initialPassword) {
      console.log('========================================');
      console.log('MOT DE PASSE ADMIN TEMPORAIRE:', tempPassword);
      console.log('Changez-le immédiatement via le panneau admin !');
      console.log('Ou configurez ADMIN_INITIAL_PASSWORD en production.');
      console.log('========================================');
    }
  }
};

/**
 * Récupère les informations de l'admin
 */
export const getAdmin = () => {
  initializeAdmin();
  const data = fs.readFileSync(ADMIN_FILE, 'utf8');
  return JSON.parse(data);
};

/**
 * Met à jour le mot de passe de l'admin
 */
export const updateAdminPassword = (newPasswordHash) => {
  const admin = getAdmin();
  admin.passwordHash = newPasswordHash;
  admin.updatedAt = new Date().toISOString();
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(admin, null, 2));
};

/**
 * Génère un hash de mot de passe (utilitaire pour la config initiale)
 */
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export default { getAdmin, updateAdminPassword, hashPassword };
