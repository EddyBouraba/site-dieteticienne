/**
 * Configuration des articles de blog
 *
 * Pour ajouter un nouvel article :
 * 1. Créer un fichier .md dans content/blog/
 * 2. Ajouter l'entrée correspondante dans ce fichier
 *
 * Structure du frontmatter Markdown :
 * ---
 * title: "Titre de l'article"
 * slug: "url-de-larticle"
 * excerpt: "Résumé court pour la liste"
 * coverImage: "/images/blog/image.jpg"
 * category: "Catégorie"
 * author: "Pauline Rolland"
 * publishedAt: "2024-01-15"
 * metaTitle: "Titre SEO"
 * metaDescription: "Description SEO"
 * featured: true/false
 * ---
 */

export const blogCategories = [
  { id: 'all', name: 'Tous les articles', color: '#7c9082' },
  { id: 'nutrition', name: 'Nutrition', color: '#5a9c6d' },
  { id: 'conseils-pratiques', name: 'Conseils pratiques', color: '#6b8cae' },
  { id: 'bien-etre', name: 'Bien-être', color: '#a17c9c' },
  { id: 'recettes', name: 'Recettes', color: '#c4956a' },
  { id: 'sante', name: 'Santé', color: '#7c9082' },
];

export const blogPosts = [
  {
    id: 1,
    title: "Les bienfaits des légumes d'hiver pour votre santé",
    slug: "bienfaits-legumes-hiver",
    excerpt: "Découvrez pourquoi les légumes de saison sont essentiels en hiver et comment les intégrer facilement dans votre alimentation quotidienne.",
    coverImage: "/images/blog/legumes-hiver.jpg",
    category: "Nutrition",
    categorySlug: "nutrition",
    author: "Pauline Rolland",
    publishedAt: "2024-12-15",
    metaTitle: "Les bienfaits des légumes d'hiver | Conseils diététicienne Dijon",
    metaDescription: "Pauline Rolland, diététicienne à Dijon, vous explique les bienfaits des légumes d'hiver : vitamines, minéraux et recettes simples pour rester en forme.",
    featured: true,
    readingTime: 4,
    content: `L'hiver est souvent synonyme de plats réconfortants et de repas copieux. Mais saviez-vous que c'est aussi la saison idéale pour profiter de légumes aux nombreuses vertus nutritionnelles ?

## Pourquoi privilégier les légumes de saison ?

Les légumes cultivés et récoltés en saison présentent plusieurs avantages :

- **Meilleure valeur nutritionnelle** : cueillis à maturité, ils conservent toutes leurs vitamines
- **Goût plus prononcé** : le respect du cycle naturel donne des saveurs plus intenses
- **Impact écologique réduit** : moins de transport et de conservation
- **Prix plus avantageux** : l'abondance fait baisser les coûts

## Les stars de l'hiver

### Le chou sous toutes ses formes

Chou vert, chou-fleur, brocoli, chou de Bruxelles... La famille des crucifères est riche en :

- Vitamine C (parfois plus que les agrumes !)
- Fibres pour une bonne digestion
- Antioxydants protecteurs

### Les légumes racines

Carottes, panais, navets, betteraves et topinambours sont de véritables concentrés d'énergie :

- Riches en glucides complexes pour une énergie durable
- Source de potassium et magnésium
- Excellente conservation naturelle

### Les courges et potirons

Ces légumes colorés apportent :

- Du bêta-carotène (précurseur de la vitamine A)
- Des fibres douces, bien tolérées
- Une texture onctueuse parfaite pour les soupes

## Comment les préparer simplement ?

### La soupe : votre alliée

Une soupe maison permet de :

1. Consommer plusieurs portions de légumes facilement
2. S'hydrater pendant les mois froids
3. Varier les saveurs chaque jour

**Mon conseil** : préparez une grande quantité le dimanche et conservez-la au réfrigérateur pour la semaine.

### Les légumes rôtis au four

Coupez vos légumes en morceaux, ajoutez un filet d'huile d'olive, du thym et du romarin. Enfournez 30 minutes à 200°C. Simple et délicieux !

## Conclusion

N'hésitez pas à diversifier votre consommation de légumes d'hiver. Ils sont vos meilleurs alliés pour traverser la saison froide en pleine forme.

---

*Vous souhaitez un accompagnement personnalisé pour améliorer votre alimentation ? [Prenez rendez-vous](/contact) pour une consultation.*`
  },
  {
    id: 2,
    title: "Petit-déjeuner équilibré : les clés pour bien démarrer la journée",
    slug: "petit-dejeuner-equilibre",
    excerpt: "Apprenez à composer un petit-déjeuner nutritif qui vous donnera l'énergie nécessaire jusqu'au déjeuner, sans fringales.",
    coverImage: "/images/blog/petit-dejeuner.jpg",
    category: "Conseils pratiques",
    categorySlug: "conseils-pratiques",
    author: "Pauline Rolland",
    publishedAt: "2024-11-28",
    metaTitle: "Petit-déjeuner équilibré : conseils de diététicienne | Dijon",
    metaDescription: "Comment composer un petit-déjeuner équilibré ? Pauline Rolland, diététicienne à Dijon, partage ses conseils pour un réveil nutritif et énergisant.",
    featured: false,
    readingTime: 5,
    content: `Le petit-déjeuner est souvent décrit comme le repas le plus important de la journée. Mais qu'en est-il vraiment ? Et surtout, comment le composer pour qu'il soit réellement bénéfique ?

## Faut-il absolument prendre un petit-déjeuner ?

La réponse n'est pas universelle. **Écoutez votre corps** :

- Si vous avez faim le matin : mangez !
- Si vous n'avez pas d'appétit : ne vous forcez pas

L'essentiel est de répondre à vos besoins, pas de suivre une règle rigide.

## Les composantes d'un petit-déjeuner équilibré

### 1. Une source de protéines

Les protéines apportent une satiété durable. Optez pour :

- Œufs (à la coque, brouillés, en omelette)
- Yaourt nature ou fromage blanc
- Fromage
- Jambon de qualité

### 2. Des glucides de qualité

Privilégiez les sucres lents :

- Pain complet ou aux céréales
- Flocons d'avoine
- Muesli sans sucres ajoutés

**À éviter** : les céréales industrielles souvent trop sucrées.

### 3. Une portion de fruits

Pour les vitamines et les fibres :

- Fruit frais de saison
- Compote sans sucres ajoutés
- Quelques fruits secs (en quantité modérée)

### 4. Une boisson

Pour s'hydrater après la nuit :

- Eau
- Thé ou café (sans excès)
- Tisane

## Exemples de petits-déjeuners équilibrés

### Version salée

| Aliment | Quantité |
|---------|----------|
| Pain complet | 2 tranches |
| Œuf | 1 |
| Fromage | 30g |
| Fruit | 1 |

### Version sucrée

| Aliment | Quantité |
|---------|----------|
| Flocons d'avoine | 40g |
| Yaourt nature | 1 |
| Fruits frais | 1 poignée |
| Miel | 1 cuillère à café |

### Version rapide

Quand le temps manque :

- Yaourt + fruit + quelques amandes
- Pain + beurre de cacahuète + banane

## Les erreurs courantes

1. **Trop de sucre** : jus de fruits industriels, viennoiseries, céréales sucrées
2. **Pas assez de protéines** : repas uniquement glucidique = fringale assurée
3. **Manger trop vite** : prenez le temps de mâcher

## Mon conseil de diététicienne

Préparez votre petit-déjeuner la veille si vous manquez de temps le matin. Un overnight porridge (flocons d'avoine trempés dans du lait ou yaourt) se prépare en 2 minutes le soir et vous attend au réfrigérateur !

---

*Besoin d'un plan alimentaire personnalisé ? [Contactez-moi](/contact) pour un accompagnement adapté à votre mode de vie.*`
  },
  {
    id: 3,
    title: "L'hydratation : pourquoi et comment bien s'hydrater au quotidien",
    slug: "hydratation-sante",
    excerpt: "L'eau est essentielle à notre organisme. Découvrez les signes de déshydratation et mes astuces pour boire suffisamment chaque jour.",
    coverImage: "/images/blog/hydratation.jpg",
    category: "Bien-être",
    categorySlug: "bien-etre",
    author: "Pauline Rolland",
    publishedAt: "2024-10-10",
    metaTitle: "Bien s'hydrater au quotidien | Conseils diététicienne Dijon",
    metaDescription: "Combien faut-il boire par jour ? Pauline Rolland, diététicienne à Dijon, vous donne ses conseils pratiques pour une hydratation optimale.",
    featured: false,
    readingTime: 6,
    content: `Notre corps est composé à 60-70% d'eau. Cette eau est indispensable au bon fonctionnement de tous nos organes. Pourtant, beaucoup d'entre nous ne boivent pas assez au quotidien.

## Pourquoi l'hydratation est-elle si importante ?

L'eau intervient dans de nombreuses fonctions vitales :

- **Régulation de la température** corporelle
- **Élimination des déchets** par les reins
- **Transport des nutriments** vers les cellules
- **Lubrification des articulations**
- **Bon fonctionnement du cerveau**

## Combien faut-il boire par jour ?

### La recommandation générale

On conseille généralement **1,5 à 2 litres d'eau par jour**, soit environ 8 verres.

Mais ce besoin varie selon :

- Votre poids et votre taille
- Votre activité physique
- La température extérieure
- Votre alimentation (fruits et légumes contiennent de l'eau)

### Les signes de déshydratation

Votre corps vous envoie des signaux :

- Soif (signe déjà tardif !)
- Urines foncées
- Fatigue
- Maux de tête
- Difficultés de concentration
- Peau sèche

## Mes astuces pour boire plus

### 1. Gardez une bouteille à portée de main

Sur votre bureau, dans votre sac, sur la table de nuit. La voir vous rappellera de boire.

### 2. Donnez du goût à votre eau

Si l'eau nature vous ennuie :

- Ajoutez des rondelles de citron ou d'orange
- Quelques feuilles de menthe fraîche
- Des morceaux de concombre
- Des fruits rouges

### 3. Créez des rituels

- Un grand verre au réveil
- Un verre avant chaque repas
- Une tasse de tisane le soir

### 4. Utilisez une application

Certaines applications vous rappellent de boire régulièrement.

## Les boissons qui comptent (ou pas)

### Ça hydrate bien :

- Eau plate ou gazeuse
- Tisanes et infusions
- Thé (attention à la caféine)
- Bouillons de légumes

### À consommer avec modération :

- Café (diurétique léger)
- Jus de fruits (riches en sucre)
- Sodas light (édulcorants)

### À éviter :

- Sodas sucrés
- Boissons énergisantes
- Alcool (déshydrate)

## Cas particuliers

### Pendant le sport

Buvez avant, pendant et après l'effort :

- **Avant** : 500ml dans les 2h précédant l'exercice
- **Pendant** : petites gorgées régulières
- **Après** : compensez les pertes (pesez-vous avant/après)

### En été ou par forte chaleur

Augmentez votre consommation de 500ml à 1L supplémentaire.

### Personnes âgées

La sensation de soif diminue avec l'âge. Il faut donc boire même sans avoir soif.

## Conclusion

L'hydratation est un geste simple mais fondamental pour votre santé. Commencez dès aujourd'hui à observer vos habitudes et à les améliorer progressivement.

---

*Vous avez des questions sur votre alimentation ? [Prenez rendez-vous](/contact) pour un bilan nutritionnel personnalisé.*`
  }
];

/**
 * Récupère tous les articles
 */
export const getAllPosts = () => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

/**
 * Récupère un article par son slug
 */
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

/**
 * Récupère les articles par catégorie
 */
export const getPostsByCategory = (categorySlug) => {
  if (categorySlug === 'all') return getAllPosts();
  return blogPosts
    .filter(post => post.categorySlug === categorySlug)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

/**
 * Récupère les articles mis en avant
 */
export const getFeaturedPosts = () => {
  return blogPosts.filter(post => post.featured);
};

/**
 * Récupère les articles récents (les 3 derniers)
 */
export const getRecentPosts = (limit = 3) => {
  return getAllPosts().slice(0, limit);
};

export default blogPosts;
