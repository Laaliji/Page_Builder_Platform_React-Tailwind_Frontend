/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["media", "class"], // Enable dark mode for media and class
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      screens: {
        middle: "500px", // Custom breakpoint
      },
      colors: {
        primary: "#1477d2",
        secondary: "#1a8ae5",
        tertiary: "#1e97f3",
        background: "#ffffff",
        foreground: "#000000",
        border : '#1a2e35',
        button: {
          bg: "#1477d2",
          text: "#ffffff",
          hover: "#1a8ae5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        vote: "vote 1s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        vote: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-30deg)" },
          "75%": { transform: "rotate(30deg)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
