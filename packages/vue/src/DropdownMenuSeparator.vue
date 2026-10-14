<script setup lang="ts">
import { dropdownMenuSeparatorVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(dropdownMenuSeparatorVariants(), props.class)" />
</template>
