<script setup lang="ts">
import { tableHeaderVariants, cn } from "@cui/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <thead :class="cn(tableHeaderVariants(), props.class)">
    <slot />
  </thead>
</template>
