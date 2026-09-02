import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#171615",
          light: "#23211F",
          dark: "#0F0E0D",
        },
        cream: {
          DEFAULT: "#FBFAF7",
          50: "#FFFFFF",
          100: "#FBFAF7",
          200: "#F3EEE4",
          300: "#E4DED3",
        },
        burgundy: {
          DEFAULT: "#5B1F28",
          hover: "#7A2A34",
          light: "#8D3440",
          dark: "#3D131A",
          muted: "rgba(91, 31, 40, 0.1)",
        },
        gold: {
          DEFAULT: "#C9A16B",
          light: "#E4B889",
          dark: "#A8834F",
          muted: "rgba(201, 161, 107, 0.15)",
        },
        charcoal: {
          DEFAULT: "#171615",
          muted: "#57524B",
          subtle: "#6B655E",
          soft: "#8A837A",
        },
        ivory: "#F5F1EA",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "-apple-system", "sans-serif"],
      },
      animation: {
        "brand-scroll": "brandscroll 42s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        brandscroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
