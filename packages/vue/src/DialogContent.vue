<script setup lang="ts">
import { computed, inject, ref, type Ref } from "vue";
import { dialogVariants, cn } from "@cui-universal/theme";
import { X } from "lucide-vue-next";
import { useDismissable } from "./primitives";

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const contentEl = ref<HTMLElement | null>(null);

const dialog = inject<{
  isOpen: Ref<boolean>;
  setOpen: (val: boolean) => void;
} | null>("cui-dialog", null);

const isOpen = computed(() => dialog?.isOpen.value ?? false);

useDismissable({
  enabled: isOpen,
  getElements: () => [contentEl.value],
  onDismiss: () => dialog?.setOpen(false),
});

const { overlay, content, close } = dialogVariants();
const contentClasses = computed(() => cn(content(), props.class));
const overlayClasses = computed(() => overlay());
const closeClasses = computed(() => close());
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div
        :data-state="isOpen ? 'open' : 'closed'"
        :class="overlayClasses"
        @click="dialog?.setOpen(false)"
      />
      <div
        ref="contentEl"
        role="dialog"
        aria-modal="true"
        :data-state="isOpen ? 'open' : 'closed'"
        :class="contentClasses"
      >
        <slot />

        <button
          type="button"
          :class="closeClasses"
          @click="dialog?.setOpen(false)"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>
