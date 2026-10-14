import { onMounted, onUnmounted, type Ref } from "vue";
import { resolveElement } from "./useFloating";

export interface UseDismissableOptions {
  enabled?: Ref<boolean> | boolean;
  getElements?: () => (HTMLElement | null | undefined)[];
  onDismiss?: () => void;
  escapeKey?: boolean;
}

export function useDismissable(options: UseDismissableOptions) {
  const isEnabled = () => {
    if (typeof options.enabled === "boolean") return options.enabled;
    return options.enabled ? options.enabled.value : true;
  };

  const onPointerDown = (event: PointerEvent | MouseEvent) => {
    if (!isEnabled()) return;
    const target = event.target as Node | null;
    if (!target) return;

    const elements = options.getElements?.() ?? [];
    for (const rawEl of elements) {
      const el = resolveElement(rawEl);
      if (el && typeof el.contains === "function" && el.contains(target)) {
        return;
      }
    }
    options.onDismiss?.();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isEnabled()) return;
    if (options.escapeKey !== false && event.key === "Escape") {
      options.onDismiss?.();
    }
  };

  onMounted(() => {
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
  });

  onUnmounted(() => {
    document.removeEventListener("pointerdown", onPointerDown, true);
    document.removeEventListener("keydown", onKeyDown, true);
  });
}
