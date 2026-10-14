import { tv, type VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    list: "inline-flex items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground",
    trigger: "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    content: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  },
  variants: {
    size: {
      xs: { list: "h-7 p-0.5", trigger: "px-2 py-0.5 text-[11px]" },
      sm: { list: "h-8 p-1", trigger: "px-2.5 py-1 text-xs" },
      md: { list: "h-9 p-1", trigger: "px-3 py-1 text-xs" },
      lg: { list: "h-10 p-1", trigger: "px-3.5 py-1.5 text-sm" },
      xl: { list: "h-11 p-1.5", trigger: "px-4 py-2 text-sm font-semibold" },
      "2xl": { list: "h-12 p-1.5", trigger: "px-5 py-2.5 text-base font-semibold" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>;
