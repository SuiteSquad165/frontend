/* eslint-disable */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { sessionId, bookingDetails } = await req.json();

  const {
    hotelId,
    roomId,
    roomsBooked,
    totalPrice,
    nights,
    checkIn,
    checkOut,
    hotel,
    imgUrl,
  } = bookingDetails;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { sessionId, hotelId, roomId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${hotel.name} - ${room.name}`,
              images: [image],
              description: `Stay in this wonderful place for ${totalNights} nights, from ${formatDate(
                checkIn
              )} to ${formatDate(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: totalPrice * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
