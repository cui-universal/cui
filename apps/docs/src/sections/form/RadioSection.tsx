import React, { useState } from "react";
import { Sliders } from "lucide-react";
import { RadioGroup, RadioGroupItem, Badge } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function RadioSection() {
  const [radioPlan, setRadioPlan] = useState("pro");
  const [radioSize, setRadioSize] = useState<"sm" | "md" | "lg">("md");
  const [radioVariant, setRadioVariant] = useState<"default" | "error" | "success">("default");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Radio Group</h1>
        <p className="text-muted-foreground text-sm mt-1">
          A set of checkable buttons—known as radio buttons—where no more than one can be checked at once.
        </p>
      </div>

      {/* Interactive Playground Control Bar */}
      <div className="p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Sliders className="h-3.5 w-3.5 text-primary" />
          <span>Playground Controls</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Size</label>
            <PlaygroundSelect
              id="radio-size"
              value={radioSize}
              onValueChange={(val) => setRadioSize(val as any)}
              options={[
                { value: "sm", label: "Small (sm)" },
                { value: "md", label: "Medium (md)" },
                { value: "lg", label: "Large (lg)" },
              ]}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Variant</label>
            <PlaygroundSelect
              id="radio-variant"
              value={radioVariant}
              onValueChange={(val) => setRadioVariant(val as any)}
              options={[
                { value: "default", label: "Default" },
                { value: "error", label: "Error" },
                { value: "success", label: "Success" },
              ]}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Selected Plan</label>
            <span className="inline-flex items-center h-8 px-3 rounded-lg bg-secondary text-xs font-semibold uppercase tracking-wider text-primary">
              {radioPlan}
            </span>
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col items-center justify-center min-h-[220px]">
        <div className="w-full max-w-md space-y-3">
          <RadioGroup
            value={radioPlan}
            onValueChange={setRadioPlan}
            className="space-y-3"
          >
            {[
              { id: "hobby", label: "Starter Hobby", price: "$0/mo", desc: "For personal experiments and side-projects." },
              { id: "pro", label: "Professional", price: "$29/mo", desc: "For high-scale production apps and teams.", popular: true },
              { id: "enterprise", label: "Enterprise", price: "$99/mo", desc: "Dedicated infrastructure, SLA & audit logs." },
            ].map((plan) => (
              <label
                key={plan.id}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  radioPlan === plan.id
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                    : "border-border/70 hover:border-border hover:bg-secondary/30"
                }`}
              >
                <RadioGroupItem
                  value={plan.id}
                  id={plan.id}
                  size={radioSize}
                  variant={radioVariant}
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground flex items-center gap-2">
                      {plan.label}
                      {plan.popular && <Badge size="xs" variant="default">Popular</Badge>}
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground">{plan.price}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{plan.desc}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Code Block */}
      <CodeBlock
        id="code-radio"
        reactCode={`import { RadioGroup, RadioGroupItem } from "@cui/react";
import { useState } from "react";

export function RadioDemo() {
  const [plan, setPlan] = useState("${radioPlan}");

  return (
    <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="hobby" id="r1" size="${radioSize}" variant="${radioVariant}" />
        <label htmlFor="r1" className="text-sm font-medium">Starter Hobby</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="pro" id="r2" size="${radioSize}" variant="${radioVariant}" />
        <label htmlFor="r2" className="text-sm font-medium">Professional</label>
      </div>
    </RadioGroup>
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { RadioGroup, RadioGroupItem } from "@cui/vue";

const plan = ref("${radioPlan}");
</script>

<template>
  <RadioGroup v-model="plan" class="space-y-2">
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="hobby" id="r1" size="${radioSize}" variant="${radioVariant}" />
      <label for="r1" class="text-sm font-medium">Starter Hobby</label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem value="pro" id="r2" size="${radioSize}" variant="${radioVariant}" />
      <label for="r2" class="text-sm font-medium">Professional</label>
    </div>
  </RadioGroup>
</template>`}
      />

      <ComponentDocDetails
        componentName="RadioGroup"
        anatomy={["RadioGroup", "RadioGroupItem"]}
        props={[
          {
            name: "value",
            type: "string",
            default: '""',
            description: "The controlled value of the checked radio item.",
          },
          {
            name: "defaultValue",
            type: "string",
            default: '""',
            description: "The initial selected value when uncontrolled.",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            default: "undefined",
            description: "Event handler called when the selected radio item changes.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Dimensions of the circular radio button.",
          },
          {
            name: "variant",
            type: '"default" | "error" | "success"',
            default: '"default"',
            description: "Color style of the radio indicator and border.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "When true, disables all radio items in the group.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "ArrowDown / ArrowRight", description: "Moves focus and selects the next radio button." },
            { key: "ArrowUp / ArrowLeft", description: "Moves focus and selects the previous radio button." },
            { key: "Tab", description: "Moves focus into the selected radio button (roving tabindex)." },
          ],
          aria: [
            "Root container has role='radiogroup'.",
            "Each item has role='radio' and aria-checked='true' | 'false'.",
            "Implements WAI-ARIA roving tabindex navigation.",
          ],
        }}
      />
    </div>
  );
}
