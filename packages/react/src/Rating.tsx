import * as React from "react";
import {
  ratingVariants,
  ratingStarVariants,
  cn,
} from "@cui-universal/theme";
import { Star } from "lucide-react";

export interface RatingProps {
  max?: number;
  value?: number;
  modelValue?: number;
  onChange?: (val: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      max = 5,
      value,
      modelValue,
      onChange,
      readonly = false,
      size = "md",
      className,
    },
    ref
  ) => {
    const currentValue = value ?? modelValue ?? 0;
    const [hoverValue, setHoverValue] = React.useState(0);

    const stars = Array.from({ length: max }, (_, i) => i + 1);

    const handleClick = (star: number) => {
      if (!readonly && onChange) {
        onChange(star);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(ratingVariants(), className)}
        onMouseLeave={() => setHoverValue(0)}
      >
        {stars.map((star) => {
          const isActive = star <= (hoverValue || currentValue);

          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readonly && setHoverValue(star)}
              className={cn(
                ratingStarVariants({
                  active: isActive,
                  interactive: !readonly,
                  size,
                })
              )}
            >
              <Star className="h-full w-full" />
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";
