import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
  base: "inline-flex items-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-wide",
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground shadow-xs shadow-primary/25 hover:bg-primary/90",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/30",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
      outline:
        "text-foreground border border-border/80 bg-background/60 backdrop-blur-xs hover:bg-accent/50",
      success:
        "border-transparent bg-success text-success-foreground shadow-xs shadow-success/20 hover:bg-success/90",
      warning:
        "border-transparent bg-warning text-warning-foreground shadow-xs shadow-warning/20 hover:bg-warning/90",
    },
    size: {
      xs: "px-2 py-0.5 text-[10px]",
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-3 py-1 text-xs",
      lg: "px-3.5 py-1 text-sm font-medium",
      xl: "px-4 py-1.5 text-sm font-semibold",
      "2xl": "px-5 py-2 text-base font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
