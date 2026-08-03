"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });
  const gl = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    gl.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    gl.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "gradient-border group relative h-full",
        featured && "lg:col-span-2"
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[inherit] bg-bg-soft p-6 md:p-7">
        {/* Cover */}
        {/* Cover */}
        <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
          {project.cover.startsWith("/") ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                project.cover
              )}
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Project title */}
          <div className="absolute bottom-4 left-4 z-10">
            <h3 className="font-display text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/60">{project.blurb}</p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-1.5 pt-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-white/65"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary"
                  strokeWidth={2.2}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent/20"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.08]"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Glow on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] bg-accent/0"
          style={{ opacity: gl }}
        />
      </div>
    </motion.div>
  );
}
