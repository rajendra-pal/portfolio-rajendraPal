"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="relative border-t border-white/5 bg-bg-soft/40 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-white/55 md:flex-row md:px-8">
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart
              className="h-3.5 w-3.5 fill-accent text-accent"
              aria-hidden
            />{" "}
            by{" "}
            <span className="font-medium text-white">{SITE.name}</span>
          </p>
          <p className="text-white/40">
            © {year ?? ""} · All rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <motion.button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        initial={false}
        animate={{
          opacity: showTop ? 1 : 0,
          scale: showTop ? 1 : 0.6,
          y: showTop ? 0 : 12,
        }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-bg/80 text-white shadow-blue-glow-sm backdrop-blur-xl hover:border-accent/50"
        style={{ pointerEvents: showTop ? "auto" : "none" }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
}