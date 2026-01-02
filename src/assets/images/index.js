// Imports centralisés des images
// Vite gère automatiquement les chemins et l'optimisation

import portrait from './portrait.webp';
import attente from './attente.webp';
import cabine from './cabine.webp';

export const images = {
  portrait,
  waitingRoom: attente,
  office: cabine,
};

export default images;
