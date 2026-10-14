import * as React from "react";

let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

/** Locks body scroll while `enabled`; supports nested locks. */
export function useScrollLock(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const body = document.body;
    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    }
    lockCount++;
    return () => {
      lockCount--;
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [enabled]);
}
