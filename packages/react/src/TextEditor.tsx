import * as React from "react";
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
} from "lucide-react";

export interface TextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  showWordCount?: boolean;
  minHeight?: string | number;
}

interface ActiveFormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikeThrough: boolean;
  h1: boolean;
  h2: boolean;
  h3: boolean;
  ul: boolean;
  ol: boolean;
  blockquote: boolean;
  alignLeft: boolean;
  alignCenter: boolean;
  alignRight: boolean;
}

const defaultActiveState: ActiveFormatState = {
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
};

export const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      placeholder = "Start typing your rich content here...",
      className,
      disabled = false,
      showWordCount = true,
      minHeight,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = React.useState<ActiveFormatState>(defaultActiveState);
    const [wordCount, setWordCount] = React.useState(0);
    const [charCount, setCharCount] = React.useState(0);
    const [copied, setCopied] = React.useState(false);

    // Initial mount content setup
    React.useEffect(() => {
      if (editorRef.current) {
        const initialContent = isControlled ? value || "" : defaultValue || "";
        editorRef.current.innerHTML = initialContent;
        updateCounts();
      }
    }, []);

    // Controlled updates from parent
    React.useEffect(() => {
      if (isControlled && editorRef.current) {
        if (editorRef.current.innerHTML !== (value || "")) {
          editorRef.current.innerHTML = value || "";
          updateCounts();
        }
      }
    }, [value, isControlled]);

    const updateCounts = () => {
      if (!editorRef.current) return;
      const text = editorRef.current.innerText || "";
      const trimmed = text.trim();
      setWordCount(trimmed ? trimmed.split(/\s+/).length : 0);
      setCharCount(text.replace(/\n$/, "").length);
    };

    const updateActiveFormats = () => {
      if (typeof document === "undefined" || !editorRef.current) return;

      const sel = window.getSelection();
      if (!sel || !sel.anchorNode || !editorRef.current.contains(sel.anchorNode)) {
        return;
      }

      // Check standard formatting states
      const isBold = document.queryCommandState("bold");
      const isItalic = document.queryCommandState("italic");
      const isUnderline = document.queryCommandState("underline");
      const isStrike = document.queryCommandState("strikeThrough");
      const isUl = document.queryCommandState("insertUnorderedList");
      const isOl = document.queryCommandState("insertOrderedList");

      // Check block tags (H1, H2, H3, Blockquote)
      let currentEl: HTMLElement | null =
        sel.anchorNode instanceof HTMLElement
          ? sel.anchorNode
          : sel.anchorNode.parentElement;

      let isH1 = false;
      let isH2 = false;
      let isH3 = false;
      let isQuote = false;

      while (currentEl && currentEl !== editorRef.current) {
        const tag = currentEl.tagName.toUpperCase();
        if (tag === "H1") isH1 = true;
        if (tag === "H2") isH2 = true;
        if (tag === "H3") isH3 = true;
        if (tag === "BLOCKQUOTE") isQuote = true;
        currentEl = currentEl.parentElement;
      }

      setActiveFormats({
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
      });
    };

    const handleInput = () => {
      if (!editorRef.current) return;
      const html = editorRef.current.innerHTML;
      if (onChange) onChange(html);
      updateCounts();
      updateActiveFormats();
    };

    const executeCommand = (command: string, arg: string | undefined = undefined) => {
      if (disabled || !editorRef.current) return;
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      handleInput();
    };

    const toggleBlock = (tag: string) => {
      if (disabled || !editorRef.current) return;
      editorRef.current.focus();

      // If active block is clicked again, reset to standard paragraph
      const sel = window.getSelection();
      let parentTag = "";
      if (sel && sel.anchorNode) {
        let el: HTMLElement | null =
          sel.anchorNode instanceof HTMLElement
            ? sel.anchorNode
            : sel.anchorNode.parentElement;
        while (el && el !== editorRef.current) {
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
      if (disabled || !editorRef.current) return;
      const url = window.prompt("Enter web link URL (https://...):", "https://");
      if (url) {
        executeCommand("createLink", url);
      }
    };

    const handleClear = () => {
      if (disabled || !editorRef.current) return;
      editorRef.current.innerHTML = "";
      handleInput();
    };

    const handleCopy = () => {
      if (!editorRef.current) return;
      const html = editorRef.current.innerHTML;
      navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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

    return (
      <div ref={ref} className={cn(textEditorVariants(), className)}>
        {/* Real WYSIWYG Toolbar */}
        <div className={textEditorToolbarVariants()}>
          <div className="flex flex-wrap items-center gap-0.5">
            {/* Undo / Redo */}
            <button
              type="button"
              title="Undo (Ctrl+Z)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("undo");
              }}
              className={textEditorButtonVariants()}
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Redo (Ctrl+Y / Ctrl+Shift+Z)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("redo");
              }}
              className={textEditorButtonVariants()}
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>

            <span className="w-px h-4 bg-border/80 mx-1" />

            {/* Block formats */}
            <button
              type="button"
              title="Heading 1"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("h1");
              }}
              className={textEditorButtonVariants({ active: activeFormats.h1 })}
            >
              <Heading1 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Heading 2"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("h2");
              }}
              className={textEditorButtonVariants({ active: activeFormats.h2 })}
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Heading 3"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("h3");
              }}
              className={textEditorButtonVariants({ active: activeFormats.h3 })}
            >
              <Heading3 className="h-3.5 w-3.5" />
            </button>

            <span className="w-px h-4 bg-border/80 mx-1" />

            {/* Inline styles */}
            <button
              type="button"
              title="Bold (Ctrl+B)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("bold");
              }}
              className={textEditorButtonVariants({ active: activeFormats.bold })}
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("italic");
              }}
              className={textEditorButtonVariants({ active: activeFormats.italic })}
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Underline (Ctrl+U)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("underline");
              }}
              className={textEditorButtonVariants({ active: activeFormats.underline })}
            >
              <Underline className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Strikethrough"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("strikeThrough");
              }}
              className={textEditorButtonVariants({ active: activeFormats.strikeThrough })}
            >
              <Strikethrough className="h-3.5 w-3.5" />
            </button>

            <span className="w-px h-4 bg-border/80 mx-1" />

            {/* Alignment */}
            <button
              type="button"
              title="Align Left"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("justifyLeft");
              }}
              className={textEditorButtonVariants({ active: activeFormats.alignLeft })}
            >
              <AlignLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Align Center"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("justifyCenter");
              }}
              className={textEditorButtonVariants({ active: activeFormats.alignCenter })}
            >
              <AlignCenter className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Align Right"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("justifyRight");
              }}
              className={textEditorButtonVariants({ active: activeFormats.alignRight })}
            >
              <AlignRight className="h-3.5 w-3.5" />
            </button>

            <span className="w-px h-4 bg-border/80 mx-1" />

            {/* Lists */}
            <button
              type="button"
              title="Bullet List"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("insertUnorderedList");
              }}
              className={textEditorButtonVariants({ active: activeFormats.ul })}
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Numbered List"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("insertOrderedList");
              }}
              className={textEditorButtonVariants({ active: activeFormats.ol })}
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>

            <span className="w-px h-4 bg-border/80 mx-1" />

            {/* Blockquote & Rule */}
            <button
              type="button"
              title="Blockquote"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("blockquote");
              }}
              className={textEditorButtonVariants({ active: activeFormats.blockquote })}
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Code Block"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlock("pre");
              }}
              className={textEditorButtonVariants()}
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Insert Link (Ctrl+K)"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                handleLink();
              }}
              className={textEditorButtonVariants()}
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Horizontal Divider"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("insertHorizontalRule");
              }}
              className={textEditorButtonVariants()}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Clear Formatting"
              disabled={disabled}
              onMouseDown={(e) => {
                e.preventDefault();
                executeCommand("removeFormat");
              }}
              className={textEditorButtonVariants()}
            >
              <RemoveFormatting className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              title="Clear Document"
              disabled={disabled}
              onClick={handleClear}
              className={cn(textEditorButtonVariants(), "hover:text-destructive")}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              title="Copy Clean HTML"
              disabled={disabled}
              onClick={handleCopy}
              className={textEditorButtonVariants()}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Real WYSIWYG Editable Surface (Write & View on the same surface!) */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          className={cn(textEditorContentVariants())}
          style={{ minHeight: minHeight ?? "220px" }}
        />

        {/* Footer Statistics */}
        {showWordCount && (
          <div className={textEditorFooterVariants()}>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              WYSIWYG Rich Text Mode (Live In-Place Editing)
            </span>
            <div className="flex items-center gap-3">
              <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
              <span>&bull;</span>
              <span>{charCount} chars</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);
TextEditor.displayName = "TextEditor";
