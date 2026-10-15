import { tv, type VariantProps } from "tailwind-variants";

export const tabsVariants = tv({
  slots: {
    list: "inline-flex items-center justify-center bg-muted p-1 text-muted-foreground",
    trigger: "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm h-full",
    content: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  },
  variants: {
    size: {
      xs: { list: "h-7 p-0.5 gap-0.5", trigger: "px-2 text-[11px]" },
      sm: { list: "h-8 p-1 gap-1", trigger: "px-2.5 text-xs" },
      md: { list: "h-9 p-1 gap-1", trigger: "px-3 text-xs sm:text-sm" },
      lg: { list: "h-10 p-1 gap-1", trigger: "px-3.5 text-sm" },
      xl: { list: "h-11 p-1.5 gap-1.5", trigger: "px-4 text-sm font-semibold" },
      "2xl": { list: "h-12 p-1.5 gap-1.5", trigger: "px-5 text-base font-semibold" },
    },
    radius: {
      none: { list: "rounded-none", trigger: "rounded-none" },
      sm: { list: "rounded-md", trigger: "rounded-sm" },
      md: { list: "rounded-lg", trigger: "rounded-md" },
      lg: { list: "rounded-xl", trigger: "rounded-lg" },
      full: { list: "rounded-full", trigger: "rounded-full" },
    },
  },
  defaultVariants: {
    size: "sm",
    radius: "md",
  },
});

export type TabsVariants = VariantProps<typeof tabsVariants>;
