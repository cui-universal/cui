<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import { Primitive, resolveElement } from "./primitives";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const el = ref<any>(null);

const popover = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  toggleOpen: () => void;
} | null>("cui-popover", null);

onMounted(() => {
  if (popover && el.value) {
    popover.triggerEl.value = resolveElement(el.value);
  }
});

const handleClick = (e: MouseEvent) => {
  if (popover) {
    if (!popover.triggerEl.value) {
      popover.triggerEl.value = (e.currentTarget as HTMLElement) || resolveElement(el.value);
    }
    popover.toggleOpen();
  }
};
</script>

<template>
  <Primitive
    ref="el"
    :as="asChild ? undefined : 'button'"
    :as-child="asChild"
    :type="asChild ? undefined : 'button'"
    :aria-expanded="popover?.isOpen.value"
    :data-state="popover?.isOpen.value ? 'open' : 'closed'"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
