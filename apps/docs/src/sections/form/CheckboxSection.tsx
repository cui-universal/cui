import React, { useState } from "react";
import { Checkbox } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function CheckboxSection() {
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [checkboxSize, setCheckboxSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Checkbox</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Accessible checkbox with animated checkmark and focus ring.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <Checkbox
            id="terms-check"
            size={checkboxSize}
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(!!checked)}
          />
          <label htmlFor="terms-check" className="text-sm font-medium cursor-pointer">
            Accept terms and conditions
          </label>
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 rounded-2xl max-w-xs mx-auto text-xs">
          <label htmlFor="ctl-checkboxSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
          <PlaygroundSelect
            id="ctl-checkboxSize"
            value={checkboxSize}
            onValueChange={(v) => setCheckboxSize(v as any)}
            options={[
              { value: "xs", label: "xs" },
              { value: "sm", label: "sm (Default)" },
              { value: "md", label: "md" },
              { value: "lg", label: "lg" },
              { value: "xl", label: "xl" },
              { value: "2xl", label: "2xl" },
            ]}
          />
        </div>
      </div>

      {/* Sizing Comparison: xs, sm, md, lg, xl, 2xl */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="flex flex-wrap items-center justify-around gap-4 p-6 rounded-3xl border border-border bg-card">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Checkbox size={s} defaultChecked={true} />
              <span className="text-xs text-muted-foreground font-mono">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        id="code-checkbox"
        reactCode={`import { Checkbox } from "@cui/react";
import { useState } from "react";

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(c) => setChecked(!!c)}
      />
      <label htmlFor="terms">Accept terms</label>
    </div>
  );
}`}
        vueCode={`<script setup lang="ts">
import { Checkbox } from "@cui/vue";
import { ref } from "vue";

const isChecked = ref(true);
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" v-model:checked="isChecked" />
    <label for="terms">Accept terms</label>
  </div>
</template>`}
      />

      <ComponentDocDetails
        componentName="Checkbox"
        anatomy={["Checkbox", "Indicator"]}
        props={[
          {
            name: "checked",
            type: "boolean | 'indeterminate'",
            default: "false",
            description: "The controlled checked state of the checkbox.",
          },
          {
            name: "defaultChecked",
            type: "boolean | 'indeterminate'",
            default: "false",
            description: "The initial checked state when uncontrolled.",
          },
          {
            name: "onCheckedChange",
            type: "(checked: boolean | 'indeterminate') => void",
            default: "undefined",
            description: "Event handler called when the checked state changes.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Size dimensions of the box and checkmark icon.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "When true, prevents user interaction and applies muted opacity.",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Marks the checkbox as required for native form submissions.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space", description: "Toggles the checkbox on/off." },
            { key: "Tab", description: "Focuses the checkbox." },
          ],
          aria: [
            "Native button with role='checkbox'.",
            "Exposes aria-checked='true' | 'false' | 'mixed'.",
            "Renders hidden native input with sync'd name/value for form integration.",
          ],
        }}
      />
    </div>
  );
}
