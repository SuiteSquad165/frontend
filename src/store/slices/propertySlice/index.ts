import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/utils/types";
import { DateRange } from "react-day-picker";

type PropertyState = {
  roomId: string;
  hotelId: string;
  price: number;
  cleaningFee: number;
  serviceFee: number;
  taxRate: number;
  cancellationFee: number;
  cancellationAllowed: boolean;
  bookings: Booking[];
  range: DateRange | undefined;
  room: any;
  hotel: any;
};

const initialState: PropertyState = {
  roomId: "",
  hotelId: "",
  price: 0,
  cleaningFee: 0,
  serviceFee: 0,
  taxRate: 0,
  cancellationFee: 0,
  cancellationAllowed: true,
  bookings: [],
  range: undefined,
  room: null,
  hotel: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setRoomId(state, action: PayloadAction<string>) {
      state.roomId = action.payload;
    },
    setHotelId(state, action: PayloadAction<string>) {
      state.hotelId = action.payload;
    },
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    setCleaningFee(state, action: PayloadAction<number>) {
      state.cleaningFee = action.payload;
    },
    setServiceFee(state, action: PayloadAction<number>) {
      state.serviceFee = action.payload;
    },
    setTaxRate(state, action: PayloadAction<number>) {
      state.taxRate = action.payload;
    },
    setCancellationFee(state, action: PayloadAction<number>) {
      state.cancellationFee = action.payload;
    },
    setCancellationAllowed(state, action: PayloadAction<boolean>) {
      state.cancellationAllowed = action.payload;
    },
    setBookings(state, action: PayloadAction<Booking[]>) {
      state.bookings = action.payload;
    },
    setRange(state, action: PayloadAction<DateRange | undefined>) {
      state.range = action.payload;
    },
    setRoom(state, action: PayloadAction<string>) {
      state.room = action.payload;
    },
    setHotel(state, action: PayloadAction<string>) {
      state.hotel = action.payload;
    },
  },
});

export const {
  setHotelId,
  setRoomId,
  setPrice,
  setCleaningFee,
  setServiceFee,
  setTaxRate,
  setCancellationFee,
  setCancellationAllowed,
  setBookings,
  setRange,
  setRoom,
  setHotel,
} = propertySlice.actions;
export default propertySlice;
