"use client";

import { useState } from "react";
import ConfirmBooking from "./ConfirmBooking";
import BookingForm from "./BookingForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function BookingContainer(room: any) {
  const { range } = useSelector((state: RootState) => state.property);
  const [rewardPoints, setRewardPoints] = useState(0); // Manage reward points in container

  // Ensure a valid date range is selected
  if (!range || !range.from || !range.to) return null;

  return (
    <div className="w-full">
      {/* Pass `rewardPoints` state and updater to BookingForm */}
      <BookingForm
        roomName={room.name}
        rewardPoints={rewardPoints}
        setRewardPoints={setRewardPoints}
      />
      {/* Pass `rewardPoints` to ConfirmBooking */}
      <ConfirmBooking rewardPoints={rewardPoints} />
    </div>
  );
}

export default BookingContainer;
