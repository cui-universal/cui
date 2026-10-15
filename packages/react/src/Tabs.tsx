import * as React from "react";
import { tabsVariants, type TabsVariants, cn } from "@cui-universal/theme";
import {
  composeEventHandlers,
  getCollectionItems,
  getNavigationIntent,
  moveFocus,
  useControllableState,
} from "./primitives";

type Orientation = "horizontal" | "vertical";

interface TabsContextValue {
  baseId: string;
  value: string;
  onValueChange: (value: string) => void;
  orientation: Orientation;
  activationMode: "automatic" | "manual";
  dir: "ltr" | "rtl";
  size: TabsVariants["size"];
  radius: TabsVariants["radius"];
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Tabs>`);
  return ctx;
}

const makeTriggerId = (baseId: string, value: string) => `${baseId}-trigger-${value}`;
const makeContentId = (baseId: string, value: string) => `${baseId}-content-${value}`;

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir">, TabsVariants {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: Orientation;
  /** `automatic` selects on focus (arrow keys); `manual` requires Enter/Space. */
  activationMode?: "automatic" | "manual";
  dir?: "ltr" | "rtl";
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      activationMode = "automatic",
      dir = "ltr",
      size = "sm",
      radius = "md",
      ...props
    },
    ref
  ) => {
    const baseId = React.useId();
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
    });

    return (
      <TabsContext.Provider
        value={{ baseId, value, onValueChange: setValue, orientation, activationMode, dir, size, radius }}
      >
        <div ref={ref} dir={dir} data-orientation={orientation} {...props} />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

interface TabsListContextValue {
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
}

const TabsListContext = React.createContext<TabsListContextValue>({});

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wrap focus from last to first tab with the arrow keys. */
  loop?: boolean;
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, loop = true, size, radius, onKeyDown, ...props }, ref) => {
    const ctx = useTabsContext("TabsList");
    const resolvedSize = size ?? ctx.size;
    const resolvedRadius = radius ?? ctx.radius;
    const { list } = tabsVariants({ size: resolvedSize, radius: resolvedRadius });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const intent = getNavigationIntent(event, ctx.orientation, ctx.dir);
      if (!intent) return;
      event.preventDefault();
      const items = getCollectionItems(event.currentTarget, '[role="tab"]');
      moveFocus(items, document.activeElement, intent, loop);
    };

    return (
      <TabsListContext.Provider value={{ size: resolvedSize, radius: resolvedRadius }}>
        <div
          ref={ref}
          role="tablist"
          aria-orientation={ctx.orientation}
          data-orientation={ctx.orientation}
          className={cn(list(), className)}
          onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
          {...props}
        />
      </TabsListContext.Provider>
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, size, radius, disabled, onMouseDown, onKeyDown, onFocus, ...props }, ref) => {
    const ctx = useTabsContext("TabsTrigger");
    const listCtx = React.useContext(TabsListContext);
    const resolvedSize = size ?? listCtx.size ?? ctx.size;
    const resolvedRadius = radius ?? listCtx.radius ?? ctx.radius;
    const { trigger } = tabsVariants({ size: resolvedSize, radius: resolvedRadius });
    const selected = ctx.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={makeTriggerId(ctx.baseId, value)}
        aria-selected={selected}
        aria-controls={makeContentId(ctx.baseId, value)}
        data-state={selected ? "active" : "inactive"}
        data-orientation={ctx.orientation}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        tabIndex={selected ? 0 : -1}
        className={cn(trigger(), className)}
        onMouseDown={composeEventHandlers(onMouseDown, (event) => {
          // Only left click without ctrl selects (ctrl-click is context menu on mac).
          if (!disabled && event.button === 0 && !event.ctrlKey) ctx.onValueChange(value);
          else event.preventDefault();
        })}
        onClick={composeEventHandlers(props.onClick, (event) => {
          if (!disabled && event.button === 0 && !event.ctrlKey) ctx.onValueChange(value);
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            ctx.onValueChange(value);
          }
        })}
        onFocus={composeEventHandlers(onFocus, () => {
          if (!selected && !disabled && ctx.activationMode === "automatic") ctx.onValueChange(value);
        })}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel mounted while inactive (hidden). */
  forceMount?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount, children, ...props }, ref) => {
    const ctx = useTabsContext("TabsContent");
    const { content } = tabsVariants({ size: ctx.size });
    const selected = ctx.value === value;

    if (!selected && !forceMount) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={makeContentId(ctx.baseId, value)}
        aria-labelledby={makeTriggerId(ctx.baseId, value)}
        data-state={selected ? "active" : "inactive"}
        data-orientation={ctx.orientation}
        hidden={!selected}
        tabIndex={0}
        className={cn(content(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
