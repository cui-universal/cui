import React from "react";
import { Search } from "lucide-react";
import { Kbd, Separator } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function KbdSection() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Kbd (Keyboard Key)</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Display textual keyboard keys and system shortcuts inline with hardware-authentic keycap styling.
        </p>
      </div>

      {/* Live Preview Card */}
      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        {/* Search Bar with integrated Kbd shortcut */}
        <div className="max-w-md mx-auto space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Interactive Shortcut Demo</label>
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              readOnly
              placeholder="Search documentation, components..."
              className="w-full h-10 pl-10 pr-20 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            />
            <div className="absolute right-2.5 flex items-center gap-1">
              <Kbd size="xs">⌘</Kbd>
              <Kbd size="xs">K</Kbd>
            </div>
          </div>
        </div>

        <Separator />

        {/* Size Variations */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Keycap Sizes</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">xs:</span>
              <Kbd size="xs">Ctrl</Kbd>
              <Kbd size="xs">C</Kbd>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">sm (default):</span>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">Shift</Kbd>
              <Kbd size="sm">P</Kbd>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">md:</span>
              <Kbd size="md">Esc</Kbd>
            </div>
          </div>
        </div>

        {/* Common Shortcuts Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Common Shortcuts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { action: "Command Palette", keys: ["⌘", "K"] },
              { action: "Quick Search", keys: ["/"] },
              { action: "Toggle Theme", keys: ["Ctrl", "T"] },
              { action: "Close Overlay", keys: ["Esc"] },
            ].map((item) => (
              <div key={item.action} className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-secondary/30">
                <span className="font-medium">{item.action}</span>
                <div className="flex items-center gap-1">
                  {item.keys.map((k) => (
                    <Kbd key={k} size="xs">{k}</Kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Block */}
      <CodeBlock
        id="code-kbd"
        reactCode={`import { Kbd } from "@cui-universal/react";

export function KbdDemo() {
  return (
    <div className="flex items-center gap-1.5">
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="sm">K</Kbd>
    </div>
  );
}`}
        vueCode={`<script setup>
import { Kbd } from "@cui-universal/vue";
</script>

<template>
  <div class="flex items-center gap-1.5">
    <Kbd size="sm">⌘</Kbd>
    <Kbd size="sm">K</Kbd>
  </div>
</template>`}
      />

      <ComponentDocDetails
        componentName="Kbd"
        anatomy={["Kbd"]}
        props={[
          {
            name: "size",
            type: '"xs" | "sm" | "md"',
            default: '"sm"',
            description: "Scale of the hardware keycap badge.",
          },
          {
            name: "children",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Shortcut symbol or key label (e.g., ⌘, ⇧, Ctrl, Esc, K).",
          },
        ]}
        accessibility={{
          aria: [
            "Semantic <kbd> element indicating textual keyboard input.",
            "Authentic keycap bezel border with shadow-sm.",
          ],
        }}
      />
    </div>
  );
}
