<script setup lang="ts">
import { dropdownMenuShortcutVariants, cn } from "@cui-universal/theme";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <span :class="cn(dropdownMenuShortcutVariants(), props.class)">
    <slot />
  </span>
</template>
