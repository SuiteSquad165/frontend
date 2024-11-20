"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import withAuth from "../withAuth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPageContent = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      bookingId: bookingId,
    });
    console.log(response.data);
    return response.data.clientSecret;
  }, [bookingId]);

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
