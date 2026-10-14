<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { selectTriggerVariants, type SelectTriggerVariants, cn } from "@cui-universal/theme";

interface Props {
  size?: SelectTriggerVariants["size"];
  variant?: SelectTriggerVariants["variant"];
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const el = ref<HTMLElement | null>(null);

const select = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  toggleOpen: () => void;
} | null>("cui-select", null);

onMounted(() => {
  if (select && el.value) {
    select.triggerEl.value = el.value;
  }
});

const handleClick = () => {
  if (props.disabled) return;
  select?.toggleOpen();
};
</script>

<template>
  <button
    ref="el"
    type="button"
    role="combobox"
    :aria-expanded="select?.isOpen.value"
    :data-state="select?.isOpen.value ? 'open' : 'closed'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(selectTriggerVariants({ size: props.size, variant: props.variant }), props.class)"
    @click="handleClick"
  >
    <slot />
    <ChevronDown class="h-4 w-4 opacity-50 ml-2 shrink-0" />
  </button>
</template>
