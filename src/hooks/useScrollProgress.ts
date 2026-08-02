"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuously reads the vertical scroll progress (0 to 1) of the page.
 * Used by the back-to-top button and the nav blur threshold.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = height > 0 ? Math.min(scrollTop / height, 1) : 0;
      setProgress(next);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return progress;
}
