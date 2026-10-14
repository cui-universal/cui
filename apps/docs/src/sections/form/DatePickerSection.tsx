import React, { useState } from "react";
import { DatePicker } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function DatePickerSection() {
  const [selectedDate, setSelectedDate] = useState("2026-10-15");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">DatePicker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Calendar date selector with month navigation, today shortcuts, clear actions, and accessible popover positioning.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <div className="max-w-xs mx-auto space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">Select Deployment Date</label>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Choose target date"
          />
          <p className="text-[11px] text-muted-foreground font-mono text-center">
            Selected: <span className="text-primary font-bold">{selectedDate || "None"}</span>
          </p>
        </div>
      </div>

      <CodeBlock
        id="code-datepicker"
        reactCode={`import { useState } from "react";
import { DatePicker } from "@cui-universal/react";

export function DatePickerDemo() {
  const [date, setDate] = useState("2026-10-15");

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Select target date"
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { DatePicker } from "@cui-universal/vue";

const date = ref("2026-10-15");
</script>

<template>
  <DatePicker
    v-model="date"
    placeholder="Select target date"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="DatePicker"
        anatomy={["DatePicker", "Calendar", "CalendarHeader", "CalendarDay"]}
        props={[
          {
            name: "value / v-model",
            type: "string | Date",
            default: '""',
            description: "Selected date formatted as ISO string (YYYY-MM-DD).",
          },
          {
            name: "onChange",
            type: "(date: string) => void",
            default: "undefined",
            description: "Callback fired when a day is selected.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Pick a date"',
            description: "Placeholder text shown when no date is picked.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables interaction with the date picker trigger.",
          },
        ]}
        accessibility={{
          aria: [
            "Popover automatically dismisses when clicking outside or pressing Close.",
            "Keyboard navigability through grid days.",
          ],
        }}
      />
    </div>
  );
}
