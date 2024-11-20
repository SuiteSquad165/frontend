/* eslint-disable */
"use client";

import BookingList from "@/components/booking/bookinglist";
import dummyData from "@/utils/dummy-data";
import withAuth from "../withAuth";

const BookingsPage = () => {
  return (
    <>
      <h1 className="text-3xl">Bookings Page</h1>
      <BookingList properties={dummyData} />
    </>
  );
};

export default withAuth(BookingsPage);
