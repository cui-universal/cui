<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { dropdownMenuContentVariants, cn } from "@cui-universal/theme";
import { useFloating, useDismissable, type Side, type Align } from "./primitives";

interface Props {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "start",
  sideOffset: 4,
});

const contentEl = ref<HTMLElement | null>(null);

const menu = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-menu", null);

const isOpen = computed(() => menu?.isOpen.value ?? false);
const triggerEl = computed(() => menu?.triggerEl.value ?? null);

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
  onDismiss: () => menu?.setOpen(false),
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentEl"
      role="menu"
      tabindex="-1"
      :data-state="isOpen ? 'open' : 'closed'"
      :data-side="currentSide"
      :style="floatingStyles"
      :class="cn(dropdownMenuContentVariants(), props.class)"
    >
      <slot />
    </div>
  </Teleport>
</template>
