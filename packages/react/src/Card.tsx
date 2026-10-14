import * as React from "react";
import { cardVariants, cn } from "@cui/theme";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, ...props }, ref) => {
    const { base } = cardVariants({ interactive });
    return <div ref={ref} className={cn(base(), className)} {...props} />;
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { header } = cardVariants();
  return <div ref={ref} className={cn(header(), className)} {...props} />;
});
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { title } = cardVariants();
  return <h3 ref={ref} className={cn(title(), className)} {...props} />;
});
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { description } = cardVariants();
  return <p ref={ref} className={cn(description(), className)} {...props} />;
});
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { content } = cardVariants();
  return <div ref={ref} className={cn(content(), className)} {...props} />;
});
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { footer } = cardVariants();
  return <div ref={ref} className={cn(footer(), className)} {...props} />;
});
CardFooter.displayName = "CardFooter";
