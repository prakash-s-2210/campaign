/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#877EFF',
        
      },
      fontFamily: {
        "public-sans": ['Public Sans', 'sans-serif'],
        "questrial": ['Questrial', 'sans-serif']
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

