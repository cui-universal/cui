import { tv } from "tailwind-variants";

export const cardVariants = tv({
  slots: {
    base: "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200",
    header: "flex flex-col space-y-1.5 p-6",
    title: "font-semibold leading-none tracking-tight text-base sm:text-lg",
    description: "text-sm text-muted-foreground leading-relaxed",
    content: "p-6 pt-0",
    footer: "flex items-center p-6 pt-0",
  },
  variants: {
    interactive: {
      true: {
        base: "hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
      },
    },
  },
});
