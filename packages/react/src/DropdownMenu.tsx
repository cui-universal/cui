import * as React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuIndicatorItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuShortcutVariants,
  type DropdownMenuItemVariants,
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

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  trigger: HTMLElement | null;
  setTrigger: (el: HTMLElement | null) => void;
  contentId: string;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);
  const contentId = React.useId();

  return (
    <DropdownMenuContext.Provider
      value={{
        open: Boolean(open),
        setOpen,
        trigger,
        setTrigger,
        contentId,
      }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ asChild, onClick, ...props }, forwardedRef) => {
  const ctx = React.useContext(DropdownMenuContext);
  const ref = useComposedRefs(forwardedRef, ctx?.setTrigger as any);
  const Comp: React.ElementType = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      aria-haspopup="menu"
      aria-expanded={ctx?.open}
      aria-controls={ctx?.open ? ctx.contentId : undefined}
      data-state={ctx?.open ? "open" : "closed"}
      onClick={composeEventHandlers(onClick, (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ctx?.trigger && e.currentTarget) {
          ctx?.setTrigger(e.currentTarget);
        }
        ctx?.setOpen((prev) => !prev);
      })}
      {...props}
    />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} role="group" className={cn("w-full", className)} {...props} />
));
DropdownMenuGroup.displayName = "DropdownMenuGroup";

export const DropdownMenuPortal: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <>{children}</>;
DropdownMenuPortal.displayName = "DropdownMenuPortal";

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  side?: Side;
  align?: Align;
}

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  (
    { className, sideOffset = 4, side = "bottom", align = "start", ...props },
    forwardedRef
  ) => {
    const ctx = React.useContext(DropdownMenuContext);
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
        role="menu"
        tabIndex={-1}
        open={ctx.open}
        anchor={ctx.trigger}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(dropdownMenuContentVariants(), className)}
        {...props}
      />
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    DropdownMenuItemVariants {
  disabled?: boolean;
}

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(({ className, variant, inset, disabled = false, onClick, ...props }, ref) => {
  const ctx = React.useContext(DropdownMenuContext);

  const handleClick = composeEventHandlers(onClick, () => {
    if (disabled) return;
    ctx?.setOpen(false);
  });

  return (
    <div
      ref={ref}
      role="menuitem"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        dropdownMenuItemVariants({ variant, inset }),
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export interface DropdownMenuCheckboxItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemProps
>(
  (
    { className, children, checked = false, onCheckedChange, disabled = false, onClick, ...props },
    ref
  ) => {
    const ctx = React.useContext(DropdownMenuContext);

    const handleClick = composeEventHandlers(onClick, () => {
      if (disabled) return;
      onCheckedChange?.(!checked);
      ctx?.setOpen(false);
    });

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          dropdownMenuIndicatorItemVariants(),
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check className="h-3.5 w-3.5" />}
        </span>
        {children}
      </div>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface DropdownMenuRadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const DropdownMenuRadioGroup: React.FC<DropdownMenuRadioGroupProps> = ({
  value,
  onValueChange,
  children,
  ...props
}) => (
  <RadioGroupContext.Provider value={{ value, onValueChange }}>
    <div role="group" {...props}>
      {children}
    </div>
  </RadioGroupContext.Provider>
);
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export interface DropdownMenuRadioItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemProps
>(({ className, children, value, disabled = false, onClick, ...props }, ref) => {
  const radioCtx = React.useContext(RadioGroupContext);
  const menuCtx = React.useContext(DropdownMenuContext);
  const checked = radioCtx?.value === value;

  const handleClick = composeEventHandlers(onClick, () => {
    if (disabled) return;
    radioCtx?.onValueChange?.(value);
    menuCtx?.setOpen(false);
  });

  return (
    <div
      ref={ref}
      role="menuitemradio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        dropdownMenuIndicatorItemVariants(),
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </div>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(dropdownMenuLabelVariants({ inset }), className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(dropdownMenuSeparatorVariants(), className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn(dropdownMenuShortcutVariants(), className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

interface SubContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  trigger: HTMLElement | null;
  setTrigger: (el: HTMLElement | null) => void;
}
const SubContext = React.createContext<SubContextValue | null>(null);

export interface DropdownMenuSubProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const DropdownMenuSub: React.FC<DropdownMenuSubProps> = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);

  return (
    <SubContext.Provider
      value={{
        open: Boolean(open),
        setOpen,
        trigger,
        setTrigger,
      }}
    >
      {children}
    </SubContext.Provider>
  );
};
DropdownMenuSub.displayName = "DropdownMenuSub";

export interface DropdownMenuSubTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}

export const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ className, inset, children, ...props }, forwardedRef) => {
  const subCtx = React.useContext(SubContext);
  const ref = useComposedRefs(forwardedRef, subCtx?.setTrigger as any);

  return (
    <div
      ref={ref}
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={subCtx?.open}
      data-state={subCtx?.open ? "open" : "closed"}
      className={cn(
        dropdownMenuItemVariants({ inset }),
        "data-[state=open]:bg-accent cursor-pointer select-none",
        className
      )}
      onClick={() => subCtx?.setOpen((prev) => !prev)}
      onMouseEnter={() => subCtx?.setOpen(true)}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-3.5 w-3.5" />
    </div>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export interface DropdownMenuSubContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
}

export const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ className, sideOffset = 4, ...props }, forwardedRef) => {
  const subCtx = React.useContext(SubContext);
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, setNode);

  useDismissableLayer({
    enabled: Boolean(subCtx?.open),
    getElements: () => [node, subCtx?.trigger ?? null],
    onDismiss: () => subCtx?.setOpen(false),
  });

  if (!subCtx) return null;

  return (
    <PopperContent
      ref={ref}
      role="menu"
      tabIndex={-1}
      open={subCtx.open}
      anchor={subCtx.trigger}
      side="right"
      align="start"
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentVariants(), className)}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
