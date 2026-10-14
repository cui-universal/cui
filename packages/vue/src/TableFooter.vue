<script setup lang="ts">
import { tableFooterVariants, cn } from "@cui/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <tfoot :class="cn(tableFooterVariants(), props.class)">
    <slot />
  </tfoot>
</template>
