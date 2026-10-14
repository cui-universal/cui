import * as React from "react";
import * as ReactDOM from "react-dom";

export interface PortalProps {
  children?: React.ReactNode;
  /** Defaults to document.body. */
  container?: HTMLElement | null;
}

/** Renders children into `container` (or document.body) after mount, so it is SSR-safe. */
export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const target = container ?? document.body;
  return ReactDOM.createPortal(children, target);
};
