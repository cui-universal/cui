<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { accordionVariants, cn } from "@cui-universal/theme";
import { ChevronDown } from "lucide-vue-next";

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const item = inject<{
  disabled: boolean;
  isOpen: Ref<boolean>;
  toggle: () => void;
} | null>("cui-accordion-item", null);

const { header, trigger, icon } = accordionVariants();
const headerClasses = computed(() => header());
const triggerClasses = computed(() => cn(trigger(), props.class));
const iconClasses = computed(() => icon());

const handleClick = () => {
  item?.toggle();
};
</script>

<template>
  <div :class="headerClasses">
    <button
      type="button"
      :aria-expanded="item?.isOpen.value"
      :data-state="item?.isOpen.value ? 'open' : 'closed'"
      :disabled="item?.disabled"
      :class="triggerClasses"
      @click="handleClick"
    >
      <slot />
      <ChevronDown :class="iconClasses" />
    </button>
  </div>
</template>
