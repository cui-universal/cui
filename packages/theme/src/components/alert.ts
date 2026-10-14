import { tv, type VariantProps } from "tailwind-variants";

export const alertVariants = tv({
  slots: {
    root: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    title: "mb-1 font-semibold leading-none tracking-tight",
    description: "text-sm [&_p]:leading-relaxed text-muted-foreground",
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground",
      },
      destructive: {
        root: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        description: "text-destructive/90",
      },
      success: {
        root: "border-success/50 bg-success/5 text-success dark:border-success [&>svg]:text-success",
        description: "text-success/90",
      },
      warning: {
        root: "border-warning/50 bg-warning/5 text-warning dark:border-warning [&>svg]:text-warning",
        description: "text-warning/90",
      },
      info: {
        root: "border-primary/50 bg-primary/5 text-primary dark:border-primary [&>svg]:text-primary",
        description: "text-primary/90",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
