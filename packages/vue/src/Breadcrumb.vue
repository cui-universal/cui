<script setup lang="ts">
import { breadcrumbVariants, cn } from "@cui-universal/theme";

interface Props {
  class?: string;
  separator?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <nav aria-label="breadcrumb" :class="cn(breadcrumbVariants(), props.class)">
    <ol class="flex flex-wrap items-center gap-1.5 break-words text-xs text-muted-foreground sm:gap-2">
      <slot />
    </ol>
  </nav>
</template>
