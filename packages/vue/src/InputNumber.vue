<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-vue-next";
import { inputNumberVariants, type InputNumberVariants, cn } from "@cui-universal/theme";

export interface InputNumberProps {
  modelValue?: number | null;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  controls?: boolean;
  controlsPosition?: "right" | "sides";
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: InputNumberVariants["variant"];
  size?: InputNumberVariants["size"];
  class?: string;
}

const props = withDefaults(defineProps<InputNumberProps>(), {
  min: -Infinity,
  max: Infinity,
  step: 1,
  controls: true,
  controlsPosition: "right",
  disabled: false,
  readOnly: false,
  variant: "default",
  size: "sm",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
  (e: "change", value: number | null): void;
}>();

const internalVal = ref<number | null>(
  props.modelValue !== undefined ? props.modelValue : props.defaultValue ?? null
);

const displayVal = ref<string>(
  internalVal.value !== null && internalVal.value !== undefined ? String(internalVal.value) : ""
);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined) {
      internalVal.value = newVal;
      displayVal.value = newVal !== null ? String(newVal) : "";
    }
  }
);

const roundToPrecision = (val: number): number => {
  if (props.precision !== undefined && props.precision >= 0) {
    const factor = Math.pow(10, props.precision);
    return Math.round(val * factor) / factor;
  }
  const stepPrecision = (String(props.step).split(".")[1] || "").length;
  if (stepPrecision > 0) {
    const factor = Math.pow(10, stepPrecision);
    return Math.round(val * factor) / factor;
  }
  return val;
};

const clamp = (val: number): number => {
  const clamped = Math.min(Math.max(val, props.min), props.max);
  return roundToPrecision(clamped);
};

const updateValue = (newVal: number | null) => {
  const clampedVal = newVal !== null ? clamp(newVal) : null;
  internalVal.value = clampedVal;
  displayVal.value = clampedVal !== null ? String(clampedVal) : "";
  emit("update:modelValue", clampedVal);
  emit("change", clampedVal);
};

const stepUp = (multiplier = 1) => {
  if (props.disabled || props.readOnly) return;
  const base = internalVal.value ?? (props.min !== -Infinity ? props.min : 0);
  const next = base + props.step * multiplier;
  updateValue(next);
};

const stepDown = (multiplier = 1) => {
  if (props.disabled || props.readOnly) return;
  const base = internalVal.value ?? (props.min !== -Infinity ? props.min : 0);
  const next = base - props.step * multiplier;
  updateValue(next);
};

// Continuous stepping on hold
let timerId: ReturnType<typeof setTimeout> | null = null;
let intervalId: ReturnType<typeof setInterval> | null = null;

const stopStepping = () => {
  if (timerId) clearTimeout(timerId);
  if (intervalId) clearInterval(intervalId);
  timerId = null;
  intervalId = null;
};

const startStepping = (action: () => void) => {
  action();
  stopStepping();
  timerId = setTimeout(() => {
    intervalId = setInterval(action, 60);
  }, 350);
};

onUnmounted(() => {
  stopStepping();
});

const onInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  displayVal.value = val;

  if (val === "" || val === "-") {
    internalVal.value = null;
    emit("update:modelValue", null);
    emit("change", null);
    return;
  }

  const parsed = parseFloat(val);
  if (!isNaN(parsed)) {
    internalVal.value = parsed;
    emit("update:modelValue", parsed);
    emit("change", parsed);
  }
};

const onBlur = () => {
  if (displayVal.value === "" || displayVal.value === "-") {
    updateValue(null);
  } else {
    const parsed = parseFloat(displayVal.value);
    if (isNaN(parsed)) {
      updateValue(null);
    } else {
      updateValue(parsed);
    }
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (props.disabled || props.readOnly) return;

  if (e.key === "ArrowUp") {
    e.preventDefault();
    stepUp(e.shiftKey ? 10 : 1);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    stepDown(e.shiftKey ? 10 : 1);
  } else if (e.key === "PageUp") {
    e.preventDefault();
    stepUp(10);
  } else if (e.key === "PageDown") {
    e.preventDefault();
    stepDown(10);
  } else if (e.key === "Home" && props.min !== -Infinity) {
    e.preventDefault();
    updateValue(props.min);
  } else if (e.key === "End" && props.max !== Infinity) {
    e.preventDefault();
    updateValue(props.max);
  } else if (e.key === "Enter") {
    onBlur();
  }
};

const slots = computed(() => {
  return inputNumberVariants({
    variant: props.variant,
    size: props.size,
    disabled: props.disabled,
  });
});

const isMinReached = computed(() => {
  return internalVal.value !== null && internalVal.value !== undefined && internalVal.value <= props.min;
});

const isMaxReached = computed(() => {
  return internalVal.value !== null && internalVal.value !== undefined && internalVal.value >= props.max;
});
</script>

<template>
  <div :class="cn(slots.root(), props.class)">
    <!-- Left side button if controlsPosition='sides' -->
    <button
      v-if="controls && controlsPosition === 'sides'"
      type="button"
      tabindex="-1"
      :disabled="disabled || readOnly || isMinReached"
      :class="cn(slots.stepperInlineBtn(), 'border-r border-border')"
      aria-label="Decrease value"
      @pointerdown="startStepping(() => stepDown())"
      @pointerup="stopStepping"
      @pointerleave="stopStepping"
    >
      <Minus class="h-3 w-3" />
    </button>

    <slot name="prefix">
      <span v-if="prefix" :class="slots.prefix()">{{ prefix }}</span>
    </slot>

    <input
      type="text"
      inputmode="decimal"
      role="spinbutton"
      :aria-valuenow="internalVal ?? undefined"
      :aria-valuemin="min !== -Infinity ? min : undefined"
      :aria-valuemax="max !== Infinity ? max : undefined"
      :value="displayVal"
      :disabled="disabled"
      :readonly="readOnly"
      :placeholder="placeholder"
      :class="slots.input()"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeyDown"
    />

    <slot name="suffix">
      <span v-if="suffix" :class="slots.suffix()">{{ suffix }}</span>
    </slot>

    <!-- Right side stacked buttons if controlsPosition='right' -->
    <div v-if="controls && controlsPosition === 'right'" :class="slots.stepperWrapper()">
      <button
        type="button"
        tabindex="-1"
        :disabled="disabled || readOnly || isMaxReached"
        :class="slots.stepperBtn()"
        aria-label="Increase value"
        @pointerdown="startStepping(() => stepUp())"
        @pointerup="stopStepping"
        @pointerleave="stopStepping"
      >
        <ChevronUp class="h-3 w-3" />
      </button>
      <button
        type="button"
        tabindex="-1"
        :disabled="disabled || readOnly || isMinReached"
        :class="slots.stepperBtn()"
        aria-label="Decrease value"
        @pointerdown="startStepping(() => stepDown())"
        @pointerup="stopStepping"
        @pointerleave="stopStepping"
      >
        <ChevronDown class="h-3 w-3" />
      </button>
    </div>

    <!-- Right side button if controlsPosition='sides' -->
    <button
      v-if="controls && controlsPosition === 'sides'"
      type="button"
      tabindex="-1"
      :disabled="disabled || readOnly || isMaxReached"
      :class="cn(slots.stepperInlineBtn(), 'border-l border-border')"
      aria-label="Increase value"
      @pointerdown="startStepping(() => stepUp())"
      @pointerup="stopStepping"
      @pointerleave="stopStepping"
    >
      <Plus class="h-3 w-3" />
    </button>
  </div>
</template>
