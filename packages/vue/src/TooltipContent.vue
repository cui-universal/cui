<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { tooltipVariants, cn } from "@cui/theme";
import { useFloating, type Side, type Align } from "./primitives";

interface Props {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  side: "top",
  align: "center",
  sideOffset: 4,
});

const contentEl = ref<HTMLElement | null>(null);

const tooltip = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-tooltip", null);

const isOpen = computed(() => tooltip?.isOpen.value ?? false);
const triggerEl = computed(() => tooltip?.triggerEl.value ?? null);

const { floatingStyles, currentSide } = useFloating({
  anchor: triggerEl,
  floating: contentEl,
  open: isOpen,
  side: props.side,
  align: props.align,
  sideOffset: props.sideOffset,
});

const classes = computed(() => cn(tooltipVariants(), props.class));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="contentEl"
      role="tooltip"
      :data-state="isOpen ? 'open' : 'closed'"
      :data-side="currentSide"
      :style="floatingStyles"
      :class="classes"
    >
      <slot />
    </div>
  </Teleport>
</template>
