import React, { useState } from "react";
import { InputNumber, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function InputNumberSection() {
  const [val, setVal] = useState<number | null>(42);
  const [variant, setVariant] = useState<"default" | "error">("default");
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [controlsPosition, setControlsPosition] = useState<"right" | "sides">("right");
  const [step, setStep] = useState<number>(1);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [disabled, setDisabled] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">InputNumber</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs">
            New
          </span>
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          Precision numerical input with keyboard stepping, hold-to-repeat, boundary clamps, and flexible controls placement.
        </p>
      </div>

      {/* Interactive Playground Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-3">
          <div className="w-full max-w-xs">
            <InputNumber
              id="demo-input-number"
              value={val}
              onChange={setVal}
              variant={variant}
              size={size}
              controlsPosition={controlsPosition}
              step={step}
              min={min}
              max={max}
              disabled={disabled}
              prefix={prefix || undefined}
              suffix={suffix || undefined}
              placeholder="Enter number..."
            />
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Current Value: <span className="font-bold text-foreground">{val !== null ? val : "null"}</span>
          </p>
        </div>

        {/* Playground Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-inVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-inVariant"
              value={variant}
              onValueChange={(v) => setVariant(v as any)}
              options={[
                { value: "default", label: "default" },
                { value: "error", label: "error" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-inSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-inSize"
              value={size}
              onValueChange={(v) => setSize(v as any)}
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
            <label htmlFor="ctl-inControls" className="font-semibold text-muted-foreground block mb-1">Controls Position</label>
            <PlaygroundSelect
              id="ctl-inControls"
              value={controlsPosition}
              onValueChange={(v) => setControlsPosition(v as any)}
              options={[
                { value: "right", label: "right (Stacked Chevrons)" },
                { value: "sides", label: "sides (Inline - / +)" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-inStep" className="font-semibold text-muted-foreground block mb-1">Step</label>
            <PlaygroundSelect
              id="ctl-inStep"
              value={String(step)}
              onValueChange={(v) => setStep(parseFloat(v))}
              options={[
                { value: "1", label: "1 (Integer)" },
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "0.1", label: "0.1 (Decimal)" },
                { value: "0.01", label: "0.01 (Cents)" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-inPrefix" className="font-semibold text-muted-foreground block mb-1">Prefix</label>
            <PlaygroundSelect
              id="ctl-inPrefix"
              value={prefix}
              onValueChange={setPrefix}
              options={[
                { value: "", label: "None" },
                { value: "$", label: "$ (USD Currency)" },
                { value: "€", label: "€ (Euro)" },
                { value: "#", label: "# (ID / Index)" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-inSuffix" className="font-semibold text-muted-foreground block mb-1">Suffix</label>
            <PlaygroundSelect
              id="ctl-inSuffix"
              value={suffix}
              onValueChange={setSuffix}
              options={[
                { value: "", label: "None" },
                { value: "%", label: "% (Percent)" },
                { value: "kg", label: "kg (Kilograms)" },
                { value: "px", label: "px (Pixels)" },
                { value: "items", label: "items" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-inDisabled"
              size="sm"
              checked={disabled}
              onCheckedChange={(c) => setDisabled(c === true)}
            />
            <label htmlFor="ctl-inDisabled" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Disabled
            </label>
          </div>
        </div>
      </div>

      {/* Use Cases Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Common Patterns &amp; Variations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <p className="text-xs font-semibold text-foreground">Currency Input</p>
            <p className="text-[11px] text-muted-foreground">Anchored prefix with step 0.01</p>
            <InputNumber prefix="$" defaultValue={29.99} step={0.01} min={0} />
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <p className="text-xs font-semibold text-foreground">Percentage Slider</p>
            <p className="text-[11px] text-muted-foreground">Bounded from 0% to 100%</p>
            <InputNumber suffix="%" defaultValue={75} min={0} max={100} step={5} />
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card/60 space-y-2">
            <p className="text-xs font-semibold text-foreground">Inline Stepper (+ / -)</p>
            <p className="text-[11px] text-muted-foreground">Controls positioned on sides</p>
            <InputNumber controlsPosition="sides" defaultValue={3} min={1} max={20} />
          </div>
        </div>
      </div>

      {/* Sizing Scale */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-6 rounded-3xl border border-border bg-card">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <div key={s} className="space-y-1">
              <p className="text-[10px] text-muted-foreground font-semibold">Size {s}</p>
              <InputNumber size={s} defaultValue={10} />
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <CodeBlock
        id="code-input-number"
        reactCode={`import { InputNumber } from "@cui-universal/react";
import { useState } from "react";

export function CounterDemo() {
  const [count, setCount] = useState<number | null>(10);

  return (
    <div className="space-y-3">
      {/* Standard Stepper */}
      <InputNumber
        value={count}
        onChange={setCount}
        min={0}
        max={100}
        step={1}
      />

      {/* Currency with Prefix */}
      <InputNumber
        prefix="$"
        defaultValue={49.99}
        step={0.01}
        min={0}
      />

      {/* Inline Steppers on Sides */}
      <InputNumber
        controlsPosition="sides"
        defaultValue={5}
        min={1}
        max={10}
      />
    </div>
  );
}`}
        vueCode={`<script setup lang="ts">
import { ref } from "vue";
import { InputNumber } from "@cui-universal/vue";

const count = ref<number | null>(10);
</script>

<template>
  <div class="space-y-3">
    <!-- Standard Stepper -->
    <InputNumber
      v-model="count"
      :min="0"
      :max="100"
      :step="1"
    />

    <!-- Currency with Prefix -->
    <InputNumber
      prefix="$"
      :default-value="49.99"
      :step="0.01"
      :min="0"
    />

    <!-- Inline Steppers on Sides -->
    <InputNumber
      controls-position="sides"
      :default-value="5"
      :min="1"
      :max="10"
    />
  </div>
</template>`}
      />

      {/* API Reference & Accessibility */}
      <ComponentDocDetails
        componentName="InputNumber"
        props={[
          {
            name: "value / v-model",
            type: "number | null",
            default: "undefined",
            description: "Controlled numerical value.",
          },
          {
            name: "defaultValue",
            type: "number",
            default: "undefined",
            description: "Initial value for uncontrolled usage.",
          },
          {
            name: "min",
            type: "number",
            default: "-Infinity",
            description: "Minimum allowable numerical value.",
          },
          {
            name: "max",
            type: "number",
            default: "Infinity",
            description: "Maximum allowable numerical value.",
          },
          {
            name: "step",
            type: "number",
            default: "1",
            description: "Incremental stepping amount on button click or arrow keys.",
          },
          {
            name: "precision",
            type: "number",
            default: "undefined",
            description: "Decimal places to round the numerical value to.",
          },
          {
            name: "controls",
            type: "boolean",
            default: "true",
            description: "Whether stepper buttons are visible.",
          },
          {
            name: "controlsPosition",
            type: '"right" | "sides"',
            default: '"right"',
            description: "Placement of stepper buttons: stacked on the right or split across left/right sides.",
          },
          {
            name: "prefix",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Leading visual element, such as currency symbol.",
          },
          {
            name: "suffix",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Trailing visual element, such as unit label.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Dimensions and typography scale.",
          },
          {
            name: "variant",
            type: '"default" | "error"',
            default: '"default"',
            description: "Visual appearance state.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables interaction and dims control appearance.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "ArrowUp", description: "Increments value by 1 step (or 10 steps when Shift is held)." },
            { key: "ArrowDown", description: "Decrements value by 1 step (or 10 steps when Shift is held)." },
            { key: "PageUp", description: "Increments value by 10 steps." },
            { key: "PageDown", description: "Decrements value by 10 steps." },
            { key: "Home", description: "Sets value to the minimum limit (if min is bounded)." },
            { key: "End", description: "Sets value to the maximum limit (if max is bounded)." },
            { key: "Enter", description: "Commits current typed input with boundary clamping." },
          ],
          aria: [
            { attribute: 'role="spinbutton"', description: "Semantic role identifying the component as a numerical spinner." },
            { attribute: "aria-valuenow", description: "Exposes current numerical value to assistive technologies." },
            { attribute: "aria-valuemin", description: "Communicates lower numerical boundary to screen readers." },
            { attribute: "aria-valuemax", description: "Communicates upper numerical boundary to screen readers." },
          ],
        }}
      />
    </div>
  );
}
