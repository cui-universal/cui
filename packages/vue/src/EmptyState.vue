<script setup lang="ts">
import {
  emptyStateVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateDescriptionVariants,
  emptyStateActionVariants,
  cn,
} from "@cui-universal/theme";

interface Props {
  title?: string;
  description?: string;
  icon?: any;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="cn(emptyStateVariants(), props.class)">
    <div v-if="icon || $slots.icon" :class="cn(emptyStateIconVariants())">
      <slot name="icon">
        <component :is="icon" class="h-6 w-6" />
      </slot>
    </div>

    <h3 v-if="title || $slots.title" :class="cn(emptyStateTitleVariants())">
      <slot name="title">{{ title }}</slot>
    </h3>

    <p v-if="description || $slots.description" :class="cn(emptyStateDescriptionVariants())">
      <slot name="description">{{ description }}</slot>
    </p>

    <div v-if="$slots.action" :class="cn(emptyStateActionVariants())">
      <slot name="action" />
    </div>
  </div>
</template>
