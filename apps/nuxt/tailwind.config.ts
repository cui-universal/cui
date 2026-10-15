import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

export default <Partial<Config>>{
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    ...cuiContent("vue"),
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

