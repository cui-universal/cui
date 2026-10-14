<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  modelValue?: string;
  defaultValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selectedValue = ref(props.modelValue ?? props.defaultValue);

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) selectedValue.value = val;
  }
);

const selectValue = (val: string) => {
  selectedValue.value = val;
  emit("update:modelValue", val);
};

provide("cui-dropdown-radio-group", {
  selectedValue,
  selectValue,
});
</script>

<template>
  <div role="group">
    <slot />
  </div>
</template>
