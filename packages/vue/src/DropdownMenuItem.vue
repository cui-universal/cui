<script setup lang="ts">
import { inject, type Ref } from "vue";
import { dropdownMenuItemVariants, type DropdownMenuItemVariants, cn } from "@cui-universal/theme";

interface Props {
  variant?: DropdownMenuItemVariants["variant"];
  inset?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const menu = inject<{
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-menu", null);

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit("click", e);
  menu?.setOpen(false);
};
</script>

<template>
  <div
    role="menuitem"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(dropdownMenuItemVariants({ variant: props.variant, inset: props.inset }), disabled && 'pointer-events-none opacity-50', props.class)"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
