/* eslint-disable */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";
import { formatDateStripe } from "@/utils/format";
import axios from "axios";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { sessionId, bookingDetails, token } = await req.json();

  const { roomId, orderTotal, nights, checkIn, checkOut, hotel, room } =
    bookingDetails;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { sessionId, roomId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${hotel?.name} - ${room?.name}`,
              images: [hotel.imageUrls[0]],
              description: `Stay in this wonderful place for ${nights} nights, from ${formatDateStripe(
                checkIn
              )} to ${formatDateStripe(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Call backend API to save reservation
    const response = await axios.post(
      "http://localhost:8080/auth/reservations",
      bookingDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Reservation API Response:", response.data);

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
