"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getAccessToken } from "@/utils/auth";

export const suiteSquadApi = createApi({
  reducerPath: "suiteSquadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: async (headers, { endpoint }) => {
      const accessToken = await getAccessToken();
      headers.set("Authorization", `Bearer ${accessToken}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
