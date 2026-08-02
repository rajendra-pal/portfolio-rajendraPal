"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A soft blue radial spotlight that follows the cursor.
 *
 * - Hidden on touch devices (pointer: coarse) and reduced-motion users.
 * - Uses a single fixed div + transform translate3d for GPU-cheap motion.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const target = useRef({ x: -400, y: -400 });
  const current = useRef({ x: -400, y: -400 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const el = ref.current;
      if (!el) {
        rafRef.current = null;
        return;
      }
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      el.style.transform = `translate3d(${current.current.x - 240}px, ${
        current.current.y - 240
      }px, 0)`;
      if (
        Math.abs(target.current.x - current.current.x) > 0.5 ||
        Math.abs(target.current.y - current.current.y) > 0.5
      ) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[480px] w-[480px]"
      style={{
        background:
          "radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.05) 30%, transparent 70%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}