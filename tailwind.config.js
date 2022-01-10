const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      outlineOffset: {
        0: "0",
        1: "1px",
        2: "2px",
        4: "4px",
      },
      colors: {
        darkGrey: "var(--color-dark-light)",
        darkBlack: "var(--color-dark-dark)",
        primary: colors.violet[500],
        primaryLight: colors.violet[400],
        warning: colors.amber[500],
        info: colors.indigo[600],
        success: colors.emerald[500],
        error: colors.red[500],
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
    },
  },
  variants: {
    scrollbar: ["rounded"]
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwindcss-enhanced-outlines-plugin"),
  ],
};
