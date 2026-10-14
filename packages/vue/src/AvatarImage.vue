<script setup lang="ts">
import { computed, inject, ref, onMounted, watch } from "vue";
import { avatarVariants, cn } from "@cui-universal/theme";

interface Props {
  src?: string;
  alt?: string;
  class?: string;
}

const props = defineProps<Props>();
const imgRef = ref<HTMLImageElement | null>(null);

const avatar = inject<{
  imageLoaded: { value: boolean };
  imageFailed: { value: boolean };
  setImageLoaded: (v: boolean) => void;
  setImageFailed: (v: boolean) => void;
} | null>("cui-avatar", null);

const checkStatus = () => {
  if (!props.src) {
    avatar?.setImageLoaded(false);
    avatar?.setImageFailed(true);
    return;
  }
  const el = imgRef.value;
  if (el && el.complete) {
    if (el.naturalWidth > 0) {
      avatar?.setImageLoaded(true);
      avatar?.setImageFailed(false);
    } else {
      avatar?.setImageLoaded(false);
      avatar?.setImageFailed(true);
    }
  }
};

const onLoad = () => {
  avatar?.setImageLoaded(true);
  avatar?.setImageFailed(false);
};

const onError = () => {
  avatar?.setImageLoaded(false);
  avatar?.setImageFailed(true);
};

onMounted(() => {
  checkStatus();
});

watch(
  () => props.src,
  (newSrc) => {
    if (!newSrc) {
      onError();
    } else {
      avatar?.setImageLoaded(false);
      avatar?.setImageFailed(false);
      setTimeout(checkStatus, 0);
    }
  }
);

const classes = computed(() => {
  const { image } = avatarVariants();
  return cn(image(), props.class);
});
</script>

<template>
  <img
    v-if="!avatar?.imageFailed?.value"
    v-show="avatar?.imageLoaded?.value"
    ref="imgRef"
    :src="src"
    :alt="alt"
    :class="classes"
    @load="onLoad"
    @error="onError"
  />
</template>
