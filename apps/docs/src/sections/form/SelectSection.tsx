import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function SelectSection() {
  const [selectSize, setSelectSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [selectVariant, setSelectVariant] = useState<"default" | "error" | "ghost">("default");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Select</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Accessible dropdown picker with groups, labels, keyboard navigation and typeahead.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-3">
          <div className="w-64">
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger id="demo-select-trigger" size={selectSize} variant={selectVariant}>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>React</SelectLabel>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="remix">Remix</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Vue</SelectLabel>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="nuxt">Nuxt</SelectItem>
                  <SelectItem value="astro" disabled>Astro (soon)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Selected: <span className="font-mono text-foreground font-semibold">{selectValue || "none"}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-selectVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-selectVariant"
              value={selectVariant}
              onValueChange={(v) => setSelectVariant(v as any)}
              options={[{ value: "default", label: "default" }, { value: "error", label: "error" }, { value: "ghost", label: "ghost" }]}
            />
          </div>
          <div>
            <label htmlFor="ctl-selectSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-selectSize"
              value={selectSize}
              onValueChange={(v) => setSelectSize(v as any)}
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
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-3xl border border-border bg-card">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <Select key={s} defaultValue="apple">
              <SelectTrigger size={s}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Size {s}</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      <CodeBlock
        id="code-select"
        reactCode={`import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectGroup, SelectLabel, SelectItem, SelectSeparator,
} from "@cui-universal/react";

const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger size="${selectSize}" variant="${selectVariant}" className="w-64">
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>React</SelectLabel>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="next">Next.js</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vue</SelectLabel>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="nuxt">Nuxt</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        vueCode={`<script setup lang="ts">
import { ref } from "vue";
import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectGroup, SelectLabel, SelectItem, SelectSeparator,
} from "@cui-universal/vue";

const value = ref("");
</script>

<template>
  <Select v-model="value">
    <SelectTrigger size="${selectSize}" variant="${selectVariant}" class="w-64">
      <SelectValue placeholder="Select a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>React</SelectLabel>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="next">Next.js</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Vue</SelectLabel>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="nuxt">Nuxt</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>`}
      />

      <ComponentDocDetails
        componentName="Select"
        anatomy={[
          "Select",
          "SelectTrigger",
          "SelectValue",
          "SelectContent",
          "SelectGroup",
          "SelectLabel",
          "SelectItem",
          "SelectSeparator",
        ]}
        props={[
          {
            name: "value",
            type: "string",
            default: '""',
            description: "The controlled value of the selected item.",
          },
          {
            name: "defaultValue",
            type: "string",
            default: '""',
            description: "The initial value when uncontrolled.",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            default: "undefined",
            description: "Callback invoked when an option item is selected.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Size scale of the trigger button.",
          },
          {
            name: "variant",
            type: '"default" | "error" | "ghost"',
            default: '"default"',
            description: "Visual appearance style of the select trigger.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the select picker is disabled.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space / Enter", description: "Opens dropdown and confirms item selection." },
            { key: "ArrowDown / ArrowUp", description: "Cycles through selectable options." },
            { key: "Escape", description: "Closes the select popup content." },
          ],
          aria: [
            "Trigger has role='combobox' with aria-expanded and aria-haspopup='listbox'.",
            "Content has role='listbox' with items using role='option' and aria-selected.",
            "Dismisses cleanly when clicking outside or pressing Escape.",
          ],
        }}
      />
    </div>
  );
}
