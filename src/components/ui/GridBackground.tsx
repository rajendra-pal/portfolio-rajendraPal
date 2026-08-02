import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Pure SVG grid background — zero JS, GPU-cheap.
 * Provides a subtle blue tint near the center via radial gradient.
 */
export function GridBackground({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.20]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="rgba(96, 165, 250, 0.18)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.0" />
            <stop offset="55%" stopColor="white" stopOpacity="1.0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          mask="url(#fadeMask)"
        />
      </svg>
    </div>
  );
}
