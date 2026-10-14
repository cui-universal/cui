import React, { useState } from "react";
import { Progress, Button } from "@cui/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function ProgressSection() {
  const [progressVal, setProgressVal] = useState(65);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Indicator that shows task completion with smooth CSS transitions.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-md mx-auto space-y-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Task Progress</span>
          <span>{progressVal}%</span>
        </div>
        <Progress value={progressVal} />
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.max(0, progressVal - 15))}>
            -15%
          </Button>
          <Button size="sm" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 15))}>
            +15%
          </Button>
        </div>
      </div>

      <CodeBlock
        id="code-progress"
        reactCode={`import { Progress } from "@cui/react";

<Progress value={${progressVal}} />`}
        vueCode={`<script setup lang="ts">
import { Progress } from "@cui/vue";
</script>

<template>
  <Progress :value="${progressVal}" />
</template>`}
      />

      <ComponentDocDetails
        componentName="Progress"
        anatomy={["Progress", "Indicator"]}
        props={[
          {
            name: "value",
            type: "number",
            default: "0",
            description: "The current progress completion value between 0 and max (100).",
          },
          {
            name: "max",
            type: "number",
            default: "100",
            description: "The maximum completion value of the progress bar.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg"',
            default: '"md"',
            description: "Height thickness of the progress bar.",
          },
        ]}
        accessibility={{
          aria: [
            "Element has role='progressbar'.",
            "Exposes aria-valuenow, aria-valuemin (0), and aria-valuemax (100).",
            "Smooth GPU transform translation maintains 60fps animations.",
          ],
        }}
      />
    </div>
  );
}
