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
        body: ["var(--font-cormorant)", "serif"],
        display: ["var(--font-cinzel)", "serif"],
      },
      colors: {
        sanctuaryLinen: "#fdf2e3",
        sanctuaryCream: "#f4d8a8",
        sanctuaryGold: "#d7ad62",
        sanctuaryTerracotta: "#c65b3a",
        sanctuaryBrick: "#93412c",
        sanctuaryDeep: "#513526",
        sanctuarySky: "#88a2c0",
      },
    },
  },
  plugins: [],
};
