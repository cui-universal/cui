<script setup lang="ts">
import { computed } from "vue";
import { dialogVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() => {
  const { description } = dialogVariants();
  return cn(description(), props.class);
});
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>
