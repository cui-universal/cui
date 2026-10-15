import * as React from "react";
import {
  datePickerVariants,
  type DatePickerVariants,
  calendarVariants,
  calendarHeaderVariants,
  calendarDayVariants,
  cn,
} from "@cui-universal/theme";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";

export type DatePickerValue = string | Date;
export type DatePickerRangeValue = [string, string];
export type DatePickerView = "days" | "months" | "years";

export interface DatePickerProps {
  mode?: "single" | "range";
  value?: DatePickerValue | DatePickerRangeValue;
  onChange?: (date: any) => void;
  startDate?: string;
  endDate?: string;
  onRangeChange?: (range: [string, string]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: DatePickerVariants["size"];
  placement?: "bottom" | "top" | "auto";
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const SHORT_MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      onChange,
      startDate,
      endDate,
      onRangeChange,
      placeholder,
      disabled = false,
      size = "sm",
      placement = "bottom",
      className,
    },
    ref
  ) => {
    const isRange = mode === "range";
    const [isOpen, setIsOpen] = React.useState(false);
    const [calendarView, setCalendarView] = React.useState<DatePickerView>("days");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [resolvedPlacement, setResolvedPlacement] = React.useState<"bottom" | "top">(
      placement === "top" ? "top" : "bottom"
    );

    // Range state
    const [rangeStart, setRangeStart] = React.useState<string | null>(() => {
      if (startDate) return startDate;
      if (Array.isArray(value)) return value[0] || null;
      return null;
    });

    const [rangeEnd, setRangeEnd] = React.useState<string | null>(() => {
      if (endDate) return endDate;
      if (Array.isArray(value)) return value[1] || null;
      return null;
    });

    const [hoverDate, setHoverDate] = React.useState<string | null>(null);

    // Single date value
    const selectedDateStr = React.useMemo(() => {
      if (isRange) return "";
      if (!value) return "";
      if (typeof value === "string") return value;
      if (value instanceof Date) return value.toISOString().split("T")[0];
      return "";
    }, [isRange, value]);

    // View year and month navigation state
    const initialDate = React.useMemo(() => {
      if (isRange && rangeStart) {
        const d = new Date(rangeStart);
        if (!isNaN(d.getTime())) return d;
      }
      if (!isRange && selectedDateStr) {
        const d = new Date(selectedDateStr);
        if (!isNaN(d.getTime())) return d;
      }
      return new Date();
    }, [isRange, rangeStart, selectedDateStr]);

    const [currentYear, setCurrentYear] = React.useState(initialDate.getFullYear());
    const [currentMonth, setCurrentMonth] = React.useState(initialDate.getMonth());

    // Sync external props
    React.useEffect(() => {
      if (isRange) {
        if (Array.isArray(value)) {
          setRangeStart(value[0] || null);
          setRangeEnd(value[1] || null);
          if (value[0]) {
            const d = new Date(value[0]);
            if (!isNaN(d.getTime())) {
              setCurrentYear(d.getFullYear());
              setCurrentMonth(d.getMonth());
            }
          }
        }
        if (startDate !== undefined) setRangeStart(startDate || null);
        if (endDate !== undefined) setRangeEnd(endDate || null);
      } else if (value) {
        const d = typeof value === "string" ? new Date(value) : value instanceof Date ? value : null;
        if (d && !isNaN(d.getTime())) {
          setCurrentYear(d.getFullYear());
          setCurrentMonth(d.getMonth());
        }
      }
    }, [isRange, value, startDate, endDate]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setCalendarView("days");
          setHoverDate(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    React.useEffect(() => {
      if (placement === "auto" && isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow < 320 && spaceAbove > spaceBelow) {
          setResolvedPlacement("top");
        } else {
          setResolvedPlacement("bottom");
        }
      } else if (placement === "top") {
        setResolvedPlacement("top");
      } else {
        setResolvedPlacement("bottom");
      }
    }, [isOpen, placement]);

    const prevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(y => y - 1);
      } else {
        setCurrentMonth(m => m - 1);
      }
    };

    const nextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(y => y + 1);
      } else {
        setCurrentMonth(m => m + 1);
      }
    };

    // Decade calculations
    const decadeStart = Math.floor(currentYear / 12) * 12;
    const decadeYears = React.useMemo(() => {
      return Array.from({ length: 12 }, (_, i) => decadeStart + i);
    }, [decadeStart]);

    // Calendar generation
    const days = React.useMemo(() => {
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

      const items = [];
      // Previous month days
      for (let i = firstDay - 1; i >= 0; i--) {
        items.push({
          day: daysInPrevMonth - i,
          isCurrentMonth: false,
          dateStr: "",
        });
      }
      // Current month days
      const todayStr = new Date().toISOString().split("T")[0];
      for (let i = 1; i <= daysInMonth; i++) {
        const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        items.push({
          day: i,
          isCurrentMonth: true,
          dateStr: dStr,
          isToday: dStr === todayStr,
        });
      }
      // Next month padding
      const remaining = (7 - (items.length % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        items.push({
          day: i,
          isCurrentMonth: false,
          dateStr: "",
        });
      }
      return items;
    }, [currentYear, currentMonth]);

    const handleDayClick = (dStr: string) => {
      if (!isRange) {
        if (onChange) onChange(dStr);
        setIsOpen(false);
        return;
      }

      // Range selection logic
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(dStr);
        setRangeEnd(null);
      } else {
        if (dStr < rangeStart) {
          setRangeStart(dStr);
          setRangeEnd(null);
        } else {
          setRangeEnd(dStr);
          if (onRangeChange) onRangeChange([rangeStart, dStr]);
          if (onChange) onChange([rangeStart, dStr]);
          setIsOpen(false);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isRange) {
        setRangeStart(null);
        setRangeEnd(null);
        if (onRangeChange) onRangeChange(["", ""]);
        if (onChange) onChange(["", ""]);
      } else {
        if (onChange) onChange("");
      }
    };

    const selectSinglePreset = (offsetDays: number) => {
      const target = new Date();
      target.setDate(target.getDate() + offsetDays);
      const str = target.toISOString().split("T")[0];
      if (onChange) onChange(str);
      setIsOpen(false);
    };

    const selectRangePreset = (daysBack: number) => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - daysBack);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setRangeStart(sStr);
      setRangeEnd(eStr);
      if (onRangeChange) onRangeChange([sStr, eStr]);
      if (onChange) onChange([sStr, eStr]);
      setIsOpen(false);
    };

    const selectThisMonthPreset = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const sStr = start.toISOString().split("T")[0];
      const eStr = now.toISOString().split("T")[0];
      setRangeStart(sStr);
      setRangeEnd(eStr);
      if (onRangeChange) onRangeChange([sStr, eStr]);
      if (onChange) onChange([sStr, eStr]);
      setIsOpen(false);
    };

    const effectiveEnd = rangeEnd || (rangeStart && hoverDate && hoverDate >= rangeStart ? hoverDate : null);

    const displayStr = React.useMemo(() => {
      if (isRange) {
        if (rangeStart && rangeEnd) {
          return `${rangeStart}  →  ${rangeEnd}`;
        }
        if (rangeStart) {
          return `${rangeStart}  →  Select end`;
        }
        return placeholder || "Pick a date range";
      }
      return selectedDateStr || placeholder || "Pick a date";
    }, [isRange, rangeStart, rangeEnd, selectedDateStr, placeholder]);

    const hasValue = isRange ? Boolean(rangeStart) : Boolean(selectedDateStr);

    const { root, trigger } = datePickerVariants({ size });

    return (
      <div
        ref={containerRef}
        className={cn(root(), className)}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              if (!isOpen) setCalendarView("days");
            }
          }}
          className={cn(
            trigger(),
            !hasValue && "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className={hasValue ? "font-medium text-foreground" : ""}>
              {displayStr}
            </span>
          </div>
          {hasValue && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </button>

        {isOpen && (
          <div
            className={cn(
              calendarVariants({ size }),
              "absolute z-50 shadow-2xl animate-in fade-in-0 zoom-in-95",
              resolvedPlacement === "top"
                ? "bottom-full mb-1.5 origin-bottom"
                : "top-full mt-1.5 origin-top"
            )}
          >
            {/* VIEW: MONTHS GRID */}
            {calendarView === "months" && (
              <div className="space-y-3">
                <div className={calendarHeaderVariants()}>
                  <button
                    type="button"
                    onClick={() => setCurrentYear(y => y - 1)}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Previous year"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalendarView("years")}
                    className="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group"
                  >
                    <span>{currentYear}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentYear(y => y + 1)}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Next year"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 py-1">
                  {SHORT_MONTH_NAMES.map((name, idx) => {
                    const isSelected = currentMonth === idx;
                    const isCurrent = new Date().getMonth() === idx && new Date().getFullYear() === currentYear;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          setCurrentMonth(idx);
                          setCalendarView("days");
                        }}
                        className={cn(
                          "h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-xs font-bold"
                            : "text-foreground hover:bg-muted/80",
                          !isSelected && isCurrent && "border border-primary/50 text-primary"
                        )}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCalendarView("days")}
                    className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Days
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      setCurrentMonth(now.getMonth());
                      setCurrentYear(now.getFullYear());
                      setCalendarView("days");
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    Current Month
                  </button>
                </div>
              </div>
            )}

            {/* VIEW: YEARS GRID */}
            {calendarView === "years" && (
              <div className="space-y-3">
                <div className={calendarHeaderVariants()}>
                  <button
                    type="button"
                    onClick={() => setCurrentYear(y => y - 12)}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Previous decade"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <span className="font-bold text-xs text-foreground px-2 py-1">
                    {decadeStart} – {decadeStart + 11}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentYear(y => y + 12)}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Next decade"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 py-1">
                  {decadeYears.map((yr) => {
                    const isSelected = currentYear === yr;
                    const isCurrent = new Date().getFullYear() === yr;
                    return (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => {
                          setCurrentYear(yr);
                          setCalendarView("months");
                        }}
                        className={cn(
                          "h-9 rounded-lg text-xs font-semibold transition-all flex items-center justify-center",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-xs font-bold"
                            : "text-foreground hover:bg-muted/80",
                          !isSelected && isCurrent && "border border-primary/50 text-primary"
                        )}
                      >
                        {yr}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => setCalendarView("days")}
                    className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Days
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      setCurrentYear(now.getFullYear());
                      setCalendarView("months");
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    Current Year
                  </button>
                </div>
              </div>
            )}

            {/* VIEW: DAYS CALENDAR */}
            {calendarView === "days" && (
              <div>
                <div className={calendarHeaderVariants()}>
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCalendarView("months")}
                      className="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group cursor-pointer"
                      title="Click to choose month"
                    >
                      <span>{MONTH_NAMES[currentMonth]}</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalendarView("years")}
                      className="inline-flex items-center gap-1 font-bold text-xs rounded-md px-2 py-1 hover:bg-muted text-foreground transition-colors group cursor-pointer"
                      title="Click to choose year"
                    >
                      <span>{currentYear}</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={nextMonth}
                    className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center my-1">
                  {DAY_NAMES.map(name => (
                    <div key={name} className="text-[10px] font-semibold text-muted-foreground/70 py-1">
                      {name}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((item, idx) => {
                    const isStart = isRange && item.dateStr === rangeStart;
                    const isEnd = isRange && item.dateStr === (rangeEnd || (rangeStart && !rangeEnd && hoverDate === item.dateStr ? hoverDate : null));
                    const inRange = Boolean(
                      isRange &&
                      rangeStart &&
                      effectiveEnd &&
                      item.dateStr > rangeStart &&
                      item.dateStr < effectiveEnd
                    );
                    const isSingle = !isRange && item.dateStr === selectedDateStr;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => item.isCurrentMonth && handleDayClick(item.dateStr)}
                        onMouseEnter={() => {
                          if (isRange && rangeStart && !rangeEnd && item.isCurrentMonth) {
                            setHoverDate(item.dateStr);
                          }
                        }}
                        disabled={!item.isCurrentMonth}
                        className={cn(
                          calendarDayVariants({
                            size,
                            selected: isSingle,
                            rangeStart: isStart,
                            rangeEnd: isEnd,
                            inRange,
                            today: item.isToday,
                            outside: !item.isCurrentMonth,
                          })
                        )}
                      >
                        {item.day}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Presets */}
                <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-[11px]">
                  {isRange ? (
                    <>
                      <button
                        type="button"
                        onClick={() => selectRangePreset(7)}
                        className="font-semibold text-primary hover:underline"
                      >
                        Last 7D
                      </button>
                      <button
                        type="button"
                        onClick={() => selectRangePreset(30)}
                        className="font-medium text-muted-foreground hover:text-foreground hover:underline"
                      >
                        Last 30D
                      </button>
                      <button
                        type="button"
                        onClick={selectThisMonthPreset}
                        className="font-medium text-muted-foreground hover:text-foreground hover:underline"
                      >
                        This Month
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => selectSinglePreset(0)}
                        className="font-semibold text-primary hover:underline"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => selectSinglePreset(-1)}
                        className="font-medium text-muted-foreground hover:text-foreground hover:underline"
                      >
                        Yesterday
                      </button>
                      <button
                        type="button"
                        onClick={() => selectSinglePreset(7)}
                        className="font-medium text-muted-foreground hover:text-foreground hover:underline"
                      >
                        In 7 Days
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";


