import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        nuxt: path.resolve(__dirname, "src/nuxt.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["vue", "lucide-vue-next", "@cui-universal/theme"],
      output: {
        exports: "named",
      },
    },
  },
});
