/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        "blue-dark": "#2C3333",
        blue: "#395B64",
        "blue-light": "#A5C9CA",
        "blue-extra-light": "#E7F6F2",
      },
    },
  },
  plugins: [],
};
