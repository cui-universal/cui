<script setup lang="ts">
import { computed, inject } from "vue";
import { tabsVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
  loop?: boolean;
}

const props = defineProps<Props>();

const tabs = inject<{ orientation: "horizontal" | "vertical" } | null>("cui-tabs", null);

const classes = computed(() => {
  const { list } = tabsVariants();
  return cn(list(), props.class);
});
</script>

<template>
  <div
    role="tablist"
    :aria-orientation="tabs?.orientation ?? 'horizontal'"
    :class="classes"
  >
    <slot />
  </div>
</template>
