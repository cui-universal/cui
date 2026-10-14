<script setup lang="ts">
import { computed } from "vue";
import { checkboxVariants, type CheckboxVariants, cn } from "@cui-universal/theme";
import { Check, Minus } from "lucide-vue-next";

export type CheckedState = boolean | "indeterminate";

interface Props {
  checked?: CheckedState;
  modelValue?: CheckedState;
  defaultChecked?: CheckedState;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: CheckboxVariants["size"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: undefined,
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: "on",
});

const emit = defineEmits<{
  (e: "update:checked", value: CheckedState): void;
  (e: "update:modelValue", value: CheckedState): void;
}>();

const innerChecked = computed<CheckedState>(() => {
  if (props.modelValue !== undefined) return props.modelValue;
  if (props.checked !== undefined) return props.checked;
  return props.defaultChecked;
});

const isChecked = computed(() => innerChecked.value === true);
const isIndeterminate = computed(() => innerChecked.value === "indeterminate");
const dataState = computed(() => {
  if (isIndeterminate.value) return "indeterminate";
  return isChecked.value ? "checked" : "unchecked";
});

const { root, indicator } = checkboxVariants({ size: props.size });
const rootClasses = computed(() => cn(root(), props.class));
const indicatorClasses = computed(() => indicator());

const toggle = () => {
  if (props.disabled) return;
  const next = isIndeterminate.value ? true : !isChecked.value;
  emit("update:checked", next);
  emit("update:modelValue", next);
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled) return;
  if (e.key === " ") {
    e.preventDefault();
    toggle();
  }
};
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="isIndeterminate ? 'mixed' : isChecked"
    :data-state="dataState"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :class="rootClasses"
    @click="toggle"
    @keydown="handleKeyDown"
  >
    <span
      v-if="isChecked || isIndeterminate"
      :data-state="dataState"
      :class="cn('flex items-center justify-center text-current', indicatorClasses)"
    >
      <Minus v-if="isIndeterminate" class="h-3 w-3 stroke-[3]" />
      <Check v-else class="h-3 w-3 stroke-[3]" />
    </span>
  </button>
  <input
    v-if="name"
    type="checkbox"
    :name="name"
    :value="value"
    :checked="isChecked"
    :required="required"
    :disabled="disabled"
    style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0; width: 0; height: 0;"
    tabindex="-1"
    readonly
  />
</template>
