import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCurrentUser } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";

// Sign in with Email and Password
export const login = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Google Sign-in popup
export const signInWithGoogle = async (dispatch: AppDispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    dispatch(setCurrentUser(result.user));
    return result.user; // Returns the signed-in user
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw error;
  }
};

// Sign up
export const register = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign out
export const logout = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(setCurrentUser(null));
  return await signOut(auth);
};
