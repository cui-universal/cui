<script setup lang="ts">
import { computed } from "vue";
import { dialogVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => {
  const { footer } = dialogVariants();
  return cn(footer(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
