import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function AccordionSection() {
  const [type, setType] = useState<"single" | "multiple">("single");
  const [collapsible, setCollapsible] = useState(true);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Accordion</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Vertically stacked collapsible disclosure panels.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[220px] flex items-center justify-center bg-secondary/15">
          <div className="w-full max-w-md">
            <Accordion key={`${type}-${collapsible}`} type={type as any} collapsible={collapsible} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it compatible with Nuxt 3?</AccordionTrigger>
                <AccordionContent>
                  Yes! CUI Vue components are built directly with custom native Vue primitives and fully support SSR with auto-imports.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it support Next.js App Router?</AccordionTrigger>
                <AccordionContent>
                  Yes, all interactive React components include the client directive and seamlessly integrate with Server Components.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize tokens & themes?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! All CUI primitives use CSS variables and Tailwind Variants that adapt dynamically across dark and light modes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-accType" className="font-semibold text-muted-foreground block mb-1">Expansion Type</label>
            <PlaygroundSelect
              id="ctl-accType"
              value={type}
              onValueChange={(t) => setType(t as any)}
              options={[
                { value: "single", label: "Single (Default)" },
                { value: "multiple", label: "Multiple" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-accCollapsible"
              size="sm"
              checked={collapsible}
              disabled={type === "multiple"}
              onCheckedChange={(c) => setCollapsible(c === true)}
            />
            <label htmlFor="ctl-accCollapsible" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Collapsible (Allow closing all panels)
            </label>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-accordion"
        reactCode={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cui-universal/react";

<Accordion type="${type}" collapsible={${collapsible}}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Frequently Asked Question</AccordionTrigger>
    <AccordionContent>Detailed answer content...</AccordionContent>
  </AccordionItem>
</Accordion>`}
        vueCode={`<script setup lang="ts">
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cui-universal/vue";
</script>

<template>
  <Accordion type="${type}" :collapsible="${collapsible}">
    <AccordionItem value="item-1">
      <AccordionTrigger>Frequently Asked Question</AccordionTrigger>
      <AccordionContent>Detailed answer content...</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>`}
      />

      <ComponentDocDetails
        componentName="Accordion"
        anatomy={["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"]}
        props={[
          {
            name: "type",
            type: '"single" | "multiple"',
            default: '"single"',
            description: "Determines whether one or multiple items can be expanded concurrently.",
          },
          {
            name: "collapsible",
            type: "boolean",
            default: "false",
            description: "When type='single', allows closing an open item by clicking its trigger again.",
          },
          {
            name: "value",
            type: "string | string[]",
            default: '""',
            description: "The controlled value of the expanded item(s).",
          },
          {
            name: "defaultValue",
            type: "string | string[]",
            default: '""',
            description: "The initial value when uncontrolled.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "When true, disables all accordion items.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space / Enter", description: "Expands or collapses the focused accordion panel." },
            { key: "ArrowDown / ArrowUp", description: "Moves keyboard focus between accordion triggers." },
            { key: "Home / End", description: "Jumps focus to the first or last accordion trigger." },
          ],
          aria: [
            "AccordionTrigger has aria-expanded='true' | 'false' and aria-controls.",
            "AccordionContent has role='region' and aria-labelledby.",
            "Uses CSS variable --cui-accordion-content-height for GPU-smooth height expansion.",
          ],
        }}
      />
    </div>
  );
}
