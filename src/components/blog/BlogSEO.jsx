import { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

const BlogSEO = ({
  title,
  description,
  image,
  article = false,
  publishedAt,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta
    updateMetaTag('description', description);

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', article ? 'article' : 'website', true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:site_name', siteConfig.professional.fullName, true);

    if (image) {
      updateMetaTag('og:image', `${window.location.origin}${image}`, true);
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    if (image) {
      updateMetaTag('twitter:image', `${window.location.origin}${image}`);
    }

    // Article specific
    if (article && publishedAt) {
      updateMetaTag('article:published_time', publishedAt, true);
      updateMetaTag('article:author', siteConfig.professional.fullName, true);
    }

    // Cleanup function
    return () => {
      // Reset to default title when leaving page
      document.title = siteConfig.seo.title;
    };
  }, [title, description, image, article, publishedAt]);

  // JSON-LD structured data
  const structuredData = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        image: image ? `${window.location.origin}${image}` : undefined,
        datePublished: publishedAt,
        author: {
          '@type': 'Person',
          name: siteConfig.professional.fullName,
          jobTitle: siteConfig.professional.title,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.professional.fullName,
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/favicon.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': window.location.href,
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: title,
        description: description,
        url: window.location.href,
        author: {
          '@type': 'Person',
          name: siteConfig.professional.fullName,
          jobTitle: siteConfig.professional.title,
        },
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default BlogSEO;
