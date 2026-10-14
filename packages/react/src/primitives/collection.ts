import * as React from "react";

/** Returns enabled, focusable items inside `container` matching `selector`. */
export function getCollectionItems(container: HTMLElement | null, selector: string): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("data-disabled") && !(el as HTMLButtonElement).disabled
  );
}

export type NavigationKey = "next" | "prev" | "first" | "last";

/** Maps a keyboard event to a navigation intent for the given orientation. */
export function getNavigationIntent(
  event: React.KeyboardEvent,
  orientation: "horizontal" | "vertical" | "both" = "vertical",
  dir: "ltr" | "rtl" = "ltr"
): NavigationKey | null {
  const rtl = dir === "rtl";
  switch (event.key) {
    case "ArrowDown":
      return orientation !== "horizontal" ? "next" : null;
    case "ArrowUp":
      return orientation !== "horizontal" ? "prev" : null;
    case "ArrowRight":
      return orientation !== "vertical" ? (rtl ? "prev" : "next") : null;
    case "ArrowLeft":
      return orientation !== "vertical" ? (rtl ? "next" : "prev") : null;
    case "Home":
    case "PageUp":
      return "first";
    case "End":
    case "PageDown":
      return "last";
    default:
      return null;
  }
}

export function moveFocus(
  items: HTMLElement[],
  current: Element | null,
  intent: NavigationKey,
  loop = true
): HTMLElement | undefined {
  if (items.length === 0) return;
  const index = current ? items.indexOf(current as HTMLElement) : -1;
  let nextIndex: number;
  switch (intent) {
    case "first":
      nextIndex = 0;
      break;
    case "last":
      nextIndex = items.length - 1;
      break;
    case "next":
      nextIndex = index + 1;
      if (nextIndex >= items.length) nextIndex = loop ? 0 : items.length - 1;
      break;
    case "prev":
      nextIndex = index - 1;
      if (nextIndex < 0) nextIndex = loop ? items.length - 1 : 0;
      break;
  }
  const next = items[nextIndex];
  next?.focus({ preventScroll: false });
  return next;
}

/** Typeahead: typing characters focuses the next item whose text starts with the buffer. */
export function useTypeahead() {
  const buffer = React.useRef("");
  const timer = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  return React.useCallback((event: React.KeyboardEvent, items: HTMLElement[]) => {
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return false;
    if (event.key === " " && buffer.current === "") return false;

    buffer.current += event.key.toLowerCase();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => (buffer.current = ""), 600);

    const search = buffer.current;
    const current = document.activeElement as HTMLElement | null;
    const start = current ? items.indexOf(current) : -1;
    // Repeating the same character cycles through matches.
    const isRepeat = search.length > 1 && search.split("").every((c) => c === search[0]);
    const term = isRepeat ? search[0] : search;
    const from = Math.max(start, 0);
    // Single/repeated key: look after the current item. Longer words: the current item may still match.
    const candidates =
      isRepeat || search.length === 1
        ? [...items.slice(start + 1), ...items.slice(0, start + 1)]
        : [...items.slice(from), ...items.slice(0, from)];
    const match = candidates.find((el) =>
      (el.getAttribute("data-text-value") ?? el.textContent ?? "").trim().toLowerCase().startsWith(term)
    );
    if (match) {
      match.focus();
      return true;
    }
    return false;
  }, []);
}
