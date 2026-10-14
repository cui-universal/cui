<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: "",
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:open", value: boolean): void;
}>();

const selectedValue = ref(props.modelValue ?? props.defaultValue);
const isOpen = ref(props.open ?? props.defaultOpen);
const triggerEl = ref<HTMLElement | null>(null);
const registeredLabels = ref<Record<string, string>>({});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) selectedValue.value = val;
  }
);

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) isOpen.value = val;
  }
);

const selectValue = (val: string) => {
  selectedValue.value = val;
  emit("update:modelValue", val);
  setOpen(false);
};

const setOpen = (val: boolean) => {
  isOpen.value = val;
  emit("update:open", val);
};

const toggleOpen = () => {
  setOpen(!isOpen.value);
};

const registerLabel = (val: string, label: string) => {
  registeredLabels.value[val] = label;
};

provide("cui-select", {
  selectedValue,
  isOpen,
  triggerEl,
  registeredLabels,
  selectValue,
  setOpen,
  toggleOpen,
  registerLabel,
});
</script>

<template>
  <slot />
</template>
