
import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o elemento se torna visível, aguarde o atraso especificado
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            // Desativar o observer após o elemento se tornar visível
            if (ref.current) observer.unobserve(ref.current);
          }, delay);
          
          return () => clearTimeout(timer);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}
