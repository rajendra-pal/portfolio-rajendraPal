"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { AIAssistant } from "@/components/layout/AIAssistant";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const active = useActiveSection(NAV_SECTIONS.map((s) => s.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/5 bg-[#05070D]/70 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5"
            aria-label="Scroll to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] font-display text-sm font-bold text-gradient-blue transition-all group-hover:border-accent/50 group-hover:shadow-blue-glow-sm">
              {SITE.initials}
            </span>
            <span className="font-display text-sm font-semibold tracking-wide text-white">
              {SITE.name.toUpperCase()}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id} className="relative">
                  <button
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-white"
                        : "text-white/55 hover:text-white"
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {section.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-secondary shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 28,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Ask AI button — desktop */}
          <button
            type="button"
            onClick={() => setAiOpen((p) => !p)}
            aria-label="Open AI assistant"
            aria-pressed={aiOpen}
            className={cn(
              "hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:flex",
              aiOpen
                ? "border-blue-500/60 bg-blue-500/15 text-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.35)]"
                : "border-white/10 bg-white/[0.03] text-white/70 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            )}
          >
            <Bot className="h-4 w-4" />
            Ask AI
          </button>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setAiOpen((p) => !p);
              }}
              aria-label="Open AI assistant"
              aria-pressed={aiOpen}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border text-white transition-all",
                aiOpen
                  ? "border-blue-500/60 bg-blue-500/15 text-blue-400"
                  : "border-white/10 bg-white/[0.03]"
              )}
            >
              <Bot className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-bg/85 backdrop-blur-xl" />
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="relative z-10 flex h-full flex-col items-center justify-center gap-2 p-8"
            >
              {NAV_SECTIONS.map((section) => (
                <motion.li
                  key={section.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-full text-center"
                >
                  <button
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    className="block w-full py-3 font-display text-3xl font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {section.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className="w-full text-center pt-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setAiOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/15 px-6 py-2.5 font-display text-lg font-medium text-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.25)] transition-all active:scale-95"
                >
                  <Bot className="h-5 w-5" />
                  Ask AI Assistant
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Terminal */}
      <AIAssistant isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}