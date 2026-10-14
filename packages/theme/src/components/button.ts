import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.97] cursor-pointer",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/95 hover:shadow-md hover:shadow-primary/30 active:shadow-sm",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40 shadow-xs",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/25 hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/30",
      outline:
        "border border-border/80 bg-background/80 backdrop-blur-sm shadow-2xs hover:bg-accent/80 hover:text-accent-foreground hover:border-primary/40",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      success:
        "bg-success text-success-foreground shadow-sm shadow-success/25 hover:bg-success/90 hover:shadow-md hover:shadow-success/30",
    },
    size: {
      xs: "h-7 rounded-md px-2.5 text-xs gap-1",
      sm: "h-8 rounded-lg px-3 text-xs gap-1.5",
      md: "h-9 rounded-lg px-4 py-2 text-sm gap-2",
      lg: "h-10 rounded-xl px-5 text-sm gap-2",
      xl: "h-11 rounded-xl px-6 text-base gap-2.5 font-semibold",
      "2xl": "h-12 rounded-2xl px-8 text-lg gap-3 font-semibold",
      icon: "h-9 w-9 p-0 rounded-lg",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
