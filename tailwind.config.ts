import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stone & Bronze — exact brand palette (flat hex so /opacity works)
        bg: "#F5F0E8",
        "bg-contrast": "#241C14",
        surface: "#EFE9DE",
        cream: "#F5F0E8",
        parchment: "#F5F0E8",
        ink: "#241C14",
        stone: "#4A3B2A", // dark warm text (overrides built-in stone scale)
        bark: "#2E241A", // darker hover
        primary: "#6E5C42", // deep espresso
        secondary: "#8A7456",
        accent: "#A8927A", // warm bronze
        flax: "#A8927A",
        stonegrey: "#D9CFC0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Lora", "Georgia", "serif"],
        body: ["var(--font-body)", "Nunito", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
