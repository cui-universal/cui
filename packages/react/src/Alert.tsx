import * as React from "react";
import { alertVariants, type AlertVariants, cn } from "@cui-universal/theme";

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertVariants {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    const { root } = alertVariants({ variant });
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(root(), className)}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { title } = alertVariants();
  return (
    <h5
      ref={ref}
      className={cn(title(), className)}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { description } = alertVariants();
  return (
    <div
      ref={ref}
      className={cn(description(), className)}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";
