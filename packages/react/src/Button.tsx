import * as React from "react";
import { Slot } from "./primitives";
import { buttonVariants, type ButtonVariants, cn } from "@cui-universal/theme";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";
