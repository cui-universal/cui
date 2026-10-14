import * as React from "react";
import { tooltipVariants, cn } from "@cui-universal/theme";
import {
  PopperContent,
  Slot,
  composeEventHandlers,
  useComposedRefs,
  useControllableState,
  type Align,
  type Side,
} from "./primitives";

interface TooltipProviderContextValue {
  delayDuration: number;
  skipDelayDuration: number;
  /** True shortly after a tooltip closed, so the next one opens instantly. */
  isWarm: () => boolean;
  markClosed: () => void;
}

const TooltipProviderContext = React.createContext<TooltipProviderContextValue>({
  delayDuration: 700,
  skipDelayDuration: 300,
  isWarm: () => false,
  markClosed: () => {},
});

export interface TooltipProviderProps {
  children?: React.ReactNode;
  /** Hover delay before a tooltip opens (ms). */
  delayDuration?: number;
  /** Window after closing a tooltip during which the next one opens without delay (ms). */
  skipDelayDuration?: number;
}

export const TooltipProvider = ({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
}: TooltipProviderProps) => {
  const lastClosed = React.useRef(0);
  const value = React.useMemo<TooltipProviderContextValue>(
    () => ({
      delayDuration,
      skipDelayDuration,
      isWarm: () => Date.now() - lastClosed.current < skipDelayDuration,
      markClosed: () => (lastClosed.current = Date.now()),
    }),
    [delayDuration, skipDelayDuration]
  );
  return <TooltipProviderContext.Provider value={value}>{children}</TooltipProviderContext.Provider>;
};
TooltipProvider.displayName = "TooltipProvider";

interface TooltipContextValue {
  open: boolean;
  contentId: string;
  trigger: HTMLElement | null;
  setTrigger: (el: HTMLElement | null) => void;
  openWithDelay: () => void;
  openNow: () => void;
  close: () => void;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext(component: string) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Tooltip>`);
  return ctx;
}

export interface TooltipProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export const Tooltip = ({ children, open: openProp, defaultOpen = false, onOpenChange, delayDuration }: TooltipProps) => {
  const provider = React.useContext(TooltipProviderContext);
  const [open, setOpen] = useControllableState({ prop: openProp, defaultProp: defaultOpen, onChange: onOpenChange });
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);
  const contentId = React.useId();
  const timer = React.useRef<number>();
  const delay = delayDuration ?? provider.delayDuration;

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const openNow = React.useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen(true);
  }, [setOpen]);

  const openWithDelay = React.useCallback(() => {
    window.clearTimeout(timer.current);
    if (provider.isWarm() || delay <= 0) setOpen(true);
    else timer.current = window.setTimeout(() => setOpen(true), delay);
  }, [delay, provider, setOpen]);

  const close = React.useCallback(() => {
    window.clearTimeout(timer.current);
    setOpen((wasOpen) => {
      if (wasOpen) provider.markClosed();
      return false;
    });
  }, [provider, setOpen]);

  // Escape closes; scrolling also closes (the trigger may move away).
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <TooltipContext.Provider value={{ open, contentId, trigger, setTrigger, openWithDelay, openNow, close }}>
      {children}
    </TooltipContext.Provider>
  );
};
Tooltip.displayName = "Tooltip";

export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ asChild, onPointerEnter, onPointerLeave, onPointerDown, onFocus, onBlur, onClick, ...props }, forwardedRef) => {
    const ctx = useTooltipContext("TooltipTrigger");
    const ref = useComposedRefs<HTMLButtonElement | null>(forwardedRef, ctx.setTrigger as any);
    const pointerDown = React.useRef(false);
    const Comp: React.ElementType = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        aria-describedby={ctx.open ? ctx.contentId : undefined}
        data-state={ctx.open ? "delayed-open" : "closed"}
        onPointerEnter={composeEventHandlers(onPointerEnter, (event: React.PointerEvent) => {
          if (event.pointerType !== "touch") ctx.openWithDelay();
        })}
        onPointerLeave={composeEventHandlers(onPointerLeave, () => ctx.close())}
        onPointerDown={composeEventHandlers(onPointerDown, () => {
          pointerDown.current = true;
          document.addEventListener("pointerup", () => (pointerDown.current = false), { once: true });
        })}
        onFocus={composeEventHandlers(onFocus, () => {
          // Don't open on the focus caused by clicking.
          if (!pointerDown.current) ctx.openNow();
        })}
        onBlur={composeEventHandlers(onBlur, () => ctx.close())}
        onClick={composeEventHandlers(onClick, () => ctx.close())}
        {...props}
      />
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  forceMount?: boolean;
}

export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", align = "center", sideOffset = 4, ...props }, ref) => {
    const ctx = useTooltipContext("TooltipContent");
    return (
      <PopperContent
        ref={ref}
        id={ctx.contentId}
        role="tooltip"
        open={ctx.open}
        anchor={ctx.trigger}
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(tooltipVariants(), "pointer-events-none", className)}
        {...props}
      />
    );
  }
);
TooltipContent.displayName = "TooltipContent";
