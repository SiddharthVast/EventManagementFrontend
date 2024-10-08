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
      colors: {
        "custom-brown": "#A52A2A", // Custom color name
        "custom-brown-head": "#8B0000",
      },
      spacing: {
        8: "2em", // Custom spacing for gap
      },
    },
  },
  plugins: [require('daisyui')],
};
