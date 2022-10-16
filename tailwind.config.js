/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        100: "0px 4px 6px -1px rgba(0, 0, 0, 0.05)",
        toast: "0px 2px 10px rgba(0, 0, 0, 0.2)",
        300: "0px 4px 6px -1px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        primary: "#2D31FA",
        error: "#EF4444",
        success: "#26BF87",
        warning: "#FBBF24",
        info: "#6366F1",
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [],
};
