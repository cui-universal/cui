<script setup lang="ts">
import { computed } from "vue";
import { dialogVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => {
  const { title } = dialogVariants();
  return cn(title(), props.class);
});
</script>

<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>
