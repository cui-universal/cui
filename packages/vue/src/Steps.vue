<script setup lang="ts">
import { computed } from "vue";
import {
  stepsVariants,
  stepItemVariants,
  stepIconVariants,
  stepSeparatorVariants,
  cn,
} from "@cui-universal/theme";
import { Check } from "lucide-vue-next";

export interface StepItem {
  id?: string | number;
  title: string;
  description?: string;
  icon?: any;
}

interface Props {
  steps: StepItem[];
  modelValue?: number;
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
  class?: string;
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  currentStep: undefined,
  orientation: "horizontal",
  clickable: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", stepIndex: number): void;
  (e: "change", stepIndex: number): void;
}>();

const activeIndex = computed(() => {
  if (props.currentStep !== undefined) return props.currentStep;
  return props.modelValue;
});

const getStatus = (index: number): "complete" | "current" | "upcoming" => {
  if (index < activeIndex.value) return "complete";
  if (index === activeIndex.value) return "current";
  return "upcoming";
};

const handleStepClick = (index: number) => {
  if (!props.clickable) return;
  emit("update:modelValue", index);
  emit("change", index);
};
</script>

<template>
  <nav
    aria-label="Progress Steps"
    :class="cn(stepsVariants({ orientation }), props.class)"
  >
    <div
      v-for="(step, index) in steps"
      :key="step.id || index"
      :class="cn(stepItemVariants({ status: getStatus(index) }))"
    >
      <div
        class="flex items-center gap-3"
        :class="{ 'cursor-pointer': clickable }"
        @click="handleStepClick(index)"
      >
        <!-- Step Icon / Number Indicator -->
        <div :class="cn(stepIconVariants({ status: getStatus(index) }))">
          <Check v-if="getStatus(index) === 'complete'" class="h-4 w-4 stroke-[3]" />
          <component :is="step.icon" v-else-if="step.icon" class="h-4 w-4" />
          <span v-else>{{ index + 1 }}</span>
        </div>

        <!-- Step Text Content -->
        <div class="space-y-0.5 text-left">
          <p
            class="text-xs font-bold leading-tight"
            :class="getStatus(index) === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'"
          >
            {{ step.title }}
          </p>
          <p
            v-if="step.description"
            class="text-[10px] text-muted-foreground leading-tight"
          >
            {{ step.description }}
          </p>
        </div>
      </div>

      <!-- Connecting Separator Line -->
      <div
        v-if="index < steps.length - 1 && orientation === 'horizontal'"
        :class="cn(stepSeparatorVariants({ status: index < activeIndex ? 'complete' : 'upcoming' }))"
      />
    </div>
  </nav>
</template>
