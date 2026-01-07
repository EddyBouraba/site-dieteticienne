// Imports centralisés des images
// Vite gère automatiquement les chemins et l'optimisation

import portrait from './portrait.webp';
import attente from './attente.webp';
import cabine from './cabine.webp';

// Imports des images entreprise avec gestion des espaces dans les noms
import entreprise1 from './entreprise/entreprise 1.jpeg';
import entreprise2 from './entreprise/entreprise 2.jpeg';
import entreprise3 from './entreprise/entreprise 3.jpeg';

export const images = {
  portrait,
  waitingRoom: attente,
  office: cabine,
  entreprise1,
  entreprise2,
  entreprise3,
};

export default images;
