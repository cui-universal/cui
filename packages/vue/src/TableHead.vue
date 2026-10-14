<script setup lang="ts">
import { tableHeadVariants, cn } from "@cui/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <th :class="cn(tableHeadVariants(), props.class)">
    <slot />
  </th>
</template>
