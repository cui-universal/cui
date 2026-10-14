import React, { useState } from "react";
import {
  Palette,
  Check,
  Copy,
  Sparkles,
  Sliders,
  Layers,
  ArrowRight,
  RefreshCw,
  Sun,
  Moon,
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@cui-universal/react";
import { useDocs } from "../../context/DocsContext";
import { CodeBlock } from "../../components/CodeBlock";

interface ThemePreset {
  id: string;
  name: string;
  primaryLight: string;
  primaryDark: string;
  ring: string;
  description: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "violet",
    name: "Obsidian Violet",
    primaryLight: "262.1 83.3% 57.8%",
    primaryDark: "263.4 85% 62%",
    ring: "262.1 83.3% 57.8%",
    description: "Deep obsidian dark mode with electric purple accents.",
  },
  {
    id: "emerald",
    name: "Nuxt Emerald",
    primaryLight: "158 64% 45%",
    primaryDark: "160 84% 39%",
    ring: "158 64% 45%",
    description: "Inspired by Vue & Nuxt 3 ecosystem with vivid fresh greens.",
  },
  {
    id: "indigo",
    name: "Electric Indigo",
    primaryLight: "239 84% 67%",
    primaryDark: "243 75% 59%",
    ring: "239 84% 67%",
    description: "Classic modern SaaS feel inspired by Stripe and Linear.",
  },
  {
    id: "rose",
    name: "Cyberpunk Rose",
    primaryLight: "346.8 77.2% 49.8%",
    primaryDark: "350 89% 60%",
    ring: "346.8 77.2% 49.8%",
    description: "High-contrast energetic crimson and vivid neon accents.",
  },
  {
    id: "sky",
    name: "Ocean Sky",
    primaryLight: "199 89% 48%",
    primaryDark: "199 89% 48%",
    ring: "199 89% 48%",
    description: "Clean enterprise blue inspired by Tailwind CSS and cloud dashboards.",
  },
  {
    id: "amber",
    name: "Sunset Amber",
    primaryLight: "38 92% 50%",
    primaryDark: "45 93% 47%",
    ring: "38 92% 50%",
    description: "Warm golden tones tailored for creative agencies and finance tools.",
  },
  {
    id: "zinc",
    name: "Zinc Monochrome",
    primaryLight: "240 5.9% 10%",
    primaryDark: "0 0% 98%",
    ring: "240 5.9% 10%",
    description: "Ultra-minimalist black & white monochrome aesthetics.",
  },
];

const RADIUS_OPTIONS = [
  { label: "0px (Sharp)", value: "0rem" },
  { label: "6px (Subtle)", value: "0.375rem" },
  { label: "12px (Default)", value: "0.75rem" },
  { label: "16px (Rounded)", value: "1rem" },
  { label: "24px (Pill)", value: "1.5rem" },
];

export function ThemingSection() {
  const { isDark, setIsDark, copiedId, copyToClipboard } = useDocs();
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [selectedRadius, setSelectedRadius] = useState("0.75rem");
  const [demoSwitch, setDemoSwitch] = useState(true);

  // Apply custom theme dynamically to document
  const applyPreset = (preset: ThemePreset) => {
    setSelectedPreset(preset);
    const color = isDark ? preset.primaryDark : preset.primaryLight;
    document.documentElement.style.setProperty("--primary", color);
    document.documentElement.style.setProperty("--ring", preset.ring);
  };

  const applyRadius = (radius: string) => {
    setSelectedRadius(radius);
    document.documentElement.style.setProperty("--radius", radius);
  };

  const generatedCssSnippet = `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --primary: ${selectedPreset.primaryLight};
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --success: 142.1 76.2% 36.3%;
    --success-foreground: 355.7 100% 97.3%;
    --warning: 38 92% 50%;
    --warning-foreground: 48 96% 89%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: ${selectedPreset.ring};
    --radius: ${selectedRadius};
  }

  .dark {
    --background: 224 71.4% 3.5%;
    --foreground: 210 20% 98%;
    --primary: ${selectedPreset.primaryDark};
    --primary-foreground: 210 20% 98%;
    --secondary: 217.2 32.6% 12%;
    --secondary-foreground: 210 20% 98%;
    --muted: 217.2 32.6% 12%;
    --muted-foreground: 217.9 15% 65%;
    --accent: 217.2 32.6% 14%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 72% 48%;
    --destructive-foreground: 210 20% 98%;
    --success: 142.1 75% 42%;
    --success-foreground: 144.9 80.4% 10%;
    --warning: 38 95% 52%;
    --warning-foreground: 48 96% 89%;
    --border: 217.2 32.6% 17%;
    --input: 217.2 32.6% 17%;
    --ring: ${selectedPreset.primaryDark};
  }
}`;

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
          <Palette className="h-3.5 w-3.5" />
          Theming &amp; Token Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How to Configure Themes</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          CUI is designed with an accessible, polymorphic HSL design token system. Customize your brand colors, dark mode ramps, and border radiuses with zero runtime overhead.
        </p>
      </div>

      {/* Interactive Theme Builder Sandbox */}
      <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-background p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h2 className="text-lg font-bold">Interactive Theme Customizer</h2>
            <p className="text-xs text-muted-foreground">
              Select presets or adjust tokens below to see components update in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsDark(!isDark)}
              leftIcon={isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            >
              {isDark ? "Dark Mode" : "Light Mode"}
            </Button>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            1. Choose Color Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedPreset.id === preset.id
                    ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-sm"
                    : "border-border/70 hover:border-border hover:bg-secondary/40"
                }`}
              >
                <div
                  className="h-6 w-full rounded-lg mb-2 shadow-inner"
                  style={{ backgroundColor: `hsl(${isDark ? preset.primaryDark : preset.primaryLight})` }}
                />
                <span className="font-bold text-xs leading-tight block">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Radius Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            2. Choose Corner Radius (--radius)
          </label>
          <div className="flex flex-wrap gap-2">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => applyRadius(r.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedRadius === r.value
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "border border-border/80 bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Component Sandbox Preview */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Live Preview with Current Tokens
          </label>
          <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-6 items-start shadow-inner">
            {/* Box 1: Buttons & Badges */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Brand Badge</Badge>
                <Badge size="sm" variant="success">Operational</Badge>
                <Badge size="sm" variant="outline">v1.0.0</Badge>
              </div>
            </div>

            {/* Box 2: Form Controls */}
            <div className="space-y-3">
              <Input size="sm" placeholder="Styled input field..." defaultValue="hello@cui.design" />
              <div className="flex items-center justify-between p-2 rounded-xl bg-secondary/40 border border-border/50 text-xs">
                <span>Realtime Streaming</span>
                <Switch size="sm" checked={demoSwitch} onCheckedChange={setDemoSwitch} />
              </div>
              <Progress value={68} size="sm" />
            </div>

            {/* Box 3: Card Container */}
            <div>
              <Card interactive className="shadow-sm">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs">Dynamic Theme Card</CardTitle>
                  <CardDescription className="text-[11px]">Radius &amp; colors sync live</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground font-mono">Radius: {selectedRadius}</span>
                  <Button size="xs">Confirm</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* 1-Click Code Generator Exporter */}
        <div className="space-y-3 pt-4 border-t border-border/60">
          <div>
            <h3 className="text-sm font-bold">Generated CSS Variables</h3>
            <p className="text-xs text-muted-foreground">Copy and paste this into your project&apos;s CSS file to apply your custom theme.</p>
          </div>
          <CodeBlock id="theme-css-gen" code={generatedCssSnippet} filename="globals.css" />
        </div>
      </div>

      {/* Integration Guides: Next.js & Nuxt 3 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Step-by-Step Integration</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            How to configure Tailwind CSS and theme tokens in your framework.
          </p>
        </div>

        {/* Next.js Guide */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Configuring in Next.js (Tailwind + React)
          </h3>
          <CodeBlock
            id="guide-nextjs"
            reactCode={`// tailwind.config.ts
