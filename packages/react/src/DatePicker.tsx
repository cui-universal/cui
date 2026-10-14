import * as React from "react";
import {
  datePickerVariants,
  calendarVariants,
  calendarHeaderVariants,
  calendarDayVariants,
  cn,
} from "@cui-universal/theme";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface DatePickerProps {
  value?: string | Date;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const initialDate = value ? new Date(value) : new Date();
    const [currentYear, setCurrentYear] = React.useState(initialDate.getFullYear());
    const [currentMonth, setCurrentMonth] = React.useState(initialDate.getMonth());

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedDateStr = value
      ? typeof value === "string"
        ? value
        : value.toISOString().split("T")[0]
      : "";

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
          isSelected: dStr === selectedDateStr,
        });
      }
      // Next month padding
      const remaining = 42 - items.length;
      for (let i = 1; i <= remaining; i++) {
        items.push({
          day: i,
          isCurrentMonth: false,
          dateStr: "",
        });
      }
      return items;
    }, [currentYear, currentMonth, selectedDateStr]);

    const handleSelect = (dateStr: string) => {
      if (onChange) onChange(dateStr);
      setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChange) onChange("");
    };

    return (
      <div
        ref={containerRef}
        className={cn(datePickerVariants(), className)}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-xs sm:text-sm shadow-xs transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
            !selectedDateStr && "text-muted-foreground"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{selectedDateStr || placeholder}</span>
          </div>
          {selectedDateStr && (
            <span
              onClick={handleClear}
              className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </button>

        {isOpen && (
          <div
            className={cn(
              calendarVariants(),
              "absolute z-50 mt-1 origin-top shadow-xl animate-in fade-in-0 zoom-in-95"
            )}
          >
            <div className={calendarHeaderVariants()}>
              <button
                type="button"
                onClick={prevMonth}
                className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-xs font-semibold">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="h-7 w-7 rounded-md inline-flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center my-1">
              {DAY_NAMES.map(name => (
                <div key={name} className="text-[10px] font-medium text-muted-foreground/70 py-1">
                  {name}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.isCurrentMonth && handleSelect(item.dateStr)}
                  className={cn(
                    calendarDayVariants({
                      selected: item.isSelected,
                      today: item.isToday,
                      outside: !item.isCurrentMonth,
                    })
                  )}
                >
                  {item.day}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  handleSelect(today);
                }}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";
