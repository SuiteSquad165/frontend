"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import BookingCalendar from "./BookingCalendar";
import BookingContainer from "./BookingContainer";
import {
  setRoomId,
  setHotelId,
  setPrice,
  setBookings,
  setHotel,
  setRoom,
} from "@/store/slices/propertySlice";

type BookingWrapperProps = {
  room: any;
  hotel: any;
};

export default function BookingWrapper({ room, hotel }: BookingWrapperProps) {
  const dispatch = useDispatch<AppDispatch>();
  const range = useSelector((state: RootState) => state.property.range);

  useEffect(() => {
    dispatch(setRoomId(room.id));
    dispatch(setHotelId(hotel.id));
    dispatch(setPrice(room.pricePerNight));
    dispatch(setBookings(room?.bookings ?? []));
    dispatch(setHotel(hotel));
    dispatch(setRoom(room));
  }, [room, hotel, dispatch]);

  return (
    <>
      <BookingCalendar bookings={room.bookings ?? []} />
      <BookingContainer room={room} />
    </>
  );
}
