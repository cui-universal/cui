<script setup lang="ts">
import { computed, inject, provide, unref, type ComputedRef } from "vue";
import { tabsVariants, type TabsVariants, cn } from "@cui-universal/theme";

interface Props {
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
  class?: string;
  loop?: boolean;
}

const props = defineProps<Props>();

const tabs = inject<{
  orientation?: ComputedRef<"horizontal" | "vertical">;
  size?: ComputedRef<TabsVariants["size"]>;
  radius?: ComputedRef<TabsVariants["radius"]>;
} | null>("cui-tabs", null);

const resolvedSize = computed(() => props.size ?? unref(tabs?.size));
const resolvedRadius = computed(() => props.radius ?? unref(tabs?.radius));

provide("cui-tabs-list", {
  size: resolvedSize,
  radius: resolvedRadius,
});

const classes = computed(() => {
  const { list } = tabsVariants({
    size: resolvedSize.value,
    radius: resolvedRadius.value,
  });
  return cn(list(), props.class);
});
</script>

<template>
  <div
    role="tablist"
    :aria-orientation="unref(tabs?.orientation) ?? 'horizontal'"
    :class="classes"
  >
    <slot />
  </div>
</template>
