import { tv, type VariantProps } from "tailwind-variants";

export const breadcrumbVariants = tv({
  base: "flex flex-wrap items-center gap-1.5 break-words text-xs text-muted-foreground sm:gap-2.5",
});

export const breadcrumbItemVariants = tv({
  base: "inline-flex items-center gap-1.5",
});

export const breadcrumbLinkVariants = tv({
  base: "transition-colors hover:text-foreground cursor-pointer underline-offset-4",
  variants: {
    active: {
      true: "font-semibold text-foreground pointer-events-none",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const breadcrumbSeparatorVariants = tv({
  base: "text-muted-foreground/60 select-none",
});

export type BreadcrumbVariants = VariantProps<typeof breadcrumbVariants>;
