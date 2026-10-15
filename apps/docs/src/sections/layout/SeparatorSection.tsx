import React, { useState } from "react";
import { Separator } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function SeparatorSection() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Separator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visual divider line with horizontal or vertical orientation.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <div className="w-full max-w-sm space-y-4 text-center">
            <div>
              <h4 className="text-sm font-semibold">CUI Primitives</h4>
              <p className="text-xs text-muted-foreground">Universal Cross-Framework Components</p>
            </div>

            {orientation === "horizontal" ? (
              <Separator />
            ) : (
              <div className="flex h-10 items-center justify-center space-x-4 text-xs">
                <div>React</div>
                <Separator orientation="vertical" />
                <div>Vue</div>
                <Separator orientation="vertical" />
                <div>Nuxt</div>
              </div>
            )}

            {orientation === "horizontal" && (
              <div className="flex h-5 items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div>React</div>
                <Separator orientation="vertical" />
                <div>Vue</div>
                <Separator orientation="vertical" />
                <div>Nuxt</div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-sepOrientation" className="font-semibold text-muted-foreground block mb-1">Orientation</label>
            <PlaygroundSelect
              id="ctl-sepOrientation"
              value={orientation}
              onValueChange={(o) => setOrientation(o as any)}
              options={[
                { value: "horizontal", label: "horizontal (Default)" },
                { value: "vertical", label: "vertical" },
              ]}
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-separator"
        reactCode={`import { Separator } from "@cui-universal/react";

<Separator orientation="${orientation}" />`}
        vueCode={`<script setup lang="ts">
import { Separator } from "@cui-universal/vue";
</script>

<template>
  <Separator orientation="${orientation}" />
</template>`}
      />

      <ComponentDocDetails
        componentName="Separator"
        anatomy={["Separator"]}
        props={[
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Orientation of the separator line.",
          },
          {
            name: "decorative",
            type: "boolean",
            default: "true",
            description: "Whether the separator is purely decorative or semantically divides content in the accessibility tree.",
          },
        ]}
        accessibility={{
          aria: [
            "Sets role='separator' or role='none' depending on the decorative prop.",
            "Specifies aria-orientation='horizontal' | 'vertical'.",
          ],
        }}
      />
    </div>
  );
}
