<script setup lang="ts">
import { computed } from "vue";
import { cardVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { description } = cardVariants();
  return cn(description(), props.class);
});
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>
