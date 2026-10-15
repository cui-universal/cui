import { tv, type VariantProps } from "tailwind-variants";

export const inputNumberVariants = tv({
  slots: {
    root: "relative inline-flex items-center w-full rounded-md border border-input bg-transparent shadow-xs transition-colors focus-within:ring-1 focus-within:ring-ring focus-within:border-ring overflow-hidden group",
    input: "w-full bg-transparent px-3 text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-mono",
    stepperWrapper: "flex flex-col border-l border-border h-full shrink-0 select-none divide-y divide-border",
    stepperBtn: "flex items-center justify-center flex-1 px-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
    stepperInlineBtn: "flex items-center justify-center h-full px-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 active:bg-muted transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shrink-0 select-none",
    prefix: "pl-3 text-muted-foreground select-none shrink-0 text-xs flex items-center font-medium",
    suffix: "pr-3 text-muted-foreground select-none shrink-0 text-xs flex items-center font-medium",
  },
  variants: {
    variant: {
      default: {
        root: "border-input",
      },
      error: {
        root: "border-destructive focus-within:ring-destructive text-destructive",
      },
    },
    size: {
      xs: {
        root: "h-7 text-xs",
        input: "h-7 px-2 text-xs",
        stepperBtn: "w-5 text-[9px]",
        stepperInlineBtn: "w-6 text-xs",
      },
      sm: {
        root: "h-8 text-xs",
        input: "h-8 px-2.5 text-xs",
        stepperBtn: "w-5 text-[10px]",
        stepperInlineBtn: "w-7 text-xs",
      },
      md: {
        root: "h-9 text-sm",
        input: "h-9 px-3 text-sm",
        stepperBtn: "w-6 text-xs",
        stepperInlineBtn: "w-8 text-sm",
      },
      lg: {
        root: "h-10 text-sm",
        input: "h-10 px-3.5 text-sm",
        stepperBtn: "w-7 text-xs",
        stepperInlineBtn: "w-9 text-base",
      },
      xl: {
        root: "h-11 text-base",
        input: "h-11 px-4 text-base",
        stepperBtn: "w-7 text-sm",
        stepperInlineBtn: "w-10 text-base",
      },
      "2xl": {
        root: "h-12 text-lg rounded-lg",
        input: "h-12 px-5 text-lg",
        stepperBtn: "w-8 text-sm",
        stepperInlineBtn: "w-11 text-lg",
      },
    },
    disabled: {
      true: {
        root: "opacity-50 cursor-not-allowed bg-muted/20 pointer-events-none",
        input: "cursor-not-allowed",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    disabled: false,
  },
});

export type InputNumberVariants = VariantProps<typeof inputNumberVariants>;
