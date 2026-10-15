import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function BreadcrumbSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Breadcrumb</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Hierarchy navigation indicating the user's location within a site or dashboard structure.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[160px] flex items-center justify-center bg-secondary/15">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#catalog">E-Commerce</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink active>Studio Headphones</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <CodeBlock
        id="code-breadcrumb"
        reactCode={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@cui-universal/react";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink active>Item Details</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}`}
        vueCode={`<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@cui-universal/vue";
</script>

<template>
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink active>Item Details</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
</template>`}
      />

      <ComponentDocDetails
        componentName="Breadcrumb"
        anatomy={["Breadcrumb", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbSeparator"]}
        props={[
          {
            name: "active",
            type: "boolean",
            default: "false",
            description: "Applies current-page bold styling and disables pointer events on link.",
          },
        ]}
        accessibility={{
          aria: [
            "Rendered within a <nav aria-label='breadcrumb'> landmark.",
            "Active link applies aria-current='page'.",
          ],
        }}
      />
    </div>
  );
}
