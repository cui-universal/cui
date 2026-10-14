<script setup lang="ts">
import { breadcrumbSeparatorVariants, cn } from "@cui-universal/theme";
import { ChevronRight } from "lucide-vue-next";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="cn(breadcrumbSeparatorVariants(), props.class)">
    <slot>
      <ChevronRight class="h-3.5 w-3.5" />
    </slot>
  </li>
</template>
