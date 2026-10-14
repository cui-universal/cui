import * as React from "react";
import { kbdVariants, type KbdVariants, cn } from "@cui-universal/theme";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    KbdVariants {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...props}
      />
    );
  }
);
Kbd.displayName = "Kbd";