import type { Config } from "tailwindcss";
import { cuiTailwindPreset } from "@cui-universal/theme";

const config: Config = {
  // 1. Inherit all CUI color tokens, animations & borders
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      // Optional: override or add custom colors
    },
  },
};
export default config;

// app/layout.tsx
import "@cui-universal/theme/styles.css"; // Imports base CSS tokens & obsidian dark mode`}
            vueCode={""}
          />
        </div>

        {/* Nuxt 3 Guide */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Configuring in Nuxt 3 (Tailwind + Vue)
          </h3>
          <CodeBlock
            id="guide-nuxt"
            reactCode={""}
            vueCode={`// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@cui-universal/theme/styles.css"], // Imports CSS tokens & base styles
});

// tailwind.config.ts
import { cuiTailwindPreset } from "@cui-universal/theme";

export default {
  presets: [cuiTailwindPreset],
  darkMode: ["class"],
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}",
  ],
};`}
          />
        </div>
      </div>

      {/* Complete Token Reference Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Design Token Reference</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every token uses HSL components without the <code>hsl()</code> wrapper to allow Tailwind CSS alpha-opacity modifiers (e.g. <code>bg-primary/50</code>).
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/40 border-b border-border/60 text-muted-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4 font-mono text-[11px]">Token</th>
                <th className="py-2.5 px-4 font-mono text-[11px]">Tailwind Class</th>
                <th className="py-2.5 px-4">Description &amp; Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {[
                { token: "--background", cls: "bg-background", desc: "Default canvas background color for light & dark modes." },
                { token: "--foreground", cls: "text-foreground", desc: "Primary text and icon fill color." },
                { token: "--primary", cls: "bg-primary, text-primary", desc: "Brand primary color for active buttons, sliders, and highlights." },
                { token: "--primary-foreground", cls: "text-primary-foreground", desc: "Accessible text color placed on top of primary elements." },
                { token: "--secondary", cls: "bg-secondary", desc: "Subtle background for secondary buttons, controls, and chips." },
                { token: "--muted", cls: "bg-muted, text-muted-foreground", desc: "Muted background and secondary descriptive label text." },
                { token: "--accent", cls: "bg-accent", desc: "Hover and focus background highlight for list items and tabs." },
                { token: "--destructive", cls: "bg-destructive", desc: "Error, danger, and deletion states." },
                { token: "--success", cls: "bg-success", desc: "Success confirmations, completed indicators, and badges." },
                { token: "--warning", cls: "bg-warning", desc: "Warning callouts and pending badges." },
                { token: "--border", cls: "border-border", desc: "Subtle dividers and component perimeter lines." },
                { token: "--ring", cls: "ring-ring", desc: "Accessible focus ring glow for keyboard navigation." },
                { token: "--radius", cls: "rounded-lg", desc: "Universal border-radius base unit." },
              ].map((row) => (
                <tr key={row.token} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-primary">{row.token}</td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground"><code>{row.cls}</code></td>
                  <td className="py-2.5 px-4 text-muted-foreground">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
