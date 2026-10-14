<script setup lang="ts">
import { computed } from "vue";
import { switchVariants, type SwitchVariants, cn } from "@cui-universal/theme";

interface Props {
  checked?: boolean;
  modelValue?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: SwitchVariants["size"];
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
  (e: "update:checked", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
}>();

const innerChecked = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue;
  if (props.checked !== undefined) return props.checked;
  return props.defaultChecked;
});

const { root, thumb } = switchVariants({ size: props.size });
const rootClasses = computed(() => cn(root(), props.class));
const thumbClasses = computed(() => thumb());

const toggle = () => {
  if (props.disabled) return;
  const next = !innerChecked.value;
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
    role="switch"
    :aria-checked="innerChecked"
    :data-state="innerChecked ? 'checked' : 'unchecked'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :class="rootClasses"
    @click="toggle"
    @keydown="handleKeyDown"
  >
    <span
      :data-state="innerChecked ? 'checked' : 'unchecked'"
      :data-disabled="disabled ? '' : undefined"
      :class="thumbClasses"
    />
  </button>
  <input
    v-if="name"
    type="checkbox"
    :name="name"
    :value="value"
    :checked="innerChecked"
    :required="required"
    :disabled="disabled"
    style="transform: translateX(-100%); position: absolute; pointer-events: none; opacity: 0; margin: 0; width: 0; height: 0;"
    tabindex="-1"
    readonly
  />
</template>
