import React from "react";
import { Timeline } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TimelineSection() {
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
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Timeline</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Chronological event logs and delivery tracking with customizable status indicators.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <Timeline items={events} />
      </div>

      <CodeBlock
        id="code-timeline"
        reactCode={`import { Timeline } from "@cui-universal/react";

export function TimelineDemo() {
  return (
    <Timeline
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
  <Timeline :items="events" />
</template>`}
      />

      <ComponentDocDetails
        componentName="Timeline"
        anatomy={["Timeline", "TimelineItem", "TimelinePoint", "TimelineContent", "TimelineTitle", "TimelineTime"]}
        props={[
          {
            name: "items",
            type: "Array<{ title: string; time?: string; description?: string; status?: 'complete' | 'current' | 'upcoming'; icon?: ReactNode }>",
            default: "[]",
            description: "Array of chronological events to display in sequence.",
          },
        ]}
        accessibility={{
          aria: [
            "Continuous left-hand guide rule connects nodes visually.",
            "Complete points show high-contrast checkmarks.",
          ],
        }}
      />
    </div>
  );
}
