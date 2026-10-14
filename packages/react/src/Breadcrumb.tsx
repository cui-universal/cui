import * as React from "react";
import {
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbSeparatorVariants,
  cn,
} from "@cui-universal/theme";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbVariants(), className)}
        {...props}
      />
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(breadcrumbItemVariants(), className)}
        {...props}
      />
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={active ? "page" : undefined}
        className={cn(breadcrumbLinkVariants({ active }), className)}
        {...props}
      />
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(breadcrumbSeparatorVariants(), className)}
        {...props}
      >
        {children || <ChevronRight className="h-3.5 w-3.5" />}
      </span>
    );
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
