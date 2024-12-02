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
import axios from "axios";

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
  dispatch(setCurrentUser({ user: userCredential.user, token: accessToken }));
  return userCredential;
};

// Google Sign-in popup
export const signInWithGoogle = async (dispatch: AppDispatch) => {
  const provider = new GoogleAuthProvider();

  try {
    // Step 1: Sign in with Google
    const result = await signInWithPopup(auth, provider);
    const accessToken = await result.user.getIdToken(true);
    const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000;
    storeToken(accessToken, expiresAt);

    // Step 2: Check if user exists in the backend
    const response = await axios.post(
      "/auth/signin",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data) {
      const userWithPoints = {
        ...result.user,
        rewardPoints: response.data.rewardPoints,
      };

      console.log(userWithPoints);
      // Step 3: Dispatch user to Redux
      dispatch(setCurrentUser({ user: userWithPoints, token: accessToken }));

      return userWithPoints; // Return user with reward points
    }

    // Step 4: New user logic (Extract name for backend)
    const nameArr = result.user.displayName?.split(" ");
    const lastName = nameArr?.splice(-1, 1).join(" ") ?? "";

    const customerData: CustomerInfo = {
      email: result.user.email ?? "",
      firstName: nameArr?.join(" ") ?? result.user.displayName ?? "",
      lastName,
      rewardPoints: 0, // Initialize new user with 0 points
    };

    // Step 5: Send new user to backend
    await sendCustomerInfoToBackend(customerData);

    const newUser = {
      ...result.user,
      rewardPoints: 0,
    };

    // Step 6: Dispatch new user to Redux
    dispatch(setCurrentUser({ user: newUser, token: accessToken }));

    return newUser; // Return new user
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
  localStorage.removeItem("tokenData");
  await signOut(auth);
};
