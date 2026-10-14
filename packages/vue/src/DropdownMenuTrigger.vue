<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import { Primitive } from "./primitives";

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
    menu.triggerEl.value = el.value?.$el ?? el.value;
  }
});

const handleClick = () => {
  menu?.toggleOpen();
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
