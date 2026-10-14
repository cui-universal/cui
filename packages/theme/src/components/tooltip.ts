import { tv, type VariantProps } from "tailwind-variants";

export const tooltipVariants = tv({
  base: "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 shadow-md",
});

export type TooltipVariants = VariantProps<typeof tooltipVariants>;
