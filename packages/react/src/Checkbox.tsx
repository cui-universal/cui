import * as React from "react";
import { checkboxVariants, type CheckboxVariants, cn } from "@cui/theme";
import { Check, Minus } from "lucide-react";
import { useControllableState } from "./primitives";

export type CheckedState = boolean | "indeterminate";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked">,
    CheckboxVariants {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  name?: string;
  value?: string;
  required?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      size,
      checked: checkedProp,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      name,
      value = "on",
      required,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [checked, setChecked] = useControllableState<CheckedState>({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    const { root, indicator } = checkboxVariants({ size });
    const isChecked = checked === true;
    const isIndeterminate = checked === "indeterminate";
    const dataState = isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setChecked(isIndeterminate ? true : !isChecked);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === " ") {
        e.preventDefault();
        setChecked(isIndeterminate ? true : !isChecked);
      }
      onKeyDown?.(e);
    };

    return (
      <>
        <button
          type="button"
          role="checkbox"
          aria-checked={isIndeterminate ? "mixed" : isChecked}
          data-state={dataState}
          disabled={disabled}
          data-disabled={disabled ? "" : undefined}
          ref={ref}
          className={cn(root(), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {(isChecked || isIndeterminate) && (
            <span
              data-state={dataState}
              className={cn("flex items-center justify-center text-current", indicator())}
            >
              {isIndeterminate ? (
                <Minus className="h-3 w-3 stroke-[3]" />
              ) : (
                <Check className="h-3 w-3 stroke-[3]" />
              )}
            </span>
          )}
        </button>
        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={isChecked}
            required={required}
            disabled={disabled}
            style={{
              transform: "translateX(-100%)",
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
              margin: 0,
              width: 0,
              height: 0,
            }}
            tabIndex={-1}
            readOnly
          />
        )}
      </>
    );
  }
);
Checkbox.displayName = "Checkbox";
