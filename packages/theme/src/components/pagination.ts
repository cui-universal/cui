import { tv, type VariantProps } from "tailwind-variants";

export const paginationVariants = tv({
  base: "mx-auto flex w-full justify-center",
});

export const paginationContentVariants = tv({
  base: "flex flex-row items-center gap-1",
});

export const paginationItemVariants = tv({
  base: "inline-flex items-center justify-center",
});

export const paginationButtonVariants = tv({
  base: "h-8 min-w-[32px] px-2.5 text-xs rounded-md inline-flex items-center justify-center font-medium transition-colors border select-none cursor-pointer",
  variants: {
    active: {
      true: "bg-primary text-primary-foreground border-primary font-bold shadow-2xs",
      false: "bg-background text-foreground border-border hover:bg-muted/60",
    },
    disabled: {
      true: "opacity-40 pointer-events-none cursor-not-allowed",
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export type PaginationVariants = VariantProps<typeof paginationVariants>;
