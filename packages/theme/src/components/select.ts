import { tv, type VariantProps } from "tailwind-variants";

export const selectTriggerVariants = tv({
  base: "flex w-full items-center justify-between gap-2 rounded-md border bg-transparent shadow-sm ring-offset-background transition-colors data-[placeholder]:text-muted-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-left",
  variants: {
    variant: {
      default: "border-input hover:border-ring/50",
      error: "border-destructive text-destructive focus-visible:ring-destructive",
      ghost: "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-8 px-2.5 text-xs",
      md: "h-9 px-3 text-sm",
      lg: "h-10 px-3.5 text-sm",
      xl: "h-11 px-4 text-base",
      "2xl": "h-12 px-5 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export const selectContentVariants = tv({
  base: "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
});

export const selectItemVariants = tv({
  base: "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
});

export const selectLabelVariants = tv({
  base: "px-2 py-1.5 pl-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
});

export const selectSeparatorVariants = tv({
  base: "-mx-1 my-1 h-px bg-border",
});

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
