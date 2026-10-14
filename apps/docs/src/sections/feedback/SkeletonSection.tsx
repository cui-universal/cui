import React from "react";
import { Skeleton } from "@cui/react";
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

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-md mx-auto flex items-center space-x-4 shadow-sm">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <CodeBlock
        id="code-skeleton"
        reactCode={`import { Skeleton } from "@cui/react";

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
</div>`}
        vueCode={`<script setup lang="ts">
import { Skeleton } from "@cui/vue";
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
