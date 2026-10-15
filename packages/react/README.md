# @cui-universal/react

[![npm version](https://img.shields.io/npm/v/@cui-universal/react.svg?style=flat-square&color=indigo)](https://www.npmjs.com/package/@cui-universal/react)
[![npm downloads](https://img.shields.io/npm/dm/@cui-universal/react.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@cui-universal/react)
[![license](https://img.shields.io/npm/l/@cui-universal/react.svg?style=flat-square)](https://github.com/cui-universal/cui/blob/main/LICENSE)

Universal, accessible, and high-performance React UI components for **React 18 & 19** and **Next.js** (App Router & Pages Router). Built on custom CUI primitives with zero heavy external UI dependencies, complete Tailwind CSS styling, and 100% parity with `@cui-universal/vue`.

---

## 🌟 Highlights

- ⚡ **Zero Heavy UI Dependencies**: Built on proprietary lightweight CUI primitives — no bulky 3rd party runtime dependencies.
- 🎨 **Tailwind CSS & Token Driven**: Seamlessly styled using `@cui-universal/theme` and `tailwind-variants` with CSS variable design tokens.
- 🌓 **Dark Mode Out-of-the-Box**: Native `.dark` class support with consistent HSL color schemes.
- 🚀 **Next.js App Router & Server Components**: Safe for SSR, client components, and progressive enhancement.
- 🧩 **Slot Polymorphism**: Flexible `asChild` pattern for rendering custom tags and links without wrapper divs.
- 🔄 **Universal Parity**: Identical naming, props, and design aesthetics across React and Vue.

---

## 📦 Installation

Install `@cui-universal/react`, `@cui-universal/theme`, and `lucide-react`:

```bash
# pnpm
pnpm add @cui-universal/react @cui-universal/theme lucide-react

# npm
npm install @cui-universal/react @cui-universal/theme lucide-react

# yarn
yarn add @cui-universal/react @cui-universal/theme lucide-react

# bun
bun add @cui-universal/react @cui-universal/theme lucide-react
```

---

## 🚀 Quick Start

### 1. Configure Tailwind CSS

Add `cuiTailwindPreset` to your `tailwind.config.ts` or `tailwind.config.js`:

```ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  presets: [cuiTailwindPreset],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include CUI React distribution files
    "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

### 2. Import Theme Stylesheet

Import `@cui-universal/theme/styles.css` into your root layout or global stylesheet:

**Next.js App Router (`app/layout.tsx`):**
```tsx
import "@cui-universal/theme/styles.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

**Vite / React SPA (`src/main.tsx`):**
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@cui-universal/theme/styles.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. Use Components

```tsx
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@cui-universal/react";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Welcome to CUI</CardTitle>
          <Badge variant="secondary">v0.1.2</Badge>
        </div>
        <CardDescription>
          Production-grade cross-framework UI components.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your email address..." />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Learn More</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Get Started</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Getting Started</DialogTitle>
              <DialogDescription>
                You're using CUI React primitives with full TypeScript support!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default">Awesome</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
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

Initialize a new project pre-configured with CUI in seconds:

```bash
# Next.js
npx @cui-universal/theme init next

# React + Vite
npx @cui-universal/theme init react
```

---

## 📄 License

MIT License © [CUI Team](https://github.com/cui-universal/cui)
