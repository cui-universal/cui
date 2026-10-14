<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  open?: boolean;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const isOpen = ref(props.open ?? props.defaultOpen);

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) isOpen.value = val;
  }
);

const setOpen = (val: boolean) => {
  isOpen.value = val;
  emit("update:open", val);
};

provide("cui-dialog", {
  isOpen,
  setOpen,
});
</script>

<template>
  <slot />
</template>
