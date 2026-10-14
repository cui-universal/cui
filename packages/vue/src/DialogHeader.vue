<script setup lang="ts">
import { computed } from "vue";
import { dialogVariants, cn } from "@cui-universal/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { header } = dialogVariants();
  return cn(header(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
