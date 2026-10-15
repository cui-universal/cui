import React from "react";
import { EmptyState, Button } from "@cui-universal/react";
import { FolderPlus } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function EmptyStateSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">EmptyState</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Zero-data placeholder for first-time onboarding, empty search results, or cleared lists.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[220px] flex items-center justify-center bg-secondary/15">
          <EmptyState
            title="No Products Cataloged Yet"
            description="Your store catalog is currently empty. Add your first physical or digital product to begin receiving customer orders."
            icon={<FolderPlus className="h-6 w-6 stroke-[1.5]" />}
            action={
              <Button size="sm">
                Create First Product
              </Button>
            }
          />
        </div>
      </div>

      <CodeBlock
        id="code-emptystate"
        reactCode={`import { EmptyState, Button } from "@cui-universal/react";
import { FolderPlus } from "lucide-react";

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No Products Cataloged"
      description="Your store catalog is currently empty."
      icon={<FolderPlus className="h-6 w-6" />}
      action={<Button size="sm">Add Product</Button>}
    />
  );
}`}
        vueCode={`<script setup>
import { EmptyState, Button } from "@cui-universal/vue";
import { FolderPlus } from "lucide-vue-next";
</script>

<template>
  <EmptyState
    title="No Products Cataloged"
    description="Your store catalog is currently empty."
  >
    <template #icon>
      <FolderPlus class="h-6 w-6" />
    </template>
    <template #action>
      <Button size="sm">Add Product</Button>
    </template>
  </EmptyState>
</template>`}
      />

      <ComponentDocDetails
        componentName="EmptyState"
        anatomy={["EmptyState", "EmptyStateIcon", "EmptyStateTitle", "EmptyStateDescription", "EmptyStateAction"]}
        props={[
          {
            name: "title",
            type: "string",
            default: '"No data found"',
            description: "Prominent heading describing the empty condition.",
          },
          {
            name: "description",
            type: "string",
            default: '""',
            description: "Contextual explanation or guiding next steps.",
          },
          {
            name: "icon",
            type: "ReactNode / slot",
            default: "<Inbox />",
            description: "Symbol or illustration rendered in the center badge.",
          },
          {
            name: "action",
            type: "ReactNode / slot",
            default: "undefined",
            description: "Primary CTA button or interaction.",
          },
        ]}
      />
    </div>
  );
}
