<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  textEditorVariants,
  textEditorToolbarVariants,
  textEditorButtonVariants,
  textEditorContentVariants,
  textEditorFooterVariants,
  cn,
} from "@cui-universal/theme";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RemoveFormatting,
  Trash2,
  Copy,
  Check,
} from "lucide-vue-next";

interface Props {
  modelValue?: string;
  placeholder?: string;
  class?: string;
  disabled?: boolean;
  showWordCount?: boolean;
  minHeight?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Start typing your rich content here...",
  disabled: false,
  showWordCount: true,
  minHeight: "220px",
});

const emit = defineEmits<{
  (e: "update:modelValue", html: string): void;
}>();

const editorRef = ref<HTMLDivElement | null>(null);
const wordCount = ref(0);
const charCount = ref(0);
const copied = ref(false);

const activeFormats = ref({
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  h1: false,
  h2: false,
  h3: false,
  ul: false,
  ol: false,
  blockquote: false,
  alignLeft: false,
  alignCenter: false,
  alignRight: false,
});

const updateCounts = () => {
  if (!editorRef.value) return;
  const text = editorRef.value.innerText || "";
  const trimmed = text.trim();
  wordCount.value = trimmed ? trimmed.split(/\s+/).length : 0;
  charCount.value = text.replace(/\n$/, "").length;
};

const updateActiveFormats = () => {
  if (typeof document === "undefined" || !editorRef.value) return;

  const sel = window.getSelection();
  if (!sel || !sel.anchorNode || !editorRef.value.contains(sel.anchorNode)) {
    return;
  }

  const isBold = document.queryCommandState("bold");
  const isItalic = document.queryCommandState("italic");
  const isUnderline = document.queryCommandState("underline");
  const isStrike = document.queryCommandState("strikeThrough");
  const isUl = document.queryCommandState("insertUnorderedList");
  const isOl = document.queryCommandState("insertOrderedList");

  let currentEl: HTMLElement | null =
    sel.anchorNode instanceof HTMLElement
      ? sel.anchorNode
      : sel.anchorNode.parentElement;

  let isH1 = false;
  let isH2 = false;
  let isH3 = false;
  let isQuote = false;

  while (currentEl && currentEl !== editorRef.value) {
    const tag = currentEl.tagName.toUpperCase();
    if (tag === "H1") isH1 = true;
    if (tag === "H2") isH2 = true;
    if (tag === "H3") isH3 = true;
    if (tag === "BLOCKQUOTE") isQuote = true;
    currentEl = currentEl.parentElement;
  }

  activeFormats.value = {
    bold: isBold,
    italic: isItalic,
    underline: isUnderline,
    strikeThrough: isStrike,
    h1: isH1,
    h2: isH2,
    h3: isH3,
    ul: isUl,
    ol: isOl,
    blockquote: isQuote,
    alignLeft: document.queryCommandState("justifyLeft"),
    alignCenter: document.queryCommandState("justifyCenter"),
    alignRight: document.queryCommandState("justifyRight"),
  };
};

const handleInput = () => {
  if (!editorRef.value) return;
  const html = editorRef.value.innerHTML;
  emit("update:modelValue", html);
  updateCounts();
  updateActiveFormats();
};

const executeCommand = (command: string, arg?: string) => {
  if (props.disabled || !editorRef.value) return;
  editorRef.value.focus();
  document.execCommand(command, false, arg);
  handleInput();
};

const toggleBlock = (tag: string) => {
  if (props.disabled || !editorRef.value) return;
  editorRef.value.focus();

  const sel = window.getSelection();
  let parentTag = "";
  if (sel && sel.anchorNode) {
    let el: HTMLElement | null =
      sel.anchorNode instanceof HTMLElement
        ? sel.anchorNode
        : sel.anchorNode.parentElement;
    while (el && el !== editorRef.value) {
      if (el.tagName.toLowerCase() === tag.toLowerCase()) {
        parentTag = el.tagName.toLowerCase();
        break;
      }
      el = el.parentElement;
    }
  }

  if (parentTag === tag.toLowerCase()) {
    document.execCommand("formatBlock", false, "<p>");
  } else {
    document.execCommand("formatBlock", false, `<${tag}>`);
  }
  handleInput();
};

const handleLink = () => {
  if (props.disabled || !editorRef.value) return;
  const url = window.prompt("Enter web link URL (https://...):", "https://");
  if (url) {
    executeCommand("createLink", url);
  }
};

const handleClear = () => {
  if (props.disabled || !editorRef.value) return;
  editorRef.value.innerHTML = "";
  handleInput();
};

const handleCopy = () => {
  if (!editorRef.value) return;
  navigator.clipboard.writeText(editorRef.value.innerHTML);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1800);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const modKey = isMac ? e.metaKey : e.ctrlKey;

  if (modKey && !e.altKey) {
    if (e.key.toLowerCase() === "b") {
      e.preventDefault();
      executeCommand("bold");
      return;
    }
    if (e.key.toLowerCase() === "i") {
      e.preventDefault();
      executeCommand("italic");
      return;
    }
    if (e.key.toLowerCase() === "u") {
      e.preventDefault();
      executeCommand("underline");
      return;
    }
    if (e.key.toLowerCase() === "k") {
      e.preventDefault();
      handleLink();
      return;
    }
  }

  if (e.key === "Tab") {
    e.preventDefault();
    if (e.shiftKey) {
      executeCommand("outdent");
    } else {
      executeCommand("indent");
    }
  }
};

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || "";
    updateCounts();
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorRef.value && editorRef.value.innerHTML !== newVal) {
      editorRef.value.innerHTML = newVal || "";
      updateCounts();
    }
  }
);
</script>

