<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const el = ref<HTMLElement | null>(null);

const tooltip = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-tooltip", null);

onMounted(() => {
  if (tooltip && el.value) {
    tooltip.triggerEl.value = el.value;
  }
});

const onMouseEnter = () => tooltip?.setOpen(true);
const onMouseLeave = () => tooltip?.setOpen(false);
const onFocus = () => tooltip?.setOpen(true);
const onBlur = () => tooltip?.setOpen(false);
</script>

<template>
  <span
    ref="el"
    tabindex="0"
    class="inline-flex"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </span>
</template>
