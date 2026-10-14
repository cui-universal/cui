import * as React from "react";
import {
  emptyStateVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
  emptyStateActionVariants,
  cn,
} from "@cui-universal/theme";
import { Inbox } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      title = "No data found",
      description = "There are no items to display at this moment.",
      icon,
      action,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants(), className)}
        {...props}
      >
        <div className={emptyStateIconVariants()}>
          {icon || <Inbox className="h-6 w-6 stroke-[1.5]" />}
        </div>
        <h3 className={emptyStateTitleVariants()}>{title}</h3>
        {description && (
          <p className={emptyStateDescriptionVariants()}>{description}</p>
        )}
        {action && (
          <div className={emptyStateActionVariants()}>{action}</div>
        )}
        {children}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";
