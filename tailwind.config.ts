import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent1: "var(--color-accent1)",
          bg: "var(--color-bg)",
          text: "var(--color-text)",
        },
        surface: {
          DEFAULT: "var(--card-bg)",
          border: "var(--card-border)",
          muted: "var(--muted-bg)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          50: "#e6eef7",
          100: "#ccddef",
          200: "#99bbe0",
          300: "#6699d0",
          400: "#3377c1",
          500: "var(--color-primary)", // #1C4E80 - Trust Blue
          600: "#163e66",
          700: "#112f4d",
          800: "#0b1f33",
          900: "#06101a",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "var(--color-secondary)", // #3CAEA3 - Healing Teal
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        accent: {
          DEFAULT: "var(--color-accent1)",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "var(--color-accent1)", // #C6B9E0
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
        gray: {
          50: "var(--color-bg)", // #F4F5F7
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "var(--color-text)", // #4A4A4A
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 6px 20px rgba(0,0,0,0.06)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-lato)", "Lato", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;