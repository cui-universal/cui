<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const el = ref<HTMLElement | null>(null);

const menu = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  toggleOpen: () => void;
} | null>("cui-dropdown-menu", null);

onMounted(() => {
  if (menu && el.value) {
    menu.triggerEl.value = el.value;
  }
});

const handleClick = () => {
  menu?.toggleOpen();
};
</script>

<template>
  <button
    ref="el"
    type="button"
    aria-haspopup="menu"
    :aria-expanded="menu?.isOpen.value"
    :data-state="menu?.isOpen.value ? 'open' : 'closed'"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
