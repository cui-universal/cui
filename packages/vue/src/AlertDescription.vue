<script setup lang="ts">
import { computed } from "vue";
import { alertVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { description } = alertVariants();
  return cn(description(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
