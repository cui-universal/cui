import * as React from "react";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";
import { inputNumberVariants, type InputNumberVariants, cn } from "@cui-universal/theme";

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "value" | "defaultValue" | "prefix">,
    InputNumberVariants {
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  controls?: boolean;
  controlsPosition?: "right" | "sides";
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      precision,
      controls = true,
      controlsPosition = "right",
      prefix,
      suffix,
      disabled = false,
      readOnly = false,
      variant = "default",
      size = "sm",
      placeholder,
      onKeyDown,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | null>(
      defaultValue !== undefined ? defaultValue : null
    );
    const currentValue = isControlled ? controlledValue : internalValue;

    // Display string during typing
    const [inputValue, setInputValue] = React.useState<string>(
      currentValue !== null && currentValue !== undefined ? String(currentValue) : ""
    );

    React.useEffect(() => {
      if (currentValue !== null && currentValue !== undefined) {
        setInputValue(String(currentValue));
      } else {
        setInputValue("");
      }
    }, [currentValue]);

    const roundToPrecision = React.useCallback(
      (val: number): number => {
        if (precision !== undefined && precision >= 0) {
          const factor = Math.pow(10, precision);
          return Math.round(val * factor) / factor;
        }
        // Avoid JS floating point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
        const stepPrecision = (String(step).split(".")[1] || "").length;
        if (stepPrecision > 0) {
          const factor = Math.pow(10, stepPrecision);
          return Math.round(val * factor) / factor;
        }
        return val;
      },
      [precision, step]
    );

    const clamp = React.useCallback(
      (val: number): number => {
        const clamped = Math.min(Math.max(val, min), max);
        return roundToPrecision(clamped);
      },
      [min, max, roundToPrecision]
    );

    const updateValue = React.useCallback(
      (newVal: number | null) => {
        const clampedVal = newVal !== null ? clamp(newVal) : null;
        if (!isControlled) {
          setInternalValue(clampedVal);
        }
        setInputValue(clampedVal !== null ? String(clampedVal) : "");
        onChange?.(clampedVal);
      },
      [clamp, isControlled, onChange]
    );

    const stepUp = React.useCallback(
      (multiplier = 1) => {
        if (disabled || readOnly) return;
        const base = currentValue ?? (min !== -Infinity ? min : 0);
        const next = base + step * multiplier;
        updateValue(next);
      },
      [currentValue, disabled, readOnly, min, step, updateValue]
    );

    const stepDown = React.useCallback(
      (multiplier = 1) => {
        if (disabled || readOnly) return;
        const base = currentValue ?? (min !== -Infinity ? min : 0);
        const next = base - step * multiplier;
        updateValue(next);
      },
      [currentValue, disabled, readOnly, min, step, updateValue]
    );

    // Continuous stepping on hold
    const intervalRef = React.useRef<number | null>(null);
    const timeoutRef = React.useRef<number | null>(null);

    const stopStepping = React.useCallback(() => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      timeoutRef.current = null;
      intervalRef.current = null;
    }, []);

    const startStepping = React.useCallback(
      (action: () => void) => {
        action();
        stopStepping();
        timeoutRef.current = window.setTimeout(() => {
          intervalRef.current = window.setInterval(action, 60);
        }, 350);
      },
      [stopStepping]
    );

    React.useEffect(() => {
      return () => stopStepping();
    }, [stopStepping]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      if (val === "" || val === "-") {
        if (!isControlled) setInternalValue(null);
        onChange?.(null);
        return;
      }

      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        if (!isControlled) setInternalValue(parsed);
        onChange?.(parsed);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (inputValue === "" || inputValue === "-") {
        updateValue(null);
      } else {
        const parsed = parseFloat(inputValue);
        if (isNaN(parsed)) {
          updateValue(null);
        } else {
          updateValue(parsed);
        }
      }
      onBlur?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        stepUp(e.shiftKey ? 10 : 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        stepDown(e.shiftKey ? 10 : 1);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        stepUp(10);
      } else if (e.key === "PageDown") {
        e.preventDefault();
        stepDown(10);
      } else if (e.key === "Home" && min !== -Infinity) {
        e.preventDefault();
        updateValue(min);
      } else if (e.key === "End" && max !== Infinity) {
        e.preventDefault();
        updateValue(max);
      } else if (e.key === "Enter") {
        handleBlur(e as any);
      }
      onKeyDown?.(e);
    };

    const slots = inputNumberVariants({
      variant,
      size,
      disabled,
    });

    const isMinReached = currentValue !== null && currentValue !== undefined && currentValue <= min;
    const isMaxReached = currentValue !== null && currentValue !== undefined && currentValue >= max;

    return (
      <div className={cn(slots.root(), className)}>
        {/* Left side button if controlsPosition="sides" */}
        {controls && controlsPosition === "sides" && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || readOnly || isMinReached}
            onPointerDown={() => startStepping(() => stepDown())}
            onPointerUp={stopStepping}
            onPointerLeave={stopStepping}
            className={cn(slots.stepperInlineBtn(), "border-r border-border")}
            aria-label="Decrease value"
          >
            <Minus className="h-3 w-3" />
          </button>
        )}

        {prefix && <span className={slots.prefix()}>{prefix}</span>}

        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-valuenow={currentValue ?? undefined}
          aria-valuemin={min !== -Infinity ? min : undefined}
          aria-valuemax={max !== Infinity ? max : undefined}
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={slots.input()}
          {...props}
        />

        {suffix && <span className={slots.suffix()}>{suffix}</span>}

        {/* Right side stacked buttons if controlsPosition="right" */}
        {controls && controlsPosition === "right" && (
          <div className={slots.stepperWrapper()}>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || readOnly || isMaxReached}
              onPointerDown={() => startStepping(() => stepUp())}
              onPointerUp={stopStepping}
              onPointerLeave={stopStepping}
              className={slots.stepperBtn()}
              aria-label="Increase value"
            >
              <ChevronUp className="h-3 w-3" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || readOnly || isMinReached}
              onPointerDown={() => startStepping(() => stepDown())}
              onPointerUp={stopStepping}
              onPointerLeave={stopStepping}
              className={slots.stepperBtn()}
              aria-label="Decrease value"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Right side button if controlsPosition="sides" */}
        {controls && controlsPosition === "sides" && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || readOnly || isMaxReached}
            onPointerDown={() => startStepping(() => stepUp())}
            onPointerUp={stopStepping}
            onPointerLeave={stopStepping}
            className={cn(slots.stepperInlineBtn(), "border-l border-border")}
            aria-label="Increase value"
          >
            <Plus className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

// Export convenient alias
export const NumberInput = InputNumber;
