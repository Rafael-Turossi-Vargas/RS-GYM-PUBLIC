/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff9e6",
          100: "#ffefb3",
          200: "#ffe380",
          300: "#ffd24d",
          400: "#ffc31a",
          500: "#d4af37",
          600: "#b8922b",
          700: "#8f6f1f",
          800: "#664d14",
          900: "#3d2c0a",
        },
        ink: {
          900: "#050507",
          800: "#0b0c10",
          700: "#10121a",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212,175,55,.25), 0 10px 30px rgba(0,0,0,.45)",
      },
    },
  },
  plugins: [],
};