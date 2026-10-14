import * as React from "react";
import { popoverVariants, type PopoverVariants, cn } from "@cui-universal/theme";
import {
  PopperContent,
  Slot,
  composeEventHandlers,
  getFocusable,
  useComposedRefs,
  useControllableState,
  useDismissableLayer,
  type Align,
  type Side,
} from "./primitives";

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  contentId: string;
  trigger: HTMLElement | null;
  setTrigger: (el: HTMLElement | null) => void;
  anchor: HTMLElement | null;
  setAnchor: (el: HTMLElement | null) => void;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Popover>`);
  return ctx;
}

export interface PopoverProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover = ({ children, open: openProp, defaultOpen = false, onOpenChange }: PopoverProps) => {
  const [open, setOpen] = useControllableState({ prop: openProp, defaultProp: defaultOpen, onChange: onOpenChange });
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const contentId = React.useId();

  return (
    <PopoverContext.Provider value={{ open, setOpen, contentId, trigger, setTrigger, anchor, setAnchor }}>
      {children}
    </PopoverContext.Provider>
  );
};
Popover.displayName = "Popover";

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, onClick, ...props }, forwardedRef) => {
    const ctx = usePopoverContext("PopoverTrigger");
    const ref = useComposedRefs<HTMLButtonElement | null>(forwardedRef, ctx.setTrigger as any);
    const Comp: React.ElementType = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        aria-haspopup="dialog"
        aria-expanded={ctx.open}
        aria-controls={ctx.open ? ctx.contentId : undefined}
        data-state={ctx.open ? "open" : "closed"}
        onClick={composeEventHandlers(onClick, () => ctx.setOpen((prev) => !prev))}
        {...props}
      />
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

/** Positions the popover against this element instead of the trigger. */
export const PopoverAnchor = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }>(
  ({ asChild, ...props }, forwardedRef) => {
    const ctx = usePopoverContext("PopoverAnchor");
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, ctx.setAnchor as any);
    const Comp: React.ElementType = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} />;
  }
);
PopoverAnchor.displayName = "PopoverAnchor";

export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const ctx = usePopoverContext("PopoverClose");
    const Comp: React.ElementType = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        onClick={composeEventHandlers(onClick, () => ctx.setOpen(false))}
        {...props}
      />
    );
  }
);
PopoverClose.displayName = "PopoverClose";

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement>, PopoverVariants {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  forceMount?: boolean;
  /** Called when focus moves into the content on open; preventDefault() to skip. */
  onOpenAutoFocus?: (event: Event) => void;
  /** Called when focus returns to the trigger on close; preventDefault() to skip. */
  onCloseAutoFocus?: (event: Event) => void;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { className, side = "bottom", align = "center", sideOffset = 4, onOpenAutoFocus, onCloseAutoFocus, ...props },
    forwardedRef
  ) => {
    const ctx = usePopoverContext("PopoverContent");
    const [node, setNode] = React.useState<HTMLDivElement | null>(null);
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, setNode);

    useDismissableLayer({
      enabled: ctx.open,
      getElements: () => [node, ctx.trigger],
      onDismiss: () => ctx.setOpen(false),
    });

    // Move focus into the popover on open and back to the trigger on close.
    React.useEffect(() => {
      if (!ctx.open || !node) return;
      const openEvent = new CustomEvent("cui.popover.openAutoFocus", { cancelable: true });
      onOpenAutoFocus?.(openEvent);
      if (!openEvent.defaultPrevented) {
        const frame = requestAnimationFrame(() => (getFocusable(node)[0] ?? node).focus({ preventScroll: true }));
        return () => cancelAnimationFrame(frame);
      }
    }, [ctx.open, node]);

    const wasOpen = React.useRef(false);
    React.useEffect(() => {
      if (ctx.open) {
        wasOpen.current = true;
        return;
      }
      if (!wasOpen.current) return;
      wasOpen.current = false;
      const closeEvent = new CustomEvent("cui.popover.closeAutoFocus", { cancelable: true });
      onCloseAutoFocus?.(closeEvent);
      const active = document.activeElement;
      // Only steal focus back if it was inside the popover (or nowhere).
      if (!closeEvent.defaultPrevented && (!active || active === document.body || node?.contains(active))) {
        ctx.trigger?.focus({ preventScroll: true });
      }
    }, [ctx.open]);

    return (
      <PopperContent
        ref={ref}
        id={ctx.contentId}
        role="dialog"
        tabIndex={-1}
        open={ctx.open}
        anchor={ctx.anchor ?? ctx.trigger}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverVariants(), className)}
        {...props}
      />
    );
  }
);
PopoverContent.displayName = "PopoverContent";
