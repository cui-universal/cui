<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { cn } from "@cui-universal/theme";

interface Props {
  placeholder?: string;
  class?: string;
}

const props = defineProps<Props>();

const select = inject<{
  selectedValue: Ref<string>;
  registeredLabels: Ref<Record<string, string>>;
} | null>("cui-select", null);

const displayLabel = computed(() => {
  if (!select) return "";
  const val = select.selectedValue.value;
  if (!val) return "";
  return select.registeredLabels.value[val] ?? val;
});

const hasValue = computed(() => Boolean(displayLabel.value));
</script>

<template>
  <span
    :class="cn('block truncate', !hasValue && 'text-muted-foreground', props.class)"
  >
    {{ hasValue ? displayLabel : placeholder }}
  </span>
</template>
