import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
  base: "flex w-full rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "border-input",
      error: "border-destructive focus-visible:ring-destructive text-destructive",
    },
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-8 px-2.5 text-xs",
      md: "h-9 px-3 py-1 text-sm",
      lg: "h-10 px-3.5 text-sm",
      xl: "h-11 px-4 text-base",
      "2xl": "h-12 px-5 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
