<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { tabsVariants, cn } from "@cui-universal/theme";

interface Props {
  value: string;
  class?: string;
}

const props = defineProps<Props>();

const tabs = inject<{
  activeTab: Ref<string>;
} | null>("cui-tabs", null);

const isActive = computed(() => tabs?.activeTab.value === props.value);

const classes = computed(() => {
  const { content } = tabsVariants();
  return cn(content(), props.class);
});
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :data-state="isActive ? 'active' : 'inactive'"
    tabindex="0"
    :class="classes"
  >
    <slot />
  </div>
</template>
