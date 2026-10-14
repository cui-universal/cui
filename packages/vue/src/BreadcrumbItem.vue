<script setup lang="ts">
import { breadcrumbItemVariants, cn } from "@cui-universal/theme";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <li :class="cn(breadcrumbItemVariants(), props.class)">
    <slot />
  </li>
</template>
