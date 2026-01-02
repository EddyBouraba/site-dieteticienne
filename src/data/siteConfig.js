/**
 * Configuration centralisée du site
 * Modifiez ces valeurs pour personnaliser le site
 *
 * STRATÉGIE SEO :
 * - Le mot "nutritionniste" apparaît UNIQUEMENT dans les métadonnées SEO (title, meta, JSON-LD)
 * - Le mot "diététicienne" est utilisé dans tout le contenu visible
 * - Cette approche permet de cibler les deux intentions de recherche tout en respectant
 *   la réglementation sur les titres professionnels
 */

export const siteConfig = {
  // Informations professionnelles
  professional: {
    firstName: "Pauline",
    lastName: "Rolland",
    fullName: "Pauline Rolland",
    title: "Diététicienne", // Titre affiché sur le site
    titleSeo: "Diététicienne-Nutritionniste", // Utilisé uniquement dans les meta/JSON-LD
    diploma: "B.T.S. Diététique",
    school: "Lycée Passy Saint-Honoré – Paris",
    adeliNumber: "219502440",
  },

  // Localisation
  location: {
    city: "Dijon",
    region: "Bourgogne-Franche-Comté",
    address: "77 Rue de Châteaubriand",
    // Coordonnées Google Maps pour Dijon centre
    coordinates: {
      lat: 47.339781,
      lng: 5.046605,
    },
    mapZoom: 14,
  },

  // Contact et prise de rendez-vous
  contact: {
    doctolibUrl:
      "https://www.doctolib.fr/dieteticien/saint-loup-geanges/pauline-rolland-saint-loup-geanges",
    email: "paulinerolland.diet@gmail.com", // À personnaliser
    phone: "07 87 00 10 43", // À personnaliser si nécessaire
  },

  // Horaires d'ouverture
  hours: [
    { day: "Lundi", hours: "08h30 - 20h30" },
    { day: "Mardi", hours: "08h30 - 19h30" },
    { day: "Mercredi", hours: "08h30 - 19h30" },
    { day: "Jeudi", hours: "08h30 - 19h30" },
    { day: "Vendredi", hours: "08h30 - 19h30" },
    { day: "Samedi", hours: "08h00 - 13h30" },
    { day: "Dimanche", hours: "10h00 - 13h00" },
  ],

  // Tarifs des consultations
  pricing: [
    {
      name: "Première consultation de nutrition",
      price: 50,
      description: "Bilan complet et définition de vos objectifs",
      duration: "1h environ",
    },
    {
      name: "Consultation de suivi",
      price: 35,
      description: "Suivi personnalisé de votre progression",
      duration: "30-45 min",
    },
    {
      name: "Suivi Femme enceinte",
      price: 35,
      description: "Accompagnement nutritionnel pendant la grossesse",
      duration: "30-45 min",
    },
    {
      name: "Suivi pathologie (diabète, hypertension...)",
      price: 35,
      description: "Prise en charge diététique adaptée à votre pathologie",
      duration: "30-45 min",
    },
    {
      name: "Suivi obésité ou surpoids",
      price: 35,
      description: "Accompagnement vers un poids de forme",
      duration: "30-45 min",
    },
    {
      name: "Suivi sportif",
      price: 35,
      description: "Optimisation de vos performances par l'alimentation",
      duration: "30-45 min",
    },
  ],

  // Spécialités / domaines d'accompagnement
  specialties: [
    "Rééquilibrage alimentaire",
    "Perte de poids",
    "Nutrition sportive",
    "Grossesse et allaitement",
    "Diabète et maladies métaboliques",
    "Troubles digestifs",
    "Alimentation végétarienne",
    "Éducation nutritionnelle",
  ],

  // SEO Configuration
  seo: {
    // Le mot "nutritionniste" apparaît ici pour le SEO mais jamais dans le contenu visible
    title:
      "Pauline Rolland - Diététicienne Nutritionniste à Dijon | Consultation",
    description:
      "Pauline Rolland, diététicienne nutritionniste diplômée à Dijon. Consultations en nutrition, rééquilibrage alimentaire, perte de poids. Prenez rendez-vous en ligne.",
    keywords:
      "diététicienne Dijon, nutritionniste Dijon, consultation nutrition, rééquilibrage alimentaire, perte de poids Dijon, alimentation santé",
    ogImage: "/og-image.jpg",
    siteUrl: "https://pauline-rolland-dieteticienne.fr", // À personnaliser
  },

  // Lien vers les avis Google
  googleReviewsUrl: "https://g.co/kgs/PLXehWME55usptxHD",

  // Temoignages clients (avis Google)
  testimonials: [
    {
      name: "Laurine Coulon",
      rating: 5,
      text: "J’ai eu un suivi de quelques mois avec Pauline. C’est la première fois que je rencontre une professionnelle de l’alimentation aussi dévouée et à l’écoute pour ses clients. Très disponible, à l’écoute, j’ai réussi grâce à elle à améliorer ma relation avec la nourriture, supprimer toutes ses frustrations et perdre du poids en mangeant plus! Encore un grand merci Pauline !",
      date: "Il y a un mois",
    },
    {
      name: "sansandu21",
      rating: 5,
      text: "Je recommande ! Pauline est une diététicienne à l’écoute, disponible et organisée. J’ai réussi à perdre du poids et manger plus équilibré sans me restreindre grâce à ses conseils et son suivie. Elle a adaptée une répartition alimentaire en fonction de mes besoins et de mes envies. Merci beaucoup ! 🙂",
      date: "Il y a un mois",
    },
    {
      name: "Stéphanie LUROT",
      rating: 5,
      text: "Professionnelle bienveillante, un suivi efficace et sans frustration. Je la recommande.",
      date: "Il y a 2 semaines",
    },
  ],

  // Images du cabinet
  images: {
    portrait: {
      src: "../assets/images/portrait.webp",
      alt: "Pauline Rolland, diététicienne diplômée à Dijon",
    },
    waitingRoom: {
      src: "../assets/images/attente.webp",
      alt: "Salle d'attente du cabinet de diététique à Dijon",
    },
    office: {
      src: "../assets/images/cabine.webp",
      alt: "Bureau de consultation diététique",
    },
  },
};

export default siteConfig;
