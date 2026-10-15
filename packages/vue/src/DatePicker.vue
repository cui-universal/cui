<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  datePickerVariants,
  type DatePickerVariants,
  calendarVariants,
  calendarHeaderVariants,
  calendarDayVariants,
  cn,
} from "@cui-universal/theme";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-vue-next";

export type DatePickerValue = string | Date;
export type DatePickerRangeValue = [string, string];
export type DatePickerView = "days" | "months" | "years";

interface Props {
  mode?: "single" | "range";
  modelValue?: DatePickerValue | DatePickerRangeValue;
  startDate?: string;
  endDate?: string;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  size?: DatePickerVariants["size"];
  placement?: "bottom" | "top" | "auto";
  minYear?: number;
  maxYear?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "single",
  placeholder: "",
  format: "YYYY-MM-DD",
  disabled: false,
  size: "sm",
  placement: "bottom",
});

const emit = defineEmits<{
  (e: "update:modelValue", val: any): void;
  (e: "change", val: any): void;
  (e: "update:startDate", val: string): void;
  (e: "update:endDate", val: string): void;
}>();

const isRange = computed(() => props.mode === "range");
const isOpen = ref(false);
const calendarView = ref<DatePickerView>("days");
const triggerRef = ref<HTMLElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);
const resolvedPlacement = ref<"bottom" | "top">(props.placement === "top" ? "top" : "bottom");

// Range state
const rangeStart = ref<string | null>(
  props.startDate ?? (Array.isArray(props.modelValue) ? props.modelValue[0] || null : null)
);
const rangeEnd = ref<string | null>(
  props.endDate ?? (Array.isArray(props.modelValue) ? props.modelValue[1] || null : null)
);
const hoverDate = ref<string | null>(null);

// Parse single date
const parseDate = (val: DatePickerValue | DatePickerRangeValue | undefined): Date | null => {
  if (!val || Array.isArray(val)) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const selectedDate = ref<Date | null>(parseDate(props.modelValue));

// View month & year state
const now = new Date();
const initialYear = computed(() => {
  if (isRange.value && rangeStart.value) {
    const d = new Date(rangeStart.value);
    if (!isNaN(d.getTime())) return d.getFullYear();
  }
  return selectedDate.value?.getFullYear() ?? now.getFullYear();
});

const initialMonth = computed(() => {
  if (isRange.value && rangeStart.value) {
    const d = new Date(rangeStart.value);
    if (!isNaN(d.getTime())) return d.getMonth();
  }
  return selectedDate.value?.getMonth() ?? now.getMonth();
});

const viewYear = ref(initialYear.value);
const viewMonth = ref(initialMonth.value);

watch(
  () => props.modelValue,
  (newVal) => {
    if (isRange.value) {
      if (Array.isArray(newVal)) {
        rangeStart.value = newVal[0] || null;
        rangeEnd.value = newVal[1] || null;
        if (newVal[0]) {
          const d = new Date(newVal[0]);
          if (!isNaN(d.getTime())) {
            viewYear.value = d.getFullYear();
            viewMonth.value = d.getMonth();
          }
        }
      }
    } else {
      selectedDate.value = parseDate(newVal);
      if (selectedDate.value) {
        viewYear.value = selectedDate.value.getFullYear();
        viewMonth.value = selectedDate.value.getMonth();
      }
    }
  }
);

watch(
  () => [props.startDate, props.endDate],
  ([s, e]) => {
    if (isRange.value) {
      if (s !== undefined) rangeStart.value = s || null;
      if (e !== undefined) rangeEnd.value = e || null;
    }
  }
);

watch(
  () => [isOpen.value, props.placement],
  () => {
    if (props.placement === "auto" && isOpen.value && triggerRef.value) {
      const rect = triggerRef.value.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < 320 && spaceAbove > spaceBelow) {
        resolvedPlacement.value = "top";
      } else {
        resolvedPlacement.value = "bottom";
      }
    } else if (props.placement === "top") {
      resolvedPlacement.value = "top";
    } else {
      resolvedPlacement.value = "bottom";
    }
  }
);

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

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const decadeStart = computed(() => Math.floor(viewYear.value / 12) * 12);
const decadeYears = computed(() => {
  return Array.from({ length: 12 }, (_, i) => decadeStart.value + i);
});

