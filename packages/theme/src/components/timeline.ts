import { tv, type VariantProps } from "tailwind-variants";

export const timelineVariants = tv({
  base: "relative w-full",
  variants: {
    orientation: {
      vertical: "flex flex-col space-y-6 pl-8",
      horizontal: "flex flex-row items-start justify-between gap-4 overflow-x-auto pb-4 pt-1",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
  },
});

export const timelineItemVariants = tv({
  base: "relative flex group",
  variants: {
    orientation: {
      vertical: "items-start w-full min-h-[50px]",
      horizontal: "flex-col items-center flex-1 text-center min-w-[120px]",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const timelinePointVariants = tv({
  base: "relative z-10 flex shrink-0 items-center justify-center rounded-full bg-background border-2 font-bold shadow-xs transition-all",
  variants: {
    size: {
      sm: "h-5 w-5 text-[9px]",
      md: "h-6 w-6 text-[10px]",
      lg: "h-7 w-7 text-xs",
    },
    status: {
      complete: "border-primary bg-primary text-primary-foreground shadow-primary/20",
      current: "border-primary text-primary ring-4 ring-primary/15 bg-background",
      upcoming: "border-border text-muted-foreground bg-muted/70",
      error: "border-destructive bg-destructive text-destructive-foreground shadow-destructive/20",
      warning: "border-amber-500 bg-amber-500 text-white shadow-amber-500/20",
    },
  },
  defaultVariants: {
    size: "md",
    status: "upcoming",
  },
});

export const timelineConnectorVariants = tv({
  base: "transition-colors",
  variants: {
    orientation: {
      vertical: "absolute top-6 bottom-[-24px] w-[2px]",
      horizontal: "absolute left-1/2 right-[-50%] h-[2px]",
    },
    size: {
      sm: "left-[9px]",
      md: "left-[11px]",
      lg: "left-[13px]",
    },
    status: {
      complete: "bg-primary",
      current: "bg-primary/40",
      upcoming: "bg-border",
      error: "bg-destructive",
      warning: "bg-amber-500",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      className: "top-[9px] left-1/2 right-[-50%]",
    },
    {
      orientation: "horizontal",
      size: "md",
      className: "top-[11px] left-1/2 right-[-50%]",
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: "top-[13px] left-1/2 right-[-50%]",
    },
  ],
  defaultVariants: {
    orientation: "vertical",
    size: "md",
    status: "upcoming",
  },
});

export const timelineContentVariants = tv({
  base: "space-y-1",
  variants: {
    orientation: {
      vertical: "ml-4 flex-1 text-left -mt-0.5",
      horizontal: "mt-3 w-full text-center px-1",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const timelineTitleVariants = tv({
  base: "font-bold text-foreground leading-snug",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const timelineTimeVariants = tv({
  base: "text-muted-foreground font-mono shrink-0",
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TimelineVariants = VariantProps<typeof timelineVariants>;

