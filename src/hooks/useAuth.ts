import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCurrentUser, clearUser } from "@/store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken(true).then((token) => {
          dispatch(setCurrentUser({ user, token }));
        });
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);
};

export default useAuth;
