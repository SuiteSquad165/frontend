import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";
import { suiteSquadApi } from "@/hooks/api";
import propertySlice from "./slices/propertySlice";
import searchSlice from "./slices/searchSlice";

// Initialize a single, shared store instance
export const store = configureStore({
  reducer: {
    [suiteSquadApi.reducerPath]: suiteSquadApi.reducer,
    auth: authSlice.reducer,
    property: propertySlice.reducer,
    search: searchSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(suiteSquadApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
