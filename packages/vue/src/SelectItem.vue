<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from "vue";
import { Check } from "lucide-vue-next";
import { selectItemVariants, cn } from "@cui/theme";

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const el = ref<HTMLElement | null>(null);

const select = inject<{
  selectedValue: Ref<string>;
  selectValue: (val: string) => void;
  registerLabel: (val: string, label: string) => void;
} | null>("cui-select", null);

const isSelected = computed(() => select?.selectedValue.value === props.value);

onMounted(() => {
  if (select && el.value) {
    const text = el.value.textContent?.trim() ?? props.value;
    select.registerLabel(props.value, text);
  }
});

const handleClick = () => {
  if (props.disabled) return;
  select?.selectValue(props.value);
};
</script>

<template>
  <div
    ref="el"
    role="option"
    :aria-selected="isSelected"
    :data-state="isSelected ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :class="cn(selectItemVariants(), disabled && 'pointer-events-none opacity-50', props.class)"
    @click="handleClick"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check v-if="isSelected" class="h-4 w-4" />
    </span>
    <span class="truncate">
      <slot />
    </span>
  </div>
</template>
