<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { cn } from "@cui/theme";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const currentValue = ref(props.modelValue ?? props.defaultValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) currentValue.value = val;
  }
);

const selectValue = (val: string) => {
  if (props.disabled) return;
  currentValue.value = val;
  emit("update:modelValue", val);
};

provide("cui-radio-group", {
  currentValue,
  selectValue,
  disabled: props.disabled,
  name: props.name,
});
</script>

<template>
  <div role="radiogroup" :class="cn('grid gap-2', props.class)">
    <slot />
  </div>
</template>
