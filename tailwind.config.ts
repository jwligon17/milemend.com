import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        cream: "#FFF8F4",
        mint: "#E9FFF0",
        blush: "#FFD8D2",
        forest: "#0B6B2D",
      },
    },
  },
};

export default config;
