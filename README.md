# Site Vitrine - Pauline Rolland, Dieteticienne a Dijon

Site web professionnel one-page pour Mme Pauline Rolland, dieteticienne diplomee a Dijon.

## Demarrage rapide

```bash
# Installation des dependances
npm install

# Lancement en developpement
npm run dev

# Build de production
npm run build

# Previsualisation du build
npm run preview
```

## Structure du projet

```
dieteticienne-dijon/
|-- public/
|   |-- images/                    # Photos du cabinet (a ajouter)
|   |   |-- portrait-pauline-rolland.jpg
|   |   |-- salle-attente-cabinet.jpg
|   |   +-- bureau-consultation.jpg
|   |-- favicon.svg                # Favicon du site
|   |-- sitemap.xml                # Sitemap pour SEO
|   +-- robots.txt                 # Directives pour les crawlers
|-- src/
|   |-- components/                # Composants React
|   |   |-- Header.jsx             # Navigation fixe
|   |   |-- Hero.jsx               # Section d'accueil
|   |   |-- About.jsx              # Presentation + diplome
|   |   |-- Services.jsx           # Consultations et tarifs
|   |   |-- Cabinet.jsx            # Photos du cabinet
|   |   |-- Appointment.jsx        # Prise de rendez-vous
|   |   |-- Contact.jsx            # Formulaire + carte
|   |   |-- Footer.jsx             # Mentions legales
|   |   +-- SEO.jsx                # JSON-LD et meta tags
|   |-- data/
|   |   +-- siteConfig.js          # Configuration centralisee
|   |-- App.jsx                    # Composant principal
|   |-- main.jsx                   # Point d'entree
|   +-- index.css                  # Styles Tailwind
|-- index.html                     # Page HTML principale
+-- vite.config.js                 # Configuration Vite
```

## Configuration

Toutes les informations du site sont centralisees dans **src/data/siteConfig.js** :

- Informations professionnelles (nom, diplome, ADELI)
- Localisation (ville, region, coordonnees GPS)
- Contact (email, telephone, lien Doctolib)
- Horaires d'ouverture
- Tarifs des consultations
- Specialites
- Configuration SEO

### Modifier les informations

```javascript
// src/data/siteConfig.js
export const siteConfig = {
  professional: {
    fullName: "Pauline Rolland",
    title: "Dieteticienne",
    // ...
  },
  location: {
    city: "Dijon",
    // ...
  },
  // etc.
};
```

## Images a fournir

Remplacez les fichiers placeholder dans /public/images/ :

| Fichier | Dimensions recommandees | Usage |
|---------|------------------------|-------|
| portrait-pauline-rolland.jpg | 800x800 px (carre) | Photo de profil dans le Hero |
| salle-attente-cabinet.jpg | 1200x800 px | Section Cabinet |
| bureau-consultation.jpg | 1200x800 px | Section Cabinet |

Voir les fichiers .txt dans le dossier pour plus de details.

## Strategie SEO : Dieteticienne vs Nutritionniste

### Le probleme

- "Dieteticien(ne)" est un titre protege (diplome d'Etat requis)
- "Nutritionniste" n'est pas protege mais tres recherche sur Google
- Il faut apparaitre sur les deux requetes sans induire en erreur

### La solution implementee

| Element | "Dieteticienne" | "Nutritionniste" |
|---------|-----------------|------------------|
| Contenu visible (texte, titres) | OUI | JAMAIS |
| Balise title | OUI | OUI |
| Meta description | OUI | OUI |
| JSON-LD Schema.org | OUI | OUI (type: Nutritionist) |
| Sitemap.xml | OUI | OUI |
| Attributs alt des images | OUI | JAMAIS |

### Fichiers concernes

- index.html : balises title et meta description
- src/components/SEO.jsx : JSON-LD structure
- public/sitemap.xml : URLs et descriptions
- src/data/siteConfig.js : configuration SEO centralisee

### Pourquoi c'est conforme

1. **Legalement** : Le mot "nutritionniste" n'apparait nulle part en texte visible
2. **SEO** : Google lit les meta tags et comprend la pertinence pour les deux requetes
3. **Schema.org** : Le type "Nutritionist" est un type standard reconnu par Google

## SEO Local

Le site est optimise pour le referencement local sur Dijon :

- Repetition coherente des informations NAP (Nom, Adresse, Telephone)
- Donnees structurees LocalBusiness + GeoCoordinates
- Balises meta geographiques (geo.region, geo.placename)
- Integration Google Maps
- Mentions frequentes de "Dijon" et "Bourgogne-Franche-Comte"

## Adapter pour un autre professionnel de sante

### 1. Modifier la configuration

Editez src/data/siteConfig.js avec les nouvelles informations.

### 2. Adapter le SEO

Si le nouveau professionnel a un autre titre (kine, osteopathe, etc.) :

1. Modifier le type Schema.org dans SEO.jsx
2. Adapter les mots-cles dans siteConfig.js
3. Mettre a jour le sitemap

### 3. Personnaliser le design

Les couleurs sont definies dans src/index.css :

```css
:root {
  --color-sage: #7c9082;        /* Couleur principale */
  --color-sage-light: #a8bfae;  /* Variante claire */
  --color-sage-dark: #5a6b5e;   /* Variante foncee */
  --color-cream: #faf8f5;       /* Fond principal */
}
```

## Checklist de mise en production

- [ ] Remplacer les 3 images placeholder
- [ ] Verifier/modifier l'email de contact
- [ ] Verifier le lien Doctolib
- [ ] Mettre a jour l'URL du site dans siteConfig.js
- [ ] Mettre a jour le sitemap.xml avec la bonne URL
- [ ] Completer les mentions legales (hebergeur)
- [ ] Configurer le formulaire de contact (Formspree, EmailJS, etc.)
- [ ] Deployer (Netlify, Vercel, OVH, etc.)
- [ ] Soumettre le sitemap a Google Search Console

## Stack technique

- **React 18** + **Vite** : Build rapide et moderne
- **Tailwind CSS** : Styling utilitaire
- **Vanilla JavaScript** : Pas de dependances inutiles

## Licence

Usage prive - Tous droits reserves.
