<script setup lang="ts">
import { computed } from "vue";
import { alertVariants, cn } from "@cui-universal/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { title } = alertVariants();
  return cn(title(), props.class);
});
</script>

<template>
  <h5 :class="classes">
    <slot />
  </h5>
</template>
