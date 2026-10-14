import * as React from "react";
import { skeletonVariants, cn } from "@cui-universal/theme";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(skeletonVariants(), className)}
      {...props}
    />
  );
}
