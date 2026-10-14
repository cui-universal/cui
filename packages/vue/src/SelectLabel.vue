<script setup lang="ts">
import { selectLabelVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(selectLabelVariants(), props.class)">
    <slot />
  </div>
</template>
