<script setup lang="ts">
import { tableCaptionVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <caption :class="cn(tableCaptionVariants(), props.class)">
    <slot />
  </caption>
</template>
