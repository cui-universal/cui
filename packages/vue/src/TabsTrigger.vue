<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { tabsVariants, cn } from "@cui-universal/theme";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const tabs = inject<{
  activeTab: Ref<string>;
  setActiveTab: (val: string) => void;
} | null>("cui-tabs", null);

const isActive = computed(() => tabs?.activeTab.value === props.value);

const classes = computed(() => {
  const { trigger } = tabsVariants();
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
