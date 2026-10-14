import { ref, watch, onMounted, onUnmounted, type Ref, type CSSProperties } from "vue";

export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

export interface UseFloatingOptions {
  anchor: Ref<HTMLElement | null | undefined>;
  floating: Ref<HTMLElement | null | undefined>;
  open: Ref<boolean>;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
}

const OPPOSITE: Record<Side, Side> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export interface UseFloatingReturn {
  floatingStyles: Ref<Record<string, any>>;
  currentSide: Ref<Side>;
  update: () => void;
}

export function resolveElement(target: any): HTMLElement | null {
  if (!target) return null;
  if (typeof HTMLElement !== "undefined" && target instanceof HTMLElement) return target;
  if (target.$el) return resolveElement(target.$el);
  return null;
}

export function useFloating(options: UseFloatingOptions): UseFloatingReturn {
  const {
    anchor,
    floating,
    open,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
    collisionPadding = 8,
  } = options;

  const isPositioned = ref(false);

  const floatingStyles = ref<CSSProperties>({
    position: "fixed",
    left: "0px",
    top: "0px",
    zIndex: 50,
    visibility: "hidden",
  });
  const currentSide = ref<Side>(side);

  const update = () => {
    if (!open.value || !anchor.value || !floating.value) return;

    const anchorEl = resolveElement(anchor.value);
    const floatingEl = resolveElement(floating.value);
    if (!anchorEl || !floatingEl || typeof anchorEl.getBoundingClientRect !== "function") return;

    const a = anchorEl.getBoundingClientRect();
    const w = floatingEl.offsetWidth || floatingEl.getBoundingClientRect?.().width || 0;
    const h = floatingEl.offsetHeight || floatingEl.getBoundingClientRect?.().height || 0;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = collisionPadding;

    const fits = (s: Side) => {
      switch (s) {
        case "bottom": return a.bottom + sideOffset + h <= vh - pad;
        case "top": return a.top - sideOffset - h >= pad;
        case "right": return a.right + sideOffset + w <= vw - pad;
        case "left": return a.left - sideOffset - w >= pad;
      }
    };

    let actual: Side = side;
    if (!fits(side) && fits(OPPOSITE[side])) actual = OPPOSITE[side];
    currentSide.value = actual;

    let x: number;
    let y: number;
    if (actual === "top" || actual === "bottom") {
      y = actual === "bottom" ? a.bottom + sideOffset : a.top - h - sideOffset;
      x = align === "start" ? a.left + alignOffset
        : align === "end" ? a.right - w - alignOffset
        : a.left + (a.width - w) / 2 + alignOffset;
      x = Math.max(pad, Math.min(x, vw - w - pad));
    } else {
      x = actual === "right" ? a.right + sideOffset : a.left - w - sideOffset;
      y = align === "start" ? a.top + alignOffset
        : align === "end" ? a.bottom - h - alignOffset
        : a.top + (a.height - h) / 2 + alignOffset;
      y = Math.max(pad, Math.min(y, vh - h - pad));
    }

    floatingStyles.value = {
      position: "fixed",
      left: `${Math.round(x)}px`,
      top: `${Math.round(y)}px`,
      zIndex: 50,
      visibility: "visible",
    };
    isPositioned.value = true;
  };

  watch(
    [open, anchor, floating],
    () => {
      if (open.value) {
        update();
        if (typeof requestAnimationFrame !== "undefined") {
          requestAnimationFrame(update);
        }
      } else {
        isPositioned.value = false;
        floatingStyles.value = {
          position: "fixed",
          left: "0px",
          top: "0px",
          zIndex: 50,
          visibility: "hidden",
        };
      }
    },
    { flush: "post" }
  );

  onMounted(() => {
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
    window.removeEventListener("scroll", update, true);
  });

  return {
    floatingStyles,
    currentSide,
    update,
  };
}
