# @cui-universal/vue

[![npm version](https://img.shields.io/npm/v/@cui-universal/vue.svg?style=flat-square&color=emerald)](https://www.npmjs.com/package/@cui-universal/vue)
[![npm downloads](https://img.shields.io/npm/dm/@cui-universal/vue.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@cui-universal/vue)
[![license](https://img.shields.io/npm/l/@cui-universal/vue.svg?style=flat-square)](https://github.com/cui-universal/cui/blob/main/LICENSE)

Universal, accessible, and high-performance Vue 3 & Nuxt (Nuxt 3 & Nuxt 4) UI components. Built with native Vue Single File Components (SFCs), custom lightweight primitives with zero heavy external UI dependencies, automatic component registration, and 100% parity with `@cui-universal/react`.

---

## 🌟 Highlights

- ⚡ **Zero Heavy UI Dependencies**: Built on proprietary lightweight CUI primitives — no bulky 3rd party runtime dependencies.
- 💚 **First-Class Nuxt Support**: Includes `@cui-universal/vue/nuxt` module with automatic component auto-imports, theme style injection, and Nuxt 4 compatibility.
- 🎨 **Tailwind CSS & Token Driven**: Styled using `@cui-universal/theme` and `tailwind-variants` with CSS variable design tokens.
- 🌓 **Dark Mode Out-of-the-Box**: Native `.dark` class support with consistent HSL color schemes.
- 🔌 **Vue 3 Plugin Support**: Easily register globally in Vue SPAs with `app.use(CUIPlugin)`.
- 🧩 **Works With `@nuxt/icon`**: Cleanly combines with `@nuxt/icon` for effortless icon integration.
- 🔄 **Universal Parity**: Identical naming, props, and design aesthetics across Vue and React.

---

## 📦 Installation

```bash
# pnpm
pnpm add @cui-universal/vue @cui-universal/theme lucide-vue-next

# npm
npm install @cui-universal/vue @cui-universal/theme lucide-vue-next

# yarn
yarn add @cui-universal/vue @cui-universal/theme lucide-vue-next

# bun
bun add @cui-universal/vue @cui-universal/theme lucide-vue-next
```

---

## ⚡ Nuxt Quick Start (Nuxt 3 & Nuxt 4)

### 1. Add Module to `nuxt.config.ts`

Simply add `@cui-universal/vue/nuxt` to your `modules` array. The module will automatically inject the theme styles and auto-register all components:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@cui-universal/vue/nuxt",
    "@nuxt/icon", // Optional: for icon support
  ],
  // Optional module configuration:
  cui: {
    prefix: "", // Optional component prefix e.g. 'Cui' -> <CuiButton />
    injectStyles: true, // Automatically injects @cui-universal/theme/styles.css
  },
});
```

### 2. Configure Tailwind CSS

In `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

export default <Config>{
  presets: [cuiTailwindPreset],
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    // Include CUI Vue distribution files
    "./node_modules/@cui-universal/vue/**/*.{js,mjs,vue}",
  ],
};
```

### 3. Use in Templates (No Imports Needed!)

With `@cui-universal/vue/nuxt`, all CUI components are **automatically imported**:

```vue
<!-- app/pages/index.vue -->
<template>
  <div class="p-8 max-w-xl mx-auto space-y-6">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Nuxt + CUI Universal</CardTitle>
          <Badge variant="outline">Auto-imported</Badge>
        </div>
        <CardDescription>
          No manual imports required in templates or scripts!
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <Input placeholder="Enter your username..." />
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  </div>
</template>
```

---

## 🚀 Vue 3 + Vite Quick Start

### 1. Configure Tailwind CSS

In `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  presets: [cuiTailwindPreset],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@cui-universal/vue/**/*.{js,mjs,vue}",
  ],
};

export default config;
```

### 2. Register Plugin in `src/main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { CUIPlugin } from "@cui-universal/vue";

// Import theme CSS variables
import "@cui-universal/theme/styles.css";
import "./style.css";

const app = createApp(App);
app.use(CUIPlugin); // Globally registers Button, Card, Dialog, etc.
app.mount("#app");
```

Or import components on-demand in `<script setup>`:

```vue
<script setup lang="ts">
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@cui-universal/vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Vue 3 App</CardTitle>
    </CardHeader>
    <CardContent>
      <Button variant="default">Click Me</Button>
    </CardContent>
  </Card>
</template>
```

---

## 🗂️ Included Components

| Category | Components |
| :--- | :--- |
| **Actions & Inputs** | `Button`, `Input`, `NumberInput` (`InputNumber`), `Textarea`, `Checkbox`, `RadioGroup`, `RadioGroupItem`, `Switch`, `Select`, `ColorPicker`, `DatePicker`, `TextEditor` |
| **Data Display** | `Badge`, `Card`, `Table`, `Avatar`, `Kbd`, `Steps`, `Timeline`, `Rating`, `EmptyState` |
| **Navigation** | `Breadcrumb`, `Pagination`, `Tabs` |
| **Overlays & Feedback** | `Dialog`, `Popover`, `Tooltip`, `DropdownMenu`, `Alert`, `Progress`, `Skeleton`, `Separator`, `Accordion` |

---

## ⚡ CLI Initialization

Scaffold a configured Vue 3 or Nuxt project in seconds:

```bash
# Nuxt
npx @cui-universal/theme init nuxt

# Vue 3 + Vite
npx @cui-universal/theme init vue
```

---

## 📄 License

MIT License © [CUI Team](https://github.com/cui-universal/cui)
