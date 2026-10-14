import * as React from "react";
import { accordionVariants, cn } from "@cui-universal/theme";
import { ChevronDown } from "lucide-react";
import {
  composeEventHandlers,
  getCollectionItems,
  getNavigationIntent,
  moveFocus,
  useComposedRefs,
  useControllableState,
  usePresence,
} from "./primitives";

interface AccordionContextValue {
  baseId: string;
  openValues: string[];
  toggle: (value: string) => void;
  disabled: boolean;
  orientation: "horizontal" | "vertical";
  dir: "ltr" | "rtl";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItem(component: string) {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error(`<${component}> must be used within <AccordionItem>`);
  return ctx;
}

interface AccordionBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir"> {
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
}

export interface AccordionSingleProps extends AccordionBaseProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Allow closing the open item by clicking it again. */
  collapsible?: boolean;
}

export interface AccordionMultipleProps extends AccordionBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const baseId = React.useId();

  if (props.type === "multiple") {
    const { type: _type, value, defaultValue, onValueChange, ...rest } = props;
    return (
      <MultipleAccordion
        ref={ref}
        baseId={baseId}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        {...rest}
      />
    );
  }

  const { type: _type, value, defaultValue, onValueChange, collapsible = false, ...rest } = props;
  return (
    <SingleAccordion
      ref={ref}
      baseId={baseId}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      collapsible={collapsible}
      {...rest}
    />
  );
});
Accordion.displayName = "Accordion";

const SingleAccordion = React.forwardRef<
  HTMLDivElement,
  Omit<AccordionSingleProps, "type"> & { baseId: string }
>(({ baseId, value: valueProp, defaultValue, onValueChange, collapsible, ...rest }, ref) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? "",
    onChange: onValueChange,
  });
  const toggle = React.useCallback(
    (item: string) => setValue((prev) => (prev === item ? (collapsible ? "" : prev) : item)),
    [collapsible, setValue]
  );
  return <AccordionRoot ref={ref} baseId={baseId} openValues={value ? [value] : []} toggle={toggle} {...rest} />;
});

const MultipleAccordion = React.forwardRef<
  HTMLDivElement,
  Omit<AccordionMultipleProps, "type"> & { baseId: string }
>(({ baseId, value: valueProp, defaultValue, onValueChange, ...rest }, ref) => {
  const [value, setValue] = useControllableState<string[]>({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
  });
  const toggle = React.useCallback(
    (item: string) =>
      setValue((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item])),
    [setValue]
  );
  return <AccordionRoot ref={ref} baseId={baseId} openValues={value} toggle={toggle} {...rest} />;
});

const AccordionRoot = React.forwardRef<
  HTMLDivElement,
  AccordionBaseProps & { baseId: string; openValues: string[]; toggle: (value: string) => void }
>(({ baseId, openValues, toggle, disabled = false, orientation = "vertical", dir = "ltr", onKeyDown, ...rest }, ref) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.hasAttribute("data-cui-accordion-trigger")) return;
    const intent = getNavigationIntent(event, orientation, dir);
    if (!intent) return;
    event.preventDefault();
    // Only triggers that belong to this accordion (not nested ones).
    const triggers = getCollectionItems(event.currentTarget, "[data-cui-accordion-trigger]").filter(
      (el) => el.closest("[data-cui-accordion]") === event.currentTarget
    );
    moveFocus(triggers, target, intent, true);
  };

  return (
    <AccordionContext.Provider value={{ baseId, openValues, toggle, disabled, orientation, dir }}>
      <div
        ref={ref}
        data-cui-accordion=""
        data-orientation={orientation}
        dir={dir}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        {...rest}
      />
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled: disabledProp, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext);
    if (!ctx) throw new Error("<AccordionItem> must be used within <Accordion>");
    const { item } = accordionVariants();
    const open = ctx.openValues.includes(value);
    const disabled = ctx.disabled || !!disabledProp;
    const safe = value.replace(/\s+/g, "-");

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          open,
          disabled,
          triggerId: `${ctx.baseId}-trigger-${safe}`,
          contentId: `${ctx.baseId}-content-${safe}`,
        }}
      >
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          data-orientation={ctx.orientation}
          className={cn(item(), className)}
          {...props}
        />
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext)!;
  const itemCtx = useAccordionItem("AccordionTrigger");
  const { header, trigger, icon } = accordionVariants();
  const state = itemCtx.open ? "open" : "closed";

  return (
    <h3 className={cn(header())} data-state={state} data-orientation={ctx.orientation}>
      <button
        ref={ref}
        type="button"
        id={itemCtx.triggerId}
        aria-expanded={itemCtx.open}
        aria-controls={itemCtx.contentId}
        aria-disabled={itemCtx.disabled || undefined}
        data-cui-accordion-trigger=""
        data-state={state}
        data-disabled={itemCtx.disabled ? "" : undefined}
        data-orientation={ctx.orientation}
        disabled={itemCtx.disabled}
        className={cn(trigger(), className)}
        onClick={composeEventHandlers(onClick, () => ctx.toggle(itemCtx.value))}
        {...props}
      >
        {children}
        <ChevronDown className={cn(icon())} aria-hidden />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  forceMount?: boolean;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, style, forceMount, ...props }, ref) => {
    const itemCtx = useAccordionItem("AccordionContent");
    const { content, inner } = accordionVariants();
    const nodeRef = React.useRef<HTMLDivElement | null>(null);
    // Skip the open animation for items that start open.
    const isInitialRender = React.useRef(true);
    const [size, setSize] = React.useState<{ width: number; height: number }>();

    React.useEffect(() => {
      const frame = requestAnimationFrame(() => (isInitialRender.current = false));
      return () => cancelAnimationFrame(frame);
    }, []);

    // Runs before usePresence's effect so the exit animation sees the measured height.
    React.useLayoutEffect(() => {
      const node = nodeRef.current;
      if (!node) return;
      node.style.animationName = "none";
      const rect = { width: node.scrollWidth, height: node.scrollHeight };
      if (!isInitialRender.current) node.style.animationName = "";
      setSize((prev) => (prev && prev.height === rect.height && prev.width === rect.width ? prev : rect));
    }, [itemCtx.open]);

    const { present, ref: presenceRef } = usePresence(itemCtx.open);

    const setRefs = useComposedRefs<HTMLDivElement | null>(nodeRef, presenceRef, ref);

    const visible = present || forceMount;

    return (
      <div
        ref={setRefs}
        role="region"
        id={itemCtx.contentId}
        aria-labelledby={itemCtx.triggerId}
        data-state={itemCtx.open ? "open" : "closed"}
        data-disabled={itemCtx.disabled ? "" : undefined}
        hidden={!visible}
        className={cn(content(), className)}
        style={
          {
            "--cui-accordion-content-height": size ? `${size.height}px` : undefined,
            "--cui-accordion-content-width": size ? `${size.width}px` : undefined,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {visible && <div className={cn(inner())}>{children}</div>}
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
