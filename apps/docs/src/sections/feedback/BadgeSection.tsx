import React, { useState } from "react";
import { Badge } from "@cui/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function BadgeSection() {
  const [badgeVariant, setBadgeVariant] = useState<"default" | "secondary" | "outline" | "destructive" | "success" | "warning">("default");
  const [badgeSize, setBadgeSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [badgeText, setBadgeText] = useState("Status Badge");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Badge</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Compact tags and status indicators with smooth rounded pills.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-center p-8 bg-secondary/15 rounded-2xl">
          <Badge variant={badgeVariant} size={badgeSize}>
            {badgeText}
          </Badge>
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-badgeVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-badgeVariant"
              value={badgeVariant}
              onValueChange={(v) => setBadgeVariant(v as any)}
              options={[{ value: "default", label: "default" }, { value: "secondary", label: "secondary" }, { value: "outline", label: "outline" }, { value: "success", label: "success" }, { value: "warning", label: "warning" }, { value: "destructive", label: "destructive" }]}
            />
          </div>

          <div>
            <label htmlFor="ctl-badgeSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-badgeSize"
              value={badgeSize}
              onValueChange={(v) => setBadgeSize(v as any)}
              options={[{ value: "xs", label: "xs" }, { value: "sm", label: "sm (Default)" }, { value: "md", label: "md" }, { value: "lg", label: "lg" }, { value: "xl", label: "xl" }, { value: "2xl", label: "2xl" }]}
            />
          </div>

          <div>
            <label className="font-semibold text-muted-foreground block mb-1">Badge Text</label>
            <input
              type="text"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full p-2 rounded-xl border border-border bg-background"
            />
          </div>
        </div>
      </div>

      {/* Sizing Comparison: xs, sm, md, lg, xl, 2xl */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Size Scale (xs to 2xl &bull; Default: sm)
        </h3>
        <div className="flex flex-wrap items-center justify-around gap-4 p-6 rounded-3xl border border-border bg-card">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Badge size={s}>Badge {s}</Badge>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock
        id="code-badge"
        reactCode={`import { Badge } from "@cui/react";

<Badge variant="${badgeVariant}" size="${badgeSize}">
  ${badgeText}
</Badge>`}
        vueCode={`<script setup lang="ts">
import { Badge } from "@cui/vue";
</script>

<template>
  <Badge variant="${badgeVariant}" size="${badgeSize}">
    ${badgeText}
  </Badge>
</template>`}
      />

      <ComponentDocDetails
        componentName="Badge"
        anatomy={["Badge"]}
        props={[
          {
            name: "variant",
            type: '"default" | "secondary" | "outline" | "success" | "warning" | "destructive"',
            default: '"default"',
            description: "The visual style and color token mapping of the badge.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Padding and font size scale.",
          },
        ]}
        accessibility={{
          aria: [
            "Renders inline <span> with badge styling.",
            "Color combinations maintain high contrast against backgrounds.",
          ],
        }}
      />
    </div>
  );
}
