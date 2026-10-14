<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import { ChevronRight } from "lucide-vue-next";
import { dropdownMenuItemVariants, cn } from "@cui-universal/theme";

interface Props {
  inset?: boolean;
  class?: string;
}

const props = defineProps<Props>();

const el = ref<HTMLElement | null>(null);

const sub = inject<{
  isOpen: Ref<boolean>;
  triggerEl: Ref<HTMLElement | null>;
  setOpen: (val: boolean) => void;
} | null>("cui-dropdown-sub", null);

onMounted(() => {
  if (sub && el.value) {
    sub.triggerEl.value = el.value;
  }
});

const handleClick = () => {
  sub?.setOpen(!sub?.isOpen.value);
};

const handleMouseEnter = () => {
  sub?.setOpen(true);
};
</script>

<template>
  <div
    ref="el"
    role="menuitem"
    aria-haspopup="menu"
    :aria-expanded="sub?.isOpen.value"
    :data-state="sub?.isOpen.value ? 'open' : 'closed'"
    :class="cn(dropdownMenuItemVariants({ inset: props.inset }), 'data-[state=open]:bg-accent cursor-pointer select-none', props.class)"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot />
    <ChevronRight class="ml-auto h-3.5 w-3.5" />
  </div>
</template>
