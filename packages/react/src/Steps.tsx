import * as React from "react";
import {
  stepsVariants,
  stepItemVariants,
  stepIconVariants,
  stepSeparatorVariants,
  type StepsVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-react";

export interface StepItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    StepsVariants {
  modelValue?: number;
  value?: number;
  current?: number;
  steps: StepItem[];
  clickable?: boolean;
  onStepChange?: (index: number) => void;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      className,
      orientation = "horizontal",
      modelValue,
      value,
      current,
      steps = [],
      clickable = false,
      onStepChange,
      ...props
    },
    ref
  ) => {
    const activeIndex = current ?? value ?? modelValue ?? 0;

    return (
      <div
        ref={ref}
        className={cn(stepsVariants({ orientation }), className)}
        {...props}
      >
        {steps.map((step, idx) => {
          const status =
            idx < activeIndex
              ? "complete"
              : idx === activeIndex
              ? "current"
              : "upcoming";

          return (
            <React.Fragment key={step.id ?? idx}>
              <div
                className={cn(
                  stepItemVariants({ status }),
                  clickable && "cursor-pointer select-none"
                )}
                onClick={() => {
                  if (clickable && onStepChange) onStepChange(idx);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(stepIconVariants({ status }))}>
                    {status === "complete" ? (
                      <Check className="h-4 w-4 stroke-[3]" />
                    ) : step.icon ? (
                      step.icon
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-semibold tracking-tight">
                      {step.title}
                    </span>
                    {step.description && (
                      <span className="text-[11px] text-muted-foreground hidden sm:inline">
                        {step.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {idx < steps.length - 1 && orientation === "horizontal" && (
                <div
                  className={cn(
                    stepSeparatorVariants({
                      status: idx < activeIndex ? "complete" : "upcoming",
                    })
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
Steps.displayName = "Steps";
