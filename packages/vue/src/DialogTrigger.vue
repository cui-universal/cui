<script setup lang="ts">
import { inject } from "vue";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const dialog = inject<{
  setOpen: (val: boolean) => void;
} | null>("cui-dialog", null);

const handleClick = () => {
  dialog?.setOpen(true);
};
</script>

<template>
  <button type="button" @click="handleClick">
    <slot />
  </button>
</template>
