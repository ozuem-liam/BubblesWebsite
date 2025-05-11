"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

type DayPickerProps = React.ComponentPropsWithoutRef<typeof DayPicker>;

export type CalendarProps = DayPickerProps & {
  mode?: "single" | "multiple" | "range";
};

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, classNames, showOutsideDays = true, ...props }, ref) => {
    return (
      <div ref={ref}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium text-white",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-white rounded-md w-8 font-normal text-[0.8rem] opacity-70",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-[#1a3b6d] rounded-md text-white"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-[#bfdbfe] text-[#001D48] hover:bg-[#a3c4fd] hover:text-[#001D48] focus:bg-[#bfdbfe] focus:text-[#001D48]",
          day_today: "bg-[#00338D] text-white",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          PreviousMonthButton: () => <ChevronLeft className="h-4 w-4 text-white" />,
          NextMonthButton: () => <ChevronRight className="h-4 w-4 text-white" />
        }}
          {...props}
        />
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };