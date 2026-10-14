import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TooltipSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Tooltip</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Popup info element that appears on hover or focus.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-12 flex items-center justify-center shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover over me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Instant helpful tooltip info</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <CodeBlock
        id="code-tooltip"
        reactCode={`import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@cui-universal/react";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover</Button>
  </TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>`}
        vueCode={`<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@cui-universal/vue";
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</template>`}
      />

      <ComponentDocDetails
        componentName="Tooltip"
        anatomy={["TooltipProvider", "Tooltip", "TooltipTrigger", "TooltipContent"]}
        props={[
          {
            name: "delayDuration",
            type: "number",
            default: "300",
            description: "Duration in milliseconds before the tooltip appears on hover.",
          },
          {
            name: "side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"top"',
            description: "Preferred positioning side relative to the trigger element.",
          },
          {
            name: "sideOffset",
            type: "number",
            default: "4",
            description: "Distance in pixels between trigger and tooltip content.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Escape", description: "Dismisses the active tooltip popup." },
            { key: "Tab", description: "Focuses the trigger, displaying the tooltip without hovering." },
          ],
          aria: [
            "Tooltip content has role='tooltip'.",
            "Trigger has aria-describedby linking to tooltip ID when open.",
          ],
        }}
      />
    </div>
  );
}
