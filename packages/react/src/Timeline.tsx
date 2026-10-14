import * as React from "react";
import {
  timelineVariants,
  timelineItemVariants,
  timelinePointVariants,
  timelineContentVariants,
  timelineTitleVariants,
  timelineTimeVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-react";

export interface TimelineItem {
  id?: string | number;
  title: string;
  description?: string;
  time?: string;
  status?: "complete" | "current" | "upcoming";
  icon?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, items = [], ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants(), className)}
        {...props}
      >
        {items.map((item, idx) => {
          const status = item.status ?? "upcoming";

          return (
            <div key={item.id ?? idx} className={timelineItemVariants()}>
              <div className={timelinePointVariants({ status })}>
                {status === "complete" ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : item.icon ? (
                  item.icon
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <div className={timelineContentVariants()}>
                <div className="flex items-center justify-between gap-2">
                  <h4 className={timelineTitleVariants()}>{item.title}</h4>
                  {item.time && (
                    <span className={timelineTimeVariants()}>{item.time}</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";
