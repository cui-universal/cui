<script setup lang="ts">
import { tableFooterVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <tfoot :class="cn(tableFooterVariants(), props.class)">
    <slot />
  </tfoot>
</template>
