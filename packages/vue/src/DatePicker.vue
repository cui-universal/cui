<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  calendarVariants,
  calendarHeaderVariants,
  calendarDayVariants,
  cn,
} from "@cui-universal/theme";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-vue-next";

interface Props {
  modelValue?: string | Date;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Select date",
  format: "YYYY-MM-DD",
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "change", val: string): void;
}>();

const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);

// Parse initial date
const parseDate = (val: string | Date | undefined): Date | null => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const selectedDate = ref<Date | null>(parseDate(props.modelValue));

watch(
  () => props.modelValue,
  (newVal) => {
    selectedDate.value = parseDate(newVal);
  }
);

// View month & year state
const now = new Date();
const viewYear = ref(selectedDate.value?.getFullYear() ?? now.getFullYear());
const viewMonth = ref(selectedDate.value?.getMonth() ?? now.getMonth());

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonthLabel = computed(() => {
  return `${monthNames[viewMonth.value]} ${viewYear.value}`;
});

const prevMonth = () => {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value -= 1;
  } else {
    viewMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value += 1;
  } else {
    viewMonth.value += 1;
  }
};

interface DayCell {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

const calendarDays = computed(() => {
  const days: DayCell[] = [];
  const firstDayIndex = new Date(viewYear.value, viewMonth.value, 1).getDay();
  const lastDate = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();
  const prevLastDate = new Date(viewYear.value, viewMonth.value, 0).getDate();

  const today = new Date();
  const isSameDay = (d1: Date | null, y: number, m: number, d: number) => {
    if (!d1) return false;
    return (
      d1.getFullYear() === y && d1.getMonth() === m && d1.getDate() === d
    );
  };

  // Previous month padding days
  for (let x = firstDayIndex; x > 0; x--) {
    const day = prevLastDate - x + 1;
    const m = viewMonth.value === 0 ? 11 : viewMonth.value - 1;
    const y = viewMonth.value === 0 ? viewYear.value - 1 : viewYear.value;
    days.push({
      day,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: isSameDay(today, y, m, day),
      isSelected: isSameDay(selectedDate.value, y, m, day),
    });
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      day: i,
      month: viewMonth.value,
      year: viewYear.value,
      isCurrentMonth: true,
      isToday: isSameDay(today, viewYear.value, viewMonth.value, i),
      isSelected: isSameDay(selectedDate.value, viewYear.value, viewMonth.value, i),
    });
  }

  // Next month padding days to fill 35 or 42 cells
  const remaining = (7 - (days.length % 7)) % 7;
  for (let j = 1; j <= remaining; j++) {
    const m = viewMonth.value === 11 ? 0 : viewMonth.value + 1;
    const y = viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value;
    days.push({
      day: j,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: isSameDay(today, y, m, j),
      isSelected: isSameDay(selectedDate.value, y, m, j),
    });
  }

  return days;
});

const formatDateString = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const displayValue = computed(() => {
  if (!selectedDate.value) return "";
  return selectedDate.value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const selectDay = (cell: DayCell) => {
  const newDate = new Date(cell.year, cell.month, cell.day);
  selectedDate.value = newDate;
  const str = formatDateString(newDate);
  emit("update:modelValue", str);
  emit("change", str);
  isOpen.value = false;
};

const selectQuickDate = (offsetDays: number) => {
  const target = new Date();
  target.setDate(target.getDate() + offsetDays);
  viewYear.value = target.getFullYear();
  viewMonth.value = target.getMonth();
  selectedDate.value = target;
  const str = formatDateString(target);
  emit("update:modelValue", str);
  emit("change", str);
  isOpen.value = false;
};

const clearDate = (e: MouseEvent) => {
  e.stopPropagation();
  selectedDate.value = null;
  emit("update:modelValue", "");
  emit("change", "");
};

// Outside click handling
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as Node;
  if (
    triggerRef.value &&
    !triggerRef.value.contains(target) &&
    popoverRef.value &&
    !popoverRef.value.contains(target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("pointerdown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleClickOutside);
});
</script>

<template>
  <div class="relative inline-block w-full text-left">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      :disabled="disabled"
      class="flex h-9 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-1 text-xs text-foreground shadow-xs transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      :class="props.class"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2 truncate">
        <CalendarIcon class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span v-if="displayValue" class="font-medium text-foreground">{{ displayValue }}</span>
        <span v-else class="text-muted-foreground">{{ placeholder }}</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          v-if="selectedDate"
          type="button"
          class="rounded p-0.5 hover:bg-muted text-muted-foreground"
          @click="clearDate"
        >
          <X class="h-3 w-3" />
        </button>
      </div>
    </button>

    <!-- Calendar Popover -->
    <div
      v-if="isOpen"
      ref="popoverRef"
      class="absolute left-0 z-50 mt-1.5 p-3 bg-popover text-popover-foreground rounded-lg border border-border shadow-xl animate-in fade-in-0 zoom-in-95 w-[280px]"
    >
      <!-- Header with Navigation -->
      <div class="flex items-center justify-between pb-2 px-1">
        <span class="text-xs font-bold">{{ currentMonthLabel }}</span>
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
            @click="prevMonth"
          >
            <ChevronLeft class="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
            @click="nextMonth"
          >
            <ChevronRight class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <!-- Day Names Header -->
      <div class="grid grid-cols-7 gap-1 text-center mb-1">
        <span
          v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
          :key="d"
          class="text-[10px] font-semibold text-muted-foreground py-1"
        >
          {{ d }}
        </span>
      </div>

      <!-- Days Grid -->
      <div class="grid grid-cols-7 gap-1">
        <button
          v-for="(cell, idx) in calendarDays"
          :key="idx"
          type="button"
          :class="
            cn(
              calendarDayVariants({
                selected: cell.isSelected,
                today: cell.isToday && !cell.isSelected,
                outside: !cell.isCurrentMonth,
              })
            )
          "
          @click="selectDay(cell)"
        >
          {{ cell.day }}
        </button>
      </div>

      <!-- Quick Preset Shortcuts -->
      <div class="flex items-center justify-between pt-3 mt-2 border-t border-border/60 text-[11px]">
        <button
          type="button"
          class="font-medium text-primary hover:underline"
          @click="selectQuickDate(0)"
        >
          Today
        </button>
        <button
          type="button"
          class="font-medium text-muted-foreground hover:text-foreground hover:underline"
          @click="selectQuickDate(-1)"
        >
          Yesterday
        </button>
        <button
          type="button"
          class="font-medium text-muted-foreground hover:text-foreground hover:underline"
          @click="selectQuickDate(7)"
        >
          In 7 Days
        </button>
      </div>
    </div>
  </div>
</template>
