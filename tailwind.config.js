const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      transitionDuration: {
        300: "300ms",
        500: "500ms",
      },
      colors: {
        darkGrey: "var(--color-dark-light)",
        darkBlack: "var(--color-dark-dark)",
        primary: colors.purple[500],
        primaryLight: colors.purple[400],
        warning: colors.yellow[500],
        info: colors.indigo[600],
        success: colors.green[500],
        error: colors.red[500],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};