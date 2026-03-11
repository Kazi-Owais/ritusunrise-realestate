/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f2951', // Navy Blue from logo
          dark: '#081734',
          light: '#1b3e73',
        },
        accent: {
          DEFAULT: '#e69f00', // Gold/Yellow from logo
          dark: '#cc8c00',
          light: '#ffbf33',
        }
      },
    },
  },
  plugins: [
  ],
  darkMode: 'class',
}
