import { tv, type VariantProps } from "tailwind-variants";

export const textEditorVariants = tv({
  base: "w-full rounded-lg border border-border bg-background shadow-xs overflow-hidden focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-colors",
});

export const textEditorToolbarVariants = tv({
  base: "flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 p-1.5",
});

export const textEditorButtonVariants = tv({
  base: "h-7 w-7 rounded p-0 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-40",
  variants: {
    active: {
      true: "bg-accent text-accent-foreground font-bold shadow-2xs",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const textEditorContentVariants = tv({
  base: "min-h-[140px] w-full p-3 text-xs sm:text-sm leading-relaxed bg-transparent outline-none resize-y placeholder:text-muted-foreground font-sans",
});

export type TextEditorVariants = VariantProps<typeof textEditorVariants>;
