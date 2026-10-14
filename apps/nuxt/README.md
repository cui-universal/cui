# CUI Universal Nuxt 3 Demo

This Nuxt 3 application demonstrates how to consume the published npm packages:
- [`@cui-universal/vue`](https://www.npmjs.com/package/@cui-universal/vue)
- [`@cui-universal/theme`](https://www.npmjs.com/package/@cui-universal/theme)

## Features
- **Zero External UI Dependencies**: Completely self-contained, accessible, lightweight components (no Radix UI or headless UI dependencies).
- **Nuxt 3 SSR + Hydration**: Built with full SSR support and seamless client-side reactivity.
- **Tailwind CSS Preset**: Powered by `@cui-universal/theme`'s `cuiTailwindPreset` and CSS custom properties.
- **Light & Dark Mode**: Native class-based dark mode toggle with CSS design tokens.

## Getting Started

### Installation
```bash
# npm
npm install @cui-universal/vue @cui-universal/theme @nuxtjs/tailwindcss lucide-vue-next

# pnpm
pnpm add @cui-universal/vue @cui-universal/theme @nuxtjs/tailwindcss lucide-vue-next

# yarn
yarn add @cui-universal/vue @cui-universal/theme @nuxtjs/tailwindcss lucide-vue-next
```

### Configuration
1. In `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

export default {
  presets: [cuiTailwindPreset],
  darkMode: "class",
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./node_modules/@cui-universal/vue/**/*.{js,ts,vue,mjs}",
  ],
} satisfies Config;
```

2. In `assets/css/tailwind.css`:
```css
@import "@cui-universal/theme/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. In `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
});
```

### Component Usage
```vue
<script setup>
import {
  CuiButton,
  CuiBadge,
  CuiCard,
  CuiCardHeader,
  CuiCardTitle,
  CuiCardDescription,
  CuiCardContent,
  CuiSwitch,
  CuiCheckbox,
  CuiDialog,
  CuiDropdownMenu,
  CuiAccordion,
  CuiProgress,
} from "@cui-universal/vue";
</script>

<template>
  <CuiCard>
    <CuiCardHeader>
      <CuiCardTitle>Welcome to Nuxt 3 with CUI</CuiCardTitle>
      <CuiCardDescription>Clean, universal components.</CuiCardDescription>
    </CuiCardHeader>
    <CuiCardContent>
      <CuiButton variant="primary">Click Me</CuiButton>
    </CuiCardContent>
  </CuiCard>
</template>
```

### Run Locally
```bash
# Within the monorepo:
pnpm --filter cui-nuxt-demo dev

# Or directly in apps/nuxt:
cd apps/nuxt
pnpm dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.
