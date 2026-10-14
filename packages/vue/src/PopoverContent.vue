<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { popoverVariants, cn } from "@cui-universal/theme";
import { useFloating, useDismissable, type Side, type Align } from "./primitives";

interface Props {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "center",
  sideOffset: 4,
});

const contentEl = ref<HTMLElement | null>(null);

const popover = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-popover", null);

const isOpen = computed(() => popover?.isOpen.value ?? false);
const triggerEl = computed(() => popover?.triggerEl.value ?? null);

const { floatingStyles, currentSide } = useFloating({
  anchor: triggerEl,
  floating: contentEl,
  open: isOpen,
  side: props.side,
  align: props.align,
  sideOffset: props.sideOffset,
});

useDismissable({
  enabled: isOpen,
  getElements: () => [contentEl.value, triggerEl.value],
  onDismiss: () => popover?.setOpen(false),
});

const classes = computed(() => cn(popoverVariants(), props.class));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentEl"
      role="dialog"
      :data-state="isOpen ? 'open' : 'closed'"
      :data-side="currentSide"
      :style="floatingStyles"
      :class="classes"
    >
      <slot />
    </div>
  </Teleport>
</template>
