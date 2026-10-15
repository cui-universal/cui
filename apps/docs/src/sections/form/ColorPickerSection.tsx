import React, { useState } from "react";
import { ColorPicker, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function ColorPickerSection() {
  const [pickedColor, setPickedColor] = useState("#8b5cf6");
  const [allowCustom, setAllowCustom] = useState(true);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">ColorPicker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Color swatch selector with active indicators and native system color picker fallback.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-4">
          <div className="flex flex-col items-center gap-3">
            <ColorPicker
              value={pickedColor}
              onChange={setPickedColor}
              allowCustom={allowCustom}
            />
            <div className="flex items-center gap-2 pt-2">
              <div
                className="h-4 w-4 rounded-full border border-border shadow-xs"
                style={{ backgroundColor: pickedColor }}
              />
              <span className="text-xs font-mono font-bold">{pickedColor}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-cpColor" className="font-semibold text-muted-foreground block mb-1">Color Preset</label>
            <PlaygroundSelect
              id="ctl-cpColor"
              value={pickedColor}
              onValueChange={setPickedColor}
              options={[
                { value: "#8b5cf6", label: "Purple (#8b5cf6)" },
                { value: "#3b82f6", label: "Blue (#3b82f6)" },
                { value: "#10b981", label: "Emerald (#10b981)" },
                { value: "#f59e0b", label: "Amber (#f59e0b)" },
                { value: "#ef4444", label: "Rose (#ef4444)" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-cpCustom"
              size="sm"
              checked={allowCustom}
              onCheckedChange={(c) => setAllowCustom(c === true)}
            />
            <label htmlFor="ctl-cpCustom" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Allow Custom Color (+)
            </label>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-colorpicker"
        reactCode={`import { useState } from "react";
import { ColorPicker } from "@cui-universal/react";

export function ColorDemo() {
  const [color, setColor] = useState("${pickedColor}");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}${allowCustom ? '\n      allowCustom={true}' : ''}
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { ColorPicker } from "@cui-universal/vue";

const color = ref("${pickedColor}");
</script>

<template>
  <ColorPicker
    v-model="color"${allowCustom ? '\n    :allow-custom="true"' : ''}
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
