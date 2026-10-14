import { cuiTailwindPreset } from "@cui-universal/theme";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [cuiTailwindPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/react/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/theme/src/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
