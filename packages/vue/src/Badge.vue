<script setup lang="ts">
import { computed } from "vue";
import { badgeVariants, type BadgeVariants, cn } from "@cui/theme";

interface Props {
  variant?: BadgeVariants["variant"];
  size?: BadgeVariants["size"];
  class?: string;
}

const props = defineProps<Props>();

const classes = computed(() => {
  return cn(
    badgeVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  );
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
