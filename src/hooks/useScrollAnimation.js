import { useEffect, useRef, useState } from 'react';

/**
 * Hook pour animer les éléments lors du scroll
 * Utilise l'Intersection Observer API pour de meilleures performances
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on peut arrêter d'observer
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

/**
 * Hook pour plusieurs éléments avec animation décalée
 */
export const useStaggerAnimation = (itemCount, baseDelay = 100) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Déclencher les animations une par une
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, i]);
            }, i * baseDelay);
          }
          observer.unobserve(container);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [itemCount, baseDelay]);

  return [containerRef, visibleItems];
};

export default useScrollAnimation;
