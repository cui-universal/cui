import React, { useState, useEffect } from "react";
import {
  Layers,
  Moon,
  Sun,
  Search,
  Palette,
  Github,
  Sparkles,
  Command,
} from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, Tabs, TabsList, TabsTrigger } from "@cui-universal/react";
import { useDocs } from "../context/DocsContext";
import { THEME_COLORS } from "../data/navigation";
import { CommandPalette } from "./CommandPalette";

export function Header() {
  const {
    framework,
    setFramework,
    activeTheme,
    setActiveTheme,
    isDark,
    setIsDark,
    setCurrentSection,
  } = useDocs();

  const [searchOpen, setSearchOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300 shadow-xs dark:shadow-black/20">
        {/* Top Accent Gradient Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 opacity-90 shadow-[0_0_12px_rgba(var(--primary),0.5)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
                onClick={() => setCurrentSection("intro")}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
                      CUI
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-xs flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Beta
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      32 Primitives
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground hidden lg:block tracking-wide font-medium">
                    Universal Vue, Nuxt 3 &amp; React UI
                  </span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              <p>Go to Introduction</p>
            </TooltipContent>
          </Tooltip>

          {/* Quick Search Button (Command Palette Trigger) */}
          <div className="flex-1 max-w-sm hidden md:block">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center justify-between h-9 px-3.5 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-border/80 text-xs text-muted-foreground hover:text-foreground transition-all duration-150 shadow-xs group"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Search primitives...</span>
                  </div>
                  <kbd className="inline-flex items-center gap-0.5 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-background border border-border/80 text-muted-foreground shadow-xs">
                    <Command className="h-2.5 w-2.5" /> K
                  </kbd>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>Search primitives (⌘K)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Search Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="md:hidden p-2 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
                  aria-label="Open search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>Search primitives</p>
              </TooltipContent>
            </Tooltip>

            {/* Framework Switcher using CUI Tabs */}
            <Tabs
              value={framework}
              onValueChange={(val) => setFramework(val as any)}
              size="sm"
              radius="full"
              className="flex items-center"
            >
              <TabsList className="bg-secondary/70 border border-border/80 p-0.5 shadow-inner">
                <TabsTrigger
                  id="select-react-framework"
                  value="react"
                  className="px-3 py-1 font-semibold text-xs gap-1.5"
                >
                  <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  <span>React</span>
                </TabsTrigger>
                <TabsTrigger
                  id="select-vue-framework"
                  value="vue"
                  className="px-3 py-1 font-semibold text-xs gap-1.5"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>Vue 3</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Accent Palette Selector */}
            <div className="hidden sm:flex items-center space-x-1.5 h-8 px-2 rounded-full border border-border/80 bg-secondary/40 shadow-xs">
              {THEME_COLORS.map((t) => (
                <Tooltip key={t.name}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setActiveTheme(t)}
                      className={`h-4 w-4 rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center relative ${
                        activeTheme.name === t.name
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-xs"
                          : "opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: `hsl(${t.primary})` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    <p>{t.name} Theme</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => setCurrentSection("theming")}
                    className="h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors ml-0.5"
                  >
                    <Palette className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  <p>Theme Customizer Studio</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Dark / Light Mode Animated Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  id="theme-mode-toggle"
                  type="button"
                  onClick={() => setIsDark((prev) => !prev)}
                  className="relative h-8 w-8 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-all duration-200 shadow-xs active:scale-95 flex items-center justify-center group overflow-hidden"
                  aria-label="Toggle theme mode"
                >
                  <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
                    {isDark ? (
                      <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-90 duration-300" />
                    ) : (
                      <Moon className="h-4 w-4 text-indigo-500 animate-in spin-in-90 duration-300" />
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
              </TooltipContent>
            </Tooltip>

            {/* GitHub Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/cui-universal/cui"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden lg:flex h-8 w-8 rounded-xl border border-border/80 bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200 shadow-xs active:scale-95 items-center justify-center"
                >
                  <Github className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Interactive Command Palette Modal */}
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
