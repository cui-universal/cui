import React from "react";
import { Separator } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function SeparatorSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Separator</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visual divider line with horizontal or vertical orientation.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-md mx-auto space-y-4 shadow-sm">
        <div>
          <h4 className="text-sm font-semibold">CUI Primitives</h4>
          <p className="text-xs text-muted-foreground">Universal Cross-Framework Components</p>
        </div>
        <Separator />
        <div className="flex h-5 items-center space-x-4 text-xs">
          <div>React</div>
          <Separator orientation="vertical" />
          <div>Vue</div>
          <Separator orientation="vertical" />
          <div>Nuxt</div>
          <Separator orientation="vertical" />
          <div>Next</div>
        </div>
      </div>

      <CodeBlock
        id="code-separator"
        reactCode={`import { Separator } from "@cui-universal/react";

<Separator />
<Separator orientation="vertical" />`}
        vueCode={`<script setup lang="ts">
import { Separator } from "@cui-universal/vue";
</script>

<template>
  <Separator />
  <Separator orientation="vertical" />
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
