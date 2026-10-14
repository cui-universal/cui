<script setup lang="ts">
import { tableBodyVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <tbody :class="cn(tableBodyVariants(), props.class)">
    <slot />
  </tbody>
</template>
