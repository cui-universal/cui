import React from "react";
import { SlidersHorizontal, Mail } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function PopoverSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Popover</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Floating panel anchored to a trigger for rich, interactive content.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-12 flex flex-wrap items-center justify-center gap-4 shadow-sm">
        <Popover>
          <PopoverTrigger asChild>
            <Button id="demo-popover-trigger" variant="outline">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
              Dimensions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-3">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold leading-none">Dimensions</h4>
                <p className="text-xs text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                {[
                  ["Width", "100%"],
                  ["Max width", "300px"],
                  ["Height", "25px"],
                ].map(([label, val]) => (
                  <div key={label} className="grid grid-cols-3 items-center gap-3">
                    <label className="text-xs text-muted-foreground">{label}</label>
                    <Input defaultValue={val} size="xs" className="col-span-2" />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              Invite
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-64">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Invite teammate</h4>
              <Input placeholder="name@company.com" size="xs" />
              <Button size="xs" className="w-full">Send invite</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <CodeBlock
        id="code-popover"
        reactCode={`import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@cui-universal/react";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="center" className="w-72">
    <h4 className="text-sm font-semibold">Dimensions</h4>
    <Input defaultValue="100%" size="xs" />
  </PopoverContent>
</Popover>`}
        vueCode={`<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@cui-universal/vue";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Dimensions</Button>
    </PopoverTrigger>
    <PopoverContent side="bottom" align="center" class="w-72">
      <h4 class="text-sm font-semibold">Dimensions</h4>
      <Input model-value="100%" size="xs" />
    </PopoverContent>
  </Popover>
</template>`}
      />

      <ComponentDocDetails
        componentName="Popover"
        anatomy={[
          "Popover",
          "PopoverTrigger",
          "PopoverAnchor",
          "PopoverContent",
          "PopoverClose",
        ]}
        props={[
          {
            name: "open",
            type: "boolean",
            default: "false",
            description: "Controlled open state of the popover floating panel.",
          },
          {
            name: "defaultOpen",
            type: "boolean",
            default: "false",
            description: "Initial open state for uncontrolled usage.",
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            default: "undefined",
            description: "Callback fired whenever the open state changes.",
          },
          {
            name: "side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"bottom"',
            description: "Placement of the popover content relative to its trigger or anchor.",
          },
          {
            name: "align",
            type: '"start" | "center" | "end"',
            default: '"center"',
            description: "Alignment along the specified side axis.",
          },
          {
            name: "sideOffset",
            type: "number",
            default: "4",
            description: "Distance in pixels between the popover and its anchor target.",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Merges trigger and action behavior directly into child element without rendering additional wrappers.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space / Enter", description: "Toggles open state when focus is on PopoverTrigger." },
            { key: "Escape", description: "Closes the popover panel and shifts focus back to trigger." },
            { key: "Tab", description: "Cycles focus naturally between interactive elements inside PopoverContent." },
          ],
          aria: [
            { attribute: 'aria-haspopup="dialog"', description: "Communicates to screen readers that trigger invokes a floating dialog." },
            { attribute: 'aria-expanded', description: "Reflects true/false open status on the trigger." },
            { attribute: 'aria-controls', description: "Associates trigger with the popover content DOM id." },
            { attribute: 'role="dialog"', description: "Designates floating panel as an accessible dialog overlay." },
          ],
        }}
      />
    </div>
  );
}

