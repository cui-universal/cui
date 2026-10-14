import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Progress,
} from "@cui/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function CardSection() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Card</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Container for content blocks, headers, actions, and media.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Card interactive>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Cloud Storage</CardTitle>
              <Badge variant="success">Active</Badge>
            </div>
            <CardDescription>78.2 GB of 100 GB used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress value={78} />
            <p className="text-[11px] text-muted-foreground">Renewal in 14 days</p>
          </CardContent>
          <CardFooter className="justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">Pro Plan</span>
            <Button size="sm">Upgrade</Button>
          </CardFooter>
        </Card>
      </div>

      <CodeBlock
        id="code-card"
        reactCode={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@cui/react";

<Card interactive>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent><p>Content</p></CardContent>
  <CardFooter><Button size="sm">Action</Button></CardFooter>
</Card>`}
        vueCode={`<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@cui/vue";
</script>

<template>
  <Card :interactive="true">
    <CardHeader>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent><p>Content</p></CardContent>
    <CardFooter><Button size="sm">Action</Button></CardFooter>
  </Card>
</template>`}
      />

      <ComponentDocDetails
        componentName="Card"
        anatomy={[
          "Card",
          "CardHeader",
          "CardTitle",
          "CardDescription",
          "CardContent",
          "CardFooter",
        ]}
        props={[
          {
            name: "interactive",
            type: "boolean",
            default: "false",
            description: "Adds hover elevation, subtle lift transform, and pointer cursor.",
          },
          {
            name: "className",
            type: "string",
            default: "undefined",
            description: "Additional Tailwind CSS utility classes.",
          },
        ]}
        accessibility={{
          aria: [
            "Semantic container supporting landmark roles or standard presentation.",
            "CardTitle renders semantic heading hierarchy (<h3 /> by default).",
          ],
        }}
      />
    </div>
  );
}