const minYearVal = computed(() => props.minYear ?? now.getFullYear() - 50);
const maxYearVal = computed(() => props.maxYear ?? now.getFullYear() + 20);

const yearOptions = computed(() => {
  const list: number[] = [];
  const start = Math.min(minYearVal.value, viewYear.value);
  const end = Math.max(maxYearVal.value, viewYear.value);
  for (let y = start; y <= end; y++) {
    list.push(y);
  }
  return list;
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
  dateStr: string;
}

const calendarDays = computed(() => {
  const days: DayCell[] = [];
  const firstDayIndex = new Date(viewYear.value, viewMonth.value, 1).getDay();
  const lastDate = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();
  const prevLastDate = new Date(viewYear.value, viewMonth.value, 0).getDate();

  const today = new Date();
  const isSameDay = (d1: Date, y: number, m: number, d: number) => {
    return d1.getFullYear() === y && d1.getMonth() === m && d1.getDate() === d;
  };

  // Previous month padding days
  for (let x = firstDayIndex; x > 0; x--) {
    const day = prevLastDate - x + 1;
    const m = viewMonth.value === 0 ? 11 : viewMonth.value - 1;
    const y = viewMonth.value === 0 ? viewYear.value - 1 : viewYear.value;
    const dStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    days.push({
      day,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: isSameDay(today, y, m, day),
      dateStr: dStr,
    });
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const dStr = `${viewYear.value}-${String(viewMonth.value + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    days.push({
      day: i,
      month: viewMonth.value,
      year: viewYear.value,
      isCurrentMonth: true,
      isToday: isSameDay(today, viewYear.value, viewMonth.value, i),
      dateStr: dStr,
    });
  }

  // Next month padding days to fill grid cleanly
  const remaining = (7 - (days.length % 7)) % 7;
  for (let j = 1; j <= remaining; j++) {
    const m = viewMonth.value === 11 ? 0 : viewMonth.value + 1;
    const y = viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value;
    const dStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(j).padStart(2, "0")}`;
    days.push({
      day: j,
      month: m,
      year: y,
      isCurrentMonth: false,
      isToday: isSameDay(today, y, m, j),
      dateStr: dStr,
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

const effectiveEnd = computed(() => {
  return rangeEnd.value || (rangeStart.value && hoverDate.value && hoverDate.value >= rangeStart.value ? hoverDate.value : null);
});

const displayValue = computed(() => {
  if (isRange.value) {
    if (rangeStart.value && rangeEnd.value) {
      return `${rangeStart.value}  →  ${rangeEnd.value}`;
    }
    if (rangeStart.value) {
      return `${rangeStart.value}  →  Select end`;
    }
    return props.placeholder || "Pick a date range";
  }

  if (!selectedDate.value) return props.placeholder || "Pick a date";
  return selectedDate.value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const hasValue = computed(() => {
  return isRange.value ? Boolean(rangeStart.value) : Boolean(selectedDate.value);
});

const handleDayClick = (cell: DayCell) => {
  if (!cell.isCurrentMonth) return;

  if (!isRange.value) {
    const newDate = new Date(cell.year, cell.month, cell.day);
    selectedDate.value = newDate;
    const str = formatDateString(newDate);
    emit("update:modelValue", str);
    emit("change", str);
    isOpen.value = false;
    return;
  }

  // Range selection
  const dStr = cell.dateStr;
  if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
    rangeStart.value = dStr;
    rangeEnd.value = null;
  } else {
    if (dStr < rangeStart.value) {
      rangeStart.value = dStr;
      rangeEnd.value = null;
    } else {
      rangeEnd.value = dStr;
      emit("update:modelValue", [rangeStart.value, dStr]);
      emit("change", [rangeStart.value, dStr]);
      emit("update:startDate", rangeStart.value);
      emit("update:endDate", dStr);
      isOpen.value = false;
    }
  }
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

const selectRangePreset = (daysBack: number) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - daysBack);
  const sStr = formatDateString(start);
  const eStr = formatDateString(end);
  rangeStart.value = sStr;
  rangeEnd.value = eStr;
  emit("update:modelValue", [sStr, eStr]);
  emit("change", [sStr, eStr]);
  emit("update:startDate", sStr);
  emit("update:endDate", eStr);
  isOpen.value = false;
};

const selectThisMonthPreset = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const sStr = formatDateString(start);
  const eStr = formatDateString(now);
  rangeStart.value = sStr;
  rangeEnd.value = eStr;
  emit("update:modelValue", [sStr, eStr]);
  emit("change", [sStr, eStr]);
  emit("update:startDate", sStr);
  emit("update:endDate", eStr);
  isOpen.value = false;
};

const clearDate = (e: MouseEvent) => {
  e.stopPropagation();
  if (isRange.value) {
    rangeStart.value = null;
    rangeEnd.value = null;
    emit("update:modelValue", ["", ""]);
    emit("change", ["", ""]);
    emit("update:startDate", "");
    emit("update:endDate", "");
  } else {
    selectedDate.value = null;
    emit("update:modelValue", "");
    emit("change", "");
  }
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
    calendarView.value = "days";
    hoverDate.value = null;
  }
};

onMounted(() => {
  document.addEventListener("pointerdown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleClickOutside);
});

const selectCurrentMonth = () => {
  const cur = new Date();
  viewMonth.value = cur.getMonth();
  viewYear.value = cur.getFullYear();
  calendarView.value = "days";
};

const selectCurrentYear = () => {
  const cur = new Date();
  viewYear.value = cur.getFullYear();
  calendarView.value = "months";
};

const datePickerStyles = computed(() => datePickerVariants({ size: props.size }));
</script>

<template>
  <div :class="cn(datePickerStyles.root(), props.class)">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      :disabled="disabled"
      :class="cn(datePickerStyles.trigger(), !hasValue && 'text-muted-foreground')"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2 truncate">
        <CalendarIcon class="h-4 w-4 shrink-0 text-muted-foreground" />
        <span :class="hasValue ? 'font-medium text-foreground' : 'text-muted-foreground'">
          {{ displayValue }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <button
          v-if="hasValue"
          type="button"
          class="rounded p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          @click="clearDate"
        >
          <X class="h-3.5 w-3.5" />
        </button>
      </div>
    </button>

    <!-- Calendar Popover -->
    <div
      v-if="isOpen"
      ref="popoverRef"
      :class="
        cn(
          calendarVariants({ size: props.size }),
          'absolute left-0 z-50 shadow-2xl animate-in fade-in-0 zoom-in-95',
          resolvedPlacement === 'top'
            ? 'bottom-full mb-1.5 origin-bottom'
            : 'top-full mt-1.5 origin-top'
        )
      "
    >
      <!-- VIEW: MONTHS GRID -->
      <div v-if="calendarView === 'months'" class="space-y-3">
        <div :class="calendarHeaderVariants()">
          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Previous year"
            @click="viewYear -= 1"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group cursor-pointer"
            title="Click to choose year"
            @click="calendarView = 'years'"
          >
            <span>{{ viewYear }}</span>
            <ChevronDown class="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
          </button>

          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Next year"
            @click="viewYear += 1"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <div class="grid grid-cols-3 gap-1.5 py-1">
          <button
            v-for="(name, idx) in shortMonthNames"
            :key="name"
            type="button"
            :class="
              cn(
                'h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer',
                viewMonth === idx
                  ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                  : 'text-foreground hover:bg-muted/80',
                viewMonth !== idx && now.getMonth() === idx && now.getFullYear() === viewYear && 'border border-primary/50 text-primary'
              )
            "
            @click="
              viewMonth = idx;
              calendarView = 'days';
            "
          >
            {{ name }}
          </button>
        </div>

        <div class="pt-2 border-t border-border flex items-center justify-between text-[11px]">
          <button
            type="button"
            class="font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            @click="calendarView = 'days'"
          >
            ← Back to Days
          </button>
          <button
            type="button"
            class="font-semibold text-primary hover:underline cursor-pointer"
            @click="selectCurrentMonth"
          >
            Current Month
          </button>
        </div>
      </div>

      <!-- VIEW: YEARS GRID -->
      <div v-else-if="calendarView === 'years'" class="space-y-3">
        <div :class="calendarHeaderVariants()">
          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Previous decade"
            @click="viewYear -= 12"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <span class="font-bold text-xs text-foreground px-2 py-1">
            {{ decadeStart }} – {{ decadeStart + 11 }}
          </span>

          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Next decade"
            @click="viewYear += 12"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <div class="grid grid-cols-3 gap-1.5 py-1">
          <button
            v-for="yr in decadeYears"
            :key="yr"
            type="button"
            :class="
              cn(
                'h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center cursor-pointer',
                viewYear === yr
                  ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                  : 'text-foreground hover:bg-muted/80',
                viewYear !== yr && now.getFullYear() === yr && 'border border-primary/50 text-primary'
              )
            "
            @click="
              viewYear = yr;
              calendarView = 'months';
            "
          >
            {{ yr }}
          </button>
        </div>

        <div class="pt-2 border-t border-border flex items-center justify-between text-[11px]">
          <button
            type="button"
            class="font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            @click="calendarView = 'days'"
          >
            ← Back to Days
          </button>
          <button
            type="button"
            class="font-semibold text-primary hover:underline cursor-pointer"
            @click="selectCurrentYear"
          >
            Current Year
          </button>
        </div>
      </div>

      <!-- VIEW: DAYS CALENDAR -->
      <div v-else>
        <!-- Header with Month & Year Selectors -->
        <div :class="calendarHeaderVariants()">
          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Previous month"
            @click="prevMonth"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <div class="flex items-center gap-1">
            <button
              type="button"
              class="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group cursor-pointer"
              title="Click to choose month"
              @click="calendarView = 'months'"
            >
              <span>{{ monthNames[viewMonth] }}</span>
              <ChevronDown class="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
            </button>

            <button
              type="button"
              class="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group cursor-pointer"
              title="Click to choose year"
              @click="calendarView = 'years'"
            >
              <span>{{ viewYear }}</span>
              <ChevronDown class="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
            </button>
          </div>

          <button
            type="button"
            class="h-7 w-7 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            aria-label="Next month"
            @click="nextMonth"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>

        <!-- Day Names Header -->
        <div class="grid grid-cols-7 gap-1 text-center my-1">
          <span
            v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
            :key="d"
            class="text-[10px] font-semibold text-muted-foreground/70 py-1"
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
            :disabled="!cell.isCurrentMonth"
            :class="
              cn(
                calendarDayVariants({
                  size: props.size,
                  selected: !isRange && Boolean(selectedDate && cell.dateStr === formatDateString(selectedDate)),
                  rangeStart: isRange && cell.dateStr === rangeStart,
                  rangeEnd: isRange && cell.dateStr === (rangeEnd || (rangeStart && !rangeEnd && hoverDate === cell.dateStr ? hoverDate : null)),
                  inRange: Boolean(
                    isRange &&
                    rangeStart &&
                    effectiveEnd &&
                    cell.dateStr > rangeStart &&
                    cell.dateStr < effectiveEnd
                  ),
                  today: cell.isToday && !(isRange ? cell.dateStr === rangeStart || cell.dateStr === rangeEnd : selectedDate && cell.dateStr === formatDateString(selectedDate)),
                  outside: !cell.isCurrentMonth,
                })
              )
            "
            @click="handleDayClick(cell)"
            @mouseenter="() => {
              if (isRange && rangeStart && !rangeEnd && cell.isCurrentMonth) {
                hoverDate = cell.dateStr;
              }
            }"
          >
            {{ cell.day }}
          </button>
        </div>

        <!-- Quick Preset Shortcuts -->
        <div class="flex items-center justify-between pt-2.5 mt-2 border-t border-border/60 text-[11px]">
          <template v-if="isRange">
            <button
              type="button"
              class="font-semibold text-primary hover:underline"
              @click="selectRangePreset(7)"
            >
              Last 7D
            </button>
            <button
              type="button"
              class="font-medium text-muted-foreground hover:text-foreground hover:underline"
              @click="selectRangePreset(30)"
            >
              Last 30D
            </button>
            <button
              type="button"
              class="font-medium text-muted-foreground hover:text-foreground hover:underline"
              @click="selectThisMonthPreset"
            >
              This Month
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="font-semibold text-primary hover:underline"
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
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
