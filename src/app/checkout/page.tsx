"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import withAuth from "../withAuth";
import { getAccessToken } from "@/utils/auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPageContent = async () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const token = useSelector((state: RootState) => state.auth.token);

  // Get booking details from Redux
  const bookingDetails = useSelector(
    (state: RootState) => state.booking.bookingDetails
  );

  const fetchClientSecret = useCallback(async () => {
    if (!sessionId || !bookingDetails) {
      console.error("Session ID or booking details are missing.");
      throw new Error("Invalid booking session.");
    }

    try {
      // Send booking details along with the session ID to the API
      const response = await axios.post("/api/payment", {
        sessionId,
        bookingDetails,
        token,
      });

      console.log(response.data);
      return response.data.clientSecret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      throw error;
    }
  }, [sessionId, bookingDetails]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
};

export default withAuth(CheckoutPage);
