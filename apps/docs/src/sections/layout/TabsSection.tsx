import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Input, Button } from "@cui/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TabsSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Layered views and panels with active sliding pill highlight.
        </p>
      </div>

      <div className="rounded-3xl border border-border/80 bg-card p-8 max-w-md mx-auto shadow-sm">
        <Tabs defaultValue="account" className="w-full">
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

      <CodeBlock
        id="code-tabs"
        reactCode={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cui/react";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account Settings</TabsContent>
  <TabsContent value="password">Password Settings</TabsContent>
</Tabs>`}
        vueCode={`<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@cui/vue";
</script>

<template>
  <Tabs default-value="account">
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
