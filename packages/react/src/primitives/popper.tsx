import * as React from "react";
import { Portal } from "./portal";
import { useComposedRefs } from "./compose";
import { usePresence } from "./use-presence";
import { useFloatingPosition, type Align, type Side } from "./use-floating-position";

export interface PopperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  anchor: HTMLElement | null;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
  /** Keep mounted while closed (hidden). */
  forceMount?: boolean;
  /** Render into this element instead of document.body. */
  container?: HTMLElement | null;
}

/**
 * Portaled, positioned floating container shared by Popover, Tooltip, Select and DropdownMenu.
 * Handles exit animations and exposes `data-state`, `data-side` and `data-align`.
 */
export const PopperContent = React.forwardRef<HTMLDivElement, PopperContentProps>(
  (
    {
      open,
      anchor,
      side = "bottom",
      align = "center",
      sideOffset = 4,
      alignOffset = 0,
      collisionPadding = 8,
      forceMount,
      container,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const [floating, setFloating] = React.useState<HTMLDivElement | null>(null);
    const { present, ref: presenceRef } = usePresence(open);
    const ref = useComposedRefs<HTMLDivElement | null>(forwardedRef, setFloating, presenceRef);
    const { floatingStyles, side: actualSide } = useFloatingPosition({
      anchor,
      floating,
      open: present,
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
    });

    if (!present && !forceMount) return null;

    return (
      <Portal container={container}>
        <div
          ref={ref}
          data-cui-layer=""
          data-state={open ? "open" : "closed"}
          data-side={actualSide}
          data-align={align}
          hidden={!present}
          style={{ ...floatingStyles, zIndex: 50, ...style }}
          {...props}
        />
      </Portal>
    );
  }
);
PopperContent.displayName = "PopperContent";
