/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "serif"],
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-body)", "serif"],
        sans: ["var(--font-body)", "serif"],
      },
      colors: {
        sanctuary: {
          cream: "#FFF5E1",
          stone: "#E4CCAB",
          gold: "#F1D08A",
          terracotta: "#C65B3A",
          sky: "#8AAEC4",
          shadow: "#5A4736",
        },
      },
    },
  },
  plugins: [],
};
