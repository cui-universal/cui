import React, { useState } from "react";
import { Input } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function InputSection() {
  const [inputVariant, setInputVariant] = useState<"default" | "error">("default");
  const [inputSize, setInputSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [inputPlaceholder, setInputPlaceholder] = useState("Enter your email address...");
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Input</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Text input fields with focus states, error variants, and sizes.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 space-y-6 shadow-sm">
        <div className="max-w-md mx-auto space-y-4">
          <Input
            variant={inputVariant}
            size={inputSize}
            placeholder={inputPlaceholder}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-inputVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-inputVariant"
              value={inputVariant}
              onValueChange={(v) => setInputVariant(v as any)}
              options={[{ value: "default", label: "default" }, { value: "error", label: "error" }]}
            />
          </div>
          <div>
            <label htmlFor="ctl-inputSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-inputSize"
              value={inputSize}
              onValueChange={(v) => setInputSize(v as any)}
              options={[
                { value: "xs", label: "xs (Extra Small)" },
                { value: "sm", label: "sm (Small - Default)" },
                { value: "md", label: "md (Medium)" },
                { value: "lg", label: "lg (Large)" },
                { value: "xl", label: "xl (Extra Large)" },
                { value: "2xl", label: "2xl (2X Large)" },
              ]}
            />
          </div>
          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Placeholder</label>
            <input
              type="text"
              value={inputPlaceholder}
              onChange={(e) => setInputPlaceholder(e.target.value)}
              className="w-full p-2 rounded-xl border border-border bg-background"
            />
          </div>
        </div>
      </div>

      {/* Sizing Comparison: xs, sm, md, lg, xl, 2xl */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6 rounded-3xl border border-border bg-card">
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size xs</p>
            <Input size="xs" placeholder="Input size xs..." />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size sm (default)</p>
            <Input size="sm" placeholder="Input size sm..." />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size md</p>
            <Input size="md" placeholder="Input size md..." />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size lg</p>
            <Input size="lg" placeholder="Input size lg..." />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size xl</p>
            <Input size="xl" placeholder="Input size xl..." />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold mb-1">Size 2xl</p>
            <Input size="2xl" placeholder="Input size 2xl..." />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-input"
        reactCode={`import { Input } from "@cui/react";

<Input
  variant="${inputVariant}"
  size="${inputSize}"
  placeholder="${inputPlaceholder}"
/>`}
        vueCode={`<script setup lang="ts">
import { Input } from "@cui/vue";
import { ref } from "vue";

const text = ref("");
</script>

<template>
  <Input
    v-model="text"
    variant="${inputVariant}"
    size="${inputSize}"
    placeholder="${inputPlaceholder}"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Input"
        anatomy={["Input"]}
        props={[
          {
            name: "variant",
            type: '"default" | "error"',
            default: '"default"',
            description: "Visual appearance style, with error applying destructive ring and border styling.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Height and font size scale.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '""',
            description: "Subtle ghost prompt displayed when the input has no value.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables typing interaction and reduces opacity.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Tab", description: "Moves keyboard focus into the text input." },
          ],
          aria: [
            "Native <input> element supporting all standard HTMLInputElement attributes.",
            "Sets aria-invalid='true' when variant='error'.",
            "Visible outline ring on :focus-visible using --ring token.",
          ],
        }}
      />
    </div>
  );
}
