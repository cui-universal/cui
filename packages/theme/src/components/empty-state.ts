import { tv, type VariantProps } from "tailwind-variants";

export const emptyStateVariants = tv({
  base: "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-card/40",
});

export const emptyStateIconVariants = tv({
  base: "flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4 shadow-2xs",
});

export const emptyStateTitleVariants = tv({
  base: "text-sm sm:text-base font-bold text-foreground tracking-tight",
});

export const emptyStateDescriptionVariants = tv({
  base: "text-xs text-muted-foreground max-w-sm mt-1.5 leading-relaxed",
});

export const emptyStateActionVariants = tv({
  base: "mt-4 flex items-center gap-2",
});

export type EmptyStateVariants = VariantProps<typeof emptyStateVariants>;
