import { tv, type VariantProps } from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    item: "border-b border-border",
    header: "flex",
    trigger: "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
    icon: "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
    content: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    inner: "pb-4 pt-0 text-muted-foreground leading-relaxed",
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
