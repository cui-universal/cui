<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { selectContentVariants, cn } from "@cui/theme";
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

const select = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-select", null);

const isOpen = computed(() => select?.isOpen.value ?? false);
const triggerEl = computed(() => select?.triggerEl.value ?? null);

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
  onDismiss: () => select?.setOpen(false),
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentEl"
      role="listbox"
      tabindex="-1"
      :data-state="isOpen ? 'open' : 'closed'"
      :data-side="currentSide"
      :style="floatingStyles"
      :class="cn(selectContentVariants(), 'max-h-96 min-w-[8rem] overflow-y-auto p-1', props.class)"
    >
      <slot />
    </div>
  </Teleport>
</template>
