import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { clearUser, setCurrentUser } from "@/store/slices/authSlice";
import { AppDispatch } from "@/store";
import { storeToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

// Sign in with Email and Password
export const login = async (
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const accessToken = await userCredential.user.getIdToken(true); // Force refresh token
  const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000; // Token expiration
  storeToken(accessToken, expiresAt);
  dispatch(setCurrentUser(userCredential.user));
  return userCredential;
};

// Google Sign-in popup
export const signInWithGoogle = async (dispatch: AppDispatch) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const accessToken = await result.user.getIdToken(true);
    const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000;

    storeToken(accessToken, expiresAt);
    dispatch(setCurrentUser(result.user));
    return result.user;
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
  dispatch(clearUser());
  sessionStorage.removeItem("tokenData");
  await signOut(auth);
};
