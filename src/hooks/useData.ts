"use client";

import { suiteSquadApi } from "./api"; // Assuming suiteSquadApi is correctly configured
import { PropertyCardProps } from "@/utils/types"; // Imported type, but not used in this snippet

// Define the shape of the `/ping` response
type PingResponse = {
  message: string;
};

const hotelApi = suiteSquadApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /ping query
    getTestApi: builder.query<PingResponse, void>({
      query: () => "/ping",
      transformResponse: (response: { data: PingResponse }) => response.data, // Ensure correct type here
    }),

    // POST or GET /get_room_id?roomID=... mutation
    getRoomId: builder.mutation<string, string>({
      query: (roomID) => `/get_room_id?roomID=${roomID}`,
    }),
  }),
  overrideExisting: true, // Allows overriding existing endpoints if necessary
});

// Export the auto-generated hooks from RTK Query
export const { useGetTestApiQuery, useGetRoomIdMutation } = hotelApi;
