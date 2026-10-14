import * as React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

export function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}

/** Chains event handlers; skips the internal handler if the user's handler calls preventDefault(). */
export function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  userHandler?: (event: E) => void,
  internalHandler?: (event: E) => void
) {
  return (event: E) => {
    userHandler?.(event);
    if (!event.defaultPrevented) internalHandler?.(event);
  };
}
