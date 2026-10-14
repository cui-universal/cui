<script setup lang="ts">
interface Props {
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}
defineProps<Props>();
</script>

<template>
  <slot />
</template>
