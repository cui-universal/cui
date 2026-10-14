<script setup lang="ts">
import { computed, inject } from "vue";
import { avatarVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
  delayMs?: number;
}

const props = defineProps<Props>();

const avatar = inject<{
  imageLoaded: { value: boolean };
  imageFailed: { value: boolean };
} | null>("cui-avatar", null);

const showFallback = computed(() => {
  if (!avatar) return true;
  return !avatar.imageLoaded.value || avatar.imageFailed.value;
});

const classes = computed(() => {
  const { fallback } = avatarVariants();
  return cn(fallback(), props.class);
});
</script>

<template>
  <span v-if="showFallback" :class="classes">
    <slot />
  </span>
</template>
