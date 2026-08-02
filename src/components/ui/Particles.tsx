"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

type Props = {
  count?: number;
  linkDistance?: number;
  className?: string;
};

/**
 * A lightweight, dependency-free particle field.
 *
 * - Runs at native rAF cadence (~60fps).
 * - Stops entirely when prefers-reduced-motion is set.
 * - Pauses when the canvas is scrolled out of view to save cycles.
 * - Uses a single transparent canvas (no DOM nodes per particle).
 */
export function Particles({
  count = 40,
  linkDistance = 120,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let paused = false;
    let mounted = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
      }));
    };

    const tick = () => {
      if (!mounted) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!paused) rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !paused) {
          paused = false;
          rafId = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting) {
          paused = true;
          if (rafId) cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );

    resize();
    init();
    rafId = requestAnimationFrame(tick);
    io.observe(canvas);

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [count, linkDistance, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
