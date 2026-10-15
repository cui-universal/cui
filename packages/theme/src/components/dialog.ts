import { tv } from "tailwind-variants";

export const dialogVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    content:
      "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-border/80 bg-card/95 text-card-foreground backdrop-blur-md p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    title: "text-lg font-bold leading-none tracking-tight text-foreground",
    description: "text-sm text-muted-foreground leading-relaxed",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 pt-2",
    close:
      "absolute right-4 top-4 rounded-lg p-1 text-muted-foreground opacity-70 ring-offset-background transition-all hover:opacity-100 hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 disabled:pointer-events-none",
  },
});
