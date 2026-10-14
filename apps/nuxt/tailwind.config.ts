import path from "node:path";
import { createRequire } from "node:module";
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const require = createRequire(import.meta.url);
const cuiThemeDir = path.dirname(require.resolve("@cui-universal/theme"));
const cuiVueDir = path.dirname(require.resolve("@cui-universal/vue"));

export default <Partial<Config>>{
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    `${cuiThemeDir}/**/*.{js,mjs,cjs}`,
    `${cuiVueDir}/**/*.{js,mjs,cjs}`,
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
