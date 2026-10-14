<script setup lang="ts">
import { computed, inject } from "vue";
import { avatarVariants, cn } from "@cui/theme";

interface Props {
  src?: string;
  alt?: string;
  class?: string;
}

const props = defineProps<Props>();

const avatar = inject<{
  imageLoaded: { value: boolean };
  imageFailed: { value: boolean };
  setImageLoaded: (v: boolean) => void;
  setImageFailed: (v: boolean) => void;
} | null>("cui-avatar", null);

const onLoad = () => {
  avatar?.setImageLoaded(true);
  avatar?.setImageFailed(false);
};

const onError = () => {
  avatar?.setImageLoaded(false);
  avatar?.setImageFailed(true);
};

const classes = computed(() => {
  const { image } = avatarVariants();
  return cn(image(), props.class);
});
</script>

<template>
  <img
    v-if="!avatar?.imageFailed?.value"
    :src="src"
    :alt="alt"
    :class="classes"
    @load="onLoad"
    @error="onError"
  />
</template>
