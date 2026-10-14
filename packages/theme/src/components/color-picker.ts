import { tv, type VariantProps } from "tailwind-variants";

export const colorPickerVariants = tv({
  base: "inline-block relative text-left",
});

export const colorSwatchVariants = tv({
  base: "h-8 w-8 rounded-full border-2 border-border shadow-xs transition-transform duration-150 hover:scale-105 cursor-pointer relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  variants: {
    active: {
      true: "ring-2 ring-primary ring-offset-2 border-transparent scale-105",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>;
