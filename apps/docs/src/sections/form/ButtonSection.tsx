import React, { useState } from "react";
import { Button } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function ButtonSection() {
  const [btnVariant, setBtnVariant] = useState<"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success">("default");
  const [btnSize, setBtnSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Click Me");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Button</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Interactive buttons with 7 variants, 6 sizes, icon slots, and active loading state.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <Button
            variant={btnVariant}
            size={btnSize}
            loading={btnLoading}
            disabled={btnDisabled}
          >
            {btnText}
          </Button>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-btnVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-btnVariant"
              value={btnVariant}
              onValueChange={(v) => setBtnVariant(v as any)}
              options={[
                { value: "default", label: "default" },
                { value: "secondary", label: "secondary" },
                { value: "outline", label: "outline" },
                { value: "ghost", label: "ghost" },
                { value: "link", label: "link" },
                { value: "success", label: "success" },
                { value: "destructive", label: "destructive" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-btnSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-btnSize"
              value={btnSize}
              onValueChange={(v) => setBtnSize(v as any)}
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
            <label className="font-semibold text-muted-foreground block mb-1">Button Text</label>
            <input
              type="text"
              value={btnText}
              onChange={(e) => setBtnText(e.target.value)}
              className="w-full p-2 rounded-xl border border-border bg-background text-foreground"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={btnLoading}
                onChange={(e) => setBtnLoading(e.target.checked)}
                className="rounded border-border text-primary"
              />
              <span>Loading</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={btnDisabled}
                onChange={(e) => setBtnDisabled(e.target.checked)}
                className="rounded border-border text-primary"
              />
              <span>Disabled</span>
            </label>
          </div>
        </div>
      </div>

      {/* Sizing Comparison: xs, sm, md, lg, xl, 2xl */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="flex flex-wrap items-center gap-3 p-6 rounded-3xl border border-border bg-card">
          <Button size="xs">Button xs</Button>
          <Button size="sm">Button sm (default)</Button>
          <Button size="md">Button md</Button>
          <Button size="lg">Button lg</Button>
          <Button size="xl">Button xl</Button>
          <Button size="2xl">Button 2xl</Button>
        </div>
      </div>

      {/* Code Snippet */}
      <CodeBlock
        id="code-btn"
        reactCode={`import { Button } from "@cui-universal/react";

<Button
  variant="${btnVariant}"
  size="${btnSize}"${btnLoading ? "\n  loading={true}" : ""}${btnDisabled ? "\n  disabled={true}" : ""}
>
  ${btnText}
</Button>`}
        vueCode={`<script setup lang="ts">
import { Button } from "@cui-universal/vue";
</script>

<template>
  <Button
    variant="${btnVariant}"
    size="${btnSize}"${btnLoading ? "\n    :loading=\"true\"" : ""}${btnDisabled ? "\n    :disabled=\"true\"" : ""}
  >
    ${btnText}
  </Button>
</template>`}
      />

      {/* Component Documentation Details */}
      <ComponentDocDetails
        componentName="Button"
        anatomy={["Button", "leftIcon", "rightIcon"]}
        props={[
          {
            name: "variant",
            type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success"',
            default: '"default"',
            description: "The visual appearance style of the button.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "The button size scale and padding.",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Displays an animated SVG spinner and disables click interaction.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the button is disabled and non-interactive.",
          },
          {
            name: "leftIcon",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Slot for rendering an icon before the button text.",
          },
          {
            name: "rightIcon",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Slot for rendering an icon after the button text.",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Changes the underlying rendered element by merging props with its immediate child.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Space", description: "Activates the button." },
            { key: "Enter", description: "Activates the button." },
            { key: "Tab", description: "Moves keyboard focus to the button." },
          ],
          aria: [
            "Native <button> element with implicit role='button'.",
            "Sets aria-disabled='true' when in loading or disabled state.",
            "Retains focus ring indicator with --ring token for high visibility.",
          ],
        }}
      />
    </div>
  );
}
