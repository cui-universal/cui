import { tv, type VariantProps } from "tailwind-variants";

export const avatarVariants = tv({
  slots: {
    root: "relative flex shrink-0 overflow-hidden rounded-full",
    image: "aspect-square h-full w-full object-cover",
    fallback: "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground select-none",
  },
  variants: {
    size: {
      xs: {
        root: "h-6 w-6 text-[10px]",
      },
      sm: {
        root: "h-8 w-8 text-xs",
      },
      md: {
        root: "h-10 w-10 text-sm",
      },
      lg: {
        root: "h-12 w-12 text-base",
      },
      xl: {
        root: "h-14 w-14 text-lg",
      },
      "2xl": {
        root: "h-16 w-16 text-xl",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
