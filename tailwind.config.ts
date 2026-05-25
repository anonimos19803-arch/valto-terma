import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e",
        accent: "#e94560",
        gold: "#f5a623",
        dark: "#0f0f23",
        surface: "#16213e",
        "surface-light": "#1a1a3e",
        muted: "#a0a0b8",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 40%, #16213e 100%)",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(233, 69, 96, 0.3)",
        "glow-gold": "0 0 30px rgba(245, 166, 35, 0.3)",
        "card": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
}
export default config
