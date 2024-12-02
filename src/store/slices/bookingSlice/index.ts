import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentDetails {
  pointsUsed: number;
  paymentMethod: string;
  paymentStatus: string;
}

interface BookingDetails {
  roomId: string;
  hotelId: string;
  hotel: any; // Adjust type if you have a specific structure for the hotel
  room: any; // Adjust type if you have a specific structure for the room
  nights: number;
  payment: PaymentDetails;
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
    updatePaymentDetails(state, action: PayloadAction<PaymentDetails>) {
      if (state.bookingDetails) {
        state.bookingDetails.payment = {
          ...state.bookingDetails.payment,
          ...action.payload,
        };
      }
    },
  },
});

export const { setBookingDetails, clearBookingDetails, updatePaymentDetails } =
  bookingSlice.actions;
export default bookingSlice;
