<script setup lang="ts">
import { computed } from "vue";
import {
  paginationVariants,
  paginationContentVariants,
  paginationItemVariants,
  paginationButtonVariants,
  cn,
} from "@cui-universal/theme";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-vue-next";

interface Props {
  modelValue?: number;
  totalPages?: number;
  siblingCount?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  totalPages: 10,
  siblingCount: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", page: number): void;
  (e: "change", page: number): void;
}>();

const setPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.modelValue) return;
  emit("update:modelValue", page);
  emit("change", page);
};

// Generate pagination array with numbers and ellipsis
const paginationRange = computed(() => {
  const total = props.totalPages;
  const current = props.modelValue;
  const siblings = props.siblingCount;

  const totalNumbers = siblings * 2 + 3; // current + siblings + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis

  if (total <= totalBlocks) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => total - rightItemCount + i + 1
    );
    return [1, "...", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i
  );
  return [1, "...", ...middleRange, "...", total];
});
</script>

<template>
  <nav aria-label="Pagination" :class="cn(paginationVariants(), props.class)">
    <ul :class="cn(paginationContentVariants())">
      <!-- Previous Button -->
      <li :class="cn(paginationItemVariants())">
        <button
          type="button"
          :disabled="modelValue <= 1"
          :class="cn(paginationButtonVariants({ disabled: modelValue <= 1 }), 'gap-1 pl-2')"
          @click="setPage(modelValue - 1)"
        >
          <ChevronLeft class="h-3.5 w-3.5" />
          <span class="hidden sm:inline">Previous</span>
        </button>
      </li>

      <!-- Page Numbers / Ellipsis -->
      <li
        v-for="(item, idx) in paginationRange"
        :key="idx"
        :class="cn(paginationItemVariants())"
      >
        <span
          v-if="item === '...'"
          class="flex h-8 w-8 items-center justify-center text-muted-foreground text-xs"
        >
          <MoreHorizontal class="h-4 w-4" />
        </span>
        <button
          v-else
          type="button"
          :class="cn(paginationButtonVariants({ active: item === modelValue }))"
          @click="setPage(Number(item))"
        >
          {{ item }}
        </button>
      </li>

      <!-- Next Button -->
      <li :class="cn(paginationItemVariants())">
        <button
          type="button"
          :disabled="modelValue >= totalPages"
          :class="cn(paginationButtonVariants({ disabled: modelValue >= totalPages }), 'gap-1 pr-2')"
          @click="setPage(modelValue + 1)"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRight class="h-3.5 w-3.5" />
        </button>
      </li>
    </ul>
  </nav>
</template>
