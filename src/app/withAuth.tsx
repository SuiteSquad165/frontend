"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store";

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
      if (!user) {
        router.replace("/");
      }
    }, [user, router]);

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
