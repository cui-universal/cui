import React, { useState } from "react";
import { Textarea, Input, Checkbox } from "@cui-universal/react";
import { PlaygroundSelect } from "../../components/PlaygroundSelect";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TextareaSection() {
  const [textareaVariant, setTextareaVariant] = useState<"default" | "error">("default");
  const [textareaSize, setTextareaSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");
  const [textareaPlaceholder, setTextareaPlaceholder] = useState("Type your message here...");
  const [textareaVal, setTextareaVal] = useState("");
  const [textareaDisabled, setTextareaDisabled] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Textarea</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Multi-line text input with auto-resize and validation state.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-10 min-h-[180px] flex items-center justify-center bg-secondary/15">
          <div className="w-full max-w-md">
            <Textarea
              variant={textareaVariant}
              size={textareaSize}
              placeholder={textareaPlaceholder}
              value={textareaVal}
              disabled={textareaDisabled}
              onChange={(e) => setTextareaVal(e.target.value)}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label htmlFor="ctl-textareaVariant" className="font-semibold text-muted-foreground block mb-1">Variant</label>
            <PlaygroundSelect
              id="ctl-textareaVariant"
              value={textareaVariant}
              onValueChange={(v) => setTextareaVariant(v as any)}
              options={[{ value: "default", label: "default" }, { value: "error", label: "error" }]}
            />
          </div>
          <div>
            <label htmlFor="ctl-textareaSize" className="font-semibold text-muted-foreground block mb-1">Size (Default: sm)</label>
            <PlaygroundSelect
              id="ctl-textareaSize"
              value={textareaSize}
              onValueChange={(v) => setTextareaSize(v as any)}
              options={[
                { value: "xs", label: "xs" },
                { value: "sm", label: "sm (Default)" },
                { value: "md", label: "md" },
                { value: "lg", label: "lg" },
                { value: "xl", label: "xl" },
                { value: "2xl", label: "2xl" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="ctl-textareaPlaceholder" className="font-semibold text-muted-foreground block mb-1">Placeholder</label>
            <Input
              id="ctl-textareaPlaceholder"
              size="sm"
              value={textareaPlaceholder}
              onChange={(e) => setTextareaPlaceholder(e.target.value)}
              placeholder="Placeholder text..."
            />
          </div>
          <div className="flex items-center gap-2 cursor-pointer pt-4 sm:pt-6">
            <Checkbox
              id="ctl-textareaDisabled"
              size="sm"
              checked={textareaDisabled}
              onCheckedChange={(c) => setTextareaDisabled(c === true)}
            />
            <label htmlFor="ctl-textareaDisabled" className="font-medium cursor-pointer select-none text-foreground text-xs">
              Disabled
            </label>
          </div>
        </div>
      </div>

      <CodeBlock
        id="code-textarea"
        reactCode={`import { Textarea } from "@cui-universal/react";

<Textarea
  variant="${textareaVariant}"
  size="${textareaSize}"
  placeholder="${textareaPlaceholder}"${textareaDisabled ? '\n  disabled={true}' : ''}
/>`}
        vueCode={`<script setup lang="ts">
import { Textarea } from "@cui-universal/vue";
import { ref } from "vue";

const bio = ref("");
</script>

<template>
  <Textarea
    v-model="bio"
    variant="${textareaVariant}"
    size="${textareaSize}"
    placeholder="${textareaPlaceholder}"${textareaDisabled ? '\n    :disabled="true"' : ''}
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="Textarea"
        anatomy={["Textarea"]}
        props={[
          {
            name: "variant",
            type: '"default" | "error"',
            default: '"default"',
            description: "Visual appearance style, with error applying destructive ring and border styling.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
            default: '"sm"',
            description: "Padding and font size scale.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '""',
            description: "Ghost text hint shown when the textarea is empty.",
          },
          {
            name: "rows",
            type: "number",
            default: "3",
            description: "Number of visible text lines.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables interaction and dims opacity.",
          },
        ]}
        accessibility={{
          keyboard: [
            { key: "Tab", description: "Moves focus into the multi-line input." },
            { key: "Enter", description: "Inserts a newline character." },
          ],
          aria: [
            "Native <textarea> element with full multi-line accessibility support.",
            "Sets aria-invalid='true' when variant='error'.",
          ],
        }}
      />
    </div>
  );
}
