import { tv, type VariantProps } from "tailwind-variants";

export const textEditorVariants = tv({
  base: "w-full rounded-2xl border border-border bg-card shadow-xs overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all",
});

export const textEditorToolbarVariants = tv({
  base: "flex flex-wrap items-center justify-between gap-1 border-b border-border bg-muted/40 p-1.5 px-2 backdrop-blur-xs select-none",
});

export const textEditorButtonVariants = tv({
  base: "h-7 w-7 rounded-md p-0 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-30 active:scale-95 cursor-pointer",
  variants: {
    active: {
      true: "bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 hover:text-primary-foreground",
    },
    variant: {
      default: "",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
  },
  defaultVariants: {
    active: false,
    variant: "default",
  },
});

export const textEditorContentVariants = tv({
  base: "min-h-[200px] w-full p-4 text-xs sm:text-sm leading-relaxed bg-transparent outline-none font-sans focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/60 empty:before:pointer-events-none [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-3.5 [&_h2]:mb-1.5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:my-1.5 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:my-0.5 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-3.5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-3 [&_blockquote]:bg-muted/20 [&_blockquote]:py-1 [&_blockquote]:rounded-r [&_pre]:bg-muted/70 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-xs [&_pre]:my-2.5 [&_pre]:border [&_pre]:border-border/60 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-xs [&_code]:text-primary [&_code]:font-medium [&_hr]:my-4 [&_hr]:border-border [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
});

export const textEditorFooterVariants = tv({
  base: "flex items-center justify-between px-3.5 py-1.5 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground font-mono select-none",
});

export type TextEditorVariants = VariantProps<typeof textEditorVariants>;
