"use client";

import { motion } from "framer-motion";
import { Award, Code2, GraduationCap, Sparkles } from "lucide-react";
import { FaceScanner } from "@/components/about/FaceScanner";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About"
          title="The person behind the code"
          subtitle="A quick read on who I am, what I build, and the problems I love solving."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Scanner */}
          <div className="order-1 flex justify-center lg:order-1 lg:justify-end">
            <FaceScanner />
          </div>

          {/* Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-2 lg:order-2"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-secondary">
              <Sparkles className="h-3 w-3" />
              Full Stack & AI/ML Developer
            </motion.div>

            <motion.h3
              variants={fadeUp}
              className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl"
            >
              Engineering products that move from
              <span className="text-gradient-blue"> idea to production</span>.
            </motion.h3>

            <motion.div
              variants={fadeUp}
              className="mt-6 space-y-4 text-base leading-relaxed text-white/65 md:text-[17px]"
            >
              <p>
                I&apos;m Rajendra Pal — a Computer Science Engineering undergraduate
                (B.Tech, 2023–2027) seeking an AI/ML or Python Development Intern role.
                I enjoy turning real-world problems into working software, with hands-on
                experience building machine learning pipelines, backend functionality, REST APIs,
                and database-driven applications.
              </p>
              <p>
                My technical foundation spans <span className="text-white">Python</span>,{" "}
                <span className="text-white">scikit-learn</span>,{" "}
                <span className="text-white">Pandas & NumPy</span>,{" "}
                <span className="text-white">React</span>,{" "}
                <span className="text-white">Next.js</span>,{" "}
                <span className="text-white">TypeScript</span>,{" "}
                <span className="text-white">Node.js / Express</span>,{" "}
                <span className="text-white">Flask</span>, and{" "}
                <span className="text-white">MongoDB, MySQL & SQL</span>.
                I care about building complete solutions — from NLP data preprocessing and stacking
                classifier ensembles to clean responsive layouts and secure query architectures.
              </p>
              <p>
                Outside of coursework I ship end-to-end applications: SpamShield (an SMS & Email spam classifier
                with 97.7% accuracy), a full-stack Job Application Tracker with automated analytics,
                an e-commerce platform for an art school with UPI checkout, and a student productivity suite.
                I&apos;m an active learner of Artificial Intelligence & Machine Learning dedicated to delivering
                clean, reliable, and high-impact engineering work.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:shadow-blue-glow-sm"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent-secondary">
                {stat.label.includes("CGPA") || stat.label.includes("Score") ? (
                  <Award className="h-3.5 w-3.5" />
                ) : stat.label.includes("Graduating") ? (
                  <GraduationCap className="h-3.5 w-3.5" />
                ) : (
                  <Code2 className="h-3.5 w-3.5" />
                )}
                {stat.label}
              </div>
              <div className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </div>
              <div className="mt-1 text-xs text-white/45">{stat.hint}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}