<template>
  <div :class="cn(textEditorVariants(), props.class)">
    <!-- Real WYSIWYG Toolbar -->
    <div :class="cn(textEditorToolbarVariants())">
      <div class="flex flex-wrap items-center gap-0.5">
        <!-- Undo / Redo -->
        <button
          type="button"
          title="Undo (Ctrl+Z)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="executeCommand('undo')"
        >
          <Undo2 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="executeCommand('redo')"
        >
          <Redo2 class="h-3.5 w-3.5" />
        </button>

        <span class="w-px h-4 bg-border/80 mx-1" />

        <!-- Block formats -->
        <button
          type="button"
          title="Heading 1"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.h1 }))"
          @mousedown.prevent="toggleBlock('h1')"
        >
          <Heading1 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Heading 2"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.h2 }))"
          @mousedown.prevent="toggleBlock('h2')"
        >
          <Heading2 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Heading 3"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.h3 }))"
          @mousedown.prevent="toggleBlock('h3')"
        >
          <Heading3 class="h-3.5 w-3.5" />
        </button>

        <span class="w-px h-4 bg-border/80 mx-1" />

        <!-- Inline formats -->
        <button
          type="button"
          title="Bold (Ctrl+B)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.bold }))"
          @mousedown.prevent="executeCommand('bold')"
        >
          <Bold class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Italic (Ctrl+I)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.italic }))"
          @mousedown.prevent="executeCommand('italic')"
        >
          <Italic class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Underline (Ctrl+U)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.underline }))"
          @mousedown.prevent="executeCommand('underline')"
        >
          <Underline class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Strikethrough"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.strikeThrough }))"
          @mousedown.prevent="executeCommand('strikeThrough')"
        >
          <Strikethrough class="h-3.5 w-3.5" />
        </button>

        <span class="w-px h-4 bg-border/80 mx-1" />

        <!-- Alignment -->
        <button
          type="button"
          title="Align Left"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.alignLeft }))"
          @mousedown.prevent="executeCommand('justifyLeft')"
        >
          <AlignLeft class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Align Center"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.alignCenter }))"
          @mousedown.prevent="executeCommand('justifyCenter')"
        >
          <AlignCenter class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Align Right"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.alignRight }))"
          @mousedown.prevent="executeCommand('justifyRight')"
        >
          <AlignRight class="h-3.5 w-3.5" />
        </button>

        <span class="w-px h-4 bg-border/80 mx-1" />

        <!-- Lists -->
        <button
          type="button"
          title="Bullet List"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.ul }))"
          @mousedown.prevent="executeCommand('insertUnorderedList')"
        >
          <List class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Numbered List"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.ol }))"
          @mousedown.prevent="executeCommand('insertOrderedList')"
        >
          <ListOrdered class="h-3.5 w-3.5" />
        </button>

        <span class="w-px h-4 bg-border/80 mx-1" />

        <!-- Inserts -->
        <button
          type="button"
          title="Blockquote"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants({ active: activeFormats.blockquote }))"
          @mousedown.prevent="toggleBlock('blockquote')"
        >
          <Quote class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Code Block"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="toggleBlock('pre')"
        >
          <Code class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Insert Link (Ctrl+K)"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="handleLink"
        >
          <LinkIcon class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Horizontal Divider"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="executeCommand('insertHorizontalRule')"
        >
          <Minus class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Clear Formatting"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @mousedown.prevent="executeCommand('removeFormat')"
        >
          <RemoveFormatting class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- Right Tools -->
      <div class="flex items-center gap-1.5 ml-auto">
        <button
          type="button"
          title="Clear Document"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants(), 'hover:text-destructive')"
          @click="handleClear"
        >
          <Trash2 class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          title="Copy Clean HTML"
          :disabled="props.disabled"
          :class="cn(textEditorButtonVariants())"
          @click="handleCopy"
        >
          <Check v-if="copied" class="h-3.5 w-3.5 text-emerald-500" />
          <Copy v-else class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>

    <!-- Real WYSIWYG Editable Surface (Write & View on the same surface!) -->
    <div
      ref="editorRef"
      :contenteditable="!props.disabled"
      :data-placeholder="props.placeholder"
      :class="cn(textEditorContentVariants())"
      :style="{ minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight }"
      @input="handleInput"
      @keydown="handleKeyDown"
      @keyup="updateActiveFormats"
      @mouseup="updateActiveFormats"
    />

    <!-- Footer Statistics -->
    <div v-if="props.showWordCount" :class="cn(textEditorFooterVariants())">
      <span class="flex items-center gap-1.5">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        WYSIWYG Rich Text Mode (Live In-Place Editing)
      </span>
      <div class="flex items-center gap-3">
        <span>{{ wordCount }} {{ wordCount === 1 ? 'word' : 'words' }}</span>
        <span>&bull;</span>
        <span>{{ charCount }} chars</span>
      </div>
    </div>
  </div>
</template>
