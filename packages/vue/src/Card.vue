<script setup lang="ts">
import { computed } from "vue";
import { cardVariants, cn } from "@cui/theme";

interface Props {
  interactive?: boolean;
  class?: string;
}

const props = defineProps<Props>();

const classes = computed(() => {
  const { base } = cardVariants({ interactive: props.interactive });
  return cn(base(), props.class);
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
