import * as React from "react";
import { switchVariants, type SwitchVariants, cn } from "@cui-universal/theme";
import { useControllableState } from "./primitives";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    SwitchVariants {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size = "sm",
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
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    const { root, thumb } = switchVariants({ size });
    const isChecked = Boolean(checked);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      setChecked(!isChecked);
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setChecked(!isChecked);
      }
      onKeyDown?.(e);
    };

    return (
      <>
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          data-state={isChecked ? "checked" : "unchecked"}
          disabled={disabled}
          data-disabled={disabled ? "" : undefined}
          ref={ref}
          className={cn(root(), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <span
            data-state={isChecked ? "checked" : "unchecked"}
            data-disabled={disabled ? "" : undefined}
            className={cn(thumb())}
          />
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
Switch.displayName = "Switch";
