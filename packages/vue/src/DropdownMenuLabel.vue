<script setup lang="ts">
import { dropdownMenuLabelVariants, cn } from "@cui-universal/theme";

interface Props {
  inset?: boolean;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(dropdownMenuLabelVariants({ inset: props.inset }), props.class)">
    <slot />
  </div>
</template>
