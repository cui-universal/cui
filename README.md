# CUI - Universal Cross-Framework UI Components

A high-performance, accessible, and themeable UI component system designed for **Vue 3, Nuxt 4, React, and Next.js** with 100% aesthetic and functional parity — combining the best developer experience of **Nuxt UI** and **shadcn/ui**.

---

## 🌟 Why CUI?

In modern full-stack web development, teams often work across multiple frameworks:
- **Next.js / React** for customer-facing web applications or dashboards
- **Nuxt 4 / Vue** for content hubs, internal tools, or high-performance SSR apps

Traditionally, you would need two separate design systems (e.g. `shadcn/ui` for React and `nuxt/ui` for Vue) resulting in design drift, mismatched props, and double the maintenance.

**CUI solves this with a 3-tier architecture:**

```
                        ┌────────────────────────┐
                        │      @cui-universal/theme        │
                        │  Design Tokens (HSL)   │
                        │  Tailwind CSS Preset   │
                        │  Shared Variants (tv)  │
                        └───────────┬────────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 ▼                                     ▼
      ┌─────────────────────┐               ┌─────────────────────┐
      │     @cui-universal/react      │               │      @cui-universal/vue       │
      │  React 18 / 19      │               │  Vue 3 / Nuxt 4     │
      │  Next.js (App / SSR)│               │  SSR & Auto-imports │
      │  Custom Primitives  │               │  Custom Primitives  │
      └─────────────────────┘               └─────────────────────┘
```

---

## 📦 Monorepo Packages

| Package | Framework | Purpose | Primitive Engine |
| :--- | :--- | :--- | :--- |
| [`@cui-universal/theme`](./packages/theme) | Universal | Single source of truth for CSS variables, Tailwind preset, and `tailwind-variants` (`tv`) | Tailwind CSS + TV |
| [`@cui-universal/react`](./packages/react) | React & Next.js | Fully typed React components with `asChild` slot polymorphism | Custom CUI Primitives (Zero External UI Dependencies) |
| [`@cui-universal/vue`](./packages/vue) | Vue 3 & Nuxt 4 | Fully typed Vue components with SFC templates and auto-imports | Custom CUI Primitives (Zero External UI Dependencies) |
| [`docs`](./apps/docs) | Vite / React | Interactive playground & side-by-side framework comparison showcase | CUI Components |

---

## 🚀 Quickstart: React & Next.js

### 1. Install dependencies & Tailwind CSS
```bash
# pnpm
pnpm add @cui-universal/react @cui-universal/theme lucide-react
pnpm add -D tailwindcss postcss autoprefixer

# npm
npm install @cui-universal/react @cui-universal/theme lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### 2. Configure Tailwind CSS
In `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

export default {
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    ...cuiContent("react"),
  ],
} satisfies Config;
```

### 3. Setup CSS & Import Tokens
In your global stylesheet (`app/globals.css` or `src/index.css`):
```css
@import "@cui-universal/theme/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Use Components
```tsx
import { Button, Dialog, DialogTrigger, DialogContent } from "@cui-universal/react";

export default function Page() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <h2>Hello from Next.js & CUI!</h2>
      </DialogContent>
    </Dialog>
  );
}
```

---

## ⚡ Quickstart: Vue 3 & Nuxt 4

### 1. Install dependencies & Tailwind CSS

**For Nuxt 4:**
```bash
# pnpm
pnpm add @cui-universal/vue @cui-universal/theme
pnpm add -D @nuxtjs/tailwindcss @nuxt/icon nuxt

# npm
npm install @cui-universal/vue @cui-universal/theme
npm install -D @nuxtjs/tailwindcss @nuxt/icon nuxt
```

**For Vue 3 (Vite):**
```bash
# pnpm
pnpm add @cui-universal/vue @cui-universal/theme lucide-vue-next
pnpm add -D tailwindcss postcss autoprefixer
```

### 2. Configure Nuxt 4
In `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@cui-universal/vue/nuxt", // Auto-injects styles.css & registers all components
    "@nuxt/icon",             // Icon support
  ],
});
```

In `tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

export default <Partial<Config>>{
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    ...cuiContent("vue"),
  ],
};
```

### 3. Use Components in Nuxt 4 (Auto-Imported — No Imports Required!)
```vue
<!-- app/pages/index.vue -->
<template>
  <main class="p-8 max-w-xl mx-auto space-y-4">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Welcome to Nuxt 4 + CUI</CardTitle>
          <Badge variant="secondary">Auto-imported</Badge>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <Button variant="primary" class="gap-2">
          <Icon name="lucide:sparkles" class="h-4 w-4" />
          <span>Get Started</span>
        </Button>
      </CardContent>
    </Card>
  </main>
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
