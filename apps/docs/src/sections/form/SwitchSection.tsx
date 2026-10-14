import React, { useState } from "react";
import { Switch } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function SwitchSection() {
  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchSize, setSwitchSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Switch</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Smooth sliding toggle switch with keyboard navigation.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-md mx-auto space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Airplane Mode</p>
            <p className="text-xs text-muted-foreground">Disable all network connections</p>
          </div>
          <Switch
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
            size={switchSize}
          />
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 rounded-2xl text-xs">
          <label htmlFor="ctl-switchSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
          <PlaygroundSelect
            id="ctl-switchSize"
            value={switchSize}
            onValueChange={(v) => setSwitchSize(v as any)}
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
              <Switch size={s} defaultChecked={true} />
              <span className="text-xs text-muted-foreground font-mono">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        id="code-switch"
        reactCode={`import { Switch } from "@cui/react";

<Switch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
  size="md"
/>`}
        vueCode={`<script setup lang="ts">
import { Switch } from "@cui/vue";
import { ref } from "vue";

const enabled = ref(true);
</script>

<template>
  <Switch v-model:checked="enabled" size="md" />
</template>`}
      />

      <ComponentDocDetails
        componentName="Switch"
        anatomy={["Switch", "Thumb"]}
        props={[
          {
            name: "checked",
            type: "boolean",
            default: "false",
            description: "The controlled checked state of the switch toggle.",
          },
          {
            name: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "The initial checked state when uncontrolled.",
          },
          {
            name: "onCheckedChange",
            type: "(checked: boolean) => void",
            default: "undefined",
            description: "Callback invoked when checked status transitions.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Scale of the track pill and sliding knob thumb.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Prevents toggling and dims the switch opacity.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space", description: "Toggles the switch on/off." },
            { key: "Enter", description: "Toggles the switch on/off." },
          ],
          aria: [
            "Native button with role='switch'.",
            "Exposes aria-checked='true' | 'false'.",
            "Hardware-accelerated CSS transform transitions for high frame-rate sliding.",
          ],
        }}
      />
    </div>
  );
}
