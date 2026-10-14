import { tv, type VariantProps } from "tailwind-variants";

export const timelineVariants = tv({
  base: "relative space-y-6 pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border",
});

export const timelineItemVariants = tv({
  base: "relative group",
});

export const timelinePointVariants = tv({
  base: "absolute -left-6 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 text-[10px] font-bold shadow-xs transition-colors",
  variants: {
    status: {
      complete: "border-primary bg-primary text-primary-foreground",
      current: "border-primary text-primary ring-4 ring-primary/15",
      upcoming: "border-border text-muted-foreground bg-muted/60",
    },
  },
  defaultVariants: {
    status: "upcoming",
  },
});

export const timelineContentVariants = tv({
  base: "space-y-1 text-left",
});

export const timelineTitleVariants = tv({
  base: "text-xs sm:text-sm font-bold text-foreground leading-tight",
});

export const timelineTimeVariants = tv({
  base: "text-[10px] sm:text-xs text-muted-foreground font-mono",
});

export type TimelineVariants = VariantProps<typeof timelineVariants>;
