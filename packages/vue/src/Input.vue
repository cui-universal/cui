<script setup lang="ts">
import { computed } from "vue";
import { inputVariants, type InputVariants, cn } from "@cui-universal/theme";

interface Props {
  modelValue?: string | number;
  defaultValue?: string | number;
  variant?: InputVariants["variant"];
  size?: InputVariants["size"];
  class?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const classes = computed(() => {
  return cn(
    inputVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class
  );
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :type="type"
    :value="modelValue ?? defaultValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="classes"
    @input="onInput"
  />
</template>
