<script setup lang="ts">
import { computed } from "vue";
import { textareaVariants, type TextareaVariants, cn } from "@cui-universal/theme";

interface Props {
  modelValue?: string;
  defaultValue?: string;
  variant?: TextareaVariants["variant"];
  size?: TextareaVariants["size"];
  class?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const classes = computed(() => {
  return cn(textareaVariants({ variant: props.variant, size: props.size }), props.class);
});

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <textarea
    :value="modelValue ?? defaultValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    :class="classes"
    @input="onInput"
  />
</template>
