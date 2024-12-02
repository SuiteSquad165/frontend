"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCurrentUser } from "@/store/slices/authSlice";
import { storeToken } from "@/utils/auth";
import { jwtDecode } from "jwt-decode";
import UserContainer from "@/components/profile/UserContainer";
import { RootState } from "@/store";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        if (firebaseUser) {
          try {
            const accessToken = await firebaseUser.getIdToken(true);
            const expiresAt =
              jwtDecode<{ exp: number }>(accessToken).exp * 1000;

            storeToken(accessToken, expiresAt);

            // Add user to Redux
            dispatch(
              setCurrentUser({ user: firebaseUser, token: accessToken })
            );
          } catch (error) {
            console.error("Error fetching user token:", error);
          }
        } else {
          console.log("No user signed in.");
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Profile Page
      </h1>
      {user ? <UserContainer /> : <p>Please sign in to view your profile.</p>}
    </div>
  );
};

export default ProfilePage;
