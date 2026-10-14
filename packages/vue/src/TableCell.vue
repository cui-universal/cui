<script setup lang="ts">
import { tableCellVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <td :class="cn(tableCellVariants(), props.class)">
    <slot />
  </td>
</template>
