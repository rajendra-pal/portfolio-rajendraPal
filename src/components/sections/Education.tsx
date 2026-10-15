"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin, Award, Languages, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EDUCATION, ACHIEVEMENTS, SPOKEN_LANGUAGES } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Education() {
  return (
    <section id="education" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Education & Credentials"
          title="Academic Path & Achievements"
          subtitle="The academic foundation, certifications, and milestones that ground my engineering work."
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
                    {entry.metricLabel && (
                      <span className="text-[11px] font-medium text-accent-secondary/80">
                        ({entry.metricLabel})
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/55 ml-auto">
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

        {/* ── Achievements & Certifications ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent-secondary">
              <Award className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Certifications & Achievements
              </h3>
              <p className="text-sm text-white/50">
                Key credentials, practical milestones, and active domains of expertise.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {ACHIEVEMENTS.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-blue-glow-sm"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-accent-secondary">
                  <CheckCircle2 className="h-3 w-3" />
                  {item.highlight}
                </span>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs font-medium text-accent-secondary/80">
                  {item.issuer}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-white/65">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Spoken Languages ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent-secondary">
                <Languages className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-display text-base font-semibold text-white">
                  Spoken Languages
                </h4>
                <p className="text-xs text-white/50">Communication & collaboration languages</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {SPOKEN_LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 transition-colors hover:border-accent/40"
                >
                  <span className="text-xs font-semibold text-white">{lang.name}</span>
                  <span className="text-[10px] text-white/45">• {lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}