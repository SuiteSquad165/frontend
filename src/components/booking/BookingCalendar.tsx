"use client";

import { Calendar } from "@/components/shadcn-ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setRange } from "@/store/slices/propertySlice";

function BookingCalendar({ bookings }: { bookings: any[] }) {
  const currentDate = new Date();
  const { range } = useSelector((state: RootState) => state.property);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  const [blockedPeriods, setBlockedPeriods] = useState<DateRange[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<{
    [key: string]: boolean;
  }>({});

  // Generate blocked periods and unavailable dates when bookings change
  useEffect(() => {
    const generatedBlockedPeriods = generateBlockedPeriods({
      bookings,
      today: currentDate,
    });
    setBlockedPeriods(generatedBlockedPeriods);

    const generatedUnavailableDates = generateDisabledDates(
      generatedBlockedPeriods
    );
    setUnavailableDates(generatedUnavailableDates);
  }, [bookings]);

  // Check for disabled dates in the selected range
  useEffect(() => {
    if (!range || !range.from || !range.to) return;

    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some(
      (date) => unavailableDates[date]
    );

    if (isDisabledDateIncluded) {
      dispatch(setRange(defaultSelected));
      toast({
        description: "Some dates are booked. Please select again.",
      });
    }
  }, [range, unavailableDates, toast, dispatch]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={(newRange) => dispatch(setRange(newRange))}
      className="mb-4"
      disabled={blockedPeriods}
    />
  );
}

export default BookingCalendar;
