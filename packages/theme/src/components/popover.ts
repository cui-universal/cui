import { tv, type VariantProps } from "tailwind-variants";

export const popoverVariants = tv({
  base: "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
