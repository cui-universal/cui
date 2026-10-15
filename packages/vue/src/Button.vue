<script setup lang="ts">
import { computed } from "vue";
import { Primitive } from "./primitives";
import { buttonVariants, type ButtonVariants, cn } from "@cui-universal/theme";
import { Loader2 } from "lucide-vue-next";

interface Props {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  fullWidth?: boolean;
  as?: string;
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  asChild: false,
  loading: false,
  disabled: false,
});

const classes = computed(() => {
  return cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
      fullWidth: props.fullWidth,
    }),
    props.class
  );
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :disabled="disabled || loading"
    :class="classes"
    v-bind="$attrs"
  >
    <Loader2 v-if="loading" class="h-4 w-4 animate-spin shrink-0" />
    <slot name="leftIcon" v-if="!loading" />
    <slot />
    <slot name="rightIcon" v-if="!loading" />
  </Primitive>
</template>
