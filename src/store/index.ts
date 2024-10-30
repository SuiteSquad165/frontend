import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./slices/authSlice";
import { suiteSquadApi } from "@/hooks/api";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [suiteSquadApi.reducerPath]: suiteSquadApi.reducer,
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(suiteSquadApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
