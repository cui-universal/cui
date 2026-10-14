import React, { useState } from "react";
import { ColorPicker } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function ColorPickerSection() {
  const [pickedColor, setPickedColor] = useState("#f97316");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">ColorPicker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Color swatch selector with active indicators and native system color picker fallback.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground">Select Brand Color</label>
          <ColorPicker
            value={pickedColor}
            onChange={setPickedColor}
            allowCustom
          />
          <div className="flex items-center gap-2 pt-2">
            <div
              className="h-4 w-4 rounded-full border border-border"
              style={{ backgroundColor: pickedColor }}
            />
            <span className="text-xs font-mono font-bold">{pickedColor}</span>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-colorpicker"
        reactCode={`import { useState } from "react";
import { ColorPicker } from "@cui-universal/react";

export function ColorDemo() {
  const [color, setColor] = useState("#f97316");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      allowCustom
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { ColorPicker } from "@cui-universal/vue";

const color = ref("#f97316");
</script>

<template>
  <ColorPicker
    v-model="color"
    allow-custom
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="ColorPicker"
        anatomy={["ColorPicker", "ColorSwatch"]}
        props={[
          {
            name: "value / v-model",
            type: "string",
            default: '"#f97316"',
            description: "Active hexadecimal color value.",
          },
          {
            name: "colors",
            type: "string[]",
            default: "DEFAULT_PRESET_COLORS",
            description: "List of preset color hex strings.",
          },
          {
            name: "allowCustom",
            type: "boolean",
            default: "true",
            description: "Renders a '+' swatch that triggers native HTML5 color input.",
          },
        ]}
      />
    </div>
  );
}
