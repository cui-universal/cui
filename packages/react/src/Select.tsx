import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  type SelectTriggerVariants,
  cn,
} from "@cui-universal/theme";
import {
  PopperContent,
  Slot,
  composeEventHandlers,
  useComposedRefs,
  useControllableState,
  useDismissableLayer,
  type Align,
  type Side,
} from "./primitives";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  trigger: HTMLElement | null;
  setTrigger: (el: HTMLElement | null) => void;
  contentId: string;
  registeredLabels: Map<string, React.ReactNode>;
  registerLabel: (value: string, label: React.ReactNode) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);
  const contentId = React.useId();
  const [, setTick] = React.useState(0);
  const registeredLabels = React.useRef(new Map<string, React.ReactNode>()).current;

  const registerLabel = React.useCallback(
    (val: string, label: React.ReactNode) => {
      if (registeredLabels.get(val) !== label) {
        registeredLabels.set(val, label);
        setTick((t) => t + 1);
      }
    },
    [registeredLabels]
  );

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: setValue,
        open: Boolean(open),
        setOpen,
        trigger,
        setTrigger,
        contentId,
        registeredLabels,
        registerLabel,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};
Select.displayName = "Select";

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SelectTriggerVariants {
  asChild?: boolean;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, size, variant, asChild, onClick, ...props }, forwardedRef) => {
    const ctx = React.useContext(SelectContext);
    const ref = useComposedRefs(forwardedRef, ctx?.setTrigger as any);
    const Comp: React.ElementType = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        role="combobox"
        aria-expanded={ctx?.open}
        aria-controls={ctx?.open ? ctx.contentId : undefined}
        data-state={ctx?.open ? "open" : "closed"}
        className={cn(selectTriggerVariants({ size, variant }), className)}
        onClick={composeEventHandlers(onClick, () => ctx?.setOpen((prev) => !prev))}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
      </Comp>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

export const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    const label = (ctx?.value ? ctx.registeredLabels.get(ctx.value) : undefined) ?? children;
    const hasValue = label !== undefined && label !== null && label !== "";

    return (
      <span
        ref={ref}
        className={cn("block truncate", !hasValue && "text-muted-foreground", className)}
        {...props}
      >
        {hasValue ? label : placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "item-aligned" | "popper";
  sideOffset?: number;
  side?: Side;
  align?: Align;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  (
    {
      className,
      children,
      position = "popper",
      side = "bottom",
      align = "start",
      sideOffset = 4,
      ...props
    },
    forwardedRef
  ) => {
    const ctx = React.useContext(SelectContext);
    const [node, setNode] = React.useState<HTMLDivElement | null>(null);
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, setNode);

    useDismissableLayer({
      enabled: Boolean(ctx?.open),
      getElements: () => [node, ctx?.trigger ?? null],
      onDismiss: () => ctx?.setOpen(false),
    });

    if (!ctx) return null;

    return (
      <PopperContent
        ref={ref}
        id={ctx.contentId}
        role="listbox"
        tabIndex={-1}
        open={ctx.open}
        anchor={ctx.trigger}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(selectContentVariants(), "max-h-96 min-w-[8rem] overflow-y-auto p-1", className)}
        {...props}
      >
        {children}
      </PopperContent>
    );
  }
);
SelectContent.displayName = "SelectContent";

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled = false, onClick, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    const isSelected = ctx?.value === value;

    React.useEffect(() => {
      if (typeof children === "string" || typeof children === "number") {
        ctx?.registerLabel(value, children);
      }
    }, [ctx, value, children]);

    const handleClick = composeEventHandlers(onClick, () => {
      if (disabled) return;
      ctx?.onValueChange?.(value);
      ctx?.setOpen(false);
    });

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        className={cn(selectItemVariants(), disabled && "pointer-events-none opacity-50", className)}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        <span className="truncate">{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("w-full", className)} {...props} />
  )
);
SelectGroup.displayName = "SelectGroup";

export const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(selectLabelVariants(), className)} {...props} />
  )
);
SelectLabel.displayName = "SelectLabel";

export const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(selectSeparatorVariants(), className)} {...props} />
  )
);
SelectSeparator.displayName = "SelectSeparator";
