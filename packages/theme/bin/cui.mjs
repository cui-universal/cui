#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const command = args[0] || "help";

function log(msg, color = "\x1b[36m") {
  console.log(`${color}${msg}\x1b[0m`);
}

function success(msg) {
  console.log(`\x1b[32m✔ ${msg}\x1b[0m`);
}

function info(msg) {
  console.log(`\x1b[34mℹ ${msg}\x1b[0m`);
}

function detectFramework(targetDir) {
  const pkgPath = path.join(targetDir, "package.json");
  let pkg = {};
  if (fs.existsSync(pkgPath)) {
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    } catch {
      // ignore
    }
  }

  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  if (
    fs.existsSync(path.join(targetDir, "nuxt.config.ts")) ||
    fs.existsSync(path.join(targetDir, "nuxt.config.js")) ||
    allDeps["nuxt"]
  ) {
    return "nuxt";
  }

  if (
    fs.existsSync(path.join(targetDir, "next.config.js")) ||
    fs.existsSync(path.join(targetDir, "next.config.mjs")) ||
    fs.existsSync(path.join(targetDir, "next.config.ts")) ||
    allDeps["next"]
  ) {
    return "next";
  }

  if (allDeps["vue"]) {
    return "vue";
  }

  if (allDeps["react"]) {
    return "react";
  }

  return "react";
}

function getTailwindConfigTemplate(framework) {
  const isVueOrNuxt = framework === "vue" || framework === "nuxt";
  const contentPattern = isVueOrNuxt
    ? "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}"
    : "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}";

  const appContent =
    framework === "next"
      ? `    "./app/**/*.{js,ts,jsx,tsx}",\n    "./components/**/*.{js,ts,jsx,tsx}",\n    "./pages/**/*.{js,ts,jsx,tsx}",`
      : framework === "nuxt"
      ? `    "./components/**/*.{vue,js,ts}",\n    "./layouts/**/*.vue",\n    "./pages/**/*.vue",\n    "./app.vue",`
      : framework === "vue"
      ? `    "./index.html",\n    "./src/**/*.{vue,js,ts,jsx,tsx}",`
      : `    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",`;

  return `import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  // Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
${appContent}
    // Scan @cui-universal distribution files
    "${contentPattern}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`;
}

function getCuiConfigTemplate(framework) {
  return `/**
 * CUI Universal Design System Configuration
 * Framework: ${framework}
 */
export default {
  framework: "${framework}",
  theme: {
    radius: "0.5rem",
    primary: "indigo",
  },
};
`;
}

function runInit() {
  const targetDir = process.cwd();
  const explicitFramework = args[1]?.toLowerCase();
  const validFrameworks = ["react", "next", "vue", "nuxt"];

  let framework = validFrameworks.includes(explicitFramework)
    ? explicitFramework
    : detectFramework(targetDir);

  log("\n✨ CUI Universal — Project Configurator", "\x1b[35m\x1b[1m");
  info(`Target framework: ${framework.toUpperCase()}`);

  // 1. Create or update tailwind.config.ts / tailwind.config.js
  const hasTs =
    fs.existsSync(path.join(targetDir, "tsconfig.json")) ||
    fs.existsSync(path.join(targetDir, "tailwind.config.ts"));
  const tailwindFileName = hasTs ? "tailwind.config.ts" : "tailwind.config.js";
  const tailwindPath = path.join(targetDir, tailwindFileName);

  if (!fs.existsSync(tailwindPath)) {
    fs.writeFileSync(tailwindPath, getTailwindConfigTemplate(framework), "utf-8");
    success(`Created ${tailwindFileName} with CUI preset & content scanning.`);
  } else {
    // Check if cuiTailwindPreset is already present
    const existingContent = fs.readFileSync(tailwindPath, "utf-8");
    if (!existingContent.includes("cuiTailwindPreset")) {
      // Create backup and rewrite or inform
      const backupPath = path.join(targetDir, `${tailwindFileName}.cui.backup`);
      fs.writeFileSync(backupPath, existingContent, "utf-8");
      fs.writeFileSync(tailwindPath, getTailwindConfigTemplate(framework), "utf-8");
      success(`Updated ${tailwindFileName} with CUI preset (previous config backed up to ${path.basename(backupPath)}).`);
    } else {
      info(`${tailwindFileName} already contains CUI configuration.`);
    }
  }

  // 2. Create cui.config.ts
  const cuiConfigPath = path.join(targetDir, hasTs ? "cui.config.ts" : "cui.config.js");
  if (!fs.existsSync(cuiConfigPath)) {
    fs.writeFileSync(cuiConfigPath, getCuiConfigTemplate(framework), "utf-8");
    success(`Created ${path.basename(cuiConfigPath)}.`);
  }

  // 3. Inform about CSS import
  log("\n📦 Setup Complete! Next Steps:", "\x1b[33m\x1b[1m");
  if (framework === "nuxt") {
    console.log(`  1. In \x1b[36mnuxt.config.ts\x1b[0m, add the CUI module:
     modules: ["@cui-universal/vue/nuxt", "@nuxtjs/tailwindcss"]
`);
  } else if (framework === "next") {
    console.log(`  1. In \x1b[36mapp/layout.tsx\x1b[0m (or styles/globals.css), import the theme stylesheet:
     import "@cui-universal/theme/styles.css";
`);
  } else if (framework === "vue") {
    console.log(`  1. In \x1b[36msrc/main.ts\x1b[0m (or style.css), import the theme stylesheet:
     import "@cui-universal/theme/styles.css";
`);
  } else {
    console.log(`  1. In \x1b[36msrc/main.tsx\x1b[0m (or index.css), import the theme stylesheet:
     import "@cui-universal/theme/styles.css";
`);
  }

  console.log(`  2. Start rendering components:
     ${
       framework === "vue" || framework === "nuxt"
         ? `import { Button, Card, Badge } from "@cui-universal/vue";`
         : `import { Button, Card, Badge } from "@cui-universal/react";`
     }
`);
}

function showHelp() {
  console.log(`
CUI CLI Tool

Usage:
  npx @cui-universal/theme init [react | next | vue | nuxt]
  cui init [react | next | vue | nuxt]

Commands:
  init [framework]    Automatically configure Tailwind CSS & create config files for CUI
  help                Show this help message
`);
}

if (command === "init") {
  runInit();
} else {
  showHelp();
}
