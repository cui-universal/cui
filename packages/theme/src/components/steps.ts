import { tv, type VariantProps } from "tailwind-variants";

export const stepsVariants = tv({
  base: "w-full flex items-center justify-between",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start space-y-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepItemVariants = tv({
  base: "flex items-center group relative flex-1 last:flex-none",
  variants: {
    status: {
      complete: "text-primary",
      current: "text-primary font-semibold",
      upcoming: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "upcoming",
  },
});

export const stepIconVariants = tv({
  base: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 border-2 select-none",
  variants: {
    status: {
      complete: "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20",
      current: "border-primary bg-background text-primary ring-4 ring-primary/15 font-black",
      upcoming: "border-border bg-muted/60 text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "upcoming",
  },
});

export const stepSeparatorVariants = tv({
  base: "h-0.5 w-full mx-3 transition-colors duration-200",
  variants: {
    status: {
      complete: "bg-primary",
      upcoming: "bg-border",
    },
  },
  defaultVariants: {
    status: "upcoming",
  },
});

export type StepsVariants = VariantProps<typeof stepsVariants>;
