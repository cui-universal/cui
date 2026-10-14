import { tv, type VariantProps } from "tailwind-variants";

export const kbdVariants = tv({
  base: "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-xs",
  variants: {
    size: {
      sm: "h-4 text-[9px] px-1",
      md: "h-5 text-[10px] px-1.5",
      lg: "h-6 text-xs px-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type KbdVariants = VariantProps<typeof kbdVariants>;
