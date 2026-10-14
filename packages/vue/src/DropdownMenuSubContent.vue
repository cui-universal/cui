<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { dropdownMenuContentVariants, cn } from "@cui-universal/theme";
import { useFloating, useDismissable, type Side, type Align } from "./primitives";

interface Props {
  sideOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4,
});

const contentEl = ref<HTMLElement | null>(null);

const sub = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-sub", null);

const isOpen = computed(() => sub?.isOpen.value ?? false);
const triggerEl = computed(() => sub?.triggerEl.value ?? null);

const { floatingStyles, currentSide } = useFloating({
  anchor: triggerEl,
  floating: contentEl,
  open: isOpen,
  side: "right",
  align: "start",
  sideOffset: props.sideOffset,
});

useDismissable({
  enabled: isOpen,
  getElements: () => [contentEl.value, triggerEl.value],
  onDismiss: () => sub?.setOpen(false),
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
