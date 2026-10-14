<script setup lang="ts">
import { computed } from "vue";
import { cardVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { title } = cardVariants();
  return cn(title(), props.class);
});
</script>

<template>
  <h3 :class="classes">
    <slot />
  </h3>
</template>
