import React, { useState } from "react";
import { Steps, Button, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function StepsSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [clickable, setClickable] = useState(true);

  const stepsData = [
    { title: "Account", description: "Profile setup" },
    { title: "Company", description: "Business details" },
    { title: "Plan", description: "Subscription tier" },
    { title: "Launch", description: "Go live" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Steps (Stepper)</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visual multi-stage progress indicators with responsive orientation, completion checkmarks, and click navigation.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[200px] flex flex-col items-center justify-center bg-secondary/15 gap-6">
          <div className="w-full max-w-xl">
            <Steps
              steps={stepsData}
              current={currentStep}
              clickable={clickable}
              onStepChange={setCurrentStep}
            />
          </div>

          <div className="flex items-center justify-between w-full max-w-xl border-t border-border/60 pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground font-mono">
              Step {currentStep + 1} of {stepsData.length}
            </span>
            <Button
              size="sm"
              disabled={currentStep === stepsData.length - 1}
              onClick={() => setCurrentStep((s) => Math.min(stepsData.length - 1, s + 1))}
            >
              Next Step
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-stepJump" className="font-semibold text-muted-foreground block mb-1">Active Step</label>
            <PlaygroundSelect
              id="ctl-stepJump"
              value={String(currentStep)}
              onValueChange={(s) => setCurrentStep(Number(s))}
              options={stepsData.map((step, idx) => ({
                value: String(idx),
                label: `Step ${idx + 1}: ${step.title}`,
              }))}
            />
          </div>

          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-stepClickable"
              size="sm"
              checked={clickable}
              onCheckedChange={(c) => setClickable(c === true)}
            />
            <label htmlFor="ctl-stepClickable" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Clickable (Allow jumping to any step)
            </label>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-steps"
        reactCode={`import { Steps } from "@cui-universal/react";

export function StepperDemo() {
  const [current, setCurrent] = useState(${currentStep});

  return (
    <Steps
      current={current}
      clickable={${clickable}}
      onStepChange={setCurrent}
      steps={[
        { title: "Account", description: "Profile setup" },
        { title: "Company", description: "Business details" },
        { title: "Plan", description: "Subscription tier" },
        { title: "Launch", description: "Go live" },
      ]}
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { Steps } from "@cui-universal/vue";

const current = ref(${currentStep});
const steps = [
  { title: "Account", description: "Profile setup" },
  { title: "Company", description: "Business details" },
  { title: "Plan", description: "Subscription tier" },
  { title: "Launch", description: "Go live" },
];
</script>

<template>
  <Steps
    v-model="current"
    :steps="steps"
    :clickable="${clickable}"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Steps"
        anatomy={["Steps", "StepItem", "StepIcon", "StepSeparator"]}
        props={[
          {
            name: "steps",
            type: "Array<{ title: string; description?: string; icon?: ReactNode }>",
            default: "[]",
            description: "List of step configuration items.",
          },
          {
            name: "current / v-model",
            type: "number",
            default: "0",
            description: "Zero-based index of the current active step.",
          },
          {
            name: "clickable",
            type: "boolean",
            default: "false",
            description: "Whether users can click step headers to jump stages.",
          },
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Layout direction of the step chain.",
          },
        ]}
        accessibility={{
          aria: [
            "Active and completed states convey progress visibly with checkmark icons.",
            "Supports keyboard focus and tab navigation when clickable.",
          ],
        }}
      />
    </div>
  );
}
