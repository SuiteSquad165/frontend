import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  rewardPoints: number;
}

interface AuthState {
  user: SerializableUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

// Helper to extract serializable fields from User object
const extractUserData = (user: any): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  rewardPoints: user.rewardPoints,
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<{ user: User | null; token: string }>
    ) => {
      state.user = action.payload.user
        ? extractUserData(action.payload.user)
        : null;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCurrentUser, clearUser } = authSlice.actions;
export default authSlice;
