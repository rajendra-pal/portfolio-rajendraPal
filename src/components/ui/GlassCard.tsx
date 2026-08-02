"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  glow?: boolean;
  interactive?: boolean;
  className?: string;
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { children, glow = false, interactive = false, className, ...rest },
    ref
  ) {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
          "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]",
          interactive &&
            "transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05] hover:shadow-blue-glow-sm",
          glow && "shadow-blue-glow-sm",
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);