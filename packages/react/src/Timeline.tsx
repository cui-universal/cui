import * as React from "react";
import {
  timelineVariants,
  timelineItemVariants,
  timelinePointVariants,
  timelineConnectorVariants,
  timelineContentVariants,
  timelineTitleVariants,
  timelineTimeVariants,
  type TimelineVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-react";

export interface TimelineItem {
  id?: string | number;
  title: string;
  description?: string;
  time?: string;
  status?: "complete" | "current" | "upcoming" | "error" | "warning";
  icon?: React.ReactNode;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TimelineVariants {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      items = [],
      orientation = "vertical",
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ orientation, size }), className)}
        {...props}
      >
        {items.map((item, idx) => {
          const status = item.status ?? "upcoming";
          const isLast = idx === items.length - 1;

          return (
            <div
              key={item.id ?? idx}
              className={timelineItemVariants({ orientation })}
            >
              {/* Connector line leading to next item */}
              {!isLast && (
                <div
                  className={timelineConnectorVariants({
                    orientation,
                    size,
                    status,
                  })}
                  aria-hidden="true"
                />
              )}

              {/* Point Node */}
              <div className={timelinePointVariants({ status, size })}>
                {status === "complete" ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : item.icon ? (
                  item.icon
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Item Content */}
              <div className={timelineContentVariants({ orientation })}>
                <div
                  className={cn(
                    "flex gap-2",
                    orientation === "vertical"
                      ? "items-center justify-between"
                      : "flex-col items-center text-center"
                  )}
                >
                  <h4 className={timelineTitleVariants({ size })}>
                    {item.title}
                  </h4>
                  {item.time && (
                    <span className={timelineTimeVariants({ size })}>
                      {item.time}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
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

