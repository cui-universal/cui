import * as React from "react";
import {
  colorPickerVariants,
  colorSwatchVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-react";

export const DEFAULT_PRESET_COLORS = [
  "#f97316", // Orange
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#64748b", // Slate
  "#09090b", // Zinc / Black
];

export interface ColorPickerProps {
  value?: string;
  modelValue?: string;
  onChange?: (color: string) => void;
  colors?: string[];
  allowCustom?: boolean;
  className?: string;
}

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      modelValue,
      onChange,
      colors = DEFAULT_PRESET_COLORS,
      allowCustom = true,
      className,
    },
    ref
  ) => {
    const currentColor = value ?? modelValue ?? colors[0];

    const handleSelect = (c: string) => {
      if (onChange) onChange(c);
    };

    return (
      <div
        ref={ref}
        className={cn(colorPickerVariants(), "flex flex-wrap items-center gap-2", className)}
      >
        {colors.map((c) => {
          const isSelected = currentColor.toLowerCase() === c.toLowerCase();

          return (
            <button
              key={c}
              type="button"
              onClick={() => handleSelect(c)}
              style={{ backgroundColor: c }}
              aria-label={`Color ${c}`}
              className={cn(colorSwatchVariants({ active: isSelected }))}
            >
              {isSelected && (
                <Check className="h-4 w-4 stroke-[3] text-white drop-shadow-sm" />
              )}
            </button>
          );
        })}

        {allowCustom && (
          <label className="relative flex items-center justify-center h-8 w-8 rounded-full border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
            <span className="text-xs text-muted-foreground">+</span>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => handleSelect(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        )}
      </div>
    );
  }
);
ColorPicker.displayName = "ColorPicker";
