"use client";

import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { createBookingAction } from "@/utils/actions";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SignInButton from "../auth/SignInButton";
import { useRouter } from "next/navigation";

function ConfirmBooking() {
  const router = useRouter();

  const { roomId, hotelId, range, price, hotel, room } = useSelector(
    (state: RootState) => state.property
  );
  const { user } = useSelector((state: RootState) => state.auth);

  if (!range || !range.from || !range.to) return null;

  const checkIn = range.from;
  const checkOut = range.to;

  if (!user)
    return <SignInButton>Sign In with Google to Complete Booking</SignInButton>;

  const createBooking = async () => {
    try {
      await createBookingAction(
        {
          roomId,
          hotelId,
          checkIn,
          checkOut,
          pricePerNight: price,
          hotel,
          room,
        },
        router
      ); // Pass the router instance
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text="Reserve" className="w-full" />
      </FormContainer>
    </section>
  );
}

export default ConfirmBooking;
