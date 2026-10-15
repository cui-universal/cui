import React, { useState } from "react";
import { TextEditor, Checkbox } from "@cui-universal/react";
import { CodeBlock } from "../../components/CodeBlock";
import { ComponentDocDetails } from "../../components/ComponentDocDetails";

export function TextEditorSection() {
  const [content, setContent] = useState(
    `<h1>Welcome to CUI Rich TextEditor</h1><p>This is a <strong>true WYSIWYG rich text editor</strong> — you write and format text on the <em>exact same surface</em> with zero preview toggling needed!</p><h2>Inline Formatting</h2><p>Select any text and click the toolbar or use standard shortcuts:</p><ul><li><strong>Bold</strong> with <code>Cmd/Ctrl + B</code></li><li><em>Italic</em> with <code>Cmd/Ctrl + I</code></li><li><u>Underline</u> with <code>Cmd/Ctrl + U</code></li><li><strike>Strikethrough</strike> and <a href="https://cui.dev">clickable links</a> with <code>Cmd/Ctrl + K</code></li></ul><blockquote>"WYSIWYG: What You See Is What You Get." Everything updates instantly as you type.</blockquote>`
  );
  const [disabled, setDisabled] = useState(false);
  const [showWordCount, setShowWordCount] = useState(true);
  const [showHtml, setShowHtml] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">TextEditor</h1>
        <p className="text-muted-foreground text-sm mt-1">
          True WYSIWYG rich text editor where writing and viewing occur seamlessly on the same interactive surface.
        </p>
      </div>

      {/* Interactive Canvas */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 bg-secondary/15">
          <TextEditor
            value={content}
            onChange={setContent}
            disabled={disabled}
            showWordCount={showWordCount}
            minHeight={260}
            placeholder="Type your article, note, or release documentation here..."
          />
        </div>

        {/* Controls */}
        <div className="p-5 border-t border-border bg-secondary/30 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="ctl-teWordCount"
                size="sm"
                checked={showWordCount}
                onCheckedChange={(c) => setShowWordCount(c === true)}
              />
              <label htmlFor="ctl-teWordCount" className="font-medium cursor-pointer select-none text-foreground text-xs">
                Word Count Bar
              </label>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="ctl-teDisabled"
                size="sm"
                checked={disabled}
                onCheckedChange={(c) => setDisabled(c === true)}
              />
              <label htmlFor="ctl-teDisabled" className="font-medium cursor-pointer select-none text-foreground text-xs">
                Disabled State
              </label>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                id="ctl-teShowHtml"
                size="sm"
                checked={showHtml}
                onCheckedChange={(c) => setShowHtml(c === true)}
              />
              <label htmlFor="ctl-teShowHtml" className="font-medium cursor-pointer select-none text-foreground text-xs">
                Inspect Raw HTML Output
              </label>
            </div>
          </div>

          <span className="text-[11px] text-muted-foreground font-mono">
            Direct in-place formatting &bull; No preview mode required
          </span>
        </div>

        {showHtml && (
          <div className="p-4 border-t border-border bg-muted/40 font-mono text-xs text-muted-foreground max-h-40 overflow-y-auto break-all">
            <span className="text-foreground font-bold block mb-1">Generated HTML:</span>
            {content}
          </div>
        )}
      </div>

      <CodeBlock
        id="code-texteditor"
        reactCode={`import { useState } from "react";
import { TextEditor } from "@cui-universal/react";

export function EditorDemo() {
  const [html, setHtml] = useState("<h1>Hello World</h1><p>Write directly...</p>");

  return (
    <TextEditor
      value={html}
      onChange={setHtml}
      minHeight={240}
      showWordCount
    />
  );
}`}
        vueCode={`<script setup>
import { ref } from "vue";
import { TextEditor } from "@cui-universal/vue";

const html = ref("<h1>Hello World</h1><p>Write directly...</p>");
</script>

<template>
  <TextEditor
    v-model="html"
    min-height="240px"
    :show-word-count="true"
  />
</template>`}
      />

      <ComponentDocDetails
        componentName="TextEditor"
        anatomy={[
          "TextEditor",
          "TextEditorToolbar",
          "TextEditorButton",
          "TextEditorContent",
          "TextEditorFooter",
        ]}
        props={[
          {
            name: "value / v-model",
            type: "string",
            default: '""',
            description: "Editor content formatted as semantic HTML.",
          },
          {
            name: "defaultValue",
            type: "string",
            default: '""',
            description: "Initial HTML content when used uncontrolled.",
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Start typing your rich content here..."',
            description: "Ghost text shown when the editor is empty.",
          },
          {
            name: "minHeight",
            type: "string | number",
            default: '"220px"',
            description: "Minimum height of the editable surface.",
          },
          {
            name: "showWordCount",
            type: "boolean",
            default: "true",
            description: "Toggles the footer status bar displaying word and character counts.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disables toolbar buttons, keyboard shortcuts, and editing interaction.",
          },
        ]}
        accessibility={{
          aria: [
            "Editable surface uses role='textbox' and aria-multiline='true'.",
            "Toolbar buttons include descriptive title tooltips and dynamic active highlights.",
            "Standard keyboard shortcuts: Ctrl/Cmd+B (bold), Ctrl/Cmd+I (italic), Ctrl/Cmd+U (underline), Ctrl/Cmd+K (link), Ctrl/Cmd+Z (undo), Ctrl/Shift+Z (redo).",
          ],
        }}
      />
    </div>
  );
}
