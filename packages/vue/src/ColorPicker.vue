<script setup lang="ts">
import {
  colorPickerVariants,
  colorSwatchVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-vue-next";

interface Props {
  modelValue?: string;
  colors?: string[];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "#f97316",
  colors: () => [
    "#f97316", // Orange
    "#8b5cf6", // Violet
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f43f5e", // Rose
    "#f59e0b", // Amber
    "#06b6d4", // Cyan
    "#64748b", // Slate
  ],
});

const emit = defineEmits<{
  (e: "update:modelValue", color: string): void;
  (e: "change", color: string): void;
}>();

const selectColor = (color: string) => {
  emit("update:modelValue", color);
  emit("change", color);
};
</script>

<template>
  <div :class="cn(colorPickerVariants(), props.class)">
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="color in colors"
        :key="color"
        type="button"
        :style="{ backgroundColor: color }"
        :class="cn(colorSwatchVariants({ active: modelValue.toLowerCase() === color.toLowerCase() }))"
        :title="color"
        @click="selectColor(color)"
      >
        <Check
          v-if="modelValue.toLowerCase() === color.toLowerCase()"
          class="h-4 w-4 text-white drop-shadow stroke-[3]"
        />
      </button>

      <!-- Native custom color picker button -->
      <label class="h-8 w-8 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/80 transition-colors overflow-hidden">
        <input
          type="color"
          :value="modelValue"
          class="opacity-0 w-0 h-0 absolute pointer-events-none"
          @input="(e: any) => selectColor(e.target.value)"
        />
        <span class="text-xs font-bold text-muted-foreground">+</span>
      </label>
    </div>
  </div>
</template>
