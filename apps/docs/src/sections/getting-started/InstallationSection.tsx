import React, { useState, useEffect } from "react";
import {
  Terminal,
  Layers,
  FileCode,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Boxes,
  Zap,
  Copy,
  Check,
  Code2,
  Settings2,
  FolderTree,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@cui-universal/react";
import { useDocs } from "../../context/DocsContext";
import { CodeBlock } from "../../components/CodeBlock";
import type { PackageManager } from "../../types";

type FrameworkOption = "react" | "next" | "vue" | "nuxt";

const PM_LIST: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

export function InstallationSection() {
  const {
    framework: globalFramework,
    setFramework: setGlobalFramework,
    packageManager,
    setPackageManager,
    copiedId,
    copyToClipboard,
  } = useDocs();

  const [selectedFramework, setSelectedFramework] = useState<FrameworkOption>(
    globalFramework === "vue" ? "nuxt" : "next"
  );
  const [configTab, setConfigTab] = useState<"tailwind" | "postcss" | "css" | "nuxt" | "cui">("tailwind");

  // Keep global framework in sync with selectedFramework
  const handleSelectFramework = (fw: FrameworkOption) => {
    setSelectedFramework(fw);
    if (fw === "react" || fw === "next") {
      setGlobalFramework("react");
    } else {
      setGlobalFramework("vue");
    }
  };

  // Sync if global framework changes outside
  useEffect(() => {
    if (globalFramework === "react" && selectedFramework !== "react" && selectedFramework !== "next") {
      setSelectedFramework("next");
    } else if (globalFramework === "vue" && selectedFramework !== "vue" && selectedFramework !== "nuxt") {
      setSelectedFramework("nuxt");
    }
  }, [globalFramework]);

  const cliInitCmd =
    packageManager === "npm"
      ? `npx @cui-universal/theme init ${selectedFramework}`
      : packageManager === "yarn"
      ? `yarn dlx @cui-universal/theme init ${selectedFramework}`
      : packageManager === "bun"
      ? `bunx @cui-universal/theme init ${selectedFramework}`
      : `pnpm dlx @cui-universal/theme init ${selectedFramework}`;

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Quickstart Setup Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Installing CUI Universal
        </h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-2xl leading-relaxed">
          Zero third-party headless UI dependencies. Follow the step-by-step instructions below to install and configure unified Tailwind tokens and accessible primitives across <strong>React</strong>, <strong>Next.js</strong>, <strong>Vue 3</strong>, and <strong>Nuxt 4</strong>.
        </p>
      </div>

      {/* Framework & Package Manager Selector Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-xs">
        {/* 4 Framework Tabs using CUI Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Tabs
            value={selectedFramework}
            onValueChange={(val) => handleSelectFramework(val as FrameworkOption)}
            size="sm"
            radius="full"
          >
            <TabsList className="bg-secondary/70 border border-border/80 p-0.5 shadow-inner">
              <TabsTrigger
                value="react"
                className="px-3.5 py-1.5 font-semibold text-xs gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <span>React (Vite)</span>
              </TabsTrigger>
              <TabsTrigger
                value="next"
                className="px-3.5 py-1.5 font-semibold text-xs gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                <span>Next.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="vue"
                className="px-3.5 py-1.5 font-semibold text-xs gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>Vue 3 (Vite)</span>
              </TabsTrigger>
              <TabsTrigger
                value="nuxt"
                className="px-3.5 py-1.5 font-semibold text-xs gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                <span>Nuxt 4</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Package Manager Selector */}
        <div className="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground shrink-0">
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

      {/* Automated Setup CLI Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary animate-pulse" />
            <h3 className="font-bold text-sm text-foreground">One-Command Automated Config</h3>
            <Badge variant="primary" className="text-[10px] py-0 px-2 font-mono">CLI</Badge>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Automatically generates your <code className="text-primary font-semibold font-mono">tailwind.config.ts</code> with CUI presets, registers component content paths, and creates <code className="text-primary font-semibold font-mono">cui.config.ts</code>.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto bg-card border border-border/80 px-3 py-1.5 rounded-xl font-mono text-xs shadow-xs">
          <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate text-[11px] font-medium">{cliInitCmd}</span>
          <button
            type="button"
            onClick={() => copyToClipboard(cliInitCmd, "cli-init-cmd")}
            className="ml-auto p-1 text-muted-foreground hover:text-foreground transition-colors"
            title="Copy command"
          >
            {copiedId === "cli-init-cmd" ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* REACT (VITE) GUIDE */}
      {selectedFramework === "react" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install CUI & Tailwind */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install CUI &amp; Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Install CUI React primitives, universal theme tokens, and Tailwind CSS with PostCSS.
                </p>
              </div>
            </div>
            <CodeBlock
              id="react-install"
              commands={{
                pnpm: "pnpm add @cui-universal/react @cui-universal/theme lucide-react\npnpm add -D tailwindcss postcss autoprefixer",
                npm: "npm install @cui-universal/react @cui-universal/theme lucide-react\nnpm install -D tailwindcss postcss autoprefixer",
                yarn: "yarn add @cui-universal/react @cui-universal/theme lucide-react\nyarn add -D tailwindcss postcss autoprefixer",
                bun: "bun add @cui-universal/react @cui-universal/theme lucide-react\nbun add -D tailwindcss postcss autoprefixer",
              }}
            />
          </div>

          {/* Step 2: Initialize Tailwind & PostCSS */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Initialize Tailwind &amp; PostCSS</h2>
                <p className="text-xs text-muted-foreground">
                  Generate standard <code className="font-mono text-primary font-semibold">tailwind.config.ts</code> and <code className="font-mono text-primary font-semibold">postcss.config.js</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="react-init-tailwind"
              commands={{
                pnpm: "npx tailwindcss init -p --ts",
                npm: "npx tailwindcss init -p --ts",
                yarn: "yarn dlx tailwindcss init -p --ts",
                bun: "bunx tailwindcss init -p --ts",
              }}
            />
          </div>

          {/* Step 3: Configure Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Add <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> to presets and scan React component distribution paths.
                </p>
              </div>
            </div>
            <CodeBlock
              id="react-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 2. Scan @cui-universal/react distribution bundle
    ...cuiContent("react"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`}
            />
          </div>

          {/* Step 4: Import CSS Stylesheet */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Setup Global CSS &amp; Theme Variables</h2>
                <p className="text-xs text-muted-foreground">
                  Import Tailwind directives and CUI design tokens into your global stylesheet (<code className="font-mono text-foreground font-semibold">src/index.css</code>).
                </p>
              </div>
            </div>
            <CodeBlock
              id="react-css"
              filename="src/index.css"
              code={`/* 1. Import CUI Universal design tokens and dark mode variables */
@import "@cui-universal/theme/styles.css";

/* 2. Import standard Tailwind CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            />
          </div>

          {/* Step 5: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20 shadow-xs">
                5
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render Your First Component</h2>
                <p className="text-xs text-muted-foreground">
                  Import any of the accessible primitives in your React components.
                </p>
              </div>
            </div>
            <CodeBlock
              id="react-usage"
              filename="src/App.tsx"
              code={`import React from "react";
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui-universal/react";
import { ArrowRight } from "lucide-react";

export default function App() {
  return (
    <main className="p-8 max-w-xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to React + CUI</CardTitle>
            <Badge variant="primary">v0.1.2</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Universal primitives working natively across React 18/19 with zero Radix dependencies.
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

      {/* NEXT.JS GUIDE */}
      {selectedFramework === "next" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install Next.js &amp; Tailwind Packages</h2>
                <p className="text-xs text-muted-foreground">
                  Install CUI React primitives, design tokens, and Tailwind CSS with PostCSS.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-install"
              commands={{
                pnpm: "pnpm add @cui-universal/react @cui-universal/theme lucide-react\npnpm add -D tailwindcss postcss autoprefixer",
                npm: "npm install @cui-universal/react @cui-universal/theme lucide-react\nnpm install -D tailwindcss postcss autoprefixer",
                yarn: "yarn add @cui-universal/react @cui-universal/theme lucide-react\nyarn add -D tailwindcss postcss autoprefixer",
                bun: "bun add @cui-universal/react @cui-universal/theme lucide-react\nbun add -D tailwindcss postcss autoprefixer",
              }}
            />
          </div>

          {/* Step 2: PostCSS Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure PostCSS (<code className="font-mono text-primary font-semibold">postcss.config.mjs</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  Ensure Next.js passes stylesheets through Tailwind CSS and Autoprefixer.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-postcss"
              filename="postcss.config.mjs"
              code={`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`}
            />
          </div>

          {/* Step 3: Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS (<code className="font-mono text-primary font-semibold">tailwind.config.ts</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  Add <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> to your presets and scan App Router directories.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // 2. Scan @cui-universal/react bundle for all utility classes
    ...cuiContent("react"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`}
            />
          </div>

          {/* Step 4: CSS Import */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Setup Global CSS &amp; Root Layout</h2>
                <p className="text-xs text-muted-foreground">
                  Import Tailwind and CUI tokens in <code className="font-mono text-foreground font-semibold">app/globals.css</code>, then import into <code className="font-mono text-foreground font-semibold">app/layout.tsx</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-css"
              filename="app/globals.css"
              code={`/* 1. Import CUI Universal design tokens and dark mode variables */
@import "@cui-universal/theme/styles.css";

/* 2. Import standard Tailwind CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            />
          </div>

          {/* Step 5: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-500/20 shadow-xs">
                5
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render Your First Component</h2>
                <p className="text-xs text-muted-foreground">
                  Use CUI primitives in Next.js Server Components or Client Components without hydration issues.
                </p>
              </div>
            </div>
            <CodeBlock
              id="next-usage"
              filename="app/page.tsx"
              code={`import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui-universal/react";
import { ArrowRight } from "lucide-react";

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
            Universal primitives working natively across Next.js App Router and Server Components without hydration mismatches.
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

      {/* VUE 3 (VITE) GUIDE */}
      {selectedFramework === "vue" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install Vue 3 &amp; Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Install the Vue 3 component primitives, theme preset, and Tailwind CSS with PostCSS.
                </p>
              </div>
            </div>
            <CodeBlock
              id="vue-install"
              commands={{
                pnpm: "pnpm add @cui-universal/vue @cui-universal/theme lucide-vue-next\npnpm add -D tailwindcss postcss autoprefixer",
                npm: "npm install @cui-universal/vue @cui-universal/theme lucide-vue-next\nnpm install -D tailwindcss postcss autoprefixer",
                yarn: "yarn add @cui-universal/vue @cui-universal/theme lucide-vue-next\nyarn add -D tailwindcss postcss autoprefixer",
                bun: "bun add @cui-universal/vue @cui-universal/theme lucide-vue-next\nbun add -D tailwindcss postcss autoprefixer",
              }}
            />
          </div>

          {/* Step 2: Initialize Tailwind & PostCSS */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Initialize Tailwind &amp; PostCSS</h2>
                <p className="text-xs text-muted-foreground">
                  Generate standard <code className="font-mono text-primary font-semibold">tailwind.config.ts</code> and <code className="font-mono text-primary font-semibold">postcss.config.js</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="vue-init-tailwind"
              commands={{
                pnpm: "npx tailwindcss init -p --ts",
                npm: "npx tailwindcss init -p --ts",
                yarn: "yarn dlx tailwindcss init -p --ts",
                bun: "bunx tailwindcss init -p --ts",
              }}
            />
          </div>

          {/* Step 3: Configure Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS</h2>
                <p className="text-xs text-muted-foreground">
                  Include <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> in your Tailwind configuration and scan Vue templates.
                </p>
              </div>
            </div>
            <CodeBlock
              id="vue-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // 2. Scan @cui-universal/vue bundle
    ...cuiContent("vue"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`}
            />
          </div>

          {/* Step 4: CSS Import */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Setup Global CSS &amp; Theme Variables</h2>
                <p className="text-xs text-muted-foreground">
                  Import Tailwind directives and CUI tokens in <code className="font-mono text-foreground font-semibold">src/style.css</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="vue-css"
              filename="src/style.css"
              code={`/* 1. Import CUI Universal design tokens and dark mode variables */
@import "@cui-universal/theme/styles.css";

/* 2. Import standard Tailwind CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            />
          </div>

          {/* Step 5: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 shadow-xs">
                5
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render Your First Component</h2>
                <p className="text-xs text-muted-foreground">
                  Import and use any primitive inside your Vue Single File Components (SFC).
                </p>
              </div>
            </div>
            <CodeBlock
              id="vue-usage"
              filename="src/App.vue"
              vueCode={`<script setup lang="ts">
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from "@cui-universal/vue";
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <main class="p-8 max-w-xl mx-auto space-y-4">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Welcome to Vue 3 + CUI</CardTitle>
          <Badge variant="primary">v0.1.2</Badge>
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

      {/* NUXT 4 GUIDE */}
      {selectedFramework === "nuxt" && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Step 1: Install */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20 shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Install Nuxt 4 &amp; Tailwind Packages</h2>
                <p className="text-xs text-muted-foreground">
                  Install CUI primitives, design tokens, official Nuxt Tailwind module, and Nuxt Icon.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-install"
              commands={{
                pnpm: "pnpm add @cui-universal/vue @cui-universal/theme\npnpm add -D @nuxtjs/tailwindcss @nuxt/icon nuxt",
                npm: "npm install @cui-universal/vue @cui-universal/theme\nnpm install -D @nuxtjs/tailwindcss @nuxt/icon nuxt",
                yarn: "yarn add @cui-universal/vue @cui-universal/theme\nyarn add -D @nuxtjs/tailwindcss @nuxt/icon nuxt",
                bun: "bun add @cui-universal/vue @cui-universal/theme\nbun add -D @nuxtjs/tailwindcss @nuxt/icon nuxt",
              }}
            />
          </div>

          {/* Step 2: Nuxt Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20 shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Nuxt 4 (<code className="font-mono text-primary font-semibold">nuxt.config.ts</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  Register <code className="font-mono text-primary font-semibold">@cui-universal/vue/nuxt</code>, <code className="font-mono text-primary font-semibold">@nuxtjs/tailwindcss</code>, and <code className="font-mono text-primary font-semibold">@nuxt/icon</code>.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-config"
              filename="nuxt.config.ts"
              code={`// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@cui-universal/vue/nuxt", // Auto-registers components & injects CUI styles
    "@nuxt/icon",             // Icon support: <Icon name="lucide:..." />
  ],
  // Optional CUI module settings:
  cui: {
    prefix: "",          // Optional prefix e.g. "Cui" -> <CuiButton />
    injectStyles: true,  // Automatically injects @cui-universal/theme/styles.css
  },
});`}
            />
          </div>

          {/* Step 3: Tailwind Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20 shadow-xs">
                3
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Configure Tailwind CSS (<code className="font-mono text-primary font-semibold">tailwind.config.ts</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  Include <code className="font-mono text-primary font-semibold">cuiTailwindPreset</code> in your Tailwind configuration and scan Nuxt 4 app paths.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-tailwind"
              filename="tailwind.config.ts"
              code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

export default <Partial<Config>>{
  // 1. Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    // 2. Scan @cui-universal/vue distribution files
    ...cuiContent("vue"),
  ],
};`}
            />
          </div>

          {/* Step 4: Tailwind CSS Stylesheet */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20 shadow-xs">
                4
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Setup Tailwind CSS Entry (<code className="font-mono text-primary font-semibold">assets/css/tailwind.css</code>)</h2>
                <p className="text-xs text-muted-foreground">
                  CUI theme styles are auto-injected by the module; add standard Tailwind layer directives in your stylesheet.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-css-entry"
              filename="assets/css/tailwind.css"
              code={`/* Standard Tailwind CSS layer directives for Nuxt */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
            />
          </div>

          {/* Step 5: Component Usage */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold text-xs border border-teal-500/20 shadow-xs">
                5
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">Render in Nuxt 4 (Auto-Imported — No Imports Needed!)</h2>
                <p className="text-xs text-muted-foreground">
                  All CUI components and <code className="font-mono text-primary font-semibold">&lt;Icon&gt;</code> are auto-imported in templates without any manual import boilerplate.
                </p>
              </div>
            </div>
            <CodeBlock
              id="nuxt-usage"
              filename="app/pages/index.vue"
              vueCode={`<script setup lang="ts">
// Notice: Zero component imports needed! All CUI primitives are auto-imported by @cui-universal/vue/nuxt
</script>

<template>
  <main class="p-8 max-w-xl mx-auto space-y-4">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Welcome to Nuxt 4 + CUI</CardTitle>
          <Badge variant="secondary">Auto-imported</Badge>
        </div>
        <CardDescription>
          Enjoy seamless Nuxt 4 developer experience with auto-imports and Nuxt Icon.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <Input placeholder="Enter your email address..." />
        <Button variant="primary" class="gap-2">
          <!-- Works seamlessly with @nuxt/icon -->
          <Icon name="lucide:sparkles" class="h-4 w-4" />
          <span>Get Started</span>
        </Button>
      </CardContent>
    </Card>
  </main>
</template>`}
            />
          </div>
        </div>
      )}

      {/* CONFIGURATION FILES REFERENCE VIEWER */}
      <div className="pt-6 border-t border-border/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Configuration Files Reference</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Directly inspect or copy configuration files generated when installing CUI.
            </p>
          </div>

          {/* Config file switch tabs */}
          <Tabs
            value={configTab}
            onValueChange={(val) => setConfigTab(val as any)}
            size="xs"
            radius="full"
          >
            <TabsList className="bg-secondary/70 border border-border/80 p-0.5">
              <TabsTrigger value="tailwind" className="font-mono text-[11px] font-semibold">
                tailwind.config.ts
              </TabsTrigger>
              <TabsTrigger value="postcss" className="font-mono text-[11px] font-semibold">
                postcss.config.js
              </TabsTrigger>
              <TabsTrigger value="css" className="font-mono text-[11px] font-semibold">
                globals.css
              </TabsTrigger>
              <TabsTrigger value="nuxt" className="font-mono text-[11px] font-semibold">
                nuxt.config.ts
              </TabsTrigger>
              <TabsTrigger value="cui" className="font-mono text-[11px] font-semibold">
                cui.config.ts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Selected Config File Display */}
        {configTab === "tailwind" && (
          <CodeBlock
            id="ref-tailwind-config"
            filename="tailwind.config.ts"
            code={`import type { Config } from "tailwindcss";
import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";

const config: Config = {
  // Inherit all CUI color tokens, dark mode classes & keyframe animations
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./app/**/*.{js,ts,jsx,tsx,vue}",
    "./components/**/*.{js,ts,jsx,tsx,vue}",
    // Automatically scans installed CUI package bundles
    ...cuiContent("${selectedFramework === "vue" || selectedFramework === "nuxt" ? "vue" : "react"}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`}
          />
        )}

        {configTab === "postcss" && (
          <CodeBlock
            id="ref-postcss-config"
            filename="postcss.config.js"
            code={`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`}
          />
        )}

        {configTab === "css" && (
          <CodeBlock
            id="ref-css-entry"
            filename="globals.css / style.css"
            code={`/* 1. Import CUI Universal design tokens and dark mode variables */
@import "@cui-universal/theme/styles.css";

/* 2. Import standard Tailwind CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
          />
        )}

        {configTab === "nuxt" && (
          <CodeBlock
            id="ref-nuxt-config"
            filename="nuxt.config.ts"
            code={`// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@cui-universal/vue/nuxt",
    "@nuxt/icon",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});`}
          />
        )}

        {configTab === "cui" && (
          <CodeBlock
            id="ref-cui-config"
            filename="cui.config.ts"
            code={`/**
 * CUI Universal Design System Configuration File
 * Generated by: npx @cui-universal/theme init
 */
export default {
  framework: "${selectedFramework}",
  theme: {
    // Default border radius variable (overrides --radius in styles.css)
    radius: "0.5rem",
    // Primary accent color theme
    primary: "indigo",
    // Enable/disable dark mode class synchronization
    darkMode: "class",
  },
};`}
          />
        )}
      </div>

      {/* Highlights / Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border/60">
        <div className="p-4 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-xs text-foreground">
            <Boxes className="h-4 w-4 text-primary" />
            <span>Zero Third-Party UI Deps</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Completely purge heavy dependencies like Radix UI. Pure native accessible DOM primitives across React and Vue.
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
            Tested and optimized for Next.js App Router and Nuxt 4 Universal Rendering without hydration mismatches.
          </p>
        </div>
      </div>
    </div>
  );
}
