/* eslint-disable */
"use client";

import dummyData from "@/utils/dummy-data";
import withAuth from "../withAuth";

const BookingsPage = () => {
  return (
    <>
      <h1 className="text-3xl">Bookings Page</h1>
    </>
  );
};

export default withAuth(BookingsPage);
