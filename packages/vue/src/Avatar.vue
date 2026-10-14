<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { avatarVariants, type AvatarVariants, cn } from "@cui-universal/theme";

interface Props {
  size?: AvatarVariants["size"];
  class?: string;
}

const props = defineProps<Props>();

const imageLoaded = ref(false);
const imageFailed = ref(false);

provide("cui-avatar", {
  imageLoaded,
  imageFailed,
  setImageLoaded: (v: boolean) => {
    imageLoaded.value = v;
  },
  setImageFailed: (v: boolean) => {
    imageFailed.value = v;
  },
});

const classes = computed(() => {
  const { root } = avatarVariants({ size: props.size });
  return cn(root(), props.class);
});
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
