import * as React from "react";

type Elements = () => (HTMLElement | null | undefined)[];

interface Layer {
  getElements: Elements;
  onDismiss: () => void;
}

/**
 * Global stack of open dismissable layers (dialogs, popovers, menus, selects).
 * - Escape closes only the top-most layer.
 * - A pointer-down outside closes every layer above the first one that contains the target,
 *   so a click inside a dialog closes a select opened from it, but not the dialog.
 */
const layers: Layer[] = [];
let listening = false;

const contains = (layer: Layer, target: Node) =>
  layer.getElements().some((el) => el && el.contains(target));

function onPointerDown(event: PointerEvent) {
  const target = event.target as Node | null;
  if (!target) return;
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i];
    if (contains(layer, target)) break;
    layer.onDismiss();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape" || layers.length === 0) return;
  event.preventDefault();
  layers[layers.length - 1].onDismiss();
}

function ensureListeners() {
  if (listening || typeof document === "undefined") return;
  document.addEventListener("pointerdown", onPointerDown, true);
  document.addEventListener("keydown", onKeyDown);
  listening = true;
}

function teardownListeners() {
  if (!listening || layers.length > 0) return;
  document.removeEventListener("pointerdown", onPointerDown, true);
  document.removeEventListener("keydown", onKeyDown);
  listening = false;
}

export function useDismissableLayer({
  enabled,
  getElements,
  onDismiss,
}: {
  enabled: boolean;
  getElements: Elements;
  onDismiss: () => void;
}) {
  const latest = React.useRef({ getElements, onDismiss });
  latest.current = { getElements, onDismiss };

  React.useEffect(() => {
    if (!enabled) return;
    const layer: Layer = {
      getElements: () => latest.current.getElements(),
      onDismiss: () => latest.current.onDismiss(),
    };
    layers.push(layer);
    ensureListeners();
    return () => {
      const index = layers.indexOf(layer);
      if (index !== -1) layers.splice(index, 1);
      teardownListeners();
    };
  }, [enabled]);
}
