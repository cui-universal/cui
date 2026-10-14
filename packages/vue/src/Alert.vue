<script setup lang="ts">
import { computed } from "vue";
import { alertVariants, type AlertVariants, cn } from "@cui/theme";

interface Props {
  variant?: AlertVariants["variant"];
  class?: string;
}

const props = defineProps<Props>();

const classes = computed(() => {
  const { root } = alertVariants({ variant: props.variant });
  return cn(root(), props.class);
});
</script>

<template>
  <div role="alert" :class="classes">
    <slot />
  </div>
</template>
