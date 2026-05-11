/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff5f0",
          100: "#ffe8db",
          200: "#ffcba8",
          300: "#ffa66b",
          400: "#ff7b2c",
          500: "#e85d04",
          600: "#c44b03",
          700: "#9a3b02",
          800: "#772d02",
          900: "#5c2201",
        },
        dark: "#1a1a2e",
        card: "#16213e",
        accent: "#0f3460",
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
