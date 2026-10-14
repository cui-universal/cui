import * as React from "react";
import { composeRefs } from "./compose";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/** Merges its props onto its single child element (powers `asChild`). */
export const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (React.isValidElement(children)) {
    const childRef = (children as any).ref;
    return React.cloneElement<any>(children, {
      ...mergeProps(slotProps, children.props as Record<string, any>),
      ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
    });
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
Slot.displayName = "Slot";

function mergeProps(slotProps: Record<string, any>, childProps: Record<string, any>) {
  const overrideProps: Record<string, any> = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    if (/^on[A-Z]/.test(propName)) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: any[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    }
  }

  return { ...slotProps, ...overrideProps };
}
