import * as React from "react";

/**
 * State that can be controlled (via `prop`) or uncontrolled (via `defaultProp`).
 * `onChange` fires whenever the value changes through the setter.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp: T;
  onChange?: (state: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolled;

  const valueRef = React.useRef(value);
  valueRef.current = value;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === "function" ? (next as (prev: T) => T)(valueRef.current) : next;
      if (Object.is(nextValue, valueRef.current)) return;
      valueRef.current = nextValue;
      if (!isControlled) setUncontrolled(nextValue);
      onChangeRef.current?.(nextValue);
    },
    [isControlled]
  );

  return [value, setValue];
}
