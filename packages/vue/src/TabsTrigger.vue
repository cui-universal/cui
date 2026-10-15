<script setup lang="ts">
import { computed, inject, unref, type Ref, type ComputedRef } from "vue";
import { tabsVariants, type TabsVariants, cn } from "@cui-universal/theme";

interface Props {
  value: string;
  disabled?: boolean;
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const tabs = inject<{
  activeTab: Ref<string>;
  setActiveTab: (val: string) => void;
  size?: ComputedRef<TabsVariants["size"]>;
  radius?: ComputedRef<TabsVariants["radius"]>;
} | null>("cui-tabs", null);

const tabsList = inject<{
  size?: ComputedRef<TabsVariants["size"]>;
  radius?: ComputedRef<TabsVariants["radius"]>;
} | null>("cui-tabs-list", null);

const isActive = computed(() => tabs?.activeTab.value === props.value);

const classes = computed(() => {
  const resolvedSize = props.size ?? unref(tabsList?.size) ?? unref(tabs?.size);
  const resolvedRadius = props.radius ?? unref(tabsList?.radius) ?? unref(tabs?.radius);
  const { trigger } = tabsVariants({
    size: resolvedSize,
    radius: resolvedRadius,
  });
  return cn(trigger(), props.class);
});

const handleClick = () => {
  if (props.disabled) return;
  tabs?.setActiveTab(props.value);
};
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="isActive"
    :data-state="isActive ? 'active' : 'inactive'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
