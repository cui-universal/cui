<script setup lang="ts">
import { tableVariants, cn } from "@cui-universal/theme";
const props = defineProps<{ class?: string }>();
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn(tableVariants(), props.class)">
      <slot />
    </table>
  </div>
</template>
