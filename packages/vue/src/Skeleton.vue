<script setup lang="ts">
import { computed } from "vue";
import { skeletonVariants, cn } from "@cui/theme";

const props = defineProps<{ class?: string }>();
const classes = computed(() => cn(skeletonVariants(), props.class));
</script>

<template>
  <div :class="classes" />
</template>
