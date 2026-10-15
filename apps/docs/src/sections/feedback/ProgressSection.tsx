import React, { useState } from "react";
import { Progress, Button } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function ProgressSection() {
  const [progressVal, setProgressVal] = useState(65);
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg">("md");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Progress</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Indicator that shows task completion with smooth CSS transitions and size scales.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-4">
          <div className="w-full max-w-md space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Task Progress</span>
              <span className="font-mono text-primary font-bold">{progressVal}%</span>
            </div>
            <Progress value={progressVal} size={size} />
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-progressSize" className="font-semibold text-muted-foreground block mb-1">Size</label>
            <PlaygroundSelect
              id="ctl-progressSize"
              value={size}
              onValueChange={(s) => setSize(s as any)}
              options={[
                { value: "xs", label: "xs" },
                { value: "sm", label: "sm" },
                { value: "md", label: "md (Default)" },
                { value: "lg", label: "lg" },
              ]}
            />
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Adjust Value</label>
            <div className="flex items-center gap-2">
              <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.max(0, progressVal - 15))}>
                -15%
              </Button>
              <Button size="xs" variant="outline" onClick={() => setProgressVal(Math.min(100, progressVal + 15))}>
                +15%
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setProgressVal(0)}>
                Reset
              </Button>
              <Button size="xs" variant="ghost" onClick={() => setProgressVal(100)}>
                Complete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-progress"
        reactCode={`import { Progress } from "@cui-universal/react";

<Progress value={${progressVal}} size="${size}" />`}
        vueCode={`<script setup lang="ts">
import { Progress } from "@cui-universal/vue";
</script>

<template>
  <Progress :value="${progressVal}" size="${size}" />
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
