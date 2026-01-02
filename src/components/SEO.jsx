import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

/**
 * Composant SEO
 *
 * STRATÉGIE SEO IMPORTANTE :
 * Le mot "nutritionniste" est utilisé UNIQUEMENT dans ce composant (balises meta et JSON-LD)
 * car ces éléments ne sont pas visibles par l'utilisateur mais sont lus par Google.
 * Cela permet de cibler les deux intentions de recherche :
 * - "diététicienne Dijon"
 * - "nutritionniste Dijon"
 *
 * Légalement, seul le titre "diététicien(ne)" peut être utilisé pour affichage
 * car c'est un titre protégé nécessitant un diplôme d'État (BTS Diététique).
 * "Nutritionniste" n'est pas un titre protégé mais est recherché par les internautes.
 */
const SEO = () => {
  useEffect(() => {
    // Mise à jour du titre de la page
    document.title = siteConfig.seo.title;

    // Fonction pour mettre à jour ou créer une meta tag
    const updateMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags SEO de base
    updateMeta('description', siteConfig.seo.description);
    updateMeta('keywords', siteConfig.seo.keywords);

    // Meta tags géographiques pour SEO local
    updateMeta('geo.region', 'FR-BFC'); // Bourgogne-Franche-Comté
    updateMeta('geo.placename', siteConfig.location.city);
    updateMeta('geo.position', `${siteConfig.location.coordinates.lat};${siteConfig.location.coordinates.lng}`);
    updateMeta('ICBM', `${siteConfig.location.coordinates.lat}, ${siteConfig.location.coordinates.lng}`);

    // Open Graph (Facebook, LinkedIn)
    updateMeta('og:title', siteConfig.seo.title, true);
    updateMeta('og:description', siteConfig.seo.description, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:url', siteConfig.seo.siteUrl, true);
    updateMeta('og:locale', 'fr_FR', true);
    updateMeta('og:site_name', `${siteConfig.professional.fullName} - ${siteConfig.professional.title}`, true);

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', siteConfig.seo.title);
    updateMeta('twitter:description', siteConfig.seo.description);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteConfig.seo.siteUrl);

  }, []);

  // JSON-LD Structured Data
  // IMPORTANT: Le type "Nutritionist" est utilisé ici car c'est un type Schema.org reconnu
  // et permet d'apparaître pour les recherches "nutritionniste"
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Type principal : Établissement médical / Cabinet de diététique
      {
        "@type": ["MedicalBusiness", "LocalBusiness"],
        "@id": `${siteConfig.seo.siteUrl}/#business`,
        "name": `${siteConfig.professional.fullName} - Diététicienne Nutritionniste`,
        "description": siteConfig.seo.description,
        "url": siteConfig.seo.siteUrl,
        "telephone": siteConfig.contact.phone || undefined,
        "email": siteConfig.contact.email || undefined,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": siteConfig.location.city,
          "addressRegion": siteConfig.location.region,
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.location.coordinates.lat,
          "longitude": siteConfig.location.coordinates.lng
        },
        "areaServed": {
          "@type": "City",
          "name": siteConfig.location.city
        },
        "openingHoursSpecification": siteConfig.hours.map(({ day, hours }) => {
          const [start, end] = hours.split(' - ');
          const dayMap = {
            'Lundi': 'Monday',
            'Mardi': 'Tuesday',
            'Mercredi': 'Wednesday',
            'Jeudi': 'Thursday',
            'Vendredi': 'Friday',
            'Samedi': 'Saturday',
            'Dimanche': 'Sunday'
          };
          return {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": dayMap[day],
            "opens": start.replace('h', ':'),
            "closes": end.replace('h', ':')
          };
        }),
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Card"
      },
      // Professionnel de santé
      {
        "@type": ["Person", "Nutritionist"],
        "@id": `${siteConfig.seo.siteUrl}/#person`,
        "name": siteConfig.professional.fullName,
        "givenName": siteConfig.professional.firstName,
        "familyName": siteConfig.professional.lastName,
        "jobTitle": "Diététicienne Nutritionniste",
        "description": `Diététicienne nutritionniste diplômée à ${siteConfig.location.city}. Spécialisée en nutrition, rééquilibrage alimentaire et accompagnement personnalisé.`,
        "knowsAbout": [
          "Nutrition",
          "Diététique",
          "Rééquilibrage alimentaire",
          "Perte de poids",
          "Nutrition sportive",
          "Alimentation et grossesse",
          "Diabète",
          "Troubles métaboliques"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Diplôme d'État",
          "name": siteConfig.professional.diploma,
          "educationalLevel": "BTS",
          "recognizedBy": {
            "@type": "Organization",
            "name": siteConfig.professional.school
          }
        },
        "workLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": siteConfig.location.city,
            "addressRegion": siteConfig.location.region,
            "addressCountry": "FR"
          }
        },
        "worksFor": {
          "@id": `${siteConfig.seo.siteUrl}/#business`
        }
      },
      // Services proposés
      {
        "@type": "Service",
        "serviceType": "Consultation diététique",
        "provider": {
          "@id": `${siteConfig.seo.siteUrl}/#person`
        },
        "areaServed": {
          "@type": "City",
          "name": siteConfig.location.city
        },
        "offers": siteConfig.pricing.map((service) => ({
          "@type": "Offer",
          "name": service.name,
          "description": service.description,
          "price": service.price,
          "priceCurrency": "EUR"
        }))
      },
      // Site Web
      {
        "@type": "WebSite",
        "@id": `${siteConfig.seo.siteUrl}/#website`,
        "url": siteConfig.seo.siteUrl,
        "name": `${siteConfig.professional.fullName} - ${siteConfig.professional.title}`,
        "description": siteConfig.seo.description,
        "publisher": {
          "@id": `${siteConfig.seo.siteUrl}/#person`
        },
        "inLanguage": "fr-FR"
      },
      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": siteConfig.seo.siteUrl
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 0) }}
    />
  );
};

export default SEO;
