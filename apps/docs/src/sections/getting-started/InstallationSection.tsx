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
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, Tabs, TabsList, TabsTrigger } from "@cui-universal/react";
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
        {/* Framework Tabs using CUI Tabs */}
        <Tabs
          value={framework}
          onValueChange={(val) => setFramework(val as any)}
          size="sm"
          radius="full"
        >
          <TabsList className="bg-secondary/70 border border-border/80 p-0.5 shadow-inner">
            <TabsTrigger
              value="react"
              className="px-4 py-1.5 font-semibold text-xs gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Next.js (React)</span>
            </TabsTrigger>
            <TabsTrigger
              value="vue"
              className="px-4 py-1.5 font-semibold text-xs gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>Nuxt 3 (Vue)</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Package Manager Selector */}
        <div className="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground">
          <span className="text-[11px] font-sans">Client:</span>
          <Tabs
            value={packageManager}
            onValueChange={(val) => setPackageManager(val as any)}
            size="xs"
            radius="full"
          >
            <TabsList className="bg-secondary/70 border border-border/80 h-7 p-0.5 gap-0.5">
              {PM_LIST.map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="px-2.5 font-mono text-[11px] font-semibold"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
                pnpm: "pnpm add @cui-universal/react@beta @cui-universal/theme@beta",
                npm: "npm install @cui-universal/react@beta @cui-universal/theme@beta",
                yarn: "yarn add @cui-universal/react@beta @cui-universal/theme@beta",
                bun: "bun add @cui-universal/react@beta @cui-universal/theme@beta",
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
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 2. Scan @cui-universal/react bundle for all utility classes
    "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
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
import "@cui-universal/theme/styles.css";
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
                  Import any of the 32 accessible primitives in your Next.js Server or Client components.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-usage"
              filename="app/page.tsx"
              code={`import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui-universal/react";
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
                pnpm: "pnpm add @cui-universal/vue@beta @cui-universal/theme@beta",
                npm: "npm install @cui-universal/vue@beta @cui-universal/theme@beta",
                yarn: "yarn add @cui-universal/vue@beta @cui-universal/theme@beta",
                bun: "bun add @cui-universal/vue@beta @cui-universal/theme@beta",
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
                  Register the built-in <code className="font-mono text-primary font-semibold">@cui-universal/vue/nuxt</code> module and Tailwind CSS.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-config"
              filename="nuxt.config.ts"
              code={`// nuxt.config.ts
export default defineNuxtConfig({
  // 1. Auto-injects @cui-universal/theme styles and configuration into Nuxt
  modules: [
    "@cui-universal/vue/nuxt",
    "@nuxtjs/tailwindcss",
  ],
  css: [
    // Alternatively specify directly:
    // "@cui-universal/theme/styles.css",
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
import { cuiTailwindPreset } from "@cui-universal/theme";

export default <Partial<Config>>{
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    // 2. Scan @cui-universal/vue distribution files
    "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}",
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
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui-universal/vue";
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
