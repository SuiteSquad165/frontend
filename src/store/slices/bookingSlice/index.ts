import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingDetails {
  roomId: string;
  nights: number;
  payment: {
    pointsUsed: number;
    paymentMethod: string;
    paymentStatus: string;
  };
  checkIn: Date;
  checkOut: Date;
  sessionId?: string;
}

interface BookingState {
  bookingDetails: BookingDetails | null;
}

const initialState: BookingState = {
  bookingDetails: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails(state, action: PayloadAction<BookingDetails>) {
      state.bookingDetails = action.payload;
    },
    clearBookingDetails(state) {
      state.bookingDetails = null;
    },
  },
});

export const { setBookingDetails, clearBookingDetails } = bookingSlice.actions;
export default bookingSlice;
