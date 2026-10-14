import { tv } from "tailwind-variants";

export const cardVariants = tv({
  slots: {
    base: "rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md text-card-foreground shadow-sm transition-all duration-300",
    header: "flex flex-col space-y-1.5 p-6",
    title: "font-bold leading-none tracking-tight text-lg",
    description: "text-sm text-muted-foreground leading-relaxed",
    content: "p-6 pt-0",
    footer: "flex items-center p-6 pt-0",
  },
  variants: {
    interactive: {
      true: {
        base: "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer",
      },
    },
  },
});
