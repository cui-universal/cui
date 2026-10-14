import React from "react";
import {
  Terminal,
  Layers,
  FileCode,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Boxes,
  Zap,
} from "lucide-react";
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@cui/react";
import { useDocs } from "../../context/DocsContext";
import { CodeBlock } from "../../components/CodeBlock";
import type { PackageManager } from "../../types";

const PM_LIST: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function InstallationSection() {
  const { framework, setFramework, packageManager, setPackageManager, setCurrentSection } = useDocs();

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Quickstart Setup Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Installing CUI for Next.js &amp; Nuxt 3
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl leading-relaxed">
          Zero third-party headless UI dependencies. Follow the step-by-step instructions below to install and configure unified Tailwind tokens and accessible primitives in your project.
        </p>
      </div>

      {/* Framework & Package Manager Selector Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xs">
        {/* Framework Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-secondary/70 border border-border/80 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFramework("react")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 ${
              framework === "react"
                ? "bg-background text-foreground shadow-xs ring-1 ring-border/50 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Next.js (React)</span>
          </button>
          <button
            type="button"
            onClick={() => setFramework("vue")}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 ${
              framework === "vue"
                ? "bg-background text-foreground shadow-xs ring-1 ring-border/50 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Nuxt 3 (Vue)</span>
          </button>
        </div>

        {/* Package Manager Selector */}
        <div className="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground">
          <span className="text-[11px] font-sans">Client:</span>
          <div className="flex items-center p-0.5 rounded-xl bg-secondary/70 border border-border/80">
            {PM_LIST.map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setPackageManager(pm)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                  packageManager === pm
                    ? "bg-background text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* NEXT.JS GUIDE */}
      {framework === "react" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install React Packages</h2>
                <p className="text-xs text-muted-foreground">
                  Install the core primitives package along with the design tokens.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-install"
              commands={{
                pnpm: "pnpm add @cui/react @cui/theme",
                npm: "npm install @cui/react @cui/theme",
                yarn: "yarn add @cui/react @cui/theme",
                bun: "bun add @cui/react @cui/theme",
              }}
            />
          </div>

          {/* Step 2: Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Add <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> to your presets and include package paths in <code className="font-mono text-primary font-semibold">content</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 2. Scan @cui/react bundle for all utility classes
    "./node_modules/@cui/react/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`}
            />
          </div>

          {/* Step 3: CSS Import */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Import Theme Stylesheet</h2>
                <p className="text-xs text-muted-foreground">
                  Import the CSS variables into your root layout file (<code className="font-mono text-foreground font-semibold">app/layout.tsx</code>).
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-css"
              filename="app/layout.tsx"
              code={`// 1. Import base theme variables and utilities
import "@cui/theme/styles.css";
import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "Built with Next.js and CUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}`}
            />
          </div>

          {/* Step 4: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render Your First Component</h2>
                <p className="text-xs text-muted-foreground">
                  Import any of the 22 accessible primitives in your Next.js Server or Client components.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-usage"
              filename="app/page.tsx"
              code={`import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui/react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="p-8 max-w-xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to Next.js + CUI</CardTitle>
            <Badge variant="secondary">Zero Radix</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Universal primitives working natively across Next.js App Router and Server Components.
          </p>
          <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}`}
            />
          </div>
        </div>
      )}

      {/* NUXT 3 GUIDE */}
      {framework === "vue" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install Vue 3 / Nuxt Packages</h2>
                <p className="text-xs text-muted-foreground">
                  Install the Vue 3 component library and shared design token preset.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-install"
              commands={{
                pnpm: "pnpm add @cui/vue @cui/theme",
                npm: "npm install @cui/vue @cui/theme",
                yarn: "yarn add @cui/vue @cui/theme",
                bun: "bun add @cui/vue @cui/theme",
              }}
            />
          </div>

          {/* Step 2: Nuxt Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Nuxt 3 (<code className="font-mono text-primary font-semibold">nuxt.config.ts</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  Register the built-in <code className="font-mono text-primary font-semibold">@cui/vue/nuxt</code> module and Tailwind CSS.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-config"
              filename="nuxt.config.ts"
              code={`// nuxt.config.ts
export default defineNuxtConfig({
  // 1. Auto-injects @cui/theme styles and configuration into Nuxt
  modules: [
    "@cui/vue/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  css: [
    // Alternatively specify directly:
    // "@cui/theme/styles.css",
  ],
  devtools: { enabled: true },
});`}
            />
          </div>

          {/* Step 3: Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Include <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> in your Tailwind configuration file.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui/theme";

export default <Partial<Config>>{
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    // 2. Scan @cui/vue distribution files
    "./node_modules/@cui/vue/dist/**/*.{js,cjs}",
  ],
};`}
            />
          </div>

          {/* Step 4: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render Your First Component</h2>
                <p className="text-xs text-muted-foreground">
                  Import and use any primitive inside your Vue Single File Components (SFC).
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-usage"
              filename="app.vue"
              vueCode={`<script setup lang="ts">
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui/vue";
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <main class="p-8 max-w-xl mx-auto space-y-4">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Welcome to Nuxt 3 + CUI</CardTitle>
          <Badge variant="secondary">Zero Radix</Badge>
        </div>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground">
          Universal primitives inspired by Nuxt UI and shadcn with zero external UI dependencies.
        </p>
        <Button variant="primary">
          Get Started
          <ArrowRight class="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  </main>
</template>`}
            />
          </div>
        </div>
      )}

      {/* Highlights / Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border/60">
        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-foreground">
            <Boxes className="h-4 w-4 text-primary" />
            <span>Zero Third-Party UI Deps</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Completely purge heavy dependencies like Radix UI. Pure native accessible DOM primitives.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Tailwind Preset Unified</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Single <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> shares 100% color tokens and radius variables between Vue and React.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Full SSR &amp; Hydration Parity</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Tested and optimized for Next.js App Router and Nuxt 3 Universal Rendering without hydration mismatches.
          </p>
        </div>
      </div>
    </div>
  );
}
