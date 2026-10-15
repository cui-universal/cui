import React, { useState } from "react";
import { DatePicker, type DatePickerVariants } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function DatePickerSection() {
  const [mode, setMode] = useState<"single" | "range">("single");
  const [selectedDate, setSelectedDate] = useState("2026-10-15");
  const [rangeDate, setRangeDate] = useState<[string, string]>(["2026-10-10", "2026-10-24"]);
  const [size, setSize] = useState<NonNullable<DatePickerVariants["size"]>>("sm");
  const [placement, setPlacement] = useState<"auto" | "top" | "bottom">("bottom");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">DatePicker</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Calendar date and range selector with month & year quick navigation, customizable sizing, and flexible top/bottom popover positioning.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[220px] flex flex-col items-center justify-center bg-secondary/15 gap-3">
          <div className="w-full max-w-sm space-y-2">
            <label className="text-xs font-semibold text-muted-foreground block">
              {mode === "range" ? "Select Booking Range" : "Target Deployment Date"}
            </label>

            {mode === "range" ? (
              <DatePicker
                mode="range"
                value={rangeDate}
                onChange={setRangeDate}
                size={size}
                placement={placement}
                placeholder="Choose date range"
              />
            ) : (
              <DatePicker
                mode="single"
                value={selectedDate}
                onChange={setSelectedDate}
                size={size}
                placement={placement}
                placeholder="Choose target date"
              />
            )}

            <p className="text-[11px] text-muted-foreground font-mono text-center pt-1">
              {mode === "range" ? (
                <>
                  Range: <span className="text-primary font-bold">{rangeDate[0] && rangeDate[1] ? `${rangeDate[0]} to ${rangeDate[1]}` : rangeDate[0] || "None"}</span>
                </>
              ) : (
                <>
                  Selected: <span className="text-primary font-bold">{selectedDate || "None"}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-dpMode" className="font-semibold text-muted-foreground block mb-1">Mode</label>
            <PlaygroundSelect
              id="ctl-dpMode"
              value={mode}
              onValueChange={(m) => setMode(m as any)}
              options={[
                { value: "single", label: "Single Date" },
                { value: "range", label: "Date Range" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-dpSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-dpSize"
              value={size}
              onValueChange={(s) => setSize(s as any)}
              options={[
                { value: "xs", label: "xs" },
                { value: "sm", label: "sm (Default)" },
                { value: "md", label: "md" },
                { value: "lg", label: "lg" },
                { value: "xl", label: "xl" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="ctl-dpPlacement" className="font-semibold text-muted-foreground block mb-1">Placement</label>
            <PlaygroundSelect
              id="ctl-dpPlacement"
              value={placement}
              onValueChange={(p) => setPlacement(p as any)}
              options={[
                { value: "bottom", label: "bottom (Default)" },
                { value: "top", label: "top" },
                { value: "auto", label: "auto" },
              ]}
            />
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-datepicker"
        reactCode={
          mode === "range"
            ? `import { useState } from "react";
import { DatePicker } from "@cui-universal/react";

export function DateRangeDemo() {
  const [range, setRange] = useState(["${rangeDate[0]}", "${rangeDate[1]}"]);

  return (
    <DatePicker
      mode="range"
      value={range}
      onChange={setRange}
      size="${size}"
      placement="${placement}"
      placeholder="Select date range"
    />
  );
}`
            : `import { useState } from "react";
import { DatePicker } from "@cui-universal/react";

export function DatePickerDemo() {
  const [date, setDate] = useState("${selectedDate}");

  return (
    <DatePicker
      mode="single"
      value={date}
      onChange={setDate}
      size="${size}"
      placement="${placement}"
      placeholder="Select target date"
    />
  );
}`
        }
        vueCode={
          mode === "range"
            ? `<script setup>
import { ref } from "vue";
import { DatePicker } from "@cui-universal/vue";

const range = ref(["${rangeDate[0]}", "${rangeDate[1]}"]);
</script>

<template>
  <DatePicker
    v-model="range"
    mode="range"
    size="${size}"
    placement="${placement}"
    placeholder="Select date range"
  />
</template>`
            : `<script setup>
import { ref } from "vue";
import { DatePicker } from "@cui-universal/vue";

const date = ref("${selectedDate}");
</script>

<template>
  <DatePicker
    v-model="date"
    mode="single"
    size="${size}"
    placement="${placement}"
    placeholder="Select target date"
  />
</template>`
        }
      />

      <ComponentDocDetails
        componentName="DatePicker"
        anatomy={["DatePicker", "Calendar", "CalendarHeader", "CalendarDay"]}
        props={[
          {
            name: "mode",
            type: '"single" | "range"',
            default: '"single"',
            description: "Operating selection mode. Set to 'range' to pick a start and end date range.",
          },
          {
            name: "value / v-model",
            type: "string | Date | [string, string]",
            default: '""',
            description: "Selected date string or 2-element array of [startDate, endDate].",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl"',
            default: '"sm"',
            description: "Scales trigger height, padding, calendar width, and day cell dimensions.",
          },
          {
            name: "placement",
            type: '"auto" | "top" | "bottom"',
            default: '"bottom"',
            description: 'Popover display position. Set to "bottom" by default, or "top" to show above the trigger.',
          },
          {
            name: "minYear",
            type: "number",
            default: "currentYear - 50",
            description: "Earliest selectable year in the year dropdown.",
          },
          {
            name: "maxYear",
            type: "number",
            default: "currentYear + 20",
            description: "Latest selectable year in the year dropdown.",
          },
          {
            name: "onChange",
            type: "(date: string | [string, string]) => void",
            default: "undefined",
            description: "Callback fired when a date or date range selection completes.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Pick a date" / "Pick a date range"',
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
            "In range mode, start, intermediate, and end dates are clearly styled with high-contrast accessibility tokens.",
            "Month and Year selects enable rapid accessible date navigation without repetitive clicks.",
            "Popover automatically dismisses when clicking outside or pressing Close.",
            "Full keyboard navigability across day cells and quick presets.",
          ],
        }}
      />
    </div>
  );
}
