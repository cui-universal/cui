import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Terminal,
  ArrowRight,
  ChevronRight,
  Check,
  Copy,
  Music,
  SlidersHorizontal,
  PlayCircle,
  PauseCircle,
  Volume2,
  Zap,
} from "lucide-react";
import {
  Button,
  Badge,
  Switch,
  Checkbox,
  Progress,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@cui-universal/react";
import { useDocs } from "../../context/DocsContext";
import type { Section } from "../../types";

export function IntroSection() {
  const { framework, setCurrentSection, copiedId, copyToClipboard, packageManager, setPackageManager } = useDocs();
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [heroProgress, setHeroProgress] = useState(42);
  const [heroSwitch, setHeroSwitch] = useState(true);
  const [heroActiveTab, setHeroActiveTab] = useState("player");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const pkgName = framework === "react" ? "@cui-universal/react @cui-universal/theme" : "@cui-universal/vue @cui-universal/theme";
  const installCmd =
    packageManager === "npm"
      ? `npm install ${pkgName}`
      : packageManager === "yarn"
      ? `yarn add ${pkgName}`
      : packageManager === "bun"
      ? `bun add ${pkgName}`
      : `pnpm add ${pkgName}`;

  useEffect(() => {
    if (!heroPlaying) return;
    const timer = setInterval(() => {
      setHeroProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 250);
    return () => clearInterval(timer);
  }, [heroPlaying]);

  return (
    <div className="space-y-12">
      {/* Hero Showcase with Live Interactive Studio */}
      <div className="relative rounded-3xl border border-border/80 bg-gradient-to-b from-card/95 via-card/70 to-background p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Universal Component Architecture</span>
              <span className="text-[10px] bg-primary/20 px-1.5 py-0.5 rounded-full font-bold">Zero UI Deps</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Next-Gen UI for <br />
              <span className="bg-gradient-to-r from-primary via-indigo-500 to-sky-400 bg-clip-text text-transparent">
                React, Next, Vue & Nuxt
              </span>
            </h1>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base max-w-xl">
              100% aesthetic & functional parity inspired by <strong>Nuxt UI</strong> and <strong>shadcn/ui</strong>. Built with unified Tailwind tokens, zero third-party UI dependencies, and accessible native primitives.
            </p>

            {/* Quick Install Pill with Package Manager Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 max-w-lg p-2 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 text-xs font-mono text-zinc-800 dark:text-zinc-200 shadow-inner">
              <div className="flex items-center gap-2 flex-1 min-w-0 px-1">
                <Terminal className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate">{installCmd}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                <Tabs
                  value={packageManager}
                  onValueChange={(val) => setPackageManager(val as any)}
                  size="xs"
                  radius="full"
                >
                  <TabsList className="bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/50 dark:border-zinc-700/50 h-7 p-0.5 gap-0.5">
                    {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
                      <TabsTrigger
                        key={pm}
                        value={pm}
                        className="px-2 font-mono text-[10px] font-semibold"
                      >
                        {pm}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <button
                  type="button"
                  onClick={() => copyToClipboard(installCmd, "hero-install")}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 shrink-0 font-sans text-[11px] font-semibold border shadow-xs ${
                    copiedId === "hero-install"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800"
                      : "bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white border-zinc-200 dark:border-zinc-700"
                  }`}
                  title={`Copy: ${installCmd}`}
                >
                  {copiedId === "hero-install" ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500 animate-in zoom-in-50 duration-200" />
                      <span className="font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                id="hero-explore-btn"
                size="md"
                onClick={() => setCurrentSection("button")}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore 32 Primitives
              </Button>
              <Button
                variant="outline"
                size="md"
                id="hero-install-btn"
                onClick={() => setCurrentSection("installation")}
              >
                Quickstart Guide
              </Button>
            </div>

            {/* Metric Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50 max-w-lg">
              <div>
                <p className="text-2xl font-black text-foreground">32</p>
                <p className="text-[11px] text-muted-foreground font-medium">Accessible Primitives</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">0</p>
                <p className="text-[11px] text-muted-foreground font-medium">Headless UI Deps</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-500">100%</p>
                <p className="text-[11px] text-muted-foreground font-medium">React & Vue Parity</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Studio Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl p-5 shadow-2xl space-y-4">
              {/* Studio Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">CU</AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Live Component Studio</p>
                    <p className="text-[10px] text-muted-foreground">Interactive CUI Primitives</p>
                  </div>
                </div>
                <Badge variant="success" size="xs">Live Demo</Badge>
              </div>

              {/* Studio Tabs using CUI Tabs */}
              <Tabs
                value={heroActiveTab}
                onValueChange={setHeroActiveTab}
                size="sm"
                radius="md"
                className="w-full space-y-3"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="player" className="gap-1.5 font-semibold">
                    <Music className="h-3.5 w-3.5" />
                    <span>Media Player</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-1.5 font-semibold">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>

                {/* Tab Content: Player */}
                <TabsContent value="player" className="space-y-4 pt-1 mt-0">
                  <div className="rounded-xl bg-secondary/40 border border-border/50 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold">CUI Synthwave Stream</p>
                        <p className="text-[10px] text-muted-foreground">Lossless 24-bit 96kHz</p>
                      </div>
                      <Badge variant="default" size="xs">
                        {heroPlaying ? "Streaming" : "Paused"}
                      </Badge>
                    </div>

                    {/* Live Dynamic Progress Bar */}
                    <div className="space-y-1.5">
                      <Progress value={heroProgress} size="sm" />
                      <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                        <span>0:{heroProgress < 10 ? `0${heroProgress}` : heroProgress}</span>
                        <span>2:45</span>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <Button
                          size="xs"
                          variant={heroPlaying ? "destructive" : "default"}
                          onClick={() => setHeroPlaying(!heroPlaying)}
                          leftIcon={heroPlaying ? <PauseCircle className="h-3.5 w-3.5" /> : <PlayCircle className="h-3.5 w-3.5" />}
                        >
                          {heroPlaying ? "Pause" : "Play Stream"}
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => setHeroProgress(0)}
                        >
                          Restart
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Volume2 className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-mono">100%</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab Content: Settings */}
                <TabsContent value="settings" className="space-y-3 pt-1 mt-0">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/50">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium">Turbo Acceleration</p>
                      <p className="text-[10px] text-muted-foreground">Zero runtime overhead</p>
                    </div>
                    <Switch
                      size="sm"
                      checked={heroSwitch}
                      onCheckedChange={setHeroSwitch}
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-secondary/40 border border-border/50">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium">Hardware Rendering</p>
                      <p className="text-[10px] text-muted-foreground">GPU-accelerated CSS</p>
                    </div>
                    <Checkbox size="sm" defaultChecked />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Studio Footer Quick Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-border/50 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Hardware accelerated
                </span>
                <span className="font-mono text-[10px]">CUI v0.1.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filterable 32 Primitives Directory Grid */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Included UI Primitives</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              32 zero-dependency components ready for modern React & Vue applications
            </p>
          </div>

          {/* Category Filter using CUI Tabs */}
          <Tabs
            value={categoryFilter}
            onValueChange={setCategoryFilter}
            size="sm"
            radius="full"
          >
            <TabsList className="bg-secondary/40 border border-border/60 p-0.5">
              {[
                { id: "all", label: "All (32)" },
                { id: "Form", label: "Form (12)" },
                { id: "Layout", label: "Layout (9)" },
                { id: "Feedback", label: "Feedback (7)" },
                { id: "Overlays", label: "Overlays (4)" },
              ].map((f) => (
                <TabsTrigger
                  key={f.id}
                  value={f.id}
                  className="px-3 py-1 text-xs font-semibold"
                >
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            // Form Controls (12)
            { name: "Button", cat: "Form", id: "button", desc: "7 variants & 6 sizes" },
            { name: "Input", cat: "Form", id: "input", desc: "Icons & validation" },
            { name: "InputNumber", cat: "Form", id: "input-number", desc: "Numeric limits & stepper" },
            { name: "Textarea", cat: "Form", id: "textarea", desc: "Multiline input" },
            { name: "Checkbox", cat: "Form", id: "checkbox", desc: "Native styled box" },
            { name: "Switch", cat: "Form", id: "switch", desc: "Smooth toggle" },
            { name: "Select", cat: "Form", id: "select", desc: "Custom floating dropdown" },
            { name: "Radio Group", cat: "Form", id: "radio", desc: "Single selection group" },
            { name: "DatePicker", cat: "Form", id: "datepicker", desc: "Calendar & date range" },
            { name: "TextEditor", cat: "Form", id: "texteditor", desc: "Rich text formatting" },
            { name: "Rating", cat: "Form", id: "rating", desc: "Interactive star rating" },
            { name: "ColorPicker", cat: "Form", id: "color-picker", desc: "Color canvas & presets" },

            // Layout & Disclosure (9)
            { name: "Card", cat: "Layout", id: "card", desc: "Container with slots" },
            { name: "Tabs", cat: "Layout", id: "tabs", desc: "Animated tab switch" },
            { name: "Accordion", cat: "Layout", id: "accordion", desc: "Collapsible panels" },
            { name: "Steps (Stepper)", cat: "Layout", id: "steps", desc: "Multi-step workflows" },
            { name: "Breadcrumb", cat: "Layout", id: "breadcrumb", desc: "Hierarchy navigation" },
            { name: "Pagination", cat: "Layout", id: "pagination", desc: "Page navigation controls" },
            { name: "Timeline", cat: "Layout", id: "timeline", desc: "Activity & event timeline" },
            { name: "Separator", cat: "Layout", id: "separator", desc: "Dividers & rules" },
            { name: "Table", cat: "Layout", id: "table", desc: "Rich tabular data" },

            // Feedback & Status (7)
            { name: "Alert", cat: "Feedback", id: "alert", desc: "Status callouts" },
            { name: "Badge", cat: "Feedback", id: "badge", desc: "Compact labels" },
            { name: "EmptyState", cat: "Feedback", id: "empty-state", desc: "Empty & zero data views" },
            { name: "Progress", cat: "Feedback", id: "progress", desc: "Dynamic gauge bar" },
            { name: "Skeleton", cat: "Feedback", id: "skeleton", desc: "Shimmer loader" },
            { name: "Tooltip", cat: "Feedback", id: "tooltip", desc: "Hover hints" },
            { name: "Kbd", cat: "Feedback", id: "kbd", desc: "Keyboard shortcuts" },

            // Overlays & Identity (4)
            { name: "Dialog (Modal)", cat: "Overlays", id: "dialog", desc: "Accessible modal" },
            { name: "Popover", cat: "Overlays", id: "popover", desc: "Floating bubble" },
            { name: "Dropdown Menu", cat: "Overlays", id: "dropdown", desc: "Nested menu" },
            { name: "Avatar", cat: "Identity", id: "avatar", desc: "Image & fallback" },
          ]
            .filter((c) => categoryFilter === "all" || c.cat === categoryFilter || (categoryFilter === "Overlays" && c.cat === "Identity"))
            .map((c) => (
              <div
                key={c.name}
                onClick={() => setCurrentSection(c.id as Section)}
                className="p-3.5 rounded-2xl border border-border/70 bg-card hover:border-primary/50 hover:bg-secondary/40 hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/40">
                    {c.cat}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <p className="font-bold text-xs group-hover:text-primary transition-colors">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{c.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
