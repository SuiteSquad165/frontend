/* eslint-disable */
"use client";

import LoadingCards from "@/components/card/LoadingCards";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCurrentUser } from "@/store/slices/authSlice";
import { storeToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        // User is logged in, fetch and store token
        const accessToken = await user.getIdToken(true); // Refresh token
        const expiresAt = jwtDecode<{ exp: number }>(accessToken).exp * 1000; // Token expiration

        storeToken(accessToken, expiresAt); // Save token to local storage or session
        dispatch(setCurrentUser({ user, token: accessToken })); // Update Redux store
      } else {
        console.log("No user signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [dispatch]);

  return (
    <section>
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer />
      </Suspense>
    </section>
  );
};

export default HomePage;
