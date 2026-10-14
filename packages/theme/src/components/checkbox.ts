import { tv, type VariantProps } from "tailwind-variants";

export const checkboxVariants = tv({
  slots: {
    root: "peer shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center transition-colors",
    indicator: "flex items-center justify-center text-current",
  },
  variants: {
    size: {
      xs: { root: "h-3 w-3" },
      sm: { root: "h-3.5 w-3.5" },
      md: { root: "h-4 w-4" },
      lg: { root: "h-5 w-5" },
      xl: { root: "h-6 w-6" },
      "2xl": { root: "h-7 w-7" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
