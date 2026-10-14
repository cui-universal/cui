<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const el = ref<HTMLElement | null>(null);

const popover = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  toggleOpen: () => void;
} | null>("cui-popover", null);

onMounted(() => {
  if (popover && el.value) {
    popover.triggerEl.value = el.value;
  }
});

const handleClick = () => {
  popover?.toggleOpen();
};
</script>

<template>
  <button
    ref="el"
    type="button"
    :aria-expanded="popover?.isOpen.value"
    :data-state="popover?.isOpen.value ? 'open' : 'closed'"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
