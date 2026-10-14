<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  type?: "single" | "multiple";
  collapsible?: boolean;
  modelValue?: string | string[];
  defaultValue?: string | string[];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "single",
  collapsible: true,
  defaultValue: () => "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void;
}>();

const getInitialOpen = (): string[] => {
  const val = props.modelValue ?? props.defaultValue;
  if (Array.isArray(val)) return [...val];
  if (typeof val === "string" && val.length > 0) return [val];
  return [];
};

const openValues = ref<string[]>(getInitialOpen());

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) {
      openValues.value = Array.isArray(val) ? val : val ? [val] : [];
    }
  }
);

const isItemOpen = (val: string) => openValues.value.includes(val);

const toggleItem = (val: string) => {
  if (props.type === "multiple") {
    const next = openValues.value.includes(val)
      ? openValues.value.filter((v) => v !== val)
      : [...openValues.value, val];
    openValues.value = next;
    emit("update:modelValue", next);
  } else {
    const isCurrentlyOpen = openValues.value.includes(val);
    let next: string[];
    if (isCurrentlyOpen) {
      next = props.collapsible ? [] : [val];
    } else {
      next = [val];
    }
    openValues.value = next;
    emit("update:modelValue", next[0] ?? "");
  }
};

provide("cui-accordion", {
  isItemOpen,
  toggleItem,
});
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template>
