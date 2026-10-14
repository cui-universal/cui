import * as React from "react";
import { Circle } from "lucide-react";
import { radioVariants, type RadioVariants, cn } from "@cui/theme";
import {
  composeEventHandlers,
  getCollectionItems,
  getNavigationIntent,
  moveFocus,
  useComposedRefs,
  useControllableState,
} from "./primitives";

interface RadioGroupContextValue {
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  required: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "dir"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  loop?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      name,
      disabled = false,
      required = false,
      orientation,
      dir = "ltr",
      loop = true,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const intent = getNavigationIntent(event, orientation ?? "both", dir);
      if (!intent || intent === "first" || intent === "last") return;
      event.preventDefault();
      const items = getCollectionItems(event.currentTarget, '[role="radio"]');
      const next = moveFocus(items, document.activeElement, intent, loop);
      // Arrow keys check the newly focused radio, like native radio groups.
      next?.click();
    };

    return (
      <RadioGroupContext.Provider value={{ name, value, onValueChange: setValue, disabled, required }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-required={required || undefined}
          aria-orientation={orientation}
          data-disabled={disabled ? "" : undefined}
          dir={dir}
          className={cn("grid gap-2", className)}
          onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value">,
    RadioVariants {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, variant, size, value, disabled: disabledProp, onClick, onKeyDown, ...props }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    if (!ctx) throw new Error("<RadioGroupItem> must be used within <RadioGroup>");

    const checked = ctx.value === value;
    const disabled = ctx.disabled || !!disabledProp;
    // Roving tabindex: the checked item (or the first item if none) is tabbable.
    const [isFirst, setIsFirst] = React.useState(false);
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const composedRef = useComposedRefs<HTMLButtonElement | null>(innerRef, ref);

    React.useLayoutEffect(() => {
      const group = innerRef.current?.closest('[role="radiogroup"]') as HTMLElement | null;
      const first = getCollectionItems(group, '[role="radio"]')[0];
      setIsFirst(first === innerRef.current);
    });

    const tabbable = checked || (!ctx.value && isFirst);

    return (
      <>
        <button
          ref={composedRef}
          type="button"
          role="radio"
          aria-checked={checked}
          data-state={checked ? "checked" : "unchecked"}
          data-disabled={disabled ? "" : undefined}
          disabled={disabled}
          value={value}
          tabIndex={tabbable ? 0 : -1}
          className={cn(radioVariants({ variant, size }), className)}
          onClick={composeEventHandlers(onClick, () => ctx.onValueChange(value))}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            // WAI-ARIA: Enter does not check radios.
            if (event.key === "Enter") event.preventDefault();
          })}
          {...props}
        >
          {checked && (
            <span data-state="checked" className="flex items-center justify-center">
              <Circle className="h-2 w-2 fill-current text-current" />
            </span>
          )}
        </button>
        {ctx.name && (
          <input
            type="radio"
            aria-hidden
            tabIndex={-1}
            name={ctx.name}
            value={value}
            checked={checked}
            required={ctx.required}
            disabled={disabled}
            readOnly
            style={{ position: "absolute", pointerEvents: "none", opacity: 0, margin: 0, width: 0, height: 0 }}
          />
        )}
      </>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
