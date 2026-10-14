import { tv, type VariantProps } from "tailwind-variants";

export const ratingVariants = tv({
  base: "inline-flex items-center gap-1 select-none",
});

export const ratingStarVariants = tv({
  base: "transition-colors transition-transform duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
  variants: {
    active: {
      true: "text-amber-400 fill-amber-400",
      false: "text-muted-foreground/30 fill-transparent hover:text-amber-400/50",
    },
    interactive: {
      true: "cursor-pointer hover:scale-110",
      false: "cursor-default",
    },
    size: {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    },
  },
  defaultVariants: {
    active: false,
    interactive: true,
    size: "md",
  },
});

export type RatingVariants = VariantProps<typeof ratingVariants>;
