import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0B1020",
        cream: "#FFF8F4",
        mint: "#E9FFF0",
        blush: "#FFD8D2",
        forest: "#0B6B2D",
        brandGreen: "#30ff05",
      },
    },
  },
};

export default config;
