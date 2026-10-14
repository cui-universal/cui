<script setup lang="ts">
import { cn } from "@cui-universal/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div role="group" :class="cn('w-full', props.class)">
    <slot />
  </div>
</template>
