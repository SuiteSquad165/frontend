"use client";

import ConfirmBooking from "./ConfirmBooking";
import BookingForm from "./BookingForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function BookingContainer(room: any) {
  const { range } = useSelector((state: RootState) => state.property);

  // Ensure a valid date range is selected
  if (!range || !range.from || !range.to) return null;

  return (
    <div className="w-full">
      <BookingForm roomName={room.name} />
      <ConfirmBooking />
    </div>
  );
}

export default BookingContainer;
