import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: ({ colors }) => ({
      primary: {
        50: "#faf7fd",
        100: "#f4ecfb",
        200: "#ebdcf8",
        300: "#dcc1f1",
        400: "#c699e7",
        500: "#af72da",
        600: "#a361ce",
        700: "#8540b0",
        800: "#703990",
        900: "#5c2f74",
        950: "#3e1754",
      },
      accent: {
        50: "#effef7",
        100: "#dafeef",
        200: "#b8fadd",
        300: "#81f4c3",
        400: "#43e5a0",
        500: "#1acd81",
        600: "#0fa968",
        700: "#108554",
        800: "#126945",
        900: "#11563a",
        950: "#03301f",
      },
      neutral: colors.zinc,
      success: colors.lime,
      danger: colors.red,
      transparent: colors.transparent,
    }),
    fontFamily: {
      ubuntu: ["Ubuntu sans", "sans-serif"],
    },
  },
  plugins: [],
};
