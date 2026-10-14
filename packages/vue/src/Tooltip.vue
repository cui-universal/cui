<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  open?: boolean;
  defaultOpen?: boolean;
  delayDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  delayDuration: 200,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const isOpen = ref(props.open ?? props.defaultOpen);
const triggerEl = ref<HTMLElement | null>(null);
let timeout: any = null;

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) isOpen.value = val;
  }
);

const setOpen = (val: boolean) => {
  clearTimeout(timeout);
  if (val) {
    timeout = setTimeout(() => {
      isOpen.value = true;
      emit("update:open", true);
    }, props.delayDuration);
  } else {
    isOpen.value = false;
    emit("update:open", false);
  }
};

provide("cui-tooltip", {
  isOpen,
  triggerEl,
  setOpen,
});
</script>

<template>
  <slot />
</template>
