"use client";

import { useEffect, useState } from "react";

type Point = { x: number; y: number };

const INITIAL: Point = { x: 0, y: 0 };

/**
 * Track the mouse position globally, normalized to viewport center.
 * Avoids work during scroll by using passive listeners.
 */
export function useMousePosition(): Point {
  const [point, setPoint] = useState<Point>(INITIAL);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return point;
}
