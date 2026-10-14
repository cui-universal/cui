import { tv, type VariantProps } from "tailwind-variants";

export const datePickerVariants = tv({
  base: "relative inline-block w-full text-left",
});

export const calendarVariants = tv({
  base: "p-3 bg-popover text-popover-foreground rounded-lg border border-border shadow-lg select-none w-[280px]",
});

export const calendarHeaderVariants = tv({
  base: "flex items-center justify-between pt-1 pb-2 px-1",
});

export const calendarDayVariants = tv({
  base: "h-8 w-8 text-center text-xs p-0 relative flex items-center justify-center rounded-md transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer select-none",
  variants: {
    selected: {
      true: "bg-primary text-primary-foreground hover:bg-primary font-bold shadow-xs",
    },
    today: {
      true: "border border-primary/60 font-bold",
    },
    outside: {
      true: "text-muted-foreground/40 hover:bg-transparent pointer-events-none",
    },
    disabled: {
      true: "text-muted-foreground/30 pointer-events-none opacity-50",
    },
  },
  defaultVariants: {
    selected: false,
    today: false,
    outside: false,
  },
});

export type DatePickerVariants = VariantProps<typeof datePickerVariants>;
