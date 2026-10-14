import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

export default <Partial<Config>>{
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};
