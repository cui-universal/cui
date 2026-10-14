import { tv, type VariantProps } from "tailwind-variants";

export const dropdownMenuContentVariants = tv({
  base: "z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
});

export const dropdownMenuItemVariants = tv({
  base: "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "",
      destructive:
        "text-destructive focus:bg-destructive/10 focus:text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
    },
    inset: {
      true: "pl-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const dropdownMenuIndicatorItemVariants = tv({
  base: "relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
});

export const dropdownMenuLabelVariants = tv({
  base: "px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

export const dropdownMenuSeparatorVariants = tv({
  base: "-mx-1 my-1 h-px bg-border",
});

export const dropdownMenuShortcutVariants = tv({
  base: "ml-auto pl-4 text-[10px] tracking-widest text-muted-foreground",
});

export type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;
