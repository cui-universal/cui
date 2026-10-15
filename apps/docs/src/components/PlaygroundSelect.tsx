import React from "react";

interface PlaygroundSelectProps {
  id?: string;
  value: string;
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function PlaygroundSelect({
  id,
  value,
  onValueChange,
  options,
  className = "",
}: PlaygroundSelectProps) {
  return (
    <div id={id} className={`flex flex-wrap gap-1 ${className}`}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const displayText = opt.label.includes(" (") ? opt.value : opt.label;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onValueChange(opt.value)}
            className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-colors cursor-pointer ${
              isSelected
                ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                : "border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title={opt.label !== displayText ? opt.label : undefined}
          >
            {displayText}
          </button>
        );
      })}
    </div>
  );
}
