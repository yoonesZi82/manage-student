"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  DayButton,
  Locale,
} from "react-day-picker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

// تقویم فارسی برای ماه و روزها
const faLocale = {
  formatters: {
    formatWeekdayName: (date: Date) => {
      const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
      return weekdays[date.getDay()];
    },
    formatMonthCaption: (date: Date) =>
      date.toLocaleDateString("fa-IR", { month: "long", year: "numeric" }),
    formatMonthDropdown: (date: Date) =>
      date.toLocaleDateString("fa-IR", { month: "long" }),
    formatYearDropdown: (date: Date) =>
      date.toLocaleDateString("fa-IR", { year: "numeric" }),
  },
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      dir="rtl"
      locale={faLocale as unknown as Locale}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        "bg-background p-3 rtl",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      formatters={{ ...faLocale.formatters, ...formatters }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex flex-col gap-4", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn("flex items-center justify-between", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 p-0",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-8 p-0",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center text-base font-semibold",
          defaultClassNames.month_caption
        ),
        dropdowns: cn("flex gap-2", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "border rounded-md px-2 py-1 text-sm",
          defaultClassNames.dropdown_root
        ),
        caption_label: cn(
          captionLayout === "label" ? "text-sm font-medium" : "sr-only",
          defaultClassNames.caption_label
        ),

        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 text-center text-xs font-normal",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        day: cn(
          "w-full h-full text-center aspect-square select-none text-sm",
          defaultClassNames.day
        ),
        today: cn(
          "bg-accent text-accent-foreground rounded",
          defaultClassNames.today
        ),
        outside: cn("text-muted-foreground", defaultClassNames.outside),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation }) => {
          if (orientation === "left")
            return <ChevronLeftIcon className={className} />;
          if (orientation === "right")
            return <ChevronRightIcon className={className} />;
          return <ChevronDownIcon className={className} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString("fa-IR")}
      data-selected={modifiers.selected}
      className={cn(
        "aspect-square w-full text-sm",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
