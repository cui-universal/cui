<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { Circle } from "lucide-vue-next";
import { radioVariants, type RadioVariants, cn } from "@cui/theme";

interface Props {
  value: string;
  disabled?: boolean;
  required?: boolean;
  size?: RadioVariants["size"];
  variant?: RadioVariants["variant"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const group = inject<{
  currentValue: Ref<string>;
  selectValue: (val: string) => void;
  disabled: boolean;
  name?: string;
} | null>("cui-radio-group", null);

const isSelected = computed(() => group?.currentValue.value === props.value);
const isDisabled = computed(() => props.disabled || (group?.disabled ?? false));

const handleClick = () => {
  if (isDisabled.value) return;
  group?.selectValue(props.value);
};
</script>

<template>
  <button
    type="button"
    role="radio"
    :aria-checked="isSelected"
    :data-state="isSelected ? 'checked' : 'unchecked'"
    :disabled="isDisabled"
    :data-disabled="isDisabled ? '' : undefined"
    :class="cn(radioVariants({ size: props.size, variant: props.variant }), props.class)"
    @click="handleClick"
  >
    <span v-if="isSelected" class="flex items-center justify-center">
      <Circle class="h-2 w-2 fill-current text-current" />
    </span>
  </button>
</template>
