"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Education() {
  return (
    <section id="education" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Education"
          title="Academic path"
          subtitle="The foundation that grounds the engineering work."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Center vertical line on desktop */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            {EDUCATION.map((entry) => (
              <motion.li
                key={entry.id}
                variants={fadeUp}
                className="relative pl-12"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-2 top-6 grid h-5 w-5 place-items-center"
                >
                  <span className="h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                </span>

                {/* Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-blue-glow-sm">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent-secondary">
                      <GraduationCap className="h-3 w-3" />
                      {entry.metric}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/55">
                      <Calendar className="h-3.5 w-3.5" />
                      {entry.period}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/55">
                    <MapPin className="h-3.5 w-3.5" />
                    {entry.institution}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {entry.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}