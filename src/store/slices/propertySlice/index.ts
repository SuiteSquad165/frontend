import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/utils/types";
import { DateRange } from "react-day-picker";

type PropertyState = {
  roomId: string;
  hotelId: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
  room: any;
  hotel: any;
};

const initialState: PropertyState = {
  roomId: "",
  hotelId: "",
  price: 0,
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
  setBookings,
  setRange,
  setRoom,
  setHotel,
} = propertySlice.actions;
export default propertySlice;
