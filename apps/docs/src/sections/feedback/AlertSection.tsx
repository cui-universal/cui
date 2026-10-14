import React from "react";
import { Info, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function AlertSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Alert</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Status notification banner with color variants.
        </p>
      </div>

      <div className="space-y-3 max-w-2xl">
        <Alert variant="info">
          <Info className="h-4 w-4" />
          <AlertTitle>Update Available</AlertTitle>
          <AlertDescription>CUI v0.1.0 with 22 component primitives is ready.</AlertDescription>
        </Alert>
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>All systems operational</AlertTitle>
          <AlertDescription>All packages compiled with zero errors.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Required</AlertTitle>
          <AlertDescription>Your invoice is awaiting verification.</AlertDescription>
        </Alert>
      </div>

      <CodeBlock
        id="code-alert"
        reactCode={`import { Alert, AlertTitle, AlertDescription } from "@cui-universal/react";
import { CheckCircle2 } from "lucide-react";

<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Changes saved.</AlertDescription>
</Alert>`}
        vueCode={`<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from "@cui-universal/vue";
import { CheckCircle2 } from "lucide-vue-next";
</script>

<template>
  <Alert variant="success">
    <CheckCircle2 class="h-4 w-4" />
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Changes saved.</AlertDescription>
  </Alert>
</template>`}
      />

      <ComponentDocDetails
        componentName="Alert"
        anatomy={["Alert", "AlertTitle", "AlertDescription"]}
        props={[
          {
            name: "variant",
            type: '"default" | "info" | "success" | "warning" | "destructive"',
            default: '"default"',
            description: "Status semantic color scheme for the alert container.",
          },
        ]}
        accessibility={{
          aria: [
            "Root element has role='alert' to alert assistive technologies of important status changes.",
            "AlertTitle renders semantic heading hierarchy.",
          ],
        }}
      />
    </div>
  );
}
