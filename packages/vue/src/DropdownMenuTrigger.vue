<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import { Primitive, resolveElement } from "./primitives";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const el = ref<any>(null);

const menu = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  toggleOpen: () => void;
} | null>("cui-dropdown-menu", null);

onMounted(() => {
  if (menu && el.value) {
    menu.triggerEl.value = resolveElement(el.value);
  }
});

const handleClick = (e: MouseEvent) => {
  if (menu) {
    if (!menu.triggerEl.value) {
      menu.triggerEl.value = (e.currentTarget as HTMLElement) || resolveElement(el.value);
    }
    menu.toggleOpen();
  }
};
</script>

<template>
  <Primitive
    ref="el"
    :as="asChild ? undefined : 'button'"
    :as-child="asChild"
    :type="asChild ? undefined : 'button'"
    aria-haspopup="menu"
    :aria-expanded="menu?.isOpen.value"
    :data-state="menu?.isOpen.value ? 'open' : 'closed'"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
