import React, { useState } from "react";
import { TextEditor } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TextEditorSection() {
  const [content, setContent] = useState(
    "## Welcome to CUI TextEditor\n\n- Zero heavy external dependencies\n- Supports **Bold**, *Italic*, and ~~Strikethrough~~\n- Supports `inline code` and Markdown syntax\n\n> Try typing and toggling Preview mode!"
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">TextEditor</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Lightweight rich text and Markdown editor featuring toolbar actions, heading insertion, lists, blockquotes, and live preview toggle.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-6 shadow-sm">
        <TextEditor
          value={content}
          onChange={setContent}
          rows={7}
          placeholder="Write your release notes or documentation..."
        />
      </div>

      <CodeBlock
        id="code-texteditor"
        reactCode={`import { useState } from "react";
import { TextEditor } from "@cui-universal/react";

export function EditorDemo() {
  const [text, setText] = useState("## Hello World\\n\\nWrite content...");

  return (
    <TextEditor
      value={text}
      onChange={setText}
      rows={6}
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { TextEditor } from "@cui-universal/vue";

const text = ref("## Hello World\\n\\nWrite content...");
</script>

<template>
  <TextEditor
    v-model="text"
    :rows="6"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="TextEditor"
        anatomy={["TextEditor", "TextEditorToolbar", "TextEditorButton", "TextEditorContent"]}
        props={[
          {
            name: "value / v-model",
            type: "string",
            default: '""',
            description: "Editor content text in Markdown format.",
          },
          {
            name: "rows",
            type: "number",
            default: "6",
            description: "Visible row height for the textarea input.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables toolbar buttons and textarea interaction.",
          },
        ]}
        accessibility={{
          aria: [
            "Toolbar buttons include accessible title tooltips.",
            "Full standard keyboard arrow and selection support inside the textarea.",
          ],
        }}
      />
    </div>
  );
}
