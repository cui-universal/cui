import { tv, type VariantProps } from "tailwind-variants";

export const radioVariants = tv({
  base: "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors cursor-pointer",
  variants: {
    size: {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
    variant: {
      default: "border-primary text-primary",
      destructive: "border-destructive text-destructive",
      success: "border-success text-success",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export type RadioVariants = VariantProps<typeof radioVariants>;
