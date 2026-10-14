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
const triggerEl = ref<HTMLElement | null>(null);

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

const toggleOpen = () => {
  setOpen(!isOpen.value);
};

provide("cui-dropdown-menu", {
  isOpen,
  triggerEl,
  setOpen,
  toggleOpen,
});
</script>

<template>
  <slot />
</template>
