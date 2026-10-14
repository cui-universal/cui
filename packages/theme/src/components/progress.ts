import { tv, type VariantProps } from "tailwind-variants";

export const progressVariants = tv({
  slots: {
    root: "relative w-full overflow-hidden rounded-full bg-primary/20",
    indicator: "h-full w-full flex-1 bg-primary transition-all duration-300",
  },
  variants: {
    size: {
      xs: { root: "h-1" },
      sm: { root: "h-1.5" },
      md: { root: "h-2" },
      lg: { root: "h-3" },
      xl: { root: "h-4" },
      "2xl": { root: "h-5" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ProgressVariants = VariantProps<typeof progressVariants>;
