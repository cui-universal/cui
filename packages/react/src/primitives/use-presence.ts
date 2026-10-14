import * as React from "react";

/**
 * Keeps an element mounted while its `data-state="closed"` exit animation runs.
 * Returns `present` (render or not) and a callback ref for the animated node.
 */
export function usePresence(open: boolean) {
  const [present, setPresent] = React.useState(open);
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (open) {
      setPresent(true);
      return;
    }
    if (!node) {
      setPresent(false);
      return;
    }
    const style = getComputedStyle(node);
    const duration = parseFloat(style.animationDuration) || 0;
    if (style.animationName === "none" || duration === 0) {
      setPresent(false);
      return;
    }
    const done = (event: AnimationEvent) => {
      if (event.target === node) setPresent(false);
    };
    node.addEventListener("animationend", done);
    node.addEventListener("animationcancel", done);
    // Fallback in case animationend never fires (e.g. element hidden).
    const timer = window.setTimeout(() => setPresent(false), duration * 1000 + 100);
    return () => {
      node.removeEventListener("animationend", done);
      node.removeEventListener("animationcancel", done);
      window.clearTimeout(timer);
    };
  }, [open, node]);

  return { present: open || present, ref: setNode };
}
