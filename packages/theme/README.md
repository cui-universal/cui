# @cui-universal/theme

[![npm version](https://img.shields.io/npm/v/@cui-universal/theme.svg?style=flat-square&color=emerald)](https://www.npmjs.com/package/@cui-universal/theme)
[![npm downloads](https://img.shields.io/npm/dm/@cui-universal/theme.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@cui-universal/theme)
[![license](https://img.shields.io/npm/l/@cui-universal/theme.svg?style=flat-square)](https://github.com/cui-universal/cui/blob/main/LICENSE)

Universal design tokens, Tailwind CSS preset, CSS variables, and CLI scaffolding engine powering `@cui-universal/react` and `@cui-universal/vue`.

---

## 🌟 Features

- 🎨 **HSL CSS Variable Tokens**: Harmonious palette system with automatic dark-mode switching.
- 🛠️ **Tailwind CSS Preset**: Drop-in preset (`cuiTailwindPreset`) extending Tailwind colors, radius, border, and accordion keyframe animations.
- ⚡ **Built-in `cn` & `tv` utilities**: Bundles `clsx`, `tailwind-merge`, and `tailwind-variants` so you don't have to install them separately.
- 📦 **CLI Scaffolding**: Fast scaffolding command (`cui init`) to set up Next.js, React, Nuxt 3 / 4, and Vue projects.
- 🌐 **Cross-Framework Single Source of Truth**: Guaranteed identical token values across React and Vue.

---

## 📦 Installation

```bash
# pnpm
pnpm add @cui-universal/theme

# npm
npm install @cui-universal/theme

# yarn
yarn add @cui-universal/theme

# bun
bun add @cui-universal/theme
```

---

## 🚀 Usage

### 1. Tailwind CSS Preset

Add `cuiTailwindPreset` to your `tailwind.config.ts` or `tailwind.config.js`:

```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  presets: [cuiTailwindPreset],
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,vue}",
    "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
    "./node_modules/@cui-universal/vue/dist/**/*.{js,mjs,vue}",
  ],
};

export default config;
```

### 2. Import CSS Variables

Import the theme stylesheet into your global entry file:

```ts
import "@cui-universal/theme/styles.css";
```

Or in vanilla CSS:

```css
@import "@cui-universal/theme/styles.css";
```

### 3. Class Names Utility (`cn`)

Use the bundled `cn` helper for conditional classes with `tailwind-merge` resolution:

```ts
import { cn } from "@cui-universal/theme";

const className = cn(
  "px-4 py-2 font-medium rounded-md",
  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
  customClass
);
```

### 4. Component Variants (`tv`)

Create your own type-safe variant components using the bundled `tailwind-variants` export:

```ts
import { tv, type VariantProps } from "@cui-universal/theme";

export const alertVariants = tv({
  base: "relative w-full rounded-lg border p-4",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
```

---

## 💻 CLI Scaffolding Tool

`@cui-universal/theme` comes with an executable CLI to scaffold CUI configurations in your projects:

```bash
# Next.js
npx @cui-universal/theme init next

# React + Vite
npx @cui-universal/theme init react

# Nuxt
npx @cui-universal/theme init nuxt

# Vue 3 + Vite
npx @cui-universal/theme init vue
```

This will automatically create or configure `tailwind.config.ts`, import theme styles, and setup dependency configurations.

---

## 🎨 Token Variables Reference

CUI themes use HSL variables mapped to CSS custom properties:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;
}
```

---

## 📄 License

MIT License © [CUI Team](https://github.com/cui-universal/cui)
