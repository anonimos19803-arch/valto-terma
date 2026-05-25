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
        accent: "#ff6b35",
        coral: "#ff8c61",
        sunset: "#ffd166",
        ocean: "#06d6a0",
        sky: "#118ab2",
        dark: "#073b4c",
        "dark-light": "#0a4f66",
        surface: "#0d5a75",
        muted: "#8ecae6",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #073b4c 0%, #118ab2 40%, #06d6a0 100%)",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(255, 107, 53, 0.4)",
        "glow-ocean": "0 0 30px rgba(6, 214, 160, 0.3)",
        "card": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
