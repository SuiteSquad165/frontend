import { suiteSquadApi } from "./api";

type PingResponse = {
  message: string;
};

export type CustomerInfo = {
  email: string;
  firstName: string;
  lastName: string;
};

export const hotelApi = suiteSquadApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestApi: builder.query<PingResponse, void>({
      query: () => "/ping",
      transformResponse: (response: PingResponse) => response, // Adjusted if `data` wrapping isn’t necessary
    }),

    getRoomId: builder.mutation<string, string>({
      query: (roomID) => `/get_room_id?roomID=${roomID}`,
    }),

    customerAuth: builder.mutation<void, CustomerInfo>({
      query: (customerInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: customerInfo,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTestApiQuery,
  useGetRoomIdMutation,
  useCustomerAuthMutation,
} = hotelApi;
