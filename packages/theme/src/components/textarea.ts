import { tv, type VariantProps } from "tailwind-variants";

export const textareaVariants = tv({
  base: "flex w-full rounded-md border border-input bg-transparent shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
  variants: {
    variant: {
      default: "border-input",
      error: "border-destructive focus-visible:ring-destructive text-destructive",
    },
    size: {
      xs: "min-h-[50px] px-2 py-1 text-xs",
      sm: "min-h-[70px] px-2.5 py-1.5 text-xs",
      md: "min-h-[90px] px-3 py-2 text-sm",
      lg: "min-h-[110px] px-3.5 py-2.5 text-sm",
      xl: "min-h-[130px] px-4 py-3 text-base",
      "2xl": "min-h-[150px] px-5 py-3.5 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type TextareaVariants = VariantProps<typeof textareaVariants>;
