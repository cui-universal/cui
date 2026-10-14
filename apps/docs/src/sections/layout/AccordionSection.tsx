import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cui/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function AccordionSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Accordion</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Vertically stacked collapsible disclosure panels.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-lg mx-auto shadow-sm">
        <Accordion type="single" collapsible className="w-full">
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
        </Accordion>
      </div>

      <CodeBlock
        id="code-accordion"
        reactCode={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cui/react";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Frequently Asked Question</AccordionTrigger>
    <AccordionContent>Detailed answer content...</AccordionContent>
  </AccordionItem>
</Accordion>`}
        vueCode={`<script setup lang="ts">
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@cui/vue";
</script>

<template>
  <Accordion type="single" collapsible>
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
