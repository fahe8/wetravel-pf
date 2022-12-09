/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // added new 4 column grid as new4
        new4: "repeat(3, minmax(0, 1fr)) 60px",
      },
      colors: {
        primary: {
          600: "#ff6666",
        },
        secondary: {
          100: "#b8adad",
          900: "#131517",
        },
      },
    },
  },
  plugins: [],
};
