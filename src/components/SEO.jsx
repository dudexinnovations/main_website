import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight per-page SEO controller that updates:
 * - document.title
 * - meta[name="description"]
 * - meta[property="og:title"]
 * - meta[property="og:description"]
 * - meta[property="og:url"]
 * - meta[property="og:image"]
 * - meta[name="twitter:title"]
 * - meta[name="twitter:description"]
 * - link[rel="canonical"]
 */
const SEO = ({
  title,
  description,
  image = '/logo.png',
  type = 'website'
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update document title
    const fullTitle = title 
      ? `${title} | DudeX Innovations` 
      : 'DudeX Innovations | AI Systems, Enterprise Platforms & Digital Flagships';
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // 2. Set description
    const descContent = description || 
      'DudeX Innovations builds quiet luxury digital flagships, operational enterprise ERPs, and autonomous AI systems with sub-second performance and engineered reliability.';
    setMetaTag('name', 'description', descContent);

    // 3. Set Open Graph tags
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', descContent);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', `${window.location.origin}${image}`);

    // 4. Set Twitter card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', descContent);
    setMetaTag('name', 'twitter:image', `${window.location.origin}${image}`);

    // 5. Canonical link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [title, description, image, type, location.pathname]);

  return null;
};

export default SEO;
