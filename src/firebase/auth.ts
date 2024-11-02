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
import { sendCustomerInfoToBackend } from "@/utils/actions";
import { CustomerInfo } from "@/hooks/useData";

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
    console.log(accessToken);

    const nameArr = result.user.displayName?.split(" ");
    const lastName = nameArr?.splice(-1, 1).join(" ") ?? "";

    const customerData: CustomerInfo = {
      email: result.user.email ?? "",
      firstName: nameArr?.join(" ") ?? result.user.displayName ?? "",
      lastName,
    };

    // const response = await fetch("/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify(customerData),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to send customer info to backend");
    // }

    // console.log("Customer info sent to backend successfully");
    // console.log(await response.json());

    await sendCustomerInfoToBackend(customerData);

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
