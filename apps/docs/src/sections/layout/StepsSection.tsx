import React, { useState } from "react";
import { Steps, Button, Separator } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function StepsSection() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepsData = [
    { title: "Account", description: "Profile setup" },
    { title: "Company", description: "Business details" },
    { title: "Plan", description: "Subscription tier" },
    { title: "Launch", description: "Go live" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Steps (Stepper)</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visual multi-stage progress indicators with responsive orientation, completion checkmarks, and click navigation.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <Steps
          steps={stepsData}
          current={currentStep}
          clickable
          onStepChange={setCurrentStep}
        />

        <Separator />

        <div className="flex items-center justify-between">
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

      <CodeBlock
        id="code-steps"
        reactCode={`import { Steps } from "@cui-universal/react";

export function StepperDemo() {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      current={current}
      clickable
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

const current = ref(1);
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
    clickable
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
