import * as React from "react";
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
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Eye,
  Edit3,
} from "lucide-react";

export interface TextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
}

export const TextEditor = React.forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      placeholder = "Type your content or Markdown here...",
      rows = 6,
      className,
      disabled = false,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = isControlled ? value : internalValue;

    const [isPreview, setIsPreview] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const updateText = (newVal: string) => {
      if (!isControlled) {
        setInternalValue(newVal);
      }
      if (onChange) onChange(newVal);
    };

    const wrapSelection = (before: string, after: string = before) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      const selected = text.slice(start, end);
      const replacement = `${before}${selected || "text"}${after}`;
      const newText = text.slice(0, start) + replacement + text.slice(end);

      updateText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + (selected.length || 4)
        );
      }, 0);
    };

    const addPrefixToLine = (prefix: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const text = textarea.value;

      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const newText = text.slice(0, lineStart) + prefix + text.slice(lineStart);

      updateText(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length
        );
      }, 0);
    };

    return (
      <div
        ref={ref}
        className={cn(textEditorVariants(), className)}
      >
        {/* Toolbar */}
        <div className={textEditorToolbarVariants()}>
          <button
            type="button"
            title="Bold"
            disabled={disabled || isPreview}
            onClick={() => wrapSelection("**")}
            className={textEditorButtonVariants()}
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Italic"
            disabled={disabled || isPreview}
            onClick={() => wrapSelection("*")}
            className={textEditorButtonVariants()}
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            disabled={disabled || isPreview}
            onClick={() => wrapSelection("~~")}
            className={textEditorButtonVariants()}
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </button>

          <span className="w-px h-4 bg-border mx-1" />

          <button
            type="button"
            title="Heading 1"
            disabled={disabled || isPreview}
            onClick={() => addPrefixToLine("# ")}
            className={textEditorButtonVariants()}
          >
            <Heading1 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Heading 2"
            disabled={disabled || isPreview}
            onClick={() => addPrefixToLine("## ")}
            className={textEditorButtonVariants()}
          >
            <Heading2 className="h-3.5 w-3.5" />
          </button>

          <span className="w-px h-4 bg-border mx-1" />

          <button
            type="button"
            title="Bullet list"
            disabled={disabled || isPreview}
            onClick={() => addPrefixToLine("- ")}
            className={textEditorButtonVariants()}
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Numbered list"
            disabled={disabled || isPreview}
            onClick={() => addPrefixToLine("1. ")}
            className={textEditorButtonVariants()}
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Quote"
            disabled={disabled || isPreview}
            onClick={() => addPrefixToLine("> ")}
            className={textEditorButtonVariants()}
          >
            <Quote className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Code block"
            disabled={disabled || isPreview}
            onClick={() => wrapSelection("```\n", "\n```")}
            className={textEditorButtonVariants()}
          >
            <Code className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Link"
            disabled={disabled || isPreview}
            onClick={() => wrapSelection("[", "](https://)")}
            className={textEditorButtonVariants()}
          >
            <Link className="h-3.5 w-3.5" />
          </button>

          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={cn(
                textEditorButtonVariants({ active: isPreview }),
                "w-auto px-2 text-xs gap-1 font-medium"
              )}
            >
              {isPreview ? (
                <>
                  <Edit3 className="h-3.5 w-3.5" /> Edit
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Preview
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Area */}
        {isPreview ? (
          <div className="min-h-[140px] p-4 text-xs sm:text-sm bg-muted/10 prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans">
            {currentValue ? (
              currentValue
            ) : (
              <span className="text-muted-foreground italic">Nothing to preview</span>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={rows}
            disabled={disabled}
            value={currentValue}
            placeholder={placeholder}
            onChange={(e) => updateText(e.target.value)}
            className={textEditorContentVariants()}
          />
        )}
      </div>
    );
  }
);
TextEditor.displayName = "TextEditor";
