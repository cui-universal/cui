import * as React from "react";
import { progressVariants, type ProgressVariants, cn } from "@cui/theme";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProgressVariants {
  value?: number | null;
  max?: number;
  getValueLabel?(value: number, max: number): string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, size, getValueLabel, ...props }, ref) => {
    const { root, indicator } = progressVariants({ size });
    const clampedValue = value !== null && value !== undefined ? Math.min(Math.max(value, 0), max) : null;
    const percentage = clampedValue !== null ? (clampedValue / max) * 100 : 0;
    const state = clampedValue === null ? "indeterminate" : clampedValue >= max ? "complete" : "loading";

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clampedValue ?? undefined}
        aria-valuetext={clampedValue !== null && getValueLabel ? getValueLabel(clampedValue, max) : undefined}
        data-state={state}
        data-value={clampedValue ?? undefined}
        data-max={max}
        className={cn(root(), className)}
        {...props}
      >
        <div
          data-state={state}
          data-value={clampedValue ?? undefined}
          data-max={max}
          className={cn(indicator())}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";
