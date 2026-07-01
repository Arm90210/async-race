import { useRef, useCallback, useEffect } from 'react';

interface AnimationControls {
  carRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  start: (durationMs: number) => void;
  stop: () => void;
  reset: () => void;
}

export function useCarAnimation(): AnimationControls {
  const carRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number>(0);
  const startTime = useRef<number>(0);
  const duration = useRef<number>(0);

  const getMaxOffset = useCallback(() => {
    if (!trackRef.current || !carRef.current) return 0;
    return trackRef.current.clientWidth - carRef.current.clientWidth;
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration.current, 1);
      const maxOffset = getMaxOffset();

      if (carRef.current) {
        carRef.current.style.transform = `translateX(${progress * maxOffset}px)`;
      }

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    },
    [getMaxOffset],
  );

  const start = useCallback(
    (durationMs: number) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      duration.current = durationMs;
      startTime.current = performance.now();
      rafId.current = requestAnimationFrame(animate);
    },
    [animate],
  );

  const stop = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = 0;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    if (carRef.current) {
      carRef.current.style.transform = 'translateX(0px)';
    }
  }, [stop]);

  // cleanup on unmount
  useEffect(() => () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
  }, []);

  return { carRef, trackRef, start, stop, reset };
}
