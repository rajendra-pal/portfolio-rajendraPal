"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const HUD_LABELS = [
  "SYSTEM ONLINE",
  "AI ANALYSIS",
  "PROFILE VERIFIED",
  "FULL STACK READY",
  "BIOMETRIC MATCH",
] as const;

/**
 * The signature FaceScanner component.
 *
 * Two stacked image layers are revealed/hidden by clip-path using the
 * `--scan-progress` CSS variable, which is animated top-to-bottom-to-top
 * by the `scan-progress` keyframes defined in globals.css. The scan line is
 * absolutely positioned and uses `top: var(--scan-progress)` so it stays
 * perfectly in sync.
 *
 * All animation is CSS-driven — zero JS in the loop, pure GPU compositing.
 */
export function FaceScanner() {
  // The image src — drop your portrait at public/face.jpeg.
  // Until then we render a tasteful SVG placeholder with the user's initials.
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = "/face.jpeg";
  }, []);

  const fallbackStyle: React.CSSProperties = hasImage
    ? { backgroundImage: "url(/face.jpeg)" }
    : {
        backgroundImage:
          "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px]"
    >
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-3xl bg-blue-glow opacity-60 blur-3xl"
      />

      <div className="scanner-frame aspect-[3/4] w-full">
        {/* Sharp layer */}
        <div className="layer layer-sharp" style={fallbackStyle} />

        {/* Blurred layer */}
        <div className="layer layer-blur" style={fallbackStyle} />

        {/* Fallback initials overlay (visible only when no portrait) */}
        {!hasImage && (
          <div className="absolute inset-0 grid place-items-center text-white">
            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-7xl font-bold tracking-tight drop-shadow-lg md:text-8xl">
                {SITE.initials}
              </span>
              <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                {SITE.name}
              </span>
            </div>
          </div>
        )}

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(circle at center, transparent 55%, rgba(5,7,13,0.65) 100%)",
          }}
        />

        {/* Scan line */}
        <div className="scan-line" />

        {/* HUD labels */}
        <HudOverlay />

        {/* Corner brackets */}
        <CornerBrackets />

        {/* Edge label */}
        <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-md border border-accent/40 bg-bg/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-secondary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          Live Scan
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-bg/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-sm">
          v 2.6 · AI
        </div>
      </div>
    </motion.div>
  );
}

function CornerBrackets() {
  const positions = [
    { top: "12px", left: "12px", rotate: 0 },
    { top: "12px", right: "12px", rotate: 90 },
    { bottom: "12px", right: "12px", rotate: 180 },
    { bottom: "12px", left: "12px", rotate: 270 },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <motion.svg
          key={i}
          aria-hidden
          width="32"
          height="32"
          viewBox="0 0 32 32"
          className="pointer-events-none absolute z-10 text-accent"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            transform: `rotate(${p.rotate}deg)`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        >
          <path
            d="M 4 12 L 4 4 L 12 4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </>
  );
}

function HudOverlay() {
  return (
    <>
      {HUD_LABELS.map((label, i) => {
        // Pseudo-random but deterministic positions for labels
        const positions = [
          { top: "8%", left: "50%", transform: "translateX(-50%)" },
          { top: "30%", right: "6%" },
          { bottom: "30%", left: "6%" },
          { top: "60%", left: "10%" },
          { bottom: "12%", right: "12%" },
        ];
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={label}
            className="pointer-events-none absolute z-10 rounded-md border border-accent/30 bg-bg/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent-secondary backdrop-blur-sm"
            style={pos as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{
              duration: 4,
              delay: i * 1.1,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          >
            {label}
          </motion.div>
        );
      })}
    </>
  );
}