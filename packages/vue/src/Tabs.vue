<script setup lang="ts">
import { provide, ref, watch, computed } from "vue";
import type { TabsVariants } from "@cui-universal/theme";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  size?: TabsVariants["size"];
  radius?: TabsVariants["radius"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
  orientation: "horizontal",
  size: "sm",
  radius: "md",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const activeTab = ref(props.modelValue ?? props.defaultValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) activeTab.value = val;
  }
);

const setActiveTab = (val: string) => {
  activeTab.value = val;
  emit("update:modelValue", val);
};

provide("cui-tabs", {
  activeTab,
  setActiveTab,
  orientation: computed(() => props.orientation),
  size: computed(() => props.size),
  radius: computed(() => props.radius),
});
</script>

<template>
  <div :data-orientation="orientation" :class="props.class">
    <slot />
  </div>
</template>
