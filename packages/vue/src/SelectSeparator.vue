<script setup lang="ts">
import { selectSeparatorVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(selectSeparatorVariants(), props.class)" />
</template>
