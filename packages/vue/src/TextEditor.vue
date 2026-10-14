<script setup lang="ts">
import { ref, computed } from "vue";
import {
  textEditorVariants,
  textEditorToolbarVariants,
  textEditorButtonVariants,
  textEditorContentVariants,
  cn,
} from "@cui-universal/theme";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Eye,
  Edit3,
  RotateCcw,
} from "lucide-vue-next";

interface Props {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  class?: string;
  showWordCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Write something here... (Markdown supported)",
  rows: 6,
  showWordCount: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const mode = ref<"write" | "preview">("write");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const content = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const wordCount = computed(() => {
  const text = props.modelValue.trim();
  return text ? text.split(/\s+/).length : 0;
});

const charCount = computed(() => props.modelValue.length);

// Wrap or insert markdown tags around selection
const insertFormat = (prefix: string, suffix = "") => {
  const el = textareaRef.value;
  if (!el) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;
  const currentText = props.modelValue;
  const selectedText = currentText.substring(start, end);

  const replacement = prefix + (selectedText || "text") + suffix;
  const newText =
    currentText.substring(0, start) + replacement + currentText.substring(end);

  emit("update:modelValue", newText);

  // Restore cursor inside formatted text
  setTimeout(() => {
    el.focus();
    const newPos = start + prefix.length + (selectedText ? selectedText.length : 4);
    el.setSelectionRange(newPos, newPos);
  }, 0);
};

const insertLinePrefix = (prefix: string) => {
  const el = textareaRef.value;
  if (!el) return;

  const start = el.selectionStart;
  const currentText = props.modelValue;
  const lineStart = currentText.lastIndexOf("\n", start - 1) + 1;

  const newText =
    currentText.substring(0, lineStart) +
    prefix +
    currentText.substring(lineStart);

  emit("update:modelValue", newText);

  setTimeout(() => {
    el.focus();
    const newPos = start + prefix.length;
    el.setSelectionRange(newPos, newPos);
  }, 0);
};

// Simple markdown preview parser for bold, italic, headings, lists, links
const parsedPreview = computed(() => {
  if (!props.modelValue) return "<p class='text-muted-foreground italic'>Nothing to preview</p>";

  const lines = props.modelValue.split("\n");
  const html = lines
    .map((line) => {
      let l = line;
      if (l.startsWith("### ")) return `<h3 class="text-sm font-bold mt-2 mb-1">${l.slice(4)}</h3>`;
      if (l.startsWith("## ")) return `<h2 class="text-base font-bold mt-3 mb-1">${l.slice(3)}</h2>`;
      if (l.startsWith("# ")) return `<h1 class="text-lg font-black mt-3 mb-1">${l.slice(2)}</h1>`;
      if (l.startsWith("> ")) return `<blockquote class="border-l-2 border-primary pl-3 italic text-muted-foreground my-1">${l.slice(2)}</blockquote>`;
      if (l.startsWith("- ")) return `<li class="ml-4 list-disc text-xs my-0.5">${l.slice(2)}</li>`;
      if (/^\d+\.\s/.test(l)) return `<li class="ml-4 list-decimal text-xs my-0.5">${l.replace(/^\d+\.\s/, "")}</li>`;

      // Inline styles
      l = l.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      l = l.replace(/\*(.*?)\*/g, "<em>$1</em>");
      l = l.replace(/~~(.*?)~~/g, "<del>$1</del>");
      l = l.replace(/`(.*?)`/g, "<code class='bg-muted px-1 rounded font-mono text-xs'>$1</code>");
      l = l.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' target='_blank' class='text-primary underline'>$1</a>");

      return l.trim() ? `<p class="my-1 text-xs sm:text-sm">${l}</p>` : "<br />";
    })
    .join("");

  return html;
});
</script>

<template>
  <div :class="cn(textEditorVariants(), props.class)">
    <!-- Toolbar -->
    <div :class="cn(textEditorToolbarVariants())">
      <div class="flex items-center gap-0.5 flex-1">
        <button
          type="button"
          title="Bold"
          :class="cn(textEditorButtonVariants())"
          @click="insertFormat('**', '**')"
        >
          <Bold class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Italic"
          :class="cn(textEditorButtonVariants())"
          @click="insertFormat('*', '*')"
        >
          <Italic class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Strikethrough"
          :class="cn(textEditorButtonVariants())"
          @click="insertFormat('~~', '~~')"
        >
          <Strikethrough class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Inline Code"
          :class="cn(textEditorButtonVariants())"
          @click="insertFormat('`', '`')"
        >
          <Code class="h-3.5 w-3.5" />
        </button>

        <span class="h-4 w-px bg-border mx-1" />

        <button
          type="button"
          title="Heading 1"
          :class="cn(textEditorButtonVariants())"
          @click="insertLinePrefix('# ')"
        >
          <Heading1 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Heading 2"
          :class="cn(textEditorButtonVariants())"
          @click="insertLinePrefix('## ')"
        >
          <Heading2 class="h-3.5 w-3.5" />
        </button>

        <span class="h-4 w-px bg-border mx-1" />

        <button
          type="button"
          title="Bullet List"
          :class="cn(textEditorButtonVariants())"
          @click="insertLinePrefix('- ')"
        >
          <List class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Numbered List"
          :class="cn(textEditorButtonVariants())"
          @click="insertLinePrefix('1. ')"
        >
          <ListOrdered class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Quote"
          :class="cn(textEditorButtonVariants())"
          @click="insertLinePrefix('> ')"
        >
          <Quote class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Insert Link"
          :class="cn(textEditorButtonVariants())"
          @click="insertFormat('[Link text](', 'https://)')"
        >
          <LinkIcon class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Mode Toggle: Write / Preview -->
      <div class="flex items-center gap-1 border-l border-border pl-1.5 ml-1">
        <button
          type="button"
          :class="cn(textEditorButtonVariants({ active: mode === 'write' }))"
          title="Edit Mode"
          @click="mode = 'write'"
        >
          <Edit3 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          :class="cn(textEditorButtonVariants({ active: mode === 'preview' }))"
          title="Preview Mode"
          @click="mode = 'preview'"
        >
          <Eye class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <!-- Content Area: Edit vs Preview -->
    <div class="relative">
      <textarea
        v-show="mode === 'write'"
        ref="textareaRef"
        v-model="content"
        :placeholder="placeholder"
        :rows="rows"
        :class="cn(textEditorContentVariants())"
      />

      <div
        v-show="mode === 'preview'"
        class="min-h-[140px] p-3 text-xs sm:text-sm prose prose-sm dark:prose-invert max-w-none overflow-y-auto leading-relaxed"
        v-html="parsedPreview"
      />
    </div>

    <!-- Footer Counter -->
    <div
      v-if="showWordCount"
      class="flex items-center justify-between px-3 py-1.5 border-t border-border/60 bg-muted/20 text-[10px] text-muted-foreground font-mono"
    >
      <span>Markdown formatting supported</span>
      <div class="flex items-center gap-3">
        <span>{{ wordCount }} words</span>
        <span>{{ charCount }} chars</span>
      </div>
    </div>
  </div>
</template>
