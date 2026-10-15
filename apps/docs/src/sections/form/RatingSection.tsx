import React, { useState } from "react";
import { Rating, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function RatingSection() {
  const [rating, setRating] = useState(4);
  const [ratingSize, setRatingSize] = useState<"sm" | "md" | "lg">("lg");
  const [ratingMax, setRatingMax] = useState<number>(5);
  const [readonly, setReadonly] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Rating</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Interactive star rating component with hover previews, read-only mode, and size options.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex flex-col items-center justify-center bg-secondary/15 gap-3">
          <Rating
            value={rating}
            onChange={setRating}
            size={ratingSize}
            max={ratingMax}
            readonly={readonly}
          />
          <p className="text-xs font-mono font-bold text-primary">
            {rating} / {ratingMax} stars {readonly && "(Read-only)"}
          </p>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-ratingSize" className="font-semibold text-muted-foreground block mb-1">Size</label>
            <PlaygroundSelect
              id="ctl-ratingSize"
              value={ratingSize}
              onValueChange={(s) => setRatingSize(s as any)}
              options={[
                { value: "sm", label: "sm" },
                { value: "md", label: "md" },
                { value: "lg", label: "lg (Default)" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-ratingMax" className="font-semibold text-muted-foreground block mb-1">Max Stars</label>
            <PlaygroundSelect
              id="ctl-ratingMax"
              value={String(ratingMax)}
              onValueChange={(m) => setRatingMax(Number(m))}
              options={[
                { value: "5", label: "5 Stars" },
                { value: "10", label: "10 Stars" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-ratingReadonly"
              size="sm"
              checked={readonly}
              onCheckedChange={(c) => setReadonly(c === true)}
            />
            <label htmlFor="ctl-ratingReadonly" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Read-only
            </label>
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
      size="${ratingSize}"
      max={${ratingMax}}${readonly ? '\n      readonly={true}' : ''}
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
    size="${ratingSize}"
    :max="${ratingMax}"${readonly ? '\n    :readonly="true"' : ''}
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
