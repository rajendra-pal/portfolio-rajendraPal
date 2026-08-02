"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 700;

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = Date.now();
    const dismiss = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setShow(false), wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      return () => window.removeEventListener("load", dismiss);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="48"
                stroke="url(#ring)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: 270 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                style={{ originX: "50%", originY: "50%" }}
                strokeDasharray="301"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="4"
                fill="#3B82F6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
            </svg>
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full bg-blue-glow blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 font-display text-sm font-medium uppercase tracking-[0.4em] text-white/80"
          >
            Rajendra Pal
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-2 text-xs text-white/40"
          >
            Initialising portfolio…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}