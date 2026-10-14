<script setup lang="ts">
import { computed } from "vue";
import { cardVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { header } = cardVariants();
  return cn(header(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
