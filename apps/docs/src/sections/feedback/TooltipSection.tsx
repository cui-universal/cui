import React, { useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent, Button, Input } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TooltipSection() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("top");
  const [tooltipText, setTooltipText] = useState("Instant helpful tooltip info");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Tooltip</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Popup info element that appears on hover or focus with configurable placement.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Hover over me ({side})
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>{tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-tooltipSide" className="font-semibold text-muted-foreground block mb-1">Placement Side</label>
            <PlaygroundSelect
              id="ctl-tooltipSide"
              value={side}
              onValueChange={(s) => setSide(s as any)}
              options={[
                { value: "top", label: "top (Default)" },
                { value: "bottom", label: "bottom" },
                { value: "left", label: "left" },
                { value: "right", label: "right" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-tooltipText" className="font-semibold text-muted-foreground block mb-1">Tooltip Text</label>
            <Input
              id="ctl-tooltipText"
              size="sm"
              value={tooltipText}
              onChange={(e) => setTooltipText(e.target.value)}
              placeholder="Tooltip message..."
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-tooltip"
        reactCode={`import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@cui-universal/react";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover</Button>
  </TooltipTrigger>
  <TooltipContent side="${side}">
    <p>${tooltipText}</p>
  </TooltipContent>
</Tooltip>`}
        vueCode={`<script setup lang="ts">
import { Tooltip, TooltipTrigger, TooltipContent, Button } from "@cui-universal/vue";
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent side="${side}">
      <p>${tooltipText}</p>
    </TooltipContent>
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
