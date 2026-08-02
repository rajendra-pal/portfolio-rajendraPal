import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#05070D",
          soft: "#0A0E1A",
        },
        accent: {
          DEFAULT: "#3B82F6",
          secondary: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "blue-glow":
          "radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 65%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "border-spin": "border-spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      boxShadow: {
        "blue-glow": "0 0 60px -10px rgba(59,130,246,0.5)",
        "blue-glow-sm": "0 0 30px -8px rgba(59,130,246,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;