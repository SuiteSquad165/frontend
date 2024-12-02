"use client";

import { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/shadcn-ui/dialog";
import { signInWithGoogle } from "@/firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

const SignInButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(dispatch);
      closeModal();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <>
      <Button onClick={openModal} className={`${className ?? "w-full"}`}>
        {children}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Please sign in with Google to continue with your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full" onClick={handleGoogleSignIn}>
              Sign in with Google
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInButton;
