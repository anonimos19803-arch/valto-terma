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
        pink: {
          50: "#FFF0F3",
          100: "#FFE0E8",
          200: "#FFC2D1",
          300: "#F9A8B8",
          400: "#F48DA0",
          500: "#E8738A",
          bg: "#F8B4C8",
        },
        royal: {
          DEFAULT: "#2547A4",
          dark: "#1B3580",
          light: "#3A5FC0",
        },
        cherry: {
          DEFAULT: "#CC2936",
          light: "#E63946",
          dark: "#A81D28",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glow": "0 0 30px rgba(204, 41, 54, 0.3)",
        "soft": "0 8px 40px rgba(37, 71, 164, 0.15)",
        "card": "0 4px 20px rgba(0, 0, 0, 0.08)",
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
