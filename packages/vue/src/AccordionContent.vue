<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import { accordionVariants, cn } from "@cui/theme";

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const item = inject<{
  isOpen: Ref<boolean>;
} | null>("cui-accordion-item", null);

const { content, inner } = accordionVariants();
const contentClasses = computed(() => cn(content(), props.class));
const innerClasses = computed(() => inner());
</script>

<template>
  <div
    v-show="item?.isOpen.value"
    :data-state="item?.isOpen.value ? 'open' : 'closed'"
    :class="contentClasses"
  >
    <div :class="innerClasses">
      <slot />
    </div>
  </div>
</template>
