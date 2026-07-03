import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  startOnMount?: boolean;
}

/**
 * Animates a number from 0 → target when the returned ref enters the viewport.
 * Uses IntersectionObserver + requestAnimationFrame for smooth, performant animation.
 */
export function useCountUp({ target, duration = 1800, startOnMount = false }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(startOnMount);
  const ref = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Observe element entering viewport
  useEffect(() => {
    if (startOnMount) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnMount]);

  // Run animation when started
  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hasStarted, target, duration]);

  return { count, ref };
}
