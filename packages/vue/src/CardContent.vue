<script setup lang="ts">
import { computed } from "vue";
import { cardVariants, cn } from "@cui-universal/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { content } = cardVariants();
  return cn(content(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
