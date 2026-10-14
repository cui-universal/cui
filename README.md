# CUI - Universal Cross-Framework UI Components

A high-performance, accessible, and themeable UI component system designed for **Vue 3, Nuxt 3, React, and Next.js** with 100% aesthetic and functional parity — combining the best developer experience of **Nuxt UI** and **shadcn/ui**.

---

## 🌟 Why CUI?

In modern full-stack web development, teams often work across multiple frameworks:
- **Next.js / React** for customer-facing web applications or dashboards
- **Nuxt 3 / Vue** for content hubs, internal tools, or high-performance SSR apps

Traditionally, you would need two separate design systems (e.g. `shadcn/ui` for React and `nuxt/ui` for Vue) resulting in design drift, mismatched props, and double the maintenance.

**CUI solves this with a 3-tier architecture:**

```
                        ┌────────────────────────┐
                        │      @cui/theme        │
                        │  Design Tokens (HSL)   │
                        │  Tailwind CSS Preset   │
                        │  Shared Variants (tv)  │
                        └───────────┬────────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 ▼                                     ▼
      ┌─────────────────────┐               ┌─────────────────────┐
      │     @cui/react      │               │      @cui/vue       │
      │  React 18 / 19      │               │  Vue 3 / Nuxt 3     │
      │  Next.js (App / SSR)│               │  SSR & Auto-imports │
      │  Custom Primitives  │               │  Custom Primitives  │
      └─────────────────────┘               └─────────────────────┘
```

---

## 📦 Monorepo Packages

| Package | Framework | Purpose | Primitive Engine |
| :--- | :--- | :--- | :--- |
| [`@cui/theme`](./packages/theme) | Universal | Single source of truth for CSS variables, Tailwind preset, and `tailwind-variants` (`tv`) | Tailwind CSS + TV |
| [`@cui/react`](./packages/react) | React & Next.js | Fully typed React components with `asChild` slot polymorphism | Custom CUI Primitives (Zero External UI Dependencies) |
| [`@cui/vue`](./packages/vue) | Vue 3 & Nuxt 3 | Fully typed Vue components with SFC templates and auto-imports | Custom CUI Primitives (Zero External UI Dependencies) |
| [`docs`](./apps/docs) | Vite / React | Interactive playground & side-by-side framework comparison showcase | CUI Components |

---

## 🚀 Quickstart: React & Next.js

### 1. Install dependencies
```bash
npm install @cui/react @cui/theme
# or
pnpm add @cui/react @cui/theme
```

### 2. Configure Tailwind CSS
In `tailwind.config.ts`:
```ts
import { cuiTailwindPreset } from "@cui/theme";

export default {
  presets: [cuiTailwindPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@cui/react/dist/**/*.{js,mjs}",
  ],
};
```

### 3. Import Styles
In `app/layout.tsx`:
```tsx
import "@cui/theme/styles.css";
```

### 4. Use Components
```tsx
import { Button, Dialog, DialogTrigger, DialogContent } from "@cui/react";

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <h2>Hello from Next.js!</h2>
      </DialogContent>
    </Dialog>
  );
}
```

---

## ⚡ Quickstart: Vue 3 & Nuxt 3

### 1. Install dependencies
```bash
npm install @cui/vue @cui/theme
# or
pnpm add @cui/vue @cui/theme
```

### 2. Configure Nuxt 3
In `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  css: ["@cui/theme/styles.css"],
  modules: ["@nuxtjs/tailwindcss"],
});
```

In `tailwind.config.ts`:
```ts
import { cuiTailwindPreset } from "@cui/theme";

export default {
  presets: [cuiTailwindPreset],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./node_modules/@cui/vue/dist/**/*.{js,cjs}",
  ],
};
```

### 3. Use Components in Vue / Nuxt
```vue
<script setup lang="ts">
import { Button, Dialog, DialogTrigger, DialogContent } from "@cui/vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default">Open Modal</Button>
    </DialogTrigger>
    <DialogContent>
      <h2>Hello from Nuxt 3!</h2>
    </DialogContent>
  </Dialog>
</template>
```

---

## 🎨 Supported Components (22 Core Primitives)

| Component | React Export | Vue Export | Features |
| :--- | :--- | :--- | :--- |
| **Button** | `<Button />` | `<Button />` | 7 variants (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `success`), 4 sizes, `loading` spinner, `asChild` |
| **Input** | `<Input />` | `<Input />` | `default`, `error`, sizes, responsive focus rings, `v-model` binding |
| **Textarea** | `<Textarea />` | `<Textarea />` | Multi-line text field, error variant, responsive focus rings |
| **Checkbox** | `<Checkbox />` | `<Checkbox />` | Accessible checkbox with animated checkmark indicator |
| **Switch** | `<Switch />` | `<Switch />` | Accessible toggle switch with smooth thumb transitions |
| **Badge** | `<Badge />` | `<Badge />` | `default`, `secondary`, `outline`, `success`, `warning`, `destructive`, sizes |
| **Card** | `<Card />`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Same | Composable card layout, interactive hover state |
| **Tabs** | `<Tabs />`, `TabsList`, `TabsTrigger`, `TabsContent` | Same | Layered tabs with active sliding indicator pill |
| **Accordion** | `<Accordion />`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Same | Collapsible disclosure with animated height transition |
| **Separator** | `<Separator />` | `<Separator />` | Horizontal or vertical visual divider |
| **Progress** | `<Progress />` | `<Progress />` | Animated progress bar with smooth indicator transform |
| **Skeleton** | `<Skeleton />` | `<Skeleton />` | Shimmer pulse placeholder for loading states |
| **Tooltip** | `<Tooltip />`, `TooltipTrigger`, `TooltipContent` | Same | Contextual popover tooltip on hover or focus |
| **Dialog** | `<Dialog />`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter` | Same | Focus trap, animated backdrop blur, keyboard ESC dismissal |
| **Avatar** | `<Avatar />`, `AvatarImage`, `AvatarFallback` | Same | Sizes `sm`, `md`, `lg`, `xl`, fallback initials on load failure |
| **Alert** | `<Alert />`, `AlertTitle`, `AlertDescription` | Same | Contextual banners: `default`, `info`, `success`, `warning`, `destructive` |
| **DropdownMenu** | `<DropdownMenu />`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, ... | Same | Dropdown menu with submenus, checkboxes, radio items, shortcuts |
| **Popover** | `<Popover />`, `PopoverTrigger`, `PopoverContent` | Same | Floating popover overlay with auto-positioning |
| **Select** | `<Select />`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, ... | Same | Accessible select dropdown with keyboard navigation |
| **RadioGroup** | `<RadioGroup />`, `RadioGroupItem` | Same | Radio button group with roving tabindex |
| **Table** | `<Table />`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | Same | Responsive data tables with clean styling and borders |
| **Kbd** | `<Kbd />` | `<Kbd />` | Keyboard shortcut badge element |

---

## 🛠️ Development & Monorepo Workflow

### Install dependencies
```bash
pnpm install
```

### Build all packages
```bash
pnpm build
```

### Run documentation playground
```bash
pnpm --filter docs dev
# Opens at http://localhost:3000
```

### Adding a New Component
1. **Define Variants**: Add `packages/theme/src/components/<name>.ts` using `tv()` and export in `packages/theme/src/index.ts`.
2. **React Implementation**: Create `packages/react/src/<Name>.tsx` using the variants and CUI custom primitives.
3. **Vue Implementation**: Create `packages/vue/src/<Name>.vue` using the same variants and CUI custom primitives.
4. **Rebuild**: Run `pnpm build`.
