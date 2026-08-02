"use client";

import { MARQUEE_ICONS } from "@/lib/data";

export function Marquee() {
  // Render the list twice so the CSS keyframe `translateX(-50%)` produces a seamless loop.
  const list = [...MARQUEE_ICONS, ...MARQUEE_ICONS];

  return (
    <section
      aria-label="Tools I work with"
      className="relative overflow-hidden border-y border-white/5 bg-bg-soft/40 py-12"
    >
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee gap-4 px-4 will-change-transform">
          {list.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="group flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-blue-glow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent-secondary transition-colors group-hover:bg-accent/20 group-hover:text-white">
                <item.Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <span className="font-display text-sm font-medium text-white/80 group-hover:text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}