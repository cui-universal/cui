<script setup lang="ts">
import { computed } from "vue";
import { separatorVariants, type SeparatorVariants, cn } from "@cui/theme";

interface Props {
  orientation?: SeparatorVariants["orientation"];
  decorative?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
  decorative: true,
});

const classes = computed(() => {
  return cn(separatorVariants({ orientation: props.orientation }), props.class);
});
</script>

<template>
  <div
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
    :data-orientation="orientation"
    :class="classes"
  />
</template>
