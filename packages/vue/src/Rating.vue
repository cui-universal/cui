<script setup lang="ts">
import { ref } from "vue";
import { ratingVariants, ratingStarVariants, cn } from "@cui-universal/theme";
import { Star } from "lucide-vue-next";

interface Props {
  modelValue?: number;
  max?: number;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 5,
  readonly: false,
  size: "md",
});

const emit = defineEmits<{
  (e: "update:modelValue", val: number): void;
  (e: "change", val: number): void;
}>();

const hoverRating = ref<number | null>(null);

const setRating = (val: number) => {
  if (props.readonly) return;
  emit("update:modelValue", val);
  emit("change", val);
};
</script>

<template>
  <div :class="cn(ratingVariants(), props.class)">
    <button
      v-for="index in max"
      :key="index"
      type="button"
      :disabled="readonly"
      :class="
        cn(
          ratingStarVariants({
            active: (hoverRating !== null ? hoverRating : modelValue) >= index,
            interactive: !readonly,
            size,
          })
        )
      "
      @mouseenter="!readonly && (hoverRating = index)"
      @mouseleave="!readonly && (hoverRating = null)"
      @click="setRating(index)"
    >
      <Star class="h-full w-full" />
    </button>
  </div>
</template>
