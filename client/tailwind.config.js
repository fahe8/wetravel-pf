/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // added new 4 column grid as new4
        new4: "repeat(3, minmax(0, 1fr)) 60px",
      },
    },
  },
  plugins: [],
};
