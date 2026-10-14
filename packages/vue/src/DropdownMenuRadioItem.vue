<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { Circle } from "lucide-vue-next";
import { dropdownMenuIndicatorItemVariants, cn } from "@cui-universal/theme";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const radioGroup = inject<{
  selectedValue: Ref<string>;
  selectValue: (val: string) => void;
} | null>("cui-dropdown-radio-group", null);

const menu = inject<{
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-menu", null);

const isSelected = computed(() => radioGroup?.selectedValue.value === props.value);

const handleClick = () => {
  if (props.disabled) return;
  radioGroup?.selectValue(props.value);
  menu?.setOpen(false);
};
</script>

<template>
  <div
    role="menuitemradio"
    :aria-checked="isSelected"
    :data-state="isSelected ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(dropdownMenuIndicatorItemVariants(), disabled && 'pointer-events-none opacity-50', props.class)"
    @click="handleClick"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Circle v-if="isSelected" class="h-2 w-2 fill-current" />
    </span>
    <slot />
  </div>
</template>
