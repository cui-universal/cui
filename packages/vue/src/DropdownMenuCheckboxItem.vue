<script setup lang="ts">
import { inject } from "vue";
import { Check } from "lucide-vue-next";
import { dropdownMenuIndicatorItemVariants, cn } from "@cui/theme";

interface Props {
  checked?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:checked", value: boolean): void;
}>();

const menu = inject<{
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-menu", null);

const handleClick = () => {
  if (props.disabled) return;
  emit("update:checked", !props.checked);
  menu?.setOpen(false);
};
</script>

<template>
  <div
    role="menuitemcheckbox"
    :aria-checked="checked"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(dropdownMenuIndicatorItemVariants(), disabled && 'pointer-events-none opacity-50', props.class)"
    @click="handleClick"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="checked" class="h-3.5 w-3.5" />
    </span>
    <slot />
  </div>
</template>
