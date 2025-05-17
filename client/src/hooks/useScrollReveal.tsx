import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

/**
 * Custom hook for implementing scroll reveal animations
 * @param options Configuration options for the IntersectionObserver
 * @returns ref to attach to the element you want to observe
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const { 
    threshold = 0.1, 
    once = true,
    rootMargin = '0px 0px -100px 0px'
  } = options;
  
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('active');
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold, rootMargin]);
  
  return ref;
}

export default useScrollReveal;
