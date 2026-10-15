import React, { useState } from "react";
import { Info, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription, Input } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function AlertSection() {
  const [variant, setVariant] = useState<"default" | "info" | "success" | "warning" | "destructive">("info");
  const [title, setTitle] = useState("Update Available");
  const [description, setDescription] = useState("CUI Universal component library is ready for production.");

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className="h-4 w-4" />;
      case "destructive":
        return <AlertCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Alert</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Status notification banner with color variants and icon adornment.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <div className="w-full max-w-xl">
            <Alert variant={variant}>
              {getIcon()}
              {title && <AlertTitle>{title}</AlertTitle>}
              {description && <AlertDescription>{description}</AlertDescription>}
            </Alert>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-alertVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-alertVariant"
              value={variant}
              onValueChange={(v) => setVariant(v as any)}
              options={[
                { value: "default", label: "default" },
                { value: "info", label: "info (Default)" },
                { value: "success", label: "success" },
                { value: "warning", label: "warning" },
                { value: "destructive", label: "destructive" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-alertTitle" className="font-semibold text-muted-foreground block mb-1">Alert Title</label>
            <Input
              id="ctl-alertTitle"
              size="sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title text..."
            />
          </div>

          <div>
            <label htmlFor="ctl-alertDesc" className="font-semibold text-muted-foreground block mb-1">Alert Description</label>
            <Input
              id="ctl-alertDesc"
              size="sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description text..."
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-alert"
        reactCode={`import { Alert, AlertTitle, AlertDescription } from "@cui-universal/react";
import { Info } from "lucide-react";

<Alert variant="${variant}">
  <Info className="h-4 w-4" />
  <AlertTitle>${title}</AlertTitle>
  <AlertDescription>${description}</AlertDescription>
</Alert>`}
        vueCode={`<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from "@cui-universal/vue";
import { Info } from "lucide-vue-next";
</script>

<template>
  <Alert variant="${variant}">
    <Info class="h-4 w-4" />
    <AlertTitle>${title}</AlertTitle>
    <AlertDescription>${description}</AlertDescription>
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
