<script setup lang="ts">
import { kbdVariants, type KbdVariants, cn } from "@cui/theme";

interface Props {
  size?: KbdVariants["size"];
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <kbd :class="cn(kbdVariants({ size: props.size }), props.class)">
    <slot />
  </kbd>
</template>
