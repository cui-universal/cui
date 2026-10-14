<script setup lang="ts">
import { tableRowVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <tr :class="cn(tableRowVariants(), props.class)">
    <slot />
  </tr>
</template>
