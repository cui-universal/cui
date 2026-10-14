<script setup lang="ts">
import { computed } from "vue";
import { progressVariants, type ProgressVariants, cn } from "@cui-universal/theme";

interface Props {
  class?: string;
  value?: number;
  max?: number;
  size?: ProgressVariants["size"];
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
});

const percentage = computed(() => {
  const v = props.value ?? 0;
  const m = props.max || 100;
  return Math.min(100, Math.max(0, (v / m) * 100));
});

const { root, indicator } = progressVariants({ size: props.size });
const rootClasses = computed(() => cn(root(), props.class));
const indicatorClasses = computed(() => indicator());
</script>

<template>
  <div
    role="progressbar"
    :aria-valuemax="max"
    :aria-valuemin="0"
    :aria-valuenow="value"
    :data-state="percentage === 100 ? 'complete' : 'loading'"
    :data-value="value"
    :data-max="max"
    :class="rootClasses"
  >
    <div
      :class="indicatorClasses"
      :style="{ transform: `translateX(-${100 - percentage}%)` }"
    />
  </div>
</template>
