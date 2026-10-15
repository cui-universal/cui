import React from "react";
import { Skeleton } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function SkeletonSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Skeleton</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Animated placeholder shimmer while content is loading.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <div className="flex items-center space-x-4 w-full max-w-md p-4 rounded-2xl border border-border/60 bg-card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-skeleton"
        reactCode={`import { Skeleton } from "@cui-universal/react";

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
</div>`}
        vueCode={`<script setup lang="ts">
import { Skeleton } from "@cui-universal/vue";
</script>

<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="h-12 w-12 rounded-full" />
    <div class="space-y-2 flex-1">
      <Skeleton class="h-4 w-3/4" />
      <Skeleton class="h-4 w-1/2" />
    </div>
  </div>
</template>`}
      />

      <ComponentDocDetails
        componentName="Skeleton"
        anatomy={["Skeleton"]}
        props={[
          {
            name: "className",
            type: "string",
            default: "undefined",
            description: "Custom Tailwind CSS classes to size and shape the shimmer placeholder.",
          },
        ]}
        accessibility={{
          aria: [
            "Sets aria-hidden='true' to hide skeleton loaders from screen reader announcement.",
            "Uses gentle pulse animation with muted background.",
          ],
        }}
      />
    </div>
  );
}
