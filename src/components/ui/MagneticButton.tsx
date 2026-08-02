"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  icon?: ReactNode;
};

type ButtonProps = BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
  download?: boolean | string;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-[#2563EB] hover:shadow-none",
  ghost:
    "bg-white/[0.04] text-white border border-white/10 hover:border-accent/60 hover:bg-white/[0.08]",
};

function Inner({
  children,
  icon,
}: Pick<BaseProps, "children" | "icon">) {
  return (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </span>
  );
}

const baseClass =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium " +
  "transition-[background,border,box-shadow] duration-300 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function MagneticButton({
  children,
  className,
  variant = "primary",
  icon,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        baseClass,
        "disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      whileTap={disabled ? undefined : { scale: 0.97 }}
    >
      <Inner icon={icon}>{children}</Inner>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />
    </motion.button>
  );
}

export function MagneticLink({
  children,
  className,
  variant = "primary",
  icon,
  href,
  external,
  ariaLabel,
  download,
}: LinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={cn(baseClass, variants[variant], className)}
      whileTap={{ scale: 0.97 }}
    >
      <Inner icon={icon}>{children}</Inner>
    </motion.a>
  );
}