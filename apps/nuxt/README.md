# CUI Universal Nuxt 4 Demo

This Nuxt 4 application demonstrates how to consume the published npm packages:
- [`@cui-universal/vue`](https://www.npmjs.com/package/@cui-universal/vue)
- [`@cui-universal/theme`](https://www.npmjs.com/package/@cui-universal/theme)

## Features
- **Zero Manual Component Imports**: All CUI components (`Button`, `Card`, `Badge`, `Input`, `Dialog`, `Table`, etc.) are auto-imported via `@cui-universal/vue/nuxt`.
- **Nuxt 4 Ready**: Built for Nuxt 4 with full SSR and Nitro server support.
- **`@nuxt/icon` Integration**: Seamlessly combined with `@nuxt/icon` (`<Icon name="lucide:..." />`).
- **Tailwind CSS Preset**: Powered by `@cui-universal/theme`'s `cuiTailwindPreset` and CSS custom properties.
- **Light & Dark Mode**: Native class-based dark mode toggle with CSS design tokens.

## Getting Started

### Installation
```bash
# pnpm
pnpm add @cui-universal/vue @cui-universal/theme
pnpm add -D @nuxtjs/tailwindcss @nuxt/icon nuxt

# npm
npm install @cui-universal/vue @cui-universal/theme
npm install -D @nuxtjs/tailwindcss @nuxt/icon nuxt
```

### Configuration
1. In `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: [
    "@nuxtjs/tailwindcss",
    "@cui-universal/vue/nuxt",
    "@nuxt/icon",
  ],
  // Optional module settings
  cui: {
    prefix: "", // Optional prefix e.g. "Cui" -> <CuiButton />
    injectStyles: true, // Injects @cui-universal/theme/styles.css automatically
  },
});
```

2. In `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

export default <Config>{
  presets: [cuiTailwindPreset],
  darkMode: "class",
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./node_modules/@cui-universal/vue/**/*.{js,ts,vue,mjs}",
  ],
};
```

### Component Usage (No Imports Required!)

```vue
<!-- app/pages/index.vue -->
<template>
  <div class="space-y-4">
    <!-- CUI components are auto-imported automatically -->
    <Card>
      <CardHeader>
        <CardTitle>Nuxt 4 + CUI Demo</CardTitle>
        <CardDescription>Zero import boilerplate required!</CardDescription>
      </CardHeader>
      <CardContent class="space-y-3">
        <Input placeholder="Enter username..." />
        <Button class="gap-2">
          <!-- Seamless @nuxt/icon integration -->
          <Icon name="lucide:sparkles" class="h-4 w-4" />
          <span>Launch Project</span>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
```

### Run Locally
```bash
# In apps/nuxt:
pnpm dev

# Or from workspace root:
pnpm --filter cui-nuxt-demo dev
```
