import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Input, Button, type TabsVariants } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TabsSection() {
  const [radius, setRadius] = useState<NonNullable<TabsVariants["radius"]>>("md");
  const [size, setSize] = useState<NonNullable<TabsVariants["size"]>>("sm");

  const radiusOptions: NonNullable<TabsVariants["radius"]>[] = ["none", "sm", "md", "lg", "full"];
  const sizeOptions: NonNullable<TabsVariants["size"]>[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Layered views and panels with active sliding pill highlight, customizable size, and concentric border radius.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[220px] flex items-center justify-center bg-secondary/15">
          <Tabs defaultValue="account" size={size} radius={radius} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-3 pt-3">
              <p className="text-xs text-muted-foreground">Manage your account credentials.</p>
              <Input defaultValue="Sarah Connor" placeholder="Name" />
              <Button size="sm">Save changes</Button>
            </TabsContent>
            <TabsContent value="password" className="space-y-3 pt-3">
              <p className="text-xs text-muted-foreground">Change your password here.</p>
              <Input type="password" placeholder="New password" />
              <Button size="sm">Update password</Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-tabsRadius" className="font-semibold text-muted-foreground block mb-1">Border Radius</label>
            <PlaygroundSelect
              id="ctl-tabsRadius"
              value={radius}
              onValueChange={(r) => setRadius(r as any)}
              options={radiusOptions.map((r) => ({ value: r, label: r }))}
            />
          </div>

          <div>
            <label htmlFor="ctl-tabsSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-tabsSize"
              value={size}
              onValueChange={(s) => setSize(s as any)}
              options={sizeOptions.map((s) => ({ value: s, label: s }))}
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-tabs"
        reactCode={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cui-universal/react";

<Tabs defaultValue="account" size="${size}" radius="${radius}">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account Settings</TabsContent>
  <TabsContent value="password">Password Settings</TabsContent>
</Tabs>`}
        vueCode={`<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cui-universal/vue";
</script>

<template>
  <Tabs default-value="account" size="${size}" radius="${radius}">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">Account Settings</TabsContent>
    <TabsContent value="password">Password Settings</TabsContent>
  </Tabs>
</template>`}
      />

      <ComponentDocDetails
        componentName="Tabs"
        anatomy={["Tabs", "TabsList", "TabsTrigger", "TabsContent"]}
        props={[
          {
            name: "radius",
            type: '"none" | "sm" | "md" | "lg" | "full"',
            default: '"md"',
            description: "Border radius styling applied proportionally to outer tablist and inner trigger pill.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Height, padding, and text scaling across tabs triggers and list.",
          },
          {
            name: "value",
            type: "string",
            default: '""',
            description: "The controlled active tab value.",
          },
          {
            name: "defaultValue",
            type: "string",
            default: '""',
            description: "The initial active tab when uncontrolled.",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            default: "undefined",
            description: "Callback invoked when the active tab switches.",
          },
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Orientation of the tab list container.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "ArrowRight / ArrowLeft", description: "Moves focus to next/previous tab in horizontal orientation." },
            { key: "Space / Enter", description: "Activates the focused tab trigger." },
            { key: "Home / End", description: "Jumps focus to the first/last tab trigger." },
          ],
          aria: [
            "TabsList has role='tablist'.",
            "TabsTrigger has role='tab', aria-selected, and aria-controls linking to its panel.",
            "TabsContent has role='tabpanel' and aria-labelledby linking to its trigger.",
          ],
        }}
      />
    </div>
  );
}
