const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ['var(--font-mont)', ...fontFamily.sans]
      },
      colors: {
        primary: {
          dark: "#9494b8",
          light: "#5c5c8a"
        },
        light: "#29293d",
        dark: "#f0f0f5",
      },
      backgroundColor: {
        dark: "#0a0a0f",
        light: "#f0f0f5",
        board: {
          light: "#e0e0eb",
          dark: "#14141f"
        },
        cards: {
          light: "#d1d1e0",
          dark: "#1f1f2e"
        },
        hover: {
          dark: "#29293d",
          light: "#c2c2d6"
        },
        button: {
          light: "#b3b3cc",
          dark: "#33334d",
          hover: {
            light: "#a3a3c2",
            dark: "#3d3d5c"
          }
        }

      },
    },
  },
  plugins: [],
}
