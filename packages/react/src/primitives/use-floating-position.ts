import * as React from "react";

export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

export interface FloatingPositionOptions {
  anchor: HTMLElement | null;
  floating: HTMLElement | null;
  open: boolean;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  /** Padding kept between the floating element and the viewport edge. */
  collisionPadding?: number;
}

const OPPOSITE: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };

/**
 * Positions a `position: fixed` floating element next to an anchor.
 * Flips to the opposite side when there is no room and shifts to stay inside the viewport.
 * Takes elements (not refs) so it re-runs when a portal mounts the floating node.
 */
export function useFloatingPosition({
  anchor,
  floating,
  open,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  collisionPadding = 8,
}: FloatingPositionOptions) {
  const [state, setState] = React.useState({ x: 0, y: 0, side, anchorWidth: 0, anchorHeight: 0 });

  const update = React.useCallback(() => {
    if (!open || !anchor || !floating) return;

    const a = anchor.getBoundingClientRect();
    // offsetWidth/Height ignore transforms from enter animations.
    const w = floating.offsetWidth;
    const h = floating.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = collisionPadding;

    const fits = (s: Side) => {
      switch (s) {
        case "bottom": return a.bottom + sideOffset + h <= vh - pad;
        case "top": return a.top - sideOffset - h >= pad;
        case "right": return a.right + sideOffset + w <= vw - pad;
        case "left": return a.left - sideOffset - w >= pad;
      }
    };

    let actual: Side = side;
    if (!fits(side) && fits(OPPOSITE[side])) actual = OPPOSITE[side];

    let x: number;
    let y: number;
    if (actual === "top" || actual === "bottom") {
      y = actual === "bottom" ? a.bottom + sideOffset : a.top - h - sideOffset;
      x = align === "start" ? a.left + alignOffset
        : align === "end" ? a.right - w - alignOffset
        : a.left + (a.width - w) / 2 + alignOffset;
      x = Math.max(pad, Math.min(x, vw - w - pad));
    } else {
      x = actual === "right" ? a.right + sideOffset : a.left - w - sideOffset;
      y = align === "start" ? a.top + alignOffset
        : align === "end" ? a.bottom - h - alignOffset
        : a.top + (a.height - h) / 2 + alignOffset;
      y = Math.max(pad, Math.min(y, vh - h - pad));
    }

    setState((prev) =>
      prev.x === x && prev.y === y && prev.side === actual &&
      prev.anchorWidth === a.width && prev.anchorHeight === a.height
        ? prev
        : { x, y, side: actual, anchorWidth: a.width, anchorHeight: a.height }
    );
  }, [open, anchor, floating, side, align, sideOffset, alignOffset, collisionPadding]);

  React.useLayoutEffect(() => {
    if (!open || !anchor || !floating) return;
    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(floating);
    observer?.observe(anchor);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      observer?.disconnect();
    };
  }, [open, anchor, floating, update]);

  return {
    floatingStyles: {
      position: "fixed" as const,
      left: 0,
      top: 0,
      transform: undefined,
      translate: `${Math.round(state.x)}px ${Math.round(state.y)}px`,
      "--cui-anchor-width": `${state.anchorWidth}px`,
      "--cui-anchor-height": `${state.anchorHeight}px`,
    } as React.CSSProperties,
    side: state.side,
    update,
  };
}
