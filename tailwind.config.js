/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#FF7A00",
        background: "#0D0907",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#FF7A00",
          foreground: "#0D0907",
        },
        secondary: {
          DEFAULT: "#2A1F15",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#3A2E22",
          foreground: "rgba(255, 255, 255, 0.6)",
        },
        accent: {
          DEFAULT: "#2A1F15",
          foreground: "#FF7A00",
        },
        popover: {
          DEFAULT: "#1A1410",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#1A1410",
          foreground: "#ffffff",
        },
        warm: {
          orange: "#FF7A00",
          amber: "#FFB347",
        },
        dark: {
          DEFAULT: "#0D0907",
          lighter: "#2A1F15",
          card: "#1A1410",
          muted: "#3A2E22",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
