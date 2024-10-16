import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: SerializableUser | null;
}

const initialState: AuthState = {
  user: null,
};

// Helper to extract serializable fields from User object
const extractUserData = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload ? extractUserData(action.payload) : null;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCurrentUser, clearUser } = authSlice.actions;
export default authSlice;
