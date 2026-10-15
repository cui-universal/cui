import React, { useState } from "react";
import { Timeline } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TimelineSection() {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const events = [
    {
      title: "Order Placed & Payment Verified",
      time: "10:24 AM",
      description: "Payment captured via Stripe with 3D Secure verification.",
      status: "complete" as const,
    },
    {
      title: "Dispatched from Logistics Hub",
      time: "02:15 PM",
      description: "Package sorted and assigned tracking ID #TRK-8829.",
      status: "complete" as const,
    },
    {
      title: "Out for Local Delivery",
      time: "04:30 PM",
      description: "Driver en route in the Downtown Seattle region.",
      status: "current" as const,
    },
    {
      title: "Delivered to Recipient",
      time: "Estimated 06:00 PM",
      description: "Direct doorstep hand-off requested.",
      status: "upcoming" as const,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Timeline</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Chronological event logs and delivery tracking with customizable status indicators, responsive orientation, and clean connectors.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[220px] flex items-center justify-center bg-secondary/15">
          <div className="w-full max-w-2xl overflow-x-auto py-2">
            <Timeline items={events} orientation={orientation} size={size} />
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-tlOrientation" className="font-semibold text-muted-foreground block mb-1">Orientation</label>
            <PlaygroundSelect
              id="ctl-tlOrientation"
              value={orientation}
              onValueChange={(m) => setOrientation(m as any)}
              options={[
                { value: "vertical", label: "vertical" },
                { value: "horizontal", label: "horizontal" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-tlSize" className="font-semibold text-muted-foreground block mb-1">Size</label>
            <PlaygroundSelect
              id="ctl-tlSize"
              value={size}
              onValueChange={(s) => setSize(s as any)}
              options={[
                { value: "sm", label: "sm" },
                { value: "md", label: "md (Default)" },
                { value: "lg", label: "lg" },
              ]}
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-timeline"
        reactCode={`import { Timeline } from "@cui-universal/react";

export function TimelineDemo() {
  return (
    <Timeline
      orientation="${orientation}"
      size="${size}"
      items={[
        { title: "Order Placed", time: "10:24 AM", status: "complete" },
        { title: "Dispatched", time: "02:15 PM", status: "complete" },
        { title: "Out for Delivery", time: "04:30 PM", status: "current" },
        { title: "Delivered", time: "Est. 6:00 PM", status: "upcoming" },
      ]}
    />
  );
}`}
        vueCode={`<script setup>
import { Timeline } from "@cui-universal/vue";

const events = [
  { title: "Order Placed", time: "10:24 AM", status: "complete" },
  { title: "Dispatched", time: "02:15 PM", status: "complete" },
  { title: "Out for Delivery", time: "04:30 PM", status: "current" },
  { title: "Delivered", time: "Est. 6:00 PM", status: "upcoming" },
];
</script>

<template>
  <Timeline
    orientation="${orientation}"
    size="${size}"
    :items="events"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Timeline"
        anatomy={["Timeline", "TimelineItem", "TimelinePoint", "TimelineConnector", "TimelineContent", "TimelineTitle", "TimelineTime"]}
        props={[
          {
            name: "items",
            type: "Array<{ title: string; time?: string; description?: string; status?: 'complete' | 'current' | 'upcoming' | 'error' | 'warning'; icon?: ReactNode }>",
            default: "[]",
            description: "Array of chronological events to display in sequence.",
          },
          {
            name: "orientation",
            type: "'vertical' | 'horizontal'",
            default: "'vertical'",
            description: "Layout direction of the timeline steps.",
          },
          {
            name: "size",
            type: "'sm' | 'md' | 'lg'",
            default: "'md'",
            description: "Dimensions of point indicators, typography, and connector spacing.",
          },
        ]}
        accessibility={{
          aria: [
            "Item-level connectors automatically avoid trailing dangling lines at the end of the timeline.",
            "Complete points show high-contrast checkmarks with accessible aria hints.",
          ],
        }}
      />
    </div>
  );
}
