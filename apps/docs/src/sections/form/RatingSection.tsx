import React, { useState } from "react";
import { Rating } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function RatingSection() {
  const [rating, setRating] = useState(4);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Rating</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Interactive star rating component with hover previews, read-only mode, and size options.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-muted-foreground w-28">Interactive (lg):</span>
            <Rating value={rating} onChange={setRating} size="lg" />
            <span className="text-xs font-mono font-bold text-primary">{rating} / 5 stars</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-muted-foreground w-28">Read-only (md):</span>
            <Rating value={5} readonly size="md" />
            <span className="text-xs font-mono text-muted-foreground">5.0 (128 reviews)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-muted-foreground w-28">Compact (sm):</span>
            <Rating value={3} readonly size="sm" />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-rating"
        reactCode={`import { useState } from "react";
import { Rating } from "@cui-universal/react";

export function RatingDemo() {
  const [val, setVal] = useState(4);

  return (
    <Rating
      value={val}
      onChange={setVal}
      size="lg"
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { Rating } from "@cui-universal/vue";

const val = ref(4);
</script>

<template>
  <Rating
    v-model="val"
    size="lg"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Rating"
        anatomy={["Rating", "RatingStar"]}
        props={[
          {
            name: "value / v-model",
            type: "number",
            default: "0",
            description: "Current numeric rating score.",
          },
          {
            name: "max",
            type: "number",
            default: "5",
            description: "Total number of stars in the scale.",
          },
          {
            name: "readonly",
            type: "boolean",
            default: "false",
            description: "Prevents user interaction when displaying static review metrics.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg"',
            default: '"md"',
            description: "Scale of the star icons.",
          },
        ]}
      />
    </div>
  );
}
