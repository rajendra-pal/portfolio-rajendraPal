"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Re-export of framer-motion's hook with a touch-friendly fallback so
 * sections still reveal on touch devices without looping animations.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
