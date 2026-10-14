import * as React from "react";
import { inputVariants, type InputVariants, cn } from "@cui-universal/theme";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariants {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
