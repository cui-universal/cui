<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
  orientation: "horizontal",
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
  orientation: props.orientation,
});
</script>

<template>
  <div :data-orientation="orientation" :class="props.class">
    <slot />
  </div>
</template>
