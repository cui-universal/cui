<script setup lang="ts">
import { computed, provide, inject } from "vue";
import { accordionVariants, cn } from "@cui-universal/theme";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const accordion = inject<{
  isItemOpen: (val: string) => boolean;
  toggleItem: (val: string) => void;
} | null>("cui-accordion", null);

const isOpen = computed(() => accordion?.isItemOpen(props.value) ?? false);

provide("cui-accordion-item", {
  value: props.value,
  disabled: props.disabled,
  isOpen,
  toggle: () => {
    if (!props.disabled) accordion?.toggleItem(props.value);
  },
});

const classes = computed(() => {
  const { item } = accordionVariants();
  return cn(item(), props.class);
});
</script>

<template>
  <div
    :data-state="isOpen ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :class="classes"
  >
    <slot />
  </div>
</template>
