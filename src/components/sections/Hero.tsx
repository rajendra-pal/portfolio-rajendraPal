"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { Particles } from "@/components/ui/Particles";
import { GridBackground } from "@/components/ui/GridBackground";
import { ROTATING_ROLES } from "@/lib/data";
import { SITE } from "@/lib/constants";

const NAME_LETTERS = SITE.name.split("");

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((p) => (p + 1) % ROTATING_ROLES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <GridBackground />
      <div className="absolute inset-0">
        <Particles count={50} linkDistance={140} />
      </div>

      {/* Soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-glow blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-accent-secondary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Available for new opportunities
        </motion.div>

        {/* Hi I'm */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-base text-white/55 md:text-lg"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name with letter reveal */}
        <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
          <span aria-label={SITE.name} className="inline-flex">
            {NAME_LETTERS.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block bg-gradient-to-br from-white via-white to-accent-secondary bg-clip-text text-transparent"
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Rotating role */}
        <div className="mt-6 flex h-8 items-center justify-center md:h-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_ROLES[index]}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-xl font-medium text-white/85 md:text-2xl"
            >
              {ROTATING_ROLES[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-5 max-w-2xl text-base text-white/55 md:text-lg"
        >
          I build scalable, end-to-end web products — from REST APIs in
          Node.js to polished interfaces in React and Next.js — with a sharp
          eye for performance and detail.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticLink
            href={SITE.resumeUrl}
            download="Rajendra-Pal-Resume.pdf"
            variant="primary"
            icon={<Download className="h-4 w-4" />}
            ariaLabel="Download resume PDF"
          >
            Download Resume
          </MagneticLink>
          <Link
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("projects");
              if (el) {
                const top =
                  el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-accent/60 hover:bg-white/[0.08]"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="mb-16 mt-10 flex items-center gap-4"
        >
          {[
            { href: SITE.github, label: "GitHub", Icon: Github },
            { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
            { href: `mailto:${SITE.email}`, label: "Email", Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all hover:border-accent/60 hover:text-white hover:shadow-blue-glow-sm"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}