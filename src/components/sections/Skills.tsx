"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SKILL_CATEGORIES } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tech Stack & Skills"
          subtitle="Languages, frameworks, and tools I reach for — refined through projects, not just courses."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-blue-glow-sm"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3 className="font-display text-lg font-semibold text-white">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">{category.blurb}</p>

              <ul className="mt-6 space-y-3">
                {category.skills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type Skill = (typeof SKILL_CATEGORIES)[number]["skills"][number];

function SkillRow({ skill }: { skill: Skill }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <li
      ref={ref}
      className="group/row flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-300 hover:bg-white/[0.04]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-accent-secondary transition-transform duration-300 group-hover/row:scale-110 group-hover/row:text-white">
        <skill.Icon className="h-4 w-4" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <div className="mb-1.5 flex items-center text-xs">
          <span className="font-medium text-white/85">{skill.name}</span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.proficiency}%` : 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
            style={{
              boxShadow:
                "0 0 12px rgba(59,130,246,0.4), inset 0 0 6px rgba(96,165,250,0.4)",
            }}
          />
        </div>
      </div>
    </li>
  );
}