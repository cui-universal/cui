<script setup lang="ts">
import { inject } from "vue";
import { Primitive } from "./primitives";

interface Props {
  asChild?: boolean;
}

defineProps<Props>();

const dialog = inject<{
  setOpen: (val: boolean) => void;
} | null>("cui-dialog", null);

const handleClick = () => {
  dialog?.setOpen(false);
};
</script>

<template>
  <Primitive
    :as="asChild ? undefined : 'button'"
    :as-child="asChild"
    :type="asChild ? undefined : 'button'"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
