import { tv, type VariantProps } from "tailwind-variants";

export const datePickerVariants = tv({
  slots: {
    root: "relative inline-block w-full text-left",
    trigger: "flex w-full items-center justify-between rounded-lg border border-input bg-background font-normal shadow-xs transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none text-foreground",
    calendar: "p-3 bg-popover text-popover-foreground rounded-xl border border-border shadow-2xl select-none z-50",
    header: "flex items-center justify-between pb-2 px-1 gap-1",
    day: "text-center p-0 relative flex items-center justify-center rounded-lg transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer select-none",
  },
  variants: {
    size: {
      xs: {
        trigger: "h-7 px-2 text-[11px] gap-1.5",
        calendar: "w-[250px] p-2",
        day: "h-7 w-7 text-[11px]",
      },
      sm: {
        trigger: "h-8 px-2.5 text-xs gap-2",
        calendar: "w-[270px] p-2.5",
        day: "h-7.5 w-7.5 text-xs",
      },
      md: {
        trigger: "h-9 px-3 text-xs sm:text-sm gap-2",
        calendar: "w-[290px] p-3",
        day: "h-8 w-8 text-xs",
      },
      lg: {
        trigger: "h-10 px-3.5 text-sm gap-2.5",
        calendar: "w-[320px] p-3.5",
        day: "h-9 w-9 text-sm",
      },
      xl: {
        trigger: "h-11 px-4 text-base gap-3",
        calendar: "w-[340px] p-4",
        day: "h-10 w-10 text-base",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const calendarVariants = tv({
  base: "p-3 bg-popover text-popover-foreground rounded-xl border border-border shadow-2xl select-none w-[290px] z-50",
  variants: {
    size: {
      xs: "w-[250px] p-2 text-xs",
      sm: "w-[270px] p-2.5 text-xs",
      md: "w-[290px] p-3 text-sm",
      lg: "w-[320px] p-3.5 text-base",
      xl: "w-[340px] p-4 text-base",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const calendarHeaderVariants = tv({
  base: "flex items-center justify-between pt-1 pb-2 px-1 gap-1",
});

export const calendarDayVariants = tv({
  base: "h-8 w-8 text-center text-xs p-0 relative flex items-center justify-center rounded-lg transition-colors font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer select-none",
  variants: {
    size: {
      xs: "h-7 w-7 text-[11px]",
      sm: "h-7.5 w-7.5 text-xs",
      md: "h-8 w-8 text-xs",
      lg: "h-9 w-9 text-sm",
      xl: "h-10 w-10 text-base",
    },
    selected: {
      true: "bg-primary text-primary-foreground hover:bg-primary font-bold shadow-xs",
    },
    rangeStart: {
      true: "bg-primary text-primary-foreground hover:bg-primary font-bold rounded-l-lg rounded-r-none shadow-xs z-10",
    },
    rangeEnd: {
      true: "bg-primary text-primary-foreground hover:bg-primary font-bold rounded-r-lg rounded-l-none shadow-xs z-10",
    },
    inRange: {
      true: "bg-primary/15 text-foreground hover:bg-primary/25 rounded-none font-medium",
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
  compoundVariants: [
    {
      rangeStart: true,
      rangeEnd: true,
      className: "rounded-lg",
    },
  ],
  defaultVariants: {
    size: "sm",
    selected: false,
    rangeStart: false,
    rangeEnd: false,
    inRange: false,
    today: false,
    outside: false,
  },
});

export type DatePickerVariants = VariantProps<typeof datePickerVariants>;
