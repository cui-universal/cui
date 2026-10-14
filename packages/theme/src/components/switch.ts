import { tv, type VariantProps } from "tailwind-variants";

export const switchVariants = tv({
  slots: {
    root: "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    thumb: "pointer-events-none block shrink-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  },
  variants: {
    size: {
      xs: {
        root: "h-4 w-7",
        thumb: "h-3 w-3 data-[state=checked]:translate-x-3",
      },
      sm: {
        root: "h-5 w-9",
        thumb: "h-4 w-4 data-[state=checked]:translate-x-4",
      },
      md: {
        root: "h-6 w-11",
        thumb: "h-5 w-5 data-[state=checked]:translate-x-5",
      },
      lg: {
        root: "h-7 w-[52px]",
        thumb: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
      xl: {
        root: "h-8 w-[60px]",
        thumb: "h-7 w-7 data-[state=checked]:translate-x-7",
      },
      "2xl": {
        root: "h-9 w-[68px]",
        thumb: "h-8 w-8 data-[state=checked]:translate-x-8",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type SwitchVariants = VariantProps<typeof switchVariants>;
