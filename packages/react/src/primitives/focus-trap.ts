import * as React from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable=true]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0
  );
}

/**
 * Traps Tab focus inside `container` while active, moves focus in on activation
 * and restores it to the previously focused element on deactivation.
 */
export function useFocusTrap(container: HTMLElement | null, active = true) {
  React.useEffect(() => {
    if (!active || !container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (!container.contains(document.activeElement)) {
      const autofocus = container.querySelector<HTMLElement>("[autofocus]");
      const first = autofocus ?? getFocusable(container)[0];
      (first ?? container).focus({ preventScroll: true });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && (activeEl === first || activeEl === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Pull focus back if it escapes (e.g. click on the overlay).
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as Node | null;
      if (target && !container.contains(target) && !(target as Element).closest?.("[data-cui-layer]")) {
        (getFocusable(container)[0] ?? container).focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, container]);
}
